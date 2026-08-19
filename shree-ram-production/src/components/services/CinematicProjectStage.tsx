import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import type { PortfolioItem, ServiceDetail } from '../../types';
import { ProjectCard } from './ProjectCard';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CinematicProjectStageProps {
  service: ServiceDetail;
  projects: PortfolioItem[];
  onSelectProject: (project: PortfolioItem) => void;
  direction?: 'down' | 'up';
  isReversed?: boolean;
}

export const CinematicProjectStage: React.FC<CinematicProjectStageProps> = ({
  service,
  projects,
  onSelectProject,
  direction = 'down',
  isReversed = false,
}) => {
  const reducedMotion = useReducedMotion();
  const { ref: stageRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  const textRef = useRef<HTMLDivElement>(null);
  const titleMaskRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Keep track of active service ID for transition triggers
  const prevServiceIdRef = useRef<string>(service.id);

  // Depth tier assignment & asymmetrical 3D positions for visual composition
  const stageComposition = React.useMemo(() => {
    if (!projects || projects.length === 0) return [];

    // Tiers: foreground (hero scale 1.0), middle (scale ~0.88), background (scale ~0.78)
    const tiers: ('foreground' | 'middle' | 'background')[] = [
      'foreground',
      'middle',
      'middle',
      'background',
      'background',
    ];

    // Asymmetric offset presets (desktop percentage coordinates)
    const layoutOffsets = isReversed
      ? [
          { x: 5, y: 10 },    // Foreground
          { x: -35, y: -20 }, // Middle Left
          { x: 38, y: 35 },   // Middle Right
          { x: -48, y: 30 },  // Background Far Left
          { x: 45, y: -30 },  // Background Far Right
        ]
      : [
          { x: -5, y: 10 },   // Foreground
          { x: 35, y: -20 },  // Middle Right
          { x: -38, y: 35 },  // Middle Left
          { x: 48, y: 30 },   // Background Far Right
          { x: -45, y: -30 }, // Background Far Left
        ];

    return projects.slice(0, 5).map((project, idx) => ({
      project,
      tier: tiers[idx % tiers.length],
      offset: layoutOffsets[idx % layoutOffsets.length],
      idx,
    }));
  }, [projects, isReversed]);

  // GSAP Orchestrated Entrance & Directional Transitions
  useEffect(() => {
    if (reducedMotion || !stageRef.current) return;

    const ctx = gsap.context(() => {
      const isNewService = prevServiceIdRef.current !== service.id;
      prevServiceIdRef.current = service.id;

      const cardElements = gsap.utils.toArray<HTMLElement>('.cinematic-card-item');

      // Directional offsets
      const enterY = direction === 'down' ? 60 : -60;
      const enterX = direction === 'down' ? 40 : -40;

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.9 },
      });

      if (isNewService) {
        // Step 1: Animate text & title mask reveal
        if (titleMaskRef.current) {
          tl.fromTo(
            titleMaskRef.current,
            { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 35, opacity: 0 },
            { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', y: 0, opacity: 1, duration: 0.8 },
            0,
          );
        }

        if (textRef.current) {
          const textChildren = textRef.current.querySelectorAll('.cinematic-text-anim');
          tl.fromTo(
            textChildren,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.7 },
            0.1,
          );
        }

        // Step 2: Animate directional entrance for project visual cards
        if (cardElements.length > 0) {
          tl.fromTo(
            cardElements,
            {
              opacity: 0,
              x: (i) => enterX + (i % 2 === 0 ? -20 : 20),
              y: (i) => enterY + i * 15,
              scale: 0.82,
              rotation: (i) => (i % 2 === 0 ? -2 : 2),
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotation: 0,
              stagger: 0.09,
              duration: 1.0,
              ease: 'power3.out',
            },
            0.15,
          );
        }
      } else if (isInView) {
        // Initial viewport scroll-in reveal
        if (titleMaskRef.current) {
          tl.fromTo(
            titleMaskRef.current,
            { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 30, opacity: 0 },
            { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', y: 0, opacity: 1, duration: 0.8 },
            0,
          );
        }

        if (cardElements.length > 0) {
          tl.fromTo(
            cardElements,
            { opacity: 0, y: 40, scale: 0.85 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.9 },
            0.2,
          );
        }
      }

      // Step 3: Add subtle continuous ambient floating motion
      cardElements.forEach((card, idx) => {
        const floatDist = idx % 2 === 0 ? 8 : -8;
        gsap.to(card, {
          y: `+=${floatDist}`,
          duration: 3 + (idx % 3) * 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.5 + idx * 0.2,
        });
      });
    }, stageRef);

    return () => ctx.revert();
  }, [service.id, direction, reducedMotion, isInView, stageRef]);

  // Scroll velocity physics (subtly influences project card positions on window scroll)
  useEffect(() => {
    if (reducedMotion || !cardsContainerRef.current) return;

    let lastScrollY = window.scrollY;
    let lastTime = performance.now();

    const cardElements = gsap.utils.toArray<HTMLElement>('.cinematic-card-item');
    const quickToY = cardElements.map((card) =>
      gsap.quickTo(card, 'y', { duration: 0.6, ease: 'power2.out' }),
    );

    const handleScroll = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const currentY = window.scrollY;
      const dy = currentY - lastScrollY;

      const velocity = dy / dt; // velocity factor
      const displacement = Math.max(-18, Math.min(18, velocity * 14));

      quickToY.forEach((setter, idx) => {
        // Foreground moves slightly more than background for subtle parallax depth
        const depthFactor = idx === 0 ? 1.2 : idx < 3 ? 0.9 : 0.6;
        setter(displacement * depthFactor);
      });

      lastScrollY = currentY;
      lastTime = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion]);

  if (!projects || projects.length === 0) return null;

  return (
    <div
      ref={stageRef}
      className="cinematic-stage-container"
      aria-label={`${service.name} cinematic project showcase`}
    >
      {/* Background visual atmosphere */}
      <div className="cinematic-radial-glow" aria-hidden="true" />
      <div className="cinematic-edge-vignette" aria-hidden="true" />

      {/* Central Information Anchor */}
      <div ref={textRef} className="cinematic-stage-text-anchor">
        <div className="cinematic-text-anim cinematic-label-pill glass-panel">
          <span className="cinematic-label-dot" />
          <span>SELECTED SERVICE</span>
        </div>

        <div className="cinematic-text-anim cinematic-service-number">{service.number}</div>

        <h3 ref={titleMaskRef} className="cinematic-service-title">
          {service.name}
        </h3>

        <p className="cinematic-text-anim cinematic-service-description">
          {service.description}
        </p>

        <div className="cinematic-text-anim cinematic-project-count-badge glass-panel">
          <span>{projects.length} PROJECTS SHOWCASE</span>
        </div>
      </div>

      {/* Asymmetric 3D Depth Project Stage Composition */}
      <div ref={cardsContainerRef} className="cinematic-stage-composition">
        {stageComposition.map(({ project, tier, offset, idx }) => {
          const isHovered = hoveredCardId === project.id;
          return (
            <div
              key={`${service.id}-${project.id}`}
              className={`cinematic-card-item depth-${tier}`}
              style={{
                ['--offset-x' as string]: `${offset.x}%`,
                ['--offset-y' as string]: `${offset.y}px`,
                zIndex: tier === 'foreground' ? 5 : tier === 'middle' ? 3 : 1,
              }}
              onMouseEnter={() => setHoveredCardId(project.id)}
              onMouseLeave={() => setHoveredCardId(null)}
            >
              <ProjectCard
                project={project}
                serviceName={service.name}
                onSelect={onSelectProject}
                index={idx}
                depthTier={tier}
                isHovered={isHovered}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
