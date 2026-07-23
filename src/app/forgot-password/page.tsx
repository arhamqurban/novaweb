"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    // Simulate password reset email
    await new Promise((r) => setTimeout(r, 1500));

    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-accent-primary/5 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="text-center mb-8">
          <Link href="/" className="font-heading text-2xl font-bold text-white inline-block mb-2">
            NOVA <span className="text-accent-primary">WEBS</span>
          </Link>
          <p className="text-text-muted text-sm">Reset your password</p>
        </div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-xl p-8 text-center"
          >
            <CheckCircle size={48} className="mx-auto mb-4 text-success" />
            <h2 className="heading-4 text-white mb-2">Check Your Email</h2>
            <p className="text-sm text-text-tertiary mb-6">
              We&apos;ve sent a password reset link to <strong className="text-text-secondary">{email}</strong>
            </p>
            <Link
              href="/login"
              className="text-sm font-medium text-accent-primary hover:text-accent-hover transition-colors"
            >
              Back to Sign In
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-text-tertiary mb-4">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>
            <div>
              <label htmlFor="reset-email" className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  id="reset-email" type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com" required
                  className="w-full rounded-lg border border-border-light bg-bg-secondary pl-10 pr-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                />
              </div>
            </div>
            <button
              type="submit" disabled={loading}
              className="gradient-cyan w-full rounded-lg px-6 py-3.5 text-sm font-semibold text-text-inverse transition-all duration-300 hover:shadow-cyan-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2"><Loader2 size={16} className="animate-spin" /> Sending...</span>
              ) : "Send Reset Link"}
            </button>

            <Link
              href="/login"
              className="flex items-center justify-center gap-1 text-xs text-text-muted hover:text-text-secondary transition-colors mt-4"
            >
              <ArrowLeft size={12} /> Back to Sign In
            </Link>
          </form>
        )}
      </motion.div>
    </div>
  );
}
