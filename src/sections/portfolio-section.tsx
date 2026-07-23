"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

// ─── Type for portfolio items from CMS ─────────────────────
interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  metrics: string;
  href: string;
  featured: boolean;
  technologies: string[];
  industry: string;
  liveUrl: string;
}

// ─── Filter Categories ─────────────────────────────────────
const FILTERS = ["All", "SaaS", "Hospitality", "E-Commerce", "Real Estate", "Fitness"] as const;

// ─── Industry-specific preview theming ─────────────────────
const THEMES: Record<string, {
  gradient: string;
  accent: string;
  pattern: "grid" | "dots" | "waves" | "none";
  label: string;
}> = {
  "SaaS": { gradient: "from-indigo-900/60 via-purple-900/40 to-slate-900/60", accent: "#818cf8", pattern: "grid", label: "SaaS Dashboard" },
  "Fitness": { gradient: "from-orange-900/60 via-red-900/40 to-zinc-900/60", accent: "#fb923c", pattern: "waves", label: "Gym & Fitness" },
  "Hospitality": { gradient: "from-amber-900/60 via-yellow-900/40 to-stone-900/60", accent: "#fbbf24", pattern: "dots", label: "Restaurant" },
  "E-Commerce": { gradient: "from-emerald-900/60 via-teal-900/40 to-slate-900/60", accent: "#34d399", pattern: "grid", label: "E-Commerce" },
  "Real Estate": { gradient: "from-sky-900/60 via-blue-900/40 to-gray-900/60", accent: "#38bdf8", pattern: "waves", label: "Real Estate" },
};

const DEFAULT_THEME = { gradient: "from-zinc-800/60 via-zinc-900/40 to-black/60", accent: "#a1a1aa", pattern: "none" as const, label: "Web Project" };

function getTheme(industry: string) {
  return THEMES[industry] || DEFAULT_THEME;
}

