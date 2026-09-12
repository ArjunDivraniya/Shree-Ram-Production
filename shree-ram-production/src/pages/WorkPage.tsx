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
      <nav aria-label="Related pages" style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '32px 24px 48px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.9rem' }}>
        <Link to="/services" style={{ color: 'var(--accent-orange)', textDecoration: 'none', fontWeight: 600 }}>Explore Services — Content, Brand, Marketing & Technology</Link>
        <span style={{ color: 'var(--text-dim)' }} aria-hidden="true">•</span>
        <Link to="/about" style={{ color: 'var(--accent-orange)', textDecoration: 'none', fontWeight: 600 }}>About Shree Ram Production — company information</Link>
        <span style={{ color: 'var(--text-dim)' }} aria-hidden="true">•</span>
        <Link to="/contact" style={{ color: 'var(--accent-orange)', textDecoration: 'none', fontWeight: 600 }}>Contact — start your project</Link>
      </nav>
      <Footer onNavigate={onNavigate} />
    </main>
  );
};

