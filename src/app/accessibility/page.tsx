import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Accessibility Statement",
  description: "Nova Webs is committed to making our website accessible to everyone, including people with disabilities.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <section className="min-h-screen bg-bg-primary pt-32">
      <div className="container-nova section-padding">
        <div className="mx-auto max-w-3xl">
          <h1 className="heading-1 text-white mb-4">Accessibility Statement</h1>
          <p className="body-sm text-text-muted mb-8">Last updated: July 2026</p>

          <div className="space-y-6 text-text-secondary">
            <div>
              <h2 className="heading-3 text-white mb-3">Our Commitment</h2>
              <p className="body">
                Nova Webs is committed to ensuring digital accessibility for all users, including people
                with disabilities. We strive to meet WCAG 2.2 AA standards and continuously improve the
                user experience for everyone.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-3">Accessibility Features</h2>
              <ul className="mt-3 space-y-2 list-disc pl-6">
                <li>Skip-to-content navigation for keyboard users</li>
                <li>High contrast color scheme meeting AAA standards</li>
                <li>Keyboard-navigable interface with visible focus indicators</li>
                <li>Screen reader support with ARIA labels and landmarks</li>
                <li>Reduced motion support for users with vestibular disorders</li>
                <li>Semantic HTML structure with proper heading hierarchy</li>
                <li>Descriptive alt text for all images</li>
                <li>Form validation errors announced to screen readers</li>
              </ul>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-3">Conformance Status</h2>
              <p className="body">
                We target WCAG 2.2 Level AA compliance. Our website is regularly tested using automated
                tools and manual testing with screen readers. We welcome feedback on accessibility issues.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-3">Feedback</h2>
              <p className="body">
                If you encounter any accessibility barriers, please let us know. Contact us at{" "}
                <a href="mailto:hello@novawebs.com" className="text-accent-primary hover:text-accent-hover">hello@novawebs.com</a>{" "}
                and we will make every effort to resolve the issue promptly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
