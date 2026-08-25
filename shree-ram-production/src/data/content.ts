import type { ServicePillar, PortfolioItem, ProcessStep, Testimonial, BehindTheScenesItem, CalculatorOption } from '../types';
import { SERVICES_PILLARS } from './servicesData';

const _heroServiceCount = SERVICES_PILLARS.reduce((acc, p) => acc + p.services.length, 0);

export const HERO_STATS = [
  { label: 'CORE PILLARS', value: '04' },
  { label: 'CREATIVE & DIGITAL SERVICES', value: `${_heroServiceCount}+` },
  { label: 'FLEXIBLE GROWTH PARTNER', value: '01' },
  { label: 'WAYS TO BUILD & GROW', value: '∞' },
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
  // PRODUCTION
  {
    id: 'apex-hypercar-launch',
    title: 'Apex Velocity — Global Launch Film',
    client: 'Apex Automotive',
    category: 'production',
    categoryLabel: 'Cinematic Production',
    year: '2026',
    thumbnail: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'Video Views', value: '14.2M+' },
    summary: 'A 90-second cinematic launch film shot across Iceland and Dubai desert tracks, highlighting raw power and engineering precision.',
    deliverables: ['Launch Film', '3D Motion Graphics', 'Social Cutdowns', 'Billboard Photography'],
    challenge: 'Launch a luxury electric hypercar into a competitive European & Middle Eastern market with maximum visual distinction.',
    solution: 'Engineered a high-contrast narrative campaign pairing classical acoustic scores with ultra-high frame rate cinema rigs.'
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
    summary: 'Macro photography and high-speed cinema exploring the micro-engineering behind handcrafted luxury timepieces.',
    deliverables: ['Product Reel', 'Social Teaser Series', 'Macro Photography', 'E-commerce Video Cards'],
    challenge: 'Highlight intricate watch movements down to 10-micron tolerance levels in cinema format.',
    solution: 'Used specialized probe lenses, motorized macro track systems, and focus-stacking video capture.'
  },
  {
    id: 'vanguard-3d-reveal',
    title: 'Vanguard Motors — Kinetic 3D Motion Reveal',
    client: 'Vanguard Mobility',
    category: 'production',
    categoryLabel: '3D & Motion',
    year: '2026',
    thumbnail: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'Social Shares', value: '450K+' },
    summary: 'Full 3D motion design reveal for Vanguard’s autonomous concept vehicle, featured at international auto expos.',
    deliverables: ['3D Teaser Film', 'Motion Graphics Package', 'HUD Interface FX'],
    challenge: 'Build hype for an unreleased concept vehicle using purely CGI assets before physical prototypes existed.',
    solution: 'Architected photorealistic CAD renders, custom particle systems, and dynamic lighting transitions.'
  },
  {
    id: 'solace-reel-series',
    title: 'Solace Audio — High-Velocity Short Form Content',
    client: 'Solace Acoustics',
    category: 'production',
    categoryLabel: 'Reels & Social Content',
    year: '2026',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'Organic Impressions', value: '8.9M' },
    summary: 'A monthly high-frequency short-form video engine delivering 30+ reels and TikToks tailored for audiophile creators.',
    deliverables: ['Hook-Driven Reels', 'Product Lifestyle Clips', 'Unboxing Sequences'],
    challenge: 'Maintain brand prestige while producing high-volume social content at fast turnaround cycles.',
    solution: 'Created modular set templates, batch lighting presets, and rapid editing workflows.'
  },
  {
    id: 'apex-geneva-event',
    title: 'Apex Motors — International Auto Expo Coverage',
    client: 'Apex Automotive',
    category: 'production',
    categoryLabel: 'Live Production',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'Live Stream Viewers', value: '1.8M' },
    summary: 'Multi-camera live broadcast and same-day social deliverables for the world premiere of Apex Hypercar.',
    deliverables: ['Live Broadcast Stream', 'Same-Day Reel Cuts', 'VIP Aftermovie'],
    challenge: 'Deliver 12 polished short videos within 2 hours of live reveal for immediate press distribution.',
    solution: 'Deployed on-site mobile edit suites and dedicated fiber uplink setups for zero-latency publishing.'
  },

  // BRAND & CREATIVE
  {
    id: 'aura-luxury-rebrand',
    title: 'Aura Living — Global Brand Architecture',
    client: 'Aura Lifestyle Co.',
    category: 'branding',
    categoryLabel: 'Brand & Creative',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'Brand Equity Increase', value: '210%' },
    summary: 'Complete brand overhaul including editorial typography, luxury collateral, visual systems, and e-commerce packaging.',
    deliverables: ['Visual Identity System', 'Brand Book', 'Packaging Design', 'Digital Style Guide'],
    challenge: 'Unify 5 disjointed sub-brands under a single cohesive luxury lifestyle umbrella brand.',
    solution: 'Designed an elegant, minimalist visual language leveraging custom serif typography and warm muted tones.'
  },
  {
    id: 'velox-sky-identity',
    title: 'Velox Aviation — Private Jet Brand Identity',
    client: 'Velox Charter Global',
    category: 'branding',
    categoryLabel: 'Brand Identity',
    year: '2026',
    thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'Inquiry Growth', value: '+185%' },
    summary: 'Luxury positioning and visual identity for an ultra-high-net-worth private aviation charter company.',
    deliverables: ['Logo Suite', 'Livery Graphics', 'Executive Editorial Collateral', 'Digital Guidelines'],
    challenge: 'Establish immediate trust and prestige in an ultra-competitive luxury aviation sector.',
    solution: 'Crafted a sleek aerodynamic emblem paired with gold foil embossed print collateral and dark UI.'
  },
  {
    id: 'elysium-spirits-packaging',
    title: 'Elysium Reserve — Luxury Bottle & Packaging Craft',
    client: 'Elysium Distillers',
    category: 'branding',
    categoryLabel: 'Packaging Design',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'Retail Pre-Orders', value: '100% Sold Out' },
    summary: 'Custom glass bottle architecture, tactile debossed labels, and wooden presentation box for a limited-run spirit.',
    deliverables: ['Structural Package Design', 'Label Graphics', 'Collector Box', 'Unboxing Assets'],
    challenge: 'Command a premium ₹33,000 retail shelf price with bespoke physical packaging design.',
    solution: 'Partnered with European glass artisans to engineer heavy-base custom decanters with metal seals.'
  },
  {
    id: 'kuro-creative-toolkit',
    title: 'Kuro Studio — Omnichannel Design & Social Kit',
    client: 'Kuro Apparel',
    category: 'branding',
    categoryLabel: 'Creative Direction',
    year: '2026',
    thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'CTR Increase', value: '3.4x' },
    summary: 'Editorial graphic design, campaign collateral, and social media creative system for a high-fashion streetwear label.',
    deliverables: ['Campaign Collateral', 'Social Design System', 'Lookbook Layouts', 'Ad Templates'],
    challenge: 'Maintain strict high-fashion aesthetic standards across rapidly changing digital marketing ads.',
    solution: 'Engineered modular Figma design components allowing rapid turnarounds while staying on-brand.'
  },

  // MARKETING & GROWTH
  {
    id: 'solaris-performance-growth',
    title: 'Solaris Energy — 8x Acquisition Scale',
    client: 'Solaris Tech',
    category: 'marketing',
    categoryLabel: 'Marketing & Growth',
    year: '2026',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'Qualified Leads', value: '42,000+' },
    summary: 'Omnichannel performance marketing engine driving solar subscriptions with a 38% reduction in CAC.',
    deliverables: ['Meta & Google Ad Funnel', 'High-Converting Landing Pages', 'SEO Engine', 'Email Nurture'],
    challenge: 'Reduce rising CAC in competitive US and European renewable energy markets while scaling volume.',
    solution: 'Created 50+ video ad variations with localized copy and AI-optimized retargeting funnels.'
  },
  {
    id: 'kuro-viral-growth',
    title: 'Kuro Fashion — Meta & TikTok Acquisition Engine',
    client: 'Kuro Apparel',
    category: 'marketing',
    categoryLabel: 'Performance Paid Ads',
    year: '2026',
    thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'Blended ROAS', value: '5.2x' },
    summary: 'Direct-response paid social advertising and creator partnership program driving global e-commerce revenue.',
    deliverables: ['TikTok Ad Creative', 'Influencer UGC Engine', 'Meta Scaling Strategy'],
    challenge: 'Scale ad spend from ₹8L/mo to ₹2Cr/mo without exhausting creative fatigue.',
    solution: 'Built an in-house creator network producing 40 raw UGC hooks per week for rapid testing.'
  },
  {
    id: 'titan-seo-domination',
    title: 'Titan Software — B2B Organic Search Dominance',
    client: 'Titan Systems',
    category: 'marketing',
    categoryLabel: 'SEO & Content Growth',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'Organic Traffic', value: '+520%' },
    summary: 'Technical SEO overhaul, topical cluster content architecture, and high-authority link acquisition for enterprise SaaS.',
    deliverables: ['Technical SEO Audit', 'Topic Cluster Strategy', 'Content Production Engine'],
    challenge: 'Rank #1 for high-intent enterprise cloud security keywords against entrenched competitors.',
    solution: 'Published 120+ long-form technical guides and restructured site architecture for crawler efficiency.'
  },
  {
    id: 'pulse-cro-engine',
    title: 'Pulse Fitness — Funnel & Conversion Rate Scale',
    client: 'Pulse Health',
    category: 'marketing',
    categoryLabel: 'CRO & Lead Generation',
    year: '2026',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'Conversion Lift', value: '+48%' },
    summary: 'Full-funnel CRO audit, A/B testing program, and checkout optimization for a subscription wellness app.',
    deliverables: ['Interactive Quiz Funnel', 'Checkout Optimization', 'A/B Test Analytics'],
    challenge: 'High drop-off rate on multi-step trial signups on mobile browsers.',
    solution: 'Designed a frictionless 3-step quiz funnel with instant personal health scoring preview.'
  },

  // TECHNOLOGY & DIGITAL
  {
    id: 'lumina-interactive-platform',
    title: 'Lumina Spatial — Web3D Digital Platform',
    client: 'Lumina Tech',
    category: 'technology',
    categoryLabel: 'Technology & Digital',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'Session Duration', value: '6m 40s' },
    summary: 'An interactive 3D WebGL product customizer and high-performance store built for spatial computing.',
    deliverables: ['Custom WebGL Canvas', 'React/Vite Frontend', 'Headless Storefront API'],
    challenge: 'Render high-density 3D models seamlessly on mobile web browsers without dropping below 60fps.',
    solution: 'Developed custom shader optimization algorithms and responsive asset compression pipelines.'
  },
  {
    id: 'nexus-fintech-ecosystem',
    title: 'Nexus Bank — Next-Gen Digital Experience & App',
    client: 'Nexus Financial',
    category: 'technology',
    categoryLabel: 'Technology & Digital',
    year: '2026',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'User Conversion', value: '+145%' },
    summary: 'Re-engineering the onboarding, mobile web app, and interactive wealth dashboard for over 500,000 active clients.',
    deliverables: ['Web & Mobile Application', 'Design System Library', 'Real-Time Analytics UI'],
    challenge: 'Simplify complex financial portfolios into an intuitive, ultra-fast web interface.',
    solution: 'Architected a modular component library with real-time WebSocket data updates and zero layout shift.'
  },
  {
    id: 'aether-headless-commerce',
    title: 'Aether Apparel — Headless E-Commerce Storefront',
    client: 'Aether Fashion Group',
    category: 'technology',
    categoryLabel: 'Headless E-Commerce',
    year: '2026',
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'Page Load Speed', value: '0.4s' },
    summary: 'Ultra-fast Next.js/Vite headless Shopify storefront featuring 3D product preview and instant search.',
    deliverables: ['Headless Storefront', 'Shopify Store API', 'Custom Cart Engine'],
    challenge: 'Eliminate slow loading times during global flash sales with 50,000 concurrent visitors.',
    solution: 'Deployed edge-cached static pages with dynamic serverless cart checkout routes.'
  },
  {
    id: 'zenith-crm-automation',
    title: 'Zenith Holdings — Enterprise CRM & Automated Workflows',
    client: 'Zenith Group',
    category: 'technology',
    categoryLabel: 'CRM & Automation',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    metrics: { label: 'Hours Saved/Mo', value: '1,200+' },
    summary: 'Custom pipeline automation, AI document extraction, and real-time deal telemetry dashboard for B2B sales teams.',
    deliverables: ['Custom CRM UI', 'AI Document Pipeline', 'Salesforce Integration'],
    challenge: 'Manual data entry caused deal pipeline friction and delayed client onboarding by days.',
    solution: 'Built automated OCR document ingestion paired with webhook triggers directly into sales pipelines.'
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

