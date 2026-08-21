import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  num: string;
  title: string;
  desc: string;
}

const STEPS: Step[] = [
  {
    num: '01',
    title: 'DISCOVER',
    desc: 'Understand the business, audience and objective.',
  },
  {
    num: '02',
    title: 'CREATE',
    desc: 'Develop the creative direction and execution.',
  },
  {
    num: '03',
    title: 'LAUNCH',
    desc: 'Put the work into the real world.',
  },
  {
    num: '04',
    title: 'GROW',
    desc: 'Learn, optimize and build the next step.',
  },
];

export const AboutProcess: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pathLineRef = useRef<HTMLDivElement>(null);
  const stepNodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !pathLineRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Draw connected progress line as user scrolls
      gsap.fromTo(
        pathLineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'bottom 45%',
            scrub: true,
          },
        }
      );

      // Activate nodes sequentially as line reaches them
      const validNodes = stepNodesRef.current.filter(Boolean);
      validNodes.forEach((node) => {
        if (!node) return;
        gsap.fromTo(
          node,
          { opacity: 0.35, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: node,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
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
        padding: '120px 0',
        backgroundColor: '#08090A',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        {/* Section Header */}
        <div style={{ marginBottom: '64px' }}>
          <div className="badge-pill" style={{ marginBottom: '20px' }}>
            <span className="badge-pill-dot" />
            <span>HOW WE WORK</span>
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
            OUR 4-STEP METHODOLOGY
          </h2>
        </div>

        {/* Process Timeline with Connected Scroll Line */}
        <div style={{ position: 'relative', paddingLeft: '48px' }}>
          
          {/* Static Background Rail Line */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              bottom: '16px',
              left: '16px',
              width: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            }}
          />

          {/* Active Animated Orange Scroll Line */}
          <div
            ref={pathLineRef}
            style={{
              position: 'absolute',
              top: '16px',
              bottom: '16px',
              left: '16px',
              width: '2px',
              backgroundColor: '#FF6A2A',
              boxShadow: '0 0 12px #FF6A2A',
              willChange: 'transform',
            }}
          />

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
            {STEPS.map((step, idx) => (
              <div
                key={step.num}
                ref={(el) => { stepNodesRef.current[idx] = el; }}
                style={{
                  position: 'relative',
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '24px',
                  alignItems: 'baseline',
                }}
              >
                {/* Node Bullet Dot on the Line */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-40px',
                    top: '6px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#08090A',
                    border: '3px solid #FF6A2A',
                    boxShadow: '0 0 10px rgba(255, 106, 42, 0.5)',
                  }}
                />

                {/* Step Number */}
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#FF6A2A',
                  }}
                >
                  {step.num}
                </span>

                {/* Step Content */}
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
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
                      color: '#A5A5A8',
                      lineHeight: 1.55,
                      margin: 0,
                      maxWidth: '640px',
                    }}
                  >
                    {step.desc}
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
