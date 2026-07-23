// ============================================================
// Nova Webs — Server-Side Content Loader
//
// This module pre-loads ALL CMS content server-side.
// Page components import this to pass data to client sections.
//
// FUTURE CMS SWAP:
// To connect a headless CMS instead of JSON files:
//   1. Create lib/cms/{provider}.ts with API calls
//   2. Replace the imports below with your CMS client
//   3. All section components receive the same prop types
// ============================================================

import {
  getSiteConfig,
  getServices,
  getPortfolio,
  getTestimonials,
  getFAQ,
  getProcess,
  getTeam,
  getWhyChooseUs,
  getIndustries,
  getTechnologies,
  getPricing,
  getAbout,
  getFeaturedProjects,
  type SiteConfig,
  type ServicesData,
  type PortfolioData,
  type TestimonialsData,
  type FAQData,
  type ProcessData,
  type TeamData,
  type WhyChooseUsData,
  type IndustriesData,
  type TechnologiesData,
  type PricingData,
  type AboutData,
} from "@/lib/content";

// ─── All Homepage Data ──────────────────────────────────────
export interface HomepageContent {
  siteConfig: SiteConfig;
  services: ServicesData;
  portfolio: PortfolioData;
  testimonials: TestimonialsData;
  faq: FAQData;
  process: ProcessData;
  whyChooseUs: WhyChooseUsData;
  industries: IndustriesData;
  technologies: TechnologiesData;
  pricing: PricingData;
}

/**
 * Loads all data needed for the homepage.
 * Called once per request — Next.js caches the result.
 */
export function loadHomepageContent(): HomepageContent {
  return {
    siteConfig: getSiteConfig(),
    services: getServices(),
    portfolio: getPortfolio(),
    testimonials: getTestimonials(),
    faq: getFAQ(),
    process: getProcess(),
    whyChooseUs: getWhyChooseUs(),
    industries: getIndustries(),
    technologies: getTechnologies(),
    pricing: getPricing(),
  };
}

// ─── All About Page Data ────────────────────────────────────
export interface AboutPageContent {
  siteConfig: SiteConfig;
  team: TeamData;
  whyChooseUs: WhyChooseUsData;
  testimonials: TestimonialsData;
  about: AboutData;
}

export function loadAboutPageContent(): AboutPageContent {
  return {
    siteConfig: getSiteConfig(),
    team: getTeam(),
    whyChooseUs: getWhyChooseUs(),
    testimonials: getTestimonials(),
    about: getAbout(),
  };
}

// ─── Re-Exports for convenience ─────────────────────────────
export type {
  SiteConfig,
  ServicesData,
  PortfolioData,
  TestimonialsData,
  FAQData,
  ProcessData,
  TeamData,
  WhyChooseUsData,
  IndustriesData,
  TechnologiesData,
  PricingData,
  AboutData,
};

export { getSiteConfig, getFeaturedProjects };
