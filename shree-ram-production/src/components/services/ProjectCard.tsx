import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { PortfolioItem } from '../../types';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ProjectCardProps {
  project: PortfolioItem;
  serviceName: string;
  onSelect?: (project: PortfolioItem) => void;
  index: number;
  depthTier?: 'foreground' | 'middle' | 'background';
  isHovered?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  serviceName,
  onSelect,
  index,
  depthTier = 'foreground',
  isHovered = false,
}) => {
  const reducedMotion = useReducedMotion();

  const cardClasses = [
    'services-project-card',
    'editorial',
    `tier-${depthTier}`,
    isHovered ? 'hovered' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article
      className={cardClasses}
      style={{
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

        {/* Hover overlay with title & CTA button */}
        <div className="services-project-hover-overlay" aria-hidden="true">
          <div className="services-project-hover-content">
            <h4 className="services-project-title-hover">{project.title}</h4>
            <div className="services-project-cta-pill">
              <span>VIEW PROJECT</span>
              <ArrowUpRight size={14} className="services-project-arrow" />
            </div>
          </div>
        </div>

        {/* Top-right metric tag */}
        {project.metrics?.value && (
          <div className="services-project-metric-badge glass-panel">
            <span>{project.metrics.value}</span>
          </div>
        )}
      </div>

      {/* Minimal Editorial Footer */}
      <div className="services-project-editorial-footer">
        <span className="services-project-service-tag">{serviceName}</span>
        {project.client && (
          <>
            <span className="services-project-dot">·</span>
            <span className="services-project-client-name">{project.client}</span>
          </>
        )}
      </div>
    </article>
  );
};
