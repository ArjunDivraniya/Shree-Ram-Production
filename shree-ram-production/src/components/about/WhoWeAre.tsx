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
        },
      });

      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );
      }

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 35, clipPath: 'inset(100% 0% 0% 0%)' },
          { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85, ease: 'power3.out' },
          '-=0.2'
        );
      }

      const validWords = wordsRef.current.filter(Boolean);
      if (validWords.length > 0) {
        tl.fromTo(
          validWords,
          { opacity: 0, y: 30, clipPath: 'inset(0% 100% 0% 0%)' },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
          },
          '-=0.4'
        );
      }

      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );
      }

      if (visualRef.current) {
        tl.fromTo(
          visualRef.current,
          { opacity: 0, scale: 1.05, clipPath: 'inset(10% 0% 10% 0%)' },
          {
            opacity: 1,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.1,
            ease: 'power3.out',
          },
          '-=0.6'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="who-we-are-section"
      style={{
        padding: '140px 0',
        backgroundColor: '#08090A',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="container" style={{ maxWidth: '1300px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          {/* Left Column: Editorial Content */}
          <div style={{ paddingRight: '40px' }}>
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
                fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)',
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

            <div ref={descRef} style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)', color: '#F5F5F2', lineHeight: 1.7, maxWidth: '580px' }}>
              <p style={{ marginBottom: '24px' }}>
                Shree Ram Production was born from a simple observation: creative production and business growth were operating in silos. We exist to bridge that gap.
              </p>
              <p style={{ marginBottom: '32px' }}>
                We don't just deliver assets. We build creative systems that connect <strong>content</strong>, <strong>brand</strong>, <strong>growth</strong>, and <strong>technology</strong> — so every frame, pixel, and line of code works toward measurable outcomes.
              </p>

              {/* Emphasized Words */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
                <span
                  ref={(el) => { wordsRef.current[0] = el; }}
                  className="emphasis-word"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                    fontWeight: 800,
                    color: '#FF6A2A',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    position: 'relative',
                  }}
                >
                  CREATE
                </span>
                <span
                  ref={(el) => { wordsRef.current[1] = el; }}
                  className="emphasis-word"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                    fontWeight: 800,
                    color: '#FF6A2A',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    position: 'relative',
                  }}
                >
                  CONNECT
                </span>
                <span
                  ref={(el) => { wordsRef.current[2] = el; }}
                  className="emphasis-word"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                    fontWeight: 800,
                    color: '#FF6A2A',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    position: 'relative',
                  }}
                >
                  GROW
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Element */}
          <div ref={visualRef} className="who-we-are-visual" style={{ position: 'relative', height: '580px', borderRadius: '24px', overflow: 'hidden' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #0E0F12 0%, #141518 50%, #0E0F12 100%)',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                  radial-gradient(ellipse 60% 50% at 50% 30%, rgba(255, 106, 42, 0.12) 0%, transparent 70%),
                  radial-gradient(ellipse 40% 30% at 80% 70%, rgba(255, 255, 255, 0.04) 0%, transparent 60%)
                `,
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                  linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
                maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
                pointerEvents: 'none',
                zIndex: 3,
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
                gap: '16px',
                zIndex: 4,
                padding: '40px',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 106, 42, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 106, 42, 0.05)',
                }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FF6A2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 600, color: '#F5F5F2', textAlign: 'center', maxWidth: '300px', lineHeight: 1.5 }}>
                Every project starts with listening. We align on vision before we execute.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;