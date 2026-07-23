"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { DynamicIcon } from "@/components/ui/dynamic-icon";

interface IndustriesSectionProps {
  label: string;
  heading: string;
  subtitle: string;
  industries: Array<{
    id: string;
    title: string;
    icon: string;
    count: string;
    description: string;
  }>;
}

export function IndustriesSection({ label, heading, subtitle, industries }: IndustriesSectionProps) {
  return (
    <section className="bg-bg-secondary">
      <div className="container-nova section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="overline text-accent-primary mb-4 block">{label}</span>
          <h2 className="heading-1 text-white mb-4">{heading}</h2>
          <p className="body-lg text-text-secondary max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Industry Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass rounded-xl p-6 transition-all duration-300 hover:bg-surface-glass/60 hover:shadow-lg"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-subtle text-accent-primary">
                <DynamicIcon name={industry.icon} size={20} />
              </div>
              <h3 className="heading-4 text-white mb-1">{industry.title}</h3>
              <span className="caption text-accent-primary block mb-2">{industry.count}</span>
              <p className="body-sm text-text-tertiary">{industry.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary transition-colors hover:text-accent-hover group"
          >
            Book a Call for Your Industry
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
