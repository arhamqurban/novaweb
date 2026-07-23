"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
interface TestimonialsSectionProps {
  label: string;
  heading: string;
  subtitle: string;
  testimonials: Array<{
    id: string;
    name: string;
    role: string;
    company: string;
    quote: string;
    avatar: string;
    rating: number;
    metrics?: string;
  }>;
}

export function TestimonialsSection({
  label,
  heading,
  subtitle,
  testimonials,
}: TestimonialsSectionProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const testimonial = testimonials[current];

  return (
    <section className="bg-bg-primary">
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
            {label}
          </span>
          <h2 className="heading-1 text-white mb-4">{heading}</h2>
          <p className="body-lg text-text-secondary max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div
          className="relative mx-auto max-w-4xl"
          role="group"
          aria-roledescription="Testimonial carousel"
          aria-label="Client testimonials"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              aria-live="polite"
              className="glass-cyan relative rounded-2xl p-8 md:p-12"
            >
              {/* Large decorative quote */}
              <span
                className="absolute -top-4 left-6 font-heading text-[120px] leading-none text-accent-primary/10 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Quote */}
              <blockquote className="relative z-10">
                <p className="body-lg md:text-[22px] text-text-primary leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </blockquote>

              {/* Metrics */}
              {testimonial.metrics && (
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent-subtle px-4 py-1.5">
                  <span className="text-xs font-semibold text-accent-primary">
                    {testimonial.metrics}
                  </span>
                </div>
              )}

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < testimonial.rating
                        ? "text-warning fill-warning"
                        : "text-text-muted"
                    }
                  />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent-primary/30 to-bg-tertiary flex items-center justify-center text-sm font-semibold text-accent-primary">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <cite className="body-sm font-semibold text-white not-italic">
                    {testimonial.name}
                  </cite>
                  <p className="caption text-text-tertiary">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-accent-primary"
                      : "w-2 bg-border-default hover:bg-text-muted"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={prev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-light text-text-secondary transition-colors hover:border-accent-primary hover:text-accent-primary"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-light text-text-secondary transition-colors hover:border-accent-primary hover:text-accent-primary"
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
