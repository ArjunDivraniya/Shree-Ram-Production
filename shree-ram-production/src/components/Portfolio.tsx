import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { PortfolioItem } from '../types';
import { PORTFOLIO_ITEMS } from '../data/content';
import { findServiceById } from '../utils/serviceUtils';
import { ArrowUpRight, X, TrendingUp, Play, Flame } from 'lucide-react';
import SectionMarker from './ui/SectionMarker';

gsap.registerPlugin(ScrollTrigger);

interface PortfolioProps {
  isHomepage?: boolean;
  onNavigate?: (sectionId: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ isHomepage = true }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');
  const serviceMatch = serviceParam ? findServiceById(serviceParam) : null;

  // Selected project for case study modal
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

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
  const row1Projects = [
    PORTFOLIO_ITEMS[0], // Apex Velocity Launch Film
    PORTFOLIO_ITEMS[5], // Aura Living Brand Architecture
    PORTFOLIO_ITEMS[1], // Chronos Timepiece Film
    PORTFOLIO_ITEMS[3], // Solace Audio Reels
    PORTFOLIO_ITEMS[2], // Vanguard 3D Motion
  ];

  const row2Projects = [
    PORTFOLIO_ITEMS[9],  // Solaris Energy 8x Scale
    PORTFOLIO_ITEMS[13], // Lumina Spatial Web3D
    PORTFOLIO_ITEMS[6],  // Velox Aviation Brand Identity
    PORTFOLIO_ITEMS[10], // Kuro Fashion Paid Social
    PORTFOLIO_ITEMS[14], // Nexus Bank Digital Platform
  ];

  const row3Projects = [
    PORTFOLIO_ITEMS[7],  // Elysium Reserve Packaging
    PORTFOLIO_ITEMS[11], // Titan B2B Organic Search
    PORTFOLIO_ITEMS[15], // Aether Headless E-Commerce
    PORTFOLIO_ITEMS[4],  // Apex International Auto Expo
    PORTFOLIO_ITEMS[8],  // Kuro Studio Creative Direction
  ];

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
        duration: 34,
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

