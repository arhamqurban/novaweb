import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { ContactSection } from "@/sections/contact-section";
import { FAQSection } from "@/sections/faq-section";
import { getSiteConfig, getFAQ } from "@/lib/content";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Nova Webs in Lahore. Book a free consultation or reach us via WhatsApp, email, phone, or visit our Gulberg office.",
  path: "/contact",
  keywords: [
    "contact Nova Webs",
    "Lahore web design agency",
    "web design consultation",
    "Pakistan web agency contact",
  ],
});

export default function ContactPage() {
  const siteConfig = getSiteConfig();
  const faqData = getFAQ();

  return (
    <>
      {/* Keep the same hero section */}
      <section className="relative pt-32 pb-16 bg-bg-primary">
        <div className="container-nova text-center">
          <span className="overline text-accent-primary mb-4 block">Contact</span>
          <h1 className="display-lg text-white mb-4">Let&apos;s Talk</h1>
          <p className="body-lg text-text-secondary max-w-2xl mx-auto">Ready to start your project? We&apos;re just one message away.</p>
        </div>
      </section>

      <ContactSection
        contact={siteConfig.contact}
        socialLinks={siteConfig.socialLinks}
      />

      {/* Keep the maps section */}
      <section className="bg-bg-secondary" aria-labelledby="maps-heading">
        <div className="container-nova section-padding">
          <div className="text-center mb-8">
            <span className="overline text-accent-primary mb-4 block">Visit Us</span>
            <h2 id="maps-heading" className="heading-2 text-white mb-2">Our Office</h2>
            <p className="body text-text-secondary">{siteConfig.contact.address}</p>
            <p className="caption text-text-muted mt-2">{siteConfig.contact.hours.weekdays} | {siteConfig.contact.hours.saturday}</p>
          </div>
          <div className="aspect-[21/9] max-h-[450px] rounded-xl overflow-hidden">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.1234!2d${encodeURIComponent("74.3587")}!3d${encodeURIComponent("31.5204")}!2m3!1f0!2f0!3f0!3m2!1sen!2s!4v1`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nova Webs Office Location — Gulberg, Lahore"
              aria-label="Map showing Nova Webs office location in Gulberg, Lahore"
            />
          </div>
        </div>
      </section>

      <FAQSection
        label={faqData.section.label}
        heading={faqData.section.heading}
        subtitle={faqData.section.subtitle}
        questions={faqData.questions}
      />
    </>
  );
}
