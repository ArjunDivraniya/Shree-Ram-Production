import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '../data/content';
import { CheckCircle2, Compass, Hammer, Rocket, TrendingUp } from 'lucide-react';
import SectionMarker from './ui/SectionMarker';

gsap.registerPlugin(ScrollTrigger);

export const ProcessFlywheel: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const desktopActivePathRef = useRef<SVGPathElement>(null);
  const mobileActivePathRef = useRef<SVGPathElement>(null);
  const desktopGlowDotRef = useRef<SVGCircleElement>(null);
  const desktopGlowPulseRef = useRef<SVGCircleElement>(null);
  const mobileGlowDotRef = useRef<SVGCircleElement>(null);
  const mobileGlowPulseRef = useRef<SVGCircleElement>(null);

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStepRef = useRef<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // References to section cards and nodes
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const desktopNodeRefs = useRef<(SVGGElement | null)[]>([]);

  const phaseIcons = [Compass, Hammer, Rocket, TrendingUp];

  useEffect(() => {
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
    if (isReducedMotion || !sectionRef.current || !stickyRef.current || !trackRef.current) return;

    // Prevent mobile URL bar expand/collapse from causing reflow thrashing
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    const mm = gsap.matchMedia();

    // =========================================================================
    // DESKTOP (>= 768px): Full winding Bezier S-curve roadmap
    // =========================================================================
    mm.add('(min-width: 768px)', () => {
      const activePath = desktopActivePathRef.current;
      if (!activePath) return;

      const totalLen = activePath.getTotalLength();

      // Initial SVG path stroke setup
      gsap.set(activePath, {
        strokeDasharray: totalLen,
        strokeDashoffset: totalLen,
      });

      // Master GSAP ScrollTrigger timeline pinned across desktop section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stickyRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;

            // Move traveling glow dot along Bezier curve
            if (totalLen > 0) {
              const pt = activePath.getPointAtLength(p * totalLen);
              if (desktopGlowDotRef.current) {
                desktopGlowDotRef.current.setAttribute('cx', pt.x.toString());
                desktopGlowDotRef.current.setAttribute('cy', pt.y.toString());
              }
              if (desktopGlowPulseRef.current) {
                desktopGlowPulseRef.current.setAttribute('cx', pt.x.toString());
                desktopGlowPulseRef.current.setAttribute('cy', pt.y.toString());
              }
            }

            // Sync active step state only on change (zero continuous React re-renders)
            let idx = 0;
            if (p < 0.25) idx = 0;
            else if (p < 0.50) idx = 1;
            else if (p < 0.75) idx = 2;
            else idx = 3;

            if (idx !== activeStepRef.current) {
              activeStepRef.current = idx;
              setActiveStepIndex(idx);
            }
          },
        },
      });

      // 1. Animate SVG orange path drawing from 0 to 100%
      tl.to(
        activePath,
        {
          strokeDashoffset: 0,
          ease: 'none',
          duration: 11.5,
        },
        0
      );

      // 2. Camera tracking: Track translation with hardware acceleration
      tl.to(trackRef.current, { y: -120, ease: 'power1.inOut', duration: 2.2, force3D: true }, 0)
        .to(trackRef.current, { y: -620, ease: 'power1.inOut', duration: 3.0, force3D: true }, 2.5)
        .to(trackRef.current, { y: -1120, ease: 'power1.inOut', duration: 3.0, force3D: true }, 5.5)
        .to(trackRef.current, { y: -1540, ease: 'power1.inOut', duration: 3.0, force3D: true }, 8.5);

      // Initial card and node states
      PROCESS_STEPS.forEach((_, i) => {
        gsap.set(cardRefs.current[i], {
          opacity: i === 0 ? 1 : 0.2,
          scale: i === 0 ? 1 : 0.96,
          y: i === 0 ? 0 : 25,
          force3D: true,
        });
        if (desktopNodeRefs.current[i]) {
          gsap.set(desktopNodeRefs.current[i], {
            scale: i === 0 ? 1.25 : 1,
            transformOrigin: 'center center',
          });
        }
      });

      // Synchronized Section Activations
      // Section 01
      tl.to(
        cardRefs.current[0],
        { opacity: 1, scale: 1, y: 0, duration: 0.6, force3D: true },
        1.8
      );
      if (desktopNodeRefs.current[0]) {
        tl.to(desktopNodeRefs.current[0], { scale: 1.25, transformOrigin: 'center center', duration: 0.5 }, 1.8);
      }

      // Section 02
      tl.to(
        cardRefs.current[0],
        { opacity: 0.2, scale: 0.96, duration: 0.6, force3D: true },
        4.6
      );
      if (desktopNodeRefs.current[0]) {
        tl.to(desktopNodeRefs.current[0], { scale: 1, transformOrigin: 'center center', duration: 0.5 }, 4.6);
      }
      tl.to(
        cardRefs.current[1],
        { opacity: 1, scale: 1, y: 0, duration: 0.6, force3D: true },
        4.9
      );
      if (desktopNodeRefs.current[1]) {
        tl.to(desktopNodeRefs.current[1], { scale: 1.25, transformOrigin: 'center center', duration: 0.5 }, 4.9);
      }

      // Section 03
      tl.to(
        cardRefs.current[1],
        { opacity: 0.2, scale: 0.96, duration: 0.6, force3D: true },
        7.6
      );
      if (desktopNodeRefs.current[1]) {
        tl.to(desktopNodeRefs.current[1], { scale: 1, transformOrigin: 'center center', duration: 0.5 }, 7.6);
      }
      tl.to(
        cardRefs.current[2],
        { opacity: 1, scale: 1, y: 0, duration: 0.6, force3D: true },
        7.9
      );
      if (desktopNodeRefs.current[2]) {
        tl.to(desktopNodeRefs.current[2], { scale: 1.25, transformOrigin: 'center center', duration: 0.5 }, 7.9);
      }

      // Section 04
      tl.to(
        cardRefs.current[2],
        { opacity: 0.2, scale: 0.96, duration: 0.6, force3D: true },
        10.2
      );
      if (desktopNodeRefs.current[2]) {
        tl.to(desktopNodeRefs.current[2], { scale: 1, transformOrigin: 'center center', duration: 0.5 }, 10.2);
      }
      tl.to(
        cardRefs.current[3],
        { opacity: 1, scale: 1, y: 0, duration: 0.6, force3D: true },
        10.6
      );
      if (desktopNodeRefs.current[3]) {
        tl.to(desktopNodeRefs.current[3], { scale: 1.25, transformOrigin: 'center center', duration: 0.5 }, 10.6);
      }

      tl.to({}, { duration: 2.5 });
    });

    // =========================================================================
    // MOBILE (< 768px): Dedicated timeline with active traveling dot & zero overlap
    // =========================================================================
    mm.add('(max-width: 767px)', () => {
      const activePath = mobileActivePathRef.current;
      if (!activePath) return;

      const totalLen = activePath.getTotalLength();

      // Initial SVG path stroke setup
      gsap.set(activePath, {
        strokeDasharray: totalLen,
        strokeDashoffset: totalLen,
      });

      // Reset header state
      if (headerRef.current) {
        gsap.set(headerRef.current, { opacity: 1, y: 0 });
      }

      // Mobile timeline with snappy scrub (0.2s) - zero finger drag lag
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stickyRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.2,
          onUpdate: (self) => {
            const p = self.progress;

            // Move traveling glowing tip dot throughout the mobile running line
            if (totalLen > 0) {
              const pt = activePath.getPointAtLength(p * totalLen);
              if (mobileGlowDotRef.current) {
                mobileGlowDotRef.current.setAttribute('cx', pt.x.toString());
                mobileGlowDotRef.current.setAttribute('cy', pt.y.toString());
              }
              if (mobileGlowPulseRef.current) {
                mobileGlowPulseRef.current.setAttribute('cx', pt.x.toString());
                mobileGlowPulseRef.current.setAttribute('cy', pt.y.toString());
              }
            }

            let idx = 0;
            if (p < 0.25) idx = 0;
            else if (p < 0.50) idx = 1;
            else if (p < 0.75) idx = 2;
            else idx = 3;

            if (idx !== activeStepRef.current) {
              activeStepRef.current = idx;
              setActiveStepIndex(idx);
            }
          },
        },
      });

      // 1. Animate SVG orange path drawing from 0 to 100%
      tl.to(
        activePath,
        {
          strokeDashoffset: 0,
          ease: 'none',
          duration: 11.5,
        },
        0
      );

      // 2. Camera tracking: Track translation aligning cards below the mobile header
      tl.to(trackRef.current, { y: -140, ease: 'power1.inOut', duration: 1.5, force3D: true }, 0)
        .to(trackRef.current, { y: -640, ease: 'power1.inOut', duration: 2.8, force3D: true }, 2.2)
        .to(trackRef.current, { y: -1140, ease: 'power1.inOut', duration: 2.8, force3D: true }, 5.2)
        .to(trackRef.current, { y: -1640, ease: 'power1.inOut', duration: 2.8, force3D: true }, 8.2);

      // As the user starts scrolling down into the stages, gently fade out the header
      // so the screen is 100% focused on stage cards with ZERO text collision
      if (headerRef.current) {
        tl.to(
          headerRef.current,
          {
            opacity: 0,
            y: -18,
            duration: 0.8,
            ease: 'power1.out',
            force3D: true,
          },
          0.6
        );
      }

      // Initial mobile card states
      PROCESS_STEPS.forEach((_, i) => {
        gsap.set(cardRefs.current[i], {
          opacity: i === 0 ? 1 : 0,
          force3D: true,
        });
      });

      // Card activations with clean fade-out so previous cards never collide with top header!
      // Step 01 is active at start. As we scroll to Step 02, Card 01 smoothly fades out
      tl.to(cardRefs.current[0], { opacity: 0, duration: 0.6, force3D: true }, 2.3);

      // Card 02 fades in as it arrives in the focal viewport
      tl.to(cardRefs.current[1], { opacity: 1, duration: 0.6, force3D: true }, 3.0);

      // As we scroll to Step 03, Card 02 fades out
      tl.to(cardRefs.current[1], { opacity: 0, duration: 0.6, force3D: true }, 5.3);

      // Card 03 fades in
      tl.to(cardRefs.current[2], { opacity: 1, duration: 0.6, force3D: true }, 6.0);

      // As we scroll to Step 04, Card 03 fades out
      tl.to(cardRefs.current[2], { opacity: 0, duration: 0.6, force3D: true }, 8.3);

      // Card 04 fades in
      tl.to(cardRefs.current[3], { opacity: 1, duration: 0.6, force3D: true }, 9.0);

      tl.to({}, { duration: 2.0 });
    });

    return () => mm.revert();
  }, [isReducedMotion]);

  // Static reduced-motion layout fallback
  if (isReducedMotion) {
    return (
      <section id="process" style={{ padding: '100px 0', background: 'transparent' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <SectionMarker label="HOW WE WORK" align="center" />
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
      className="flywheel-section"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={stickyRef}
        className="flywheel-stage"
      >
        {/* Section Header (Pure Transparent Background) */}
        <div ref={headerRef} className="flywheel-header">
          <SectionMarker label="HOW WE WORK" align="center" />

          <h2 className="flywheel-title">
            The Growth Flywheel Methodology
          </h2>

          <p className="flywheel-subtitle">
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
            className="flywheel-track"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1200px',
              height: '2400px',
              margin: '0 auto',
            }}
          >
            {/* SVG Bezier Roadmap Path Layer - Desktop */}
            <svg
              className="flywheel-svg flywheel-svg--desktop"
              viewBox="0 0 1200 2400"
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
                <filter id="tip-orange-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="12" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                d="M 600 180 C 600 310, 280 310, 280 440 C 280 690, 920 690, 920 940 C 920 1190, 280 1190, 280 1440 C 280 1690, 920 1690, 920 1940"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="4"
                strokeDasharray="8 8"
                fill="none"
              />
              <path
                ref={desktopActivePathRef}
                className="flywheel-active-path"
                d="M 600 180 C 600 310, 280 310, 280 440 C 280 690, 920 690, 920 940 C 920 1190, 280 1190, 280 1440 C 280 1690, 920 1690, 920 1940"
                stroke="#FF6A2A"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(255, 106, 42, 0.8))',
                }}
              />
              <g transform="translate(600, 180)">
                <circle r="18" fill="#141518" stroke="rgba(255,106,42,0.4)" strokeWidth="2" />
                <circle r="6" fill="#FF6A2A" />
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

              {/* Travelling Glowing Tip Dot (Desktop) */}
              <circle
                ref={desktopGlowPulseRef}
                cx="600"
                cy="180"
                r="16"
                fill="rgba(255, 106, 42, 0.4)"
                filter="url(#tip-orange-glow)"
              />
              <circle
                ref={desktopGlowDotRef}
                cx="600"
                cy="180"
                r="6"
                fill="#FFFFFF"
                stroke="#FF6A2A"
                strokeWidth="3"
              />
            </svg>

            {/* SVG Spine Roadmap Path Layer - Mobile (< 768px) */}
            <svg
              className="flywheel-svg flywheel-svg--mobile"
              viewBox="0 0 400 2400"
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
              {/* Dashed Background Spine */}
              <path
                d="M 75 290 L 75 440 C 75 690, 25 690, 25 940 C 25 1190, 75 1190, 75 1440 C 75 1690, 25 1690, 25 1940"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="4"
                strokeDasharray="8 8"
                fill="none"
              />
              {/* Active Orange Drawing Path */}
              <path
                ref={mobileActivePathRef}
                className="flywheel-active-path"
                d="M 75 290 L 75 440 C 75 690, 25 690, 25 940 C 25 1190, 75 1190, 75 1440 C 75 1690, 25 1690, 25 1940"
                stroke="#FF6A2A"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Origin Top Pin (Aligned with Number 01) */}
              <g transform="translate(75, 290)">
                <circle r="14" fill="#141518" stroke="rgba(255,106,42,0.4)" strokeWidth="2" />
                <circle r="5" fill="#FF6A2A" />
              </g>

              {/* Mobile Milestone Nodes */}
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
                    transform={`translate(${node.x}, ${node.y})`}
                  >
                    {isActive && <circle r="26" fill="rgba(255, 106, 42, 0.25)" />}
                    <circle
                      r={isActive ? 20 : 17}
                      fill={isActive ? '#FF6A2A' : isPassed ? '#1C1E22' : '#0D0E10'}
                      stroke={isActive ? '#FF6A2A' : isPassed ? 'rgba(255, 106, 42, 0.6)' : 'rgba(255, 255, 255, 0.2)'}
                      strokeWidth="2.5"
                      style={{ transition: 'r 0.25s ease, fill 0.25s ease, stroke 0.25s ease' }}
                    />
                    <text
                      y="0"
                      textAnchor="middle"
                      dominantBaseline="central"
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

              {/* Travelling Glowing Tip Dot (Mobile) */}
              <circle
                ref={mobileGlowPulseRef}
                cx="75"
                cy="290"
                r="14"
                fill="rgba(255, 106, 42, 0.4)"
              />
              <circle
                ref={mobileGlowDotRef}
                cx="75"
                cy="290"
                r="5.5"
                fill="#FFFFFF"
                stroke="#FF6A2A"
                strokeWidth="2.5"
              />
            </svg>

            {/* ====================================================================
                4 SECTION CARDS (DESKTOP & MOBILE RESPONSIVE)
                ==================================================================== */}

            {PROCESS_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const PhaseIcon = phaseIcons[idx];
              const cardTopPositions = [340, 840, 1340, 1840];
              const isActive = activeStepIndex === idx;

              return (
                <div
                  key={step.number}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  className={`glass-panel flywheel-card ${isEven ? 'flywheel-card--even' : 'flywheel-card--odd'}`}
                  style={{
                    position: 'absolute',
                    top: `${cardTopPositions[idx]}px`,
                    zIndex: 4,
                    borderColor: isActive ? 'rgba(255, 106, 42, 0.45)' : 'rgba(255, 255, 255, 0.08)',
                    boxShadow: isActive
                      ? '0 0 35px rgba(255, 106, 42, 0.2), inset 0 0 15px rgba(255, 106, 42, 0.05)'
                      : 'none',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
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

      {/* RESPONSIVE LAYOUT & GPU ACCELERATION STYLES */}
      <style>{`
        .flywheel-section {
          position: relative;
          height: 480vh;
          background: transparent;
          overflow: hidden;
        }

        .flywheel-stage {
          position: relative;
          height: 100vh;
          height: 100dvh;
          width: 100%;
          overflow: hidden;
          background: transparent;
        }

        /* Top Bar Header (100% Transparent Background) */
        .flywheel-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 20;
          padding-top: 18px;
          padding-bottom: 12px;
          text-align: center;
          background: transparent !important;
          pointer-events: none;
        }

        .flywheel-title {
          font-size: clamp(1.5rem, 2.8vw, 2.2rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: #FFFFFF;
          margin-bottom: 2px;
        }

        .flywheel-subtitle {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin: 0;
        }

        .flywheel-track {
          will-change: transform;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }

        .flywheel-card {
          width: calc(48% - 20px);
          max-width: 460px;
          padding: 20px 24px;
          background-color: rgba(15, 16, 19, 0.96);
          border-radius: var(--radius-glass);
          will-change: transform, opacity;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .flywheel-card--even {
          left: 4%;
          right: auto;
          transform-origin: left center;
        }

        .flywheel-card--odd {
          left: auto;
          right: 4%;
          transform-origin: right center;
        }

        .flywheel-svg--desktop {
          display: block;
        }

        .flywheel-svg--mobile {
          display: none;
        }

        /* Mobile & Tablet (< 768px) */
        @media (max-width: 767px) {
          .flywheel-section {
            height: 300vh !important;
          }

          /* Clear, 100% transparent header with zero black/gradient background */
          .flywheel-header {
            padding-top: calc(var(--nav-height, 68px) + 12px) !important;
            padding-bottom: 8px !important;
            background: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }

          .flywheel-title {
            font-size: clamp(1.35rem, 5vw, 1.8rem) !important;
            font-weight: 800 !important;
            line-height: 1.15 !important;
            letter-spacing: -0.015em !important;
            text-transform: uppercase !important;
            color: #FFFFFF !important;
            margin: 6px 0 4px 0 !important;
            padding: 0 16px !important;
          }

          .flywheel-subtitle {
            font-size: 0.8rem !important;
            color: var(--text-muted) !important;
            line-height: 1.45 !important;
            padding: 0 20px !important;
            max-width: 320px !important;
            margin: 0 auto !important;
          }

          .flywheel-svg--desktop {
            display: none !important;
          }

          .flywheel-svg--mobile {
            display: block !important;
          }

          /* Clean alignment beside the rounded zig-zag roadmap line */
          .flywheel-card {
            width: calc(100% - 102px) !important;
            max-width: 100% !important;
            left: 88px !important;
            right: 14px !important;
            padding: 16px 18px !important;
            transform-origin: left center !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6) !important;
          }
        }
      `}</style>
    </section>
  );
};
