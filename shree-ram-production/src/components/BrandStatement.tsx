import React, { useState } from 'react';
import { Target, Layers, Zap, CheckCircle2 } from 'lucide-react';

interface BrandStatementProps {
  onNavigate: (sectionId: string) => void;
}

export const BrandStatement: React.FC<BrandStatementProps> = ({ onNavigate }) => {
  const [activeMode, setActiveMode] = useState<number>(1);

  const engagementModes = [
    {
      id: 0,
      title: '01. Single Service Focus',
      icon: Target,
      tagline: 'Precision Execution for Specific Needs',
      description: 'Need a commercial film, a brand identity, performance ad management, or a modern web application? Hire us for a single dedicated service with zero fluff.',
      bullets: ['Targeted deliverable focus', 'Rapid execution cycles', 'Direct specialized team engagement'],
      accentBg: '#FFFFFF',
    },
    {
      id: 1,
      title: '02. Multi-Service Synergy',
      icon: Layers,
      tagline: 'Combine Capabilities for Exponential Impact',
      description: 'Pair cinematic content production with our paid marketing team, or unite brand visual identity with high-performance web engineering under one roof.',
      bullets: ['Cross-functional alignment', 'Unified visual & messaging language', 'Optimized budget efficiency'],
      accentBg: '#F5F5F2',
    },
    {
      id: 2,
      title: '03. Complete Growth Partner',
      icon: Zap,
      tagline: 'End-to-End Enterprise Growth Engine',
      description: 'Hand over your entire growth stack to our embedded agency team. We manage storytelling, visual branding, acquisition channels, and digital tech.',
      bullets: ['Full dedicated growth team', 'Quarterly strategic roadmaps', 'Direct revenue & impact accountability'],
      accentBg: '#FFFFFF',
    },
  ];

  return (
    <section
      id="about"
      style={{
        padding: '120px 0',
        backgroundColor: '#F5F5F2',
        color: '#08090A',
        position: 'relative',
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '840px',
            marginBottom: '64px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--accent-orange)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-orange)',
              }}
            />
            <span>OUR AGENCY PHILOSOPHY</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#08090A',
            }}
          >
            One Service, Multiple Solutions, One Growth Partner.
          </h2>

          <p
            style={{
              fontSize: '1.2rem',
              color: '#4A4B50',
              lineHeight: 1.6,
            }}
          >
            Most agencies force you into rigid, pre-packaged tiers that don't fit your business reality. We operate with complete flexibility—whether you need one high-impact deliverable or a comprehensive growth engine.
          </p>
        </div>

        {/* Interactive Mode Selector Tabs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          {engagementModes.map((mode) => {
            const Icon = mode.icon;
            const isSelected = activeMode === mode.id;

            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-glass)',
                  backgroundColor: isSelected ? '#08090A' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#08090A',
                  border: isSelected ? '1px solid #08090A' : '1px solid rgba(8, 9, 10, 0.1)',
                  textAlign: 'left',
                  transition: 'var(--transition-smooth)',
                  boxShadow: isSelected ? '0 16px 32px rgba(0, 0, 0, 0.15)' : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? 'rgba(255, 106, 42, 0.2)' : 'rgba(8, 9, 10, 0.05)',
                      color: isSelected ? 'var(--accent-orange)' : '#08090A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  {isSelected && (
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--accent-orange)',
                        color: '#FFFFFF',
                      }}
                    >
                      SELECTED
                    </span>
                  )}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    marginBottom: '6px',
                  }}
                >
                  {mode.title}
                </div>
                <div
                  style={{
                    fontSize: '0.85rem',
                    color: isSelected ? 'var(--text-muted)' : '#68696D',
                    fontWeight: 500,
                  }}
                >
                  {mode.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Mode Detail Box */}
        <div
          style={{
            backgroundColor: '#08090A',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-glass)',
            padding: '40px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                color: 'var(--accent-orange)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginBottom: '12px',
              }}
            >
              FLEXIBLE ENGAGEMENT ARCHITECTURE
            </div>
            <h3
              style={{
                fontSize: '1.8rem',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#FFFFFF',
              }}
            >
              {engagementModes[activeMode].tagline}
            </h3>
            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '24px',
              }}
            >
              {engagementModes[activeMode].description}
            </p>
            <button
              onClick={() => onNavigate('calculator')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: 'var(--radius-btn)',
                background: 'var(--accent-orange)',
                color: '#FFFFFF',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            >
              <span>CONFIGURE YOUR SOLUTION</span>
              <span>→</span>
            </button>
          </div>

          <div
            style={{
              backgroundColor: 'var(--surface-dark)',
              padding: '28px',
              borderRadius: 'var(--radius-ui)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <div
              style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '16px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Key Characteristics
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {engagementModes[activeMode].bullets.map((bullet) => (
                <div
                  key={bullet}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '0.95rem',
                    color: '#E0E0E0',
                  }}
                >
                  <CheckCircle2 size={18} color="var(--accent-orange)" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
