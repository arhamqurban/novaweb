import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { WhyChooseUs } from "@/sections/why-choose-us";
import { TestimonialsSection } from "@/sections/testimonials-section";
import { StatsSection } from "@/sections/stats-section";
import { FinalCTASection } from "@/sections/final-cta-section";
import { TrustBar } from "@/sections/trust-bar";
import { getSiteConfig, getWhyChooseUs, getTestimonials, getAbout } from "@/lib/content";

export const metadata: Metadata = generatePageMetadata({
  title: "About Us",
  description:
    "Learn about Nova Webs — Lahore's premium web design agency. Meet our team, discover our story, and see why clients trust us with their digital presence.",
  path: "/about",
  keywords: [
    "about Nova Webs",
    "Lahore web agency team",
    "web design company Lahore",
    "Pakistan digital agency",
  ],
});

export default function AboutPage() {
  const siteConfig = getSiteConfig();
  const whyChooseUsData = getWhyChooseUs();
  const testimonialsData = getTestimonials();
  const aboutData = getAbout();

  return (
    <>
      {/* Hero section - use aboutData.section data for heading/subtitle */}
      <section className="relative pt-32 pb-16 bg-bg-primary">
        <div className="container-nova text-center">
          <span className="overline text-accent-primary mb-4 block">{aboutData.section.label}</span>
          <h1 className="display-lg text-white mb-4">{aboutData.section.heading}</h1>
          <p className="body-lg text-text-secondary max-w-2xl mx-auto">{aboutData.section.subtitle}</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-bg-secondary" aria-labelledby="story-heading">
        <div className="container-nova section-padding">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <span className="overline text-accent-primary mb-4 block">Our Story</span>
              <h2 id="story-heading" className="heading-1 text-white mb-6">{aboutData.story.heading}</h2>
              <div className="space-y-4 text-text-secondary">
                {aboutData.story.paragraphs.map((p, i) => (
                  <p key={i} className="body">{p}</p>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-xl bg-gradient-to-br from-accent-primary/20 to-bg-tertiary flex items-center justify-center" role="img" aria-label="Nova Webs studio in Lahore">
              <div className="text-center p-8">
                <div className="font-heading text-4xl font-bold text-white mb-2" aria-hidden="true">NOVA</div>
                <div className="font-heading text-lg text-accent-primary mb-4" aria-hidden="true">WEBS</div>
                <p className="text-sm text-text-tertiary">Est. {aboutData.story.founded} • {aboutData.story.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection stats={siteConfig.stats} />
      <TrustBar heading={siteConfig.trustBar.heading} logos={siteConfig.trustBar.logos} />
      <WhyChooseUs
        label={whyChooseUsData.section.label}
        heading={whyChooseUsData.section.heading}
        subtitle={whyChooseUsData.section.subtitle}
        reasons={whyChooseUsData.reasons}
      />
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
