import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionMarker from '../ui/SectionMarker';

gsap.registerPlugin(ScrollTrigger);

interface Belief {
  num: string;
  title: string;
  statement: string;
}

const BELIEFS: Belief[] = [
  {
    num: '01',
    title: 'CREATE WITH PURPOSE',
    statement: 'Good creative work should have a reason behind it.',
  },
  {
    num: '02',
    title: 'BUILD WITH DETAIL',
    statement: 'Every visual, interaction and experience matters.',
  },
  {
    num: '03',
    title: 'GROW WITH THE CLIENT',
    statement: 'Our work should contribute to real business growth.',
  },
  {
    num: '04',
    title: 'STAY CURIOUS',
    statement: 'Technology, creativity and culture keep changing — so we keep learning.',
  },
];

export const AboutBeliefs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const validRows = rowsRef.current.filter(Boolean);
      if (validRows.length > 0) {
        validRows.forEach((row) => {
          if (!row) return;

          const numEl = row.querySelector('.belief-num');
          const titleEl = row.querySelector('.belief-title');
          const stmtEl = row.querySelector('.belief-statement');
          const lineEl = row.querySelector('.belief-row-line');

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: 'top 82%',
            },
          });

          tl.fromTo(
            [numEl, titleEl, stmtEl],
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power2.out' }
          );

          if (lineEl) {
            tl.to(
              lineEl,
              { scaleX: 1, duration: 0.7, ease: 'power3.out' },
              '-=0.4'
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '120px 0',
        background: 'transparent',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        {/* Section Header */}
        <div style={{ marginBottom: '60px' }}>
          <SectionMarker label="WHAT WE BELIEVE" align="left" />

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              maxWidth: '700px',
            }}
          >
            GUIDED BY CORE PRINCIPLES.
          </h2>
        </div>

        {/* Large Editorial Belief Statements */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {BELIEFS.map((belief, idx) => (
            <div
              key={belief.num}
              ref={(el) => { rowsRef.current[idx] = el; }}
              className="belief-row"
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '24px',
                  alignItems: 'baseline',
                }}
              >
                {/* Number */}
                <span
                  className="belief-num"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: 'var(--accent-orange)',
                    letterSpacing: '0.08em',
                  }}
                >
                  {belief.num}
                </span>

                {/* Content */}
                <div>
                  <h3
                    className="belief-title"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      letterSpacing: '-0.01em',
                      marginBottom: '10px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {belief.title}
                  </h3>

                  <p
                    className="belief-statement"
                    style={{
                      fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
                      color: '#A5A5A8',
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {belief.statement}
                  </p>
                </div>
              </div>

              {/* Connected Underline Draw */}
              <div className="belief-row-line" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
