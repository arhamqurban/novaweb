// ============================================================
// Nova Webs — Site Constants & Content Data
// ============================================================

import type {
  NavLink,
  Service,
  PortfolioItem,
  Testimonial,
  ProcessStep,
  FAQItem,
  IndustryItem,
  StatItem,
  SocialLink,
  PricingTier,
  Technology,
} from "@/types";

// ─── Site Metadata ───────────────────────────────────────────
export const SITE = {
  name: "Nova Webs",
  tagline: "Digital Excellence, Crafted.",
  description:
    "Lahore's premium web design agency. We craft websites that don't just look extraordinary — they convert.",
  url: "https://novawebs.com",
  ogImage: "/images/og.jpg",
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
} as const;

// ─── Navigation ──────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Web Design", href: "/services#web-design" },
      { label: "Web Development", href: "/services#development" },
      { label: "E-Commerce", href: "/services#ecommerce" },
      { label: "Branding", href: "/services#branding" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ─── Services ────────────────────────────────────────────────
export const SERVICES: Service[] = [
  {
    id: "web-design",
    title: "Web Design",
    description: "Pixel-perfect UI/UX design that captivates and converts.",
    icon: "Palette",
    features: [
      "Discovery & Research",
      "Wireframing & Prototyping",
      "UI Design",
      "UX Optimization",
      "Interactive Prototypes",
    ],
    href: "/services#web-design",
  },
  {
    id: "development",
    title: "Web Development",
    description: "Rock-solid frontend and backend development with modern stacks.",
    icon: "Code",
    features: [
      "Frontend Development",
      "Backend Development",
      "API Integration",
      "CMS Development",
      "Performance Optimization",
    ],
    href: "/services#development",
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    description: "End-to-end online stores that drive revenue and delight customers.",
    icon: "ShoppingCart",
    features: [
      "Shopify Development",
      "WooCommerce",
      "Custom E-Commerce",
      "Payment Integration",
      "Migration Services",
    ],
    href: "/services#ecommerce",
  },
  {
    id: "branding",
    title: "Branding",
    description: "Identity that sticks. From logos to full brand systems.",
    icon: "Sparkles",
    features: [
      "Logo Design",
      "Brand Identity",
      "Brand Guidelines",
      "Visual Systems",
      "Brand Strategy",
    ],
    href: "/services#branding",
  },

  {
    id: "support",
    title: "Support & Maintenance",
    description: "Ongoing care to keep your website secure, fast, and updated.",
    icon: "Shield",
    features: [
      "24h Response Time",
      "Security Updates",
      "Performance Monitoring",
      "Content Updates",
      "Backup Management",
    ],
    href: "/services#support",
  },
];

// ─── Portfolio ───────────────────────────────────────────────
export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "iron-gym",
    title: "IronForge Gym",
    category: "Gym & Fitness",
    filterCategory: "Business",
    description: "High-performance gym website with class booking & membership management.",
    longDescription: "A complete digital ecosystem for a premium fitness brand featuring live class scheduling, membership portal, trainer profiles, and integrated payment processing.",
    image: "/images/portfolio-1.jpg",
    technologies: ["Next.js", "Stripe", "Supabase", "Framer Motion"],
    metrics: "+85% membership signups",
    href: "/portfolio/iron-gym",
    liveUrl: "https://example.com",
    aspectRatio: "square",
  },
  {
    id: "luxedine",
    title: "LuxeDine",
    category: "Restaurant",
    filterCategory: "Landing Page",
    description: "Award-winning restaurant site with immersive menu & reservation system.",
    longDescription: "An elegant dining experience with parallax storytelling, dynamic menu with dietary filters, table reservation engine, and a virtual tour of the venue.",
    image: "/images/portfolio-2.jpg",
    technologies: ["React", "Node.js", "MongoDB", "GSAP"],
    metrics: "+120% online reservations",
    href: "/portfolio/luxedine",
    liveUrl: "https://example.com",
    aspectRatio: "square",
  },
  {
    id: "dentasmile",
    title: "DentaSmile Clinic",
    category: "Dental Clinic",
    filterCategory: "Business",
    description: "Modern dental practice website with patient portal & online booking.",
    longDescription: "A calming, trust-building website for a dental clinic featuring virtual consultation booking, treatment galleries, patient education resources, and automated reminders.",
    image: "/images/portfolio-3.jpg",
    technologies: ["Next.js", "TypeScript", "Twilio", "Tailwind CSS"],
    metrics: "+60% new patients",
    href: "/portfolio/dentasmile",
    liveUrl: "https://example.com",
    aspectRatio: "square",
  },
  {
    id: "estatevue",
    title: "EstateVue Realty",
    category: "Real Estate",
    filterCategory: "E-commerce",
    description: "Premium property marketplace with 3D tours & AI recommendations.",
    longDescription: "A cutting-edge real estate platform featuring interactive property maps, 3D virtual tours, AI-powered property recommendations, and a comprehensive agent dashboard.",
    image: "/images/portfolio-4.jpg",
    technologies: ["Next.js", "Three.js", "PostgreSQL", "Mapbox"],
    metrics: "3× lead generation",
    href: "/portfolio/estatevue",
    liveUrl: "https://example.com",
    aspectRatio: "square",
  },
  {
    id: "sneakerhub",
    title: "SneakerHub",
    category: "E-Commerce",
    filterCategory: "E-commerce",
    description: "Sneaker marketplace with dynamic catalog, cart & secure checkout.",
    longDescription: "A high-converting e-commerce platform for sneaker enthusiasts with real-time inventory, size matching AI, secure checkout, and a community marketplace.",
    image: "/images/portfolio-1.jpg",
    technologies: ["Next.js", "Stripe", "Sanity CMS", "Redis"],
    metrics: "+150% revenue",
    href: "/portfolio/sneakerhub",
    aspectRatio: "square",
  },
  {
    id: "createfolio",
    title: "CreateFolio",
    category: "Portfolio",
    filterCategory: "Portfolio",
    description: "Minimalist creative portfolio for a multi-disciplinary designer.",
    longDescription: "A visually stunning portfolio showcasing work across branding, UI/UX, and motion design with custom cursor interactions, full-screen project galleries, and a built-in CMS.",
    image: "/images/portfolio-2.jpg",
    technologies: ["React", "GSAP", "Framer Motion", "WordPress"],
    metrics: "Featured on Awwwards",
    href: "/portfolio/createfolio",
    aspectRatio: "square",
  },
];

