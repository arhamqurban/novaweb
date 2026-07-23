import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Nova Webs privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <section className="min-h-screen bg-bg-primary pt-32">
      <div className="container-nova section-padding">
        <div className="mx-auto max-w-3xl prose prose-invert">
          <h1 className="heading-1 text-white mb-6">Privacy Policy</h1>
          <p className="body text-text-secondary mb-8">Last updated: January 2026</p>

          <div className="space-y-6 text-text-secondary">
            <div>
              <h2 className="heading-3 text-white mb-3">1. Information We Collect</h2>
              <p className="body">
                We collect information you provide directly, such as your name, email address,
                phone number, and project details when you fill out our contact form or book a consultation.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-3">2. How We Use Your Information</h2>
              <p className="body">
                We use your information to respond to your inquiries, provide our services, send
                project updates, and improve our website experience.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-3">3. Data Protection</h2>
              <p className="body">
                We implement industry-standard security measures to protect your personal information.
                We never sell or share your data with third parties for marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-3">4. Contact</h2>
              <p className="body">
                For any questions about this privacy policy, please contact us at{" "}
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
