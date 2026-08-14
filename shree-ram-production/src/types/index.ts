export interface ServicePillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  image: string;
  videoPreview?: string;
  badge: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: 'production' | 'branding' | 'marketing' | 'technology';
  categoryLabel: string;
  year: string;
  thumbnail: string;
  videoUrl?: string;
  metrics: {
    label: string;
    value: string;
  };
  summary: string;
  deliverables: string[];
  challenge?: string;
  solution?: string;
}

export interface ProcessStep {
  number: string;
  phase: string;
  title: string;
  description: string;
  outcomes: string[];
  accentTag: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  impactMetric: string;
  metricLabel: string;
}

export interface BehindTheScenesItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
}

export interface CalculatorOption {
  id: string;
  title: string;
  pillar: string;
  description: string;
  estimatedTimeline: string;
  impactTier: 'High Growth' | 'Transformational' | 'Enterprise Scale';
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  servicesNeeded: string[];
  budgetRange: string;
  timeline: string;
  message: string;
}
