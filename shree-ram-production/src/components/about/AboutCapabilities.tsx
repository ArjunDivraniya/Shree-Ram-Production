import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Video, Palette, TrendingUp, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Capability {
  num: string;
  title: string;
  desc: string;
  icon: React.ElementType;
}

const CAPABILITIES: Capability[] = [
  {
    num: '01',
    title: 'CONTENT & PRODUCTION',
    desc: 'Cinematic commercials, brand films, high-end photography & 3D motion design.',
    icon: Video,
  },
  {
    num: '02',
    title: 'BRAND & CREATIVE',
    desc: 'Visual identity systems, strategy, packaging design & creative direction.',
    icon: Palette,
  },
  {
    num: '03',
    title: 'MARKETING & GROWTH',
    desc: 'Paid performance acquisition, SEO engines, viral content & CRO funnels.',
    icon: TrendingUp,
  },
  {
    num: '04',
    title: 'TECHNOLOGY & DIGITAL',
    desc: 'Custom web applications, e-commerce storefronts, interactive platforms & AI workflows.',
    icon: Code2,
  },
];

export const AboutCapabilities: React.FC = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '110px 0',
        backgroundColor: '#08090A',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="container" style={{ maxWidth: '1180px' }}>
        
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          <div>
            <div className="badge-pill" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              <span className="badge-pill-dot" />
              <span>OUR CAPABILITIES</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.0rem, 4vw, 3.2rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                textTransform: 'uppercase',
              }}
            >
              FOUR CORE PILLARS
            </h2>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/services')}
            className="apple-glass-cta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              borderRadius: '999px',
              background: '#FF6A2A',
              color: '#08090A',
              fontSize: '0.88rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 106, 42, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span>EXPLORE SERVICES</span>
            <ArrowUpRight size={18} />
          </button>
        </div>

        {/* Compact Connected Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          {CAPABILITIES.map((cap, idx) => {
            const IconComp = cap.icon;

            return (
              <div
                key={cap.num}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className="capability-card"
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '24px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: '#FF6A2A',
                      }}
                    >
                      {cap.num}
                    </span>

                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255, 106, 42, 0.08)',
                        border: '1px solid rgba(255, 106, 42, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FF6A2A',
                      }}
                    >
                      <IconComp size={18} />
                    </div>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      marginBottom: '12px',
                      lineHeight: 1.2,
                    }}
                  >
                    {cap.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: '#A5A5A8',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {cap.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AboutCapabilities;
