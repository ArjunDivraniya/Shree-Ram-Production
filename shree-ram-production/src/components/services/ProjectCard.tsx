import React from 'react';
import type { PortfolioItem } from '../../types';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ProjectCardProps {
  project: PortfolioItem;
  serviceName: string;
  index: number;
  depthTier?: 'foreground' | 'middle' | 'background';
  isHovered?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  serviceName,
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
        cursor: 'default',
        animationDelay: reducedMotion ? '0ms' : `${index * 60}ms`,
      }}
    >
      <div className="services-project-media">
        <img
          src={project.thumbnail}
          alt={`${project.title} — ${project.client ? project.client + ' | ' : ''}Creative Portfolio by Shree Ram Production`}
          title={`${project.title} — Shree Ram Production`}
          loading="lazy"
          className="services-project-image"
        />

        {/* Hover overlay with title */}
        <div className="services-project-hover-overlay" aria-hidden="true">
          <div className="services-project-hover-content">
            <h4 className="services-project-title-hover">{project.title}</h4>
          </div>
        </div>
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
