"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone, Camera } from "lucide-react";
import { ContactForm } from "@/components/ui/contact-form";
interface ContactSectionProps {
  contact: {
    phone: string;
    email: string;
    address: string;
    whatsapp: string;
    whatsappMessage: string;
    mapsUrl: string;
    hours: { weekdays: string; saturday: string; sunday: string };
  };
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
    label: string;
  }>;
}

export function ContactSection({
  contact,
  socialLinks,
}: ContactSectionProps) {
  return (
    <section className="bg-bg-primary" id="contact">
      <div className="container-nova section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="overline text-accent-primary mb-4 block">
            Contact
          </span>
          <h2 className="heading-1 text-white mb-4">
            Let&apos;s Build Something Extraordinary
          </h2>
          <p className="body-lg text-text-secondary max-w-2xl mx-auto">
            Choose the way that works best for you.
          </p>
        </motion.div>

        {/* Quick Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 flex flex-wrap justify-center gap-4"
        >
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="group flex items-center gap-3 rounded-xl border border-border-default bg-surface-default px-6 py-4 transition-all duration-300 hover:border-accent-primary hover:shadow-cyan-sm"
          >
            <MessageCircle size={20} className="text-accent-primary" />
            <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary">
              WhatsApp
            </span>
          </a>
          <a
            href={socialLinks.find(s => s.platform === "Instagram")?.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
            className="group flex items-center gap-3 rounded-xl border border-border-default bg-surface-default px-6 py-4 transition-all duration-300 hover:border-accent-primary hover:shadow-cyan-sm"
          >
            <Camera size={20} className="text-accent-primary" />
            <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary">
              Instagram
            </span>
          </a>
          <a
            href={`mailto:${contact.email}`}
            aria-label={`Send email to ${contact.email}`}
            className="group flex items-center gap-3 rounded-xl border border-border-default bg-surface-default px-6 py-4 transition-all duration-300 hover:border-accent-primary hover:shadow-cyan-sm"
          >
            <Mail size={20} className="text-accent-primary" />
            <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary">
              Email
            </span>
          </a>
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            aria-label={`Call us at ${contact.phone}`}
            className="group flex items-center gap-3 rounded-xl border border-border-default bg-surface-default px-6 py-4 transition-all duration-300 hover:border-accent-primary hover:shadow-cyan-sm"
          >
            <Phone size={20} className="text-accent-primary" />
            <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary">
              Call
            </span>
          </a>
        </motion.div>

        {/* Form + Side Info */}
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <ContactForm />
          </motion.div>

          {/* Side Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-xl p-6 md:p-8 space-y-6">
              {/* Address */}
              <div>
                <h4 className="caption text-white mb-2">📍 Address</h4>
                <p className="body-sm text-text-secondary">
                  {contact.address}
                </p>
              </div>
              <div className="h-px bg-border-default" />

              {/* Hours */}
              <div>
                <h4 className="caption text-white mb-2">🕐 Working Hours</h4>
                <p className="body-sm text-text-secondary">
                  {contact.hours.weekdays}
                </p>
                <p className="body-sm text-text-tertiary">
                  {contact.hours.saturday}
                </p>
              </div>
              <div className="h-px bg-border-default" />

              {/* Contact Details */}
              <div>
                <h4 className="caption text-white mb-2">📧 Email</h4>
                <p className="body-sm text-accent-primary">
                  {contact.email}
                </p>
              </div>
              <div>
                <h4 className="caption text-white mb-2">📞 Phone</h4>
                <p className="body-sm text-accent-primary">
                  {contact.phone}
                </p>
              </div>
              <div className="h-px bg-border-default" />

              {/* Social */}
              <div>
                <h4 className="caption text-white mb-3">🌐 Follow Us</h4>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border-light text-text-tertiary transition-all hover:border-accent-primary hover:text-accent-primary"
                    >
                      <span className="text-xs font-semibold">
                        {social.platform.slice(0, 2)}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="h-px bg-border-default" />

              {/* WhatsApp CTA */}
              <div className="rounded-lg bg-accent-subtle p-4 text-center">
                <p className="body-sm text-text-secondary mb-3">
                  Prefer instant messaging?
                </p>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
                >
                  <MessageCircle size={16} />
                  WhatsApp Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
