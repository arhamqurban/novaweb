"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// ─── Project Data ──────────────────────────────────────────
const PROJECTS = [
  {
    id: "restaurant",
    title: "Restaurant Website",
    category: "Landing Page",
    description: "A modern reservation platform with immersive menu & table booking.",
    gradient: "from-amber-600/20 to-orange-900/20",
    accent: "bg-amber-500",
    image: "/images/projects/project-1.svg",
  },
  {
    id: "gym",
    title: "Gym Website",
    category: "Business",
    description: "High-performance fitness brand with class scheduling & memberships.",
    gradient: "from-red-600/20 to-rose-900/20",
    accent: "bg-red-500",
    image: "/images/projects/project-2.svg",
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    category: "Portfolio",
    description: "Minimalist creative portfolio with full-screen galleries & CMS.",
    gradient: "from-violet-600/20 to-purple-900/20",
    accent: "bg-violet-500",
    image: "/images/projects/project-3.svg",
  },
  {
    id: "saas",
    title: "SaaS Website",
    category: "SaaS",
    description: "B2B platform with analytics dashboard & subscription management.",
    gradient: "from-blue-600/20 to-indigo-900/20",
    accent: "bg-blue-500",
    image: "/images/projects/project-4.svg",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Store",
    category: "E-Commerce",
    description: "Full-featured online store with secure checkout & inventory sync.",
    gradient: "from-emerald-600/20 to-teal-900/20",
    accent: "bg-emerald-500",
    image: "/images/projects/project-5.svg",
  },
  {
    id: "realestate",
    title: "Real Estate Website",
    category: "Marketplace",
    description: "Property marketplace with 3D tours & AI-powered recommendations.",
    gradient: "from-cyan-600/20 to-sky-900/20",
    accent: "bg-cyan-500",
    image: "/images/projects/project-6.svg",
  },
  {
    id: "clinic",
    title: "Clinic Website",
    category: "Healthcare",
    description: "Dental practice platform with patient portal & online booking.",
    gradient: "from-green-600/20 to-lime-900/20",
    accent: "bg-green-500",
    image: "/images/projects/project-7.svg",
  },
  {
    id: "agency",
    title: "Creative Agency",
    category: "Business",
    description: "Full-service agency site with case studies & team showcase.",
    gradient: "from-pink-600/20 to-fuchsia-900/20",
    accent: "bg-pink-500",
    image: "/images/projects/project-8.svg",
  },
];

// ─── Project Card ──────────────────────────────────────────
function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group relative"
    >
      <div
        className="
          relative overflow-hidden rounded-2xl
          bg-bg-secondary border border-border-default
          transition-all duration-500 ease-out
          group-hover:-translate-y-1.5
          group-hover:shadow-2xl
          group-hover:border-accent-primary/25
          group-hover:shadow-accent-primary/5
        "
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-bg-tertiary">
          {/* Colored gradient background as placeholder */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
          
          {/* Decorative pattern lines */}
          <div className="absolute inset-0 opacity-[0.04]">
            <div className="w-full h-full" 
              style={{
                backgroundImage: `linear-gradient(45deg, currentColor 1px, transparent 1px)`,
                backgroundSize: '30px 30px'
              }}
            />
          </div>

          {/* Accent spot */}
          <div className={`absolute top-4 left-4 w-2 h-2 rounded-full ${project.accent} opacity-60`} />

          {/* Glass reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Hover arrow button */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-primary text-text-inverse shadow-lg shadow-accent-primary/20">
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className={`w-1.5 h-1.5 rounded-full ${project.accent}`} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
              {project.category}
            </span>
          </div>

          {/* Title + Arrow */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading text-base font-semibold text-white group-hover:text-accent-primary transition-colors duration-300">
              {project.title}
            </h3>
            <div className="shrink-0 w-8 h-8 rounded-full border border-border-light flex items-center justify-center text-text-muted transition-all duration-300 group-hover:bg-accent-primary group-hover:border-accent-primary group-hover:text-text-inverse">
              <ArrowUpRight size={14} />
            </div>
          </div>

          {/* Description */}
          <p className="mt-2 text-sm text-text-tertiary leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Hover glow ring */}
        <div className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ring-1 ring-accent-primary/15 shadow-[0_0_25px_-5px_rgba(0,229,255,0.1)]" />
      </div>
    </motion.div>
  );
}

// ─── Portfolio Section ─────────────────────────────────────
export function PortfolioSection() {
  return (
    <section className="bg-bg-primary" id="portfolio">
      <div className="container-nova section-padding">
        {/* Section Header */}
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

        {/* Project Grid — 4 columns on desktop, 2 on tablet, 1 on mobile */}
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
