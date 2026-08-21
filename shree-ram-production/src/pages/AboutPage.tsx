import React, { useEffect } from 'react';
import { AboutHero } from '../components/about/AboutHero';
import { AboutStory } from '../components/about/AboutStory';
import { AboutBeliefs } from '../components/about/AboutBeliefs';
import { AboutCapabilities } from '../components/about/AboutCapabilities';
import { AboutTeam } from '../components/about/AboutTeam';
import { AboutProcess } from '../components/about/AboutProcess';
import { AboutDifferentiation } from '../components/about/AboutDifferentiation';
import { AboutTrust } from '../components/about/AboutTrust';
import { AboutCTA } from '../components/about/AboutCTA';
import { Footer } from '../components/Footer';
import '../components/about/about.css';

interface AboutPageProps {
  onNavigate: (sectionId: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = 'About Us — Shree Ram Production | Creative Production, Branding, Marketing & Tech';
  }, []);

  return (
    <main id="about-page" style={{ backgroundColor: '#08090A' }}>
      <AboutHero />
      <AboutStory />
      <AboutBeliefs />
      <AboutCapabilities />
      <AboutTeam />
      <AboutProcess />
      <AboutDifferentiation />
      <AboutTrust />
      <AboutCTA />
      <Footer onNavigate={onNavigate} />
    </main>
  );
};

export default AboutPage;
