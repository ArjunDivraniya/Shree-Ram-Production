import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Target, Layers, Zap, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AgencyPhilosophyProps {
  onNavigate: (sectionId: string) => void;
}

export const AgencyPhilosophy: React.FC<AgencyPhilosophyProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );
  // Reduced Motion Check
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);
    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // GSAP stacked-to-separate animation with full reverse behavior
  useEffect(() => {
    if (isReducedMotion || !sectionRef.current || !cardsWrapperRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 900px)').matches;
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean) as HTMLDivElement[];

      gsap.set('.philosophy-heading-reveal', { opacity: 0, y: 18 });
      gsap.set('.philosophy-card-accent', { scaleX: 0, opacity: 0.6, transformOrigin: '0% 50%' });
      gsap.set('.philosophy-reveal', { opacity: 0, y: 12 });

      if (isMobile) {
        cards.forEach((card, index) => {
          gsap.set(card, {
            x: 0,
            y: 20 + index * 6,
            rotation: index === 1 ? 0.6 : index === 2 ? 1 : -0.6,
            scale: 0.985,
            opacity: 0,
            zIndex: 4 - index,
          });
        });
      } else {
        gsap.set(card1Ref.current, {
          x: 92,
          y: 20,
          rotation: -2.2,
          scale: 0.98,
          opacity: 0.9,
          zIndex: 3,
        });

        gsap.set(card2Ref.current, {
          x: 0,
          y: 8,
          rotation: 0.7,
          scale: 0.965,
          opacity: 0.86,
          zIndex: 2,
        });

        gsap.set(card3Ref.current, {
          x: -96,
          y: 22,
          rotation: 2.1,
          scale: 0.95,
          opacity: 0.82,
          zIndex: 1,
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 92%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        },
      });

      tl.to('.philosophy-heading-reveal', {
        opacity: 1,
        y: 0,
        duration: 0.62,
        stagger: 0.08,
        ease: 'power3.out',
      });

      tl.to(
        cards,
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: isMobile ? 0.78 : 0.95,
          stagger: isMobile ? 0.1 : 0.12,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        },
        '-=0.26'
      );

      tl.to(
        '.philosophy-card-accent',
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        },
        '-=0.7'
      );

      cards.forEach((card, index) => {
        const revealItems = card.querySelectorAll('.philosophy-reveal');
        tl.to(
          revealItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.44,
            stagger: 0.07,
            ease: 'power2.out',
          },
          `-=${0.6 - index * 0.06}`
        );
      });

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.48, ease: 'power2.out' },
        '-=0.24'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  const singleCapabilities = [
    'Photography',
    'Video Production',
    'SEO',
    'Website',
    'Branding',
  ];

  const synergyPairs = [
    { title: 'Content + Marketing', desc: 'Cinematic campaigns paired with paid reach' },
    { title: 'Branding + Website', desc: 'Identity translated into high-converting web UX' },
    { title: 'SEO + Lead Generation', desc: 'Search visibility connected to qualified pipeline' },
  ];

  const growthPillars = [
    { title: 'Content' },
    { title: 'Brand' },
    { title: 'Growth' },
    { title: 'Technology' },
  ];

  return (
    <section
      ref={sectionRef}
      id="brand-statement"
      className="philosophy-section"
      style={{
        padding: '88px 0 104px',
        background: 'transparent',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <div aria-hidden="true" className="philosophy-bg-shell" />
      <div aria-hidden="true" className="philosophy-bg-spotlight" />
      <div aria-hidden="true" className="philosophy-bg-ambient philosophy-bg-ambient-left" />
      <div aria-hidden="true" className="philosophy-bg-ambient philosophy-bg-ambient-right" />
      <div aria-hidden="true" className="philosophy-bg-grid" />
      <div aria-hidden="true" className="philosophy-bg-vignette" />

      {/* Subtle Ambient Radial Glow in Background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255, 106, 42, 0.07) 0%, transparent 70%)',
          filter: 'blur(130px)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="container philosophy-shell"
        style={{ position: 'relative', zIndex: 10, maxWidth: 'min(100%, 1440px)' }}
      >
        
        {/* SECTION HEADER */}
        <div
          ref={headerRef}
          style={{
            maxWidth: 'min(800px, 100%)',
            margin: '0 auto clamp(40px, 6vw, 64px) auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'clamp(12px, 1.5vw, 16px)',
            padding: '0 clamp(12px, 2vw, 24px)',
          }}
        >
          {/* Badge Pill */}
          <div
            className="philosophy-heading-reveal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '20px',
              background: 'rgba(255, 106, 42, 0.08)',
              border: '1px solid rgba(255, 106, 42, 0.25)',
              color: '#FF6A2A',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#FF6A2A',
                boxShadow: '0 0 8px #FF6A2A',
              }}
            />
            <span>OUR AGENCY PHILOSOPHY</span>
          </div>

          {/* Main Heading */}
          <h2
            className="philosophy-heading-reveal"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            Start where you need us.{' '}
            <span
              style={{
                color: 'transparent',
                backgroundImage: 'linear-gradient(135deg, #FFFFFF 20%, #FF6A2A 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              Grow when you're ready.
            </span>
          </h2>

          <p
            className="philosophy-heading-reveal"
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              color: '#A5A5A8',
              lineHeight: 1.5,
              maxWidth: '660px',
              margin: 0,
            }}
          >
            From a single dedicated service to a complete business-growth partnership, we adapt our capabilities around what your business needs.
          </p>
        </div>

        {/* =========================================================================
            DECK OF CARDS CONTAINER: Smoothly unfolds from overlapping stack to 3 columns
            ========================================================================= */}
        <div
          ref={cardsWrapperRef}
          className="philosophy-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.86fr) minmax(0, 1fr) minmax(0, 1.12fr)',
            gap: 'clamp(16px, 2vw, 24px)',
            alignItems: 'start',
            marginBottom: 'clamp(40px, 6vw, 64px)',
            position: 'relative',
            padding: '0 clamp(12px, 2vw, 24px)',
          }}
        >
          {/* =========================================================================
              CARD 01 — SINGLE SERVICE FOCUS
              ========================================================================= */}
          <div
            ref={card1Ref}
            className="philosophy-card philosophy-card-step-1"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              padding: 'clamp(22px, 2vw, 28px) clamp(18px, 1.8vw, 24px)',
              borderRadius: '18px',
              background: 'linear-gradient(160deg, rgba(19, 20, 24, 0.95) 0%, rgba(13, 14, 18, 1) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              boxShadow: '0 14px 28px rgba(0, 0, 0, 0.45)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
              overflow: 'hidden',
              willChange: 'transform, opacity',
            }}
          >
            {/* Top Accent Glow Line */}
            <div
              className="philosophy-card-accent"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, rgba(255, 106, 42, 0.2) 0%, #FF6A2A 48%, rgba(255, 106, 42, 0.15) 100%)',
              }}
            />

            <div className="philosophy-card-main">
              {/* Stage Badge Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                }}
              >
                <span
                  className="philosophy-reveal"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: '#FF6A2A',
                    lineHeight: 1,
                  }}
                >
                  01
                </span>
                <div
                  className="philosophy-reveal philosophy-icon-wrap"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '9px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FF6A2A',
                  }}
                >
                  <Target size={18} />
                </div>
              </div>

              {/* Title & Tagline */}
              <h3
                className="philosophy-reveal"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.42rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  lineHeight: 1.2,
                }}
              >
                Single Service Focus
              </h3>
              <p
                className="philosophy-reveal"
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#FF6A2A',
                  marginBottom: '14px',
                }}
              >
                Precision execution for specific needs.
              </p>

              <p
                className="philosophy-reveal"
                style={{
                  fontSize: '0.88rem',
                  color: '#A5A5A8',
                  lineHeight: 1.55,
                  marginBottom: '16px',
                }}
              >
                A focused squad for one mission, with rapid execution and zero overhead.
              </p>

              {/* Capability Chips */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                {singleCapabilities.map((cap) => (
                  <span
                    key={cap}
                    className="philosophy-reveal"
                    style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: '#F5F5F2',
                    }}
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Status Marker */}
            <div
              className="philosophy-card-footer philosophy-reveal"
              style={{
                marginTop: '20px',
                paddingTop: '14px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                color: '#A5A5A8',
              }}
            >
              <span>Targeted Deliverable</span>
              <span style={{ color: '#FF6A2A', fontWeight: 600 }}>100% Focused</span>
            </div>
          </div>

          {/* =========================================================================
              CARD 02 — MULTI-SERVICE SYNERGY
              ========================================================================= */}
          <div
            ref={card2Ref}
            className="philosophy-card philosophy-card-step-2"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              padding: 'clamp(24px, 2.1vw, 30px) clamp(18px, 1.8vw, 26px)',
              borderRadius: '18px',
              background: 'linear-gradient(160deg, rgba(19, 20, 25, 0.98) 0%, rgba(14, 15, 20, 1) 100%)',
              border: '1px solid rgba(255, 106, 42, 0.24)',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.48)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
              overflow: 'hidden',
              willChange: 'transform, opacity',
            }}
          >
            {/* Top Accent Orange Glow Line */}
            <div
              className="philosophy-card-accent"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, rgba(255, 106, 42, 0.15) 0%, #FF6A2A 52%, rgba(255, 106, 42, 0.15) 100%)',
              }}
            />

            <div className="philosophy-card-main">
              {/* Stage Badge Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                }}
              >
                <span
                  className="philosophy-reveal"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '2.15rem',
                    fontWeight: 800,
                    color: '#FF6A2A',
                    lineHeight: 1,
                  }}
                >
                  02
                </span>
                <div
                  className="philosophy-reveal philosophy-icon-wrap"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '9px',
                    backgroundColor: 'rgba(255, 106, 42, 0.1)',
                    border: '1px solid rgba(255, 106, 42, 0.28)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FF6A2A',
                  }}
                >
                  <Layers size={18} />
                </div>
              </div>

              {/* Title & Tagline */}
              <h3
                className="philosophy-reveal"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.52rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  lineHeight: 1.2,
                }}
              >
                Multi-Service Synergy
              </h3>
              <p
                className="philosophy-reveal"
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: '#FF6A2A',
                  marginBottom: '14px',
                }}
              >
                Bring the right capabilities together.
              </p>

              <p
                className="philosophy-reveal"
                style={{
                  fontSize: '0.89rem',
                  color: '#A5A5A8',
                  lineHeight: 1.55,
                  marginBottom: '16px',
                }}
              >
                Link the right capabilities in one workflow so brand, media, and growth move together.
              </p>

              {/* Synergy Pairings List */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {synergyPairs.map((pair) => (
                  <div
                    key={pair.title}
                    className="philosophy-reveal"
                    style={{
                      padding: '9px 12px',
                      borderRadius: '11px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.09)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        marginBottom: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{pair.title}</span>
                      <span style={{ color: '#FF6A2A', fontSize: '0.75rem' }}>+</span>
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#A5A5A8' }}>{pair.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Status Marker */}
            <div
              className="philosophy-card-footer philosophy-reveal"
              style={{
                marginTop: '22px',
                paddingTop: '14px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                color: '#A5A5A8',
              }}
            >
              <span>Cross-Pillar Alignment</span>
              <span style={{ color: '#FF6A2A', fontWeight: 600 }}>Combined Impact</span>
            </div>
          </div>

          {/* =========================================================================
              CARD 03 — COMPLETE GROWTH PARTNER
              ========================================================================= */}
          <div
            ref={card3Ref}
            className="philosophy-card philosophy-card-step-3"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              padding: 'clamp(26px, 2.3vw, 34px) clamp(18px, 1.8vw, 28px)',
              borderRadius: '18px',
              background: 'linear-gradient(150deg, rgba(20, 22, 28, 1) 0%, rgba(13, 14, 18, 1) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              boxShadow: '0 18px 36px rgba(0, 0, 0, 0.54)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
              overflow: 'hidden',
              willChange: 'transform, opacity',
            }}
          >
            {/* Top Specular Gradient Line */}
            <div
              className="philosophy-card-accent"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, rgba(255, 106, 42, 0.2) 0%, #FF6A2A 48%, rgba(255, 255, 255, 0.5) 100%)',
              }}
            />

            <div className="philosophy-card-main">
              {/* Stage Badge Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                }}
              >
                <span
                  className="philosophy-reveal"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '2.3rem',
                    fontWeight: 800,
                    color: '#FF6A2A',
                    lineHeight: 1,
                  }}
                >
                  03
                </span>
                <div
                  className="philosophy-reveal philosophy-icon-wrap"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 106, 42, 0.14)',
                    border: '1px solid #FF6A2A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    boxShadow: '0 0 0 1px rgba(255, 106, 42, 0.2)',
                  }}
                >
                  <Zap size={18} />
                </div>
              </div>

              {/* Title & Tagline */}
              <h3
                className="philosophy-reveal"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.62rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  lineHeight: 1.2,
                }}
              >
                Complete Growth Partner
              </h3>
              <p
                className="philosophy-reveal"
                style={{
                  fontSize: '0.93rem',
                  fontWeight: 600,
                  color: '#FF6A2A',
                  marginBottom: '14px',
                }}
              >
                One partner across your growth journey.
              </p>

              <p
                className="philosophy-reveal"
                style={{
                  fontSize: '0.9rem',
                  color: '#A5A5A8',
                  lineHeight: 1.56,
                  marginBottom: '18px',
                }}
              >
                We integrate content, brand, growth, and technology into one measurable operating system.
              </p>

              {/* Integrated Ecosystem Pillars Diagram Box */}
              <div
                className="philosophy-reveal"
                style={{
                  padding: '14px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(255, 106, 42, 0.06)',
                  border: '1px solid rgba(255, 106, 42, 0.2)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                }}
              >
                {growthPillars.map((p) => (
                  <div key={p.title} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#FF6A2A" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFFFFF' }}>{p.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Status Marker */}
            <div
              className="philosophy-card-footer philosophy-reveal"
              style={{
                marginTop: '24px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                color: '#A5A5A8',
              }}
            >
              <span>Embedded Team</span>
              <span style={{ color: '#FF6A2A', fontWeight: 700 }}>Full Growth Engine</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            FINAL CTA SECTION (REVEALED BELOW CARDS)
            ========================================================================= */}
        <div
          ref={ctaRef}
          style={{
            maxWidth: 'min(900px, 100%)',
            margin: '0 auto',
            padding: 'clamp(24px, 3vw, 40px) clamp(18px, 2.6vw, 36px)',
            borderRadius: 'clamp(18px, 2.5vw, 24px)',
            background: 'linear-gradient(135deg, rgba(255, 106, 42, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)',
            border: '1px solid rgba(255, 106, 42, 0.3)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          <div style={{ maxWidth: '520px' }}>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '8px',
              }}
            >
              You choose where the journey begins.
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#A5A5A8', margin: 0, lineHeight: 1.5 }}>
              Start with what you need today. Bring us in for more when your business is ready.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            <button
              onClick={() => onNavigate('calculator')}
              className="srp-btn srp-btn--primary"
            >
              <span>START WITH ONE SERVICE</span>
              <span className="srp-btn__arrow" aria-hidden="true"><ArrowUpRight size={17} /></span>
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="srp-btn srp-btn--secondary"
            >
              <span>TALK TO OUR TEAM</span>
              <span className="srp-btn__arrow" aria-hidden="true"><ArrowUpRight size={17} /></span>
            </button>
          </div>
        </div>

      </div>

      {/* EMBEDDED CSS STYLES FOR HOVER & RESPONSIVENESS */}
      <style>{`
        .philosophy-section {
          isolation: isolate;
          background: transparent;
        }

        .philosophy-shell {
          width: 100%;
          padding: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          overflow: visible;
        }

        .philosophy-bg-shell,
        .philosophy-bg-spotlight,
        .philosophy-bg-ambient,
        .philosophy-bg-grid,
        .philosophy-bg-vignette,
        .philosophy-bg-ambient {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .philosophy-bg-shell {
          background:
            radial-gradient(1200px 620px at 50% -10%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.015) 38%, rgba(255, 255, 255, 0) 72%),
            radial-gradient(980px 540px at 50% 112%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 76%);
          z-index: 1;
        }

        .philosophy-bg-spotlight {
          background:
            radial-gradient(700px 360px at 50% 24%, rgba(255, 106, 42, 0.16) 0%, rgba(255, 106, 42, 0.06) 34%, rgba(255, 106, 42, 0) 74%),
            radial-gradient(980px 520px at 50% 20%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 78%);
          z-index: 2;
          opacity: 0.92;
        }

        .philosophy-bg-ambient {
          filter: blur(96px);
          z-index: 1;
          opacity: 0.42;
        }

        .philosophy-bg-ambient-left {
          width: 460px;
          height: 460px;
          left: -180px;
          top: 16%;
          right: auto;
          bottom: auto;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 72%);
        }

        .philosophy-bg-ambient-right {
          width: 520px;
          height: 520px;
          right: -220px;
          top: 36%;
          left: auto;
          bottom: auto;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 106, 42, 0.22) 0%, rgba(255, 106, 42, 0) 74%);
        }

        .philosophy-bg-grid {
          z-index: 3;
          opacity: 0.18;
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 88px 88px;
          mask-image: radial-gradient(120% 90% at 50% 45%, rgba(0, 0, 0, 0.75) 24%, rgba(0, 0, 0, 0.22) 62%, transparent 100%);
          -webkit-mask-image: radial-gradient(120% 90% at 50% 45%, rgba(0, 0, 0, 0.75) 24%, rgba(0, 0, 0, 0.22) 62%, transparent 100%);
        }

        .philosophy-bg-vignette {
          background:
            radial-gradient(120% 100% at 50% 46%, rgba(6, 7, 9, 0) 34%, rgba(6, 7, 9, 0.62) 100%),
            linear-gradient(180deg, rgba(6, 7, 9, 0) 0%, rgba(6, 7, 9, 0.1) 100%);
          z-index: 4;
        }

        .philosophy-section .container {
          z-index: 10;
          max-width: min(100%, 1440px);
          padding-left: 0;
          padding-right: 0;
        }

        .philosophy-card {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          translate: 0 0;
          transition: translate 0.32s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.28s ease, box-shadow 0.32s ease, opacity 0.32s ease, filter 0.32s ease;
        }

        .philosophy-card-main {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .philosophy-card-step-1 {
          --card-emphasis: 0.98;
        }

        .philosophy-card-step-2 {
          --card-emphasis: 1;
        }

        .philosophy-card-step-3 {
          --card-emphasis: 1.03;
        }

        .philosophy-card-step-1,
        .philosophy-card-step-2,
        .philosophy-card-step-3 {
          min-width: 0;
        }

        .philosophy-icon-wrap {
          transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.25s ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .philosophy-cards-grid:hover .philosophy-card {
            opacity: 0.9;
            filter: saturate(0.92);
          }

          .philosophy-card:hover {
            translate: 0 -6px;
            opacity: 1 !important;
            filter: none !important;
            border-color: rgba(255, 106, 42, 0.42) !important;
            box-shadow: 0 18px 32px rgba(0, 0, 0, 0.56), 0 6px 16px rgba(255, 106, 42, 0.12) !important;
          }

          .philosophy-card:hover .philosophy-icon-wrap {
            transform: scale(1.02);
            border-color: rgba(255, 106, 42, 0.5) !important;
          }
        }

        .philosophy-cta-primary:hover {
          background-color: #FF8249 !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(255, 106, 42, 0.45) !important;
        }

        .philosophy-cta-secondary:hover {
          background-color: rgba(255, 255, 255, 0.12) !important;
          border-color: #FFFFFF !important;
          transform: translateY(-2px);
        }

        /* Tablet Breakpoint */
        @media (max-width: 1200px) {
          .philosophy-cards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 20px !important;
          }

          .philosophy-card-step-1,
          .philosophy-card-step-2 {
            grid-column: auto;
          }

          .philosophy-card-step-3 {
            grid-column: 1 / -1;
          }

          .philosophy-card-step-1,
          .philosophy-card-step-2,
          .philosophy-card-step-3 {
            height: auto;
          }

          .philosophy-card-footer {
            font-size: 0.76rem;
          }
        }

        /* Mobile Breakpoint (< 900px) */
        @media (max-width: 900px) {
          .philosophy-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 0 12px;
          }

          .philosophy-bg-grid {
            opacity: 0.15;
            background-size: 56px 56px;
          }

          .philosophy-bg-ambient {
            filter: blur(66px);
            opacity: 0.28;
          }

          .philosophy-bg-ambient-left {
            width: 300px;
            height: 300px;
            left: -140px;
            top: 12%;
          }

          .philosophy-bg-ambient-right {
            width: 320px;
            height: 320px;
            right: -135px;
            top: 58%;
          }

          .philosophy-card {
            translate: 0 0 !important;
          }

          .philosophy-card-step-1,
          .philosophy-card-step-2,
          .philosophy-card-step-3 {
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .philosophy-section {
            padding: 72px 0 88px !important;
          }

          .philosophy-cards-grid {
            gap: 12px !important;
          }

          .philosophy-heading-reveal {
            width: 100%;
          }

          .philosophy-card h3 {
            line-height: 1.15 !important;
          }

          .philosophy-card {
            padding: 20px 16px !important;
            border-radius: 14px !important;
          }

          .philosophy-cta-primary,
          .philosophy-cta-secondary {
            width: 100%;
            justify-content: center;
          }

          .philosophy-card h3 {
            font-size: 1.3rem !important;
          }

          .philosophy-card-footer {
            font-size: 0.75rem !important;
            margin-top: 18px !important;
          }

          .philosophy-card-main > div:first-child {
            margin-bottom: 18px !important;
          }

          .philosophy-card .philosophy-reveal,
          .philosophy-card p,
          .philosophy-card span {
            word-break: break-word;
          }
        }

        @media (max-width: 430px) {
          .philosophy-card-step-3 > .philosophy-card-main > div:last-child {
            grid-template-columns: 1fr !important;
          }

          .philosophy-card h3 {
            font-size: 1.18rem !important;
          }

          .philosophy-card-step-1,
          .philosophy-card-step-2,
          .philosophy-card-step-3 {
            box-shadow: 0 12px 22px rgba(0, 0, 0, 0.42) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AgencyPhilosophy;
