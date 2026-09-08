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
        'Shree Ram Production — creative production, marketing & growth agency in Ahmedabad helping brands build visibility, acquire customers and scale digitally through Content & Production, Brand & Creative, Marketing & Growth and Technology & Digital services.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ahmedabad',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
      knowsAbout: [
        'Content & Production',
        'Brand & Creative',
        'Marketing & Growth',
        'Technology & Digital',
        'Photography',
        'Videography',
        'Brand Identity',
        'Logo Design',
        'Graphic Design',
        'Social Media Marketing',
        'SEO',
        'Meta Ads',
        'Google Ads',
        'Content Marketing',
        'Lead Generation',
        'Influencer Marketing',
        'Website Development',
        'E-commerce',
        'Web Applications',
        'UI/UX Design',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Shree Ram Production',
      url: 'https://www.shreeramproduction.in/',
      inLanguage: 'en-IN',
    },
  ];

  return (
    <div style={{ position: 'relative', background: 'transparent', isolation: 'isolate', overflow: 'clip' }}>
      <SEO
        title="Shree Ram Production — Creative Production, Marketing & Growth Agency"
        description="Shree Ram Production — creative production, marketing & growth agency in Ahmedabad helping brands build visibility, acquire customers and scale digitally."
        canonical="https://www.shreeramproduction.in/"
        ogTitle="Shree Ram Production — Creative Production, Marketing & Growth Agency"
        ogDescription="Shree Ram Production — creative production, marketing & growth agency in Ahmedabad helping brands build visibility, acquire customers and scale digitally."
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



