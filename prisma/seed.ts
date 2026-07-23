// ============================================================
// Nova Webs — Database Seed Script
// Creates initial admin user and default content
// ============================================================

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Create Admin User ──────────────────────────────────────
  const adminPassword = await bcrypt.hash("ChangeMe123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@novawebs.com" },
    update: { password: adminPassword },
    create: {
      name: "Admin",
      email: "admin@novawebs.com",
      password: adminPassword,
      role: "admin",
    },
  });
  console.log(`✓ Admin user created: ${admin.email}`);

  // ─── Create Default Hero Section ────────────────────────────
  await prisma.heroSection.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      label: "Premium Web Design Agency",
      headline: "We Build Digital Experiences That Drive Results",
      headlineHighlight: "Drive Results",
      subheadline: "Lahore's premium web design agency. We craft websites that don't just look extraordinary — they convert.",
      primaryCtaText: "Book a Call",
      primaryCtaHref: "/booking",
      secondaryCtaText: "View Our Work",
      secondaryCtaHref: "/portfolio",
      socialProof: "Trusted by 50+ businesses across Pakistan",
    },
  });
  console.log("✓ Hero section created");

  // ─── Create Default Services ────────────────────────────────
  const services = [
    { slug: "web-design", title: "Web Design", description: "Pixel-perfect UI/UX design that captivates and converts.", icon: "Palette", features: JSON.stringify(["Discovery & Research", "Wireframing & Prototyping", "UI Design", "UX Optimization", "Interactive Prototypes"]), href: "/services#web-design", order: 1 },
    { slug: "development", title: "Web Development", description: "Rock-solid frontend and backend development with modern stacks.", icon: "Code", features: JSON.stringify(["Frontend Development", "Backend Development", "API Integration", "CMS Development", "Performance Optimization"]), href: "/services#development", order: 2 },
    { slug: "ecommerce", title: "E-Commerce", description: "End-to-end online stores that drive revenue and delight customers.", icon: "ShoppingCart", features: JSON.stringify(["Shopify Development", "WooCommerce", "Custom E-Commerce", "Payment Integration", "Migration Services"]), href: "/services#ecommerce", order: 3 },
    { slug: "branding", title: "Branding", description: "Identity that sticks. From logos to full brand systems.", icon: "Sparkles", features: JSON.stringify(["Logo Design", "Brand Identity", "Brand Guidelines", "Visual Systems", "Brand Strategy"]), href: "/services#branding", order: 4 },
    { slug: "seo", title: "SEO", description: "Grow organic traffic and dominate search rankings.", icon: "TrendingUp", features: JSON.stringify(["Technical SEO", "On-Page SEO", "Content Strategy", "Local SEO", "Performance Audits"]), href: "/services#seo", order: 5 },
    { slug: "support", title: "Support & Maintenance", description: "Ongoing care to keep your website secure, fast, and updated.", icon: "Shield", features: JSON.stringify(["24h Response Time", "Security Updates", "Performance Monitoring", "Content Updates", "Backup Management"]), href: "/services#support", order: 6 },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }
  console.log(`✓ ${services.length} services created`);

  // ─── Create Default Portfolio Projects ──────────────────────
  const projects = [
    { slug: "techventures", title: "TechVentures", category: "Web Design & Development", description: "Complete digital transformation for a SaaS startup with custom dashboard and analytics.", image: "/images/portfolio-1.jpg", metrics: "+40% conversion rate", technologies: JSON.stringify(["React", "Next.js", "Node.js"]), industry: "SaaS", liveUrl: "https://techventures.com", featured: true, order: 1 },
    { slug: "luxestay", title: "LuxeStay", category: "E-Commerce", description: "Premium hotel booking experience with custom CMS and real-time availability.", image: "/images/portfolio-2.jpg", metrics: "+65% online bookings", technologies: JSON.stringify(["Next.js", "Stripe", "Sanity CMS"]), industry: "Hospitality", liveUrl: "https://luxestay.com", featured: true, order: 2 },
    { slug: "greenleaf", title: "GreenLeaf Organics", category: "Branding & Web Design", description: "Complete brand identity and e-commerce platform for organic products.", image: "/images/portfolio-3.jpg", metrics: "+55% organic traffic", technologies: JSON.stringify(["Shopify", "Tailwind CSS", "Laravel"]), industry: "E-Commerce", liveUrl: "https://greenleaforganics.com", featured: true, order: 3 },
    { slug: "cityrealty", title: "CityRealty", category: "Web Development", description: "Property listing platform with advanced search, 3D tours, and agent dashboards.", image: "/images/portfolio-4.jpg", metrics: "3× lead generation", technologies: JSON.stringify(["Next.js", "PostgreSQL", "AWS"]), industry: "Real Estate", liveUrl: "https://cityrealty.pk", featured: false, order: 4 },
  ];

  for (const project of projects) {
    await prisma.portfolioProject.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }
  console.log(`✓ ${projects.length} portfolio projects created`);

  // ─── Create Default Testimonials ────────────────────────────
  const testimonials = [
    { name: "Ali Raza", role: "CEO", company: "TechVentures", quote: "Working with Nova completely transformed our online presence. Our bounce rate dropped by 35% and conversions increased by 40% in the first month.", rating: 5, metrics: "+40% conversions", featured: true, order: 1 },
    { name: "Sara Khan", role: "Founder", company: "LuxeStay", quote: "They didn't just build a website — they built a complete booking ecosystem. Our online reservations increased by 65% within two months of launch.", rating: 5, metrics: "+65% bookings", featured: true, order: 2 },
    { name: "Usman Malik", role: "Director", company: "CityRealty", quote: "Nova's understanding of our local real estate market was impressive. They delivered a platform that our agents actually love using.", rating: 5, metrics: "3× lead gen", featured: false, order: 3 },
  ];

  for (const t of testimonials) {
    const id = t.name.toLowerCase().replace(/\s+/g, "-");
    await prisma.testimonial.upsert({
      where: { id },
      update: {},
      create: { id, ...t },
    });
  }
  console.log(`✓ ${testimonials.length} testimonials created`);

  // ─── Create Default FAQs ────────────────────────────────────
  const faqs = [
    { id: "timeline", question: "How long does a typical project take?", answer: "Most web design projects take 4–10 weeks depending on complexity. During our initial consultation, we'll assess your requirements and provide a tailored timeline.", category: "general", order: 1 },
    { id: "pricing", question: "What is your pricing model?", answer: "We offer both fixed-price packages and custom quotes depending on project scope. Our pricing is transparent with no hidden fees.", category: "pricing", order: 2 },
    { id: "support", question: "Do you offer ongoing support after launch?", answer: "Absolutely. We offer flexible maintenance packages that include security updates, performance monitoring, content updates, and priority support.", category: "services", order: 3 },
    { id: "redesign", question: "Can you redesign an existing website?", answer: "Yes, we specialize in redesigns. We'll audit your current site, identify pain points, and create a strategy that preserves what works while transforming the rest.", category: "services", order: 4 },
    { id: "location", question: "Do you work with clients outside Lahore?", answer: "Yes! While we're proudly Lahore-based, we work with clients across Pakistan and internationally.", category: "general", order: 5 },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.upsert({
      where: { id: faq.id },
      update: {},
      create: faq,
    });
  }
  console.log(`✓ ${faqs.length} FAQs created`);

  // ─── Create Process Steps ───────────────────────────────────
  const steps = [
    { stepNumber: 1, title: "Discovery", duration: "2 weeks", description: "We learn everything about your business, audience, and goals.", items: ["Market research", "Competitor analysis", "User persona definition", "Technical requirements", "Project roadmap"], order: 1 },
    { stepNumber: 2, title: "Design", duration: "3 weeks", description: "We craft pixel-perfect designs that balance aesthetics with conversion psychology.", items: ["Wireframing", "Visual design", "Interactive prototypes", "Client feedback loops", "Design system creation"], order: 2 },
    { stepNumber: 3, title: "Develop", duration: "4 weeks", description: "We build using modern, performant technologies.", items: ["Frontend development", "Backend integration", "CMS setup", "Performance optimization", "Cross-browser testing"], order: 3 },
    { stepNumber: 4, title: "Launch", duration: "1 week", description: "We deploy, monitor, and optimize.", items: ["Deployment & go-live", "SEO configuration", "Analytics setup", "Team training", "Post-launch support"], order: 4 },
  ];

  for (const step of steps) {
    const existing = await prisma.processStep.findFirst({ where: { stepNumber: step.stepNumber } });
    if (!existing) {
      await prisma.processStep.create({
        data: { ...step, items: JSON.stringify(step.items) },
      });
    }
  }
  console.log(`✓ ${steps.length} process steps created`);

  console.log("\n✅ Seeding complete!");
  console.log("   Admin login: admin@novawebs.com / ChangeMe123!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
