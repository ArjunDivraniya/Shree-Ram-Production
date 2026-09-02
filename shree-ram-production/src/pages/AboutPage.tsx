import React, { useEffect } from 'react';
import { SEO } from '../components/SEO';
import { AboutHero } from '../components/about/AboutHero';
import { WhoWeAre } from '../components/about/WhoWeAre';
import { AboutPhilosophy } from '../components/about/AboutPhilosophy';
import { AboutCapabilities } from '../components/about/AboutCapabilities';
import { AboutTeam } from '../components/about/AboutTeam';
import { AboutApproach } from '../components/about/AboutApproach';
import { AboutDifferentiation } from '../components/about/AboutDifferentiation';
import { AboutHumanStatement } from '../components/about/AboutHumanStatement';
import { AboutCTA } from '../components/about/AboutCTA';
import { Footer } from '../components/Footer';
import '../components/about/about.css';

interface AboutPageProps {
  onNavigate: (sectionId: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const aboutJsonLd = [
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
          name: 'About Us',
          item: 'https://www.shreeramproduction.in/about',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Shree Ram Production',
      url: 'https://www.shreeramproduction.in/about',
      description:
        'Learn about Shree Ram Production’s story, agency philosophy, team, capabilities, and strategic approach.',
      publisher: {
        '@type': 'Organization',
        name: 'Shree Ram Production',
        logo: 'https://www.shreeramproduction.in/shreeramproduction-logo.png',
      },
    },
  ];

  return (
    <main id="about-page" style={{ background: 'transparent' }}>
      <SEO
        title="About Shree Ram Production | Creative Growth & Production Agency"
        description="Learn about Shree Ram Production's story, creative philosophy, team, and approach. We bridge cinematic storytelling and data-driven performance."
        canonical="https://www.shreeramproduction.in/about"
        ogTitle="About Shree Ram Production | Creative Growth & Production Agency"
        ogDescription="Discover who we are, our core beliefs, team, and approach. We combine cinematic production craft with strategic business growth."
        ogImage="https://www.shreeramproduction.in/shreeramproduction-logo.png"
        jsonLd={aboutJsonLd}
      />

      {/* 1. ABOUT HERO */}
      <AboutHero />

      {/* 2. WHO WE ARE */}
      <WhoWeAre />

      {/* 3. OUR PHILOSOPHY */}
      <AboutPhilosophy />

      {/* 4. OUR CAPABILITIES */}
      <AboutCapabilities />

      {/* 5, 6, 7, 8. THE PEOPLE BEHIND THE WORK */}
      <AboutTeam />

      {/* 9. OUR APPROACH */}
      <AboutApproach />

      {/* 10. WHAT MAKES US DIFFERENT */}
      <AboutDifferentiation />

      {/* 11. HUMAN / PERSONAL STATEMENT */}
      <AboutHumanStatement />

      {/* 12. FINAL CTA */}
      <AboutCTA />

      {/* FOOTER */}
      <Footer onNavigate={onNavigate} />
    </main>
  );
};

export default AboutPage;

