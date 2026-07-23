"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { SERVICE_OPTIONS, BUDGET_OPTIONS } from "@/constants";
import { submitForm } from "@/lib/form-service";

// ─── Validation Schema ─────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  company: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().optional(),
  message: z.string().min(10, "Please provide more detail about your project"),
  _honeypot: z.string().optional(), // Honeypot — always empty for humans
});

type FormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "",
      budget: "",
      message: "",
      _honeypot: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await submitForm(data);

      setIsSubmitted(true);
      reset();
      toast.success(result.message);

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-border-light bg-bg-secondary px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary";
  const labelClasses = "block text-sm font-medium text-text-secondary mb-1.5";
  const errorClasses = "mt-1 text-xs text-error";
  const selectClasses = inputClasses + " appearance-none";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot — invisible to humans, catches bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="_honeypot">Leave this empty</label>
        <input
          id="_honeypot"
          type="text"
          {...register("_honeypot")}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-lg bg-success-bg p-4 text-sm text-success"
        >
          <CheckCircle size={18} className="shrink-0" />
          <span>
            Message sent successfully! We&apos;ll get back to you within 24
            hours.
          </span>
        </motion.div>
      )}

      {/* Name + Company Row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Full Name <span className="text-error">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="Ahmed Khan"
            className={inputClasses}
            aria-invalid={!!errors.name}
            autoComplete="name"
          />
          {errors.name && (
            <p className={errorClasses} role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="company" className={labelClasses}>
            Company
          </label>
          <input
            id="company"
            type="text"
            {...register("company")}
            placeholder="TechVentures (optional)"
            className={inputClasses}
            autoComplete="organization"
          />
        </div>
      </div>

      {/* Email + Phone Row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email Address <span className="text-error">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="ahmed@company.com"
            className={inputClasses}
            aria-invalid={!!errors.email}
            autoComplete="email"
          />
          {errors.email && (
            <p className={errorClasses} role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone Number <span className="text-error">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="+92 300 1234567"
            className={inputClasses}
            aria-invalid={!!errors.phone}
            autoComplete="tel"
          />
          {errors.phone && (
            <p className={errorClasses} role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      {/* Service + Budget Row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className={labelClasses}>
            Service Required <span className="text-error">*</span>
          </label>
          <select
            id="service"
            {...register("service")}
            className={selectClasses}
            aria-invalid={!!errors.service}
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className={errorClasses} role="alert">
              {errors.service.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="budget" className={labelClasses}>
            Budget Range
          </label>
          <select id="budget" {...register("budget")} className={selectClasses}>
            <option value="">Select budget (optional)</option>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClasses}>
          Project Details <span className="text-error">*</span>
        </label>
        <textarea
          id="message"
          {...register("message")}
          rows={5}
          placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
          className={inputClasses + " resize-none"}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className={errorClasses} role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 rounded border-border-light bg-bg-secondary text-accent-primary focus:ring-accent-primary"
        />
        <label htmlFor="consent" className="text-xs text-text-tertiary">
          I agree to the{" "}
          <a
            href="/privacy"
            className="text-accent-primary underline hover:text-accent-hover"
          >
            Privacy Policy
          </a>{" "}
          and consent to Nova Webs processing my data.
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="gradient-cyan inline-flex w-full items-center justify-center gap-2 rounded-lg px-8 py-4 text-base font-semibold text-text-inverse transition-all duration-300 hover:shadow-cyan-md disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send size={16} />
          </>
        )}
      </button>
    </form>
  );
}
