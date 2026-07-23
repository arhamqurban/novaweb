import { SITE } from "@/constants";

interface JsonLdProps {
  schema: Record<string, unknown>;
}

function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Organization Schema ────────────────────────────────────
export function OrganizationSchema() {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://novawebs.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nova Webs",
    url: BASE_URL,
    logo: `${BASE_URL}/images/og.jpg`,
    description: SITE.description,
    foundingDate: "2021",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123-Gulberg",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: process.env.NEXT_PUBLIC_PHONE || "+92 300 1234567",
      contactType: "sales",
      availableLanguage: ["English", "Urdu"],
    },
    sameAs: [
      process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/novawebs9",
      process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/NovaWebs",
      process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/company/novawebs",
      process.env.NEXT_PUBLIC_TIKTOK_URL || "https://tiktok.com/@novawebs",
      process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com/@novawebs",
    ],
  };

  return <JsonLd schema={schema} />;
}

// ─── Website Schema ─────────────────────────────────────────
export function WebsiteSchema() {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://novawebs.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nova Webs",
    url: BASE_URL,
    description: SITE.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd schema={schema} />;
}

// ─── Local Business Schema (Lahore) ─────────────────────────
export function LocalBusinessSchema() {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://novawebs.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Nova Webs",
    image: `${BASE_URL}/images/og.jpg`,
    "@id": `${BASE_URL}/#business`,
    url: BASE_URL,
    telephone: process.env.NEXT_PUBLIC_PHONE || "+92 300 1234567",
    priceRange: "PKR 150,000 - PKR 1,000,000+",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123-Gulberg",
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      postalCode: "54000",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.5204,
      longitude: 74.3587,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "16:00",
      },
    ],
    sameAs: [
      process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/novawebs9",
      process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/NovaWebs",
      process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/company/novawebs",
    ],
  };

  return <JsonLd schema={schema} />;
}

// ─── Breadcrumb Schema ──────────────────────────────────────
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://novawebs.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };

  return <JsonLd schema={schema} />;
}

// ─── FAQ Schema ─────────────────────────────────────────────
export function FAQSchema({ questions }: { questions: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return <JsonLd schema={schema} />;
}

// ─── Service Schema ─────────────────────────────────────────
export function ServiceSchema() {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://novawebs.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web Design & Development Services",
    provider: {
      "@type": "Organization",
      name: "Nova Webs",
    },
    areaServed: {
      "@type": "City",
      name: "Lahore",
      sameAs: "https://en.wikipedia.org/wiki/Lahore",
    },
    serviceType: [
      "Web Design",
      "Web Development",
      "E-Commerce Development",
      "Branding",
      "SEO",
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "PKR",
      lowPrice: "150000",
      highPrice: "1000000",
    },
  };

  return <JsonLd schema={schema} />;
}

export default JsonLd;
