import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, MessageSquare, Phone, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AboutCTA: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const optionsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current.children,
          { opacity: 0, y: 35, clipPath: 'inset(100% 0% 0% 0%)' },
          { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85, stagger: 0.12, ease: 'power3.out' }
        );
      }

      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );
      }

      const validOptions = optionsRef.current.filter(Boolean);
      if (validOptions.length > 0) {
        tl.fromTo(
          validOptions,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
          '-=0.4'
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
      style={{
        padding: '140px 0 120px 0',
        backgroundColor: '#08090A',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Ambient Radial Light Glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255, 106, 42, 0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(65px)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 5, maxWidth: '1100px' }}>
        
        {/* Label */}
        <div className="badge-pill" style={{ marginBottom: '24px', display: 'inline-flex' }}>
          <span className="badge-pill-dot" />
          <span>LET'S TALK</span>
        </div>

        {/* Main Heading */}
        <h2
          ref={headingRef}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5.5vw, 5.2rem)',
            fontWeight: 800,
            lineHeight: 1.04,
            textTransform: 'uppercase',
            color: '#FFFFFF',
            letterSpacing: '-0.03em',
            marginBottom: '24px',
          }}
        >
          <div style={{ willChange: 'transform, opacity, clip-path' }}>LET'S BUILD</div>
          <div style={{ color: '#FF6A2A', willChange: 'transform, opacity, clip-path' }}>
            SOMETHING THAT GROWS.
          </div>
        </h2>

        {/* Supporting Text */}
        <p
          ref={textRef}
          style={{
            fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
            color: '#F5F5F2',
            lineHeight: 1.6,
            maxWidth: '680px',
            marginBottom: '64px',
          }}
        >
          Have a project in mind, need one service, or looking for a creative partner? Let's talk.
        </p>

        {/* 3 Real Contact Options (WhatsApp, Call, Email) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
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
                  opacity: isSiblingHovered ? 0.35 : 1,
                  transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                }}
              >
                {/* Left Side: Number & Title */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '28px',
                    transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      color: isHovered ? '#FF6A2A' : '#A5A5A8',
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
                      color: isHovered ? '#FF6A2A' : '#A5A5A8',
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {opt.ctaText}
                  </span>

                  <ArrowUpRight
                    size={28}
                    color={isHovered ? '#FF6A2A' : '#A5A5A8'}
                    style={{
                      transform: isHovered ? 'translate(5px, -5px)' : 'translate(0, 0)',
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease',
                    }}
                  />
                </div>

                {/* Orange Underline Accent */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-1px',
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#FF6A2A',
                    transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left center',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isHovered ? '0 0 14px #FF6A2A' : 'none',
                  }}
                />
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AboutCTA;
