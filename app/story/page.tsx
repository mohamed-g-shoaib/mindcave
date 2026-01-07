import { StaticPageLayout } from "@/components/landing/static-page-layout";

export default function StoryPage() {
  return (
    <StaticPageLayout
      title="Our Story"
      subtitle="The journey of creating a peaceful home for your digital life."
    >
      <div className="space-y-12 text-lg leading-relaxed text-muted-foreground">
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            The Digital Chaos
          </h2>
          <p>
            In today&apos;s digital world, we are constantly bombarded with
            information. Links from social media, research papers, inspiration
            for our next projects, and tools for our daily work are scattered
            across hundreds of tabs, forgotten in messaging apps, or lost in the
            abyss of browser bookmarks that we never open again.
          </p>
          <p>
            We realized that the problem wasn&apos;t a lack of information, but
            a lack of a peaceful place to store and organize it. Browser
            bookmarks felt like a dusty filing cabinet, and modern
            "read-it-later" apps often felt like yet another inbox to clear.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Modern Simplicity
          </h2>
          <p>
            Mind Cave was born from a simple desire: to create a space that
            feels like a sanctuary for your digital resources. A place where you
            can quickly drop a link, trust that it will be beautifully stored
            with all its context, and find it again exactly when you need it.
          </p>
          <p>We focused on three core pillars:</p>
          <ul className="list-disc pl-6 space-y-2 marker:text-primary">
            <li>
              <strong className="text-foreground">Instant Organization:</strong>{" "}
              Automatically fetching metadata so you don&apos;t have to.
            </li>
            <li>
              <strong className="text-foreground">Visual Clarity:</strong> A
              design that prioritizes aesthetics and ease of use.
            </li>
            <li>
              <strong className="text-foreground">Fastest Access:</strong>{" "}
              Powerful search and intuitive categorization that stays out of
              your way.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            The Vision
          </h2>
          <p>
            Our vision is to help millions of people reclaim their digital
            peace. Mind Cave isn&apos;t just a bookmark manager; it&apos;s a
            second brain that grows with you. Whether you&apos;re a researcher,
            a creative, a developer, or someone who just wants to keep their
            favorite recipes in one place, we built this for you.
          </p>
          <p>
            We are committed to keeping Mind Cave accessible, fast, and
            beautiful. This is just the beginning of the journey, and we&apos;re
            excited to have you with us.
          </p>
        </section>
      </div>
    </StaticPageLayout>
  );
}
