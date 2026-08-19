import React, { useEffect, useRef, useState } from 'react';
import type { PortfolioItem } from '../../types';
import { ProjectCard } from './ProjectCard';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ProjectReelProps {
  projects: PortfolioItem[];
  serviceName: string;
  onSelectProject: (project: PortfolioItem) => void;
  isReversed?: boolean;
  phase?: 'idle' | 'exit' | 'enter';
}

export const ProjectReel: React.FC<ProjectReelProps> = ({
  projects,
  serviceName,
  onSelectProject,
  isReversed = false,
  phase = 'idle',
}) => {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // State for current active project index (for floating counter)
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Physics and Animation Refs
  const animFrameRef = useRef<number | null>(null);
  const offsetRef = useRef<number>(0);
  const speedMultiplierRef = useRef<number>(1);
  const scrollBoostRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartOffsetRef = useRef<number>(0);

  // Repeat projects array to build seamless infinite loop (minimum 4 copies for smooth overflow)
  const repeatedProjects = React.useMemo(() => {
    if (!projects || projects.length === 0) return [];
    // Ensure we have at least 12 items for endless scrolling track width
    const minCopies = Math.max(3, Math.ceil(12 / projects.length));
    const copies: { project: PortfolioItem; originalIndex: number; key: string }[] = [];
    for (let c = 0; c < minCopies; c++) {
      projects.forEach((proj, idx) => {
        copies.push({
          project: proj,
          originalIndex: idx,
          key: `${proj.id}-copy-${c}-${idx}`,
        });
      });
    }
    return copies;
  }, [projects]);

  // Track window scroll velocity
  useEffect(() => {
    if (reducedMotion) return;

    const handleScroll = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      const dt = Math.max(1, now - lastTimeRef.current);
      const dy = currentY - lastScrollYRef.current;

      // Positive dy = scrolling down -> forward boost
      // Negative dy = scrolling up -> reverse boost
      const velocity = dy / dt;
      // Soft clamp boost to keep movement elegant and non-jarring
      const clampedBoost = Math.max(-2.5, Math.min(2.5, velocity * 8));

      scrollBoostRef.current = clampedBoost;
      lastScrollYRef.current = currentY;
      lastTimeRef.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion]);

  // Main requestAnimationFrame loop
  useEffect(() => {
    if (reducedMotion || !projects || projects.length === 0) return;

    let mounted = true;
    const baseSpeed = isReversed ? -0.65 : 0.65; // pixels per frame at 60fps

    const animate = () => {
      if (!mounted) return;

      if (trackRef.current && containerRef.current && !isDraggingRef.current) {
        // Target speed multiplier based on hover
        const targetMultiplier = isHovered ? 0.15 : 1.0;
        speedMultiplierRef.current += (targetMultiplier - speedMultiplierRef.current) * 0.08;

        // Decouple & decay scroll boost
        scrollBoostRef.current *= 0.92;
        if (Math.abs(scrollBoostRef.current) < 0.001) {
          scrollBoostRef.current = 0;
        }

        // Calculate delta move
        const direction = isReversed ? -1 : 1;
        const totalSpeed =
          (baseSpeed + scrollBoostRef.current * direction) * speedMultiplierRef.current;

        offsetRef.current += totalSpeed;

        // Sequence width (width of 1 full set of original projects)
        const trackWidth = trackRef.current.scrollWidth;
        const singleSetWidth = trackWidth / (repeatedProjects.length / projects.length);

        if (singleSetWidth > 0) {
          // Normalize offset inside loop range
          if (offsetRef.current >= singleSetWidth) {
            offsetRef.current -= singleSetWidth;
          } else if (offsetRef.current < 0) {
            offsetRef.current += singleSetWidth;
          }

          // Apply smooth transform
          trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;

          // Calculate current focused index for project counter
          const cardWidth = singleSetWidth / projects.length;
          const rawIndex = Math.floor((offsetRef.current + cardWidth / 2) / cardWidth);
          const activeIdx = ((rawIndex % projects.length) + projects.length) % projects.length;
          setActiveIndex(activeIdx);
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      mounted = false;
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [reducedMotion, projects, repeatedProjects, isReversed, isHovered]);

  // Touch & Mouse Drag Handlers for Mobile / Direct Touch Interaction
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    isDraggingRef.current = true;
    const pageX = 'touches' in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX;
    dragStartXRef.current = pageX;
    dragStartOffsetRef.current = offsetRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    const pageX = 'touches' in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX;
    const deltaX = dragStartXRef.current - pageX;
    offsetRef.current = dragStartOffsetRef.current + deltaX;

    if (projects.length > 0) {
      const trackWidth = trackRef.current.scrollWidth;
      const singleSetWidth = trackWidth / (repeatedProjects.length / projects.length);
      if (singleSetWidth > 0) {
        if (offsetRef.current >= singleSetWidth) offsetRef.current -= singleSetWidth;
        if (offsetRef.current < 0) offsetRef.current += singleSetWidth;
        trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  if (!projects || projects.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`services-reel-container ${phase !== 'idle' ? phase : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label={`${serviceName} continuous project showcase`}
    >
      {/* Edge vignettes for cinematic depth */}
      <div className="services-reel-vignette left" aria-hidden="true" />
      <div className="services-reel-vignette right" aria-hidden="true" />

      {/* Floating Project Counter */}
      <div className="services-reel-counter glass-panel" aria-live="polite">
        <span className="services-reel-counter-active">
          {String(activeIndex + 1).padStart(2, '0')}
        </span>
        <span className="services-reel-counter-divider">/</span>
        <span className="services-reel-counter-total">
          {String(projects.length).padStart(2, '0')}
        </span>
        <span className="services-reel-counter-label">PROJECTS</span>
      </div>

      {/* Infinite Motion Track */}
      <div
        ref={trackRef}
        className="services-reel-track"
        style={{
          willChange: 'transform',
        }}
      >
        {repeatedProjects.map((item) => (
          <div key={item.key} className="services-reel-item">
            <ProjectCard
              project={item.project}
              serviceName={serviceName}
              onSelect={onSelectProject}
              index={item.originalIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
