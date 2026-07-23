"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import type { SiteConfig } from "@/lib/content";

interface HeroSectionProps {
  hero: SiteConfig["hero"];
}

export function HeroSection({ hero }: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollOpacity = Math.max(0, 1 - scrollY / 200);

  const headlineParts = hero.headlineHighlight
    ? hero.headline.split(hero.headlineHighlight)
    : [hero.headline];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-accent-primary/5 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-accent-primary/3 blur-[100px]" />
      </div>

      <div className="container-nova relative z-10 pt-24 pb-20 md:pt-32 md:pb-32">
        <div className="max-w-4xl">
          {/* Section label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="overline text-accent-primary mb-6 block"
          >
            {hero.label}
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="display-xl text-white mb-6 text-balance"
          >
            {hero.headlineHighlight && headlineParts.length > 1 ? (
              <>
                {headlineParts[0]}
                <span className="gradient-silver">{hero.headlineHighlight}</span>
                {headlineParts.slice(1).join(hero.headlineHighlight)}
              </>
            ) : (
              hero.headline
            )}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="body-lg text-text-secondary max-w-[560px] mb-8"
          >
            {hero.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link
              href={hero.primaryCta.href}
              className="gradient-cyan inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-base font-semibold text-text-inverse transition-all duration-300 hover:shadow-cyan-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              {hero.primaryCta.text}
              <ArrowRight size={18} />
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-text-inverse hover:-translate-y-0.5"
            >
              {hero.secondaryCta.text}
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-sm text-text-muted"
          >
            {hero.socialProof}
          </motion.p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ opacity: scrollOpacity, y: [0, 8, 0] }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.1 },
        }}
      >
        <span className="caption text-text-muted">SCROLL TO EXPLORE</span>
        <ChevronDown size={20} className="text-text-muted" />
      </motion.div>
    </section>
  );
}
