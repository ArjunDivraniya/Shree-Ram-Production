import { useState } from 'react';
import { CALCULATOR_OPTIONS } from '../data/content';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface ProjectCalculatorProps {
  onSelectServices: (selectedTitles: string[]) => void;
}

export const ProjectCalculator: React.FC<ProjectCalculatorProps> = ({ onSelectServices }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'opt-commercial-film',
    'opt-growth-funnel',
  ]);

  const toggleOption = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedObjects = CALCULATOR_OPTIONS.filter((opt) => selectedIds.includes(opt.id));

  const handleApplyToForm = () => {
    const titles = selectedObjects.map((o) => o.title);
    onSelectServices(titles);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="calculator"
      style={{
        padding: '120px 0',
        backgroundColor: '#08090A',
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
            maxWidth: '780px',
            marginBottom: '64px',
          }}
        >
          <div className="badge-pill">
            <span className="badge-pill-dot" />
            <span>INTERACTIVE GROWTH SOLUTION BUILDER</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              textTransform: 'uppercase',
            }}
          >
            Design Your Tailored Solution
          </h2>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)' }}>
            No rigid packages. Select the exact capabilities your business needs right now—from a single high-impact commercial film to a full-stack growth partnership.
          </p>
        </div>

        {/* Builder Layout Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '32px',
            alignItems: 'flex-start',
          }}
        >
          {/* Options Selection Grid (Left 7 Cols) */}
          <div
            style={{
              gridColumn: 'span 12',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
            className="calc-options-col"
          >
            {CALCULATOR_OPTIONS.map((opt) => {
              const isSelected = selectedIds.includes(opt.id);

              return (
                <div
                  key={opt.id}
                  onClick={() => toggleOption(opt.id)}
                  style={{
                    padding: '24px',
                    borderRadius: 'var(--radius-glass)',
                    backgroundColor: isSelected ? 'var(--surface-dark-elevated)' : 'var(--surface-dark)',
                    border: `1px solid ${isSelected ? 'var(--accent-orange)' : 'var(--glass-border)'}`,
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)',
                    boxShadow: isSelected ? '0 8px 24px var(--accent-orange-glow)' : 'none',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: isSelected ? 'var(--accent-orange)' : 'var(--text-dim)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {opt.pillar}
                    </span>

                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        backgroundColor: isSelected ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.08)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isSelected && <Check size={16} />}
                    </div>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      marginBottom: '8px',
                    }}
                  >
                    {opt.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                      marginBottom: '16px',
                    }}
                  >
                    {opt.description}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.75rem',
                      color: 'var(--text-dim)',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      paddingTop: '12px',
                    }}
                  >
                    <span>Est: {opt.estimatedTimeline}</span>
                    <span style={{ color: 'var(--accent-orange)', fontWeight: 600 }}>{opt.impactTier}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Brief Summary Box (Right 5 Cols) */}
          <div style={{ gridColumn: 'span 12' }} className="calc-summary-col">
            <div
              className="glass-panel"
              style={{
                padding: '36px',
                borderColor: 'var(--glass-border-bright)',
                position: 'sticky',
                top: '100px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: 'var(--accent-orange)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  marginBottom: '20px',
                }}
              >
                <Sparkles size={16} />
                <span>YOUR CUSTOMIZED GROWTH BRIEF</span>
              </div>

              <div
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '20px',
                }}
              >
                {selectedObjects.length} Capabilities Selected
              </div>

              {selectedObjects.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  Please click options on the left to add capabilities to your solution brief.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                  {selectedObjects.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                          {item.pillar}
                        </div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-orange)', fontWeight: 600 }}>
                        {item.estimatedTimeline}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <button
                disabled={selectedObjects.length === 0}
                onClick={handleApplyToForm}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '16px',
                  borderRadius: 'var(--radius-btn)',
                  backgroundColor: selectedObjects.length === 0 ? 'rgba(255, 255, 255, 0.1)' : 'var(--accent-orange)',
                  color: '#FFFFFF',
                  fontSize: '1rem',
                  fontWeight: 600,
                  transition: 'var(--transition-smooth)',
                }}
              >
                <span>REQUEST PROPOSAL WITH THIS BRIEF</span>
                <ArrowRight size={18} />
              </button>

            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .calc-options-col { grid-column: span 7 !important; }
          .calc-summary-col { grid-column: span 5 !important; }
        }
      `}</style>
    </section>
  );
};
