import Link from "next/link";
import MindCaveLogo from "@/components/mind-cave-logo";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

export function HeroSection() {
  return (
    <section className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-350 px-4 sm:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-5xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl xl:text-8xl">
            Your Digital Library,{" "}
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
              Get Started
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
              <span>Sign In fast</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative mx-auto mt-20">
          <div className="overflow-hidden border border-border bg-card">
            {/* Mock Browser Chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              <div className="mx-auto w-full max-w-xs flex-1 sm:max-w-md">
                <div className="flex items-center gap-2 bg-background px-4 py-1.5 text-xs text-muted-foreground sm:text-sm">
                  <MindCaveLogo className="h-3.5 w-3.5" />
                  <span>mindcave/dashboard</span>
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
              <div className="flex-1 p-4 sm:p-8">
                <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                    All Bookmarks
                  </h2>
                  <div className="inline-flex h-9 w-fit whitespace-nowrap items-center justify-center bg-primary px-4 text-sm font-medium text-primary-foreground sm:h-10">
                    + Add Bookmark
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i, index) => (
                    <div
                      key={i}
                      className={cn(
                        "overflow-hidden border border-border bg-background",
                        index >= 2 && "hidden md:block"
                      )}
                    >
                      <div className="aspect-video bg-linear-to-br from-muted to-input" />
                      <div className="p-4">
                        <div className="h-3 w-3/4 bg-muted" />
                        <div className="mt-2 h-2 w-1/2 bg-muted/50" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
