import React, { useEffect } from 'react';
import { ServicesHero } from '../components/services/ServicesHero';
import { PillarShowcase } from '../components/services/PillarShowcase';
import { ServicesCTA } from '../components/services/ServicesCTA';
import { Footer } from '../components/Footer';
import { SERVICES_PILLARS } from '../data/servicesData';
import '../components/services/services.css';

interface ServicesPageProps {
  onNavigate: (sectionId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = 'Our Services — Shree Ram Production | Content, Branding, Growth & Digital';
  }, []);

  return (
    <main id="services-page" style={{ background: 'transparent' }}>
      <ServicesHero />

      <div className="services-pillars-wrapper">
        {SERVICES_PILLARS.map((pillar, index) => (
          <PillarShowcase
            key={pillar.id}
            pillar={pillar}
            pillarIndex={index}
            totalPillars={SERVICES_PILLARS.length}
          />
        ))}
      </div>

      <ServicesCTA />
      <Footer onNavigate={onNavigate} />
    </main>
  );
};

