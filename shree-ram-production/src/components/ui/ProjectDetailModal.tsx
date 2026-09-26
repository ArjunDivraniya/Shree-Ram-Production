import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { PortfolioItem } from '../../types';
import { X, CheckCircle2, ArrowUpRight, Layers, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = project?.images && project.images.length > 0
    ? project.images
    : project?.thumbnail
      ? [project.thumbnail]
      : [];
  const totalImages = images.length;

  const handlePrevLightbox = useCallback(() => {
    if (lightboxIndex === null || totalImages <= 1) return;
    setLightboxIndex((prev) => (prev === null || prev === 0 ? totalImages - 1 : prev - 1));
  }, [lightboxIndex, totalImages]);

  const handleNextLightbox = useCallback(() => {
    if (lightboxIndex === null || totalImages <= 1) return;
    setLightboxIndex((prev) => (prev === null || prev === totalImages - 1 ? 0 : prev + 1));
  }, [lightboxIndex, totalImages]);

  // Keyboard navigation (ESC closes lightbox or modal, Left/Right navigates lightbox)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          onClose();
        }
      } else if (lightboxIndex !== null) {
        if (e.key === 'ArrowLeft') {
          handlePrevLightbox();
        } else if (e.key === 'ArrowRight') {
          handleNextLightbox();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, lightboxIndex, handlePrevLightbox, handleNextLightbox]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen || !project) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999, // Super elevated above navbar and all stacking contexts
        backgroundColor: 'rgba(3, 4, 6, 0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px, 3vh, 32px) clamp(14px, 3vw, 28px)',
        animation: 'pdmFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <style>{`
        @keyframes pdmFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pdmScaleUp {
          from { opacity: 0; transform: scale(0.96) translateY(6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .pdm-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .pdm-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 4px;
        }
        .pdm-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.22);
          border-radius: 4px;
        }
        .pdm-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 106, 42, 0.6);
        }
        .pdm-photo-card:hover .pdm-zoom-badge {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }
        .pdm-photo-card:hover img {
          transform: scale(1.02) !important;
        }
        @media (max-width: 680px) {
          .pdm-grid-cols {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Main Modal Dialog Window (Centered, Compact, and strictly outside/above navbar) */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 'min(940px, 94vw)',
          maxHeight: 'min(84vh, 760px)',
          height: 'auto',
          margin: 'auto',
          backgroundColor: '#0A0C10',
          borderRadius: '18px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95), 0 0 45px rgba(255, 106, 42, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'pdmScaleUp 0.26s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Top Radiant Accent Border */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, var(--accent-orange) 50%, transparent 100%)',
            zIndex: 10,
          }}
        />

        {/* Modal Header */}
        <div
          style={{
            flexShrink: 0,
            padding: '16px 22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(10, 12, 16, 0.98)',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-orange)',
                  backgroundColor: 'rgba(255, 106, 42, 0.12)',
                  border: '1px solid rgba(255, 106, 42, 0.28)',
                  padding: '2px 8px',
                  borderRadius: '999px',
                }}
              >
                {project.categoryLabel || 'Development Project'}
              </span>

              {project.client && (
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Client: <strong style={{ color: '#E2E8F0' }}>{project.client}</strong>
                </span>
              )}

              {project.year && (
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                  • {project.year}
                </span>
              )}

              {totalImages > 0 && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.74rem',
                    color: '#CBD5E1',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontWeight: 600,
                  }}
                >
                  <Layers size={12} style={{ color: 'var(--accent-orange)' }} />
                  {totalImages} Screens
                </span>
              )}
            </div>

            <h2
              id="project-modal-title"
              style={{
                fontSize: 'clamp(1.1rem, 1.8vw, 1.45rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {project.title}
            </h2>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close project modal"
            style={{
              flexShrink: 0,
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 106, 42, 0.2)';
              e.currentTarget.style.borderColor = 'var(--accent-orange)';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div
          className="pdm-scrollbar"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            backgroundColor: '#0A0C10',
          }}
        >
          {/* Project Overview */}
          {project.summary && (
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '12px',
                padding: '14px 18px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <h3
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-orange)',
                  marginBottom: '5px',
                }}
              >
                Project Architecture & Overview
              </h3>
              <p
                style={{
                  fontSize: '0.92rem',
                  lineHeight: 1.55,
                  color: '#CBD5E1',
                  margin: 0,
                }}
              >
                {project.summary}
              </p>
            </div>
          )}

          {/* Deliverables / Capabilities (Strictly NO Metrics, NO Challenge, NO Solution) */}
          {project.deliverables && project.deliverables.length > 0 && (
            <div>
              <h3
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '8px',
                }}
              >
                Key Modules & Functional Deliverables
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '7px',
                }}
              >
                {project.deliverables.map((item, idx) => (
                  <div
                    key={`deliv-${idx}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.025)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      fontSize: '0.82rem',
                      color: '#E2E8F0',
                    }}
                  >
                    <CheckCircle2 size={14} style={{ color: 'var(--accent-orange)', flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expansive High-Resolution Photo Grid */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <h3
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                System Interfaces & Screenshots ({totalImages})
              </h3>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                Click any screenshot to expand full resolution
              </span>
            </div>

            <div
              className="pdm-grid-cols"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
                gap: '14px',
              }}
            >
              {images.map((imgSrc, idx) => (
                <div
                  key={`photo-grid-${imgSrc}-${idx}`}
                  className="pdm-photo-card"
                  onClick={() => setLightboxIndex(idx)}
                  style={{
                    position: 'relative',
                    aspectRatio: '16/10',
                    backgroundColor: '#050608',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={`${project.title} — Interface Screenshot ${idx + 1}`}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block',
                      backgroundColor: '#050608',
                      transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />

                  {/* Ambient Bottom Gradient */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(5, 7, 10, 0.75) 0%, transparent 40%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Screen Number Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '10px',
                      padding: '3px 8px',
                      borderRadius: '5px',
                      backgroundColor: 'rgba(8, 9, 10, 0.85)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: '#E2E8F0',
                      letterSpacing: '0.04em',
                    }}
                  >
                    <span>Screen </span>
                    <span style={{ color: 'var(--accent-orange)' }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span style={{ opacity: 0.4, margin: '0 3px' }}>/</span>
                    <span style={{ opacity: 0.7 }}>{String(totalImages).padStart(2, '0')}</span>
                  </div>

                  {/* Hover Expand Zoom Badge */}
                  <div
                    className="pdm-zoom-badge"
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      padding: '5px 10px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(8, 9, 10, 0.88)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 106, 42, 0.5)',
                      color: '#FFFFFF',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      opacity: 0,
                      transform: 'translateY(-3px) scale(0.95)',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    <span>EXPAND</span>
                    <Maximize2 size={11} style={{ color: 'var(--accent-orange)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div
          style={{
            flexShrink: 0,
            padding: '14px 22px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(10, 12, 16, 0.98)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Need custom software, POS, or web platform engineering for your business?
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href="https://wa.me/919313119830?text=Hello%20Shree%20Ram%20Production%2C%20I%20am%20interested%20in%20a%20development%20project%20similar%20to%20your%20showcase."
              target="_blank"
              rel="noopener noreferrer"
              className="srp-btn srp-btn--primary srp-btn--sm"
              style={{ textDecoration: 'none' }}
            >
              <span>INQUIRE ABOUT THIS PROJECT</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Overlay for Deep Inspection */}
      {lightboxIndex !== null && images[lightboxIndex] && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setLightboxIndex(null);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000000,
            backgroundColor: 'rgba(2, 3, 5, 0.96)',
            backdropFilter: 'blur(24px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'pdmFadeIn 0.2s ease',
          }}
        >
          {/* Lightbox Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Close fullscreen view"
            style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-orange)';
              e.currentTarget.style.borderColor = 'var(--accent-orange)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <X size={20} />
          </button>

          {/* Lightbox Navigation Buttons */}
          {totalImages > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevLightbox();
                }}
                aria-label="Previous image"
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-orange)';
                  e.currentTarget.style.borderColor = 'var(--accent-orange)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextLightbox();
                }}
                aria-label="Next image"
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-orange)';
                  e.currentTarget.style.borderColor = 'var(--accent-orange)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Lightbox Center Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '92vw',
              maxHeight: '86vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={images[lightboxIndex]}
              alt={`${project.title} — Screen ${lightboxIndex + 1}`}
              style={{
                maxWidth: '92vw',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 20px 80px rgba(0, 0, 0, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            />
            <div
              style={{
                marginTop: '10px',
                fontSize: '0.8rem',
                color: '#CBD5E1',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                padding: '4px 14px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <span>Screenshot </span>
              <strong style={{ color: 'var(--accent-orange)' }}>{lightboxIndex + 1}</strong>
              <span> of {totalImages}</span>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};
