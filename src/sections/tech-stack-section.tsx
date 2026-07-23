"use client";

import { motion } from "framer-motion";

import { staggerContainerVariant, fadeUpVariant } from "@/utils/animations";

interface TechStackSectionProps {
  label: string;
  heading: string;
  subtitle: string;
  technologies: Array<{
    name: string;
    category: string;
  }>;
}

export function TechStackSection({ label, heading, subtitle, technologies }: TechStackSectionProps) {
  return (
    <section className="bg-bg-primary">
      <div className="container-nova section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <span className="overline text-accent-primary mb-4 block">{label}</span>
          <h2 className="heading-1 text-white mb-4">{heading}</h2>
          <p className="body-lg text-text-secondary max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Tag Cloud */}
        <motion.div
          variants={staggerContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {technologies.map((tech) => (
            <motion.span
              key={tech.name}
              variants={fadeUpVariant()}
              className="inline-flex items-center rounded-full border border-border-default bg-bg-tertiary px-4 py-2 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-accent-primary hover:text-accent-primary hover:scale-105"
            >
              {tech.name}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary transition-colors hover:text-accent-hover group"
          >
            Let&apos;s Discuss Your Tech Stack →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
