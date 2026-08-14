import React, { useState } from 'react';
import { ArrowUpRight, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import type { ContactFormData } from '../types';

interface ContactCTAProps {
  preselectedServices: string[];
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ preselectedServices }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    servicesNeeded: preselectedServices.length > 0 ? preselectedServices : ['Content & Production'],
    budgetRange: '$25,000 – $50,000',
    timeline: 'Within 30 Days',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const budgetOptions = [
    '< $15,000',
    '$15,000 – $30,000',
    '$30,000 – $75,000',
    '$75,000+',
  ];

  const serviceOptions = [
    'Content & Production',
    'Brand & Creative',
    'Marketing & Growth',
    'Technology & Digital',
  ];

  const toggleService = (service: string) => {
    setFormData((prev) => {
      const exists = prev.servicesNeeded.includes(service);
      const updated = exists
        ? prev.servicesNeeded.filter((s) => s !== service)
        : [...prev.servicesNeeded, service];
      return { ...prev, servicesNeeded: updated.length > 0 ? updated : [service] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      style={{
        padding: '120px 0',
        backgroundColor: '#08090A',
        position: 'relative',
      }}
    >
      <div className="container">
        
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '48px',
            alignItems: 'flex-start',
          }}
        >
          {/* Direct Info Column (Left 5 Cols) */}
          <div style={{ gridColumn: 'span 12' }} className="contact-info-col">
            <div className="badge-pill" style={{ marginBottom: '20px' }}>
              <span className="badge-pill-dot" />
              <span>START A PROJECT</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              Let's Build Something Exceptional Together.
            </h2>

            <p
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '40px',
              }}
            >
              Have a new launch, commercial film, rebranding, performance campaign, or web app in mind? Drop us a brief and our strategy team will respond within 24 hours.
            </p>

            {/* Direct Contact Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '18px 24px',
                  borderRadius: 'var(--radius-ui)',
                  backgroundColor: 'var(--surface-dark)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 106, 42, 0.15)',
                    color: 'var(--accent-orange)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase' }}>
                    DIRECT INQUIRIES
                  </div>
                  <a href="mailto:hello@shreeramproduction.com" style={{ fontSize: '1.05rem', fontWeight: 600, color: '#FFFFFF' }}>
                    hello@shreeramproduction.com
                  </a>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '18px 24px',
                  borderRadius: 'var(--radius-ui)',
                  backgroundColor: 'var(--surface-dark)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 106, 42, 0.15)',
                    color: 'var(--accent-orange)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase' }}>
                    STUDIO LOCATIONS
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#FFFFFF' }}>
                    Mumbai Studio & Global Remote Network
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Intake Form Column (Right 7 Cols) */}
          <div style={{ gridColumn: 'span 12' }} className="contact-form-col">
            <div
              className="glass-panel"
              style={{
                padding: '40px',
                borderColor: 'var(--glass-border-bright)',
              }}
            >
              {submitted ? (
                <div
                  style={{
                    padding: '40px 20px',
                    textAlign: 'center',
                    animation: 'fadeIn 0.5s var(--ease-out-expo) forwards',
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 106, 42, 0.2)',
                      color: 'var(--accent-orange)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
                    Project Inquiry Received!
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '440px', margin: '0 auto 24px auto' }}>
                    Thank you <strong style={{ color: '#FFFFFF' }}>{formData.name}</strong>. Our executive strategy team is reviewing your project brief and will be in touch within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{
                      padding: '12px 24px',
                      borderRadius: 'var(--radius-btn)',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: '#FFFFFF',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                    }}
                  >
                    Submit Another Brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* Select Pillars */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px', letterSpacing: '0.05em' }}>
                      1. WHAT CAPABILITIES DO YOU NEED?
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {serviceOptions.map((srv) => {
                        const isSelected = formData.servicesNeeded.includes(srv);
                        return (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => toggleService(srv)}
                            style={{
                              padding: '8px 16px',
                              borderRadius: 'var(--radius-pill)',
                              backgroundColor: isSelected ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.06)',
                              color: isSelected ? '#FFFFFF' : 'var(--text-muted)',
                              border: `1px solid ${isSelected ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.1)'}`,
                              fontSize: '0.85rem',
                              fontWeight: 600,
                              transition: 'var(--transition-smooth)',
                            }}
                          >
                            {srv} {isSelected && '✓'}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email Fields */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div>
                      <label htmlFor="input-name" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
                        Your Name *
                      </label>
                      <input
                        id="input-name"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          borderRadius: 'var(--radius-ui)',
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.95rem',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label htmlFor="input-email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
                        Work Email *
                      </label>
                      <input
                        id="input-email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          borderRadius: 'var(--radius-ui)',
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.95rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label htmlFor="input-company" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
                      Company / Brand Name
                    </label>
                    <input
                      id="input-company"
                      type="text"
                      placeholder="Apex Automotive"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        borderRadius: 'var(--radius-ui)',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.95rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Budget Selection */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px', letterSpacing: '0.05em' }}>
                      2. EXPECTED BUDGET TIER
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                      {budgetOptions.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData({ ...formData, budgetRange: b })}
                          style={{
                            padding: '10px',
                            borderRadius: 'var(--radius-ui)',
                            backgroundColor: formData.budgetRange === b ? 'rgba(255, 106, 42, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                            color: formData.budgetRange === b ? 'var(--accent-orange)' : 'var(--text-muted)',
                            border: `1px solid ${formData.budgetRange === b ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.08)'}`,
                            fontSize: '0.8rem',
                            fontWeight: 600,
                          }}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label htmlFor="input-message" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
                      Project Details / Goals
                    </label>
                    <textarea
                      id="input-message"
                      rows={4}
                      placeholder="Tell us about your campaign goals, target audience, timeline, or key deliverables..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        borderRadius: 'var(--radius-ui)',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      padding: '18px',
                      borderRadius: 'var(--radius-btn)',
                      backgroundColor: 'var(--accent-orange)',
                      color: '#FFFFFF',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      boxShadow: '0 8px 32px var(--accent-orange-glow)',
                      transition: 'var(--transition-smooth)',
                    }}
                  >
                    <span>START A PROJECT</span>
                    <ArrowUpRight size={20} />
                  </button>

                </form>
              )}
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .contact-info-col { grid-column: span 5 !important; }
          .contact-form-col { grid-column: span 7 !important; }
        }
      `}</style>
    </section>
  );
};