          {/* Top Live Ticker Tag & View All Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'rgba(255, 106, 42, 0.1)',
                border: '1px solid rgba(255, 106, 42, 0.25)',
                color: 'var(--accent-orange)',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
              }}
            >
              <Flame size={14} />
              <span>15 MASTERPIECES</span>
            </div>

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
                  onSelect={() => setSelectedProject(project)}
                  aspectRatio="16/9"
                  width="460px"
                  badgeText="CINEMA REEL"
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
                  onSelect={() => setSelectedProject(project)}
                  aspectRatio="4/3"
                  width="400px"
                  badgeText="BRAND ARCHITECTURE"
                />
              ))}
            </div>
          </div>

          {/* ROW 03 (MOVING RIGHT →) */}
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
              {[...row3Projects, ...row3Projects].map((project, idx) => (
                <FloatingCinematicCard
                  key={`r3-${project.id}-${idx}`}
                  project={project}
                  onSelect={() => setSelectedProject(project)}
                  aspectRatio="16/10"
                  width="480px"
                  badgeText="GROWTH ENGINE"
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

        {/* Modal Window inside Showreel */}
        {selectedProject && (
          <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
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

      {/* Modal Window */}
      {selectedProject && (
        <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

// Sub-component for Borderless Floating Cinematic Project Card
const FloatingCinematicCard: React.FC<{
  project: PortfolioItem;
  onSelect: () => void;
  aspectRatio: string;
  width: string;
  badgeText: string;
}> = ({ project, onSelect, aspectRatio, width, badgeText }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: width,
        flexShrink: 0,
        cursor: 'pointer',
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
          boxShadow: isHovered
            ? '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 35px rgba(255, 106, 42, 0.25)'
            : '0 16px 48px rgba(0, 0, 0, 0.65)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isHovered ? 'scale(1.05) translateY(-4px)' : 'scale(1)',
          filter: isHovered ? 'brightness(1.08)' : 'brightness(0.95)',
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
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />

        {/* Ambient Dark Gradient Vignette Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(8, 9, 10, 0.85) 0%, rgba(8, 9, 10, 0.1) 60%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Floating Play Indicator Button on Hover */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0.7})`,
            opacity: isHovered ? 1 : 0,
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 106, 42, 0.9)',
            boxShadow: '0 0 30px rgba(255, 106, 42, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <Play size={22} style={{ marginLeft: '3px' }} />
        </div>

        {/* Metric Badge Overlay Top Right */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            padding: '5px 12px',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'rgba(8, 9, 10, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 106, 42, 0.4)',
            fontSize: '0.74rem',
            fontWeight: 800,
            color: 'var(--accent-orange)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <TrendingUp size={12} />
          <span>{project.metrics.value}</span>
        </div>

        {/* Pillar Stream Badge Bottom Left */}
        <div
          style={{
            position: 'absolute',
            bottom: '14px',
            left: '14px',
            padding: '5px 12px',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'rgba(8, 9, 10, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            fontSize: '0.7rem',
            fontWeight: 800,
            color: 'rgba(255, 255, 255, 0.85)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>{badgeText}</span>
        </div>
      </div>

      {/* Editorial Title & Category Specs (No Borders) */}
      <div style={{ padding: '0 6px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '4px',
          }}
        >
          <span
            style={{
              fontSize: '0.74rem',
              fontWeight: 800,
              color: isHovered ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.55)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'var(--transition-smooth)',
            }}
          >
            {project.categoryLabel}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
            {project.client} • {project.year}
          </span>
        </div>

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
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              transition: 'var(--transition-smooth)',
              letterSpacing: '-0.01em',
            }}
          >
            {project.title}
          </h3>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.8rem',
              fontWeight: 800,
              color: 'var(--accent-orange)',
              opacity: isHovered ? 1 : 0.5,
              transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
              transition: 'all 0.3s ease',
              flexShrink: 0,
            }}
          >
            <span>View</span>
            <ArrowUpRight size={15} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for Case Study Modal Details
const CaseStudyModal: React.FC<{ project: PortfolioItem; onClose: () => void }> = ({ project, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(8, 9, 10, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        overflowY: 'auto',
      }}
      onClick={onClose}
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
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.85)',
          animation: 'scaleUp 0.3s var(--ease-out-expo) forwards',
          margin: 'auto',
        }}
      >
        <div style={{ position: 'relative', aspectRatio: '21/9', overflow: 'hidden' }}>
          <img
            src={project.thumbnail}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <button
            onClick={onClose}
            className="srp-btn srp-btn--icon"
            aria-label="Close case study"
            style={{ position: 'absolute', top: '20px', right: '20px', width: '40px', height: '40px' }}
          >
            <X size={18} />
          </button>
        </div>

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
              {project.categoryLabel}
            </span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
              Client: <strong style={{ color: '#FFFFFF' }}>{project.client}</strong>
            </span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
              Year: {project.year}
            </span>
          </div>

          <h2
            style={{
              fontSize: '1.8rem',
              fontWeight: 800,
              marginBottom: '16px',
              color: '#FFFFFF',
            }}
          >
            {project.title}
          </h2>

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
                {project.metrics.value}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Key Metric Outcome ({project.metrics.label})
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '28px',
            }}
          >
            {project.challenge && (
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '12px' }}>
                <div style={{ color: 'var(--accent-orange)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>
                  THE CHALLENGE
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  {project.challenge}
                </p>
              </div>
            )}

            {project.solution && (
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '12px' }}>
                <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>
                  CREATIVE & EXECUTION SOLUTION
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  {project.solution}
                </p>
              </div>
            )}
          </div>

          <div>
            <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '12px', fontSize: '0.9rem' }}>
              KEY DELIVERABLES
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {project.deliverables.map((del) => (
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
  );
};
