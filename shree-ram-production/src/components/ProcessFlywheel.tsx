import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/content';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const ProcessFlywheel: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const currentStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section
      id="process"
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
            maxWidth: '720px',
            marginBottom: '64px',
          }}
        >
          <div className="badge-pill">
            <span className="badge-pill-dot" />
            <span>HOW WE WORK</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              textTransform: 'uppercase',
            }}
          >
            The Growth Flywheel Methodology
          </h2>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)' }}>
            A rigorous 4-step framework that connects high-end visual production directly to audience acquisition and compounding ROI.
          </p>
        </div>

        {/* Phase Timeline Stepper Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;

            return (
              <button
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                style={{
                  padding: '20px 24px',
                  borderRadius: 'var(--radius-ui)',
                  backgroundColor: isActive ? 'var(--surface-dark-elevated)' : 'var(--surface-dark)',
                  border: `1px solid ${isActive ? 'var(--accent-orange)' : 'var(--glass-border)'}`,
                  textAlign: 'left',
                  transition: 'var(--transition-smooth)',
                  boxShadow: isActive ? '0 0 24px var(--accent-orange-glow)' : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: isActive ? 'var(--accent-orange)' : 'var(--text-dim)',
                    }}
                  >
                    {step.number}
                  </span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      padding: '2px 8px',
                      borderRadius: '8px',
                      backgroundColor: isActive ? 'rgba(255, 106, 42, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      color: isActive ? 'var(--accent-orange)' : 'var(--text-dim)',
                      fontWeight: 600,
                    }}
                  >
                    {step.accentTag}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                  }}
                >
                  {step.phase}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Card */}
        <div
          className="glass-panel"
          style={{
            padding: '48px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'center',
            borderColor: 'var(--glass-border-bright)',
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
              STAGE {currentStep.number} — {currentStep.phase}
            </div>

            <h3
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#FFFFFF',
              }}
            >
              {currentStep.title}
            </h3>

            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '32px',
              }}
            >
              {currentStep.description}
            </p>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-btn)',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  color: activeStepIndex === 0 ? 'var(--text-dim)' : '#FFFFFF',
                  border: '1px solid var(--glass-border)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                ← Previous Phase
              </button>

              <button
                disabled={activeStepIndex === PROCESS_STEPS.length - 1}
                onClick={() => setActiveStepIndex((prev) => Math.min(PROCESS_STEPS.length - 1, prev + 1))}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-btn)',
                  backgroundColor: activeStepIndex === PROCESS_STEPS.length - 1 ? 'rgba(255, 255, 255, 0.06)' : 'var(--accent-orange)',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                <span>Next Phase</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--surface-dark-elevated)',
              borderRadius: 'var(--radius-ui)',
              padding: '32px',
              border: '1px solid var(--glass-border)',
            }}
          >
            <div
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '0.08em',
                marginBottom: '20px',
                textTransform: 'uppercase',
              }}
            >
              Key Deliverables & Milestones
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {currentStep.outcomes.map((outcome) => (
                <div
                  key={outcome}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '1rem',
                    color: '#E0E0E0',
                  }}
                >
                  <CheckCircle2 size={20} color="var(--accent-orange)" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
