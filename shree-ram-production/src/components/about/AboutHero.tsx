import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const AboutHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (prefersReducedMotion) {
        gsap.set([labelRef.current, line1Ref.current, line2Ref.current, line3Ref.current, descRef.current], {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Label fade/slide upward
      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6 }
        );
      }

      // 2. Heading line-by-line clip-path reveal
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current].filter(Boolean);
      if (lines.length > 0) {
        tl.fromTo(
          lines,
          { opacity: 0, y: 35, clipPath: 'inset(100% 0% 0% 0%)' },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.85,
            stagger: 0.12,
          },
          '-=0.3'
        );
      }

      // 3. Description fade upward with small stagger
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.35'
        );
      }

      // 4. Subtle orange ambient light moving slowly in background
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: '+=30',
          y: '+=20',
          scale: 1.12,
          opacity: 0.85,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="about-hero-section">
      <div ref={glowRef} className="about-hero-glow" aria-hidden="true" />
      <div className="about-hero-grid" aria-hidden="true" />

      <div className="container" style={{ position: 'relative', zIndex: 5, maxWidth: '1100px', textAlign: 'center' }}>
        
        {/* Hero — clean typography without section marker per editorial system */}

        {/* Large Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.8rem, 6.5vw, 5.8rem)',
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            marginBottom: '32px',
          }}
        >
          <div ref={line1Ref} style={{ willChange: 'transform, opacity, clip-path' }}>
            WE CREATE.
          </div>
          <div ref={line2Ref} style={{ willChange: 'transform, opacity, clip-path' }}>
            WE BUILD.
          </div>
          <div
            ref={line3Ref}
            style={{
              color: '#FF6A2A',
              willChange: 'transform, opacity, clip-path',
            }}
          >
            WE HELP BUSINESSES GROW.
          </div>
        </h1>

        {/* Short Supporting Description */}
        <p
          ref={descRef}
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
            color: '#F5F5F2',
            lineHeight: 1.6,
            maxWidth: '760px',
            margin: '0 auto',
            fontFamily: 'var(--font-body)',
            opacity: 0.9,
          }}
        >
          Shree Ram Production combines production, creative, marketing and technology to help businesses grow with purpose.
        </p>

      </div>
    </section>
  );
};

export default AboutHero;
