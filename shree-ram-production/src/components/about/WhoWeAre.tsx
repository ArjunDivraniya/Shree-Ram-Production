import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const WhoWeAre: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const visualRef = useRef<HTMLDivElement>(null);

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

      // 1. Label reveal
      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );
      }

      // 2. Heading reveal
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 35, clipPath: 'inset(100% 0% 0% 0%)' },
          { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85, ease: 'power3.out' },
          '-=0.3'
        );
      }

      // 3. Emphasized words sequential reveal
      const validWords = wordsRef.current.filter(Boolean);
      if (validWords.length > 0) {
        tl.fromTo(
          validWords,
          { opacity: 0, y: 25, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.18,
            ease: 'back.out(1.4)',
          },
          '-=0.4'
        );
      }

      // 4. Description fade upward
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );
      }

      // 5. Subtle visual reveal
      if (visualRef.current) {
        tl.fromTo(
          visualRef.current,
          { opacity: 0, scale: 1.05, clipPath: 'inset(10% 0% 10% 0%)' },
          {
            opacity: 1,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.0,
            ease: 'power3.out',
          },
          '-=0.5'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="who-we-are-section">
      <div className="container" style={{ maxWidth: '1280px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'center' }}>
          
          {/* Left Column: Strong Editorial Text */}
          <div style={{ maxWidth: '620px' }}>
            <div
              ref={labelRef}
              className="badge-pill"
              style={{ marginBottom: '28px', display: 'inline-flex' }}
            >
              <span className="badge-pill-dot" />
              <span>WHO WE ARE</span>
            </div>

            <h2
              ref={headingRef}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 5.2vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                marginBottom: '32px',
              }}
            >
              MORE THAN A PRODUCTION AGENCY.
            </h2>

            {/* Genuine Description */}
            <div ref={descRef} style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)', color: '#F5F5F2', lineHeight: 1.7 }}>
              <p style={{ marginBottom: '24px', opacity: 0.9 }}>
                Shree Ram Production was founded to bridge the gap between creative storytelling and commercial growth. We bring production craft, visual strategy, and modern technology into one aligned methodology.
              </p>

              {/* Sequential Emphasized Words */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', margin: '32px 0 24px 0' }}>
                <span
                  ref={(el) => { wordsRef.current[0] = el; }}
                  className="emphasis-word"
                  style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)' }}
                >
                  CREATE
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.2)', fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', fontWeight: 300 }}>·</span>
                <span
                  ref={(el) => { wordsRef.current[1] = el; }}
                  className="emphasis-word"
                  style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)' }}
                >
                  CONNECT
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.2)', fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', fontWeight: 300 }}>·</span>
                <span
                  ref={(el) => { wordsRef.current[2] = el; }}
                  className="emphasis-word"
                  style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)' }}
                >
                  GROW
                </span>
              </div>

              <p style={{ color: '#A5A5A8', fontSize: '1.02rem', lineHeight: 1.65 }}>
                Every campaign, film, and digital product we build is designed to make brands unforgettable while driving real business momentum.
              </p>
            </div>
          </div>

          {/* Right Column: Subtle Visual Reveal */}
          <div
            ref={visualRef}
            style={{
              position: 'relative',
              height: '520px',
              borderRadius: '24px',
              overflow: 'hidden',
              background: 'linear-gradient(140deg, #121316 0%, #1A1B20 50%, #0E0F12 100%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6)',
            }}
          >
            {/* Ambient Lighting Grids */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                  radial-gradient(ellipse 65% 55% at 50% 40%, rgba(255, 106, 42, 0.15) 0%, transparent 75%),
                  radial-gradient(ellipse 40% 40% at 80% 80%, rgba(255, 255, 255, 0.04) 0%, transparent 60%)
                `,
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '20px',
                padding: '48px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '88px',
                  height: '88px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 106, 42, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 106, 42, 0.06)',
                  boxShadow: '0 0 30px rgba(255, 106, 42, 0.2)',
                }}
              >
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#FF6A2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  maxWidth: '340px',
                  lineHeight: 1.5,
                  letterSpacing: '-0.01em',
                }}
              >
                WE CRAFT STORIES THAT ELEVATE BRANDS AND CAPTIVATE AUDIENCES.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;