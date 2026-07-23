"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { DynamicIcon } from "@/components/ui/dynamic-icon";

interface WhyChooseUsProps {
  label: string;
  heading: string;
  subtitle: string;
  reasons: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

export function WhyChooseUs({ label, heading, subtitle, reasons }: WhyChooseUsProps) {
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

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {reasons.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-xl border-l-[3px] border-accent-primary bg-surface-glass p-6 transition-all duration-300 hover:bg-surface-default/80 hover:shadow-lg md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-subtle text-accent-primary">
                  <DynamicIcon name={item.icon} size={24} />
                </div>
                <div>
                  <h3 className="heading-4 text-white mb-2">{item.title}</h3>
                  <p className="body text-text-secondary">{item.description}</p>
                </div>
              </div>
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
            Book a Call to Discuss Your Project
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
