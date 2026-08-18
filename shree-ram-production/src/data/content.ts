import type { ServicePillar, PortfolioItem, ProcessStep, Testimonial, BehindTheScenesItem, CalculatorOption } from '../types';

export const HERO_STATS = [
  { label: 'Client Value Generated', value: '$50M+' },
  { label: 'Global Campaigns Executed', value: '250+' },
  { label: 'Avg ROI Growth', value: '4.8x' },
  { label: 'Creative Excellence Rate', value: '99.4%' },
];

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'content-production',
    number: '01',
    title: 'Content & Production',
    tagline: 'Cinematic Storytelling & Visual Craft',
    description: 'From high-concept commercial films and brand documentaries to high-frequency social content and post-production visual effects. We shoot and edit visuals that captivate audiences.',
    capabilities: [
      'Commercial Video Production',
      'Brand Story Documentaries',
      'High-End Photography',
      '3D Motion & VFX',
      'Post-Production & Sound Design',
      'Social Content Engine'
    ],
    image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=1200&q=80',
    badge: 'Production Studio'
  },
  {
    id: 'brand-creative',
    number: '02',
    title: 'Brand & Creative',
    tagline: 'Identity, Strategy & Art Direction',
    description: 'We position brands to stand out and dominate their sector. Defining your visual identity, positioning, graphic direction, and messaging for meaningful commercial impact.',
    capabilities: [
      'Brand Strategy & Positioning',
      'Visual Identity & Systems',
      'Creative Direction',
      'Packaging & Product Design',
      'Editorial & Typography Systems',
      'Campaign Brand Toolkits'
    ],
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    badge: 'Brand Architecture'
  },
  {
    id: 'marketing-growth',
    number: '03',
    title: 'Marketing & Growth',
    tagline: 'Performance, Omnichannel & Audience Acquisition',
    description: 'We transform creative assets into repeatable revenue. Direct-response advertising, organic content funnels, influencer campaigns, and data-backed performance scaling.',
    capabilities: [
      'Paid Acquisition (Meta, Google, TikTok)',
      'Omnichannel Growth Funnels',
      'Organic Content & Viral Distribution',
      'Influencer & Creator Partnerships',
      'Conversion Rate Optimization (CRO)',
      'Customer Retention & Lifecycle'
    ],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    badge: 'Growth Engine'
  },
  {
    id: 'technology-digital',
    number: '04',
    title: 'Technology & Digital',
    tagline: 'Next-Gen Web Apps & Interactive Platforms',
    description: 'We engineer ultra-fast, high-converting digital platforms, custom web applications, e-commerce storefronts, and AI-driven growth tools that deliver seamless user experiences.',
    capabilities: [
      'Custom Web & App Engineering',
      'Headless E-Commerce Solutions',
      'Interactive WebGL & 3D Web Apps',
      'Custom CRM & Automation Pipelines',
      'AI Workflows & Interactive Tools',
      'High-Performance Speed Optimization'
    ],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    badge: 'Digital Lab'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'apex-hypercar-launch',
    title: 'Apex Velocity — Global Launch Campaign',
    client: 'Apex Automotive',
    category: 'production',
    categoryLabel: 'Cinematic Production',
    year: '2026',
    thumbnail: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'Video Views', value: '14.2M+' },
    summary: 'A 90-second cinematic launch film shot across Iceland and Dubai desert tracks, highlighting raw power and engineering precision.',
    deliverables: ['Launch Film', '3D Motion Graphics', 'Social Cutdowns', 'Billboard Photography'],
    challenge: 'Launch a high-end luxury electric hypercar into a saturated European & Middle Eastern market with maximum visual distinction.',
    solution: 'Engineered a dark, high-contrast narrative campaign pairing classical acoustic scores with ultra-high frame rate camera rigs.'
  },
  {
    id: 'aura-luxury-rebrand',
    title: 'Aura Living — Global Brand Architecture',
    client: 'Aura Lifestyle Co.',
    category: 'branding',
    categoryLabel: 'Brand & Creative',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'Brand Equity Increase', value: '210%' },
    summary: 'Complete brand overhaul including editorial typography, luxury physical collateral, visual system guidelines, and e-commerce packaging.',
    deliverables: ['Visual Identity System', 'Brand Book', 'Packaging Design', 'Digital Style Guide'],
    challenge: 'Unify 5 disjointed sub-brands under a single cohesive luxury lifestyle umbrella brand.',
    solution: 'Designed an elegant, minimalist visual language leveraging custom serif typography and warm muted color palettes.'
  },
  {
    id: 'solaris-performance-growth',
    title: 'Solaris Energy — 8x Acquisition Scale',
    client: 'Solaris Tech',
    category: 'marketing',
    categoryLabel: 'Marketing & Growth',
    year: '2026',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'Qualified Leads', value: '42,000+' },
    summary: 'Omnichannel performance marketing engine driving B2B & consumer solar subscriptions with a 38% reduction in customer acquisition cost.',
    deliverables: ['Meta & Google Ad Funnel', 'High-Converting Landing Pages', 'Email Nurture Sequences'],
    challenge: 'Reduce rising CAC in competitive US and European renewable energy markets while scaling volume.',
    solution: 'Created 50+ video ad variations with localized copy and AI-optimized retargeting audiences.'
  },
  {
    id: 'lumina-interactive-platform',
    title: 'Lumina Spatial — Web3D Digital Platform',
    client: 'Lumina Tech',
    category: 'technology',
    categoryLabel: 'Technology & Digital',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'Session Duration', value: '6m 40s' },
    summary: 'An interactive 3D WebGL product customizer and high-performance digital store built for next-generation spatial computing.',
    deliverables: ['Custom WebGL Canvas', 'React/Vite Frontend', 'Tailored Headless API'],
    challenge: 'Render high-density 3D models seamlessly on mobile web browsers without dropping below 60fps.',
    solution: 'Developed custom shader optimization algorithms and responsive asset compression pipelines.'
  },
  {
    id: 'chronos-watch-film',
    title: 'Chronos — The Masterpiece Timepiece',
    client: 'Chronos Horology',
    category: 'production',
    categoryLabel: 'Content & Production',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'Sales Lift', value: '340%' },
    summary: 'Macro video production exploring the micro-engineering behind handcrafted luxury timepieces.',
    deliverables: ['Product Reel', 'Social Teaser Series', 'E-commerce Video Cards'],
    challenge: 'Highlight intricate watch movements down to 10-micron tolerance levels in cinema format.',
    solution: 'Used specialized probe lenses, motorized macro track systems, and focus-stacking video capture.'
  },
  {
    id: 'nexus-fintech-ecosystem',
    title: 'Nexus Bank — Next-Gen Digital Experience',
    client: 'Nexus Financial',
    category: 'technology',
    categoryLabel: 'Technology & Digital',
    year: '2026',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'User Conversion', value: '+145%' },
    summary: 'Re-engineering the onboarding and interactive wealth dashboard for over 500,000 active fintech clients.',
    deliverables: ['Web Application', 'Design System Library', 'Real-time Analytics UI'],
    challenge: 'Simplify complex financial portfolios into an intuitive, ultra-fast web interface.',
    solution: 'Architected a modular component library with real-time WebSocket data updates and zero layout shift.'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    phase: 'DISCOVER & STRATEGIZE',
    title: 'Deconstruct & Define',
    description: 'We audit your market positioning, current content footprint, unit economics, and competitive gaps. We map a custom growth architecture tailored specifically to your objectives.',
    outcomes: ['Strategic Growth Blueprint', 'Audience Insights Audit', 'Core Messaging System'],
    accentTag: 'Phase 01'
  },
  {
    number: '02',
    phase: 'PRODUCTION & CRAFT',
    title: 'Create & Engineer',
    description: 'Our creative directors, cinematographers, brand designers, and software engineers craft bespoke visual assets and digital experiences with relentless attention to detail.',
    outcomes: ['High-End Visual Assets', 'Brand Design System', 'Digital Platform Build'],
    accentTag: 'Phase 02'
  },
  {
    number: '03',
    phase: 'LAUNCH & AMPLIFY',
    title: 'Deploy & Distribute',
    description: 'We orchestrate omnichannel launch campaigns across digital media, social networks, performance advertising channels, and high-converting funnel infrastructure.',
    outcomes: ['Omnichannel Campaign Launch', 'Paid Acquisition Funnel', 'PR & Content Blitz'],
    accentTag: 'Phase 03'
  },
  {
    number: '04',
    phase: 'SCALE & OPTIMIZE',
    title: 'Analyze & Compound',
    description: 'Using real-time telemetry and attribution modeling, we iterate on creative hooks, optimize landing pages, and scale your spend to compound your return on investment.',
    outcomes: ['Continuous CRO Iterations', 'Scalable Lead Engine', 'Long-term Brand Equity'],
    accentTag: 'Phase 04'
  }
];

