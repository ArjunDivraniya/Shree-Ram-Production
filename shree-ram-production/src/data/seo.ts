import { SERVICES_PILLARS } from './servicesData';
import { PORTFOLIO_ITEMS } from './content';

export const SITE_NAME = 'Shree Ram Production';
export const SITE_URL = 'https://www.shreeramproduction.in';
export const SITE_IMAGE = 'https://www.shreeramproduction.in/shreeramproduction-logo.png';

export const HOME_SEO = {
  title: 'Shree Ram Production | Creative Production & Digital Growth Agency',
  description:
    'Shree Ram Production — creative production, marketing & growth agency in Ahmedabad helping brands build visibility, acquire customers and scale digitally.',
  canonical: `${SITE_URL}/`,
  ogTitle: 'Shree Ram Production | Creative Production & Digital Growth Agency',
  ogDescription:
    'Shree Ram Production — creative production, marketing & growth agency in Ahmedabad helping brands build visibility, acquire customers and scale digitally.',
};

export const SERVICES_SEO = {
  title: 'Creative, Marketing & Digital Services | Shree Ram Production',
  description:
    "Explore Shree Ram Production's content & production, brand & creative, marketing & growth, and technology & digital services.",
  canonical: `${SITE_URL}/services`,
  ogTitle: 'Creative, Marketing & Digital Services | Shree Ram Production',
  ogDescription:
    "Explore Shree Ram Production's content & production, brand & creative, marketing & growth, and technology & digital services.",
};

export const WORK_SEO = {
  title: 'Our Work & Creative Projects | Shree Ram Production',
  description:
    'Explore selected creative work and case studies from Shree Ram Production across production, branding, marketing and digital experiences.',
  canonical: `${SITE_URL}/work`,
  ogTitle: 'Our Work & Creative Projects | Shree Ram Production',
  ogDescription:
    'Explore selected creative work and case studies from Shree Ram Production across production, branding, marketing and digital experiences.',
};

export const ABOUT_SEO = {
  title: 'About Us | Shree Ram Production — Creative & Digital Agency',
  description:
    'Learn about Shree Ram Production, its story, philosophy, capabilities and approach to creative production, marketing and growth.',
  canonical: `${SITE_URL}/about`,
  ogTitle: 'About Us | Shree Ram Production — Creative & Digital Agency',
  ogDescription:
    'Learn about Shree Ram Production, its story, philosophy, capabilities and approach to creative production, marketing and growth.',
};

export const CONTACT_SEO = {
  title: "Contact Us | Shree Ram Production — Let's Work Together",
  description:
    'Contact Shree Ram Production to discuss a project, request a growth plan or ask about creative, marketing and technology services.',
  canonical: `${SITE_URL}/contact`,
  ogTitle: "Contact Us | Shree Ram Production — Let's Work Together",
  ogDescription:
    'Contact Shree Ram Production to discuss a project, request a growth plan or ask about creative, marketing and technology services.',
};

export function createHomepageJsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: SITE_IMAGE,
      image: SITE_IMAGE,
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
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      inLanguage: 'en-IN',
    },
  ];
}

export function createServicesJsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: `${SITE_URL}/services`,
        },
      ],
    },
    ...SERVICES_PILLARS.map((pillar) => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: pillar.title,
      description: pillar.description,
      provider: {
        '@type': 'ProfessionalService',
        name: SITE_NAME,
        url: `${SITE_URL}/`,
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: pillar.title,
        itemListElement: pillar.services.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.name,
            description: s.description,
          },
        })),
      },
    })),
  ];
}

export function createWorkJsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Our Work',
          item: `${SITE_URL}/work`,
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
              name: SITE_NAME,
            },
            description: item.summary,
            image: item.thumbnail,
          },
        })),
      },
    },
  ];
}

export const ABOUT_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About Us',
        item: `${SITE_URL}/about`,
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Shree Ram Production',
    url: `${SITE_URL}/about`,
    description:
      'Learn about Shree Ram Production’s story, agency philosophy, team, capabilities, and strategic approach.',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: SITE_IMAGE,
    },
  },
];

export const CONTACT_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact Us',
        item: `${SITE_URL}/contact`,
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Shree Ram Production',
    url: `${SITE_URL}/contact`,
    description:
      'Contact page for Shree Ram Production for project inquiries, custom growth plans, video production, branding, and web development.',
    mainEntity: {
      '@type': 'ProfessionalService',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ahmedabad',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },
    },
  },
];