import type { PillarWithServices } from '../types';

export const SERVICES_PILLARS: PillarWithServices[] = [
  {
    id: 'content-production',
    number: '01',
    title: 'Content & Production',
    description:
      'Visual content and production capabilities — from cinematic films and product photography to reels, editing, and motion graphics engineered to captivate audiences.',
    services: [
      {
        id: 'photography',
        number: '01',
        name: 'Photography',
        description:
          'High-end commercial, product, and editorial photography with precision lighting, composition, and post-production — crafted for campaigns, e-commerce, and brand storytelling.',
        projectIds: ['chronos-watch-film', 'aura-luxury-rebrand', 'elysium-spirits-packaging'],
      },
      {
        id: 'videography',
        number: '02',
        name: 'Videography',
        description:
          'Cinematic video production from concept to final delivery — commercial films, brand documentaries, and narrative content shot on cinema-grade equipment.',
        projectIds: ['apex-hypercar-launch', 'chronos-watch-film', 'vanguard-3d-reveal'],
      },
      {
        id: 'reels',
        number: '03',
        name: 'Reels',
        description:
          'High-velocity short-form content optimized for Instagram, TikTok, and YouTube Shorts — hook-driven edits designed for maximum reach and engagement.',
        projectIds: ['solace-reel-series', 'apex-hypercar-launch', 'kuro-viral-growth'],
      },
      {
        id: 'product-shoots',
        number: '04',
        name: 'Product Shoots',
        description:
          'Studio and on-location product photography and video — macro detail capture, lifestyle contexts, and e-commerce-ready assets that drive conversion.',
        projectIds: ['chronos-watch-film', 'elysium-spirits-packaging', 'solace-reel-series'],
      },
      {
        id: 'promotional-videos',
        number: '05',
        name: 'Promotional Videos',
        description:
          'Brand-forward promotional films and campaign videos that communicate value, build desire, and deliver measurable commercial impact across channels.',
        projectIds: ['apex-hypercar-launch', 'vanguard-3d-reveal', 'velox-sky-identity'],
      },
      {
        id: 'video-editing',
        number: '06',
        name: 'Video Editing',
        description:
          'Professional post-production including color grading, sound design, pacing, and multi-format delivery — transforming raw footage into polished final assets.',
        projectIds: ['apex-hypercar-launch', 'chronos-watch-film', 'apex-geneva-event'],
      },
      {
        id: 'motion-graphics',
        number: '07',
        name: 'Motion Graphics',
        description:
          '3D motion design, animated typography, and visual effects that elevate brand communication — from title sequences to product reveal animations.',
        projectIds: ['vanguard-3d-reveal', 'lumina-interactive-platform', 'apex-hypercar-launch'],
      },
      {
        id: 'event-coverage',
        number: '08',
        name: 'Event Coverage',
        description:
          'Multi-camera event documentation, live content capture, and same-day social deliverables for launches, conferences, and brand activations.',
        projectIds: ['apex-geneva-event', 'apex-hypercar-launch', 'velox-sky-identity'],
      },
    ],
  },
  {
    id: 'brand-creative',
    number: '02',
    title: 'Brand & Creative',
    description:
      'Brand identity, design, and creative capabilities — defining visual systems, art direction, and design language that elevates market position.',
    services: [
      {
        id: 'brand-identity',
        number: '01',
        name: 'Brand Identity',
        description:
          'Complete brand architecture — positioning, visual identity systems, tone of voice, and brand guidelines that unify every customer touchpoint.',
        projectIds: ['aura-luxury-rebrand', 'velox-sky-identity', 'elysium-spirits-packaging'],
      },
      {
        id: 'logo-design',
        number: '02',
        name: 'Logo Design',
        description:
          'Distinctive logo suites and mark systems — primary, secondary, and responsive variants engineered for digital, print, and physical applications.',
        projectIds: ['velox-sky-identity', 'aura-luxury-rebrand', 'nexus-fintech-ecosystem'],
      },
      {
        id: 'graphic-design',
        number: '03',
        name: 'Graphic Design',
        description:
          'Editorial layouts, campaign collateral, and visual communication assets — typography-driven design with meticulous craft and commercial clarity.',
        projectIds: ['kuro-creative-toolkit', 'aura-luxury-rebrand', 'velox-sky-identity'],
      },
      {
        id: 'social-media-creatives',
        number: '04',
        name: 'Social Media Creatives',
        description:
          'Platform-native creative templates, ad visuals, and content series designed for consistent brand presence across social channels.',
        projectIds: ['kuro-creative-toolkit', 'solaris-performance-growth', 'solace-reel-series'],
      },
      {
        id: 'packaging-design',
        number: '05',
        name: 'Packaging Design',
        description:
          'Product packaging, unboxing experiences, and retail-ready design — tactile finishes and structural design that commands shelf presence.',
        projectIds: ['elysium-spirits-packaging', 'aura-luxury-rebrand', 'chronos-watch-film'],
      },
      {
        id: 'ui-ux-design',
        number: '06',
        name: 'UI/UX Design',
        description:
          'User-centered interface design for web and mobile — intuitive flows, design systems, and pixel-perfect prototypes that convert.',
        projectIds: ['nexus-fintech-ecosystem', 'lumina-interactive-platform', 'aether-headless-commerce'],
      },
      {
        id: 'marketing-creatives',
        number: '07',
        name: 'Marketing Creatives',
        description:
          'Campaign creative toolkits — ad visuals, landing page design, email templates, and omnichannel assets built for performance.',
        projectIds: ['kuro-creative-toolkit', 'solaris-performance-growth', 'apex-hypercar-launch'],
      },
    ],
  },
  {
    id: 'marketing-growth',
    number: '03',
    title: 'Marketing & Growth',
    description:
      'Marketing, SEO, advertising, and growth capabilities — data-driven strategies that transform creative assets into repeatable revenue.',
    services: [
      {
        id: 'social-media-marketing',
        number: '01',
        name: 'Social Media Marketing',
        description:
          'Organic social strategy, content calendars, community management, and platform growth — building engaged audiences that convert.',
        projectIds: ['solaris-performance-growth', 'kuro-viral-growth', 'solace-reel-series'],
      },
      {
        id: 'seo',
        number: '02',
        name: 'SEO',
        description:
          'Technical SEO audits, keyword strategy, on-page optimization, and content architecture — driving sustainable organic traffic growth.',
        projectIds: ['titan-seo-domination', 'solaris-performance-growth', 'lumina-interactive-platform'],
      },
      {
        id: 'meta-ads',
        number: '03',
        name: 'Meta Ads',
        description:
          'Facebook and Instagram paid acquisition — creative testing, audience targeting, retargeting funnels, and ROAS-optimized campaign scaling.',
        projectIds: ['kuro-viral-growth', 'solaris-performance-growth', 'pulse-cro-engine'],
      },
      {
        id: 'google-ads',
        number: '04',
        name: 'Google Ads',
        description:
          'Search, display, and YouTube advertising — keyword strategy, bid optimization, and landing page alignment for qualified lead generation.',
        projectIds: ['solaris-performance-growth', 'titan-seo-domination', 'velox-sky-identity'],
      },
      {
        id: 'content-marketing',
        number: '05',
        name: 'Content Marketing',
        description:
          'Strategic content production and distribution — blogs, video series, and thought leadership that builds authority and nurtures prospects.',
        projectIds: ['titan-seo-domination', 'solaris-performance-growth', 'kuro-creative-toolkit'],
      },
      {
        id: 'lead-generation',
        number: '06',
        name: 'Lead Generation',
        description:
          'Full-funnel lead capture systems — high-converting landing pages, form optimization, and nurture sequences that fill your pipeline.',
        projectIds: ['solaris-performance-growth', 'pulse-cro-engine', 'nexus-fintech-ecosystem'],
      },
      {
        id: 'influencer-marketing',
        number: '07',
        name: 'Influencer Marketing',
        description:
          'Creator partnerships, influencer campaign strategy, and UGC programs — authentic amplification that reaches new audiences at scale.',
        projectIds: ['kuro-viral-growth', 'solace-reel-series', 'apex-hypercar-launch'],
      },
      {
        id: 'conversion-optimization',
        number: '08',
        name: 'Conversion Optimization',
        description:
          'CRO audits, A/B testing, and funnel optimization — data-backed iterations that reduce acquisition cost and increase conversion rates.',
        projectIds: ['pulse-cro-engine', 'solaris-performance-growth', 'nexus-fintech-ecosystem'],
      },
    ],
  },
  {
    id: 'technology-digital',
    number: '04',
    title: 'Technology & Digital',
    description:
      'Web, app, UI/UX, and digital technology capabilities — ultra-fast platforms, custom applications, and automated systems that scale with your business.',
    services: [
      {
        id: 'website-development',
        number: '01',
        name: 'Website Development',
        description:
          'Custom website engineering with modern frameworks — blazing performance, SEO-ready architecture, and CMS integration built for growth.',
        projectIds: ['lumina-interactive-platform', 'aether-headless-commerce', 'nexus-fintech-ecosystem'],
      },
      {
        id: 'e-commerce',
        number: '02',
        name: 'E-commerce',
        description:
          'Headless storefronts, product configurators, and checkout optimization — digital commerce experiences that maximize average order value.',
        projectIds: ['aether-headless-commerce', 'lumina-interactive-platform', 'aura-luxury-rebrand'],
      },
      {
        id: 'web-applications',
        number: '03',
        name: 'Web Applications',
        description:
          'Custom SaaS platforms, dashboards, and interactive web apps — React/Vite engineering with real-time data and seamless UX.',
        projectIds: ['nexus-fintech-ecosystem', 'lumina-interactive-platform', 'zenith-crm-automation'],
      },
      {
        id: 'mobile-applications',
        number: '04',
        name: 'Mobile Applications',
        description:
          'Cross-platform mobile app development — native-feel experiences with offline support, push notifications, and app store deployment.',
        projectIds: ['nexus-fintech-ecosystem', 'pulse-cro-engine', 'velox-sky-identity'],
      },
      {
        id: 'landing-pages',
        number: '05',
        name: 'Landing Pages',
        description:
          'High-converting campaign landing pages — speed-optimized, A/B test ready, and integrated with your ad and analytics stack.',
        projectIds: ['solaris-performance-growth', 'pulse-cro-engine', 'nexus-fintech-ecosystem'],
      },
      {
        id: 'dashboards',
        number: '06',
        name: 'Dashboards',
        description:
          'Real-time analytics dashboards and admin panels — data visualization, role-based access, and actionable insights at a glance.',
        projectIds: ['nexus-fintech-ecosystem', 'zenith-crm-automation', 'lumina-interactive-platform'],
      },
      {
        id: 'crm',
        number: '07',
        name: 'CRM',
        description:
          'Custom CRM architectures and pipeline management tools — tailored to your sales process, integrations, and team workflows.',
        projectIds: ['zenith-crm-automation', 'nexus-fintech-ecosystem', 'solaris-performance-growth'],
      },
      {
        id: 'business-automation',
        number: '08',
        name: 'Business Automation',
        description:
          'Workflow automation, API integrations, and AI-driven pipelines — eliminating manual tasks and connecting your business systems.',
        projectIds: ['zenith-crm-automation', 'solaris-performance-growth', 'nexus-fintech-ecosystem'],
      },
    ],
  },
];
