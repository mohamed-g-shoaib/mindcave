import Link from "next/link";
import MindCaveLogo from "@/components/mind-cave-logo";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

export function HeroSection() {
  return (
    <section className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-450 px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-5xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl xl:text-8xl">
            Your Digital Library,
            <br />
            <span className="text-primary">Perfectly Organized</span>
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-xl text-muted-foreground md:text-2xl">
            Mind Cave helps you centralize and organize all your important
            links, bookmarks, and resources in one beautiful place.
          </p>

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-primary px-10 py-5 text-lg font-medium text-primary-foreground hover:bg-primary/90"
            >
              Get Started Free
              <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center gap-2 border border-border px-10 py-5 text-lg font-medium text-foreground/80 hover:border-foreground/50 hover:bg-secondary"
            >
              See Features
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-center gap-10 text-base text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-primary" />
              <span>Free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-primary" />
              <span>No credit card</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative mx-auto mt-20">
          <div className="overflow-hidden border border-border bg-card shadow-2xl">
            {/* Mock Browser Chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-input px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 bg-muted-foreground/40" />
                <div className="h-3 w-3 bg-muted-foreground/40" />
                <div className="h-3 w-3 bg-muted-foreground/40" />
              </div>
              <div className="mx-auto max-w-md flex-1">
                <div className="bg-secondary px-4 py-1.5 text-center text-sm text-muted-foreground">
                  mindcave.app/dashboard
                </div>
              </div>
            </div>

            {/* Mock Dashboard */}
            <div className="flex">
              {/* Sidebar */}
              <div className="hidden w-64 shrink-0 border-r border-border bg-input p-6 lg:block">
                <div className="mb-8 flex items-center gap-3">
                  <MindCaveLogo className="h-8 w-8" />
                  <span className="text-lg font-bold text-foreground">
                    Mind Cave
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 bg-primary/20 px-4 py-3 text-sm text-primary">
                    <div className="h-4 w-4 bg-primary/30" />
                    All Bookmarks
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground">
                    <div className="h-4 w-4 bg-muted-foreground/40" />
                    Learning
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground">
                    <div className="h-4 w-4 bg-muted-foreground/40" />
                    Work
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground">
                    <div className="h-4 w-4 bg-muted-foreground/40" />
                    Projects
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-8">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-foreground">
                    All Bookmarks
                  </h2>
                  <div className="h-10 w-32 bg-primary text-center text-sm leading-10 text-primary-foreground">
                    + Add Bookmark
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                      key={i}
                      className="overflow-hidden border border-border"
                    >
                      <div className="aspect-video bg-linear-to-br from-muted to-input" />
                      <div className="p-4">
                        <div className="h-4 w-3/4 bg-muted" />
                        <div className="mt-2 h-3 w-1/2 bg-muted/50" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Decorative glow */}
          <div className="pointer-events-none absolute -inset-8 -z-10 bg-primary/5 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
