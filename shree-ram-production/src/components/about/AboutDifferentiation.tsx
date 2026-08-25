import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionMarker from '../ui/SectionMarker';

gsap.registerPlugin(ScrollTrigger);

export const AboutDifferentiation: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current.children,
          { opacity: 0, y: 35, clipPath: 'inset(100% 0% 0% 0%)' },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.85,
            stagger: 0.14,
            ease: 'power3.out',
          }
        );
      }

      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );
      }

      if (pillsRef.current) {
        tl.fromTo(
          pillsRef.current.children,
          { opacity: 0, y: 24, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.35'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlights = [
    { title: 'SINGLE SERVICE', label: 'Specific Business Need' },
    { title: 'MULTI-SERVICE', label: 'Synergistic Combination' },
    { title: 'COMPLETE SOLUTION', label: 'Full Growth Architecture' },
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '140px 0',
        background: 'transparent',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="container" style={{ maxWidth: '1140px', textAlign: 'center' }}>
        
        {/* Label */}
        <SectionMarker label="WHAT MAKES US DIFFERENT" align="center" />

        {/* Large Typography Heading */}
        <h2
          ref={headingRef}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5.8vw, 5.2rem)',
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            marginBottom: '36px',
          }}
        >
          <div style={{ willChange: 'transform, opacity, clip-path' }}>ONE NEED.</div>
          <div style={{ willChange: 'transform, opacity, clip-path' }}>ONE SERVICE.</div>
          <div style={{ color: '#FF6A2A', willChange: 'transform, opacity, clip-path' }}>
            OR THE WHOLE ENGINE.
          </div>
        </h2>

        {/* Supporting Text */}
        <p
          ref={textRef}
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
            color: '#A5A5A8',
            lineHeight: 1.65,
            maxWidth: '780px',
            margin: '0 auto 64px auto',
          }}
        >
          We don't force every business into the same solution. Start with exactly what you need and bring in additional capabilities when they create real value.
        </p>

        {/* Large Typography Highlight Transitions */}
        <div
          ref={pillsRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          {highlights.map((item) => (
            <div key={item.title} className="diff-highlight-pill">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#FF6A2A',
                    boxShadow: '0 0 10px #FF6A2A',
                  }}
                />
                <span>{item.title}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutDifferentiation;
