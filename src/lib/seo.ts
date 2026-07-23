import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://novawebs.com";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  keywords?: string[];
  noIndex?: boolean;
  publishedTime?: string;
  type?: "website" | "article";
}

/**
 * Generates a consistent Metadata object for any page.
 * Use this in every page's generateMetadata or metadata export.
 */
export function generatePageMetadata({
  title,
  description,
  path = "",
  ogImage = "/images/og.jpg",
  keywords = [],
  noIndex = false,
  publishedTime,
  type = "website",
}: SEOProps): Metadata {
  const url = `${BASE_URL}${path}`;
  const siteTitle = `${title} | Nova Webs`;
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;

  return {
    title,
    description,
    keywords: [
      "web design",
      "web development",
      "Lahore",
      "Pakistan",
      "premium web agency",
      "UI/UX design",
      "e-commerce",
      "branding",
      ...keywords,
    ],
    authors: [{ name: "Nova Webs" }],
    creator: "Nova Webs",
    publisher: "Nova Webs",
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: "en_US",
      url,
      siteName: "Nova Webs",
      title: siteTitle,
      description,
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && type === "article" ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description,
      images: [fullOgImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}

/**
 * Generates breadcrumb items array for consistent internal linking.
 */
export function generateBreadcrumbItems(
  items: { name: string; path: string }[]
) {
  return items.map((item) => ({
    name: item.name,
    url: item.path,
  }));
}
