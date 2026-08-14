import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/content';
import { Quote, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeTestimonial = TESTIMONIALS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="testimonials"
      style={{
        padding: '120px 0',
        backgroundColor: '#F5F5F2',
        color: '#08090A',
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
            <span>PROVEN COMMERCIAL IMPACT</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              textTransform: 'uppercase',
              color: '#08090A',
            }}
          >
            What Leaders Say About Working With SRP
          </h2>
        </div>

        {/* Testimonial Box */}
        <div
          style={{
            backgroundColor: '#08090A',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-glass)',
            padding: '48px',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          <div>
            <Quote size={48} color="var(--accent-orange)" style={{ marginBottom: '24px', opacity: 0.8 }} />
            
            <p
              style={{
                fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 500,
                lineHeight: 1.4,
                color: '#FFFFFF',
                marginBottom: '32px',
              }}
            >
              "{activeTestimonial.quote}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src={activeTestimonial.avatar}
                alt={activeTestimonial.author}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--accent-orange)',
                }}
              />
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>
                  {activeTestimonial.author}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {activeTestimonial.role}, <strong style={{ color: '#FFFFFF' }}>{activeTestimonial.company}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Highlight & Carousel Controls */}
          <div
            style={{
              backgroundColor: 'var(--surface-dark)',
              padding: '36px',
              borderRadius: 'var(--radius-ui)',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '260px',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--accent-orange)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  marginBottom: '12px',
                }}
              >
                <TrendingUp size={16} />
                <span>MEASURABLE RESULT</span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '3.5rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}
              >
                {activeTestimonial.impactMetric}
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                {activeTestimonial.metricLabel}
              </div>
            </div>

            {/* Stepper Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                0{currentIndex + 1} / 0{TESTIMONIALS.length}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handlePrev}
                  aria-label="Previous Testimonial"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next Testimonial"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-orange)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
