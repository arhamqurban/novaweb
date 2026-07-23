import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { FAQSection } from "@/sections/faq-section";
import { FinalCTASection } from "@/sections/final-cta-section";
import { ContactSection } from "@/sections/contact-section";
import { getSiteConfig, getFAQ } from "@/lib/content";

export const metadata: Metadata = generatePageMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about Nova Webs' services, pricing, process, and more. Get answers about web design, development, and working with us.",
  path: "/faq",
  keywords: [
    "web design FAQ",
    "agency questions",
    "Lahore web design pricing",
    "web development process",
  ],
});

export default function FAQPage() {
  const siteConfig = getSiteConfig();
  const faqData = getFAQ();

  return (
    <>
      <section className="relative pt-32 pb-16 bg-bg-primary">
        <div className="container-nova text-center">
          <span className="overline text-accent-primary mb-4 block">FAQ</span>
          <h1 className="display-lg text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="body-lg text-text-secondary max-w-2xl mx-auto">
            Everything you need to know about working with us.
          </p>
        </div>
      </section>

      <FAQSection
        label={faqData.section.label}
        heading={faqData.section.heading}
        subtitle={faqData.section.subtitle}
        questions={faqData.questions}
      />
      <ContactSection
        contact={siteConfig.contact}
        socialLinks={siteConfig.socialLinks}
      />
      <FinalCTASection contact={siteConfig.contact} />
    </>
  );
}
