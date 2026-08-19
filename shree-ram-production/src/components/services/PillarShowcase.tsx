import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, X, TrendingUp, CheckCircle2 } from 'lucide-react';
import type { PillarWithServices, PortfolioItem, ServiceDetail } from '../../types';
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

  const [activeServiceId, setActiveServiceId] = useState(pillar.services[0].id);
  const [direction, setDirection] = useState<'down' | 'up'>('down');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const activeService =
    pillar.services.find((s) => s.id === activeServiceId) ?? pillar.services[0];

  const resolveProjects = useCallback((service: ServiceDetail): PortfolioItem[] => {
    const projects = service.projectIds
      .map((id) => PORTFOLIO_ITEMS.find((p) => p.id === id))
      .filter((p): p is PortfolioItem => Boolean(p));

    // Fallback if service has fewer than 4 projects
    if (projects.length < 4) {
      const remaining = PORTFOLIO_ITEMS.filter((p) => !projects.some((existing) => existing.id === p.id));
      return [...projects, ...remaining.slice(0, 5 - projects.length)];
    }
    return projects.slice(0, 5);
  }, []);

  const [displayProjects, setDisplayProjects] = useState<PortfolioItem[]>(() =>
    resolveProjects(pillar.services[0]),
  );

  const handleServiceSelect = useCallback(
    (serviceId: string) => {
      if (serviceId === activeServiceId) return;

      const currIdx = pillar.services.findIndex((s) => s.id === activeServiceId);
      const nextIdx = pillar.services.findIndex((s) => s.id === serviceId);

      setDirection(nextIdx > currIdx ? 'down' : 'up');
      setActiveServiceId(serviceId);

      const nextService = pillar.services.find((s) => s.id === serviceId);
      if (nextService) {
        setDisplayProjects(resolveProjects(nextService));
      }
    },
    [activeServiceId, pillar.services, resolveProjects],
  );

  useEffect(() => {
    setActiveServiceId(pillar.services[0].id);
    setDisplayProjects(resolveProjects(pillar.services[0]));
  }, [pillar.id, pillar.services, resolveProjects]);

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
        projects={displayProjects}
        onSelectProject={setSelectedProject}
        direction={direction}
        isReversed={isReversed}
      />

      <Link
        to={`/work?service=${activeService.id}`}
        className="services-view-work-link"
      >
        <span>View All {activeService.name} Work</span>
        <ArrowUpRight size={16} className="services-view-work-arrow" />
      </Link>
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

      <div
        className={`services-pillar-layout ${isReversed ? 'reversed' : ''}`}
        style={stagger(160)}
      >
        {isReversed ? (
          <>
            <div className="services-pillar-detail">{detailBlock}</div>
            <div className="services-pillar-selector">{selectorBlock}</div>
          </>
        ) : (
          <>
            <div className="services-pillar-selector">{selectorBlock}</div>
            <div className="services-pillar-detail">{detailBlock}</div>
          </>
        )}
      </div>

      {/* Case study modal */}
      {selectedProject && (
        <div
          className="services-modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Case study: ${selectedProject.title}`}
        >
          <div className="services-modal" onClick={(e) => e.stopPropagation()}>
            <div className="services-modal-image-wrap">
              <img src={selectedProject.thumbnail} alt={selectedProject.title} />
              <button
                type="button"
                className="services-modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close case study"
              >
                <X size={20} />
              </button>
            </div>
            <div className="services-modal-body">
              <div className="services-modal-tags">
                <span className="badge-pill">{activeService.name}</span>
                <span className="services-modal-client">
                  Client: <strong>{selectedProject.client}</strong>
                </span>
                <span className="services-modal-client">
                  Year: {selectedProject.year}
                </span>
              </div>

              <h3>{selectedProject.title}</h3>

              <div className="services-modal-metric">
                <TrendingUp size={24} color="var(--accent-orange)" />
                <div>
                  <div className="services-modal-metric-value">{selectedProject.metrics.value}</div>
                  <div className="services-modal-metric-label">{selectedProject.metrics.label}</div>
                </div>
              </div>

              <p style={{ marginBottom: '20px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {selectedProject.summary}
              </p>

              {(selectedProject.challenge || selectedProject.solution) && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                  {selectedProject.challenge && (
                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '10px' }}>
                      <div style={{ color: 'var(--accent-orange)', fontWeight: 700, fontSize: '0.78rem', marginBottom: '6px', letterSpacing: '0.06em' }}>
                        THE CHALLENGE
                      </div>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                        {selectedProject.challenge}
                      </p>
                    </div>
                  )}
                  {selectedProject.solution && (
                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '10px' }}>
                      <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.78rem', marginBottom: '6px', letterSpacing: '0.06em' }}>
                        CREATIVE SOLUTION
                      </div>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                        {selectedProject.solution}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {selectedProject.deliverables && selectedProject.deliverables.length > 0 && (
                <div>
                  <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '10px', fontSize: '0.82rem', letterSpacing: '0.06em' }}>
                    KEY DELIVERABLES
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedProject.deliverables.map((del) => (
                      <span
                        key={del}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          fontSize: '0.78rem',
                          color: '#E0E0E0',
                        }}
                      >
                        <CheckCircle2 size={12} color="var(--accent-orange)" />
                        {del}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
