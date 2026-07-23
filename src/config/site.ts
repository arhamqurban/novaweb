// ============================================================
// Nova Webs — Site Configuration
// All environment-specific and third-party service config.
// ============================================================

export const siteConfig = {
  name: "Nova Webs",
  description:
    "Lahore's premium web design agency. We craft websites that don't just look extraordinary — they convert.",

  // ─── Contact Form ───────────────────────────────────────
  // Configure your form submission service here.
  // Supported: Formspree, Web3Forms, EmailJS, FormSubmit
  form: {
    service: process.env.NEXT_PUBLIC_FORM_SERVICE || "formspree",
    endpoint:
      process.env.NEXT_PUBLIC_FORM_ENDPOINT || "https://formspree.io/f/your-form-id",
    // For EmailJS:
    emailjsServiceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
    emailjsTemplateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
    emailjsPublicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
  },

  // ─── Social Links ───────────────────────────────────────
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/novawebs9?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    facebook:
      process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/NovaWebs",
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/company/novawebs",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || "https://tiktok.com/@novawebs",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com/@novawebs",
    whatsapp:
      process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/923026684097",
    whatsappMessage:
      process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
      "Hi Nova Webs! I'm interested in discussing a web design project.",
  },

  // ─── Contact Info ───────────────────────────────────────
  contact: {
    phone: process.env.NEXT_PUBLIC_PHONE || "+92 302 6684097",
    email: process.env.NEXT_PUBLIC_EMAIL || "novawebs09@gmail.com",
    address: process.env.NEXT_PUBLIC_ADDRESS || "Lahore, Pakistan",
    mapsUrl:
      process.env.NEXT_PUBLIC_MAPS_URL || "https://maps.google.com/?q=Lahore+Pakistan",
  },

  // ─── Analytics ──────────────────────────────────────────
  analytics: {
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "",
  },
} as const;