// ─── Pattern SVG Components ─────────────────────────────────
function GridPattern({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={color} strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

function DotsPattern({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="1.5" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}

function WavesPattern({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.08]" viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} fillOpacity="0.3" d="M0,160L48,138.7C96,117,192,75,288,80C384,85,480,139,576,160C672,181,768,171,864,149.3C960,128,1056,96,1152,106.7C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
    </svg>
  );
}

function PatternBackground({ industry }: { industry: string }) {
  const theme = getTheme(industry);
  switch (theme.pattern) {
    case "grid": return <GridPattern color={theme.accent} />;
    case "dots": return <DotsPattern color={theme.accent} />;
    case "waves": return <WavesPattern color={theme.accent} />;
    default: return null;
  }
}

// ─── Industry Preview Content ──────────────────────────────
function PreviewContent({ industry, title }: { industry: string; title: string }) {
  const theme = getTheme(industry);

  if (industry === "SaaS") {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-6 w-6 rounded-lg" style={{ backgroundColor: theme.accent }} />
            <span className="text-[10px] font-semibold text-white/70 tracking-wider">{title}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[70, 45, 55].map((h, i) => (
              <div key={i} className="rounded-md bg-white/[0.06] p-2 space-y-1.5">
                <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
                <div className="h-6 rounded bg-white/[0.04]" style={{ height: `${h}%`, minHeight: 24 }} />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="h-6 flex-1 rounded-md bg-white/[0.06]" />
            <div className="h-6 w-16 rounded-md" style={{ backgroundColor: `${theme.accent}33` }} />
          </div>
        </div>
      </div>
    );
  }

  if (industry === "Fitness") {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full space-y-3">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-[22px] font-black tracking-[0.15em]" style={{ color: theme.accent }}>IRON</div>
              <div className="text-[10px] font-bold tracking-[0.3em] text-white/40">FORGE</div>
              <div className="mt-2 flex justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className="h-0.5 w-4 rounded-full" style={{ backgroundColor: `${theme.accent}${n <= 3 ? '66' : '22'}` }} />
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1.5 mt-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="aspect-square rounded-sm bg-white/[0.04] flex items-center justify-center">
                <div className="h-3 w-3 rounded-full border border-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (industry === "Hospitality") {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full space-y-3">
          <div className="text-center">
            <div className="font-serif text-lg font-bold tracking-wide" style={{ color: theme.accent }}>LuxeDine</div>
            <div className="text-[8px] tracking-[0.25em] text-white/30 uppercase">Fine Dining Experience</div>
          </div>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-8 w-6 rounded-sm bg-white/[0.04] relative overflow-hidden">
                <div className="absolute bottom-0 w-full h-2/3" style={{ backgroundColor: `${theme.accent}22` }} />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-0.5 w-3 rounded-full bg-white/10" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (industry === "Real Estate") {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full space-y-3">
          <div className="text-[10px] font-bold tracking-wider text-center" style={{ color: theme.accent }}>ESTATEVUE</div>
          <div className="grid grid-cols-2 gap-1.5">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="aspect-[4/3] rounded-sm bg-white/[0.04] relative overflow-hidden">
                <div className="absolute bottom-0 w-full h-1/3 bg-white/[0.03]" />
                <div className="absolute top-1 right-1 h-1 w-1.5 rounded-sm bg-white/20" />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <div className="h-1 flex-1 rounded-full bg-white/[0.06]" />
            <div className="h-1 w-6 rounded-full" style={{ backgroundColor: theme.accent }} />
            <div className="h-1 flex-1 rounded-full bg-white/[0.06]" />
          </div>
        </div>
      </div>
    );
  }

  // Default: E-Commerce or any other
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="w-full space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-4 rounded-sm bg-white/[0.04]" />
          <div className="h-4 w-10 rounded-sm" style={{ backgroundColor: `${theme.accent}33` }} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="aspect-[3/4] rounded-sm bg-white/[0.04] relative overflow-hidden">
              <div className="absolute bottom-0 w-full h-1/3 bg-white/[0.03]">
                <div className="p-1 space-y-0.5">
                  <div className="h-0.5 w-3/4 rounded-full bg-white/10" />
                  <div className="h-0.5 w-1/2 rounded-full bg-white/[0.06]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Skeleton Placeholder ──────────────────────────────────
function CardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-bg-tertiary animate-pulse">
      <div className="aspect-[16/9] w-full bg-bg-hover" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 rounded-full bg-bg-hover" />
        <div className="h-5 w-3/4 rounded bg-bg-hover" />
        <div className="h-3 w-full rounded bg-bg-hover" />
        <div className="flex gap-2 pt-1">
          <div className="h-6 w-16 rounded-full bg-bg-hover" />
          <div className="h-6 w-20 rounded-full bg-bg-hover" />
        </div>
      </div>
    </div>
  );
}

// ─── Portfolio Card ────────────────────────────────────────
function PortfolioCard({
  item,
  index,
}: {
  item: PortfolioItem;
  index: number;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const theme = getTheme(item.industry);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group relative"
    >
      <div
        className={`
          relative overflow-hidden rounded-xl
          bg-bg-secondary border border-border-default
          transition-all duration-500 ease-out
          group-hover:-translate-y-2
          group-hover:shadow-cyan-lg
          group-hover:border-accent-primary/30
          group-hover:shadow-xl
        `}
      >
        {/* ── Browser Mockup Preview ── */}
        <div className="relative aspect-[16/9] overflow-hidden bg-bg-tertiary">
          {/* Skeleton shimmer while loading */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-bg-tertiary z-20">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
            </div>
          )}

          {/* The actual image (if available) */}
          {!imageError && (
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`
                object-cover transition-all duration-700 ease-out
                group-hover:scale-[1.04]
                ${imageLoaded ? "opacity-100" : "opacity-0"}
              `}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}

          {/* Fallback: Premium browser mockup with industry preview */}
          {(!imageLoaded || imageError) && (
            <div className="absolute inset-0 z-10">
              {/* Browser chrome bar */}
              <div className="relative h-7 bg-black/40 backdrop-blur-sm border-b border-white/[0.06] flex items-center px-3 gap-1.5">
                {/* Traffic light dots */}
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-red-400/80" />
                  <div className="h-2 w-2 rounded-full bg-yellow-400/80" />
                  <div className="h-2 w-2 rounded-full bg-green-400/80" />
                </div>
                {/* URL bar */}
                <div className="flex-1 mx-2 flex items-center justify-center">
                  <div className="h-4 max-w-[180px] flex-1 rounded-md bg-white/[0.07] flex items-center justify-center px-2">
                    <span className="text-[7px] text-white/30 truncate">{item.liveUrl?.replace("https://", "") || "project.preview"}</span>
                  </div>
                </div>
                {/* Spacer for balance */}
                <div className="w-8" />
              </div>

              {/* Preview content area */}
              <div className="absolute inset-0 top-7">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} />
                <PatternBackground industry={item.industry} />

                {/* Glass reflection sheen */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />

                {/* Industry-specific preview content */}
                <PreviewContent industry={item.industry} title={item.title} />

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Browser frame subtle reflection */}
              <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          )}

          {/* Gradient Overlay on image hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />

          {/* Top-right category badge */}
          <div className="absolute top-3 right-3 z-30">
            <span
              className={`
                inline-block rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider
                bg-black/40 backdrop-blur-md text-white/90 border border-white/10
              `}
            >
              {item.category}
            </span>
          </div>

          {/* Hover: "View Live Preview" button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-30">
            <a
              href={item.liveUrl || `/portfolio/${item.id}`}
              target={item.liveUrl ? "_blank" : undefined}
              rel={item.liveUrl ? "noopener noreferrer" : undefined}
              className="
                flex items-center gap-2 rounded-lg
                bg-white/10 backdrop-blur-md
                border border-white/20
                px-5 py-2.5 text-sm font-semibold text-white
                transition-all duration-300
                hover:bg-accent-primary hover:text-text-inverse
                hover:border-accent-primary
                hover:shadow-cyan-md
                translate-y-4 group-hover:translate-y-0
              "
            >
              <ExternalLink size={16} />
              View Live Preview
            </a>
          </div>

          {/* Bottom glass border accent */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent z-30" />
        </div>

        {/* ── Card Content ── */}
        <div className="p-5 md:p-6">
          {/* Title */}
          <h3 className="heading-4 text-white mb-1.5 group-hover:text-accent-primary transition-colors duration-300">
            {item.title}
          </h3>

          {/* Description */}
          <p className="body-sm text-text-tertiary mb-4 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="
                  inline-block rounded-md
                  bg-bg-tertiary border border-border-light
                  px-2.5 py-1 text-[11px] font-medium
                  text-text-muted
                  transition-all duration-300
                  group-hover:border-accent-primary/20 group-hover:text-accent-primary/80
                "
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Metrics + CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-border-default/50">
            <span className="text-xs font-semibold text-accent-primary">
              {item.metrics}
            </span>
            <Link
              href={`/portfolio/${item.id}`}
              className="
                inline-flex items-center gap-1.5
                text-xs font-medium text-text-secondary
                transition-all duration-300
                hover:text-accent-primary
                group/link
              "
            >
              View Details
              <ArrowRight
                size={12}
                className="transition-transform duration-300 group-hover/link:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Hover glow ring */}
        <div
          className="
            pointer-events-none absolute -inset-[1px] rounded-xl
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500
            ring-1 ring-accent-primary/20
            shadow-[0_0_30px_-5px_rgba(0,229,255,0.15)]
          "
        />
      </div>
    </motion.div>
  );
}

