import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, MessageSquare, Phone, Mail } from 'lucide-react';
import SectionMarker from './ui/SectionMarker';

gsap.registerPlugin(ScrollTrigger);

export const ContactCTA: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingLine1Ref = useRef<HTMLDivElement>(null);
  const headingLine2Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const reassuranceRef = useRef<HTMLDivElement>(null);
  const primaryCtaRef = useRef<HTMLButtonElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const optionsContainerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const footerNoteRef = useRef<HTMLDivElement>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Subtle cursor follower light state
  const [mousePos, setMousePos] = useState<{ x: number; y: number; opacity: number }>({
    x: 0,
    y: 0,
    opacity: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
  };

  // Smooth scroll focus to contact options
  const scrollToContactOptions = () => {
    if (optionsContainerRef.current) {
      optionsContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      // 1. Background subtle dark transition & Let's Talk label reveal
      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      }

      // 2. Main heading reveals line-by-line using clip/mask animation
      if (headingLine1Ref.current && headingLine2Ref.current) {
        tl.fromTo(
          [headingLine1Ref.current, headingLine2Ref.current],
          { opacity: 0, y: 45, clipPath: 'inset(100% 0% 0% 0%)' },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.85,
            stagger: 0.14,
            ease: 'power3.out',
          },
          '-=0.3'
        );
      }

      // 3. Supporting text & reassurance fade upward
      if (textRef.current && reassuranceRef.current) {
        tl.fromTo(
          [textRef.current, reassuranceRef.current],
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' },
          '-=0.4'
        );
      }

      // 4. Primary CTA button reveal
      if (primaryCtaRef.current) {
        tl.fromTo(
          primaryCtaRef.current,
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.4)' },
          '-=0.3'
        );
      }

      // 5. Accent light line draws across the section
      if (accentLineRef.current) {
        tl.fromTo(
          accentLineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.9, ease: 'power3.inOut' },
          '-=0.3'
        );
      }

      // 6. Contact options reveal sequentially
      const validOptions = optionsRef.current.filter(Boolean);
      if (validOptions.length > 0) {
        tl.fromTo(
          validOptions,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.6'
        );
      }

      // 7. Closing footer note reveal
      if (footerNoteRef.current) {
        tl.fromTo(
          footerNoteRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactOptions = [
    {
      num: '01',
      title: 'WHATSAPP',
      ctaText: 'Start a conversation',
      href: 'https://wa.me/919876543210?text=Hello%20Shree%20Ram%20Production%2C%20I%20would%20like%20to%20start%20a%20conversation.',
      icon: MessageSquare,
    },
    {
      num: '02',
      title: 'CALL',
      ctaText: 'Talk to our team',
      href: 'tel:+919876543210',
      icon: Phone,
    },
    {
      num: '03',
      title: 'EMAIL',
      ctaText: 'Send your requirements',
      href: 'mailto:hello@shreeramproduction.com?subject=Project%20Inquiry%20-%20Shree%20Ram%20Production',
      icon: Mail,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: '140px 0 120px 0',
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Continuous global canvas — static radial removed, global provides ambient */}

      {/* Subtle Cursor Follower Light Halo */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: '450px',
          height: '450px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255, 106, 42, 0.08) 0%, transparent 65%)',
          opacity: mousePos.opacity,
          pointerEvents: 'none',
          zIndex: 2,
          transition: 'opacity 0.4s ease',
          filter: 'blur(40px)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 5, maxWidth: '1100px' }}>
        
        {/* TOP SECTION HEADER */}
        <div style={{ marginBottom: '48px' }}>
          
          {/* Main Label */}
          <div ref={labelRef} style={{ marginBottom: '24px' }}>
            <SectionMarker number="05" label="LET'S TALK" align="left" />
          </div>

          {/* Main Heading (Line-by-line Masked Clip Reveal) */}
          <h2
            style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 5.4rem)',
              fontWeight: 800,
              lineHeight: 1.02,
              textTransform: 'uppercase',
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              marginBottom: '32px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            <div ref={headingLine1Ref} style={{ willChange: 'transform, opacity, clip-path' }}>
              LET'S BUILD
            </div>
            <div
              ref={headingLine2Ref}
              style={{
                color: 'var(--accent-orange)',
                willChange: 'transform, opacity, clip-path',
              }}
            >
              SOMETHING THAT GROWS.
            </div>
          </h2>

          {/* Supporting Text & Reassurance Statement */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px',
              alignItems: 'baseline',
              marginBottom: '32px',
            }}
          >
            <p
              ref={textRef}
              style={{
                fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
                color: '#F5F5F2',
                lineHeight: 1.6,
                maxWidth: '680px',
                margin: 0,
                fontFamily: 'var(--font-body)',
              }}
            >
              Whether you need one specific service or a complete growth solution, start with a conversation. Tell us what you need and we'll take it from there.
            </p>

            <div
              ref={reassuranceRef}
              style={{
                fontSize: '0.98rem',
                fontWeight: 600,
                color: '#A5A5A8',
                borderLeft: '2px solid var(--accent-orange)',
                paddingLeft: '16px',
              }}
            >
              “Need just one service? That's absolutely fine.”
            </div>
          </div>

          {/* Primary CTA */}
          <button
            ref={primaryCtaRef}
            onClick={scrollToContactOptions}
            className="srp-btn srp-btn--primary"
          >
            <span>START A CONVERSATION</span>
            <span className="srp-btn__arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
          </button>

        </div>

        {/* THIN ORANGE ACCENT LIGHT DRAW LINE */}
        <div
          ref={accentLineRef}
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(255, 106, 42, 0.4)',
            marginBottom: '48px',
            willChange: 'transform',
          }}
        />

        {/* ====================================================================
            3 LARGE INTERACTIVE CONTACT OPTIONS (EDITORIAL LINKS)
            ==================================================================== */}
        <div
          ref={optionsContainerRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            marginBottom: '72px',
          }}
        >
          {contactOptions.map((opt, idx) => {
            const isHovered = hoveredIndex === idx;
            const isSiblingHovered = hoveredIndex !== null && !isHovered;

            return (
              <a
                key={opt.num}
                ref={(el) => { optionsRef.current[idx] = el; }}
                href={opt.href}
                target={opt.href.startsWith('http') ? '_blank' : '_self'}
                rel={opt.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '38px 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  textDecoration: 'none',
                  position: 'relative',
                  opacity: isSiblingHovered ? 0.35 : 1,
                  transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                }}
              >
                {/* Active Option Ambient Hover Background Highlight */}
                {isHovered && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(ellipse at center, rgba(255, 106, 42, 0.06) 0%, transparent 80%)',
                      pointerEvents: 'none',
                    }}
                  />
                )}

                {/* Left Side: Number & Title */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '28px',
                    transform: isHovered ? 'translate(8px, -2px)' : 'translate(0, 0)',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      color: isHovered ? 'var(--accent-orange)' : '#A5A5A8',
                      letterSpacing: '0.1em',
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {opt.num}
                  </span>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.7rem, 3.4vw, 3.0rem)',
                      fontWeight: 800,
                      color: isHovered ? '#FFFFFF' : '#F5F5F2',
                      letterSpacing: '-0.01em',
                      margin: 0,
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {opt.title}
                  </h3>
                </div>

                {/* Right Side: CTA Text & Moving Arrow */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transform: isHovered ? 'translate(5px, -5px)' : 'translate(0, 0)',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'clamp(0.95rem, 1.4vw, 1.25rem)',
                      fontWeight: 700,
                      color: isHovered ? 'var(--accent-orange)' : '#A5A5A8',
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {opt.ctaText}
                  </span>

                  <ArrowUpRight
                    size={28}
                    color={isHovered ? 'var(--accent-orange)' : '#A5A5A8'}
                    style={{
                      transform: isHovered ? 'translate(5px, -5px)' : 'translate(0, 0)',
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease',
                    }}
                  />
                </div>

                {/* Subtle Orange Underline Draw Accent */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-1px',
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: 'var(--accent-orange)',
                    transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left center',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isHovered ? '0 0 14px var(--accent-orange)' : 'none',
                  }}
                />
              </a>
            );
          })}
        </div>

        {/* FINAL CLOSING REASSURANCE LINE */}
        <div
          ref={footerNoteRef}
          style={{
            textAlign: 'center',
            fontSize: '0.85rem',
            fontWeight: 800,
            letterSpacing: '0.14em',
            color: '#A5A5A8',
            textTransform: 'uppercase',
          }}
        >
          NO PACKAGES. NO PRESSURE. JUST A CONVERSATION ABOUT WHAT YOU NEED.
        </div>

      </div>

      {/* MOBILE RESPONSIVE TWEAKS */}
      <style>{`
        @media (max-width: 767px) {
          #contact {
            padding: 90px 0 80px 0 !important;
          }
          #contact a {
            padding: 26px 0 !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          #contact a > div:last-child {
            align-self: flex-end !important;
          }
        }
      `}</style>
    </section>
  );
};
