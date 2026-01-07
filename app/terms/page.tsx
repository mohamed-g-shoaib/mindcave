import { StaticPageLayout } from "@/components/landing/static-page-layout";

export default function TermsPage() {
  return (
    <StaticPageLayout
      title="Terms of Service"
      subtitle="Standard terms for using our platform. Simple, clear, and fair."
    >
      <div className="space-y-12 text-lg leading-relaxed text-muted-foreground">
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Acceptance of Terms
          </h2>
          <p>
            By accessing or using Mind Cave, you agree to be bound by these
            Terms of Service. If you do not agree to these terms, please do not
            use our service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            User Conduct
          </h2>
          <p>
            Mind Cave is designed for personal organization and productivity.
            You agree to use the service only for lawful purposes. You are
            responsible for all content saved to your account and must ensure
            you have the right to store and access that content.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Account Security
          </h2>
          <p>
            Mind Cave uses Google Authentication. You are responsible for
            maintaining the security of your Google account and any actions
            taken through your Mind Cave account.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Intellectual Property
          </h2>
          <p>
            All software, design, and original content on Mind Cave (excluding
            your saved links and their associated metadata) are the intellectual
            property of Mind Cave. You may not reproduce or distribute any part
            of our service without permission.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate your access to Mind
            Cave at our discretion, without notice, for conduct that we believe
            violates these Terms or is harmful to other users or the service
            itself.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Changes to Terms
          </h2>
          <p>
            We may update these terms from time to time. We will notify users of
            any significant changes by posting the new terms on this page. Your
            continued use of the service after such changes constitutes your
            acceptance of the new terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Disclaimers
          </h2>
          <p>
            Mind Cave is provided "as is" without warranties of any kind. While
            we strive 100% reliability, we are not liable for any data loss,
            service interruptions, or other issues arising from the use of the
            platform.
          </p>
        </section>
      </div>
    </StaticPageLayout>
  );
}
