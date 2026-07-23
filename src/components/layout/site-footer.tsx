import Link from "next/link";
import { NewsletterForm } from "@/components/ui/newsletter-form";

interface SiteFooterProps {
  site: {
    name: string;
    tagline: string;
  };
  services: Array<{
    id: string;
    title: string;
    href: string;
  }>;
  socialLinks: Array<{
    platform: string;
    url: string;
    label: string;
  }>;
  contact: {
    phone: string;
    email: string;
    address: string;
    mapsUrl: string;
  };
  trustBadges: Array<{
    label: string;
    icon: string;
  }>;
}

export function SiteFooter({ site, services, socialLinks, contact, trustBadges }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border-default bg-bg-primary"
      role="contentinfo"
    >
      <div className="container-nova section-padding">
        {/* Newsletter */}
        <div className="glass-cyan mb-12 rounded-xl p-6 md:p-8">
          <div className="mx-auto max-w-xl text-center">
            <h3 className="heading-3 text-white mb-2">
              Stay ahead of the curve.
            </h3>
            <p className="body-sm text-text-tertiary mb-6">
              Get insights, tips, and updates delivered to your inbox.
            </p>
            <NewsletterForm />
            <p className="mt-3 text-xs text-text-muted">
              ✉ No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-heading text-lg font-bold tracking-[0.08em] text-white">
                {site.name}
              </span>
              <span className="relative">
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(0,229,255,0.5)]" />
              </span>
            </Link>
            <p className="body-sm text-text-tertiary max-w-xs">
              {site.tagline} Lahore&apos;s premium digital craft studio.
            </p>
            <div className="space-y-2 text-sm text-text-tertiary">
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 transition-colors hover:text-accent-primary"
                aria-label={`Call us at ${contact.phone}`}
              >
                📞 {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 transition-colors hover:text-accent-primary"
                aria-label={`Email us at ${contact.email}`}
              >
                ✉️ {contact.email}
              </a>
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-accent-primary"
                aria-label="Visit our office in Lahore"
              >
                📍 {contact.address}
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="caption text-white mb-4">SERVICES</h4>
            <ul className="space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="body-sm text-text-tertiary transition-colors hover:text-accent-primary"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="caption text-white mb-4">COMPANY</h4>
            <ul className="space-y-3">
              {[
                { label: "About", href: "/about" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Contact", href: "/contact" },
                { label: "FAQ", href: "/faq" },
                { label: "Blog", href: "/blog" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Cookie Policy", href: "/cookie-policy" },
                { label: "Accessibility", href: "/accessibility" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="body-sm text-text-tertiary transition-colors hover:text-accent-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h4 className="caption text-white mb-4">FOLLOW US</h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-light text-text-tertiary transition-all duration-200 hover:border-accent-primary hover:bg-accent-subtle hover:text-accent-primary"
                >
                  <span className="text-xs font-medium">
                    {social.platform.slice(0, 2)}
                  </span>
                </a>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="space-y-2">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-xs text-text-tertiary"
                >
                  <span className="text-success">✓</span>
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border-default pt-6 text-center">
          <p className="caption text-text-muted">
            &copy; {currentYear} Nova Webs. All rights reserved. Made with ❤ in
            Lahore.
          </p>
        </div>
      </div>
    </footer>
  );
}
