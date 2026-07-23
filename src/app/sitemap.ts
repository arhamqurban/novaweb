import type { MetadataRoute } from "next";
import { SITE } from "@/constants";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://novawebs.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  const staticRoutes = [
    { url: BASE_URL, lastModified: currentDate, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE_URL}/services`, lastModified: currentDate, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/portfolio`, lastModified: currentDate, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: currentDate, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: currentDate, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/booking`, lastModified: currentDate, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/faq`, lastModified: currentDate, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/privacy`, lastModified: currentDate, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${BASE_URL}/terms`, lastModified: currentDate, changeFrequency: "yearly" as const, priority: 0.2 },
  ];

  return staticRoutes;
}
