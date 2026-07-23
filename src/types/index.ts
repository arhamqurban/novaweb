// ============================================================
// Nova Webs — Type Definitions
// ============================================================

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  href: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  filterCategory: "All" | "Business" | "E-commerce" | "Portfolio" | "Landing Page";
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  metrics: string;
  href: string;
  liveUrl?: string;
  isConcept?: boolean;
  aspectRatio: "wide" | "tall" | "square";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
  metrics?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedIn?: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  duration: string;
  description: string;
  items: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  icon: string;
  count: string;
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
  suffix?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isFeatured: boolean;
  cta: string;
}

export interface Technology {
  name: string;
  category: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  clientName: string;
  completionDate: string;
  featured: boolean;
  order: number;
  status: "draft" | "published";
  thumbnail: string;
  screenshots: string[];
  liveUrl: string;
  githubUrl: string;
  caseStudy: string;
  metrics: string;
  createdAt: string;
  updatedAt: string;
}
