import React from 'react';
import { SEO } from '../components/SEO';
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
  const servicesJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.shreeramproduction.in/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: 'https://www.shreeramproduction.in/services',
        },
      ],
    },
    ...SERVICES_PILLARS.map((pillar) => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: pillar.title,
      description: pillar.description,
      provider: {
        '@type': 'ProfessionalService',
        name: 'Shree Ram Production',
        url: 'https://www.shreeramproduction.in/',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: pillar.title,
        itemListElement: pillar.services.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.name,
            description: s.description,
          },
        })),
      },
    })),
  ];

  return (
    <main id="services-page" style={{ background: 'transparent' }}>
      <SEO
        title="Digital Marketing, Branding & Creative Production Services | Shree Ram Production"
        description="Explore 30+ creative, marketing & tech capabilities by Shree Ram Production. From cinematic video shoots & brand identity to SEO, Meta Ads & React web apps."
        canonical="https://www.shreeramproduction.in/services"
        ogTitle="Digital Marketing, Branding & Creative Production Services | Shree Ram Production"
        ogDescription="Discover our 4 core pillars: Content & Production, Brand & Creative, Marketing & Growth, and Technology & Digital. Scalable agency solutions built for growth."
        ogImage="https://www.shreeramproduction.in/shreeramproduction-logo.png"
        jsonLd={servicesJsonLd}
      />
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


