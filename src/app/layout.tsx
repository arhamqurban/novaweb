import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { BackToTop } from "@/components/ui/back-to-top";
import { GlobalSchemaMarkup } from "@/components/seo/schema-wrapper";
import { GoogleAnalytics } from "@/components/integrations/google-analytics";
import { MicrosoftClarity } from "@/components/integrations/microsoft-clarity";
import { MetaPixel } from "@/components/integrations/meta-pixel";
import { SearchConsoleVerification } from "@/components/integrations/search-console";
import { getSiteConfig, getServices } from "@/lib/content";
import "./globals.css";

// ─── Fonts ───────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

// ─── Site URL ────────────────────────────────────────────────
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://novawebs.com";

// ─── Root Metadata ───────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Nova Webs — Digital Excellence, Crafted.",
    template: "%s | Nova Webs",
  },
  description:
    "Lahore's premium web design agency. We craft websites that don't just look extraordinary — they convert.",
  keywords: [
    "web design",
    "web development",
    "Lahore",
    "Pakistan",
    "premium web agency",
    "UI/UX design",
    "e-commerce",
    "branding",
  ],
  authors: [{ name: "Nova Webs", url: BASE_URL }],
  creator: "Nova Webs",
  publisher: "Nova Webs",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/images/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Nova Webs",
    title: "Nova Webs — Digital Excellence, Crafted.",
    description:
      "Lahore's premium web design agency. We craft websites that don't just look extraordinary — they convert.",
    images: [
      {
        url: `${BASE_URL}/images/og.jpg`,
        width: 1200,
        height: 630,
        alt: "Nova Webs — Premium Web Design Agency in Lahore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova Webs — Digital Excellence, Crafted.",
    description:
      "Lahore's premium web design agency. We craft websites that don't just look extraordinary — they convert.",
    images: [`${BASE_URL}/images/og.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Theme color for browser chrome
  other: {
    "theme-color": "#0A0A0A",
    "msapplication-TileColor": "#0A0A0A",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = getSiteConfig();
  const servicesData = getServices();

  return (
    <html lang="en" className="dark">
      <head>
        {/* Search Console Verification */}
        <SearchConsoleVerification />
        {/* Global Schema Markup (JSON-LD) */}
        <GlobalSchemaMarkup />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-bg-primary text-text-primary`}
      >
        <TooltipProvider>
          {/* Skip to content link — first focusable element */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent-primary focus:text-text-inverse focus:rounded-lg"
          >
            Skip to main content
          </a>

          <SiteHeader
            siteName={siteConfig.site.name}
            ctaText={siteConfig.navigation.ctaText}
            ctaLink={siteConfig.navigation.ctaLink}
            navLinks={siteConfig.navigation.links}
          />
          <main id="main-content">{children}</main>
          <SiteFooter
            site={{
              name: siteConfig.site.name,
              tagline: siteConfig.site.tagline,
            }}
            services={servicesData.services.map(s => ({
              id: s.id,
              title: s.title,
              href: s.href,
            }))}
            socialLinks={siteConfig.socialLinks}
            contact={{
              phone: siteConfig.contact.phone,
              email: siteConfig.contact.email,
              address: siteConfig.contact.address,
              mapsUrl: siteConfig.contact.mapsUrl,
            }}
            trustBadges={siteConfig.trustBadges}
          />
          <BackToTop />
          <WhatsAppButton whatsappUrl={siteConfig.contact.whatsapp} />

          {/* Toast notifications */}
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              style: {
                background: "#1A1A1A",
                border: "1px solid #2A2A2A",
                color: "#FAFAFA",
              },
            }}
          />

          {/* Analytics & Tracking — loaded lazily for performance */}
          <GoogleAnalytics />
          <MicrosoftClarity />
          <MetaPixel />
        </TooltipProvider>
      </body>
    </html>
  );
}
