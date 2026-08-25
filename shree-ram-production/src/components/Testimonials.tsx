import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TESTIMONIALS } from '../data/content';
import { Check, ArrowDown, Quote } from 'lucide-react';
import SectionMarker from './ui/SectionMarker';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialsProps {
  onNavigate?: (sectionId: string) => void;
}

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
  const authorHeaderRef = useRef<HTMLSpanElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);

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
        authorHeaderRef.current,
        imageCardRef.current,
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            {TESTIMONIALS.map((item) => (
              <div key={item.id} style={{ padding: '28px', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: '16px' }}>
                <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '20px', lineHeight: 1.35, textTransform: 'uppercase' }}>
                  "{item.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img src={item.avatar} alt={item.author} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{item.author}</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{item.role} • {item.company}</p>
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
        {/* Subtle Background Radial Glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '15%',
            left: '25%',
            width: '650px',
            height: '650px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 106, 42, 0.05) 0%, transparent 70%)',
            filter: 'blur(140px)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

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

        {/* ====================================================================
            SCROLL-DRIVEN SPLIT TITLE WORDS (CLIENT'S Top-Left / TESTIMONIAL Bottom-Right)
            ==================================================================== */}
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
          <h1
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
          </h1>

          {/* Orange Accent Glowing Dot sitting right above TESTIMONIAL */}
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
          <h1
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
          </h1>
        </div>

        {/* Initial Hero Preview Author Name */}
        <div
          ref={previewAuthorRef}
          className="testimonial-preview-author"
          style={{
            position: 'absolute',
            top: '80px',
            right: '18%',
            zIndex: 6,
            fontFamily: "'Oswald', sans-serif",
            fontSize: '1rem',
            color: '#FFFFFF',
            fontWeight: 500,
            letterSpacing: '0.05em',
            pointerEvents: 'none',
          }}
        >
          Charlie Heaton
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

        {/* ====================================================================
            MAIN TESTIMONIALS DISPLAY STAGE (RESPONSIVE WRAPPER)
            ==================================================================== */}
        <div
          ref={stageRef}
          className="testimonial-stage-container"
          style={{
            position: 'relative',
            zIndex: 20,
            width: '100%',
            maxWidth: '1360px',
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
              minHeight: '360px',
              display: 'grid',
              gridTemplateColumns: 'auto minmax(0, 1fr) auto',
              gap: '36px',
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
                paddingRight: '8px',
              }}
            >
              <blockquote
                ref={quoteRef}
                style={{
                  fontFamily: "'Bebas Neue', 'Oswald', 'Space Grotesk', sans-serif",
                  fontSize: 'clamp(1.25rem, 2.2vw, 2.0rem)',
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

              <div ref={authorSubRef} style={{ marginTop: '20px' }}>
                <h3
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    marginBottom: '2px',
                    letterSpacing: '0.02em',
                  }}
                >
                  {activeItem.author}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#FF6A2A', fontWeight: 600 }}>
                  {activeItem.role} <span style={{ color: 'var(--text-dim)' }}>•</span> {activeItem.company}
                </p>
              </div>
            </div>

            {/* RIGHT BLOCK: Author Header & Pure Client Portrait Photo Card */}
            <div
              className="testimonial-right-photo"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '10px',
                flexShrink: 0,
              }}
            >
              <span
                ref={authorHeaderRef}
                className="testimonial-photo-author-label"
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  letterSpacing: '0.04em',
                }}
              >
                {activeItem.author}
              </span>

              <div
                ref={imageCardRef}
                className="testimonial-portrait-card"
                style={{
                  position: 'relative',
                  width: '240px',
                  height: '280px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <img
                  src={activeItem.image}
                  alt={activeItem.author}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                  }}
                />
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
              marginTop: '10px',
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
          .testimonial-portrait-card {
            width: 200px !important;
            height: 240px !important;
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
          .testimonial-center-block {
            padding-right: 0 !important;
          }
          .testimonial-right-photo {
            align-items: center !important;
          }
          .testimonial-photo-author-label {
            display: none !important;
          }
          .testimonial-portrait-card {
            width: 100% !important;
            max-width: 260px !important;
            height: 240px !important;
          }
          .testimonial-preview-author {
            right: 8% !important;
            top: 40px !important;
            font-size: 0.9rem !important;
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
