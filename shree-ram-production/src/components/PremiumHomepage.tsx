import React, { useState } from 'react';
import { Hero } from './Hero';
import { BrandStatement } from './BrandStatement';
import { ScrollDrivenPillars } from './ScrollDrivenPillars';
import { Portfolio } from './Portfolio';
import { ProcessFlywheel } from './ProcessFlywheel';
import { BehindTheScenes } from './BehindTheScenes';
import { ProjectCalculator } from './ProjectCalculator';
import { Testimonials } from './Testimonials';
import { ContactCTA } from './ContactCTA';
import { Footer } from './Footer';

interface PremiumHomepageProps {
  onNavigate: (sectionId: string) => void;
}

export const PremiumHomepage: React.FC<PremiumHomepageProps> = ({ onNavigate }) => {
  const [preselectedServices, setPreselectedServices] = useState<string[]>([]);

  return (
    <>
      <Hero onNavigate={onNavigate} />
      <BrandStatement onNavigate={onNavigate} />
      <ScrollDrivenPillars onNavigate={onNavigate} />
      <Portfolio />
      <ProcessFlywheel />
      <BehindTheScenes />
      <ProjectCalculator onSelectServices={setPreselectedServices} />
      <Testimonials />
      <ContactCTA preselectedServices={preselectedServices} />
      <Footer onNavigate={onNavigate} />
    </>
  );
};
