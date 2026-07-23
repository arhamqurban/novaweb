"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
interface ProcessStep {
  id: number;
  title: string;
  duration: string;
  description: string;
  items: string[];
}

interface ProcessSectionProps {
  label: string;
  heading: string;
  subtitle: string;
  steps: ProcessStep[];
}

function ProcessStep({
  step,
  index,
  totalSteps,
  isOpen,
  onToggle,
}: {
  step: ProcessStep;
  index: number;
  totalSteps: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative"
    >
      {/* Desktop: Horizontal layout */}
      <div className="hidden md:flex flex-col items-center text-center">
        {/* Connecting line */}
        {index < totalSteps - 1 && (
          <div className="absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-[2px] bg-border-default" />
        )}

        {/* Step Number */}
        <button
          onClick={onToggle}
          className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 text-lg font-bold font-mono transition-all duration-300 ${
            isOpen
              ? "border-accent-primary bg-accent-primary text-text-inverse"
              : "border-border-default bg-bg-secondary text-text-tertiary hover:border-accent-primary"
          }`}
          aria-expanded={isOpen}
        >
          {step.id}
        </button>

        {/* Title */}
        <h3 className="heading-4 text-white mt-3 mb-1">{step.title}</h3>
        <span className="caption text-accent-primary">{step.duration}</span>

        {/* Expandable Content */}
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-left overflow-hidden"
          >
            <p className="body-sm text-text-secondary mb-3">
              {step.description}
            </p>
            <ul className="space-y-1.5">
              {step.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-text-tertiary"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Mobile: Vertical accordion */}
      <div className="md:hidden rounded-xl border border-border-default bg-surface-default overflow-hidden">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-between p-5 text-left"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-4">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full text-base font-bold font-mono transition-colors ${
                isOpen
                  ? "bg-accent-primary text-text-inverse"
                  : "bg-bg-tertiary text-text-tertiary"
              }`}
            >
              {step.id}
            </span>
            <div>
              <h3 className="heading-4 text-white">{step.title}</h3>
              <span className="caption text-accent-primary">
                {step.duration}
              </span>
            </div>
          </div>
          <ChevronDown
            size={18}
            className={`text-text-tertiary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 border-t border-border-default">
              <p className="body-sm text-text-secondary mt-4 mb-3">
                {step.description}
              </p>
              <ul className="space-y-1.5">
                {step.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-text-tertiary"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export function ProcessSection({
  label,
  heading,
  subtitle,
  steps,
}: ProcessSectionProps) {
  const [openStep, setOpenStep] = useState<number>(1);

  return (
    <section className="bg-bg-secondary" id="process">
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

        {/* Desktop: Horizontal Grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.id}
              step={step}
              index={index}
              totalSteps={steps.length}
              isOpen={openStep === step.id}
              onToggle={() => setOpenStep(openStep === step.id ? -1 : step.id)}
            />
          ))}
        </div>

        {/* Mobile: Vertical Stack */}
        <div className="space-y-4 md:hidden">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.id}
              step={step}
              index={index}
              totalSteps={steps.length}
              isOpen={openStep === step.id}
              onToggle={() => setOpenStep(openStep === step.id ? -1 : step.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
