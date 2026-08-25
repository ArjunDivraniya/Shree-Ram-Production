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
      // initial positions: first card in place, others below viewport
      gsap.set(cards[0], { yPercent: 0, scale: 1, rotation: 0 });
      gsap.set(cards.slice(1), { yPercent: 108, scale: 0.96, rotation: 0 });

      // subtle offset stack hint: each card slightly offset when active (handled via timeline tweens)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.85,
          pin: stickyRef.current,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            let idx = 0;
            if (p < 0.25) idx = 0;
            else if (p < 0.52) idx = 1;
            else if (p < 0.78) idx = 2;
            else idx = 3;
            setActiveIndex(idx);
          },
        },
      });

      // Card 2 slides over Card 1
      tl.to(cards[1], { yPercent: 0, scale: 1, duration: 1, ease: 'none' }, 0.2)
        .to(cards[0], { scale: 0.94, yPercent: -4, duration: 1, ease: 'none' }, 0.2)
        .to({}, { duration: 0.6 });

      // Card 3 over Card 2
      tl.to(cards[2], { yPercent: 0, scale: 1, duration: 1, ease: 'none' }, 1.8)
        .to(cards[1], { scale: 0.94, yPercent: -4, duration: 1, ease: 'none' }, 1.8)
        .to({}, { duration: 0.6 });

      // Card 4 over Card 3
      tl.to(cards[3], { yPercent: 0, scale: 1, duration: 1, ease: 'none' }, 3.4)
        .to(cards[2], { scale: 0.94, yPercent: -4, duration: 1, ease: 'none' }, 3.4)
        .to({}, { duration: 0.8 });
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
                <div className="approach-card-num">{stage.num}</div>
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
          <div className="approach-sticky-inner container" style={{ maxWidth: '1100px' }}>
            {/* Left meta / progress */}
            <div className="approach-progress-col">
              <div className="approach-progress-line">
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
            </div>

            {/* Stacked cards */}
            <div className="approach-stack">
              {STAGES.map((stage, idx) => (
                <div
                  key={stage.num}
                  ref={(el) => { cardsRef.current[idx] = el; }}
                  className={`approach-stack-card ${idx === activeIndex ? 'is-active' : ''}`}
                  style={{ zIndex: idx + 1 } as React.CSSProperties}
                  aria-hidden={idx !== activeIndex ? undefined : undefined}
                >
                  {/* top accent */}
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

          {/* scroll hint */}
          <div className="approach-scroll-hint" aria-hidden="true">
            <span>SCROLL</span>
            <span className="approach-scroll-line" />
          </div>
        </div>
      </div>

      {/* Spacer for mobile fallback after pin (hidden on desktop) */}
    </section>
  );
};

export default AboutApproach;
