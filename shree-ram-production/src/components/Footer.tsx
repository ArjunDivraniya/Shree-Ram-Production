import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { InstagramIcon } from './ui/InstagramIcon';
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
        background: 'transparent',
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

        {/* Top Row: Part-1 (Brand) & Part-2 (Pillar Solutions + Navigation) */}
        <div className="footer-top-row">

          {/* Part-1: SHREE RAM PRODUCTION */}
          <div className="footer-brand-col">
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
                alt="Shree Ram Production — Creative Production, Brand Architecture & Performance Marketing Agency in Ahmedabad"
                title="Shree Ram Production"
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

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '440px', marginBottom: '24px', lineHeight: 1.6 }}>
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

          {/* Part-2: Pillar Solutions & Navigation Columns */}
          <div className="footer-nav-group">
            {/* Quick Links — semantic pillar navigation to /services */}
            <nav aria-label="Services" className="footer-links-col">
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.08em', marginBottom: '20px', textTransform: 'uppercase' }}>
                Pillar Solutions
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)', listStyle: 'none', padding: 0, margin: 0 }}>
                <li><Link to="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Content & Production services</Link></li>
                <li><Link to="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Brand & Creative services</Link></li>
                <li><Link to="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Marketing & Growth services</Link></li>
                <li><Link to="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Technology & Digital services</Link></li>
              </ul>
            </nav>

            {/* Site Navigation — semantic links to canonical routes for sitelinks hierarchy */}
            <nav aria-label="Footer navigation" className="footer-nav-col">
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.08em', marginBottom: '20px', textTransform: 'uppercase' }}>
                Navigation
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)', listStyle: 'none', padding: 0, margin: 0 }}>
                <li><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home — Shree Ram Production</Link></li>
                <li><Link to="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Services — growth solutions & capabilities</Link></li>
                <li><Link to="/work" style={{ color: 'inherit', textDecoration: 'none' }}>Work — projects & case studies</Link></li>
                <li><Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About — company information</Link></li>
                <li><Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact — contact Shree Ram Production</Link></li>
              </ul>
            </nav>
          </div>

        </div>

        {/* Studio Locations & Direct Contact Details */}
        <div className="footer-location-col">
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.08em', marginBottom: '24px', textTransform: 'uppercase' }}>
            Direct Contact & Studio Presence
          </div>
          <div className="footer-contact-row">
            <div className="footer-contact-item">
              <Phone size={16} color="var(--accent-orange)" style={{ flexShrink: 0 }} />
              <span>
                Contact Us:{' '}
                <a href="tel:+919313119830" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 600 }}>
                  +91 93131 19830
                </a>
              </span>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} color="var(--accent-orange)" style={{ flexShrink: 0 }} />
              <span>
                Email:{' '}
                <a href="mailto:shreeramproduction.in@gmail.com" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 600 }}>
                  shreeramproduction.in@gmail.com
                </a>
              </span>
            </div>
            <div className="footer-contact-item">
              <InstagramIcon size={16} color="var(--accent-orange)" style={{ flexShrink: 0 }} />
              <span>
                Instagram:{' '}
                <a href="https://www.instagram.com/ram_production___?stkn=NWRnYWM5YTVta3hy" target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 600 }}>
                  @ram_production___
                </a>
              </span>
            </div>
            <div className="footer-contact-item">
              <MapPin size={16} color="var(--accent-orange)" style={{ flexShrink: 0 }} />
              <span>Ahmedabad, Gujarat, India</span>
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
        .footer-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 64px;
          margin-bottom: 56px;
        }

        .footer-brand-col {
          flex: 1 1 420px;
          max-width: 460px;
        }

        .footer-nav-group {
          display: flex;
          gap: 64px;
          flex: 0 0 auto;
        }

        .footer-links-col,
        .footer-nav-col {
          min-width: 190px;
        }

        .footer-location-col {
          width: 100%;
          padding-top: 36px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 56px;
        }

        .footer-contact-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          gap: 24px;
        }

        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        @media (max-width: 1080px) {
          .footer-top-row {
            gap: 48px;
          }
          .footer-nav-group {
            gap: 48px;
          }
          .footer-contact-row {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px 32px;
          }
        }

        @media (max-width: 767px) {
          .footer-top-row {
            flex-direction: column;
            gap: 40px;
            margin-bottom: 40px;
          }
          .footer-brand-col {
            max-width: 100%;
          }
          .footer-nav-group {
            width: 100%;
            justify-content: space-between;
            gap: 32px;
          }
          .footer-location-col {
            padding-top: 28px;
            margin-bottom: 40px;
          }
          .footer-contact-row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .footer-copyright-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 14px !important;
          }
        }

        @media (max-width: 480px) {
          .footer-nav-group {
            flex-direction: column;
            gap: 28px;
          }
        }
      `}</style>
    </footer>
  );
};
