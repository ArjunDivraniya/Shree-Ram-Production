import React, { useCallback, useMemo, useState } from 'react';
import type { PillarWithServices, PortfolioItem } from '../../types';
import { PORTFOLIO_ITEMS } from '../../data/content';
import { ServiceSelector } from './ServiceSelector';
import { CinematicProjectStage } from './CinematicProjectStage';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface PillarShowcaseProps {
  pillar: PillarWithServices;
  pillarIndex: number;
  totalPillars: number;
}

export const PillarShowcase: React.FC<PillarShowcaseProps> = ({
  pillar,
  pillarIndex,
  totalPillars,
}) => {
  const isReversed = pillarIndex % 2 === 1;
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });
  const reducedMotion = useReducedMotion();

  // Resolve projects once for the entire pillar so hovering categories does not change/switch the marquee projects
  const pillarProjects = useMemo((): PortfolioItem[] => {
    const categoryMap: Record<string, string> = {
      'content-production': 'production',
      'brand-creative': 'branding',
      'marketing-growth': 'marketing',
      'technology-digital': 'technology',
    };
    const targetCategory = categoryMap[pillar.id];

    // Collect any projects optionally referenced in this pillar's services
    const referenced = pillar.services
      .flatMap((s) => s.projectIds ?? [])
      .map((id) => PORTFOLIO_ITEMS.find((p) => p.id === id))
      .filter((p): p is PortfolioItem => Boolean(p));

    // Combine with category-matching projects
    const categoryProjects = targetCategory
      ? PORTFOLIO_ITEMS.filter((p) => p.category === targetCategory)
      : [];

    const map = new Map<string, PortfolioItem>();
    [...categoryProjects, ...referenced].forEach((p) => {
      if (!map.has(p.id)) map.set(p.id, p);
    });

    const list = Array.from(map.values());
    if (list.length >= 4) return list;

    // Fallback if fewer than 4 projects (exclude graphic design multi-photo suites)
    const remaining = PORTFOLIO_ITEMS.filter((p) => !map.has(p.id) && p.category !== 'graphic-design');
    return [...list, ...remaining.slice(0, Math.max(0, 5 - list.length))];
  }, [pillar]);

  const [prevPillarId, setPrevPillarId] = useState<string>(pillar.id);
  const [activeServiceId, setActiveServiceId] = useState<string>(pillar.services[0].id);
  const [direction, setDirection] = useState<'down' | 'up'>('down');

  if (prevPillarId !== pillar.id) {
    setPrevPillarId(pillar.id);
    setActiveServiceId(pillar.services[0].id);
  }

  const activeService =
    pillar.services.find((s) => s.id === activeServiceId) ?? pillar.services[0];

  const handleServiceSelect = useCallback(
    (serviceId: string) => {
      if (serviceId === activeServiceId) return;

      const currIdx = pillar.services.findIndex((s) => s.id === activeServiceId);
      const nextIdx = pillar.services.findIndex((s) => s.id === serviceId);

      setDirection(nextIdx > currIdx ? 'down' : 'up');
      setActiveServiceId(serviceId);
      // Projects remain constant for the pillar; only activeService (title + description) updates!
    },
    [activeServiceId, pillar.services],
  );

  const stagger = (delay: number) =>
    reducedMotion
      ? {}
      : {
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 0.7s var(--ease-out-expo) ${delay}ms, transform 0.7s var(--ease-out-expo) ${delay}ms`,
        };

  const selectorBlock = (
    <ServiceSelector
      services={pillar.services}
      activeServiceId={activeServiceId}
      onSelect={handleServiceSelect}
      isReversed={isReversed}
    />
  );

  const detailBlock = (
    <div className="services-cinematic-panel">
      {/* GSAP Cinematic Stage */}
      <CinematicProjectStage
        service={activeService}
        projects={pillarProjects}
        direction={direction}
        isReversed={isReversed}
      />
    </div>
  );

  return (
    <section
      ref={ref}
      id={`pillar-${pillar.id}`}
      aria-labelledby={`pillar-title-${pillar.id}`}
      className="services-pillar-section"
    >
      {/* Pillar counter indicator */}
      <div className="services-pillar-counter" style={stagger(0)}>
        <span className="services-pillar-counter-current">{pillar.number}</span>
        <span className="services-pillar-counter-sep">/</span>
        <span className="services-pillar-counter-total">
          {String(totalPillars).padStart(2, '0')}
        </span>
      </div>

      <div className="services-pillar-header" style={stagger(80)}>
        <div className="services-pillar-line" aria-hidden="true" />
        <h2 id={`pillar-title-${pillar.id}`} className="services-pillar-title">
          {pillar.title}
        </h2>
        <p className="services-pillar-description">{pillar.description}</p>
      </div>

      <div className="services-pillar-layout" style={stagger(160)}>
        <div className="services-pillar-selector">{selectorBlock}</div>
        <div className="services-pillar-detail">{detailBlock}</div>
      </div>
    </section>
  );
};
