import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { ServicesSection } from "@/sections/services-section";
import { ProcessSection } from "@/sections/process-section";
import { FAQSection } from "@/sections/faq-section";
import { FinalCTASection } from "@/sections/final-cta-section";
import { getSiteConfig, getServices, getProcess, getFAQ } from "@/lib/content";

export const metadata: Metadata = generatePageMetadata({
  title: "Services",
  description:
    "From web design to development, e-commerce to branding — Nova Webs offers premium digital services in Lahore. Explore our complete service offerings.",
  path: "/services",
  keywords: [
    "web design Lahore",
    "web development Pakistan",
    "e-commerce development",
    "branding agency",
    "SEO services",
  ],
});

export default function ServicesPage() {
  const siteConfig = getSiteConfig();
  const servicesData = getServices();
  const processData = getProcess();
  const faqData = getFAQ();

  return (
    <>
      <section className="relative pt-32 pb-16 bg-bg-primary">
        <div className="container-nova text-center">
          <span className="overline text-accent-primary mb-4 block">Services</span>
          <h1 className="display-lg text-white mb-4">What We Build</h1>
          <p className="body-lg text-text-secondary max-w-2xl mx-auto">From concept to launch — every service designed for excellence.</p>
        </div>
      </section>

      <ServicesSection
        label={servicesData.section.label}
        heading={servicesData.section.heading}
        subtitle={servicesData.section.subtitle}
        services={servicesData.services}
      />
      <ProcessSection
        label={processData.section.label}
        heading={processData.section.heading}
        subtitle={processData.section.subtitle}
        steps={processData.steps}
      />
      <section className="bg-bg-primary">
        <div className="container-nova section-padding text-center">
          <h2 className="heading-2 text-white mb-4">Need a Custom Solution?</h2>
          <p className="body-lg text-text-secondary max-w-xl mx-auto mb-6">Every business is unique. We tailor our services to your specific needs.</p>
          <a href="/booking" className="gradient-cyan inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-semibold text-text-inverse transition-all hover:shadow-cyan-md">Get a Custom Quote</a>
        </div>
      </section>
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
