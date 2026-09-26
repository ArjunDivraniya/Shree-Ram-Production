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
import { ABOUT_SEO, ABOUT_JSON_LD } from '../data/seo';
import '../components/about/about.css';

interface AboutPageProps {
  onNavigate: (sectionId: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <main id="about-page" style={{ background: 'transparent' }}>
      <SEO
        title={ABOUT_SEO.title}
        description={ABOUT_SEO.description}
        canonical={ABOUT_SEO.canonical}
        ogTitle={ABOUT_SEO.ogTitle}
        ogDescription={ABOUT_SEO.ogDescription}
        ogImage="https://www.shreeramproduction.in/shreeramproduction-logo.png"
        jsonLd={ABOUT_JSON_LD}
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
      <nav aria-label="Related pages" className="sr-only">
        <Link to="/services">Explore Services — growth solutions</Link>
        <Link to="/work">View Work — projects & case studies</Link>
        <Link to="/contact">Contact — contact Shree Ram Production</Link>
      </nav>

      {/* FOOTER */}
      <Footer onNavigate={onNavigate} />
    </main>
  );
};

export default AboutPage;

