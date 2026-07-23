"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { staggerContainerVariant, fadeUpVariant } from "@/utils/animations";
import { DynamicIcon } from "@/components/ui/dynamic-icon";

interface ServicesSectionProps {
  label: string;
  heading: string;
  subtitle: string;
  services: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    features: string[];
    href: string;
  }>;
}

export function ServicesSection({ label, heading, subtitle, services }: ServicesSectionProps) {
  return (
    <section className="bg-bg-primary" id="services">
      <div className="container-nova section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center md:text-left"
        >
          <span className="overline text-accent-primary mb-4 block">{label}</span>
          <h2 className="heading-1 text-white mb-4">{heading}</h2>
          <p className="body-lg text-text-secondary max-w-2xl">
            {subtitle}
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <motion.div
          variants={staggerContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.slice(0, 6).map((service) => (
            <motion.div
              key={service.id}
              variants={fadeUpVariant()}
              className="group rounded-xl border border-border-default bg-surface-default p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-lighter hover:shadow-lg md:p-8"
            >
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-subtle text-accent-primary transition-colors group-hover:bg-accent-primary/20">
                <DynamicIcon name={service.icon} size={24} />
              </div>

              {/* Title */}
              <h3 className="heading-4 text-white mb-2">{service.title}</h3>

              {/* Description */}
              <p className="body-sm text-text-tertiary mb-4">{service.description}</p>

              {/* Feature Bullets */}
              <ul className="space-y-2 mb-6">
                {service.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={service.href}
                className="inline-flex items-center gap-1 text-sm font-medium text-text-tertiary transition-colors hover:text-accent-primary group/link"
              >
                Learn More
                <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary transition-colors hover:text-accent-hover group"
          >
            View All Services
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
