"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SERVICE_OPTIONS, BUDGET_OPTIONS, CONTACT_INFO } from "@/constants";
import { submitForm } from "@/lib/form-service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ─── Validation Schemas ────────────────────────────────────
const step1Schema = z.object({
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
});

const step2Schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  preferredContact: z.string().optional(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

const TIMELINE_OPTIONS = [
  { value: "urgent", label: "ASAP (1-3 days)" },
  { value: "normal", label: "3-7 days" },
  { value: "relaxed", label: "1-2 weeks" },
  { value: "not-sure", label: "Not Sure Yet" },
];

const CONTACT_METHODS = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
];

export default function BookingClient() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
  });

  const handleStep1Submit = (data: Step1Data) => {
    setStep1Data(data);
    setStep(2);
  };

  const handleFinalSubmit = async (data: Step2Data) => {
    setIsSubmitting(true);
    try {
      await submitForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: step1Data?.service || "",
        budget: step1Data?.budget || "",
        timeline: step1Data?.timeline || "",
        preferredContact: data.preferredContact || "",
        message: `New project inquiry. Preferred contact: ${data.preferredContact || "Not specified"}.`,
        type: "booking",
        _honeypot: "",
      });
      setIsSubmitted(true);
      toast.success("Booking request sent! We'll get back to you within 24 hours.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercent = (step / 3) * 100;

  const inputClasses =
    "w-full rounded-lg border border-border-light bg-bg-secondary px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary";
  const labelClasses = "block text-sm font-medium text-text-secondary mb-1.5";
  const errorClasses = "mt-1 text-xs text-error";

  if (isSubmitted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-bg-primary pt-24">
        <div className="container-nova text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-auto max-w-lg"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success-bg">
              <Check size={36} className="text-success" />
            </div>
            <h1 className="heading-1 text-white mb-4">Booking Confirmed! 🎉</h1>
            <p className="body-lg text-text-secondary mb-6">
              We&apos;ll reach out within 24 hours to confirm your consultation slot. Check your email
              for details.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/"
                className="text-sm font-medium text-accent-primary hover:text-accent-hover transition-colors"
              >
                Back to Homepage
              </a>
              <a
                href={CONTACT_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-bg-primary pt-24">
      <div className="container-nova section-padding">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="overline text-accent-primary mb-4 block">Book a Call</span>
            <h1 className="display-lg text-white mb-4">Book Your Free Consultation</h1>
            <p className="body-lg text-text-secondary">
              Tell us about your project and we&apos;ll schedule a call.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex justify-between mb-2">
              {["Project Details", "Contact Info", "Confirmation"].map((label, i) => (
                <span
                  key={label}
                  className={`text-xs font-medium ${
                    i + 1 <= step ? "text-accent-primary" : "text-text-muted"
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
            <div className="h-1.5 rounded-full bg-border-default overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-accent-primary"
                initial={{ width: "33%" }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>

          {/* Step 1: Project Details */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={step1Form.handleSubmit(handleStep1Submit)}
                className="space-y-6"
              >
                <div className="rounded-xl border border-border-default bg-surface-default p-6 md:p-8">
                  <h2 className="heading-3 text-white mb-6">Project Details</h2>

                  <div className="space-y-5">
                    <div>
                      <label htmlFor="booking-service" className={labelClasses}>
                        What do you need? <span className="text-error">*</span>
                      </label>
                      <select
                        id="booking-service"
                        {...step1Form.register("service")}
                        className={inputClasses}
                      >
                        <option value="">Select a service</option>
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {step1Form.formState.errors.service && (
                        <p className={errorClasses} role="alert">{step1Form.formState.errors.service.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="booking-budget" className={labelClasses}>
                        Budget Range <span className="text-error">*</span>
                      </label>
                      <select
                        id="booking-budget"
                        {...step1Form.register("budget")}
                        className={inputClasses}
                      >
                        <option value="">Select budget range</option>
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {step1Form.formState.errors.budget && (
                        <p className={errorClasses} role="alert">{step1Form.formState.errors.budget.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="booking-timeline" className={labelClasses}>
                        Timeline <span className="text-error">*</span>
                      </label>
                      <select
                        id="booking-timeline"
                        {...step1Form.register("timeline")}
                        className={inputClasses}
                      >
                        <option value="">Select timeline</option>
                        {TIMELINE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {step1Form.formState.errors.timeline && (
                        <p className={errorClasses} role="alert">{step1Form.formState.errors.timeline.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="gradient-cyan inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-base font-semibold text-text-inverse transition-all hover:shadow-cyan-md"
                  >
                    Next Step
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.form>
            )}

            {/* Step 2: Contact Info */}
            {step === 2 && (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={step2Form.handleSubmit(handleFinalSubmit)}
                className="space-y-6"
              >
                <div className="rounded-xl border border-border-default bg-surface-default p-6 md:p-8">
                  <h2 className="heading-3 text-white mb-6">Contact Information</h2>

                  <div className="space-y-5">
                    <div>
                      <label htmlFor="booking-name" className={labelClasses}>
                        Your Name <span className="text-error">*</span>
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        {...step2Form.register("name")}
                        placeholder="Ahmed Khan"
                        className={inputClasses}
                        autoComplete="name"
                      />
                      {step2Form.formState.errors.name && (
                        <p className={errorClasses} role="alert">{step2Form.formState.errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="booking-email" className={labelClasses}>
                        Email Address <span className="text-error">*</span>
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        {...step2Form.register("email")}
                        placeholder="ahmed@company.com"
                        className={inputClasses}
                        autoComplete="email"
                      />
                      {step2Form.formState.errors.email && (
                        <p className={errorClasses} role="alert">{step2Form.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="booking-phone" className={labelClasses}>
                        Phone Number <span className="text-error">*</span>
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        {...step2Form.register("phone")}
                        placeholder="+92 300 1234567"
                        className={inputClasses}
                        autoComplete="tel"
                      />
                      {step2Form.formState.errors.phone && (
                        <p className={errorClasses} role="alert">{step2Form.formState.errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className={labelClasses}>Preferred Contact Method</label>
                      <div className="flex flex-wrap gap-4">
                        {CONTACT_METHODS.map((method) => (
                          <label
                            key={method.value}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              value={method.value}
                              {...step2Form.register("preferredContact")}
                              className="h-4 w-4 border-border-light bg-bg-secondary text-accent-primary focus:ring-accent-primary"
                            />
                            <span className="text-sm text-text-secondary">{method.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="gradient-cyan inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-base font-semibold text-text-inverse transition-all hover:shadow-cyan-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Booking...
                      </>
                    ) : (
                      <>
                        <Calendar size={18} />
                        Book Now
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* WhatsApp Escape Hatch */}
          <div className="mt-8 text-center">
            <p className="caption text-text-muted mb-3">Prefer instant booking?</p>
            <a
              href={CONTACT_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:text-accent-hover transition-colors"
            >
              <MessageCircle size={16} />
              Book via WhatsApp instead
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
