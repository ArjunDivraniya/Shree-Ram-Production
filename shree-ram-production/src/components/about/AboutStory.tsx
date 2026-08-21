import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);

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

      // Text reveal
      if (textColRef.current) {
        const textElements = textColRef.current.querySelectorAll('.story-reveal');
        tl.fromTo(
          textElements,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' }
        );
      }

      // Supporting image scale/clip reveal
      if (imageFrameRef.current) {
        tl.fromTo(
          imageFrameRef.current,
          { opacity: 0, scale: 1.06, clipPath: 'inset(12% 0% 12% 0%)' },
          {
            opacity: 1,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.95,
            ease: 'power3.out',
          },
          '-=0.5'
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
      <div className="container" style={{ maxWidth: '1180px' }}>
        
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Editorial Story Text */}
          <div ref={textColRef}>
            
            <div className="badge-pill story-reveal" style={{ marginBottom: '20px' }}>
              <span className="badge-pill-dot" />
              <span>OUR STORY</span>
            </div>

            <h2
              className="story-reveal"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                marginBottom: '28px',
                textTransform: 'uppercase',
              }}
            >
              BUILT TO CREATE.{' '}
              <span style={{ color: 'var(--accent-orange)' }}>BUILT TO GROW.</span>
            </h2>

            <div
              className="story-reveal"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: '#A5A5A8',
              }}
            >
              {/* Where We Started */}
              <p>
                Shree Ram Production started with a clear realization: creative production and modern business growth were operating in two completely separate worlds.
              </p>

              {/* What We Noticed Businesses Struggle With */}
              <p>
                We noticed businesses constantly struggling with fragmented setups—hiring video production companies that lacked marketing direction, branding studios that didn't build digital tools, or performance marketers using generic assets that weakened brand identity.
              </p>

              {/* Why We Decided to Bring Multiple Capabilities Together */}
              <p>
                We decided to bring <span className="story-highlight-word">Content Production</span>, <span className="story-highlight-word">Brand Strategy</span>, <span className="story-highlight-word">Performance Growth</span>, and <span className="story-highlight-word">Technology</span> together under one roof. When these capabilities speak the same language from day one, every visual asset, campaign, and application works toward a single goal.
              </p>

              {/* What Shree Ram Production is Becoming */}
              <p style={{ color: '#F5F5F2', fontWeight: 500 }}>
                Today, Shree Ram Production is evolving into a full-cycle creative & tech partner—helping ambitious companies build presence, engage audiences, and scale with long-term clarity.
              </p>

            </div>
          </div>

          {/* Right Column: Supporting Visual Frame */}
          <div ref={imageFrameRef} className="story-image-frame" style={{ height: '520px' }}>
            <img
              src="../src/assets/logo/shreeramproduction-logo.png"
              alt="Shree Ram Production Creative Studio Session"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Subtle Gradient Overlay Accent */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 60%, rgba(8, 9, 10, 0.8) 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>

        </div>

      </div>
    </section>
  );
};
