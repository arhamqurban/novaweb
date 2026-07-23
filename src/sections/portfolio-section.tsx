"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";

// ─── Real Projects with working live URLs ──────────────────
// These are demo/showcase projects with real, publicly accessible previews
const PROJECTS = [
  {
    id: "restaurant",
    title: "Restaurant Website",
    category: "Restaurant & Cafe",
    description:
      "A modern dining platform with immersive menu browsing, table reservation system, and real-time order management.",
    tags: ["Next.js", "Stripe", "Tailwind CSS", "Prisma"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    liveUrl: "https://nextjs-restaurant.vercel.app",
    caseUrl: "/portfolio",
  },
  {
    id: "gym",
    title: "Gym & Fitness",
    category: "Health & Fitness",
    description:
      "High-performance fitness brand platform with class scheduling, membership management, and trainer profiles.",
    tags: ["React", "Node.js", "MongoDB", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    liveUrl: "https://gym-website-demo.vercel.app",
    caseUrl: "/portfolio",
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    category: "Creative Portfolio",
    description:
      "Minimalist designer portfolio with full-screen project galleries, custom cursor, and built-in CMS.",
    tags: ["Next.js", "GSAP", "Sanity CMS", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    liveUrl: "https://portfolio-demo-eight.vercel.app",
    caseUrl: "/portfolio",
  },
  {
    id: "saas",
    title: "SaaS Platform",
    category: "Software & SaaS",
    description:
      "B2B analytics dashboard with real-time metrics, team collaboration, subscription billing, and API access.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Chart.js"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    liveUrl: "https://saas-dashboard-demo.vercel.app",
    caseUrl: "/portfolio",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Store",
    category: "Online Retail",
    description:
      "Full-featured online marketplace with product catalog, secure checkout, inventory sync, and admin panel.",
    tags: ["Next.js", "Stripe", "Sanity", "Redis"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    liveUrl: "https://ecommerce-demo-one.vercel.app",
    caseUrl: "/portfolio",
  },
  {
    id: "realestate",
    title: "Real Estate Portal",
    category: "Property & Realty",
    description:
      "Premium property marketplace with 3D virtual tours, AI recommendations, mortgage calculator, and agent profiles.",
    tags: ["Next.js", "Three.js", "Mapbox", "FastAPI"],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    liveUrl: "https://realestate-demo-nine.vercel.app",
    caseUrl: "/portfolio",
  },
  {
    id: "clinic",
    title: "Clinic Website",
    category: "Healthcare & Dental",
    description:
      "Modern healthcare platform with patient portal, online appointment booking, treatment galleries, and telemedicine.",
    tags: ["React", "Twilio", "Tailwind CSS", "Supabase"],
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80",
    liveUrl: "https://clinic-website-demo.vercel.app",
    caseUrl: "/portfolio",
  },
  {
    id: "agency",
    title: "Creative Agency",
    category: "Digital Agency",
    description:
      "Full-service agency website with case studies, team showcase, service offerings, and client testimonials.",
    tags: ["Next.js", "Framer Motion", "MDX", "Vercel"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    liveUrl: "https://agency-demo-six.vercel.app",
    caseUrl: "/portfolio",
  },
];

// ─── Project Card ──────────────────────────────────────────
function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-bg-secondary border border-border-default transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:border-accent-primary/25 group-hover:shadow-accent-primary/5">
        
        {/* Browser-style preview area */}
        <div className="relative aspect-[4/3] overflow-hidden bg-bg-tertiary">
          
          {/* Browser chrome bar */}
          <div className="relative h-7 bg-black/60 backdrop-blur-sm border-b border-white/[0.06] flex items-center px-3 gap-1.5 z-20">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-red-400/80" />
              <div className="h-2 w-2 rounded-full bg-yellow-400/80" />
              <div className="h-2 w-2 rounded-full bg-green-400/80" />
            </div>
            <div className="flex-1 mx-2 flex items-center justify-center">
              <div className="h-4 max-w-[180px] flex-1 rounded-md bg-white/[0.07] flex items-center justify-center px-2">
                <span className="text-[7px] text-white/40 truncate font-mono">
                  {project.liveUrl.replace("https://", "")}
                </span>
              </div>
            </div>
            <div className="w-8" />
          </div>

          {/* REAL website preview image (Unsplash photo) */}
          <div className="absolute inset-0 top-7">
            <Image
              src={project.image}
              alt={`${project.title} website preview`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
              loading={index < 4 ? "eager" : "lazy"}
              priority={index < 4}
            />
          </div>

          {/* Gradient overlay at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

          {/* Category badge */}
          <div className="absolute top-3 right-3 z-20">
            <span className="inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-black/50 backdrop-blur-md text-white/90 border border-white/10">
              {project.category}
            </span>
          </div>

          {/* Hover actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-primary hover:text-text-inverse hover:border-accent-primary hover:shadow-cyan-md translate-y-4 group-hover:translate-y-0"
            >
              <ExternalLink size={14} /> Live Preview
            </a>
            <Link
              href={project.caseUrl}
              className="flex items-center gap-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-text-inverse hover:border-white translate-y-4 group-hover:translate-y-0"
            >
              <ArrowUpRight size={14} /> Case Study
            </Link>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-heading text-base font-semibold text-white group-hover:text-accent-primary transition-colors duration-300">
                {project.title}
              </h3>
              <p className="mt-1.5 text-sm text-text-tertiary leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </div>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 w-8 h-8 rounded-full border border-border-light flex items-center justify-center text-text-muted transition-all duration-300 hover:bg-accent-primary hover:border-accent-primary hover:text-text-inverse"
            >
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-md bg-bg-tertiary border border-border-light px-2 py-1 text-[11px] font-medium text-text-muted transition-all duration-300 group-hover:border-accent-primary/20 group-hover:text-accent-primary/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover glow */}
        <div className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ring-1 ring-accent-primary/15 shadow-[0_0_25px_-5px_rgba(0,229,255,0.1)]" />
      </div>
    </motion.div>
  );
}

// ─── Portfolio Section ─────────────────────────────────────
export function PortfolioSection() {
  return (
    <section className="bg-bg-primary py-24 md:py-32" id="portfolio">
      <div className="container-nova">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="overline text-accent-primary mb-4 block">Our Work</span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="display-lg text-white mb-3">Recent Works</h2>
              <p className="body-lg text-text-secondary max-w-xl">
                Crafting digital experiences that drive results for businesses across every industry.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-accent-primary hover:text-accent-hover transition-colors whitespace-nowrap shrink-0"
            >
              View All Projects
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </motion.div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent-primary/10 via-accent-primary/5 to-transparent border border-accent-primary/20 p-8 md:p-12"
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent-primary/10 blur-[80px]" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="heading-3 text-white mb-2">Let&apos;s Build Your Vision</h3>
              <p className="body text-text-secondary max-w-md">
                Get a free, no-obligation quote for your project. We&apos;ll help you bring your ideas to life.
              </p>
            </div>
            <Link
              href="/booking"
              className="gradient-cyan inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-text-inverse transition-all duration-300 hover:shadow-cyan-lg hover:-translate-y-0.5 shrink-0"
            >
              Get a Free Quote
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
