import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import SectionMarker from '../ui/SectionMarker';

export const ServicesViewAllWork: React.FC = () => {
  const { ref, isInView } = useInView<HTMLElement>();
  const reducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="services-view-all-section"
      aria-labelledby="view-all-work-heading"
    >
      <div
        className="container"
        style={{
          opacity: reducedMotion || isInView ? 1 : 0,
          transform: reducedMotion || isInView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s var(--ease-out-expo), transform 0.7s var(--ease-out-expo)',
        }}
      >
        <div className="services-view-all-inner">
          <div>
            <SectionMarker label="PORTFOLIO" align="left" />
            <h2 id="view-all-work-heading" className="services-view-all-title">
              Explore our complete body of work
            </h2>
            <p className="services-view-all-text">
              Browse case studies across production, branding, growth marketing, and digital
              platforms — filter by capability to find work relevant to your project.
            </p>
          </div>
          <Link to="/work" className="srp-btn srp-btn--secondary">
            <span>View All Work</span>
            <span className="srp-btn__arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export const ServicesCTA: React.FC = () => {
  const { ref, isInView } = useInView<HTMLElement>();
  const reducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="services-contact"
      className="services-cta-section"
      aria-labelledby="services-cta-heading"
    >
      <div
        className="container"
        style={{
          opacity: reducedMotion || isInView ? 1 : 0,
          transform: reducedMotion || isInView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s var(--ease-out-expo), transform 0.7s var(--ease-out-expo)',
        }}
      >
        <div className="services-cta-inner glass-panel">
          <div className="services-cta-glow" aria-hidden="true" />
          <h2 id="services-cta-heading" className="services-cta-title">
            Need something specific?
          </h2>
          <p className="services-cta-text">
            Start with one service, combine capabilities, or let us build the complete solution
            around your business.
          </p>
          <Link to="/#contact" className="srp-btn srp-btn--primary srp-btn--lg">
            <span>LET&apos;S TALK</span>
            <span className="srp-btn__arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
          </Link>
        </div>
      </div>
    </section>
  );
};
