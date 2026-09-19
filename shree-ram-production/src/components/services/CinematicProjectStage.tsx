import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import type { PortfolioItem, ServiceDetail } from '../../types';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CinematicProjectStageProps {
  service: ServiceDetail;
  projects: PortfolioItem[];
  direction?: 'down' | 'up';
  isReversed?: boolean;
}

// Preset height & offset profiles for staggered vertical rhythm matching reference photo
const STAGGER_PROFILES = [
  { height: '380px', aspectRatio: '3/4', marginTop: '30px' },  // Card 0: Medium-low offset
  { height: '500px', aspectRatio: '9/16', marginTop: '0px' },   // Card 1: Extra tall hero portrait
  { height: '440px', aspectRatio: '3/4', marginTop: '18px' },  // Card 2: Mid-tall portrait
  { height: '400px', aspectRatio: '4/5', marginTop: '40px' },  // Card 3: Mid-low portrait
  { height: '460px', aspectRatio: '9/16', marginTop: '12px' },  // Card 4: Tall portrait
];

export const CinematicProjectStage: React.FC<CinematicProjectStageProps> = ({
  service,
  projects,
  direction = 'down',
}) => {
  const reducedMotion = useReducedMotion();
  const { ref: stageRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  const trackRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleMaskRef = useRef<HTMLHeadingElement>(null);

  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Marquee transform animation state
  const offsetRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartOffsetRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Repeat projects 4 times to build an endless seamless marquee track
  const galleryProjects = useMemo(() => {
    if (!projects || projects.length === 0) return [];
    return [...projects, ...projects, ...projects, ...projects];
  }, [projects]);

  // Format header category text above each card (e.g. DEVELOPMENT, ILLUSTRATIONS, FASHION)
  const getCategoryLabel = useCallback((project: PortfolioItem): string => {
    if (project.categoryLabel) {
      return project.categoryLabel.toUpperCase();
    }
    return (project.category || '').toUpperCase();
  }, []);

  // Smooth continuous right-to-left GPU marquee loop (never stops on cursor hover or category hover)
  useEffect(() => {
    if (reducedMotion || !projects || projects.length === 0) return;

    let mounted = true;
    let lastTime = performance.now();
    const baseSpeed = 0.75; // pixels per frame at 60fps (smooth right-to-left movement)

    const animateMarquee = (time: number) => {
      if (!mounted) return;

      const track = trackRef.current;
      const dt = Math.min(32, time - lastTime);
      lastTime = time;

      if (track && !isDraggingRef.current) {
        // Always auto-scroll continuously right-to-left
        offsetRef.current += baseSpeed * (dt / 16.6);

        const totalWidth = track.scrollWidth;
        const singleSetWidth = totalWidth / 4; // 4 repeated copies

        if (singleSetWidth > 0) {
          // Continuous infinite right-to-left loop with zero stutter
          if (offsetRef.current >= singleSetWidth) {
            offsetRef.current -= singleSetWidth;
          } else if (offsetRef.current < 0) {
            offsetRef.current += singleSetWidth;
          }

          track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;

          // Active card index indicator
          const cardWidth = 298; // item width + gap
          const rawIdx = Math.floor(offsetRef.current / cardWidth);
          const currentIdx = ((rawIdx % projects.length) + projects.length) % projects.length;
          setActiveIndex(currentIdx);
        }
      }

      animFrameIdRef.current = requestAnimationFrame(animateMarquee);
    };

    animFrameIdRef.current = requestAnimationFrame(animateMarquee);

    return () => {
      mounted = false;
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [reducedMotion, projects]);

  // Touch & Mouse Drag Handlers for Smooth Interactive Control
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDraggingRef.current = true;
    const pageX = 'touches' in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX;
    dragStartXRef.current = pageX;
    dragStartOffsetRef.current = offsetRef.current;
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    const pageX = 'touches' in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX;
    const deltaX = dragStartXRef.current - pageX;
    offsetRef.current = dragStartOffsetRef.current + deltaX;

    const totalWidth = trackRef.current.scrollWidth;
    const singleSetWidth = totalWidth / 4;
    if (singleSetWidth > 0) {
      if (offsetRef.current >= singleSetWidth) offsetRef.current -= singleSetWidth;
      if (offsetRef.current < 0) offsetRef.current += singleSetWidth;
      trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    }
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab';
    }
  };

  // Nav buttons (< and >)
  const scrollNav = (navDir: 'left' | 'right') => {
    const shift = navDir === 'right' ? 320 : -320;
    offsetRef.current += shift;
  };

  const descRef = useRef<HTMLParagraphElement>(null);

  // Smooth GSAP transition for service title and description change on category hover
  useEffect(() => {
    if (reducedMotion) return;

    if (titleMaskRef.current && descRef.current) {
      const enterY = direction === 'down' ? 12 : -12;
      gsap.fromTo(
        [titleMaskRef.current, descRef.current],
        { opacity: 0, y: enterY },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', stagger: 0.04 }
      );
    }
  }, [service.id, direction, reducedMotion]);

  // Initial entrance animation for project cards when entering viewport
  const hasAnimatedCardsRef = useRef<boolean>(false);
  useEffect(() => {
    if (reducedMotion || !stageRef.current || !isInView || hasAnimatedCardsRef.current) return;
    hasAnimatedCardsRef.current = true;

    const ctx = gsap.context(() => {
      const cardItems = gsap.utils.toArray<HTMLElement>('.cinematic-gallery-item');
      if (cardItems.length > 0) {
        gsap.fromTo(
          cardItems,
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.04, duration: 0.8, ease: 'power3.out' },
        );
      }
    }, stageRef);

    return () => ctx.revert();
  }, [isInView, reducedMotion, stageRef]);

  if (!projects || projects.length === 0) return null;

  return (
    <div
      ref={stageRef}
      className="cinematic-gallery-container"
      aria-label={`${service.name} cinematic horizontal gallery`}
      onMouseLeave={handleMouseUpOrLeave}
    >
      {/* Background Glow Atmosphere */}
      <div className="cinematic-radial-glow" aria-hidden="true" />

      {/* Gallery Header Bar with Service Info & Navigation Controls */}
      <div className="cinematic-gallery-header-bar">
        <div ref={textRef} className="cinematic-gallery-info">
          <div className="cinematic-label-pill glass-panel">
            <span className="cinematic-label-dot" />
            <span>SELECTED SERVICE</span>
          </div>
          <h3 ref={titleMaskRef} className="cinematic-gallery-service-title">
            {service.name}
          </h3>
          <p ref={descRef} className="cinematic-gallery-service-desc">{service.description}</p>
        </div>

        {/* Gallery Controls & Counter */}
        <div className="cinematic-gallery-controls">
          <div className="cinematic-gallery-counter">
            <span className="cinematic-counter-current">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="cinematic-counter-sep">/</span>
            <span className="cinematic-counter-total">
              {String(projects.length).padStart(2, '0')}
            </span>
          </div>

          <div className="cinematic-gallery-nav-btns">
            <button
              type="button"
              className="cinematic-nav-btn"
              onClick={() => scrollNav('left')}
              aria-label="Scroll gallery left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="cinematic-nav-btn"
              onClick={() => scrollNav('right')}
              aria-label="Scroll gallery right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Outer Marquee Viewport touching bottom */}
      <div
        className="cinematic-gallery-viewport"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUpOrLeave}
      >
        {/* Infinite GPU Marquee Track */}
        <div
          ref={trackRef}
          className="cinematic-gallery-track"
          style={{ willChange: 'transform' }}
        >
          {galleryProjects.map((project, idx) => {
            const profile = STAGGER_PROFILES[idx % STAGGER_PROFILES.length];
            const isHovered = hoveredCardId === `${project.id}-${idx}`;
            const categoryText = getCategoryLabel(project);

            return (
              <div
                key={`${project.id}-${idx}`}
                className={`cinematic-gallery-item ${isHovered ? 'is-hovered' : ''}`}
                style={{
                  marginTop: profile.marginTop,
                }}
                onMouseEnter={() => setHoveredCardId(`${project.id}-${idx}`)}
                onMouseLeave={() => setHoveredCardId(null)}
                aria-label={`${project.title}`}
              >
                {/* Uppercase Header directly above each portrait card (matching reference photo) */}
                <div className="cinematic-gallery-item-header">
                  <span>{categoryText}</span>
                </div>

                {/* Staggered Portrait Card Media Container touching bottom */}
                <div
                  className="cinematic-gallery-card-media"
                  style={{
                    height: profile.height,
                    aspectRatio: profile.aspectRatio,
                  }}
                >
                  <img
                    src={project.thumbnail}
                    alt={`${project.title} — ${project.client}`}
                    loading="lazy"
                    className="cinematic-gallery-card-img"
                  />

                  {/* Top-Right Performance Metric Tag */}
                  {project.metrics?.value && (
                    <div className="cinematic-gallery-metric-badge glass-panel">
                      <TrendingUp size={11} color="var(--accent-orange)" />
                      <span>{project.metrics.value}</span>
                    </div>
                  )}

                  {/* Card Hover Dark Vignette & Clean Content Overlay */}
                  <div className="cinematic-gallery-hover-overlay">
                    <div className="cinematic-gallery-hover-content">
                      <span className="cinematic-gallery-client-tag">
                        {project.client} · {project.year}
                      </span>
                      <h4 className="cinematic-gallery-project-title">{project.title}</h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


