import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

export function HeroSection() {
  return (
    <section
      className="py-20 md:py-32"
      style={{ backgroundColor: "oklch(0.216 0.006 56.043)" }}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold leading-tight text-stone-100 md:text-5xl lg:text-6xl">
            Your Digital Library,
            <br />
            <span className="text-orange-400">Perfectly Organized</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-400 md:text-xl">
            Mind Cave helps you centralize and organize all your important
            links, bookmarks, and resources in one beautiful place.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded bg-orange-500 px-8 py-4 text-base font-medium text-white hover:bg-orange-600"
            >
              Get Started Free
              <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded border border-stone-600 px-8 py-4 text-base font-medium text-stone-300 hover:border-stone-500 hover:bg-stone-800/50"
            >
              See Features
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-stone-500">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-orange-500" />
              <span>Free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-orange-500" />
              <span>No credit card</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="overflow-hidden rounded-lg border border-stone-700 bg-stone-900 shadow-2xl">
            {/* Mock Browser Chrome */}
            <div className="flex items-center gap-2 border-b border-stone-700 bg-stone-800 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-stone-600" />
                <div className="h-3 w-3 rounded-full bg-stone-600" />
                <div className="h-3 w-3 rounded-full bg-stone-600" />
              </div>
              <div className="mx-auto flex-1 max-w-md">
                <div className="rounded bg-stone-700 px-4 py-1.5 text-center text-xs text-stone-400">
                  mindcave.app/dashboard
                </div>
              </div>
            </div>

            {/* Mock Dashboard */}
            <div className="flex">
              {/* Sidebar */}
              <div className="hidden w-56 shrink-0 border-r border-stone-700 bg-stone-800/50 p-4 md:block">
                <div className="mb-6 text-lg font-bold text-stone-200">
                  Mind Cave
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 rounded bg-orange-500/20 px-3 py-2 text-sm text-orange-400">
                    <div className="h-4 w-4 rounded bg-orange-500/30" />
                    All Bookmarks
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 text-sm text-stone-400">
                    <div className="h-4 w-4 rounded bg-stone-600" />
                    Learning
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 text-sm text-stone-400">
                    <div className="h-4 w-4 rounded bg-stone-600" />
                    Work
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-stone-200">
                    All Bookmarks
                  </h2>
                  <div className="h-8 w-24 rounded bg-orange-500 text-center text-sm leading-8 text-white">
                    + Add
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded border border-stone-700"
                    >
                      <div className="aspect-video bg-gradient-to-br from-stone-700 to-stone-800" />
                      <div className="p-3">
                        <div className="h-3 w-3/4 rounded bg-stone-600" />
                        <div className="mt-2 h-2 w-1/2 rounded bg-stone-700" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Decorative glow */}
          <div className="pointer-events-none absolute -inset-4 -z-10 bg-orange-500/5 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
