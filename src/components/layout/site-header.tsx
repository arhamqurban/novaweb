"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  siteName: string;
  ctaText: string;
  ctaLink: string;
  navLinks: Array<{
    label: string;
    href: string;
    children?: Array<{ label: string; href: string }>;
  }>;
}

export function SiteHeader({ siteName, ctaText, ctaLink, navLinks }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass border-b border-border-glass shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container-nova flex h-16 items-center justify-between md:h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label={`${siteName} Home`}>
          <span className="font-heading text-xl font-bold tracking-[0.08em] text-white md:text-2xl">
            {siteName}
          </span>
          <span className="relative">
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(0,229,255,0.5)]" />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group">
              {link.children ? (
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-1 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  {link.label}
                  <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                </button>
              ) : (
                <Link
                  href={link.href}
                  className="relative text-sm font-medium text-text-secondary transition-colors hover:text-text-primary after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-accent-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              )}

              {/* Mega Menu */}
              {link.children && (
                <div
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  className={cn(
                    "absolute top-full left-0 mt-2 w-[600px] rounded-xl border border-border-glass bg-bg-primary p-4 shadow-xl opacity-0 invisible transition-all duration-200 translate-y-2",
                    isDropdownOpen && "opacity-100 visible translate-y-0"
                  )}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="group/card rounded-lg px-4 py-3 transition-colors hover:bg-bg-hover"
                      >
                        <span className="text-sm font-medium text-text-primary group-hover/card:text-accent-primary transition-colors">
                          {child.label}
                        </span>
                        <span className="block text-xs text-text-tertiary mt-0.5">
                          {/* Subtle description */}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 border-t border-border-default pt-3">
                    <Link
                      href="/contact"
                      className="text-xs font-medium text-accent-primary hover:text-accent-hover transition-colors"
                    >
                      Need something custom? Let&apos;s talk →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href={ctaLink}
          className="hidden gradient-cyan rounded-lg px-6 py-2.5 text-sm font-semibold text-text-inverse transition-all duration-300 hover:shadow-cyan-md hover:-translate-y-0.5 md:block"
        >
          {ctaText}
        </Link>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-text-primary md:hidden"
          aria-label="Open navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col bg-bg-primary/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-nova flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="font-heading text-xl font-bold text-white">{siteName}</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-text-primary"
                aria-label="Close navigation menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Mobile navigation">
              <ul className="space-y-6">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                  >
                    {link.children ? (
                      <div className="space-y-3">
                        <span className="heading-2 text-white">{link.label}</span>
                        <div className="ml-4 space-y-3 border-l border-border-default pl-4">
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block text-lg text-text-secondary hover:text-accent-primary transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="heading-2 text-white hover:text-accent-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-10 space-y-6"
              >
                <Link
                  href={ctaLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="gradient-cyan block w-full rounded-lg px-6 py-4 text-center text-base font-semibold text-text-inverse"
                >
                  {ctaText}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
