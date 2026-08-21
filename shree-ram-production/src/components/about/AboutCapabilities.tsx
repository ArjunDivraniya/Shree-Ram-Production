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
  image: string;
}

const CAPABILITIES: Capability[] = [
  {
    num: '01',
    title: 'CONTENT & PRODUCTION',
    desc: 'Cinematic commercials, brand films, high-end photography & 3D motion design.',
    icon: Video,
    image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=600&q=80',
  },
  {
    num: '02',
    title: 'BRAND & CREATIVE',
    desc: 'Visual identity systems, strategy, packaging design & creative direction.',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=600&q=80',
  },
  {
    num: '03',
    title: 'MARKETING & GROWTH',
    desc: 'Paid performance acquisition, SEO engines, viral content & CRO funnels.',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
  },
  {
    num: '04',
    title: 'TECHNOLOGY & DIGITAL',
    desc: 'Custom web applications, e-commerce storefronts, interactive platforms & AI workflows.',
    icon: Code2,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
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
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
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
        padding: '120px 0',
        backgroundColor: '#08090A',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="container" style={{ maxWidth: '1180px' }}>
        
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '24px',
            marginBottom: '52px',
          }}
        >
          <div>
            <div className="badge-pill" style={{ marginBottom: '16px' }}>
              <span className="badge-pill-dot" />
              <span>CORE PILLARS</span>
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
              OUR FOUR CAPABILITIES
            </h2>
          </div>

          <button
            onClick={() => navigate('/services')}
            className="apple-glass-cta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: 'var(--radius-pill)',
              background: '#FF6A2A',
              color: '#08090A',
              fontSize: '0.85rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              transition: 'var(--transition-smooth)',
            }}
          >
            <span>EXPLORE OUR SERVICES</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Compact Grid Visual System */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {CAPABILITIES.map((cap, idx) => {
            const IconComp = cap.icon;

            return (
              <div
                key={cap.num}
                ref={(el) => { cardsRef.current[idx] = el; }}
                style={{
                  position: 'relative',
                  backgroundColor: '#121316',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  transition: 'all 0.35s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 106, 42, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Background Image Preview Accent */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '120px',
                    height: '120px',
                    opacity: 0.12,
                    maskImage: 'radial-gradient(circle at top right, black 30%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(circle at top right, black 30%, transparent 80%)',
                    pointerEvents: 'none',
                  }}
                >
                  <img src={cap.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '20px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        color: '#FF6A2A',
                      }}
                    >
                      {cap.num}
                    </span>

                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
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
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      marginBottom: '10px',
                      lineHeight: 1.25,
                    }}
                  >
                    {cap.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: '#A5A5A8',
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {cap.desc}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '24px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#68696D',
                    letterSpacing: '0.06em',
                  }}
                >
                  <span>PILLAR {cap.num}</span>
                  <span style={{ color: '#FF6A2A' }}>FULL SPEC ↗</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
