import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PILLARS_DATA } from '../data/pillarsData';
import { ArrowUpRight } from 'lucide-react';
import SectionMarker from './ui/SectionMarker';

gsap.registerPlugin(ScrollTrigger);

interface ScrollDrivenPillarsProps {
  onNavigate: (sectionId: string) => void;
}

export const ScrollDrivenPillars: React.FC<ScrollDrivenPillarsProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Three background typography line refs (desktop only)
  const bgLine1Ref = useRef<HTMLDivElement>(null);
  const bgLine2Ref = useRef<HTMLDivElement>(null);
  const bgLine3Ref = useRef<HTMLDivElement>(null);

  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // References to animated elements per pillar
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leftListRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightListRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (isReducedMotion || !containerRef.current || !stickyRef.current) return;

    // Prevent mobile address-bar hide/show from thrashing ScrollTrigger calculations
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    const mm = gsap.matchMedia();

    // =========================================================================
    // DESKTOP (> 991px): Editorial 3-column stage with parallax typography lines
    // =========================================================================
    mm.add('(min-width: 992px)', () => {
      // Line 1: Moves Left
      gsap.to(bgLine1Ref.current, {
        xPercent: -30,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      // Line 2: Moves Right (counter-scroll for depth)
      gsap.fromTo(
        bgLine2Ref.current,
        { xPercent: -30 },
        {
          xPercent: 5,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      );

      // Line 3: Moves Left
      gsap.to(bgLine3Ref.current, {
        xPercent: -30,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      // Master ScrollTrigger timeline for 4 pillars on Desktop
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stickyRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.8,
        },
      });

      // Set initial states for desktop pillars
      PILLARS_DATA.forEach((_, i) => {
        if (i === 0) {
          gsap.set(titleRefs.current[i], { autoAlpha: 1, y: 0, force3D: true });
          gsap.set(leftListRefs.current[i], { autoAlpha: 1, y: 0, force3D: true });
          gsap.set(rightListRefs.current[i], { autoAlpha: 1, y: 0, force3D: true });
        } else {
          gsap.set(titleRefs.current[i], { autoAlpha: 0, y: 35, force3D: true });
          gsap.set(leftListRefs.current[i], { autoAlpha: 0, y: 25, force3D: true });
          gsap.set(rightListRefs.current[i], { autoAlpha: 0, y: 25, force3D: true });
        }
      });

      // Desktop transitions
      // Transition 0 -> 1
      tl.to(titleRefs.current[0], { autoAlpha: 0, y: -30, duration: 0.85, force3D: true }, 1)
        .to(leftListRefs.current[0], { autoAlpha: 0, y: -20, duration: 0.75, force3D: true }, 1)
        .to(rightListRefs.current[0], { autoAlpha: 0, y: -20, duration: 0.75, force3D: true }, 1)

        .to(titleRefs.current[1], { autoAlpha: 1, y: 0, duration: 0.85, force3D: true }, 1.2)
        .to(leftListRefs.current[1], { autoAlpha: 1, y: 0, duration: 0.75, force3D: true }, 1.2)
        .to(rightListRefs.current[1], { autoAlpha: 1, y: 0, duration: 0.75, force3D: true }, 1.2);

      tl.to({}, { duration: 0.9 });

      // Transition 1 -> 2
      tl.to(titleRefs.current[1], { autoAlpha: 0, y: -30, duration: 0.85, force3D: true }, 3)
        .to(leftListRefs.current[1], { autoAlpha: 0, y: -20, duration: 0.75, force3D: true }, 3)
        .to(rightListRefs.current[1], { autoAlpha: 0, y: -20, duration: 0.75, force3D: true }, 3)

        .to(titleRefs.current[2], { autoAlpha: 1, y: 0, duration: 0.85, force3D: true }, 3.2)
        .to(leftListRefs.current[2], { autoAlpha: 1, y: 0, duration: 0.75, force3D: true }, 3.2)
        .to(rightListRefs.current[2], { autoAlpha: 1, y: 0, duration: 0.75, force3D: true }, 3.2);

      tl.to({}, { duration: 0.9 });

      // Transition 2 -> 3
      tl.to(titleRefs.current[2], { autoAlpha: 0, y: -30, duration: 0.85, force3D: true }, 5)
        .to(leftListRefs.current[2], { autoAlpha: 0, y: -20, duration: 0.75, force3D: true }, 5)
        .to(rightListRefs.current[2], { autoAlpha: 0, y: -20, duration: 0.75, force3D: true }, 5)

        .to(titleRefs.current[3], { autoAlpha: 1, y: 0, duration: 0.85, force3D: true }, 5.2)
        .to(leftListRefs.current[3], { autoAlpha: 1, y: 0, duration: 0.75, force3D: true }, 5.2)
        .to(rightListRefs.current[3], { autoAlpha: 1, y: 0, duration: 0.75, force3D: true }, 5.2);

      tl.to({}, { duration: 0.9 });
    });

    // =========================================================================
    // MOBILE & TABLET (<= 991px): Ultra-lightweight GPU compositing, snappy scrub
    // =========================================================================
    mm.add('(max-width: 991px)', () => {
      // Set initial states for mobile cards
      PILLARS_DATA.forEach((_, i) => {
        if (i === 0) {
          gsap.set(titleRefs.current[i], { autoAlpha: 1, y: 0, force3D: true });
        } else {
          gsap.set(titleRefs.current[i], { autoAlpha: 0, y: 24, force3D: true });
        }
      });

      // Mobile timeline with snappy scrub (0.2s) - zero finger drag delay
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stickyRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.2,
        },
      });

      // Transition 0 -> 1
      tl.to(titleRefs.current[0], { autoAlpha: 0, y: -22, duration: 0.7, ease: 'power1.out', force3D: true }, 1)
        .to(titleRefs.current[1], { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power1.out', force3D: true }, 1.15);

      tl.to({}, { duration: 0.8 });

      // Transition 1 -> 2
      tl.to(titleRefs.current[1], { autoAlpha: 0, y: -22, duration: 0.7, ease: 'power1.out', force3D: true }, 2.8)
        .to(titleRefs.current[2], { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power1.out', force3D: true }, 2.95);

      tl.to({}, { duration: 0.8 });

      // Transition 2 -> 3
      tl.to(titleRefs.current[2], { autoAlpha: 0, y: -22, duration: 0.7, ease: 'power1.out', force3D: true }, 4.6)
        .to(titleRefs.current[3], { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power1.out', force3D: true }, 4.75);

      tl.to({}, { duration: 0.8 });
    });

    return () => mm.revert();
  }, [isReducedMotion]);

  // Reduced motion fallback view
  if (isReducedMotion) {
    return (
      <section id="four-pillars-static" style={{ padding: '80px 0', background: 'transparent' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <SectionMarker label="THE FOUR PILLARS" align="center" />
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 700 }}>
              End-to-End Creative & Digital Excellence
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {PILLARS_DATA.map((pillar) => (
              <div
                key={pillar.id}
                style={{
                  padding: '28px 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', margin: '8px 0 12px 0' }}>{pillar.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '600px', fontSize: '1rem' }}>{pillar.description}</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px' }}>
                  {pillar.services.map((srv) => (
                    <div key={srv} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#E0E0E0' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-orange)' }} />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="four-pillars"
      className="four-pillars-wrapper"
    >
      {/* Pinned Stage Container */}
      <div
        ref={stickyRef}
        className="four-pillars-stage"
      >
        {/* ====================================================================
            THREE OVERSIZED LAYERED PARALLAX BACKGROUND TYPOGRAPHY LINES (Desktop Only)
            ==================================================================== */}

        {/* LINE 1 (TOP) — Moves Left */}
        <div
          ref={bgLine1Ref}
          aria-hidden="true"
          className="pillar-bg-line pillar-bg-line-1"
          style={{
            position: 'absolute',
            top: '8%',
            left: '5%',
            whiteSpace: 'nowrap',
            fontSize: 'clamp(3.5rem, 9vw, 13rem)',
            fontWeight: 900,
            fontFamily: 'var(--font-heading)',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.035)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 2,
            lineHeight: 0.9,
          }}
        >
          CONTENT • PRODUCTION • CINEMATOGRAPHY • REELS • VFX • EDITING • STUDIO
        </div>

        {/* LINE 2 (MIDDLE) — Moves Right */}
        <div
          ref={bgLine2Ref}
          aria-hidden="true"
          className="pillar-bg-line pillar-bg-line-2"
          style={{
            position: 'absolute',
            top: '46%',
            left: '0%',
            transform: 'translateY(-50%)',
            whiteSpace: 'nowrap',
            fontSize: 'clamp(4rem, 12vw, 16rem)',
            fontWeight: 900,
            fontFamily: 'var(--font-heading)',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.015) 0%, rgba(255,106,42,0.05) 50%, rgba(255,255,255,0.015) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke: '1px rgba(255, 106, 42, 0.06)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 2,
            lineHeight: 0.9,
          }}
        >
          BRAND • CREATIVE • MARKETING • GROWTH • STRATEGY • IDENTITY • DESIGNS
        </div>

        {/* LINE 3 (BOTTOM) — Moves Left */}
        <div
          ref={bgLine3Ref}
          aria-hidden="true"
          className="pillar-bg-line pillar-bg-line-3"
          style={{
            position: 'absolute',
            bottom: '8%',
            left: '5%',
            whiteSpace: 'nowrap',
            fontSize: 'clamp(3.5rem, 9vw, 13rem)',
            fontWeight: 900,
            fontFamily: 'var(--font-heading)',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.035)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 2,
            lineHeight: 0.9,
          }}
        >
          TECHNOLOGY • DIGITAL • AUTOMATION • WEB APPS • DASHBOARDS • E-COMMERCE
        </div>

        {/* Main Stage Grid Container */}
        <div
          className="container four-pillars-main-container"
          style={{
            position: 'relative',
            zIndex: 5,
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr minmax(280px, 540px) 1fr',
            gap: '32px',
            alignItems: 'center',
            paddingTop: '60px',
            paddingBottom: '60px',
          }}
        >
          {/* LEFT COLUMN: Clean Editorial Left Service List (Desktop) */}
          <div className="pillar-left-column" style={{ position: 'relative', height: '340px', display: 'flex', alignItems: 'center' }}>
            {PILLARS_DATA.map((pillar, i) => (
              <div
                key={`left-${pillar.id}`}
                ref={(el) => { leftListRefs.current[i] = el; }}
                className="pillar-animated-node"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    color: 'var(--accent-orange)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    marginBottom: '16px',
                    textTransform: 'uppercase',
                  }}
                >
                  SERVICES / CAPABILITIES
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {pillar.leftServices.map((srv) => (
                    <div
                      key={srv}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: 'clamp(0.95rem, 1.25vw, 1.15rem)',
                        fontWeight: 500,
                        color: '#E5E5E7',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--accent-orange)',
                          boxShadow: '0 0 10px var(--accent-orange)',
                          flexShrink: 0,
                        }}
                      />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CENTER COLUMN: Large Editorial Pillar Title & Description */}
          <div
            className="pillar-center-column"
            style={{
              position: 'relative',
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {PILLARS_DATA.map((pillar, i) => (
              <div
                key={`title-${pillar.id}`}
                ref={(el) => { titleRefs.current[i] = el; }}
                className="pillar-animated-node"
                style={{
                  position: i === 0 ? 'relative' : 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                {/* Pillar Number Badge */}
                <div className="pillar-badge">
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: 'var(--accent-orange)',
                      letterSpacing: '0.12em',
                    }}
                  >
                    PILLAR {pillar.number}
                  </span>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--accent-orange)' }} />
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {pillar.badge}
                  </span>
                </div>

                {/* Main Prominent Pillar Title */}
                <h2 className="pillar-title">
                  {pillar.title}
                </h2>

                {/* Subtitle / Tagline */}
                <h4
                  style={{
                    fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
                    color: 'var(--accent-orange)',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    marginBottom: '14px',
                  }}
                >
                  {pillar.tagline}
                </h4>

                {/* Editorial Description */}
                <p
                  style={{
                    fontSize: 'clamp(0.9rem, 1vw, 1rem)',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    maxWidth: '440px',
                    marginBottom: '20px',
                  }}
                >
                  {pillar.description}
                </p>

                {/* Combined Services List for Mobile / Tablet View */}
                <div
                  className="pillar-mobile-services"
                  style={{
                    width: '100%',
                    maxWidth: '480px',
                    marginTop: '8px',
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '10px 16px',
                      textAlign: 'left',
                    }}
                  >
                    {pillar.services.map((srv) => (
                      <div
                        key={`mob-${srv}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.85rem',
                          color: '#E5E5E7',
                          fontWeight: 500,
                        }}
                      >
                        <span
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--accent-orange)',
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{srv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: Clean Editorial Right Service List (Desktop) */}
          <div className="pillar-right-column" style={{ position: 'relative', height: '340px', display: 'flex', alignItems: 'center' }}>
            {PILLARS_DATA.map((pillar, i) => (
              <div
                key={`right-${pillar.id}`}
                ref={(el) => { rightListRefs.current[i] = el; }}
                className="pillar-animated-node"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    color: 'var(--accent-orange)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    marginBottom: '16px',
                    textAlign: 'right',
                    textTransform: 'uppercase',
                  }}
                >
                  SOLUTIONS & DELIVERABLES
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {pillar.rightServices.map((srv) => (
                    <div
                      key={srv}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '12px',
                        fontSize: 'clamp(0.95rem, 1.25vw, 1.15rem)',
                        fontWeight: 500,
                        color: '#E5E5E7',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      <span>{srv}</span>
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 255, 255, 0.4)',
                          flexShrink: 0,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA & Scroll Indicator */}
        <div
          className="four-pillars-bottom-cta"
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '0',
            right: '0',
            zIndex: 10,
            padding: '0 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* Scroll Prompt */}
          <div className="four-pillars-scroll-prompt" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
            <span>SCROLL TO EXPLORE PILLARS</span>
            <div style={{ width: '30px', height: '1px', background: 'rgba(255, 255, 255, 0.15)' }} />
          </div>

          {/* Action CTA Button */}
          <button
            onClick={() => onNavigate('calculator')}
            data-cursor="CALCULATE"
            className="srp-btn srp-btn--primary srp-btn--sm"
          >
            <span>BUILD CUSTOM PACKAGE</span>
            <span className="srp-btn__arrow" aria-hidden="true"><ArrowUpRight size={15} /></span>
          </button>
        </div>
      </div>

      {/* Comprehensive Responsive Styles for Mobile, Tablet & Desktop */}
      <style>{`
        /* Container and Pinned Stage */
        .four-pillars-wrapper {
          position: relative;
          height: 380vh;
          background: transparent;
        }

        .four-pillars-stage {
          position: relative;
          height: 100vh;
          height: 100dvh;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: transparent;
        }

        /* Badge Styling */
        .pillar-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 6px 16px;
          border-radius: var(--radius-pill);
          background: rgba(255, 106, 42, 0.1);
          border: 1px solid rgba(255, 106, 42, 0.25);
          margin-bottom: 16px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        /* Title Typography */
        .pillar-title {
          font-size: clamp(2.2rem, 4.5vw, 3.8rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          line-height: 1.08;
          margin-bottom: 12px;
          text-shadow: 0 4px 30px rgba(0,0,0,0.9);
        }

        /* Hardware Accelerated Composited Nodes */
        .pillar-animated-node {
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .pillar-bg-line {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* Desktop Default (> 991px) */
        .pillar-mobile-services {
          display: none !important;
        }

        /* Tablet & Mobile (<= 991px) */
        @media (max-width: 991px) {
          .four-pillars-wrapper {
            height: 280vh !important;
          }

          /* Hide heavy background lines on mobile to eliminate massive GPU overdraw */
          .pillar-bg-line {
            display: none !important;
          }

          /* Eliminate expensive backdrop-blur on mobile during scroll */
          .pillar-badge {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            background: rgba(22, 17, 14, 0.92) !important;
          }

          /* Eliminate heavy 30px text-shadow blur on mobile */
          .pillar-title {
            text-shadow: 0 2px 10px rgba(0,0,0,0.7) !important;
            font-size: clamp(1.8rem, 5.5vw, 2.7rem) !important;
          }

          .four-pillars-bottom-cta {
            padding: 0 20px !important;
            bottom: 16px !important;
          }

          .four-pillars-scroll-prompt {
            display: none !important;
          }

          .four-pillars-main-container {
            grid-template-columns: 1fr !important;
            padding-top: 60px !important;
            padding-bottom: 60px !important;
          }

          .pillar-center-column {
            grid-column: span 1 !important;
          }

          .pillar-left-column, .pillar-right-column {
            display: none !important;
          }

          .pillar-mobile-services {
            display: block !important;
          }
        }

        /* Small Mobile (<= 576px) */
        @media (max-width: 576px) {
          .pillar-mobile-services > div {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }

          .four-pillars-bottom-cta {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
};
