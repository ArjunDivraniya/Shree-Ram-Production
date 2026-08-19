import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, MessageSquare, Phone, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactCTAProps {
  preselectedServices?: string[];
}

export const ContactCTA: React.FC<ContactCTAProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const heading1Ref = useRef<HTMLDivElement>(null);
  const heading2Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reassuranceRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const footerNoteRef = useRef<HTMLDivElement>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      // 1. Label reveals with small upward fade
      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      }

      // 2. Main heading reveals line-by-line with smooth clip/mask animation
      if (heading1Ref.current && heading2Ref.current) {
        tl.fromTo(
          [heading1Ref.current, heading2Ref.current],
          { opacity: 0, y: 40, clipPath: 'inset(100% 0% 0% 0%)' },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          },
          '-=0.3'
        );
      }

      // 3. Supporting text & reassurance fade/slide in
      if (textRef.current && reassuranceRef.current) {
        tl.fromTo(
          [textRef.current, reassuranceRef.current],
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' },
          '-=0.4'
        );
      }

      // 4. Accent line draws across section
      if (accentLineRef.current) {
        tl.fromTo(
          accentLineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.9, ease: 'power3.inOut' },
          '-=0.3'
        );
      }

      // 5. Contact options reveal sequentially with subtle stagger
      const validOptions = optionsRef.current.filter(Boolean);
      if (validOptions.length > 0) {
        tl.fromTo(
          validOptions,
          { opacity: 0, y: 30 },
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

      // 6. Footer Note reveal
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
      href: 'https://wa.me/919876543210?text=Hello%20Shree%20Ram%20Production%2C%20I%20would%20like%20to%20discuss%20a%20project.',
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
      style={{
        padding: '140px 0 120px 0',
        backgroundColor: '#08090A',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Ambient Radial Lighting & Grain Vignette */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 45%, rgba(255, 106, 42, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 80% 80%, rgba(255, 106, 42, 0.03) 0%, transparent 40%)
          `,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 5, maxWidth: '1100px' }}>
        
        {/* TOP SECTION HEADER */}
        <div style={{ marginBottom: '56px' }}>
          
          {/* Small Label */}
          <div ref={labelRef} className="badge-pill" style={{ marginBottom: '24px', width: 'fit-content' }}>
            <span className="badge-pill-dot" />
            <span>LET'S TALK</span>
          </div>

          {/* Main Heading (Split in 2 Lines for Clip/Mask Reveal) */}
          <h2
            style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 5.2rem)',
              fontWeight: 800,
              lineHeight: 1.02,
              textTransform: 'uppercase',
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              marginBottom: '32px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            <div ref={heading1Ref} style={{ willChange: 'transform, opacity, clip-path' }}>
              LET'S BUILD SOMETHING
            </div>
            <div
              ref={heading2Ref}
              style={{
                color: 'var(--accent-orange)',
                willChange: 'transform, opacity, clip-path',
              }}
            >
              THAT GROWS.
            </div>
          </h2>

          {/* Supporting Text & Small Reassurance */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px',
              alignItems: 'baseline',
            }}
          >
            <p
              ref={textRef}
              style={{
                fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
                color: '#CBD5E1',
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
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.65)',
                fontStyle: 'italic',
                borderLeft: '2px solid var(--accent-orange)',
                paddingLeft: '16px',
              }}
            >
              “Need just one service? That's absolutely fine.”
            </div>
          </div>

        </div>

        {/* THIN ORANGE ACCENT DRAW LINE */}
        <div
          ref={accentLineRef}
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(255, 106, 42, 0.35)',
            marginBottom: '48px',
            willChange: 'transform',
          }}
        />

        {/* ====================================================================
            3 DIRECT CONTACT OPTIONS (LARGE EDITORIAL INTERACTIVE LINKS)
            ==================================================================== */}
        <div
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
                  padding: '36px 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  textDecoration: 'none',
                  position: 'relative',
                  opacity: isSiblingHovered ? 0.4 : 1,
                  transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                }}
              >
                {/* Left Side: Number, Category & Hover Accent */}
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
                      color: isHovered ? 'var(--accent-orange)' : 'var(--text-dim)',
                      letterSpacing: '0.1em',
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {opt.num}
                  </span>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.6rem, 3.2vw, 2.8rem)',
                      fontWeight: 800,
                      color: isHovered ? '#FFFFFF' : '#E2E8F0',
                      letterSpacing: '-0.01em',
                      margin: 0,
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {opt.title}
                  </h3>
                </div>

                {/* Right Side: Action Text & Moving Arrow */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transform: isHovered ? 'translate(6px, -4px)' : 'translate(0, 0)',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)',
                      fontWeight: 600,
                      color: isHovered ? 'var(--accent-orange)' : 'var(--text-muted)',
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {opt.ctaText}
                  </span>

                  <ArrowUpRight
                    size={26}
                    color={isHovered ? 'var(--accent-orange)' : '#A5A5A8'}
                    style={{
                      transform: isHovered ? 'translate(6px, -6px)' : 'translate(0, 0)',
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease',
                    }}
                  />
                </div>

                {/* Subtle Hover Orange Underline Draw Accent */}
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
                    boxShadow: isHovered ? '0 0 12px var(--accent-orange)' : 'none',
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
            letterSpacing: '0.12em',
            color: 'var(--text-dim)',
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
            padding: 24px 0 !important;
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
