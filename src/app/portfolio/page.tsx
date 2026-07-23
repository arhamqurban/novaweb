import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { PortfolioSection } from "@/sections/portfolio-section";
import { TestimonialsSection } from "@/sections/testimonials-section";
import { FinalCTASection } from "@/sections/final-cta-section";
import { getSiteConfig, getTestimonials } from "@/lib/content";

export const metadata: Metadata = generatePageMetadata({
  title: "Portfolio",
  description:
    "View our latest web design and development projects. Real results for real businesses across Pakistan. See how we transform digital experiences.",
  path: "/portfolio",
  keywords: [
    "web design portfolio",
    "web development projects",
    "Lahore agency portfolio",
    "case studies",
  ],
  ogImage: "/images/og-portfolio.jpg",
});

export default function PortfolioPage() {
  const siteConfig = getSiteConfig();
  const testimonialsData = getTestimonials();

  return (
    <>
      <section className="relative pt-32 pb-16 bg-bg-primary">
        <div className="container-nova text-center">
          <span className="overline text-accent-primary mb-4 block">Our Work</span>
          <h1 className="display-lg text-white mb-4">Our Portfolio</h1>
          <p className="body-lg text-text-secondary max-w-2xl mx-auto">Results that speak. Every project tells a story.</p>
        </div>
      </section>

      <PortfolioSection />
      <TestimonialsSection
        label={testimonialsData.section.label}
        heading={testimonialsData.section.heading}
        subtitle={testimonialsData.section.subtitle}
        testimonials={testimonialsData.testimonials}
      />
      <FinalCTASection contact={siteConfig.contact} />
    </>
  );
}