// ─── Testimonials ────────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "ali-raza",
    name: "Ali Raza",
    role: "CEO",
    company: "TechVentures",
    quote:
      "Working with Nova completely transformed our online presence. Our bounce rate dropped by 35% and conversions increased by 40% in the first month.",
    avatar: "/images/testimonial-1.jpg",
    rating: 5,
    metrics: "+40% conversions",
  },
  {
    id: "sara-khan",
    name: "Sara Khan",
    role: "Founder",
    company: "LuxeStay",
    quote:
      "They didn't just build a website — they built a complete booking ecosystem. Our online reservations increased by 65% within two months of launch.",
    avatar: "/images/testimonial-2.jpg",
    rating: 5,
    metrics: "+65% bookings",
  },
  {
    id: "usman-malik",
    name: "Usman Malik",
    role: "Director",
    company: "CityRealty",
    quote:
      "Nova's understanding of our local real estate market was impressive. They delivered a platform that our agents actually love using.",
    avatar: "/images/testimonial-3.jpg",
    rating: 5,
    metrics: "3× lead gen",
  },
  {
    id: "zara-ahmed",
    name: "Zara Ahmed",
    role: "Marketing Head",
    company: "GreenLeaf Organics",
    quote:
      "Our brand finally feels premium. Nova redesigned everything from our logo to our checkout flow. The results speak for themselves.",
    avatar: "/images/testimonial-4.jpg",
    rating: 5,
    metrics: "+55% traffic",
  },
];

// ─── Process Steps ───────────────────────────────────────────
export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: "Discovery",
    duration: "2 weeks",
    description:
      "We learn everything about your business, audience, and goals. You get a comprehensive strategy document.",
    items: [
      "Market research",
      "Competitor analysis",
      "User persona definition",
      "Technical requirements",
      "Project roadmap",
    ],
  },
  {
    id: 2,
    title: "Design",
    duration: "3 weeks",
    description:
      "We craft pixel-perfect designs that balance aesthetics with conversion psychology.",
    items: [
      "Wireframing",
      "Visual design",
      "Interactive prototypes",
      "Client feedback loops",
      "Design system creation",
    ],
  },
  {
    id: 3,
    title: "Develop",
    duration: "4 weeks",
    description:
      "We build using modern, performant technologies. Clean code, rigorous testing.",
    items: [
      "Frontend development",
      "Backend integration",
      "CMS setup",
      "Performance optimization",
      "Cross-browser testing",
    ],
  },
  {
    id: 4,
    title: "Launch",
    duration: "1 week",
    description:
      "We deploy, monitor, and optimize. Your site goes live with a solid foundation.",
    items: [
      "Deployment & go-live",
      "SEO configuration",
      "Analytics setup",
      "Team training",
      "Post-launch support",
    ],
  },
];

