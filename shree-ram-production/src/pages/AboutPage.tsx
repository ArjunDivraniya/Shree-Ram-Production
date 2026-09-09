import React from 'react';
import { Link } from 'react-router-dom';
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
        title="About Shree Ram Production — Creative Production & Growth Agency"
        description="Learn about Shree Ram Production — our story, philosophy, capabilities and approach to blending cinematic craft with data-driven growth for brands."
        canonical="https://www.shreeramproduction.in/about"
        ogTitle="About Shree Ram Production — Creative Production & Growth Agency"
        ogDescription="Learn about Shree Ram Production — story, philosophy, capabilities and approach to blending cinematic craft with data-driven growth."
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

      {/* Cross-linking for sitelinks hierarchy */}
      <nav aria-label="Related pages" style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '32px 24px 48px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.9rem' }}>
        <Link to="/services" style={{ color: 'var(--accent-orange)', textDecoration: 'none', fontWeight: 600 }}>Explore Services — growth solutions</Link>
        <span style={{ color: 'var(--text-dim)' }} aria-hidden="true">•</span>
        <Link to="/work" style={{ color: 'var(--accent-orange)', textDecoration: 'none', fontWeight: 600 }}>View Work — projects & case studies</Link>
        <span style={{ color: 'var(--text-dim)' }} aria-hidden="true">•</span>
        <Link to="/contact" style={{ color: 'var(--accent-orange)', textDecoration: 'none', fontWeight: 600 }}>Contact — contact Shree Ram Production</Link>
      </nav>

      {/* FOOTER */}
      <Footer onNavigate={onNavigate} />
    </main>
  );
};

export default AboutPage;

