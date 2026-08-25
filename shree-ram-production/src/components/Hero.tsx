import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { HERO_STATS } from '../data/content';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  // Animated display values for count-up
  const [displayValues, setDisplayValues] = useState<string[]>(() =>
    HERO_STATS.map((s) => s.value)
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

    if (prefersReduced) {
      setVisible(true);
      setDisplayValues(HERO_STATS.map((s) => s.value));
      return;
    }

    // Trigger entrance stagger
    const visTimer = window.setTimeout(() => setVisible(true), 80);

    const targets = HERO_STATS.map((s) => {
      if (s.value === '∞') return null;
      const n = parseInt(s.value.replace(/\D/g, ''), 10);
      return Number.isNaN(n) ? null : n;
    });

    // Initialise display at 00 / 0+ so count is visible from start
    setDisplayValues(
      HERO_STATS.map((s, i) => {
        if (s.value === '∞') return '∞';
        const t = targets[i];
        if (t === null) return s.value;
        const suffix = s.value.includes('+') ? '+' : '';
        if (s.value.padStart(2, '0').startsWith('0')) return `00${suffix}`;
        return `0${suffix}`;
      })
    );

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const duration = 720;
    const rafIds: number[] = [];
    const timeouts: number[] = [];

    targets.forEach((target, idx) => {
      if (target === null) return;
      const suffix = HERO_STATS[idx].value.includes('+') ? '+' : '';
      const needsPad = HERO_STATS[idx].value.length === 2 && !suffix;
      const delay = idx * 120;

      const timeout = window.setTimeout(() => {
        const start = performance.now();
        const step = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutCubic(progress);
          const current = Math.round(eased * target);
          const formatted = needsPad
            ? String(current).padStart(2, '0') + suffix
            : String(current) + suffix;
          setDisplayValues((prev) => {
            const next = [...prev];
            next[idx] = formatted;
            return next;
          });
          if (progress < 1) {
            const id = requestAnimationFrame(step);
            rafIds.push(id);
          } else {
            setDisplayValues((prev) => {
              const next = [...prev];
              next[idx] = HERO_STATS[idx].value;
              return next;
            });
          }
        };
        const id = requestAnimationFrame(step);
        rafIds.push(id);
      }, delay);
      timeouts.push(timeout);
    });

    return () => {
      clearTimeout(visTimer);
      timeouts.forEach(clearTimeout);
      rafIds.forEach(cancelAnimationFrame);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '120px',
        paddingBottom: '60px',
        overflow: 'hidden',
        background: '#08090A',
      }}
    >
      {/* Background Cinematic Visual / Ambient Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.22,
          filter: 'contrast(1.1) brightness(0.8)',
          zIndex: 1,
        }}
      />

      {/* Dark Studio Gradient Overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 40%, rgba(255, 106, 42, 0.08) 0%, rgba(8, 9, 10, 0.7) 50%, rgba(8, 9, 10, 0.98) 100%)',
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '240px',
          background: 'linear-gradient(to top, #08090A 0%, transparent 100%)',
          zIndex: 3,
        }}
      />

      {/* Animated Subtle Line Grid Accent */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Hero Content Container */}
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>

          {/* Main Statement Heading */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.75rem)',
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              marginBottom: '24px',
              textTransform: 'uppercase',
            }}
          >
            Everything Your Business Needs To{' '}
            <span
              style={{
                color: 'transparent',
                backgroundImage: 'linear-gradient(135deg, #FFFFFF 30%, var(--accent-orange) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              Grow.
            </span>
          </h1>

          {/* Supporting Position Statement */}
          <p
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              color: 'var(--text-muted)',
              maxWidth: '720px',
              fontWeight: 400,
              lineHeight: 1.5,
              marginBottom: '40px',
            }}
          >
            <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>Content. Brand. Growth. Technology.</strong>{' '}
            One flexible studio partner providing targeted creative execution, high-converting performance marketing, and next-gen digital builds.
          </p>

          {/* Call-to-Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '64px',
            }}
          >
            <button
              onClick={() => onNavigate('contact')}
              data-cursor="START ↗"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 36px',
                borderRadius: 'var(--radius-btn)',
                background: 'var(--accent-orange)',
                color: '#FFFFFF',
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                boxShadow: '0 8px 32px var(--accent-orange-glow)',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent-orange-hover)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--accent-orange)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={20} />
            </button>

            <button
              onClick={() => onNavigate('portfolio')}
              data-cursor="WORK ↓"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 28px',
                borderRadius: 'var(--radius-btn)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border-bright)',
                color: '#FFFFFF',
                fontSize: '1rem',
                fontWeight: 500,
                backdropFilter: 'blur(8px)',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'var(--glass-border-bright)';
              }}
            >
              <span>EXPLORE OUR WORK</span>
              <ArrowDown size={18} />
            </button>
          </div>

          {/* Capability Metrics Strip — truthful brand facts */}
          <div
            className="glass-panel"
            style={{
              padding: '24px 32px',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px',
              borderColor: 'rgba(255, 255, 255, 0.12)',
            }}
          >
            {HERO_STATS.map((stat, idx) => {
              const isInfinity = stat.value === '∞';
              const display = displayValues[idx] ?? stat.value;
              return (
                <div
                  key={stat.label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    borderLeft: idx !== 0 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                    paddingLeft: idx !== 0 ? '20px' : '0',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(8px)',
                    transition: `opacity 420ms var(--ease-out-expo) ${idx * 90}ms, transform 420ms var(--ease-out-expo) ${idx * 90}ms`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.9rem, 3vw, 2.35rem)',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '4px',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--accent-orange)',
                        display: 'inline-block',
                        opacity: isInfinity ? (visible ? 1 : 0) : 1,
                        transform: isInfinity ? (visible ? 'scale(1)' : 'scale(0.85)') : 'none',
                        filter: isInfinity ? (visible ? 'blur(0px)' : 'blur(6px)') : 'none',
                        transition: isInfinity
                          ? `opacity 520ms var(--ease-out-expo) ${idx * 90 + 160}ms, transform 520ms var(--ease-out-expo) ${idx * 90 + 160}ms, filter 520ms var(--ease-out-expo) ${idx * 90 + 160}ms`
                          : 'none',
                      }}
                    >
                      {display}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      lineHeight: 1.4,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          <style>{`
            @media (max-width: 900px) {
              .glass-panel {
                grid-template-columns: repeat(2, 1fr) !important;
              }
              .glass-panel > div:nth-child(3) {
                border-left: none !important;
                padding-left: 0 !important;
              }
            }
            @media (max-width: 520px) {
              .glass-panel {
                grid-template-columns: 1fr !important;
                gap: 18px !important;
                padding: 20px 20px !important;
              }
              .glass-panel > div {
                border-left: none !important;
                padding-left: 0 !important;
                border-top: 1px solid rgba(255,255,255,0.08);
                padding-top: 14px;
              }
              .glass-panel > div:first-child {
                border-top: none !important;
                padding-top: 0 !important;
              }
            }
          `}</style>

        </div>
      </div>
    </section>
  );
};
