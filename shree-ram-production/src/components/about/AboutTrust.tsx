import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Users2, ShieldCheck, Target } from 'lucide-react';
import SectionMarker from '../ui/SectionMarker';

gsap.registerPlugin(ScrollTrigger);

interface TrustPoint {
  title: string;
  desc: string;
  icon: React.ElementType;
}

const TRUST_POINTS: TrustPoint[] = [
  {
    title: 'CLEAR COMMUNICATION',
    desc: 'We keep the process understandable with total transparency and active updates.',
    icon: MessageSquare,
  },
  {
    title: 'COLLABORATIVE',
    desc: 'We work with clients, not just for them—building shared momentum at every step.',
    icon: Users2,
  },
  {
    title: 'DETAIL-DRIVEN',
    desc: 'Small details influence the final result, from frame-level edits to micro-interactions.',
    icon: ShieldCheck,
  },
  {
    title: 'BUSINESS-MINDED',
    desc: 'Creative decisions should support the business objective and long-term positioning.',
    icon: Target,
  },
];

export const AboutTrust: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const validItems = itemsRef.current.filter(Boolean);
      if (validItems.length > 0) {
        gsap.fromTo(
          validItems,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
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
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        {/* Section Header */}
        <div style={{ marginBottom: '56px' }}>
          <SectionMarker label="TRUST & WORKING STYLE" align="left" />

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.0rem, 4vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
            }}
          >
            HOW YOU EXPERIENCE WORKING WITH US
          </h2>
        </div>

        {/* 4 Trust Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}
        >
          {TRUST_POINTS.map((tp, idx) => {
            const IconComp = tp.icon;

            return (
              <div
                key={tp.title}
                ref={(el) => { itemsRef.current[idx] = el; }}
                style={{
                  backgroundColor: '#121316',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 106, 42, 0.1)',
                    border: '1px solid rgba(255, 106, 42, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FF6A2A',
                  }}
                >
                  <IconComp size={20} />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    letterSpacing: '0.02em',
                    margin: 0,
                  }}
                >
                  {tp.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#A5A5A8',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {tp.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
