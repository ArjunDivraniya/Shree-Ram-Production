import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { PortfolioItem } from '../types';
import { PORTFOLIO_ITEMS } from '../data/content';
import { findServiceById } from '../utils/serviceUtils';
import { ArrowUpRight } from 'lucide-react';
import SectionMarker from './ui/SectionMarker';
import { OptimizedVideo } from './ui/OptimizedVideo';
import { AnimatedPhotoGrid } from './ui/AnimatedPhotoGrid';
import { ProjectDetailModal } from './ui/ProjectDetailModal';

gsap.registerPlugin(ScrollTrigger);

const isVideoUrl = (url?: string) => Boolean(url && (url.endsWith('.mp4') || url.endsWith('.webm') || url.includes('/reels/')));

interface PortfolioProps {
  isHomepage?: boolean;
  onNavigate?: (sectionId: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ isHomepage = true }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');
  const serviceMatch = serviceParam ? findServiceById(serviceParam) : null;

  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Standalone page category filter
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // GSAP animation references for homepage showreel
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // Categorized items for 3 distinct streams of work
  // ROW 1: ONLY PRODUCTION REELS (PORTRAIT 9:16 FORMAT)
  const row1Projects = useMemo(
    () => PORTFOLIO_ITEMS.filter((item) => item.category === 'production'),
    []
  );

  // ROW 2: GRAPHIC DESIGNING MULTI-PHOTO SHOWCASE SUITES (MOVING LEFT ←)
  const row2Projects = useMemo(() => {
    const row2ProjectIds = [
      'graphic-design-luxury-jewelry',
      'graphic-design-culinary-hospitality',
      'graphic-design-fashion-apparel',
      'graphic-design-industrial-print',
      'graphic-design-media-events',
      'graphic-design-retail-commerce',
    ];
    return row2ProjectIds
      .map((id) => PORTFOLIO_ITEMS.find((item) => item.id === id))
      .filter(Boolean) as typeof PORTFOLIO_ITEMS;
  }, []);

