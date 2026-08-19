import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const ServicesHero: React.FC = () => {
  const { ref, isInView } = useInView<HTMLElement>();
  const reducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      aria-labelledby="services-hero-heading"
      style={{
        minHeight: 'min(85vh, 720px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '140px 24px 80px',
        position: 'relative',
        backgroundColor: '#08090A',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(800px, 90vw)',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(255, 106, 42, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <div
          className="badge-pill"
          style={{
            opacity: reducedMotion || isInView ? 1 : 0,
            transform: reducedMotion || isInView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s var(--ease-out-expo), transform 0.6s var(--ease-out-expo)',
          }}
        >
          <span className="badge-pill-dot" />
          <span>OUR SERVICES</span>
        </div>

        <h1
          id="services-hero-heading"
          style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: '900px',
            letterSpacing: '-0.03em',
            opacity: reducedMotion || isInView ? 1 : 0,
            transform: reducedMotion || isInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s var(--ease-out-expo) 0.08s, transform 0.7s var(--ease-out-expo) 0.08s',
          }}
        >
          Everything you need to build, grow and scale your business.
        </h1>

        <p
          style={{
            maxWidth: '560px',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            opacity: reducedMotion || isInView ? 1 : 0,
            transform: reducedMotion || isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s var(--ease-out-expo) 0.16s, transform 0.7s var(--ease-out-expo) 0.16s',
          }}
        >
          From a single service to a complete growth solution, choose exactly what your business needs.
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: reducedMotion || isInView ? 0.5 : 0,
          transition: 'opacity 0.8s var(--ease-out-expo) 0.4s',
        }}
      >
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          Explore
        </span>
        <ChevronDown
          size={20}
          color="#A5A5A8"
          className={reducedMotion ? '' : 'services-scroll-indicator'}
        />
      </div>

      <style>{`
        @keyframes servicesScrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(6px); opacity: 1; }
        }
        .services-scroll-indicator {
          animation: servicesScrollBounce 2s var(--ease-in-out-cubic) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .services-scroll-indicator { animation: none !important; }
        }
      `}</style>
    </section>
  );
};
