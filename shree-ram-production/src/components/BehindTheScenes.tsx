import React, { useState } from 'react';
import { BEHIND_THE_SCENES } from '../data/content';
import { Play, Film, Sliders, Volume2, Maximize2 } from 'lucide-react';
import SectionMarker from './ui/SectionMarker';

export const BehindTheScenes: React.FC = () => {
  const [isPlayingReel, setIsPlayingReel] = useState(false);

  return (
    <section
      id="behind-scenes"
      style={{
        padding: '120px 0',
        background: 'transparent',
        position: 'relative',
      }}
    >
      <div className="container">
        
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '720px',
            marginBottom: '64px',
          }}
        >
          <SectionMarker label="PRODUCTION CRAFT & INFRASTRUCTURE" align="left" />

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              textTransform: 'uppercase',
            }}
          >
            Behind The Lens & In The Studio
          </h2>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)' }}>
            We own state-of-the-art cinema camera rigs, lighting setups, color grading suites, and high-performance computing infrastructure.
          </p>
        </div>

        {/* Studio Showreel Player Mockup */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '21/9',
            minHeight: '320px',
            borderRadius: 'var(--radius-media)',
            overflow: 'hidden',
            backgroundColor: '#000000',
            border: '1px solid var(--glass-border-bright)',
            marginBottom: '48px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=1600&q=80"
            alt="Shree Ram Production Showreel"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: isPlayingReel ? 'brightness(0.9)' : 'brightness(0.5) contrast(1.1)',
              transition: 'filter 0.5s ease',
            }}
          />

          {/* Player Overlay Controls */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '32px',
              background: 'linear-gradient(to top, rgba(8, 9, 10, 0.8) 0%, transparent 50%, rgba(8, 9, 10, 0.6) 100%)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Film size={18} color="var(--accent-orange)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', color: '#FFFFFF' }}>
                  2026 STUDIO SHOWREEL
                </span>
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'rgba(255, 106, 42, 0.2)',
                  color: 'var(--accent-orange)',
                  fontWeight: 600,
                }}
              >
                4K HDR CINEMA
              </div>
            </div>

            {/* Center Play Trigger */}
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => setIsPlayingReel(!isPlayingReel)}
                data-cursor="PLAY"
                className="srp-btn srp-btn--primary"
                style={{ width: '80px', height: '80px', borderRadius: '50%', padding: 0 }}
              >
                <Play size={32} fill="currentColor" style={{ marginLeft: '4px' }} />
              </button>
              <div style={{ marginTop: '14px', fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF' }}>
                {isPlayingReel ? 'CLICK TO PAUSE PREVIEW' : 'WATCH THE CREATIVE SHOWREEL'}
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              <span>01:42 / 02:30</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Volume2 size={16} />
                <Sliders size={16} />
                <Maximize2 size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* BTS Gear & Craft Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {BEHIND_THE_SCENES.map((item) => (
            <div
              key={item.id}
              className="glass-panel"
              style={{
                overflow: 'hidden',
                borderRadius: 'var(--radius-ui)',
                border: '1px solid var(--glass-border)',
              }}
            >
              <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <div style={{ padding: '20px' }}>
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--accent-orange)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  {item.category}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
