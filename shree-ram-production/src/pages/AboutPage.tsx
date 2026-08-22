import React, { useEffect } from 'react';
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
    document.title = 'About Us — Shree Ram Production | Cinematic Agency';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="about-page" style={{ backgroundColor: '#08090A' }}>
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
