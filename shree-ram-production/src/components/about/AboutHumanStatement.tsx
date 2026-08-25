import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionMarker from '../ui/SectionMarker';

gsap.registerPlugin(ScrollTrigger);

export const AboutHumanStatement: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 76%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
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
      <div className="container" style={{ maxWidth: '1140px' }}>
        <div ref={containerRef} className="human-statement-frame">
          
          {/* Subtle Orange Glow Ambient Accent */}
          <div
            style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '350px',
              height: '350px',
              background: 'radial-gradient(circle, rgba(255, 106, 42, 0.14) 0%, transparent 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }}
          />

          <SectionMarker label="HUMAN COLLABORATION" align="left" />

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 4.8vw, 4.4rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              marginBottom: '28px',
              maxWidth: '820px',
            }}
          >
            GOOD WORK STARTS <span style={{ color: '#FF6A2A' }}>WITH GOOD COLLABORATION.</span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)',
              color: '#A5A5A8',
              lineHeight: 1.7,
              maxWidth: '740px',
              margin: 0,
            }}
          >
            We believe extraordinary work comes from active listening, open communication, shared ideas, and honest feedback. Beyond delivering outputs, we focus on building long-term relationships rooted in trust and clarity.
          </p>

        </div>
      </div>
    </section>
  );
};

export default AboutHumanStatement;
