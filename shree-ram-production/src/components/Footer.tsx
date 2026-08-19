import React from 'react';
import { MapPin, Globe } from 'lucide-react';
import mainLogo from '../assets/logo/shreeramproduction-logo.png';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    onNavigate(id);
  };

  return (
    <footer
      style={{
        backgroundColor: '#08090A',
        color: '#FFFFFF',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '80px',
        paddingBottom: '40px',
      }}
    >
      {/* Signature Animated Orange Line Header Accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, var(--accent-orange) 50%, transparent 100%)',
        }}
      />

      <div className="container">
        
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '40px',
            marginBottom: '64px',
          }}
        >
          {/* Brand & Mission */}
          <div style={{ gridColumn: 'span 12' }} className="footer-brand-col">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <img
                src={mainLogo}
                alt="Shree Ram Production Logo"
                style={{
                  height: '38px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: '#FFFFFF',
                }}
              >
                SHREE RAM PRODUCTION
              </span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '360px', marginBottom: '24px', lineHeight: 1.6 }}>
              Everything Your Business Needs to Grow. Content, Brand, Growth & Technology Agency.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(255, 106, 42, 0.1)',
                border: '1px solid rgba(255, 106, 42, 0.25)',
                color: 'var(--accent-orange)',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              <span className="badge-pill-dot" />
              <span>Available for Q3/Q4 Enterprise Partnerships</span>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ gridColumn: 'span 6' }} className="footer-links-col">
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.08em', marginBottom: '20px', textTransform: 'uppercase' }}>
              Pillar Solutions
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <a href="#four-pillars" onClick={(e) => handleLinkClick(e, '#four-pillars')}>Content & Production</a>
              <a href="#four-pillars" onClick={(e) => handleLinkClick(e, '#four-pillars')}>Brand & Creative</a>
              <a href="#four-pillars" onClick={(e) => handleLinkClick(e, '#four-pillars')}>Marketing & Growth</a>
              <a href="#four-pillars" onClick={(e) => handleLinkClick(e, '#four-pillars')}>Technology & Digital</a>
            </div>
          </div>

          {/* Navigation & Tools */}
          <div style={{ gridColumn: 'span 6' }} className="footer-nav-col">
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.08em', marginBottom: '20px', textTransform: 'uppercase' }}>
              Navigation
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <a href="#portfolio" onClick={(e) => handleLinkClick(e, '#portfolio')}>Selected Work</a>
              <a href="#brand-statement" onClick={(e) => handleLinkClick(e, '#brand-statement')}>Agency Philosophy</a>
              <a href="#process" onClick={(e) => handleLinkClick(e, '#process')}>Growth Methodology</a>
              <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')}>Let's Talk</a>
            </div>
          </div>

          {/* Studio Locations */}
          <div style={{ gridColumn: 'span 12' }} className="footer-location-col">
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.08em', marginBottom: '20px', textTransform: 'uppercase' }}>
              Studio Presence
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="var(--accent-orange)" style={{ flexShrink: 0 }} />
                <span>Ahmedabad Gujrat, India</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={16} color="var(--accent-orange)" style={{ flexShrink: 0 }} />
                <span>Global Remote Production Teams</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div
          className="footer-copyright-bar"
          style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '0.85rem',
            color: 'var(--text-dim)',
          }}
        >
          <div>
            © {currentYear} Shree Ram Production. All rights reserved.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
            <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')}>Privacy Policy</a>
            <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')}>Terms of Engagement</a>
            <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')}>Back to Top ↑</a>
          </div>
        </div>

      </div>

      {/* RESPONSIVE LAYOUT BREAKPOINTS */}
      <style>{`
        @media (max-width: 767px) {
          .footer-brand-col,
          .footer-location-col {
            grid-column: span 12 !important;
          }
          .footer-links-col,
          .footer-nav-col {
            grid-column: span 6 !important;
          }
          .footer-copyright-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 14px !important;
          }
        }

        @media (max-width: 480px) {
          .footer-links-col,
          .footer-nav-col {
            grid-column: span 12 !important;
          }
        }

        @media (min-width: 992px) {
          .footer-brand-col { grid-column: span 4 !important; }
          .footer-links-col { grid-column: span 3 !important; }
          .footer-nav-col { grid-column: span 2 !important; }
          .footer-location-col { grid-column: span 3 !important; }
        }
      `}</style>
    </footer>
  );
};