// ─── Filter Button ─────────────────────────────────────────
function FilterButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`
        relative rounded-lg px-4 py-2 text-sm font-medium
        transition-all duration-300 ease-out
        ${
          isActive
            ? "text-text-inverse"
            : "text-text-secondary hover:text-white bg-transparent"
        }
      `}
    >
      {isActive && (
        <motion.div
          layoutId="activeFilter"
          className="absolute inset-0 rounded-lg gradient-cyan shadow-cyan-sm"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      {!isActive && (
        <div className="absolute inset-0 rounded-lg border border-border-default bg-bg-secondary/50 hover:border-border-lighter transition-colors" />
      )}
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}

// ─── Main Section ──────────────────────────────────────────
interface PortfolioSectionProps {
  label?: string;
  heading?: string;
  subtitle?: string;
  projects: Array<{
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    metrics: string;
    href: string;
    featured: boolean;
    technologies: string[];
    industry: string;
    liveUrl: string;
  }>;
}

export function PortfolioSection({
  label = "Our Work",
  heading = "Our Recent Work",
  subtitle = "Real projects. Real results.",
  projects,
}: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((item) => item.industry === activeFilter);

  return (
    <section className="relative bg-bg-primary overflow-hidden" id="portfolio">
      {/* Ambient Glow Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-accent-primary/3 blur-[120px]" />
        <div className="absolute -bottom-40 left-0 w-[400px] h-[400px] rounded-full bg-accent-primary/2 blur-[100px]" />
      </div>

      <div className="container-nova section-padding relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center md:text-left"
        >
          <span className="overline text-accent-primary mb-4 block">
            {label}
          </span>
          <h2 className="heading-1 text-white mb-4">{heading}</h2>
          <p className="body-lg text-text-secondary max-w-2xl">
            {subtitle}
          </p>
        </motion.div>

        {/* ── Category Filters ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-10 flex flex-wrap items-center gap-2"
        >
          {FILTERS.map((filter) => (
            <FilterButton
              key={filter}
              label={filter}
              isActive={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </motion.div>

        {/* ── Portfolio Grid ── */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((item, index) => (
              <PortfolioCard key={item.id} item={item} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No results message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <p className="body text-text-muted">
              No projects found in this category yet. Check back soon!
            </p>
          </motion.div>
        )}

        {/* ── View All Projects CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <Link
            href="/portfolio"
            className="
              group/cta inline-flex items-center gap-2.5
              rounded-xl border border-accent-primary/30
              bg-accent-primary/5 backdrop-blur-sm
              px-7 py-3.5 text-sm font-semibold text-accent-primary
              transition-all duration-400
              hover:bg-accent-primary hover:text-text-inverse
              hover:border-accent-primary
              hover:shadow-cyan-md
            "
          >
            View All Projects
            <ArrowRight
              size={16}
              className="transition-all duration-300 group-hover/cta:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
