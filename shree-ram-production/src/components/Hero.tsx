import React from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { HERO_STATS } from '../data/content';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
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
          
          {/* Studio Brand Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 18px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(255, 106, 42, 0.08)',
              border: '1px solid rgba(255, 106, 42, 0.25)',
              color: 'var(--accent-orange)',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '28px',
            }}
          >
            <span className="badge-pill-dot" />
            <span>SHREE RAM PRODUCTION — CREATIVE & GROWTH AGENCY</span>
          </div>

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

          {/* Interactive Live Metrics Ticker Bar */}
          <div
            className="glass-panel"
            style={{
              padding: '24px 32px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '24px',
              borderColor: 'rgba(255, 255, 255, 0.12)',
            }}
          >
            {HERO_STATS.map((stat, idx) => (
              <div
                key={stat.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  borderLeft: idx !== 0 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                  paddingLeft: idx !== 0 ? '20px' : '0',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.85rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span style={{ color: 'var(--accent-orange)' }}>{stat.value}</span>
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
