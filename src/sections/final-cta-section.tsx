"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Mail, Phone } from "lucide-react";

interface FinalCTASectionProps {
  contact: {
    whatsapp: string;
    email: string;
    phone: string;
  };
}

export function FinalCTASection({ contact }: FinalCTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-bg-primary">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent-primary/5 blur-[150px]" />
      </div>

      <div className="container-nova relative z-10 section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Heading */}
          <span className="overline text-accent-primary mb-4 block">Get Started</span>
          <h2 className="display-lg text-white mb-6 text-balance">
            Ready to Build Something Extraordinary?
          </h2>
          <p className="body-lg text-text-secondary max-w-xl mx-auto mb-8">
            Book a free consultation and let&apos;s discuss how we can transform your digital presence.
          </p>

          {/* Primary CTA */}
          <Link
            href="/booking"
            className="gradient-cyan inline-flex items-center gap-3 rounded-lg px-10 py-5 text-lg font-semibold text-text-inverse transition-all duration-300 hover:shadow-cyan-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          >
            Book Your Free Call
            <ArrowRight size={20} />
          </Link>

          {/* Alternative Contact */}
          <div className="mt-8">
            <p className="caption text-text-muted mb-4">Or reach us directly:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="group flex items-center gap-2 rounded-lg border border-border-default bg-surface-default px-5 py-3 text-sm text-text-secondary transition-all duration-300 hover:border-accent-primary hover:shadow-cyan-sm hover:text-accent-primary"
                aria-label={`Send email to ${contact.email}`}
              >
                <Mail size={16} className="shrink-0 text-accent-primary" />
                <span>{contact.email}</span>
              </a>
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="group flex items-center gap-2 rounded-lg border border-border-default bg-surface-default px-5 py-3 text-sm text-text-secondary transition-all duration-300 hover:border-accent-primary hover:shadow-cyan-sm hover:text-accent-primary"
                aria-label={`Call us at ${contact.phone}`}
              >
                <Phone size={16} className="shrink-0 text-accent-primary" />
                <span>{contact.phone}</span>
              </a>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-lg border border-border-default bg-surface-default px-5 py-3 text-sm text-text-secondary transition-all duration-300 hover:border-accent-primary hover:shadow-cyan-sm hover:text-accent-primary"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle size={16} className="shrink-0 text-accent-primary" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
