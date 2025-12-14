import Link from "next/link";

export default function PrivacyPage() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Faktur ("we", "our", or "us") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our invoice management
            service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Information We Collect
          </h2>
          <h3 className="text-xl font-semibold mb-3 mt-4">
            2.1 Authentication Information
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When you sign in using Google or GitHub, we collect:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Your name</li>
            <li>Email address</li>
            <li>Profile picture</li>
            <li>Unique identifier from the OAuth provider</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">
            2.2 Business Information
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Information you provide while using the service:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Client information (names, emails, addresses)</li>
            <li>Invoice details and line items</li>
            <li>Payment records</li>
            <li>Business settings and preferences</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">
            2.3 Usage Information
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            We automatically collect certain information about your device and
            how you interact with our service, including browser type, IP
            address, and usage patterns.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. How We Use Your Information
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Provide, maintain, and improve our service</li>
            <li>Authenticate your account and provide access to features</li>
            <li>Process and manage your invoices</li>
            <li>Send you service-related notifications</li>
            <li>Respond to your requests and provide customer support</li>
            <li>Analyze usage patterns to improve user experience</li>
            <li>Detect and prevent fraud or abuse</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Information Sharing and Disclosure
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We do not sell your personal information. We may share your
            information only in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              <strong>With your consent:</strong> When you explicitly authorize
              us to share specific information
            </li>
            <li>
              <strong>Service providers:</strong> With third-party service
              providers who perform services on our behalf
            </li>
            <li>
              <strong>Legal requirements:</strong> When required by law or to
              protect our rights and safety
            </li>
            <li>
              <strong>Business transfers:</strong> In connection with a merger,
              acquisition, or sale of assets
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement appropriate technical and organizational security
            measures to protect your information. However, no method of
            transmission over the internet or electronic storage is 100% secure,
            and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
          <p className="text-muted-foreground leading-relaxed">
            We retain your information for as long as your account is active or
            as needed to provide you services. You may request deletion of your
            account and associated data at any time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Access and review your personal information</li>
            <li>Request corrections to inaccurate data</li>
            <li>Request deletion of your account and data</li>
            <li>Export your data</li>
            <li>Opt-out of certain data collection practices</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Cookies and Tracking</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use cookies and similar tracking technologies to maintain your
            session, remember your preferences, and analyze service usage. You
            can control cookies through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            9. Third-Party Services
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Our service uses OAuth authentication provided by Google and GitHub.
            Please review their privacy policies to understand how they handle
            your information:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
            <li>
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:underline-offset-2"
              >
                Google Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:underline-offset-2"
              >
                GitHub Privacy Statement
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            10. Children's Privacy
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Our service is not intended for children under 13 years of age. We
            do not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            11. Changes to This Policy
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about this Privacy Policy or our data
            practices, please contact us through our support channels.
          </p>
        </section>

      <div className="mt-12 pt-8 border-t">
        <p className="text-sm text-muted-foreground">
          For more information about our service terms, please review our{" "}
          <Link
            href="/trust/terms"
            className="text-primary underline hover:underline-offset-2"
          >
            Terms & Conditions
          </Link>
          .
        </p>
      </div>
    </>
  );
}
