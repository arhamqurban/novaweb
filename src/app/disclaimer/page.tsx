import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Disclaimer",
  description: "Nova Webs disclaimer — terms governing the use of information on this website.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <section className="min-h-screen bg-bg-primary pt-32">
      <div className="container-nova section-padding">
        <div className="mx-auto max-w-3xl">
          <h1 className="heading-1 text-white mb-4">Disclaimer</h1>
          <p className="body-sm text-text-muted mb-8">Last updated: July 2026</p>

          <div className="space-y-6 text-text-secondary">
            <div>
              <h2 className="heading-3 text-white mb-3">1. General Information</h2>
              <p className="body">
                The information provided on this website is for general informational purposes only. While
                we strive to keep information accurate and up to date, we make no representations or
                warranties of any kind, express or implied, about the completeness, accuracy, reliability,
                suitability, or availability of the information.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-3">2. Professional Advice</h2>
              <p className="body">
                The content on this website does not constitute professional advice. You should consult
                with appropriate professionals for advice specific to your situation.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-3">3. External Links</h2>
              <p className="body">
                Our website may contain links to external sites. We have no control over the content,
                privacy policies, or practices of these third-party sites and assume no responsibility
                for them.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-3">4. Limitation of Liability</h2>
              <p className="body">
                Nova Webs shall not be liable for any loss or damage arising from the use of this
                website or the information contained herein.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
