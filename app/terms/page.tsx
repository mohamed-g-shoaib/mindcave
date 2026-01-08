import { StaticPageLayout } from "@/components/landing/static-page-layout";

export default function TermsPage() {
  return (
    <StaticPageLayout
      title="Terms of Service"
      subtitle="Simple terms for using Mind Cave."
    >
      <div className="space-y-12 text-lg leading-relaxed text-muted-foreground">
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Acceptance of Terms
          </h2>
          <p>
            By accessing or using Mind Cave, you agree to these Terms of
            Service. If you do not agree, please do not use the service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            User Conduct
          </h2>
          <p>
            Use Mind Cave for lawful purposes. You are responsible for the links
            and content you save, and you must have the right to store it.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Account Security
          </h2>
          <p>
            Mind Cave uses Google authentication. Keep your Google account
            secure. Activity through your account is treated as your activity.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Intellectual Property
          </h2>
          <p>
            The Mind Cave software and design are owned by Mind Cave. Your saved
            links remain yours. Do not copy, resell, or reverse engineer the
            service without permission.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Termination
          </h2>
          <p>
            Access may be suspended or terminated if usage violates these terms
            or harms the service or other users.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Changes to Terms
          </h2>
          <p>
            These terms may change over time. Updates will be posted on this
            page. Continued use means you accept the updated terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Disclaimers
          </h2>
          <p>
            Mind Cave is provided "as is" without warranties. We work to keep it
            reliable, but we cannot guarantee uninterrupted service and we are
            not liable for losses caused by outages or disruptions.
          </p>
        </section>
      </div>
    </StaticPageLayout>
  );
}
