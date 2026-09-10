import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Portfolio } from '../components/Portfolio';
import { Footer } from '../components/Footer';
import { PORTFOLIO_ITEMS } from '../data/content';

interface WorkPageProps {
  onNavigate: (sectionId: string) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onNavigate }) => {
  const workJsonLd = [
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
          name: 'Our Work',
          item: 'https://www.shreeramproduction.in/work',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Our Work & Case Studies | Shree Ram Production',
      description:
        'Portfolio of selected creative production, branding, marketing growth, and web development projects created by Shree Ram Production.',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: PORTFOLIO_ITEMS.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            name: item.title,
            creator: {
              '@type': 'Organization',
              name: 'Shree Ram Production',
            },
            description: item.summary,
            image: item.thumbnail,
          },
        })),
      },
    },
  ];

  return (
    <main style={{ background: 'transparent', paddingTop: '100px' }}>
      <SEO
        title="Our Work & Projects | Shree Ram Production"
        description="Explore selected creative work and case studies from Shree Ram Production across production, branding, marketing and digital experiences."
        canonical="https://www.shreeramproduction.in/work"
        ogTitle="Our Work & Projects | Shree Ram Production"
        ogDescription="Explore selected creative work and case studies from Shree Ram Production across production, branding, marketing and digital experiences."
        ogImage="https://www.shreeramproduction.in/shreeramproduction-logo.png"
        jsonLd={workJsonLd}
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

