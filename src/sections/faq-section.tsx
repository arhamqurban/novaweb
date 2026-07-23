"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
interface FAQSectionProps {
  label: string;
  heading: string;
  subtitle: string;
  questions: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
}

export function FAQSection({
  label,
  heading,
  subtitle,
  questions,
}: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(questions[0].id);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-bg-secondary" id="faq">
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

        {/* FAQ List */}
        <div className="mx-auto max-w-3xl">
          {questions.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`border-b border-border-default last:border-b-0 ${
                i === 0 ? "border-t" : ""
              }`}
            >
              <button
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-accent-primary"
                aria-expanded={openId === item.id}
                aria-controls={`faq-answer-${item.id}`}
              >
                <span className="heading-4 text-white pr-4">{item.question}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-text-tertiary transition-transform duration-300 ${
                    openId === item.id ? "rotate-180 text-accent-primary" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openId === item.id && (
                  <motion.div
                    id={`faq-answer-${item.id}`}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                    role="region"
                    aria-labelledby={`faq-question-${item.id}`}
                  >
                    <p className="body text-text-secondary pb-5 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* More Questions CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="body-sm text-text-tertiary mb-3">Still have questions?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary transition-colors hover:text-accent-hover group"
          >
            We&apos;re here to help
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
