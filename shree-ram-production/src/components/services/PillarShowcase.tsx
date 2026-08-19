import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, X, TrendingUp, CheckCircle2 } from 'lucide-react';
import type { PillarWithServices, PortfolioItem, ServiceDetail } from '../../types';
import { PORTFOLIO_ITEMS } from '../../data/content';
import { ServiceSelector } from './ServiceSelector';
import { ProjectCard } from './ProjectCard';
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
  const [displayService, setDisplayService] = useState<ServiceDetail>(pillar.services[0]);
  const [phase, setPhase] = useState<'idle' | 'exit' | 'enter'>('idle');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeService =
    pillar.services.find((s) => s.id === activeServiceId) ?? pillar.services[0];

  const resolveProjects = useCallback((service: ServiceDetail): PortfolioItem[] => {
    const projects = service.projectIds
      .map((id) => PORTFOLIO_ITEMS.find((p) => p.id === id))
      .filter((p): p is PortfolioItem => Boolean(p));
    return projects.slice(0, 4);
  }, []);

  const [displayProjects, setDisplayProjects] = useState<PortfolioItem[]>(() =>
    resolveProjects(pillar.services[0]),
  );

  const handleServiceSelect = useCallback(
    (serviceId: string) => {
      if (serviceId === activeServiceId) return;

      const nextService = pillar.services.find((s) => s.id === serviceId);
      if (!nextService) return;

      setActiveServiceId(serviceId);

      if (reducedMotion) {
        setDisplayService(nextService);
        setDisplayProjects(resolveProjects(nextService));
        return;
      }

      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }

      setPhase('exit');
      const exitDuration = window.innerWidth < 768 ? 160 : 200;

      transitionTimerRef.current = setTimeout(() => {
        setDisplayService(nextService);
        setDisplayProjects(resolveProjects(nextService));
        setPhase('enter');

        transitionTimerRef.current = setTimeout(() => {
          setPhase('idle');
        }, 380);
      }, exitDuration);
    },
    [activeServiceId, pillar.services, reducedMotion, resolveProjects],
  );

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setActiveServiceId(pillar.services[0].id);
    setDisplayService(pillar.services[0]);
    setDisplayProjects(resolveProjects(pillar.services[0]));
    setPhase('idle');
  }, [pillar.id, pillar.services, resolveProjects]);

  const stagger = (delay: number) =>
    reducedMotion
      ? {}
      : {
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 0.7s var(--ease-out-expo) ${delay}ms, transform 0.7s var(--ease-out-expo) ${delay}ms`,
        };

  const contentClass = [
    'services-content-panel',
    phase === 'exit' ? 'exiting' : '',
    phase === 'enter' ? 'entering' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const selectorBlock = (
    <ServiceSelector
      services={pillar.services}
      activeServiceId={activeServiceId}
      onSelect={handleServiceSelect}
    />
  );

  const detailBlock = (
    <div className={contentClass}>
      <div className="services-selected-header">
        <span className="services-selected-label">Selected Service</span>
        <div className="services-selected-number">{displayService.number}</div>
        <h3 className="services-selected-title">{displayService.name}</h3>
        <p className="services-selected-description">{displayService.description}</p>
      </div>

      <div className="services-projects-grid" role="list" aria-label={`${displayService.name} projects`}>
        {displayProjects.map((project, idx) => (
          <ProjectCard
            key={`${displayService.id}-${project.id}`}
            project={project}
            serviceName={displayService.name}
            onSelect={setSelectedProject}
            index={idx}
          />
        ))}
      </div>

      <Link
        to={`/work?service=${displayService.id}`}
        className="services-view-work-link"
      >
        <span>View All {displayService.name} Work</span>
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
      {/* Pillar transition indicator */}
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