export const BEHIND_THE_SCENES: BehindTheScenesItem[] = [
  {
    id: 'bts-1',
    title: 'Red V-Raptor 8K Camera Setup',
    category: 'Cinematography',
    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
    caption: 'Rigging cinema lenses for macro vehicle lighting sequences.'
  },
  {
    id: 'bts-2',
    title: 'Color Grading Suite',
    category: 'Post-Production',
    image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=800&q=80',
    caption: 'Precision DaVinci Resolve color passes for broadcast commercials.'
  },
  {
    id: 'bts-3',
    title: 'Brand Workshop & Type Specs',
    category: 'Creative Direction',
    image: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=800&q=80',
    caption: 'Drafting custom typographic grids and tactile print finishes.'
  },
  {
    id: 'bts-4',
    title: 'On-Set Lighting Rig',
    category: 'Studio Production',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    caption: 'Controlling 10,000W RGB LED arrays for ultra-clean rim lighting.'
  }
];

export const CALCULATOR_OPTIONS: CalculatorOption[] = [
  {
    id: 'opt-commercial-film',
    title: 'Cinematic Commercial Film',
    pillar: 'Content & Production',
    description: 'High-end scripted TV/digital commercial production with cinema camera rigs and full post-production.',
    estimatedTimeline: '3–4 Weeks',
    impactTier: 'Transformational'
  },
  {
    id: 'opt-brand-rebrand',
    title: 'Complete Brand Identity System',
    pillar: 'Brand & Creative',
    description: 'Full visual identity overhaul, logo suite, typography hierarchy, brand guidelines, and collateral templates.',
    estimatedTimeline: '4–6 Weeks',
    impactTier: 'Transformational'
  },
  {
    id: 'opt-growth-funnel',
    title: 'Omnichannel Paid Acquisition Funnel',
    pillar: 'Marketing & Growth',
    description: 'Ad creative strategy, high-converting copy, funnel build, Meta/Google ad account setup, and scaling.',
    estimatedTimeline: '2–3 Weeks',
    impactTier: 'High Growth'
  },
  {
    id: 'opt-custom-web',
    title: 'Next-Gen Interactive Web Platform',
    pillar: 'Technology & Digital',
    description: 'Custom React/Vite web application with bespoke animations, CMS integration, and speed optimization.',
    estimatedTimeline: '4–5 Weeks',
    impactTier: 'Enterprise Scale'
  },
  {
    id: 'opt-social-engine',
    title: 'Monthly High-Velocity Content Engine',
    pillar: 'Content & Production',
    description: 'Batch production of 20+ short-form videos, reels, and editorial photos produced and edited monthly.',
    estimatedTimeline: 'Ongoing Monthly',
    impactTier: 'High Growth'
  },
  {
    id: 'opt-full-growth-partner',
    title: 'Full-Stack Growth Partner Retainer',
    pillar: 'Combined Growth Solution',
    description: 'Dedicated team across all 4 pillars: Content, Branding, Growth Marketing & Tech development.',
    estimatedTimeline: 'Quarterly Partnership',
    impactTier: 'Enterprise Scale'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'WHEN WE TALK ABOUT SHREE RAM PRODUCTION WE DO NOT MEAN A TYPICAL BUSINESS PARTNER, BUT RATHER A TEAM THAT COLLABORATES WITH US DAILY, ALWAYS THERE FOR US WHEN WE ENCOUNTER DIFFICULTIES AND CELEBRATE ACHIEVEMENTS. WE SEE IN SHAPE OUR BEST ALLY FOR SUCCESS!',
    author: 'Charlie Heaton',
    role: 'Managing Director & Strategic Partner',
    company: 'Agtex Global',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
    impactMetric: '14.2M+',
    metricLabel: 'Campaign Views',
    projectTag: 'Global Rebrand',
    location: 'London, UK'
  },
  {
    id: 'test-2',
    quote: 'SHREE RAM PRODUCTION DOESN’T JUST DELIVER VIDEOS OR WEBSITES—THEY TOOK OUR BRAND FROM AN AVERAGE COMPETITOR TO THE UNDISPUTED CATEGORY LEADER IN UNDER 6 MONTHS. THE ROI ON OUR CAMPAIGNS EXCEEDED ALL PROJECTED TARGETS!',
    author: 'Vikramaditya Shah',
    role: 'Chief Marketing Officer',
    company: 'Apex Motors Global',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
    impactMetric: '210%',
    metricLabel: 'Equity Growth',
    projectTag: 'Cinematic Production',
    location: 'Mumbai, India'
  },
  {
    id: 'test-3',
    quote: 'THE LEVEL OF CINEMATIC QUALITY COMBINED WITH RIGOROUS PERFORMANCE MARKETING METRICS IS UNLIKE ANY AGENCY WE HAVE PARTNERED WITH BEFORE. TRULY A COMPLETE GROWTH ENGINE THAT ELEVATED OUR GLOBAL BRAND.',
    author: 'Elena Rostova',
    role: 'Founder & Creative Director',
    company: 'Aura Lifestyle Group',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    impactMetric: '4.8x',
    metricLabel: 'Customer ROI',
    projectTag: 'Omnichannel Growth',
    location: 'Milan, Italy'
  },
  {
    id: 'test-4',
    quote: 'THEIR TECHNICAL EXECUTION ON OUR WEB PLATFORM WAS FLAWLESS, WHILE THE BRAND VISUAL ASSETS MADE US LOOK LIKE A FORTUNE 500 COMPANY ON DAY ONE OF OUR PRODUCT LAUNCH. EXTRAORDINARY CRAFTSMANSHIP!',
    author: 'Devendra Kothari',
    role: 'Head of Product Technology',
    company: 'Nexus Financials',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80',
    impactMetric: '340%',
    metricLabel: 'Sales Lift',
    projectTag: 'Digital Platform',
    location: 'Dubai, UAE'
  }
];

