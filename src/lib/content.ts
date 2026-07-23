// ============================================================
// Nova Webs — Content Management Layer
// Reads from content/data/ JSON files.
// Future: Swap this file to read from a CMS API without
//         changing any section components.
// ============================================================

import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content", "data");

// ─── Generic JSON Loader ────────────────────────────────────
function loadJSON<T>(filename: string): T {
  const filePath = path.join(CONTENT_DIR, `${filename}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

// ─── CMS Interface (swappable) ─────────────────────────────
// To use a headless CMS instead of JSON files:
// 1. Create a new file like lib/cms/strapi.ts
// 2. Replace the functions below with API calls
// 3. All section imports remain the same

export interface CMSSection {
  heading: string;
  subtitle: string;
  label: string;
}

// ─── Site Data ──────────────────────────────────────────────
export interface SiteConfig {
  site: {
    name: string;
    tagline: string;
    description: string;
    shortDescription: string;
    url: string;
    ogImage: string;
    foundingYear: string;
    location: string;
    keywords: string[];
    themeColor: string;
    accentColor: string;
  };
  navigation: {
    ctaText: string;
    ctaLink: string;
    links: Array<{
      label: string;
      href: string;
      children?: Array<{ label: string; href: string }>;
    }>;
  };
  announcementBar: {
    enabled: boolean;
    messages: Array<{ text: string; cta: string; href: string }>;
  };
  hero: {
    label: string;
    headline: string;
    headlineHighlight: string;
    subheadline: string;
    primaryCta: { text: string; href: string };
    secondaryCta: { text: string; href: string };
    socialProof: string;
  };
  trustBar: {
    heading: string;
    logos: Array<{ name: string; src: string }>;
  };
  stats: Array<{ value: string; label: string; suffix?: string }>;
  socialLinks: Array<{ platform: string; url: string; icon: string; label: string }>;
  contact: {
    phone: string;
    email: string;
    address: string;
    whatsapp: string;
    whatsappMessage: string;
    mapsUrl: string;
    hours: { weekdays: string; saturday: string; sunday: string };
  };
  trustBadges: Array<{ label: string; icon: string }>;
}

export function getSiteConfig(): SiteConfig {
  return loadJSON<SiteConfig>("site");
}

// ─── Services ────────────────────────────────────────────────
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  href: string;
  order: number;
}

export interface ServicesData {
  section: CMSSection;
  services: ServiceItem[];
}

export function getServices(): ServicesData {
  return loadJSON<ServicesData>("services");
}

// ─── Portfolio ──────────────────────────────────────────────
export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  metrics: string;
  href: string;
  aspectRatio: "wide" | "tall" | "square";
  featured: boolean;
  technologies: string[];
  industry: string;
  liveUrl: string;
  order: number;
}

export interface PortfolioData {
  section: CMSSection;
  projects: PortfolioProject[];
}

export function getPortfolio(): PortfolioData {
  return loadJSON<PortfolioData>("portfolio");
}

export function getPortfolioProject(id: string): PortfolioProject | undefined {
  const data = getPortfolio();
  return data.projects.find((p) => p.id === id);
}

export function getFeaturedProjects(): PortfolioProject[] {
  const data = getPortfolio();
  return data.projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);
}

// ─── Testimonials ────────────────────────────────────────────
export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
  metrics?: string;
  featured: boolean;
  order: number;
}

export interface TestimonialsData {
  section: CMSSection;
  testimonials: TestimonialItem[];
}

export function getTestimonials(): TestimonialsData {
  return loadJSON<TestimonialsData>("testimonials");
}

// ─── FAQ ─────────────────────────────────────────────────────
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  category: string;
}

export interface FAQData {
  section: CMSSection;
  questions: FAQItem[];
}

export function getFAQ(): FAQData {
  return loadJSON<FAQData>("faq");
}

// ─── Process ─────────────────────────────────────────────────
export interface ProcessStep {
  id: number;
  title: string;
  duration: string;
  description: string;
  items: string[];
}

export interface ProcessData {
  section: CMSSection;
  steps: ProcessStep[];
}

export function getProcess(): ProcessData {
  return loadJSON<ProcessData>("process");
}

// ─── Team ────────────────────────────────────────────────────
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedIn?: string;
  order: number;
}

export interface CompanyValue {
  title: string;
  description: string;
  icon: string;
}

export interface TeamData {
  section: CMSSection;
  members: TeamMember[];
  values: CompanyValue[];
}

export function getTeam(): TeamData {
  return loadJSON<TeamData>("team");
}

// ─── Why Choose Us ──────────────────────────────────────────
export interface WhyChooseUsReason {
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseUsData {
  section: CMSSection;
  reasons: WhyChooseUsReason[];
}

export function getWhyChooseUs(): WhyChooseUsData {
  return loadJSON<WhyChooseUsData>("why-choose-us");
}

// ─── Industries ──────────────────────────────────────────────
export interface IndustryItem {
  id: string;
  title: string;
  icon: string;
  count: string;
  description: string;
}

export interface IndustriesData {
  section: CMSSection;
  industries: IndustryItem[];
}

export function getIndustries(): IndustriesData {
  return loadJSON<IndustriesData>("industries");
}

// ─── Technologies ────────────────────────────────────────────
export interface TechnologyItem {
  name: string;
  category: string;
}

export interface TechnologiesData {
  section: CMSSection;
  technologies: TechnologyItem[];
}

export function getTechnologies(): TechnologiesData {
  return loadJSON<TechnologiesData>("technologies");
}

// ─── Pricing ─────────────────────────────────────────────────
export interface PricingTierData {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isFeatured: boolean;
  cta: string;
}

export interface PricingData {
  section: CMSSection;
  tiers: PricingTierData[];
}

export function getPricing(): PricingData {
  return loadJSON<PricingData>("pricing");
}

// ─── About ──────────────────────────────────────────────────
export interface AboutData {
  section: CMSSection;
  story: {
    heading: string;
    paragraphs: string[];
    image: string;
    founded: string;
    location: string;
  };
}

export function getAbout(): AboutData {
  return loadJSON<AboutData>("about");
}
