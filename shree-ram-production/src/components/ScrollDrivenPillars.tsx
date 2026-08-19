import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PILLARS_DATA } from '../data/pillarsData';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollDrivenPillarsProps {
  onNavigate: (sectionId: string) => void;
}

export const ScrollDrivenPillars: React.FC<ScrollDrivenPillarsProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Three background typography line refs
  const bgLine1Ref = useRef<HTMLDivElement>(null);
  const bgLine2Ref = useRef<HTMLDivElement>(null);
  const bgLine3Ref = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // References to animated elements per pillar
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leftListRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightListRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileListRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

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

    const ctx = gsap.context(() => {
      // Line 1: Moves Left
      gsap.to(bgLine1Ref.current, {
        xPercent: -30,
        ease: 'none',
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
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      // Master ScrollTrigger timeline for 4 pillars
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stickyRef.current,
          pinSpacing: true,
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            let idx: number;
            if (p < 0.28) idx = 0;
            else if (p < 0.58) idx = 1;
            else if (p < 0.85) idx = 2;
            else idx = 3;
            setActiveIndex(idx);
          },
        },
      });

      // Set initial states for pillars
      PILLARS_DATA.forEach((_, i) => {
        if (i === 0) {
          gsap.set(titleRefs.current[i], { opacity: 1, y: 0, scale: 1 });
          gsap.set(leftListRefs.current[i], { opacity: 1, y: 0 });
          gsap.set(rightListRefs.current[i], { opacity: 1, y: 0 });
          gsap.set(mobileListRefs.current[i], { opacity: 1, y: 0 });
        } else {
          gsap.set(titleRefs.current[i], { opacity: 0, y: 40, scale: 0.94 });
          gsap.set(leftListRefs.current[i], { opacity: 0, y: 30 });
          gsap.set(rightListRefs.current[i], { opacity: 0, y: 30 });
          gsap.set(mobileListRefs.current[i], { opacity: 0, y: 30 });
        }
      });

      // Build keyframed transitions between pillars
      // Transition 0 -> 1
      tl.to(titleRefs.current[0], { opacity: 0, y: -35, scale: 0.94, duration: 0.9 }, 1)
        .to(leftListRefs.current[0], { opacity: 0, y: -25, duration: 0.8 }, 1)
        .to(rightListRefs.current[0], { opacity: 0, y: -25, duration: 0.8 }, 1)
        .to(mobileListRefs.current[0], { opacity: 0, y: -25, duration: 0.8 }, 1)

        .to(titleRefs.current[1], { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 1.2)
        .to(leftListRefs.current[1], { opacity: 1, y: 0, duration: 0.8 }, 1.2)
        .to(rightListRefs.current[1], { opacity: 1, y: 0, duration: 0.8 }, 1.2)
        .to(mobileListRefs.current[1], { opacity: 1, y: 0, duration: 0.8 }, 1.2);

      // Hold pillar 1 state
      tl.to({}, { duration: 1 });

      // Transition 1 -> 2
      tl.to(titleRefs.current[1], { opacity: 0, y: -35, scale: 0.94, duration: 0.9 }, 3)
        .to(leftListRefs.current[1], { opacity: 0, y: -25, duration: 0.8 }, 3)
        .to(rightListRefs.current[1], { opacity: 0, y: -25, duration: 0.8 }, 3)
        .to(mobileListRefs.current[1], { opacity: 0, y: -25, duration: 0.8 }, 3)

        .to(titleRefs.current[2], { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 3.2)
        .to(leftListRefs.current[2], { opacity: 1, y: 0, duration: 0.8 }, 3.2)
        .to(rightListRefs.current[2], { opacity: 1, y: 0, duration: 0.8 }, 3.2)
        .to(mobileListRefs.current[2], { opacity: 1, y: 0, duration: 0.8 }, 3.2);

      // Hold pillar 2 state
      tl.to({}, { duration: 1 });

      // Transition 2 -> 3
      tl.to(titleRefs.current[2], { opacity: 0, y: -35, scale: 0.94, duration: 0.9 }, 5)
        .to(leftListRefs.current[2], { opacity: 0, y: -25, duration: 0.8 }, 5)
        .to(rightListRefs.current[2], { opacity: 0, y: -25, duration: 0.8 }, 5)
        .to(mobileListRefs.current[2], { opacity: 0, y: -25, duration: 0.8 }, 5)

        .to(titleRefs.current[3], { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 5.2)
        .to(leftListRefs.current[3], { opacity: 1, y: 0, duration: 0.8 }, 5.2)
        .to(rightListRefs.current[3], { opacity: 1, y: 0, duration: 0.8 }, 5.2)
        .to(mobileListRefs.current[3], { opacity: 1, y: 0, duration: 0.8 }, 5.2);

      // Hold pillar 3 state until unpin
      tl.to({}, { duration: 1 });
    }, containerRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  // Reduced motion fallback view
  if (isReducedMotion) {
    return (
      <section id="four-pillars-static" style={{ padding: '80px 0', backgroundColor: 'var(--bg-dark)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="badge-pill" style={{ marginBottom: '16px' }}>
              <span className="badge-pill-dot" />
              <span>THE FOUR PILLARS</span>
            </div>
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
                {/* <span style={{ color: 'var(--accent-orange)', fontWeight: 700, fontSize: '1.1rem' }}>
                  PILLAR {pillar.number}
                </span> */}
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
      style={{
        position: 'relative',
        height: '380vh',
        backgroundColor: '#08090A',
      }}
    >
      {/* Sticky Viewport Container */}
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#08090A',
        }}
      >
        {/* Ambient Subtle Grid Pattern Overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 0.5,
          }}
        />

        {/* Dynamic Top-Left Subtle Halo */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-15%',
            left: '-5%',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 106, 42, 0.06) 0%, transparent 70%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Dynamic Bottom-Right Subtle Halo */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-15%',
            right: '-5%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
            filter: 'blur(100px)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* ====================================================================
            THREE OVERSIZED LAYERED PARALLAX BACKGROUND TYPOGRAPHY LINES
            ==================================================================== */}

        {/* LINE 1 (TOP) — Moves Left */}
        <div
          ref={bgLine1Ref}
          aria-hidden="true"
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
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '100%',
                  pointerEvents: activeIndex === i ? 'auto' : 'none',
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
                  pointerEvents: activeIndex === i ? 'auto' : 'none',
                }}
              >
                {/* Pillar Number Badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '6px 16px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'rgba(255, 106, 42, 0.1)',
                    border: '1px solid rgba(255, 106, 42, 0.25)',
                    marginBottom: '16px',
                    backdropFilter: 'blur(8px)',
                  }}
                >
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
                <h2
                  style={{
                    fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: '#FFFFFF',
                    lineHeight: 1.08,
                    marginBottom: '12px',
                    textShadow: '0 4px 30px rgba(0,0,0,0.9)',
                  }}
                >
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
                  ref={(el) => { mobileListRefs.current[i] = el; }}
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
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '100%',
                  pointerEvents: activeIndex === i ? 'auto' : 'none',
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
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 20px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(255, 106, 42, 0.15)',
              border: '1px solid rgba(255, 106, 42, 0.35)',
              color: 'var(--accent-orange)',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              transition: 'var(--transition-smooth)',
            }}
          >
            <span>BUILD CUSTOM PACKAGE</span>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>

      {/* Comprehensive Responsive Styles for Mobile, Tablet & Desktop */}
      <style>{`
        /* Desktop Default (> 991px) */
        .pillar-mobile-services {
          display: none !important;
        }

        /* Tablet & Mobile (<= 991px) */
        @media (max-width: 991px) {
          .four-pillars-bottom-cta {
            padding: 0 20px !important;
            bottom: 16px !important;
          }
          .four-pillars-scroll-prompt {
            display: none !important;
          }
          .four-pillars-main-container {
            grid-template-columns: 1fr !important;
            padding-top: 70px !important;
            padding-bottom: 70px !important;
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
