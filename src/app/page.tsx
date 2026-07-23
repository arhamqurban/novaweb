import { AnnouncementBar } from "@/components/ui/announcement-bar";
import { HeroSection } from "@/sections/hero-section";
import { TrustBar } from "@/sections/trust-bar";
import { StatsSection } from "@/sections/stats-section";
import { ServicesSection } from "@/sections/services-section";
import { WhyChooseUs } from "@/sections/why-choose-us";
import { PortfolioSection } from "@/sections/portfolio-section";
import { ProcessSection } from "@/sections/process-section";
import { TechStackSection } from "@/sections/tech-stack-section";
import { IndustriesSection } from "@/sections/industries-section";
import { TestimonialsSection } from "@/sections/testimonials-section";
import { FAQSection } from "@/sections/faq-section";
import { FinalCTASection } from "@/sections/final-cta-section";
import {
  getSiteConfig,
  getServices,
  getPortfolio,
  getWhyChooseUs,
  getProcess,
  getTechnologies,
  getIndustries,
  getTestimonials,
  getFAQ,
} from "@/lib/content";

export default function HomePage() {
  const siteConfig = getSiteConfig();
  const servicesData = getServices();
  const portfolioData = getPortfolio();
  const whyChooseUsData = getWhyChooseUs();
  const processData = getProcess();
  const technologiesData = getTechnologies();
  const industriesData = getIndustries();
  const testimonialsData = getTestimonials();
  const faqData = getFAQ();

  return (
    <>
      <AnnouncementBar
        enabled={siteConfig.announcementBar.enabled}
        messages={siteConfig.announcementBar.messages}
      />
      <HeroSection hero={siteConfig.hero} />
      <TrustBar heading={siteConfig.trustBar.heading} logos={siteConfig.trustBar.logos} />
      <StatsSection stats={siteConfig.stats} />
      <ServicesSection
        label={servicesData.section.label}
        heading={servicesData.section.heading}
        subtitle={servicesData.section.subtitle}
        services={servicesData.services}
      />
      <WhyChooseUs
        label={whyChooseUsData.section.label}
        heading={whyChooseUsData.section.heading}
        subtitle={whyChooseUsData.section.subtitle}
        reasons={whyChooseUsData.reasons}
      />
      <PortfolioSection
        label={portfolioData.section.label}
        heading={portfolioData.section.heading}
        subtitle={portfolioData.section.subtitle}
        projects={portfolioData.projects}
      />
      <ProcessSection
        label={processData.section.label}
        heading={processData.section.heading}
        subtitle={processData.section.subtitle}
        steps={processData.steps}
      />
      <TechStackSection
        label={technologiesData.section.label}
        heading={technologiesData.section.heading}
        subtitle={technologiesData.section.subtitle}
        technologies={technologiesData.technologies}
      />
      <IndustriesSection
        label={industriesData.section.label}
        heading={industriesData.section.heading}
        subtitle={industriesData.section.subtitle}
        industries={industriesData.industries}
      />
      <TestimonialsSection
        label={testimonialsData.section.label}
        heading={testimonialsData.section.heading}
        subtitle={testimonialsData.section.subtitle}
        testimonials={testimonialsData.testimonials}
      />
      <FAQSection
        label={faqData.section.label}
        heading={faqData.section.heading}
        subtitle={faqData.section.subtitle}
        questions={faqData.questions}
      />
      <FinalCTASection contact={siteConfig.contact} />
    </>
  );
}
