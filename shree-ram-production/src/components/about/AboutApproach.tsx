import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    desc: 'Understand the business and objective.',
  },
  {
    num: '02',
    title: 'CREATE',
    desc: 'Develop the right creative direction.',
  },
  {
    num: '03',
    title: 'EXECUTE',
    desc: 'Produce and build with attention to detail.',
  },
  {
    num: '04',
    title: 'GROW',
    desc: 'Launch, learn and improve.',
  },
];

export const AboutApproach: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pathLineRef = useRef<HTMLDivElement>(null);
  const stageCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !pathLineRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Draw connected line with scroll
      gsap.fromTo(
        pathLineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'bottom 50%',
            scrub: true,
          },
        }
      );

      // Activate stages as scroll reaches them
      const validCards = stageCardsRef.current.filter(Boolean);
      validCards.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0.3, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: card,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
              onEnter: () => card.classList.add('active'),
              onLeaveBack: () => card.classList.remove('active'),
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
        
        {/* Section Header */}
        <div style={{ marginBottom: '64px' }}>
          <div className="badge-pill" style={{ marginBottom: '20px', display: 'inline-flex' }}>
            <span className="badge-pill-dot" />
            <span>OUR APPROACH</span>
          </div>

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

        {/* Timeline with Connected Scroll Line */}
        <div style={{ position: 'relative', paddingLeft: '56px' }}>
          
          {/* Rail Line */}
          <div
            style={{
              position: 'absolute',
              top: '30px',
              bottom: '30px',
              left: '16px',
              width: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            }}
          />

          {/* Active Orange Scroll Line */}
          <div
            ref={pathLineRef}
            style={{
              position: 'absolute',
              top: '30px',
              bottom: '30px',
              left: '16px',
              width: '2px',
              backgroundColor: '#FF6A2A',
              boxShadow: '0 0 12px rgba(255, 106, 42, 0.8)',
              willChange: 'transform',
            }}
          />

          {/* 4 Connected Stages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {STAGES.map((stage, idx) => (
              <div
                key={stage.num}
                ref={(el) => { stageCardsRef.current[idx] = el; }}
                className="approach-stage-card"
              >
                {/* Node Bullet Dot */}
                <div className="approach-node-dot" />

                {/* Stage Number */}
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: '#FF6A2A',
                    letterSpacing: '0.04em',
                  }}
                >
                  {stage.num}
                </span>

                {/* Stage Content */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      letterSpacing: '-0.01em',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {stage.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
                      color: '#A5A5A8',
                      lineHeight: 1.55,
                      margin: 0,
                      maxWidth: '620px',
                    }}
                  >
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutApproach;
