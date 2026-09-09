import React from 'react';
import { Link } from 'react-router-dom';
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
        title="Services — Content, Brand, Marketing & Technology | Shree Ram Production"
        description="Explore services across Content & Production, Brand & Creative, Marketing & Growth and Technology & Digital — video, branding, SEO, Meta Ads, Google Ads and web apps."
        canonical="https://www.shreeramproduction.in/services"
        ogTitle="Services — Content, Brand, Marketing & Technology | Shree Ram Production"
        ogDescription="Discover 4 core pillars — Content & Production, Brand & Creative, Marketing & Growth and Technology & Digital. From video, branding and SEO to Meta Ads and web apps."
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

      {/* Cross-linking for sitelinks hierarchy — natural links to related canonical routes */}
      <nav aria-label="Related pages" style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '32px 24px 48px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.9rem' }}>
        <Link to="/work" style={{ color: 'var(--accent-orange)', textDecoration: 'none', fontWeight: 600 }}>View Work — portfolio & case studies</Link>
        <span style={{ color: 'var(--text-dim)' }} aria-hidden="true">•</span>
        <Link to="/about" style={{ color: 'var(--accent-orange)', textDecoration: 'none', fontWeight: 600 }}>About Shree Ram Production — company information</Link>
        <span style={{ color: 'var(--text-dim)' }} aria-hidden="true">•</span>
        <Link to="/contact" style={{ color: 'var(--accent-orange)', textDecoration: 'none', fontWeight: 600 }}>Contact — start your project</Link>
      </nav>
      <Footer onNavigate={onNavigate} />
    </main>
  );
};