// ─── FAQ ─────────────────────────────────────────────────────
export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "timeline",
    question: "How long does a typical project take?",
    answer:
      "Most web design projects take 4–10 weeks depending on complexity. During our initial consultation, we'll assess your requirements and provide a tailored timeline. If you have a tight deadline, we offer expedited timelines — just let us know during your booking call.",
  },
  {
    id: "pricing",
    question: "What is your pricing model?",
    answer:
      "We offer both fixed-price packages and custom quotes depending on project scope. Our pricing is transparent with no hidden fees. We start with a free consultation to understand your needs, then provide a detailed proposal. Projects typically range from PKR 150,000 for starter sites to custom enterprise solutions.",
  },
  {
    id: "support",
    question: "Do you offer ongoing support after launch?",
    answer:
      "Absolutely. We offer flexible maintenance packages that include security updates, performance monitoring, content updates, and priority support. We believe in long-term partnerships — your success is our success.",
  },
  {
    id: "redesign",
    question: "Can you redesign an existing website?",
    answer:
      "Yes, we specialize in redesigns. We'll audit your current site, identify pain points, and create a strategy that preserves what works while transforming the rest. Our process ensures minimal disruption to your existing traffic and SEO rankings.",
  },
  {
    id: "location",
    question: "Do you work with clients outside Lahore?",
    answer:
      "Yes! While we're proudly Lahore-based, we work with clients across Pakistan and internationally. Our entire process is designed for remote collaboration — from discovery calls to project handoff. We've delivered projects for clients in Karachi, Islamabad, Dubai, and the UK.",
  },
  {
    id: "start",
    question: "What information do you need from me to get started?",
    answer:
      "For the initial consultation, just bring your vision and any reference sites you admire. We'll guide you through everything else. Once we start, we'll need your brand assets, content, and access to any existing platforms you're using.",
  },
];

// ─── Industries ──────────────────────────────────────────────
export const INDUSTRIES: IndustryItem[] = [
  {
    id: "ecommerce",
    title: "E-Commerce",
    icon: "Store",
    count: "15+ projects",
    description: "Online stores that drive revenue.",
  },
  {
    id: "real-estate",
    title: "Real Estate",
    icon: "Building2",
    count: "10+ projects",
    description: "Property platforms that generate leads.",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    icon: "HeartPulse",
    count: "8+ projects",
    description: "HIPAA-compliant patient experiences.",
  },
  {
    id: "saas",
    title: "SaaS",
    icon: "Cloud",
    count: "12+ projects",
    description: "B2B platforms that scale.",
  },
  {
    id: "education",
    title: "Education",
    icon: "GraduationCap",
    count: "6+ projects",
    description: "Learning platforms that engage.",
  },
  {
    id: "hospitality",
    title: "Hospitality",
    icon: "UtensilsCrossed",
    count: "8+ projects",
    description: "Experiences that book and return.",
  },
];

// ─── Statistics ──────────────────────────────────────────────
export const STATS: StatItem[] = [
  { value: "50", label: "Projects Delivered", suffix: "+" },
  { value: "5", label: "Years of Experience", suffix: "+" },
  { value: "98", label: "Client Satisfaction", suffix: "%" },
  { value: "100", label: "Cups of Coffee", suffix: "+" },
];

// ─── Social Links ────────────────────────────────────────────
export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "Instagram",
    url: "https://www.instagram.com/novawebs9?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    icon: "Instagram",
    label: "Follow us on Instagram",
  },
  {
    platform: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61591970637353",
    icon: "Facebook",
    label: "Follow us on Facebook",
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/company/novawebs",
    icon: "Linkedin",
    label: "Connect on LinkedIn",
  },
];

// ─── Contact Info ────────────────────────────────────────────
export const CONTACT_INFO = {
  phone: "+92 302 6684097",
  email: "novawebs09@gmail.com",
  address: "Lahore, Pakistan",
  whatsapp: "https://wa.me/923026684097",
  maps: "https://maps.google.com/?q=Lahore+Pakistan",
  whatsappMessage: "Hi Nova Webs! I'm interested in discussing a web design project.",
} as const;

