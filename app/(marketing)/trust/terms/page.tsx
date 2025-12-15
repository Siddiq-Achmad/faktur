import Link from "next/link";

export default function TermsPage() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing and using Faktur, you accept and agree to be bound by
            the terms and provision of this agreement. If you do not agree to
            these terms, please do not use our service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Faktur provides invoice management and tracking services. You agree
            to use the service only for lawful purposes and in accordance with
            these terms.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            You are responsible for:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
            <li>Maintaining the confidentiality of your account</li>
            <li>All activities that occur under your account</li>
            <li>Ensuring your use complies with applicable laws</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <p className="text-muted-foreground leading-relaxed">
            To access certain features of Faktur, you must create an account
            using Google or GitHub authentication. You agree to provide
            accurate, current, and complete information during the registration
            process.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">
            The service and its original content, features, and functionality
            are owned by Faktur and are protected by international copyright,
            trademark, patent, trade secret, and other intellectual property
            laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data and Privacy</h2>
          <p className="text-muted-foreground leading-relaxed">
            Your use of the service is also governed by our Privacy Policy.
            Please review our{" "}
            <Link
              href="/privacy"
              className="text-primary underline hover:underline-offset-2"
            >
              Privacy Policy
            </Link>{" "}
            to understand our practices.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Limitation of Liability
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Faktur shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from your use or
            inability to use the service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Service Modifications</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to modify or discontinue, temporarily or
            permanently, the service with or without notice. You agree that
            Faktur shall not be liable to you or any third party for any
            modification, suspension, or discontinuance of the service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may terminate or suspend your account and access to the service
            immediately, without prior notice or liability, for any reason,
            including breach of these terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to update or modify these terms at any time.
            Your continued use of the service after any changes constitutes
            acceptance of those changes.
          </p>
        </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
        <p className="text-muted-foreground leading-relaxed">
          If you have any questions about these Terms & Conditions, please
          contact us through our support channels.
        </p>
      </section>

      <div className="mt-12 pt-8 border-t">
        <p className="text-sm text-muted-foreground">
          For more information about how we handle your data, please review our{" "}
          <Link
            href="/trust/privacy"
            className="text-primary underline hover:underline-offset-2"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </>
  );
}