  // ROW 3: DEVELOPMENT PROJECTS (REAL DEV PROJECTS WITH MULTI-PHOTO SLIDESHOW)
  const row3Projects = useMemo(() => {
    const row3ProjectIds = [
      'cafe-pos-system',
      'car-rental-system',
      'jairamji-enterprise',
      'library-management-system',
      'shivay-studio',
    ];
    return row3ProjectIds
      .map((id) => PORTFOLIO_ITEMS.find((item) => item.id === id))
      .filter(Boolean) as typeof PORTFOLIO_ITEMS;
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    motionQuery.addEventListener('change', handleMotionChange);
    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // GSAP Infinite Auto-Scroll, Dynamic Skew & Velocity Physics
  useEffect(() => {
    if (!isHomepage || isReducedMotion || !sectionRef.current) return;

    let resetTimeout: ReturnType<typeof setTimeout> | undefined;

    const ctx = gsap.context(() => {
      // 1. Entrance animation when section enters viewport
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 50, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // Entrance staggered slide for rows with blur reveal
      if (row1Ref.current) {
        gsap.fromTo(
          row1Ref.current,
          { x: -100, opacity: 0, filter: 'blur(8px)' },
          {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
      }

      if (row2Ref.current) {
        gsap.fromTo(
          row2Ref.current,
          { x: 100, opacity: 0, filter: 'blur(8px)' },
          {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.4,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
      }

      if (row3Ref.current) {
        gsap.fromTo(
          row3Ref.current,
          { x: -100, opacity: 0, filter: 'blur(8px)' },
          {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.4,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
      }

      // 2. Seamless Infinite Loop Tweens
      // Guard: rows must be mounted before creating tweens
      if (!row1Ref.current || !row2Ref.current || !row3Ref.current) return;

      gsap.set(row1Ref.current, { xPercent: -50 });
      gsap.set(row2Ref.current, { xPercent: 0 });
      gsap.set(row3Ref.current, { xPercent: -50 });

      // Row 01 moves RIGHT (xPercent: -50% to 0%)
      const tween1 = gsap.to(row1Ref.current, {
        xPercent: 0,
        repeat: -1,
        duration: 68,
        ease: 'none',
      });

      // Row 02 moves LEFT (xPercent: 0% to -50%)
      const tween2 = gsap.to(row2Ref.current, {
        xPercent: -50,
        repeat: -1,
        duration: 38,
        ease: 'none',
      });

      // Row 03 moves RIGHT (xPercent: -50% to 0%)
      const tween3 = gsap.to(row3Ref.current, {
        xPercent: 0,
        repeat: -1,
        duration: 32,
        ease: 'none',
      });

      // 3. Scroll Velocity & Dynamic Skew Physics Engine
      const velocityST = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          // Guard: targets may be null after unmount / route change — GSAP would throw "Cannot read properties of null (reading '_gsap')"
          if (!row1Ref.current || !row2Ref.current || !row3Ref.current) return;
          const vel = self.getVelocity();

          // Speed Acceleration
          const speedMultiplier = 1 + vel * 0.002;
          const scaleVal = Math.max(-2.5, Math.min(4.2, speedMultiplier));

          // Physical Horizontal Skew based on Scroll Inertia
          const targetSkew = Math.max(-4.5, Math.min(4.5, vel * 0.0022));

          gsap.to([tween1, tween2, tween3], {
            timeScale: scaleVal,
            duration: 0.35,
            overwrite: 'auto',
          });

          const skewTargets = [row1Ref.current, row2Ref.current, row3Ref.current].filter(Boolean) as HTMLElement[];
          if (skewTargets.length) {
            gsap.to(skewTargets, {
              skewX: targetSkew,
              duration: 0.35,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }

          // Smoothly restore normal auto-speed and zero-skew when scroll pauses
          clearTimeout(resetTimeout);
          resetTimeout = setTimeout(() => {
            // Guard again — timeout fires after unmount
            if (!row1Ref.current || !row2Ref.current || !row3Ref.current) return;
            gsap.to([tween1, tween2, tween3], {
              timeScale: 1,
              duration: 1.2,
              ease: 'power3.out',
              overwrite: 'auto',
            });

            const resetTargets = [row1Ref.current, row2Ref.current, row3Ref.current].filter(Boolean) as HTMLElement[];
            if (resetTargets.length) {
              gsap.to(resetTargets, {
                skewX: 0,
                duration: 0.9,
                ease: 'power3.out',
                overwrite: 'auto',
              });
            }
          }, 120);
        },
      });

      void velocityST;
    }, sectionRef);

    return () => {
      clearTimeout(resetTimeout);
      ctx.revert();
    };
  }, [isHomepage, isReducedMotion]);

  // Navigate to complete Work / Portfolio page
  const handleViewAllWork = () => {
    navigate('/work');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter logic for standalone WorkPage view
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'production', label: 'Production' },
    { id: 'graphic-design', label: 'Graphic Design' },
    { id: 'branding', label: 'Brand & Creative' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'technology', label: 'Technology' },
  ];

  let filteredProjects = activeCategory === 'all'
    ? PORTFOLIO_ITEMS
    : activeCategory === 'graphic-design'
    ? PORTFOLIO_ITEMS.filter((item) => item.category === 'graphic-design' || item.categoryLabel?.toLowerCase().includes('graphic'))
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  if (serviceMatch?.service.projectIds && serviceMatch.service.projectIds.length > 0) {
    const serviceProjectIds = new Set(serviceMatch.service.projectIds);
    filteredProjects = filteredProjects.filter((item) => serviceProjectIds.has(item.id));
  }

  const clearServiceFilter = () => {
    searchParams.delete('service');
    setSearchParams(searchParams, { replace: true });
  };

  // =========================================================================
  // 1. HOMEPAGE BORDERLESS CINEMATIC SHOWREEL VIEW
  // =========================================================================
  if (isHomepage && !isReducedMotion) {
    return (
      <section
        ref={sectionRef}
        id="portfolio"
        style={{
          padding: '130px 0',
          background: 'transparent',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Continuous global canvas — section uses transparent background */}

        {/* Section Header */}
        <div
          ref={headingRef}
          className="container"
          style={{
            position: 'relative',
            zIndex: 5,
            marginBottom: '64px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <SectionMarker number="04" label="OUR WORK" align="left" />
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 4.0rem)',
                fontWeight: 800,
                lineHeight: 1.02,
                textTransform: 'uppercase',
                color: '#FFFFFF',
                maxWidth: '820px',
                letterSpacing: '-0.025em',
              }}
            >
              Living Creative{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, var(--accent-orange) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Showreel
              </span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginTop: '12px', maxWidth: '600px' }}>
              Three independent streams of visual production, brand architectures, and performance scale engines moving seamlessly in real time.
            </p>
          </div>

          {/* View All Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={handleViewAllWork}
              className="srp-btn srp-btn--secondary srp-btn--sm"
            >
              <span>VIEW ALL WORK</span>
              <span className="srp-btn__arrow" aria-hidden="true"><ArrowUpRight size={16} /></span>
            </button>
          </div>
        </div>

        {/* ====================================================================
            3 CONTINUOUS HORIZONTAL MOVING ROWS (PERSPECTIVE & SKEW PHYSICS)
            ==================================================================== */}

        <div
          style={{
            position: 'relative',
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: '44px',
            width: '100%',
            perspective: '1200px',
          }}
        >
          {/* ROW 01 (MOVING RIGHT →) */}
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <div
              ref={row1Ref}
              style={{
                display: 'flex',
                gap: '36px',
                width: 'max-content',
                willChange: 'transform',
                transformStyle: 'preserve-3d',
              }}
            >
              {[...row1Projects, ...row1Projects].map((project, idx) => (
                <FloatingCinematicCard
                  key={`r1-${project.id}-${idx}`}
                  project={project}
                  aspectRatio="9/16"
                  width="290px"
                />
              ))}
            </div>
          </div>

          {/* ROW 02 (MOVING LEFT ←) */}
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <div
              ref={row2Ref}
              style={{
                display: 'flex',
                gap: '36px',
                width: 'max-content',
                willChange: 'transform',
                transformStyle: 'preserve-3d',
                opacity: 0.96,
              }}
            >
              {[...row2Projects, ...row2Projects].map((project, idx) => (
                <FloatingCinematicCard
                  key={`r2-${project.id}-${idx}`}
                  project={project}
                  aspectRatio="4/3"
                  width="440px"
                />
              ))}
            </div>
          </div>

          {/* ROW 03 (MOVING RIGHT →) - REAL DEVELOPMENT PROJECTS */}
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <div
              ref={row3Ref}
              style={{
                display: 'flex',
                gap: '36px',
                width: 'max-content',
                willChange: 'transform',
                transformStyle: 'preserve-3d',
              }}
            >
              {[...row3Projects, ...row3Projects, ...row3Projects, ...row3Projects].map((project, idx) => (
                <FloatingCinematicCard
                  key={`r3-${project.id}-${idx}`}
                  project={project}
                  aspectRatio="16/10"
                  width="480px"
                  onClick={() => {
                    setSelectedProject(project);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION CTA */}
        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 5,
            marginTop: '72px',
            textAlign: 'center',
          }}
        >
          <button
            onClick={handleViewAllWork}
            className="srp-btn srp-btn--primary"
          >
            <span>VIEW COMPLETE WORK GALLERY</span>
            <span className="srp-btn__arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
          </button>
        </div>

        {/* Project Details Modal */}
        <ProjectDetailModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </section>
    );
  }

  // =========================================================================
  // 2. STANDALONE WORK PAGE GRID VIEW (OR REDUCED MOTION VIEW)
  // =========================================================================
  return (
    <section
      id="portfolio"
      style={{
        padding: '120px 0',
        background: 'transparent',
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
          <SectionMarker label={serviceMatch ? `${serviceMatch.service.name.toUpperCase()} WORK` : 'SELECTED WORK & CASE STUDIES'} align="left" />

          {serviceMatch && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Showing work for <strong style={{ color: '#FFFFFF' }}>{serviceMatch.service.name}</strong>
              </span>
              <button
                onClick={clearServiceFilter}
                className="srp-btn srp-btn--ghost srp-btn--sm"
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
            {isHomepage ? (
              <h2
                style={{
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  textTransform: 'uppercase',
                  maxWidth: '680px',
                  color: '#FFFFFF',
                }}
              >
                Crafted For High-Growth Brands
              </h2>
            ) : (
              <h1
                id="work-heading"
                style={{
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  textTransform: 'uppercase',
                  maxWidth: '680px',
                  color: '#FFFFFF',
                }}
              >
                Work — Portfolio & Case Studies — Crafted For High-Growth Brands
              </h1>
            )}

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
                    className={isActive ? 'srp-btn srp-btn--primary srp-btn--sm' : 'srp-btn srp-btn--secondary srp-btn--sm'}
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {filteredProjects.map((project) => {
            const isReel = isVideoUrl(project.videoUrl || project.thumbnail) || project.category === 'production';
            const hasMultiImages = Boolean(project.images && project.images.length > 1);
            const isDev = project.category === 'technology';

            return (
              <div
                key={project.id}
                onClick={() => {
                  if (project.category === 'technology') {
                    setSelectedProject(project);
                    setIsModalOpen(true);
                  }
                }}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 'var(--radius-media)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--surface-dark)',
                  border: isDev && hoveredProjectId === project.id
                    ? '1px solid rgba(255, 106, 42, 0.45)'
                    : '1px solid var(--glass-border)',
                  cursor: isDev ? 'pointer' : 'default',
                  transition: 'var(--transition-smooth)',
                }}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: isReel ? '9/16' : '16/10',
                    overflow: 'hidden',
                    backgroundColor: '#000000',
                  }}
                >
                  {isVideoUrl(project.videoUrl || project.thumbnail) ? (
                    <OptimizedVideo
                      src={project.videoUrl || project.thumbnail}
                      webmSrc={project.webmUrl}
                      poster={project.posterUrl || (project.thumbnail?.endsWith('.webp') ? project.thumbnail : undefined)}
                      title={`${project.title} — Video Production by Shree Ram Production`}
                      ariaLabel={`${project.title} — Video Production Reel by Shree Ram Production`}
                      videoStyle={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.6s var(--ease-out-expo)',
                      }}
                    />
                  ) : project.images && project.images.length > 1 ? (
                    <AnimatedPhotoGrid
                      images={project.images}
                      isHovered={hoveredProjectId === project.id}
                      title={project.title}
                      intervalMs={1800}
                    />
                  ) : (
                    <img
                      src={project.thumbnail}
                      alt={`${project.title} — ${project.categoryLabel || 'Portfolio Project'} | Shree Ram Production`}
                      title={`${project.title} — Shree Ram Production`}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.6s var(--ease-out-expo)',
                      }}
                    />
                  )}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(14, 15, 18, 0.9) 0%, transparent 60%)',
                    }}
                  />
                </div>

                <div style={{ padding: isReel ? '18px 20px 22px' : '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {(project.categoryLabel || project.year) && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}
                    >
                      {project.categoryLabel && (
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
                      )}
                      {project.year && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                          {project.year}
                        </span>
                      )}
                    </div>
                  )}

                  <h3
                    style={{
                      fontSize: isReel ? '1.15rem' : '1.25rem',
                      fontWeight: 700,
                      marginBottom: (isDev || hasMultiImages) ? '10px' : 0,
                      color: '#FFFFFF',
                      lineHeight: 1.35,
                    }}
                  >
                    {project.title}
                  </h3>

                  {/* Description shown for Development & Multi-image Design Projects */}
                  {(isDev || hasMultiImages) && project.summary && (
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
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Details Modal */}
        <ProjectDetailModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </section>
  );
};

// Sub-component for Borderless Floating Cinematic Project Card
const FloatingCinematicCard: React.FC<{
  project: PortfolioItem;
  aspectRatio: string;
  width: string;
  onClick?: () => void;
}> = ({ project, aspectRatio, width, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isReel = isVideoUrl(project.videoUrl || project.thumbnail) || project.category === 'production';
  const isClickable = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: width,
        flexShrink: 0,
        cursor: isClickable ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        userSelect: 'none',
      }}
    >
      {/* Borderless Floating Media Frame */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: aspectRatio,
          borderRadius: '20px',
          overflow: 'hidden',
          backgroundColor: '#0F1013',
          border: isClickable && isHovered
            ? '1px solid rgba(255, 106, 42, 0.45)'
            : '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: isHovered
            ? '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 35px rgba(255, 106, 42, 0.25)'
            : '0 16px 48px rgba(0, 0, 0, 0.65)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isHovered ? 'scale(1.05) translateY(-4px)' : 'scale(1)',
          filter: isHovered ? 'brightness(1.08)' : 'brightness(0.95)',
        }}
      >
        {isClickable && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              zIndex: 6,
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.92)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '999px',
              backgroundColor: 'rgba(8, 9, 10, 0.82)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 106, 42, 0.4)',
              color: '#FFFFFF',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
              pointerEvents: 'none',
            }}
          >
            <span>VIEW DETAILS</span>
            <ArrowUpRight size={13} style={{ color: 'var(--accent-orange)' }} />
          </div>
        )}
        {isVideoUrl(project.videoUrl || project.thumbnail) ? (
          <OptimizedVideo
            src={project.videoUrl || project.thumbnail}
            webmSrc={project.webmUrl}
            poster={project.posterUrl || (project.thumbnail?.endsWith('.webp') ? project.thumbnail : undefined)}
            title={`${project.title} — Video Production Showcase by Shree Ram Production`}
            ariaLabel={`${project.title} — Video Production Showcase by Shree Ram Production`}
            videoStyle={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />
        ) : project.images && project.images.length > 1 ? (
          <AnimatedPhotoGrid
            images={project.images}
            isHovered={isHovered}
            title={project.title}
            intervalMs={1800}
          />
        ) : (
          <img
            src={project.thumbnail}
            alt={`${project.title} — ${project.categoryLabel || 'Creative Showcase'} | Shree Ram Production`}
            title={`${project.title} — Shree Ram Production`}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />
        )}

        {/* Ambient Dark Gradient Vignette Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(8, 9, 10, 0.85) 0%, rgba(8, 9, 10, 0.1) 60%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Editorial Title & Specs */}
      <div style={{ padding: '0 6px' }}>
        {!isReel && (project.client || project.year) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '4px',
            }}
          >
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              {[project.client, project.year].filter(Boolean).join(' • ')}
            </span>
          </div>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <h3
            style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: isHovered ? '#FFFFFF' : '#E2E8F0',
              lineHeight: 1.25,
              whiteSpace: isReel ? 'normal' : 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              transition: 'var(--transition-smooth)',
              letterSpacing: '-0.01em',
            }}
          >
            {project.title}
          </h3>
        </div>
      </div>
    </div>
  );
};