// ─── Technologies ────────────────────────────────────────────
export const TECHNOLOGIES: Technology[] = [
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Astro", category: "frontend" },
  { name: "TypeScript", category: "language" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Laravel", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "Shopify", category: "cms" },
  { name: "Webflow", category: "cms" },
  { name: "Figma", category: "design" },
  { name: "Vercel", category: "devops" },
  { name: "AWS", category: "devops" },
  { name: "MySQL", category: "database" },
  { name: "PostgreSQL", category: "database" },
  { name: "GSAP", category: "animation" },
  { name: "Framer Motion", category: "animation" },
  { name: "Stripe", category: "payments" },
  { name: "Sanity", category: "cms" },
];

// ─── Pricing Tiers ───────────────────────────────────────────
export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "PKR 150,000",
    description: "Perfect for startups and small businesses getting started online.",
    features: [
      "Custom web design",
      "5-page responsive website",
      "Basic SEO setup",
      "Contact form integration",
      "1 month support",
    ],
    isFeatured: false,
    cta: "Get Started",
  },
  {
    id: "growth",
    name: "Growth",
    price: "PKR 350,000",
    description: "For growing businesses that need a competitive edge online.",
    features: [
      "Everything in Starter",
      "10-page responsive website",
      "Advanced UI/UX design",
      "CMS integration",
      "Custom animations",
      "3 months support",
    ],
    isFeatured: true,
    cta: "Most Popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom Quote",
    description: "For established businesses requiring a complete digital solution.",
    features: [
      "Everything in Growth",
      "Unlimited pages",
      "Full-stack development",
      "E-commerce integration",
      "SEO + Analytics setup",
      "6 months priority support",
      "Dedicated project manager",
    ],
    isFeatured: false,
    cta: "Book a Consultation",
  },
];

// ─── Why Choose Us ───────────────────────────────────────────
export const WHY_CHOOSE_US = [
  {
    title: "Results-Driven",
    description:
      "Every pixel is designed to convert. We don't do 'pretty' without 'profitable.' Our focus is on measurable business outcomes.",
    icon: "Target",
  },
  {
    title: "Premium Design",
    description:
      "Award-worthy aesthetics that elevate your brand above competitors. We bring global design standards to Lahore.",
    icon: "Sparkles",
  },
  {
    title: "Local Expertise",
    description:
      "Lahore-based with global standards. We understand the local market while delivering world-class quality.",
    icon: "MapPin",
  },
  {
    title: "Ongoing Support",
    description:
      "We don't disappear after launch. Long-term partnership is our model. We succeed when you succeed.",
    icon: "HeartHandshake",
  },
  {
    title: "Technical Excellence",
    description:
      "Modern tech stack, clean code, and rigorous testing. Every project is built to perform, scale, and last.",
    icon: "Zap",
  },
  {
    title: "Transparent Process",
    description:
      "No black boxes. You'll know exactly what we're doing, when, and why. Communication is our priority.",
    icon: "Eye",
  },
];

// ─── Client Logos ────────────────────────────────────────────
export const CLIENT_LOGOS = [
  { name: "TechVentures", src: "/images/client-1.svg" },
  { name: "LuxeStay", src: "/images/client-2.svg" },
  { name: "GreenLeaf", src: "/images/client-3.svg" },
  { name: "CityRealty", src: "/images/client-4.svg" },
  { name: "Pinnacle", src: "/images/client-5.svg" },
  { name: "BrightPath", src: "/images/client-6.svg" },
];

// ─── Trust Badges ────────────────────────────────────────────
export const TRUST_BADGES = [
  { label: "SSL Secure", icon: "ShieldCheck" },
  { label: "50+ Projects", icon: "CheckCircle" },
  { label: "Lahore-Based", icon: "MapPin" },
  { label: "5+ Years", icon: "Clock" },
  { label: "98% Satisfied", icon: "Smile" },
  { label: "24h Response", icon: "MessageCircle" },
];

// ─── Form Options ────────────────────────────────────────────
export const SERVICE_OPTIONS = [
  { value: "web-design", label: "Web Design" },
  { value: "development", label: "Web Development" },
  { value: "ecommerce", label: "E-Commerce" },
  { value: "branding", label: "Branding" },
  { value: "seo", label: "SEO" },
  { value: "other", label: "Other" },
];

export const BUDGET_OPTIONS = [
  { value: "below-8k", label: "Below PKR 8,000" },
  { value: "8k-15k", label: "PKR 8,000 – 15,000" },
  { value: "15k-30k", label: "PKR 15,000 – 30,000" },
  { value: "30k-plus", label: "PKR 30,000+" },
  { value: "not-sure", label: "Not Sure Yet" },
];
