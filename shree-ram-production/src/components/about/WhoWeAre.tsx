import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import mainLogo from '../../assets/logo/shreeramproduction-logo.png';
import SectionMarker from '../ui/SectionMarker';

gsap.registerPlugin(ScrollTrigger);

export const WhoWeAre: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const visualRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

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

      // 5. Premium logo showcase — fade-in + scale 0.95 → 1
      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.4'
        );
      }
      if (glowRef.current) {
        tl.fromTo(
          glowRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.9, ease: 'power2.out' },
          '<'
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
            <SectionMarker number="01" label="WHO WE ARE" align="left" />

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

          {/* Right Column: Clean Premium Brand Showcase — logo directly on dark background */}
          <div
            ref={visualRef}
            className="who-we-are-visual"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '520px',
              padding: '40px 20px',
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
              overflow: 'visible',
            }}
          >
            {/* Very subtle soft gold/orange ambient glow */}
            <div
              ref={glowRef}
              aria-hidden="true"
              className="who-we-are-glow"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'min(520px, 90%)',
                height: 'min(520px, 90%)',
                background:
                  'radial-gradient(circle, rgba(255, 106, 42, 0.10) 0%, rgba(212, 160, 67, 0.08) 28%, rgba(255, 106, 42, 0.04) 48%, transparent 72%)',
                filter: 'blur(36px)',
                pointerEvents: 'none',
              }}
            />
            <img
              ref={logoRef}
              src={mainLogo}
              alt="Shree Ram Production"
              className="who-we-are-logo"
              style={{
                position: 'relative',
                zIndex: 1,
                width: 'clamp(300px, 36vw, 460px)',
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;