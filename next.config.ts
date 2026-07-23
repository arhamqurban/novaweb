import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Image Optimization ─────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 768, 1024, 1280, 1440],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.vercel.app",
      },
    ],
  },

  // ─── Compressor ────────────────────────────────────────────
  compress: true,

  // ─── Strict Mode (for development) ─────────────────────────
  reactStrictMode: true,

  // ─── Powered By Header (security: hide framework info) ─────
  poweredByHeader: false,

  // ─── HTTP Security Headers ─────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://www.clarity.ms https://*.googleapis.com https://js.stripe.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.googleapis.com",
              "img-src 'self' data: blob: https: http:",
              "font-src 'self' https://fonts.gstatic.com data:",
              "connect-src 'self' https://api.emailjs.com https://api.web3forms.com https://www.google-analytics.com https://*.googleapis.com https://www.clarity.ms https://*.stripe.com",
              "frame-src 'self' https://www.google.com https://js.stripe.com",
              "media-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
          // Strict Transport Security
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // X-Content-Type-Options
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // X-Frame-Options
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Referrer-Policy
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions-Policy
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=()",
              "interest-cohort=()",
              "payment=(self)",
            ].join(", "),
          },
          // X-XSS-Protection (legacy, for older browsers)
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
