import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Refund Policy",
  description: "Nova Webs refund and cancellation policy for web design and development services.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <section className="min-h-screen bg-bg-primary pt-32">
      <div className="container-nova section-padding">
        <div className="mx-auto max-w-3xl">
          <h1 className="heading-1 text-white mb-4">Refund & Cancellation Policy</h1>
          <p className="body-sm text-text-muted mb-8">Last updated: July 2026</p>

          <div className="space-y-6 text-text-secondary">
            <div>
              <h2 className="heading-3 text-white mb-3">1. Project Deposits</h2>
              <p className="body">
                A 50% deposit is required to begin any project. This deposit covers initial discovery,
                research, and design work. The deposit is non-refundable once design work has commenced.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-3">2. Cancellation</h2>
              <p className="body">
                You may cancel a project at any time. You will be billed for work completed up to the
                cancellation date. The final 50% payment is due upon project completion before delivery
                of final assets.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-3">3. Dissatisfaction</h2>
              <p className="body">
                We offer unlimited revisions during the design phase to ensure you&apos;re happy with
                the direction. If, after multiple revision rounds, you&apos;re still not satisfied, we
                will work with you to find a resolution. Refunds are assessed on a case-by-case basis.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-3">4. Maintenance & Support</h2>
              <p className="body">
                Monthly maintenance packages can be cancelled with 30 days&apos; notice. Refunds for
                unused months are provided on a pro-rata basis.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-3">5. Contact</h2>
              <p className="body">
                For refund requests or questions, contact us at{" "}
                <a href="mailto:hello@novawebs.com" className="text-accent-primary hover:text-accent-hover">hello@novawebs.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
