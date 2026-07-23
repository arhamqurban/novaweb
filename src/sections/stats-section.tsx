"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const numericValue = parseInt(value);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasAnimated, numericValue]);

  // Non-numeric values show directly
  if (isNaN(numericValue)) {
    return (
      <div ref={ref} className="text-center">
        <div className="mono-lg text-accent-primary">{value}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className="text-center">
      <div className="mono-lg text-accent-primary">
        {count}{suffix}
      </div>
    </div>
  );
}

interface StatsSectionProps {
  stats: Array<{ value: string; label: string; suffix?: string }>;
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="bg-bg-primary">
      <div className="container-nova section-padding">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="body-sm text-text-secondary mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
