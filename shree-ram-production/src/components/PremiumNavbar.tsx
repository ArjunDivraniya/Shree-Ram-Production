import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import mainLogo from '../assets/logo/shreeramproduction-logo.png';

interface PremiumNavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const PremiumNavbar: React.FC<PremiumNavbarProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', sectionId: 'hero', key: 'home', route: '/' },
    { label: 'Services', sectionId: 'four-pillars', key: 'services', route: '/services' },
    { label: 'About', sectionId: 'brand-statement', key: 'about', route: '/about' },
    { label: 'Contact', sectionId: 'contact', key: 'contact', route: '/contact' },
  ];

  const checkIsActive = (itemKey: string): boolean => {
    if (location.pathname === '/services') {
      return itemKey === 'services';
    }
    if (location.pathname === '/about') {
      return itemKey === 'about';
    }
    if (location.pathname === '/contact') {
      return itemKey === 'contact';
    }
    if (location.pathname === '/') {
      return itemKey === 'home';
    }
    return false;
  };

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
    _keyName: string,
    route: string | null
  ) => {
    event.preventDefault();
    setMobileMenuOpen(false);

    if (route === '/services') {
      if (location.pathname === '/services') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/services');
      }
      return;
    }

    if (route === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
      return;
    }

    if (route === '/about') {
      if (location.pathname === '/about') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/about');
      }
      return;
    }

    if (route === '/contact') {
      if (location.pathname === '/contact') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/contact');
      }
      return;
    }

    // Fallback anchor navigation (if any legacy anchor remains)
    if (location.pathname === '/') {
      onNavigate(sectionId);
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <header
      className="apple-header-wrapper"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        paddingTop: scrolled ? '10px' : '16px',
        paddingBottom: scrolled ? '10px' : '16px',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: 'none',
      }}
    >
      <div
        className="apple-header-container"
        style={{
          width: '100%',
          maxWidth: '1140px',
          margin: '0 auto',
          paddingLeft: '16px',
          paddingRight: '16px',
          pointerEvents: 'auto',
        }}
      >
        {/* Floating Apple Liquid Glass Container */}
        <div
          className="apple-glass-pill"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '60px',
            padding: '0 12px 0 16px',
            borderRadius: '20px',
            background: scrolled
              ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.02) 40%, rgba(10, 11, 14, 0.88) 100%)'
              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 40%, rgba(12, 13, 16, 0.6) 100%)',
            backdropFilter: scrolled ? 'blur(30px) saturate(190%)' : 'blur(22px) saturate(160%)',
            WebkitBackdropFilter: scrolled ? 'blur(30px) saturate(190%)' : 'blur(22px) saturate(160%)',
            border: `1px solid ${scrolled ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.10)'
              }`,
            boxShadow: scrolled
              ? 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.3), 0 20px 50px rgba(0, 0, 0, 0.5)'
              : 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.18), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2), 0 10px 30px rgba(0, 0, 0, 0.25)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            overflow: 'hidden',
          }}
        >
          {/* Glass Top Specular Light Highlight Line */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: '10%',
              right: '10%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent)',
              pointerEvents: 'none',
            }}
          />

          {/* LEFT: Shree Ram Production Logo */}
          <a
            href="/"
            onClick={(event) => handleLinkClick(event, 'hero', 'home', '/')}
            aria-label="Shree Ram Production Home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)',
              textDecoration: 'none',
              cursor: 'pointer',
              zIndex: 2,
              minWidth: 0,
            }}
          >
            {/* Main Logo Image Display */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100px',
                height: '100px',



              }}
            >
              <img
                src={mainLogo}
                alt="Shree Ram Production Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </span>

          </a>

          {/* CENTER: Apple Minimal Desktop Nav Links */}
          <nav
            aria-label="Main Navigation"
            className="apple-desktop-nav"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '4px',
              zIndex: 2,
            }}
          >
            {navItems.map((item) => {
              const isActive = checkIsActive(item.key);
              return (
                <a
                  key={item.key}
                  href={item.route ?? `#${item.sectionId}`}
                  onClick={(event) => handleLinkClick(event, item.sectionId, item.key, item.route)}
                  style={{
                    position: 'relative',
                    padding: '6px 12px',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: isActive ? '#FFFFFF' : '#F5F5F2',
                    opacity: isActive ? 1 : 0.75,
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  className={`apple-nav-item ${isActive ? 'active' : ''}`}
                >
                  {isActive && (
                    <span
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: '#FF6A2A',
                        boxShadow: '0 0 8px #FF6A2A',
                      }}
                    />
                  )}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* RIGHT: "Let's Talk ↗" CTA & Mobile Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 2, flexShrink: 0 }}>
            <a
              href="/contact"
              onClick={(event) => handleLinkClick(event, 'contact', 'contact', '/contact')}
              className="apple-glass-cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '8px 15px',
                borderRadius: '11px',
                background: '#FF6A2A',
                color: '#08090A',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.01em',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 16px rgba(255, 106, 42, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
                whiteSpace: 'nowrap',
              }}
            >
              <span>Let's Talk</span>
              <ArrowUpRight size={14} className="apple-cta-arrow" style={{ transition: 'transform 0.3s ease' }} />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen((curr) => !curr)}
              aria-label="Toggle Menu"
              className="apple-mobile-toggle"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU FULL GLASS OVERLAY */}
      {mobileMenuOpen && (
        <div
          className="apple-mobile-drawer"
          style={{
            position: 'fixed',
            inset: 0,
            top: '72px',
            backgroundColor: 'rgba(8, 9, 10, 0.95)',
            backdropFilter: 'blur(32px) saturate(190%)',
            WebkitBackdropFilter: 'blur(32px) saturate(190%)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px 24px 36px',
            animation: 'appleFadeSlide 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            pointerEvents: 'auto',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#FF6A2A', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Navigation
            </div>

            {navItems.map((item) => {
              const isActive = checkIsActive(item.key);
              return (
                <a
                  key={item.key}
                  href={item.route ?? `#${item.sectionId}`}
                  onClick={(event) => handleLinkClick(event, item.sectionId, item.key, item.route)}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: isActive ? '#FF6A2A' : '#FFFFFF',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '12px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
                  }}
                >
                  <span>{item.label}</span>
                  {isActive && <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FF6A2A' }} />}
                </a>
              );
            })}
          </div>

          <a
            href="/contact"
            onClick={(event) => handleLinkClick(event, 'contact', 'contact', '/contact')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '15px',
              borderRadius: '14px',
              background: '#FF6A2A',
              color: '#08090A',
              fontSize: '0.95rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(255, 106, 42, 0.3)',
              marginTop: '24px',
            }}
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={18} />
          </a>
        </div>
      )}

      {/* COMPREHENSIVE RESPONSIVE STYLES FOR APPLE NAVBAR */}
      <style>{`
        @keyframes appleFadeSlide {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .apple-nav-item:hover {
          color: #FF6A2A !important;
          opacity: 1 !important;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.15);
        }

        .apple-nav-item.active {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .apple-glass-cta:hover {
          background-color: #FF8249 !important;
          transform: translateY(-1px) scale(1.02);
          boxShadow: 0 8px 25px rgba(255, 106, 42, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.5) !important;
        }

        .apple-glass-cta:hover .apple-cta-arrow {
          transform: translate(3px, -3px);
        }

        /* Desktop Breakpoint (1024px+) */
        @media (min-width: 1024px) {
          .apple-desktop-nav {
            display: flex !important;
          }
          .apple-mobile-toggle {
            display: none !important;
          }
        }

        /* Tablet Breakpoint (768px - 1023px) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .apple-desktop-nav {
            display: flex !important;
            gap: 2px !important;
          }
          .apple-nav-item {
            padding: 5px 9px !important;
            font-size: 0.8rem !important;
          }
          .apple-mobile-toggle {
            display: none !important;
          }
        }

        /* Mobile Breakpoint (< 768px) */
        @media (max-width: 767px) {
          .apple-desktop-nav {
            display: none !important;
          }
          .apple-mobile-toggle {
            display: flex !important;
          }
          .apple-header-container {
            padding-left: 10px !important;
            padding-right: 10px !important;
          }
          .apple-logo-text {
            max-width: 130px !important;
            font-size: 0.85rem !important;
          }
        }

        /* Very Small Mobile (< 400px) */
        @media (max-width: 400px) {
          .apple-logo-text {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
