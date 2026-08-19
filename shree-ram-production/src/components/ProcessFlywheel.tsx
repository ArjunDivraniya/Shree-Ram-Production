import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '../data/content';
import { CheckCircle2, Compass, Hammer, Rocket, TrendingUp, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ProcessFlywheel: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const desktopActivePathRef = useRef<SVGPathElement>(null);
  const mobileActivePathRef = useRef<SVGPathElement>(null);
  const glowDotRef = useRef<SVGCircleElement>(null);
  const glowPulseRef = useRef<SVGCircleElement>(null);

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // References to section cards and nodes
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const desktopNodeRefs = useRef<(SVGGElement | null)[]>([]);
  const mobileNodeRefs = useRef<(SVGGElement | null)[]>([]);

  const phaseIcons = [Compass, Hammer, Rocket, TrendingUp];

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    window.addEventListener('resize', checkMobile);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isReducedMotion || !sectionRef.current || !stickyRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const activePath = isMobile ? mobileActivePathRef.current : desktopActivePathRef.current;
      if (!activePath) return;

      const totalLen = activePath.getTotalLength();

      // Set initial SVG path stroke properties
      gsap.set(activePath, {
        strokeDasharray: totalLen,
        strokeDashoffset: totalLen,
      });

      // Master GSAP ScrollTrigger timeline pinned across section height
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stickyRef.current,
          pinSpacing: true,
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;

            // Move traveling glow dot along Bezier curve
            if (activePath && totalLen > 0) {
              const pt = activePath.getPointAtLength(p * totalLen);
              if (glowDotRef.current) {
                glowDotRef.current.setAttribute('cx', pt.x.toString());
                glowDotRef.current.setAttribute('cy', pt.y.toString());
              }
              if (glowPulseRef.current) {
                glowPulseRef.current.setAttribute('cx', pt.x.toString());
                glowPulseRef.current.setAttribute('cy', pt.y.toString());
              }
            }

            // Sync active step state for indicator
            let idx = 0;
            if (p < 0.25) idx = 0;
            else if (p < 0.50) idx = 1;
            else if (p < 0.75) idx = 2;
            else idx = 3;
            setActiveStepIndex(idx);
          },
        },
      });

      // 1. Animate SVG orange path drawing from 0 to 100% across duration 12
      tl.to(
        activePath,
        {
          strokeDashoffset: 0,
          ease: 'none',
          duration: 11.5,
        },
        0
      );

      // 2. Camera tracking: Keyframed track translation so EVERY card (01 to 04) aligns to top = 180px in viewport
      tl.to(trackRef.current, { y: -120, ease: 'power1.inOut', duration: 2.2 }, 0)
        .to(trackRef.current, { y: -620, ease: 'power1.inOut', duration: 3.0 }, 2.5)
        .to(trackRef.current, { y: -1120, ease: 'power1.inOut', duration: 3.0 }, 5.5)
        .to(trackRef.current, { y: -1540, ease: 'power1.inOut', duration: 3.0 }, 8.5);

      const activeNodeList = isMobile ? mobileNodeRefs.current : desktopNodeRefs.current;

      // Set initial card and node states
      PROCESS_STEPS.forEach((_, i) => {
        gsap.set(cardRefs.current[i], {
          opacity: i === 0 ? 1 : 0.15,
          scale: i === 0 ? 1 : 0.95,
          y: i === 0 ? 0 : 30,
          filter: i === 0 ? 'blur(0px)' : 'blur(4px)',
        });
        if (activeNodeList[i]) {
          gsap.set(activeNodeList[i], {
            scale: i === 0 ? 1.25 : 1,
            transformOrigin: 'center center',
          });
        }
      });

      // Synchronized Section Activations
      // Section 01 reaches at ~1.8
      tl.to(
        cardRefs.current[0],
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.6 },
        1.8
      );
      if (activeNodeList[0]) {
        tl.to(activeNodeList[0], { scale: 1.25, transformOrigin: 'center center', duration: 0.5 }, 1.8);
      }

      // Section 02 reaches at ~4.9
      tl.to(
        cardRefs.current[0],
        { opacity: 0.2, scale: 0.95, filter: 'blur(3px)', duration: 0.6 },
        4.6
      );
      if (activeNodeList[0]) {
        tl.to(activeNodeList[0], { scale: 1, transformOrigin: 'center center', duration: 0.5 }, 4.6);
      }
      tl.to(
        cardRefs.current[1],
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.6 },
        4.9
      );
      if (activeNodeList[1]) {
        tl.to(activeNodeList[1], { scale: 1.25, transformOrigin: 'center center', duration: 0.5 }, 4.9);
      }

      // Section 03 reaches at ~7.9
      tl.to(
        cardRefs.current[1],
        { opacity: 0.2, scale: 0.95, filter: 'blur(3px)', duration: 0.6 },
        7.6
      );
      if (activeNodeList[1]) {
        tl.to(activeNodeList[1], { scale: 1, transformOrigin: 'center center', duration: 0.5 }, 7.6);
      }
      tl.to(
        cardRefs.current[2],
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.6 },
        7.9
      );
      if (activeNodeList[2]) {
        tl.to(activeNodeList[2], { scale: 1.25, transformOrigin: 'center center', duration: 0.5 }, 7.9);
      }

      // Section 04 reaches at ~10.6 (and stays fully active through end of section)
      tl.to(
        cardRefs.current[2],
        { opacity: 0.2, scale: 0.95, filter: 'blur(3px)', duration: 0.6 },
        10.2
      );
      if (activeNodeList[2]) {
        tl.to(activeNodeList[2], { scale: 1, transformOrigin: 'center center', duration: 0.5 }, 10.2);
      }
      tl.to(
        cardRefs.current[3],
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.6 },
        10.6
      );
      if (activeNodeList[3]) {
        tl.to(activeNodeList[3], { scale: 1.25, transformOrigin: 'center center', duration: 0.5 }, 10.6);
      }

      // Hold Section 04 fully visible before unpinning
      tl.to({}, { duration: 3.0 });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion, isMobile]);

  // Static reduced-motion layout fallback
  if (isReducedMotion) {
    return (
      <section id="process" style={{ padding: '100px 0', backgroundColor: '#08090A' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="badge-pill" style={{ marginBottom: '16px' }}>
              <span className="badge-pill-dot" />
              <span>HOW WE WORK</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, textTransform: 'uppercase', color: '#FFF' }}>
              The Growth Flywheel Methodology
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {PROCESS_STEPS.map((step, idx) => {
              const PhaseIcon = phaseIcons[idx];
              return (
                <div
                  key={step.number}
                  className="glass-panel"
                  style={{
                    padding: '36px',
                    borderColor: 'rgba(255, 106, 42, 0.3)',
                    backgroundColor: 'rgba(20, 21, 24, 0.8)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-orange)', fontWeight: 800, fontSize: '0.9rem', marginBottom: '12px' }}>
                    <PhaseIcon size={18} />
                    <span>STAGE {step.number} — {step.phase}</span>
                  </div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFF', marginBottom: '12px' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
                    {step.description}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {step.outcomes.map((outcome) => (
                      <div key={outcome} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: '#E0E0E0' }}>
                        <CheckCircle2 size={16} color="var(--accent-orange)" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{
        position: 'relative',
        height: '520vh',
        backgroundColor: '#08090A',
        overflow: 'hidden',
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
          backgroundColor: '#08090A',
        }}
      >
        {/* Ambient Dark Vignette & Dynamic Grid Pattern */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 50% 30%, rgba(255, 106, 42, 0.07) 0%, transparent 65%),
              linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 80px 80px, 80px 80px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Section Header (Absolute Top Bar) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            paddingTop: '18px',
            paddingBottom: '12px',
            textAlign: 'center',
            background: 'linear-gradient(to bottom, rgba(8,9,10,0.96) 60%, transparent 100%)',
            pointerEvents: 'none',
          }}
        >
          <div className="badge-pill" style={{ marginBottom: '6px' }}>
            <span className="badge-pill-dot" />
            <span>HOW WE WORK</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              marginBottom: '2px',
            }}
          >
            The Growth Flywheel Methodology
          </h2>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
            A continuous scroll journey from strategic discovery to compounding scale.
          </p>
        </div>

        {/* ====================================================================
            SCROLL TRACK & SVG BEZIER ROADMAP PATH CANVAS (FULL VIEWPORT)
            ==================================================================== */}

        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: 5,
          }}
        >
          <div
            ref={trackRef}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1200px',
              height: '2400px',
              margin: '0 auto',
              willChange: 'transform',
            }}
          >
            {/* SVG Bezier Roadmap Path Layer */}
            <svg
              viewBox={isMobile ? "0 0 400 2400" : "0 0 1200 2400"}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'visible',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            >
              <defs>
                {/* Active Tip Glow Filter */}
                <filter id="tip-orange-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Node Radial Glow Filter */}
                <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="12" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* DESKTOP PATH & NODES (>= 768px) */}
              {!isMobile && (
                <>
                  <path
                    d="M 600 60 C 600 250, 280 250, 280 440 C 280 690, 920 690, 920 940 C 920 1190, 280 1190, 280 1440 C 280 1690, 920 1690, 920 1940"
                    stroke="rgba(255, 255, 255, 0.12)"
                    strokeWidth="4"
                    strokeDasharray="8 8"
                    fill="none"
                  />
                  <path
                    ref={desktopActivePathRef}
                    d="M 600 60 C 600 250, 280 250, 280 440 C 280 690, 920 690, 920 940 C 920 1190, 280 1190, 280 1440 C 280 1690, 920 1690, 920 1940"
                    stroke="#FF6A2A"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(255, 106, 42, 0.8))',
                    }}
                  />
                  <g transform="translate(600, 60)">
                    <circle r="18" fill="#141518" stroke="rgba(255,106,42,0.4)" strokeWidth="2" />
                    <circle r="6" fill="#FF6A2A" />
                    <text y="-26" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="12" fontWeight="700" letterSpacing="0.1em">
                      START
                    </text>
                  </g>
                  {[
                    { x: 280, y: 440, num: '01' },
                    { x: 920, y: 940, num: '02' },
                    { x: 280, y: 1440, num: '03' },
                    { x: 920, y: 1940, num: '04' },
                  ].map((node, i) => {
                    const isActive = activeStepIndex === i;
                    const isPassed = activeStepIndex >= i;
                    return (
                      <g
                        key={`desk-node-${node.num}`}
                        ref={(el) => { desktopNodeRefs.current[i] = el; }}
                        transform={`translate(${node.x}, ${node.y})`}
                        style={{ transition: 'all 0.4s ease' }}
                      >
                        {isActive && <circle r="36" fill="rgba(255, 106, 42, 0.25)" filter="url(#node-glow)" />}
                        <circle
                          r="24"
                          fill={isActive ? '#FF6A2A' : isPassed ? '#1C1E22' : '#0D0E10'}
                          stroke={isActive ? '#FF6A2A' : isPassed ? 'rgba(255, 106, 42, 0.6)' : 'rgba(255, 255, 255, 0.2)'}
                          strokeWidth="3"
                        />
                        <text
                          y="4"
                          textAnchor="middle"
                          fill={isActive ? '#FFFFFF' : isPassed ? '#FF6A2A' : 'var(--text-dim)'}
                          fontSize="13"
                          fontWeight="800"
                          fontFamily="var(--font-heading)"
                        >
                          {node.num}
                        </text>
                      </g>
                    );
                  })}
                </>
              )}

              {/* MOBILE PATH & NODES (< 768px) */}
              {isMobile && (
                <>
                  <path
                    d="M 45 60 C 45 250, 75 250, 75 440 C 75 690, 25 690, 25 940 C 25 1190, 75 1190, 75 1440 C 75 1690, 25 1690, 25 1940"
                    stroke="rgba(255, 255, 255, 0.12)"
                    strokeWidth="4"
                    strokeDasharray="8 8"
                    fill="none"
                  />
                  <path
                    ref={mobileActivePathRef}
                    d="M 45 60 C 45 250, 75 250, 75 440 C 75 690, 25 690, 25 940 C 25 1190, 75 1190, 75 1440 C 75 1690, 25 1690, 25 1940"
                    stroke="#FF6A2A"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(255, 106, 42, 0.8))',
                    }}
                  />
                  <g transform="translate(45, 60)">
                    <circle r="14" fill="#141518" stroke="rgba(255,106,42,0.4)" strokeWidth="2" />
                    <circle r="5" fill="#FF6A2A" />
                  </g>
                  {[
                    { x: 75, y: 440, num: '01' },
                    { x: 25, y: 940, num: '02' },
                    { x: 75, y: 1440, num: '03' },
                    { x: 25, y: 1940, num: '04' },
                  ].map((node, i) => {
                    const isActive = activeStepIndex === i;
                    const isPassed = activeStepIndex >= i;
                    return (
                      <g
                        key={`mob-node-${node.num}`}
                        ref={(el) => { mobileNodeRefs.current[i] = el; }}
                        transform={`translate(${node.x}, ${node.y})`}
                        style={{ transition: 'all 0.4s ease' }}
                      >
                        {isActive && <circle r="28" fill="rgba(255, 106, 42, 0.25)" filter="url(#node-glow)" />}
                        <circle
                          r="18"
                          fill={isActive ? '#FF6A2A' : isPassed ? '#1C1E22' : '#0D0E10'}
                          stroke={isActive ? '#FF6A2A' : isPassed ? 'rgba(255, 106, 42, 0.6)' : 'rgba(255, 255, 255, 0.2)'}
                          strokeWidth="2.5"
                        />
                        <text
                          y="4"
                          textAnchor="middle"
                          fill={isActive ? '#FFFFFF' : isPassed ? '#FF6A2A' : 'var(--text-dim)'}
                          fontSize="11"
                          fontWeight="800"
                          fontFamily="var(--font-heading)"
                        >
                          {node.num}
                        </text>
                      </g>
                    );
                  })}
                </>
              )}

              {/* Travelling Glowing Tip Dot */}
              <circle
                ref={glowPulseRef}
                cx={isMobile ? "45" : "600"}
                cy="60"
                r="16"
                fill="rgba(255, 106, 42, 0.4)"
                filter="url(#tip-orange-glow)"
              />
              <circle
                ref={glowDotRef}
                cx={isMobile ? "45" : "600"}
                cy="60"
                r="6"
                fill="#FFFFFF"
                stroke="#FF6A2A"
                strokeWidth="3"
              />
            </svg>

            {/* ====================================================================
                4 ALTERNATING SECTION CARDS (DESKTOP & MOBILE RESPONSIVE)
                ==================================================================== */}

            {PROCESS_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const PhaseIcon = phaseIcons[idx];
              const cardTopPositions = [300, 800, 1300, 1800];
              const isActive = activeStepIndex === idx;

              return (
                <div
                  key={step.number}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  className="glass-panel flywheel-card"
                  style={{
                    position: 'absolute',
                    top: `${cardTopPositions[idx]}px`,
                    left: isMobile ? '85px' : isEven ? '4%' : 'auto',
                    right: isMobile ? 'auto' : isEven ? 'auto' : '4%',
                    width: isMobile ? 'calc(100% - 98px)' : 'calc(48% - 20px)',
                    maxWidth: isMobile ? '100%' : '460px',
                    padding: isMobile ? '16px 18px' : '20px 24px',
                    backgroundColor: 'rgba(15, 16, 19, 0.96)',
                    borderColor: isActive ? 'rgba(255, 106, 42, 0.45)' : 'rgba(255, 255, 255, 0.08)',
                    boxShadow: isActive
                      ? '0 0 40px rgba(255, 106, 42, 0.2), inset 0 0 20px rgba(255, 106, 42, 0.05)'
                      : 'none',
                    borderRadius: 'var(--radius-glass)',
                    zIndex: 4,
                    transformOrigin: isEven ? 'left center' : 'right center',
                    willChange: 'transform, opacity, filter',
                    transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                  }}
                >
                  {/* Card Header Tag */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--accent-orange)',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      marginBottom: '6px',
                      textTransform: 'uppercase',
                    }}
                  >
                    <PhaseIcon size={14} />
                    <span>STAGE {step.number} — {step.phase}</span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                      fontWeight: 800,
                      lineHeight: 1.12,
                      marginBottom: '6px',
                      color: '#FFFFFF',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '0.86rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.48,
                      marginBottom: '14px',
                    }}
                  >
                    {step.description}
                  </p>

                  {/* Deliverables Block */}
                  <div
                    style={{
                      backgroundColor: 'rgba(28, 30, 34, 0.65)',
                      borderRadius: 'var(--radius-ui)',
                      padding: '12px 14px',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        color: 'var(--accent-orange)',
                        letterSpacing: '0.1em',
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                      }}
                    >
                      <Sparkles size={12} />
                      <span>Key Deliverables & Milestones</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {step.outcomes.map((outcome) => (
                        <div
                          key={outcome}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.82rem',
                            fontWeight: 500,
                            color: '#E2E8F0',
                          }}
                        >
                          <CheckCircle2 size={13} color="var(--accent-orange)" style={{ flexShrink: 0 }} />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>


      {/* RESPONSIVE LAYOUT STYLES */}
      <style>{`
        @media (max-width: 767px) {
          .flywheel-card {
            width: calc(100% - 98px) !important;
            left: 85px !important;
            right: auto !important;
            padding: 16px 18px !important;
          }
        }
      `}</style>
    </section>
  );
};
