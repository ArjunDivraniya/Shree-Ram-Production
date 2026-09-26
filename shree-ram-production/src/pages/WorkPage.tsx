import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Portfolio } from '../components/Portfolio';
import { Footer } from '../components/Footer';
import { WORK_SEO, createWorkJsonLd } from '../data/seo';

interface WorkPageProps {
  onNavigate: (sectionId: string) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onNavigate }) => {
  return (
    <main style={{ background: 'transparent', paddingTop: '100px' }}>
      <SEO
        title={WORK_SEO.title}
        description={WORK_SEO.description}
        canonical={WORK_SEO.canonical}
        ogTitle={WORK_SEO.ogTitle}
        ogDescription={WORK_SEO.ogDescription}
        ogImage="https://www.shreeramproduction.in/shreeramproduction-logo.png"
        jsonLd={createWorkJsonLd()}
      />
      <Portfolio isHomepage={false} />
      <nav aria-label="Related pages" className="sr-only">
        <Link to="/services">Explore Services — Content, Brand, Marketing & Technology</Link>
        <Link to="/about">About Shree Ram Production — company information</Link>
        <Link to="/contact">Contact — start your project</Link>
      </nav>
      <Footer onNavigate={onNavigate} />
    </main>
  );
};

