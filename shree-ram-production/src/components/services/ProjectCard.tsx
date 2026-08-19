import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { PortfolioItem } from '../../types';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ProjectCardProps {
  project: PortfolioItem;
  serviceName: string;
  onSelect?: (project: PortfolioItem) => void;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  serviceName,
  onSelect,
  index,
}) => {
  const reducedMotion = useReducedMotion();

  return (
    <article
      className="services-project-card"
      style={{
        flex: '0 0 auto',
        width: '100%',
        minWidth: 0,
        cursor: onSelect ? 'pointer' : 'default',
        animationDelay: reducedMotion ? '0ms' : `${index * 60}ms`,
      }}
      onClick={() => onSelect?.(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.(project);
        }
      }}
      tabIndex={onSelect ? 0 : undefined}
      role={onSelect ? 'button' : undefined}
      aria-label={onSelect ? `View case study: ${project.title}` : undefined}
    >
      <div className="services-project-media">
        <img
          src={project.thumbnail}
          alt={`${project.title} — ${project.client}`}
          loading="lazy"
          className="services-project-image"
        />
        <div className="services-project-overlay" aria-hidden="true" />
        <div className="services-project-meta glass-panel">
          <span className="services-project-service">{serviceName}</span>
          {project.client && (
            <>
              <span className="services-project-dot">·</span>
              <span className="services-project-client">{project.client}</span>
            </>
          )}
        </div>
      </div>

      <div className="services-project-info">
        <h4 className="services-project-title">{project.title}</h4>
        <div className="services-project-link">
          <span>View Project</span>
          <ArrowUpRight size={14} className="services-project-arrow" />
        </div>
      </div>
    </article>
  );
};
