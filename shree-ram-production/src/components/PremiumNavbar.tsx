import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, Sparkles, X } from 'lucide-react';

interface PremiumNavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const PremiumNavbar: React.FC<PremiumNavbarProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Introduction', href: '#about' },
    { label: 'Pillars', href: '#services' },
    { label: 'Work', href: '#portfolio' },
    { label: 'Why Us', href: '#why' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const sectionId = href.replace('#', '');
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '16px 0' : '24px 0',
        transition: 'padding 0.3s ease',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 20px',
            borderRadius: 'var(--radius-glass)',
            background: scrolled ? 'var(--glass-bg)' : 'rgba(8, 9, 10, 0.42)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            border: `1px solid ${scrolled ? 'var(--glass-border-bright)' : 'var(--glass-border)'}`,
            boxShadow: scrolled ? 'var(--glass-shadow)' : 'none',
            transition: 'var(--transition-smooth)',
            position: 'relative',
          }}
        >
          <a
            href="#hero"
            onClick={(event) => handleLinkClick(event, '#hero')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'var(--text-main)',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.05rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              minWidth: 0,
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--accent-orange), #D44E14)',
                color: '#FFFFFF',
                fontSize: '0.84rem',
                fontWeight: 800,
                boxShadow: '0 0 16px rgba(255, 106, 42, 0.24)',
                flexShrink: 0,
              }}
            >
              SRP
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span style={{ whiteSpace: 'nowrap' }}>SHREE RAM PRODUCTION</span>
              <span
                style={{
                  fontSize: '0.64rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.14em',
                }}
              >
                CREATIVE PRODUCTION STUDIO
              </span>
            </span>
          </a>

          <nav
            aria-label="Main Navigation"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '28px',
            }}
            className="premium-desktop-nav"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(event) => handleLinkClick(event, item.href)}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(event) => (event.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(event) => (event.currentTarget.style.color = 'var(--text-muted)')}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              className="premium-desktop-nav"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '0.74rem',
                color: 'var(--text-muted)',
              }}
            >
              <span className="badge-pill-dot" />
              <span>Premium studio capacity available</span>
            </div>

            <a
              href="#contact"
              onClick={(event) => handleLinkClick(event, '#contact')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: 'var(--radius-btn)',
                background: 'var(--accent-orange)',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: 600,
                boxShadow: '0 6px 20px rgba(255, 106, 42, 0.24)',
                whiteSpace: 'nowrap',
              }}
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={16} />
            </a>

            <button
              onClick={() => setMobileMenuOpen((current) => !current)}
              aria-label="Toggle Navigation Menu"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--glass-border)',
                color: '#FFFFFF',
              }}
              className="premium-mobile-toggle"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '80px',
            backgroundColor: 'rgba(8, 9, 10, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '28px 24px 36px',
            animation: 'fadeIn 0.3s ease-out forwards',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--accent-orange)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              <Sparkles size={14} />
              <span>Navigation Menu</span>
            </div>

            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(event) => handleLinkClick(event, item.href)}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.9rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  paddingBottom: '12px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={(event) => handleLinkClick(event, '#contact')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '16px 22px',
              borderRadius: 'var(--radius-btn)',
              background: 'var(--accent-orange)',
              color: '#FFFFFF',
              fontSize: '0.95rem',
              fontWeight: 600,
            }}
          >
            <span>LET'S TALK</span>
            <ArrowUpRight size={18} />
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .premium-desktop-nav { display: flex !important; }
        }
        @media (min-width: 1024px) {
          .premium-mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
};
