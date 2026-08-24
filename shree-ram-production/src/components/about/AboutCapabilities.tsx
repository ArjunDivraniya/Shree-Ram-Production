import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Capability {
  num: string;
  title: string;
  desc: string;
}

const CAPABILITIES: Capability[] = [
  {
    num: '01',
    title: 'CONTENT\nPRODUCTION',
    desc: 'Cinematic commercials, brand films, high-end photography & 3D motion design.',
  },
  {
    num: '02',
    title: 'BRAND\nCREATIVE',
    desc: 'Visual identity systems, strategy, packaging design & creative direction.',
  },
  {
    num: '03',
    title: 'MARKETING\nGROWTH',
    desc: 'Paid performance acquisition, SEO engines, viral content & CRO funnels.',
  },
  {
    num: '04',
    title: 'TECHNOLOGY\nDIGITAL',
    desc: 'Custom web applications, e-commerce storefronts, interactive platforms & AI workflows.',
  },
];

export const AboutCapabilities: React.FC = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const label = labelRef.current;
      const heading = headingRef.current;
      const cta = ctaRef.current;
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (reduce) {
        gsap.set([label, heading, cta].filter(Boolean), { opacity: 1, y: 0, clipPath: 'none' });
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });

      if (label) {
        tl.fromTo(label, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' });
      }
      if (heading) {
        const lines = heading.querySelectorAll<HTMLElement>('.cap-heading-line');
        if (lines.length) {
          tl.fromTo(
            lines,
            { opacity: 0, y: 32, clipPath: 'inset(100% 0% 0% 0%)' },
            { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.75, stagger: 0.1, ease: 'power3.out' },
            '-=0.2'
          );
        } else {
          tl.fromTo(heading, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');
        }
      }
      if (cta) {
        tl.fromTo(cta, { opacity: 0, y: 12, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }, '-=0.35');
      }
      if (cards.length) {
        tl.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.09,
            ease: 'power3.out',
          },
          '-=0.2'
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="capabilities-section"
      style={{
        padding: '110px 0',
        backgroundColor: '#08090A',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="container" style={{ maxWidth: '1180px' }}>
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
            <div ref={labelRef} className="badge-pill" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              <span className="badge-pill-dot" />
              <span>OUR CAPABILITIES</span>
            </div>
            <h2
              ref={headingRef}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.0rem, 4vw, 3.2rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              <span className="cap-heading-line" style={{ display: 'block', overflow: 'hidden' }}>
                FOUR CORE
              </span>
              <span className="cap-heading-line" style={{ display: 'block', overflow: 'hidden', color: '#FF6A2A' }}>
                PILLARS
              </span>
            </h2>
          </div>
          <button
            ref={ctaRef}
            onClick={() => navigate('/services')}
            className="cap-cta"
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
            }}
          >
            <span>EXPLORE SERVICES</span>
            <ArrowUpRight size={18} />
          </button>
        </div>

        <div className="pillar-grid">
          {CAPABILITIES.map((cap, idx) => {
            const isActive = hovered === idx;
            const isDimmed = hovered !== null && !isActive;
            return (
              <div
                key={cap.num}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className={`pillar-card ${isActive ? 'is-active' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
                tabIndex={0}
                aria-label={`${cap.title.replace('\n', ' ')} — ${cap.desc}`}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(idx)}
                onBlur={() => setHovered(null)}
              >
                <h3 className="pillar-card__title">
                  <span className="pillar-title-base">{cap.title}</span>
                  <span className="pillar-title-fill" aria-hidden="true">
                    {cap.title}
                  </span>
                </h3>

                <p className="pillar-card__desc">{cap.desc}</p>

                <div className="pillar-card__number" aria-hidden="true">
                  <span className="pillar-number-base">{cap.num}</span>
                  <span className="pillar-number-fill">{cap.num}</span>
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
