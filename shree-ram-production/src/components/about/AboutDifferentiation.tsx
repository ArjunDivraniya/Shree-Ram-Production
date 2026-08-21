import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutDifferentiation: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }
        );
      }

      if (cardsRef.current) {
        tl.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
          '-=0.3'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlightPillars = [
    {
      title: 'SINGLE SERVICE',
      desc: 'Targeted execution for one immediate priority (e.g. video shoot, rebrand, or web app).',
    },
    {
      title: 'MULTI-SERVICE',
      desc: 'Syncing 2-3 capabilities together to multiply campaign impact.',
    },
    {
      title: 'COMPLETE GROWTH PARTNER',
      desc: 'Dedicated multidisciplinary team driving full-stack creative & tech strategy.',
    },
  ];

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
      <div className="container" style={{ maxWidth: '1100px', textAlign: 'center' }}>
        
        <div className="badge-pill" style={{ marginBottom: '24px', display: 'inline-flex' }}>
          <span className="badge-pill-dot" />
          <span>WHAT MAKES US DIFFERENT</span>
        </div>

        {/* Strong Statement Heading */}
        <h2
          ref={headingRef}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            marginBottom: '32px',
          }}
        >
          <div>ONE PARTNER.</div>
          <div>MULTIPLE CAPABILITIES.</div>
          <div style={{ color: 'var(--accent-orange)' }}>ONE SHARED GOAL.</div>
        </h2>

        {/* Supporting Text */}
        <p
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
            color: '#A5A5A8',
            lineHeight: 1.6,
            maxWidth: '780px',
            margin: '0 auto 60px auto',
          }}
        >
          Whether a business needs one specific service or a combination of capabilities, we adapt around the actual need instead of forcing a fixed package.
        </p>

        {/* 3 Highlight Cards */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            textAlign: 'left',
          }}
        >
          {highlightPillars.map((item) => (
            <div
              key={item.title}
              style={{
                backgroundColor: '#121316',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '32px 28px',
                transition: 'all 0.35s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FF6A2A';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#FF6A2A',
                  marginBottom: '18px',
                  boxShadow: '0 0 10px #FF6A2A',
                }}
              />

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '0.02em',
                  marginBottom: '12px',
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: '0.92rem',
                  color: '#A5A5A8',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
