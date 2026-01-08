import { StaticPageLayout } from "@/components/landing/static-page-layout";

export default function PrivacyPage() {
  return (
    <StaticPageLayout
      title="Privacy Policy"
      subtitle="Clear, practical privacy. No marketing games."
    >
      <div className="space-y-12 text-lg leading-relaxed text-muted-foreground">
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Overview
          </h2>
          <p>
            Mind Cave is built to store your links, not to monetize you. We do
            not sell your personal data.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Data Collection
          </h2>
          <p>We collect the minimum needed to run the service:</p>
          <ul className="list-disc pl-6 space-y-2 marker:text-primary">
            <li>
              <strong className="text-foreground">Authentication:</strong> Your
              Google account information (name, email, and avatar) to manage
              your account.
            </li>
            <li>
              <strong className="text-foreground">User Content:</strong> The
              URLs, titles, descriptions, and categories of the bookmarks you
              save.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            How We Use Data
          </h2>
          <p>We use your data to provide the product:</p>
          <ul className="list-disc pl-6 space-y-2 marker:text-primary">
            <li>
              Maintain and synchronize your bookmark collection across devices.
            </li>
            <li>
              Automatically fetch metadata (titles, descriptions, favicons) for
              the links you save.
            </li>
            <li>Personalize your dashboard and preferences.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Data Security
          </h2>
          <p>
            Mind Cave uses Supabase with row level security, so data is isolated
            at the database level. Your saved links are private to your account.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Third-Party Services
          </h2>
          <p>
            Mind Cave relies on third party providers to function, like Google
            for authentication and Supabase for storage. We do not share your
            personal data with third parties for marketing.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Contact Us
          </h2>
          <p>Questions about privacy: privacy@mindcave.app</p>
        </section>
      </div>
    </StaticPageLayout>
  );
}
