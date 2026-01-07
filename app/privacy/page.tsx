import { StaticPageLayout } from "@/components/landing/static-page-layout";

export default function PrivacyPage() {
  return (
    <StaticPageLayout
      title="Privacy Policy"
      subtitle="We value your privacy as much as you do. Here is how we protect your data."
    >
      <div className="space-y-12 text-lg leading-relaxed text-muted-foreground">
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Overview
          </h2>
          <p>
            At Mind Cave, we believe privacy is a fundamental human right. Our
            business model is not based on selling your data. We built Mind Cave
            because we wanted a secure place for our own bookmarks, and we
            provide that same security to you.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Data Collection
          </h2>
          <p>
            We collect only the most essential information needed to provide our
            service:
          </p>
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
            <li>
              <strong className="text-foreground">Analytics:</strong> We use
              privacy-friendly, cookieless analytics to understand how our app
              is used without tracking individual users.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            How We Use Data
          </h2>
          <p>
            Your data is used solely to provide and improve the Mind Cave
            experience. We use it to:
          </p>
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
            Your bookmarks are stored securely using industry-standard
            encryption. We use Supabase with Row-Level Security (RLS), which
            means your data is isolated at the database level — only you can
            access your saved links.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Third-Party Services
          </h2>
          <p>
            We do not share your personal data with third parties for marketing
            purposes. We use reputable service providers (like Google for Auth
            and Supabase for storage) who adhere to strict privacy standards.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Contact Us
          </h2>
          <p>
            If you have any questions about our privacy practices, please
            contact us at privacy@mindcave.app.
          </p>
        </section>
      </div>
    </StaticPageLayout>
  );
}
