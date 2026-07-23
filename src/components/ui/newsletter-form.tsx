"use client";

import { useState, FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitForm } from "@/lib/form-service";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const result = await submitForm({
        email,
        type: "newsletter",
      });
      setStatus("success");
      setEmail("");
      toast.success(result.message);
    } catch (error) {
      setStatus("error");
      const msg = error instanceof Error ? error.message : "Subscription failed. Please try again.";
      toast.error(msg);
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center justify-center gap-2 text-sm text-success">
        <Check size={18} />
        <span>You&apos;re in! Check your inbox.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={status === "loading"}
        className="flex-1 rounded-lg border border-border-light bg-bg-secondary px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="gradient-cyan rounded-lg px-5 py-2.5 text-sm font-semibold text-text-inverse transition-all hover:shadow-cyan-md whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <Loader2 size={14} className="animate-spin" />
            Subscribing...
          </span>
        ) : (
          "Subscribe"
        )}
      </button>
    </form>
  );
}
