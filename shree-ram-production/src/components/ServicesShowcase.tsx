import React, { useState } from 'react';
import { SERVICE_PILLARS } from '../data/content';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import SectionMarker from './ui/SectionMarker';

interface ServicesShowcaseProps {
  onNavigate: (sectionId: string) => void;
}

export const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({ onNavigate }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICE_PILLARS[0].id);

  return (
    <section
      id="services"
      style={{
        padding: '120px 0',
        background: 'transparent',
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
            marginBottom: '64px',
          }}
        >
          <SectionMarker label="FOUR CORE PILLARS" align="left" />

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              textTransform: 'uppercase',
            }}
          >
            End-to-End Capabilities & Solutions
          </h2>

          <p style={{ maxWidth: '640px', fontSize: '1.15rem' }}>
            We combine high-end creative visual storytelling with data-backed growth strategies and bespoke digital engineering.
          </p>
        </div>

        {/* Desktop Split Layout (Services List Left + High-Res Preview Right) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '40px',
            alignItems: 'flex-start',
          }}
        >
          {/* Services Selector Column */}
          <div style={{ gridColumn: 'span 12' }} className="service-list-column">
            {SERVICE_PILLARS.map((service) => {
              const isActive = activeServiceId === service.id;

              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveServiceId(service.id)}
                  onClick={() => setActiveServiceId(service.id)}
                  data-cursor="EXPLORE"
                  style={{
                    padding: '32px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: isActive ? 'var(--accent-orange)' : 'var(--text-dim)',
                          transition: 'color 0.2s ease',
                        }}
                      >
                        {service.number}
                      </span>
                      <h3
                        style={{
                          fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                          fontWeight: 700,
                          color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                          transition: 'color 0.2s ease',
                        }}
                      >
                        {service.title}
                      </h3>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.8rem',
                          padding: '4px 12px',
                          borderRadius: 'var(--radius-pill)',
                          background: isActive ? 'rgba(255, 106, 42, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                          color: isActive ? 'var(--accent-orange)' : 'var(--text-muted)',
                          fontWeight: 600,
                          display: 'none',
                        }}
                        className="service-badge-desktop"
                      >
                        {service.badge}
                      </span>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: isActive ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.06)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'var(--transition-smooth)',
                        }}
                      >
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content View on Mobile / Clicked State */}
                  {isActive && (
                    <div
                      style={{
                        marginTop: '24px',
                        paddingTop: '20px',
                        borderTop: '1px dashed rgba(255, 255, 255, 0.08)',
                        animation: 'fadeIn 0.4s var(--ease-out-expo) forwards',
                      }}
                    >
                      <div style={{ color: 'var(--accent-orange)', fontWeight: 600, marginBottom: '8px' }}>
                        {service.tagline}
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '20px' }}>
                        {service.description}
                      </p>

                      {/* Capabilities Grid */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                          gap: '12px',
                          marginBottom: '24px',
                        }}
                      >
                        {service.capabilities.map((cap) => (
                          <div
                            key={cap}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              fontSize: '0.9rem',
                              color: '#E0E0E0',
                              background: 'rgba(20, 21, 24, 0.6)',
                              padding: '10px 14px',
                              borderRadius: '8px',
                              border: '1px solid var(--glass-border)',
                            }}
                          >
                            <CheckCircle2 size={16} color="var(--accent-orange)" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('calculator');
                        }}
                        className="srp-btn srp-btn--primary srp-btn--sm"
                      >
                        <span>BOOK {service.title.toUpperCase()}</span>
                        <span className="srp-btn__arrow" aria-hidden="true"><ArrowUpRight size={16} /></span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .service-badge-desktop { display: inline-block !important; }
        }
      `}</style>
    </section>
  );
};
