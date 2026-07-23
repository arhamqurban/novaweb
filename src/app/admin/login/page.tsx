"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";

// Password is set in .env.local as ADMIN_PASSWORD
// Fallback: nova123
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "nova123";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("nova_admin", "true");
      router.push("/admin");
    } else {
      setError("Wrong password. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl font-bold text-white mb-2">
            NOVA <span className="text-accent-primary">WEBS</span>
          </h1>
          <p className="text-text-muted text-sm">Admin Panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-lg border border-border-light bg-bg-secondary pl-10 pr-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                autoFocus
              />
            </div>
            {error && <p className="mt-2 text-xs text-error">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="gradient-cyan w-full rounded-lg px-6 py-3 text-sm font-semibold text-text-inverse transition-all hover:shadow-cyan-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Checking...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-text-muted">
          <a href="/" className="hover:text-accent-primary transition-colors">← Back to website</a>
        </p>
      </div>
    </div>
  );
}
