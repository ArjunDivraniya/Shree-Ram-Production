import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, MessageSquare, Phone, Mail } from 'lucide-react';
import { InstagramIcon } from '../ui/InstagramIcon';
import SectionMarker from '../ui/SectionMarker';

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
      ctaText: 'Chat on WhatsApp',
      href: 'https://wa.me/919313119830?text=Hello%20Shree%20Ram%20Production%2C%20I%20would%20like%20to%20start%20a%20conversation.',
      icon: MessageSquare,
    },
    {
      num: '02',
      title: 'CALL',
      ctaText: 'Call our team',
      href: 'tel:+919313119830',
      icon: Phone,
    },
    {
      num: '03',
      title: 'EMAIL',
      ctaText: 'Send email inquiry',
      href: 'mailto:shreeramproduction.in@gmail.com?subject=Project%20Inquiry%20-%20Shree%20Ram%20Production',
      icon: Mail,
    },
    {
      num: '04',
      title: 'INSTAGRAM',
      ctaText: 'Follow on Instagram',
      href: 'https://www.instagram.com/ram_production___?stkn=NWRnYWM5YTVta3hy',
      icon: InstagramIcon,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="about-cta-section"
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
        <SectionMarker label="LET'S TALK" align="left" />

        {/* Main Heading */}
        <h2
          ref={headingRef}
          className="about-cta-heading"
        >
          <div style={{ willChange: 'transform, opacity, clip-path' }}>LET'S BUILD</div>
          <div style={{ color: '#FF6A2A', willChange: 'transform, opacity, clip-path' }}>
            SOMETHING THAT GROWS.
          </div>
        </h2>

        {/* Supporting Text */}
        <p
          ref={textRef}
          className="about-cta-subheading"
        >
          Have a project in mind, need one service, or looking for a creative partner? Let's talk.
        </p>

        {/* 4 Real Contact Options (WhatsApp, Call, Email, Instagram) */}
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
                className="about-cta-row"
                style={{
                  opacity: isSiblingHovered ? 0.35 : 1,
                }}
              >
                {/* Left Side: Number, Title & Mobile Subtext */}
                <div className="about-cta-left">
                  <span className="about-cta-num">
                    {opt.num}
                  </span>

                  <div className="about-cta-title-box">
                    <h3 className="about-cta-title">
                      {opt.title}
                    </h3>
                    <span className="about-cta-subtext-mobile">
                      {opt.ctaText}
                    </span>
                  </div>
                </div>

                {/* Right Side: Desktop CTA Text & Moving Arrow */}
                <div className="about-cta-right">
                  <span className="about-cta-text-desktop">
                    {opt.ctaText}
                  </span>

                  <ArrowUpRight
                    size={28}
                    className="about-cta-arrow"
                    color={isHovered ? '#FF6A2A' : '#A5A5A8'}
                  />
                </div>

                {/* Orange Underline Accent */}
                <div className="about-cta-line" />
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AboutCTA;
