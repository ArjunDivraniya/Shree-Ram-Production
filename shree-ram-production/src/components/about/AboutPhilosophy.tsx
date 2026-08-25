import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionMarker from '../ui/SectionMarker';

gsap.registerPlugin(ScrollTrigger);

interface Principle {
  num: string;
  title: string;
  desc: string;
}

const PRINCIPLES: Principle[] = [
  {
    num: '01',
    title: 'SINGLE SERVICE FOCUS',
    desc: 'Precision execution for a specific business need.',
  },
  {
    num: '02',
    title: 'MULTI-SERVICE SYNERGY',
    desc: 'Combine capabilities when multiple pieces need to work together.',
  },
  {
    num: '03',
    title: 'COMPLETE GROWTH PARTNER',
    desc: 'Bring creative, marketing and technology together when the business needs a broader solution.',
  },
];

export const AboutPhilosophy: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const validRows = rowsRef.current.filter(Boolean);
      validRows.forEach((row) => {
        if (!row) return;

        const numEl = row.querySelector('.philosophy-num');
        const titleEl = row.querySelector('.philosophy-title');
        const descEl = row.querySelector('.philosophy-desc');
        const lineEl = row.querySelector('.philosophy-line');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        // 1. Number reveals first
        if (numEl) {
          tl.fromTo(
            numEl,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
          );
        }

        // 2. Title slides upward
        if (titleEl) {
          tl.fromTo(
            titleEl,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
            '-=0.3'
          );
        }

        // 3. Description follows
        if (descEl) {
          tl.fromTo(
            descEl,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
            '-=0.35'
          );
        }

        // 4. Thin orange line draws between principles
        if (lineEl) {
          tl.fromTo(
            lineEl,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.75, ease: 'power3.inOut' },
            '-=0.4'
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '130px 0',
        background: 'transparent',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="container" style={{ maxWidth: '1140px' }}>
        
        {/* Section Header */}
        <div style={{ marginBottom: '64px' }}>
          <SectionMarker label="OUR PHILOSOPHY" align="left" />

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              maxWidth: '720px',
            }}
          >
            HOW WE APPROACH SOLUTION ARCHITECTURE.
          </h2>
        </div>

        {/* Large Editorial Rows (Not Cards) */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {PRINCIPLES.map((principle, idx) => (
            <div
              key={principle.num}
              ref={(el) => { rowsRef.current[idx] = el; }}
              className="philosophy-row"
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(60px, 90px) 1fr',
                  gap: '32px',
                  alignItems: 'baseline',
                }}
              >
                {/* Number */}
                <span
                  className="philosophy-num"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#FF6A2A',
                    letterSpacing: '0.08em',
                  }}
                >
                  {principle.num}
                </span>

                {/* Content */}
                <div>
                  <h3
                    className="philosophy-title"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      letterSpacing: '-0.01em',
                      marginBottom: '10px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {principle.title}
                  </h3>

                  <p
                    className="philosophy-desc"
                    style={{
                      fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
                      color: '#A5A5A8',
                      lineHeight: 1.55,
                      margin: 0,
                      maxWidth: '700px',
                    }}
                  >
                    {principle.desc}
                  </p>
                </div>
              </div>

              {/* Thin Orange Line Underline Draw */}
              <div className="philosophy-line" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutPhilosophy;
