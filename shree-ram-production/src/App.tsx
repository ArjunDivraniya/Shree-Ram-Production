import { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStatement } from './components/BrandStatement';
import { ServicesShowcase } from './components/ServicesShowcase';
import { Portfolio } from './components/Portfolio';
import { ProcessFlywheel } from './components/ProcessFlywheel';
import { BehindTheScenes } from './components/BehindTheScenes';
import { ProjectCalculator } from './components/ProjectCalculator';
import { Testimonials } from './components/Testimonials';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';

export function App() {
  const [selectedBriefServices, setSelectedBriefServices] = useState<string[]>([]);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServicesFromCalculator = (titles: string[]) => {
    setSelectedBriefServices(titles);
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#08090A' }}>
      {/* Desktop Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Floating Glass Navigation */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main Content Sections */}
      <main>
        <Hero onNavigate={handleNavigate} />
        <BrandStatement onNavigate={handleNavigate} />
        <ServicesShowcase onNavigate={handleNavigate} />
        <Portfolio />
        <ProcessFlywheel />
        <BehindTheScenes />
        <ProjectCalculator onSelectServices={handleServicesFromCalculator} />
        <Testimonials />
        <ContactCTA preselectedServices={selectedBriefServices} />
      </main>

      {/* Studio Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
