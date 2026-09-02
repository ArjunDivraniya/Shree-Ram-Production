import React from 'react';
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
        title="Our Work & Case Studies | Creative Production & Growth Projects | Shree Ram Production"
        description="Browse selected work and client case studies by Shree Ram Production. Discover cinematic films, luxury rebrands, 8x growth funnels, and custom web apps."
        canonical="https://www.shreeramproduction.in/work"
        ogTitle="Our Work & Case Studies | Creative Production & Growth Projects | Shree Ram Production"
        ogDescription="Explore real client results & case studies. From high-budget launch films and luxury rebrands to 8x paid ad scaling and headless e-commerce builds."
        ogImage="https://www.shreeramproduction.in/shreeramproduction-logo.png"
        jsonLd={workJsonLd}
      />
      <Portfolio isHomepage={false} />
      <Footer onNavigate={onNavigate} />
    </main>
  );
};

