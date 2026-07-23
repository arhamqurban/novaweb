import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Cookie Policy",
  description: "Nova Webs cookie policy — how we use cookies to enhance your browsing experience.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <section className="min-h-screen bg-bg-primary pt-32">
      <div className="container-nova section-padding">
        <div className="mx-auto max-w-3xl">
          <h1 className="heading-1 text-white mb-4">Cookie Policy</h1>
          <p className="body-sm text-text-muted mb-8">Last updated: July 2026</p>

          <div className="space-y-6 text-text-secondary">
            <div>
              <h2 className="heading-3 text-white mb-3">1. What Are Cookies</h2>
              <p className="body">
                Cookies are small text files stored on your device when you visit a website. They help us
                improve your experience by remembering preferences, analyzing site traffic, and enabling
                core functionality.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-3">2. How We Use Cookies</h2>
              <p className="body">We use cookies for the following purposes:</p>
              <ul className="mt-3 space-y-2 list-disc pl-6">
                <li><strong>Essential:</strong> Required for the website to function properly</li>
                <li><strong>Analytics:</strong> Help us understand how visitors interact with our site (Google Analytics, Clarity)</li>
                <li><strong>Marketing:</strong> Track conversions from our advertising campaigns (Meta Pixel)</li>
              </ul>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-3">3. Third-Party Cookies</h2>
              <p className="body">
                We use trusted third-party services that may set their own cookies:
              </p>
              <ul className="mt-3 space-y-2 list-disc pl-6">
                <li>Google Analytics — for website analytics</li>
                <li>Microsoft Clarity — for user behavior analysis</li>
                <li>Meta Platforms — for conversion tracking</li>
              </ul>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-3">4. Managing Cookies</h2>
              <p className="body">
                You can control cookies through your browser settings. Most browsers allow you to block
                or delete cookies. Note that blocking essential cookies may affect website functionality.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-3">5. Contact</h2>
              <p className="body">
                For questions about our cookie policy, contact us at{" "}
                <a href="mailto:hello@novawebs.com" className="text-accent-primary hover:text-accent-hover">hello@novawebs.com</a>.
              </p>
            </div>

            <div className="pt-6 border-t border-border-default">
              <Link href="/privacy" className="text-sm text-accent-primary hover:text-accent-hover transition-colors">
                ← View our Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
