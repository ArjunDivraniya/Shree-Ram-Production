export interface PillarData {
  id: string;
  number: string; // "01", "02", "03", "04"
  title: string;
  tagline: string;
  bgText: string;
  description: string;
  services: string[];
  leftServices: string[];
  rightServices: string[];
  image: string;
  badge: string;
}

export const PILLARS_DATA: PillarData[] = [
  {
    id: 'content-production',
    number: '01',
    title: 'Content & Production',
    tagline: 'Cinematic Storytelling & High-Impact Media',
    bgText: 'CONTENT & PRODUCTION',
    description: 'High-concept commercial films, video reels, studio product photography, and motion graphics engineered to captivate audiences.',
    services: [
      'Photography',
      'Videography',
      'Reels',
      'Product Shoots',
      'Promotional Videos',
      'Video Editing',
      'Motion Graphics',
      'Event Coverage',
    ],
    leftServices: ['Photography', 'Videography', 'Reels', 'Product Shoots'],
    rightServices: ['Promotional Videos', 'Video Editing', 'Motion Graphics', 'Event Coverage'],
    image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=1600&q=85',
    badge: 'Cinema & Studio',
  },
  {
    id: 'brand-creative',
    number: '02',
    title: 'Brand & Creative',
    tagline: 'Identity, Visual Strategy & Art Direction',
    bgText: 'BRAND & CREATIVE',
    description: 'Defining distinct brand identities, visual systems, packaging, and digital UI/UX that elevate market position.',
    services: [
      'Brand Identity',
      'Logo Design',
      'Graphic Design',
      'Social Media Creatives',
      'Packaging Design',
      'UI/UX Design',
      'Marketing Creatives',
    ],
    leftServices: ['Brand Identity', 'Logo Design', 'Graphic Design', 'Social Media Creatives'],
    rightServices: ['Packaging Design', 'UI/UX Design', 'Marketing Creatives'],
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1600&q=85',
    badge: 'Brand Architecture',
  },
  {
    id: 'marketing-growth',
    number: '03',
    title: 'Marketing & Growth',
    tagline: 'Performance Ad Engines & Audience Scaling',
    bgText: 'MARKETING & GROWTH',
    description: 'Data-driven omnichannel marketing, paid ad acquisition, search engine optimization, and viral content funnels.',
    services: [
      'Social Media Marketing',
      'SEO',
      'Meta Ads',
      'Google Ads',
      'Content Marketing',
      'Lead Generation',
      'Influencer Marketing',
      'Conversion Optimization',
    ],
    leftServices: ['Social Media Marketing', 'SEO', 'Local SEO', 'Meta Ads', 'Google Ads'],
    rightServices: ['Content Marketing', 'Lead Generation', 'Influencer Marketing', 'Conversion Optimization'],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=85',
    badge: 'Growth Engine',
  },
  {
    id: 'technology-digital',
    number: '04',
    title: 'Technology & Digital',
    tagline: 'Custom Web Apps, Systems & Engineering',
    bgText: 'TECHNOLOGY & DIGITAL',
    description: 'Ultra-fast web platforms, e-commerce stores, custom SaaS applications, CRM architectures, and automated business workflows.',
    services: [
      'Website Development',
      'E-commerce',
      'Web Applications',
      'Mobile Applications',
      'Landing Pages',
      'Dashboards',
      'CRM',
      'Business Automation',
    ],
    leftServices: ['Website Development', 'E-commerce', 'Web Applications', 'Mobile Applications'],
    rightServices: ['Landing Pages', 'Dashboards', 'CRM', 'Business Automation'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=85',
    badge: 'Digital Lab',
  },
];
