import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { Hero } from './Hero';
import { BrandStatement } from './BrandStatement';
import { ScrollDrivenPillars } from './ScrollDrivenPillars';
import { Portfolio } from './Portfolio';
import { ProcessFlywheel } from './ProcessFlywheel';
import { Testimonials } from './Testimonials';
import { ContactCTA } from './ContactCTA';
import { Footer } from './Footer';
import { ArrowUpRight } from 'lucide-react';

interface PremiumHomepageProps {
  onNavigate: (sectionId: string) => void;
}

export const PremiumHomepage: React.FC<PremiumHomepageProps> = ({ onNavigate }) => {
  const homepageJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Shree Ram Production',
      url: 'https://www.shreeramproduction.in/',
      logo: 'https://www.shreeramproduction.in/shreeramproduction-logo.png',
      image: 'https://www.shreeramproduction.in/shreeramproduction-logo.png',
      description:
        'Shree Ram Production — creative production, marketing & growth agency in Ahmedabad helping brands build visibility, acquire customers and scale digitally through Content & Production, Brand & Creative, Marketing & Growth and Technology & Digital services.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ahmedabad',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
      knowsAbout: [
        'Content & Production',
        'Brand & Creative',
        'Marketing & Growth',
        'Technology & Digital',
        'Photography',
        'Videography',
        'Brand Identity',
        'Logo Design',
        'Graphic Design',
        'Social Media Marketing',
        'SEO',
        'Meta Ads',
        'Google Ads',
        'Content Marketing',
        'Lead Generation',
        'Influencer Marketing',
        'Website Development',
        'E-commerce',
        'Web Applications',
        'UI/UX Design',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Shree Ram Production',
      url: 'https://www.shreeramproduction.in/',
      inLanguage: 'en-IN',
    },
  ];

  return (
    <main id="homepage" style={{ position: 'relative', background: 'transparent', isolation: 'isolate', overflow: 'clip' }}>
      <SEO
        title="Shree Ram Production — Creative Production, Marketing & Growth Agency"
        description="Shree Ram Production — creative production, marketing & growth agency in Ahmedabad helping brands build visibility, acquire customers and scale digitally."
        canonical="https://www.shreeramproduction.in/"
        ogTitle="Shree Ram Production — Creative Production, Marketing & Growth Agency"
        ogDescription="Shree Ram Production — creative production, marketing & growth agency in Ahmedabad helping brands build visibility, acquire customers and scale digitally."
        ogImage="https://www.shreeramproduction.in/shreeramproduction-logo.png"
        jsonLd={homepageJsonLd}
      />
      <Hero onNavigate={onNavigate} />
      <BrandStatement onNavigate={onNavigate} />
      <ScrollDrivenPillars onNavigate={onNavigate} />
      <Portfolio isHomepage={true} onNavigate={onNavigate} />
      <ProcessFlywheel />
      <Testimonials onNavigate={onNavigate} />

      {/* Sitelinks / Information Architecture — prominent semantic internal links to core pages */}
      <section aria-labelledby="explore-sitelinks-heading" style={{ padding: '72px 0 56px', background: 'transparent', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ maxWidth: '1140px' }}>
          <h2 id="explore-sitelinks-heading" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Explore Shree Ram Production
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '680px', marginBottom: '28px', lineHeight: 1.6 }}>
            Discover how we help businesses build brands and drive growth — browse services, work, company information and ways to get in touch.
          </p>
          <nav aria-label="Primary sections" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <Link to="/services" className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '20px 18px', textDecoration: 'none', borderRadius: '16px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#FFFFFF', fontSize: '1.05rem' }}>Services — Content, Brand, Marketing & Technology</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5 }}>Explore services across Content & Production, Brand & Creative, Marketing & Growth and Technology & Digital.</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--accent-orange)', fontWeight: 700, fontSize: '0.85rem', marginTop: '4px' }}>Explore services <ArrowUpRight size={14} aria-hidden="true" /></span>
            </Link>
            <Link to="/work" className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '20px 18px', textDecoration: 'none', borderRadius: '16px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#FFFFFF', fontSize: '1.05rem' }}>Work — Portfolio & Case Studies</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5 }}>Browse cinematic production, brand identities, performance funnels and web platforms we’ve built for clients.</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--accent-orange)', fontWeight: 700, fontSize: '0.85rem', marginTop: '4px' }}>View portfolio & case studies <ArrowUpRight size={14} aria-hidden="true" /></span>
            </Link>
            <Link to="/about" className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '20px 18px', textDecoration: 'none', borderRadius: '16px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#FFFFFF', fontSize: '1.05rem' }}>About Shree Ram Production</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5 }}>Learn about our story, team, philosophy and approach to blending craft with growth.</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--accent-orange)', fontWeight: 700, fontSize: '0.85rem', marginTop: '4px' }}>Learn about our company <ArrowUpRight size={14} aria-hidden="true" /></span>
            </Link>
            <Link to="/contact" className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '20px 18px', textDecoration: 'none', borderRadius: '16px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#FFFFFF', fontSize: '1.05rem' }}>Contact Shree Ram Production</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5 }}>Start a project, request a growth plan or talk to our creative, marketing & technology teams.</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--accent-orange)', fontWeight: 700, fontSize: '0.85rem', marginTop: '4px' }}>Contact our agency <ArrowUpRight size={14} aria-hidden="true" /></span>
            </Link>
          </nav>
        </div>
      </section>

      <ContactCTA />
      <Footer onNavigate={onNavigate} />
    </main>
  );
};



