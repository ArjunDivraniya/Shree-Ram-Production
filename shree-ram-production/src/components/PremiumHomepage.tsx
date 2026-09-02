import React from 'react';
import { SEO } from './SEO';
import { Hero } from './Hero';
import { BrandStatement } from './BrandStatement';
import { ScrollDrivenPillars } from './ScrollDrivenPillars';
import { Portfolio } from './Portfolio';
import { ProcessFlywheel } from './ProcessFlywheel';
import { Testimonials } from './Testimonials';
import { ContactCTA } from './ContactCTA';
import { Footer } from './Footer';

interface PremiumHomepageProps {
  onNavigate: (sectionId: string) => void;
}

export const PremiumHomepage: React.FC<PremiumHomepageProps> = ({ onNavigate }) => {
  const homepageJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Shree Ram Production',
      url: 'https://www.shreeramproduction.in/',
      logo: 'https://www.shreeramproduction.in/shreeramproduction-logo.png',
      image: 'https://www.shreeramproduction.in/shreeramproduction-logo.png',
      description:
        'Shree Ram Production is a premier Creative Production & Digital Growth Agency combining cinematic commercial production, brand identity systems, performance marketing, and custom web applications.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ahmedabad',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },
      knowsAbout: [
        'Commercial Video Production',
        'Brand Identity & Strategy',
        'Performance Marketing & Paid Ads',
        'Search Engine Optimization (SEO)',
        'Custom Web & App Engineering',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Shree Ram Production',
      url: 'https://www.shreeramproduction.in/',
    },
  ];

  return (
    <div style={{ position: 'relative', background: 'transparent', isolation: 'isolate', overflow: 'clip' }}>
      <SEO
        title="Creative Production & Digital Growth Agency | Shree Ram Production"
        description="Shree Ram Production is a full-service creative production & growth agency in Ahmedabad, India. We combine cinematic production, brand strategy, paid marketing & tech."
        canonical="https://www.shreeramproduction.in/"
        ogTitle="Creative Production & Digital Growth Agency | Shree Ram Production"
        ogDescription="High-end commercial films, brand architecture, paid acquisition & high-performance web development. Everything your business needs to grow."
        ogImage="https://www.shreeramproduction.in/shreeramproduction-logo.png"
        jsonLd={homepageJsonLd}
      />
      <Hero onNavigate={onNavigate} />
      <BrandStatement onNavigate={onNavigate} />
      <ScrollDrivenPillars onNavigate={onNavigate} />
      <Portfolio isHomepage={true} onNavigate={onNavigate} />
      <ProcessFlywheel />
      <Testimonials onNavigate={onNavigate} />
      <ContactCTA />
      <Footer onNavigate={onNavigate} />
    </div>
  );
};



