import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Nova Webs terms of service — the terms governing the use of our website and services.",
};

export default function TermsPage() {
  return (
    <section className="min-h-screen bg-bg-primary pt-32">
      <div className="container-nova section-padding">
        <div className="mx-auto max-w-3xl">
          <h1 className="heading-1 text-white mb-6">Terms of Service</h1>
          <p className="body text-text-secondary mb-8">Last updated: January 2026</p>

          <div className="space-y-6 text-text-secondary">
            <div>
              <h2 className="heading-3 text-white mb-3">1. Acceptance of Terms</h2>
              <p className="body">
                By accessing or using the Nova Webs website and services, you agree to be bound by
                these terms of service.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-3">2. Services</h2>
              <p className="body">
                Nova Webs provides web design, development, e-commerce, branding, and SEO services.
                Specific project terms will be outlined in a separate project agreement.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-3">3. Intellectual Property</h2>
              <p className="body">
                Upon full payment, clients receive full ownership of the custom work produced for
                their project. Nova Webs retains the right to display completed work in our portfolio.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-3">4. Contact</h2>
              <p className="body">
                For questions about these terms, contact us at{" "}
                <a href="mailto:hello@novawebs.com" className="text-accent-primary hover:text-accent-hover">
                  hello@novawebs.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
