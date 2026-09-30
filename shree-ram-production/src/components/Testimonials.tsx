import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TESTIMONIALS } from '../data/content';
import { Check, ArrowDown, Quote, Zap, Sparkles, Utensils, Smartphone, HeartPulse, Layers, Coffee, Star, Video } from 'lucide-react';
import SectionMarker from './ui/SectionMarker';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialsProps {
  onNavigate?: (sectionId: string) => void;
}

const renderCategoryIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Zap':
      return <Zap size={20} color="#FF6A2A" />;
    case 'Sparkles':
      return <Sparkles size={20} color="#FF6A2A" />;
    case 'Utensils':
      return <Utensils size={20} color="#FF6A2A" />;
    case 'Smartphone':
      return <Smartphone size={20} color="#FF6A2A" />;
    case 'HeartPulse':
      return <HeartPulse size={20} color="#FF6A2A" />;
    case 'Layers':
      return <Layers size={20} color="#FF6A2A" />;
    case 'Coffee':
      return <Coffee size={20} color="#FF6A2A" />;
    default:
      return <Video size={20} color="#FF6A2A" />;
  }
};

export const Testimonials: React.FC<TestimonialsProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Animated title elements for word-splitting scroll animation
  const word1Ref = useRef<HTMLHeadingElement>(null); // "CLIENT'S" -> Moves Top-Left
  const word2Ref = useRef<HTMLHeadingElement>(null); // "TESTIMONIAL" -> Moves Bottom-Right
  const orangeDotRef = useRef<HTMLDivElement>(null);
  const arrowBtnRef = useRef<HTMLDivElement>(null);
  const previewAuthorRef = useRef<HTMLDivElement>(null);

  // Direct Testimonials Stage (Fully responsive layout across all screens)
  const stageRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const authorSubRef = useRef<HTMLDivElement>(null);

  // State management
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Ultra-Smooth Slide Swap Transition
  const changeSlide = useCallback(
    (newIndex: number) => {
      if (isAnimating || newIndex === activeIndex) return;
      setIsAnimating(true);

      const targets = [
        quoteRef.current,
        authorSubRef.current,
      ].filter(Boolean);

      // Smooth Fade Out & Scale down
      gsap.to(targets, {
        opacity: 0,
        y: -12,
        scale: 0.98,
        duration: 0.25,
        stagger: 0.02,
        ease: 'power2.in',
        onComplete: () => {
          setActiveIndex(newIndex);
          // Smooth Fade In & Scale up
          gsap.fromTo(
            targets,
            { opacity: 0, y: 14, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.45,
              stagger: 0.03,
              ease: 'power3.out',
              onComplete: () => setIsAnimating(false),
            }
          );
        },
      });
    },
    [activeIndex, isAnimating]
  );

  const handleNext = useCallback(() => {
    changeSlide((activeIndex + 1) % TESTIMONIALS.length);
  }, [activeIndex, changeSlide]);

  // Check reduced motion
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);
    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Auto-play timer for seamless auto-swapping mode
  useEffect(() => {
    if (isReducedMotion) return;

    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, 5500);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isReducedMotion, handleNext]);

  // Optimized GSAP Scroll-driven Pinning (Responsive across mobile & desktop)
  useEffect(() => {
    if (isReducedMotion || !containerRef.current || !stickyRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stickyRef.current,
          pinSpacing: true,
          scrub: 0.6,
        },
      });

      // Initial state setup
      gsap.set(word1Ref.current, { xPercent: 0, yPercent: 0, scale: 1, opacity: 1 });
      gsap.set(word2Ref.current, { xPercent: 0, yPercent: 0, scale: 1, opacity: 1 });
      gsap.set(orangeDotRef.current, { opacity: 1, scale: 1 });
      gsap.set(arrowBtnRef.current, { opacity: 1, y: 0 });
      gsap.set(previewAuthorRef.current, { opacity: 1, x: 0 });
      gsap.set(stageRef.current, { opacity: 0, scale: 0.95, y: 40 });

      // Phase 1: Title words split apart on scroll
      tl.to(
        word1Ref.current,
        {
          xPercent: isMobile ? -30 : -46,
          yPercent: isMobile ? -30 : -40,
          scale: isMobile ? 0.65 : 0.5,
          opacity: 0.08,
          duration: 1.0,
          ease: 'power2.inOut',
        },
        0
      );

      tl.to(
        word2Ref.current,
        {
          xPercent: isMobile ? 30 : 48,
          yPercent: isMobile ? 32 : 44,
          scale: isMobile ? 0.65 : 0.5,
          opacity: 0.08,
          duration: 1.0,
          ease: 'power2.inOut',
        },
        0
      );

      tl.to(
        [orangeDotRef.current, arrowBtnRef.current, previewAuthorRef.current],
        { opacity: 0, duration: 0.4, ease: 'power1.out' },
        0
      );

      // Phase 2: Testimonials Stage reveals cleanly
      tl.to(
        stageRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
        },
        0.3
      );

      // Natural reading hold duration
      tl.to({}, { duration: 1.2 });

      // Phase 3: Smooth exit transition directly into the next section
      tl.to(
        stageRef.current,
        {
          opacity: 0,
          scale: 0.96,
          y: -40,
          duration: 0.8,
          ease: 'power2.in',
        },
        2.2
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  const activeItem = TESTIMONIALS[activeIndex];

  // Static Fallback for Reduced Motion
  if (isReducedMotion) {
    return (
      <section id="testimonials-static" style={{ padding: '80px 0', background: 'transparent' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <SectionMarker label="CLIENT TESTIMONIALS" align="center" />
            <h2 style={{ fontFamily: "'Bebas Neue', 'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '0.03em' }}>
              CLIENT'S <span style={{ color: '#FF6A2A' }}>TESTIMONIAL</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            {TESTIMONIALS.map((item) => (
              <div key={item.id} style={{ padding: '28px', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', border: '1px solid rgba(255, 106, 42, 0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(255, 106, 42, 0.15)', border: '1px solid rgba(255, 106, 42, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {renderCategoryIcon(item.categoryIcon)}
                    </div>
                    <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.05)', color: '#FF6A2A', fontWeight: 600 }}>
                      {item.location || 'Gujarat'}
                    </span>
                  </div>

                  <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '20px', lineHeight: 1.4, textTransform: 'uppercase' }}>
                    "{item.quote}"
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>{item.company}</h4>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>{item.role}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="#FF6A2A" color="#FF6A2A" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="testimonials"
      style={{
        position: 'relative',
        height: '200vh',
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      {/* Sticky Viewport Stage */}
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          background: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Dynamic Circular Arc Line in Background */}
        <svg
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 2,
          }}
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M -200 680 C 320 -20, 1120 -20, 1640 680"
            stroke="rgba(255, 255, 255, 0.07)"
            strokeWidth="1.5"
          />
          <path
            d="M -100 880 C 400 80, 1000 80, 1540 880"
            stroke="rgba(255, 106, 42, 0.12)"
            strokeWidth="1"
          />
          <circle cx="310" cy="180" r="6" fill="#FF6A2A" style={{ filter: 'drop-shadow(0 0 10px #FF6A2A)' }} />
          <circle cx="310" cy="180" r="12" fill="none" stroke="rgba(255, 106, 42, 0.4)" strokeWidth="1" />
        </svg>

        {/* SCROLL-DRIVEN SPLIT TITLE WORDS */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: '5vw',
          }}
        >
          {/* Word 1: "CLIENT'S" (Animates to TOP-LEFT corner on scroll) */}
          <h2
            ref={word1Ref}
            className="testimonial-split-word1"
            style={{
              fontFamily: "'Bebas Neue', 'Space Grotesk', sans-serif",
              fontSize: 'clamp(3.8rem, 11vw, 13.5rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 0.82,
              letterSpacing: '0.02em',
              margin: 0,
              textTransform: 'uppercase',
              textShadow: '0 10px 40px rgba(0,0,0,0.8)',
              willChange: 'transform, opacity',
            }}
          >
            CLIENT'S
          </h2>

          {/* Orange Accent Glowing Dot */}
          <div
            ref={orangeDotRef}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#FF6A2A',
              boxShadow: '0 0 20px #FF6A2A',
              marginLeft: '21vw',
              marginTop: '-8px',
              marginBottom: '8px',
              willChange: 'transform, opacity',
            }}
          />

          {/* Word 2: "TESTIMONIAL" (Animates to BOTTOM-RIGHT corner on scroll) */}
          <h2
            ref={word2Ref}
            className="testimonial-split-word2"
            style={{
              fontFamily: "'Bebas Neue', 'Space Grotesk', sans-serif",
              fontSize: 'clamp(3.8rem, 11vw, 13.5rem)',
              fontWeight: 900,
              color: '#FF6A2A',
              lineHeight: 0.82,
              letterSpacing: '0.02em',
              margin: 0,
              textTransform: 'uppercase',
              textShadow: '0 0 60px rgba(255, 106, 42, 0.4)',
              willChange: 'transform, opacity',
            }}
          >
            TESTIMONIAL
          </h2>
        </div>

        {/* Initial Hero Scroll Down Button */}
        <div
          ref={arrowBtnRef}
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '5vw',
            zIndex: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              color: '#08090A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(255, 255, 255, 0.3)',
              animation: 'bounce-arrow 2s infinite',
            }}
          >
            <ArrowDown size={20} strokeWidth={2.5} />
          </div>
        </div>

        {/* MAIN TESTIMONIALS DISPLAY STAGE */}
        <div
          ref={stageRef}
          className="testimonial-stage-container"
          style={{
            position: 'relative',
            zIndex: 20,
            width: '100%',
            maxWidth: '1200px',
            padding: '0 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            willChange: 'transform, opacity',
          }}
        >
          {/* MAIN TESTIMONIAL LAYOUT GRID */}
          <div
            className="testimonial-main-grid"
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '320px',
              display: 'grid',
              gridTemplateColumns: 'auto minmax(0, 1fr)',
              gap: '40px',
              alignItems: 'center',
              padding: '10px 0',
            }}
          >
            {/* LEFT SIDE: Circular Rotating Orange "TESTIMONIALS" Badge & Checkmark Badge */}
            <div
              className="testimonial-left-badges"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                flexShrink: 0,
              }}
            >
              {/* Rotating Badge */}
              <div
                className="testimonial-badge-orange"
                style={{
                  position: 'relative',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#FF6A2A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 35px rgba(255, 106, 42, 0.45)',
                  flexShrink: 0,
                }}
              >
                <svg
                  viewBox="0 0 100 100"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    animation: 'spin-badge 16s linear infinite',
                  }}
                >
                  <path
                    id="rotateRingPathClean"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text fill="#FFFFFF" fontSize="9.5" fontWeight="700" letterSpacing="2.2px">
                    <textPath href="#rotateRingPathClean" startOffset="0%">
                      TESTIMONIALS • TESTIMONIALS •
                    </textPath>
                  </text>
                </svg>

                <Quote size={20} color="#FFFFFF" style={{ fill: '#FFFFFF' }} />
              </div>

              {/* White Circle Checkmark Icon */}
              <div
                className="testimonial-badge-check"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(255, 255, 255, 0.45)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Check size={18} color="#FFFFFF" strokeWidth={2.8} />
              </div>
            </div>

            {/* CENTER BLOCK: Uppercase Quote & Author Meta */}
            <div
              className="testimonial-center-block"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <blockquote
                ref={quoteRef}
                style={{
                  fontFamily: "'Bebas Neue', 'Oswald', 'Space Grotesk', sans-serif",
                  fontSize: 'clamp(1.35rem, 2.5vw, 2.3rem)',
                  fontWeight: 600,
                  lineHeight: 1.25,
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  margin: 0,
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
                }}
              >
                "{activeItem.quote}"
              </blockquote>

              <div ref={authorSubRef} style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      marginBottom: '2px',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {activeItem.company}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#FF6A2A', fontWeight: 600, margin: 0 }}>
                    {activeItem.role} <span style={{ color: 'var(--text-dim, rgba(255, 255, 255, 0.4))' }}>•</span> {activeItem.author}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#FF6A2A" color="#FF6A2A" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Dash Pagination Pill Indicators */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '20px',
            }}
          >
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => changeSlide(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                style={{
                  height: '4px',
                  width: activeIndex === idx ? '48px' : '16px',
                  borderRadius: '4px',
                  backgroundColor: activeIndex === idx ? '#FF6A2A' : 'rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  border: 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Embedded Responsive Media Queries */}
      <style>{`
        @keyframes spin-badge {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes bounce-arrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .testimonial-stage-container {
            padding: 0 24px !important;
          }
          .testimonial-main-grid {
            gap: 24px !important;
          }
          .testimonial-badge-orange {
            width: 70px !important;
            height: 70px !important;
          }
          .testimonial-badge-check {
            width: 40px !important;
            height: 40px !important;
          }
        }

        @media (max-width: 768px) {
          .testimonial-stage-container {
            padding: 0 20px !important;
          }
          .testimonial-main-grid {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 20px !important;
            min-height: auto !important;
          }
          .testimonial-left-badges {
            justify-content: center !important;
          }
        }

        @media (max-width: 480px) {
          .testimonial-badge-orange {
            width: 60px !important;
            height: 60px !important;
          }
          .testimonial-badge-check {
            width: 36px !important;
            height: 36px !important;
          }
          blockquote {
            font-size: 1.15rem !important;
            line-height: 1.3 !important;
          }
        }
      `}</style>
    </section>
  );
};
