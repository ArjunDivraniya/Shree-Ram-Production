import React from 'react';
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
  return (
    <div style={{ position: 'relative', background: 'transparent', isolation: 'isolate', overflow: 'clip' }}>
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


