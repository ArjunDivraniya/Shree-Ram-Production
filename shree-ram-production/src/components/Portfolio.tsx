import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { PortfolioItem } from '../types';
import { PORTFOLIO_ITEMS } from '../data/content';
import { findServiceById } from '../utils/serviceUtils';
import { ArrowUpRight, X, TrendingUp } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');

  const serviceMatch = serviceParam ? findServiceById(serviceParam) : null;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'production', label: 'Production' },
    { id: 'branding', label: 'Brand & Creative' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'technology', label: 'Technology' },
  ];

  let filteredProjects = activeCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  if (serviceMatch) {
    const serviceProjectIds = new Set(serviceMatch.service.projectIds);
    filteredProjects = filteredProjects.filter((item) => serviceProjectIds.has(item.id));
  }

  const clearServiceFilter = () => {
    searchParams.delete('service');
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <section
      id="portfolio"
      style={{
        padding: '120px 0',
        backgroundColor: '#0E0F12',
        position: 'relative',
      }}
    >
      <div className="container">
        
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          <div className="badge-pill">
            <span className="badge-pill-dot" />
            <span>{serviceMatch ? `${serviceMatch.service.name.toUpperCase()} WORK` : 'SELECTED WORK & CASE STUDIES'}</span>
          </div>

          {serviceMatch && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Showing work for <strong style={{ color: '#FFFFFF' }}>{serviceMatch.service.name}</strong>
              </span>
              <button
                onClick={clearServiceFilter}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Clear filter
              </button>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                textTransform: 'uppercase',
                maxWidth: '680px',
              }}
            >
              Crafted For High-Growth Brands
            </h2>

            {/* Filter Pills */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: isActive ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.06)',
                      color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                      border: `1px solid ${isActive ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.08)'}`,
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      transition: 'var(--transition-smooth)',
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Portfolio Showcase Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '32px',
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              data-cursor="CASE STUDY"
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-media)',
                overflow: 'hidden',
                backgroundColor: 'var(--surface-dark)',
                border: '1px solid var(--glass-border)',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border-bright)';
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Image Preview Container */}
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '16/10',
                  overflow: 'hidden',
                  backgroundColor: '#000000',
                }}
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s var(--ease-out-expo)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(14, 15, 18, 0.9) 0%, transparent 60%)',
                  }}
                />

                {/* Metrics Pill Badge Top Right */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'rgba(8, 9, 10, 0.8)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--accent-orange)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <TrendingUp size={12} />
                  <span>{project.metrics.value} {project.metrics.label}</span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div style={{ padding: '24px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--accent-orange)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {project.categoryLabel}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    {project.year}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: '10px',
                    color: '#FFFFFF',
                    lineHeight: 1.3,
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                    marginBottom: '16px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {project.summary}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#FFFFFF',
                  }}
                >
                  <span>Read Case Study</span>
                  <ArrowUpRight size={16} color="var(--accent-orange)" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(8, 9, 10, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            overflowY: 'auto',
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '840px',
              width: '100%',
              backgroundColor: 'var(--surface-dark)',
              border: '1px solid var(--glass-border-bright)',
              borderRadius: 'var(--radius-glass)',
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8)',
              animation: 'scaleUp 0.3s var(--ease-out-expo) forwards',
              margin: 'auto',
            }}
          >
            {/* Modal Image Header */}
            <div style={{ position: 'relative', aspectRatio: '21/9', overflow: 'hidden' }}>
              <img
                src={selectedProject.thumbnail}
                alt={selectedProject.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(8, 9, 10, 0.8)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '36px' }}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '16px',
                }}
              >
                <span className="badge-pill">
                  {selectedProject.categoryLabel}
                </span>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                  Client: <strong style={{ color: '#FFFFFF' }}>{selectedProject.client}</strong>
                </span>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                  Year: {selectedProject.year}
                </span>
              </div>

              <h2
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  marginBottom: '16px',
                  color: '#FFFFFF',
                }}
              >
                {selectedProject.title}
              </h2>

              {/* Primary Key Metric Highlight */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 106, 42, 0.1)',
                  border: '1px solid rgba(255, 106, 42, 0.25)',
                  padding: '16px 24px',
                  borderRadius: 'var(--radius-ui)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '28px',
                }}
              >
                <TrendingUp size={28} color="var(--accent-orange)" />
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-orange)' }}>
                    {selectedProject.metrics.value}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Key Metric Outcome ({selectedProject.metrics.label})
                  </div>
                </div>
              </div>

              {/* Challenge & Solution Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '24px',
                  marginBottom: '28px',
                }}
              >
                {selectedProject.challenge && (
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '12px' }}>
                    <div style={{ color: 'var(--accent-orange)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>
                      THE CHALLENGE
                    </div>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                      {selectedProject.challenge}
                    </p>
                  </div>
                )}

                {selectedProject.solution && (
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '12px' }}>
                    <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>
                      CREATIVE & EXECUTION SOLUTION
                    </div>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                      {selectedProject.solution}
                    </p>
                  </div>
                )}
              </div>

              {/* Deliverables */}
              <div>
                <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '12px', fontSize: '0.9rem' }}>
                  KEY DELIVERABLES
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {selectedProject.deliverables.map((del) => (
                    <span
                      key={del}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        fontSize: '0.8rem',
                        color: '#E0E0E0',
                      }}
                    >
                      ✓ {del}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};
