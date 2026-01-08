import { StaticPageLayout } from "@/components/landing/static-page-layout";

export default function StoryPage() {
  return (
    <StaticPageLayout
      title="Our Story"
      subtitle="Why we built Mind Cave, and why it stays simple."
    >
      <div className="space-y-12 text-lg leading-relaxed text-muted-foreground">
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            The Problem
          </h2>
          <p>
            Links are everywhere. Tabs, chats, notes, and a bookmarks bar that
            turns into a graveyard.
          </p>
          <p>
            The issue is not saving links. The issue is finding them again with
            enough context to trust what you are clicking.
          </p>
          <p>
            Browser bookmarks optimize for storage. Real work needs retrieval.
            When you come back weeks later, you need the title, the source, and
            a quick way to search and group what matters.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            The Approach
          </h2>
          <p>
            We built Mind Cave like we build production systems: start with the
            real workflow, cut the noise, and make the core path fast.
          </p>
          <p>We focused on three core pillars:</p>
          <ul className="list-disc pl-6 space-y-2 marker:text-primary">
            <li>
              <strong className="text-foreground">Instant Organization:</strong>{" "}
              Fetch metadata automatically so you do not have to.
            </li>
            <li>
              <strong className="text-foreground">Visual Clarity:</strong> Keep
              the UI clean so scanning is effortless.
            </li>
            <li>
              <strong className="text-foreground">Fastest Access:</strong>{" "}
              Search and categories that stay out of your way.
            </li>
          </ul>
          <p>
            We care about the hard parts too: predictable behavior, safe
            defaults, and features that do not create maintenance debt.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            What It Does
          </h2>
          <p>
            The core loop is intentionally boring. Save a link. Mind Cave pulls
            the title, description, and favicon. You get a clean card you can
            scan later.
          </p>
          <p>
            If you are migrating from a browser, you can import your bookmarks
            HTML export, choose which folders to bring in, and skip duplicate
            URLs.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            What We Won’t Do
          </h2>
          <p>
            We do not ship features that look impressive but make retrieval
            worse. No clutter. No dark patterns. No surprise paywalls.
          </p>
          <p>
            If a feature cannot stay reliable under real usage, it does not
            belong here.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            The Vision
          </h2>
          <p>
            Mind Cave is a bookmark manager that behaves like a second brain.
            Save a link, keep the context, and get it back when you need it.
          </p>
          <p>
            We will keep it fast, stable, and boring in the best way. If a
            feature does not help retrieval, it does not ship.
          </p>
        </section>
      </div>
    </StaticPageLayout>
  );
}
