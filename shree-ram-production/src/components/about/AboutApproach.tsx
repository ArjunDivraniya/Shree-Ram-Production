import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionMarker from '../ui/SectionMarker';

gsap.registerPlugin(ScrollTrigger);

interface Stage {
  num: string;
  title: string;
  desc: string;
}

const STAGES: Stage[] = [
  {
    num: '01',
    title: 'UNDERSTAND',
    desc: 'Understand the business and objective. We listen, research and define what success looks like before anything else.',
  },
  {
    num: '02',
    title: 'CREATE',
    desc: 'Develop the right creative direction. Strategy and ideas shaped around your audience and goals.',
  },
  {
    num: '03',
    title: 'EXECUTE',
    desc: 'Produce and build with attention to detail. Cinematic craft meets disciplined delivery.',
  },
  {
    num: '04',
    title: 'GROW',
    desc: 'Launch, measure, optimize and scale. We stay to turn results into sustained growth.',
  },
];

export const AboutApproach: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;
    if (!wrapperRef.current || !stickyRef.current) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length !== STAGES.length) return;

    const ctx = gsap.context(() => {
      // Clean initial state – 01 in place, 02-04 stacked below, ready to slide up and overlap
      gsap.set(cards[0], { yPercent: 0, scale: 1, transformOrigin: 'center top', willChange: 'transform' });
      gsap.set(cards.slice(1), { yPercent: 110, scale: 0.98, transformOrigin: 'center top', willChange: 'transform' });
      // slight behind-cards push so depth is visible after they stack
      // use y (px) for the pinned-behind offset so yPercent remains reversible
      gsap.set(cards.slice(0, 3), { filter: 'brightness(1)' });

      const tl = gsap.timeline({
        defaults: { ease: 'none', overwrite: 'auto' },
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.05,
          pin: stickyRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            let idx = 0;
            if (p < 0.22) idx = 0;
            else if (p < 0.48) idx = 1;
            else if (p < 0.74) idx = 2;
            else idx = 3;
            setActiveIndex((prev) => (prev !== idx ? idx : prev));
          },
        },
      });

      // --- Polished, perfectly reversible stacked sequence ---
      // Each transition is paired: incoming card slides y 110% -> 0, outgoing card scales + y offset + slight dim
      // Using explicit labels keeps forward/reverse identical.

      // 01 -> 02
      tl.to(cards[1], { yPercent: 0, scale: 1, duration: 0.9 }, 0.35)
        .to(cards[0], { scale: 0.95, yPercent: -3.5, filter: 'brightness(0.92)', duration: 0.9 }, 0.35);

      // hold 01+02
      tl.to({}, { duration: 0.45 });

      // 02 -> 03
      tl.to(cards[2], { yPercent: 0, scale: 1, duration: 0.9 }, 1.7)
        .to(cards[1], { scale: 0.95, yPercent: -3.5, filter: 'brightness(0.92)', duration: 0.9 }, 1.7);

      tl.to({}, { duration: 0.45 });

      // 03 -> 04
      tl.to(cards[3], { yPercent: 0, scale: 1, duration: 0.9 }, 3.05)
        .to(cards[2], { scale: 0.95, yPercent: -3.5, filter: 'brightness(0.92)', duration: 0.9 }, 3.05);

      // final hold so 04 settles before unpin
      tl.to({}, { duration: 0.65 });

      // Optional: subtle scrubbed glow on active card border – driven by timeline so reverse is mirrored
      // (kept subtle to avoid fighting CSS transition)
    }, wrapperRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  // Reduced motion: static vertical stack without pin
  if (isReducedMotion) {
    return (
      <section
        ref={sectionRef}
        style={{
          padding: '130px 0',
          backgroundColor: '#08090A',
          position: 'relative',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ marginBottom: '56px' }}>
            <SectionMarker label="OUR APPROACH" align="left" />
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                textTransform: 'uppercase',
              }}
            >
              HOW WE APPROACH EVERY PROJECT
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '760px' }}>
            {STAGES.map((stage) => (
              <div
                key={stage.num}
                className="approach-stack-card"
                style={{ position: 'relative' } as React.CSSProperties}
              >
                <div className="approach-card-accent" />
                <div className="approach-card-top">
                  <span className="approach-card-num">{stage.num}</span>
                  <span className="approach-card-phase">PHASE {stage.num}</span>
                </div>
                <h3 className="approach-card-title">{stage.title}</h3>
                <p className="approach-card-desc">{stage.desc}</p>
                <div className="approach-card-watermark">{stage.num}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="approach-section"
      style={{
        backgroundColor: '#08090A',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Header – scrolls normally */}
      <div className="container" style={{ maxWidth: '1100px', paddingTop: '130px' }}>
        <div className="approach-header">
          <SectionMarker label="OUR APPROACH" align="left" />
          <h2 className="approach-heading">HOW WE APPROACH EVERY PROJECT</h2>
          <p className="approach-subtext">
            A focused four-phase flow — designed to keep clarity high and quality consistent from brief to growth.
          </p>
        </div>
      </div>

      {/* Scroll-driven stacked pin area */}
      <div ref={wrapperRef} className="approach-wrapper">
        <div ref={stickyRef} className="approach-sticky">
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '18%',
              right: '12%',
              width: '520px',
              height: '520px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,106,42,0.09) 0%, transparent 72%)',
              filter: 'blur(36px)',
              pointerEvents: 'none',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              maskImage: 'radial-gradient(ellipse at center, black 42%, transparent 78%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 42%, transparent 78%)',
              pointerEvents: 'none',
              opacity: 0.5,
            }}
          />
          <div className="approach-sticky-inner container" style={{ maxWidth: '1100px' }}>
            {/* Left meta / progress — desktop timeline */}
            <div className="approach-progress-col approach-timeline">
              <div className="approach-progress-line approach-path">
                <div
                  className="approach-progress-fill"
                  style={{ height: `${((activeIndex + 1) / STAGES.length) * 100}%` }}
                />
              </div>
              <div className="approach-progress-steps">
                {STAGES.map((s, i) => (
                  <div key={s.num} className={`approach-step ${i === activeIndex ? 'is-active' : ''} ${i < activeIndex ? 'is-past' : ''}`}>
                    <span className="approach-step-dot" />
                    <span className="approach-step-label">{s.num} — {s.title}</span>
                  </div>
                ))}
              </div>
              <div className="approach-counter">
                <span className="approach-counter-current">0{activeIndex + 1}</span>
                <span className="approach-counter-sep">/</span>
                <span className="approach-counter-total">04</span>
              </div>
              <div className="approach-progress-hint">Scroll to stack — reverses smoothly</div>
            </div>

            {/* Stacked cards */}
            <div className="approach-stack" aria-live="polite">
              {STAGES.map((stage, idx) => (
                <div
                  key={stage.num}
                  ref={(el) => { cardsRef.current[idx] = el; }}
                  className={`approach-stack-card ${idx === activeIndex ? 'is-active' : ''} ${idx < activeIndex ? 'is-behind' : ''}`}
                  style={{ zIndex: idx + 1 } as React.CSSProperties}
                >
                  <div className="approach-card-accent" />
                  <div className="approach-card-top">
                    <span className="approach-card-num">{stage.num}</span>
                    <span className="approach-card-phase">PHASE {stage.num}</span>
                  </div>
                  <h3 className="approach-card-title">{stage.title}</h3>
                  <p className="approach-card-desc">{stage.desc}</p>
                  <div className="approach-card-watermark" aria-hidden="true">{stage.num}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="approach-scroll-hint" aria-hidden="true">
            <span>SCROLL</span>
            <span className="approach-scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutApproach;
