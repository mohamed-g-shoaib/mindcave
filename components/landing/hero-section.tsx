import Link from "next/link";
import MindCaveLogo from "@/components/mind-cave-logo";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

export function HeroSection() {
  return (
    <section
      className="py-28 md:py-40"
      style={{ backgroundColor: "oklch(0.216 0.006 56.043)" }}
    >
      <div className="mx-auto max-w-450 px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-5xl font-bold leading-tight text-stone-100 md:text-6xl lg:text-7xl xl:text-8xl">
            Your Digital Library,
            <br />
            <span className="text-orange-400">Perfectly Organized</span>
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-xl text-stone-400 md:text-2xl">
            Mind Cave helps you centralize and organize all your important
            links, bookmarks, and resources in one beautiful place.
          </p>

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 px-10 py-5 text-lg font-medium text-white hover:bg-orange-600"
            >
              Get Started Free
              <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center gap-2 border border-stone-600 px-10 py-5 text-lg font-medium text-stone-300 hover:border-stone-500 hover:bg-stone-800/50"
            >
              See Features
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-center gap-10 text-base text-stone-500">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-orange-500" />
              <span>Free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-orange-500" />
              <span>No credit card</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative mx-auto mt-20">
          <div className="overflow-hidden border border-stone-700 bg-stone-900 shadow-2xl">
            {/* Mock Browser Chrome */}
            <div className="flex items-center gap-2 border-b border-stone-700 bg-stone-800 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 bg-stone-600" />
                <div className="h-3 w-3 bg-stone-600" />
                <div className="h-3 w-3 bg-stone-600" />
              </div>
              <div className="mx-auto max-w-md flex-1">
                <div className="bg-stone-700 px-4 py-1.5 text-center text-sm text-stone-400">
                  mindcave.app/dashboard
                </div>
              </div>
            </div>

            {/* Mock Dashboard */}
            <div className="flex">
              {/* Sidebar */}
              <div className="hidden w-64 shrink-0 border-r border-stone-700 bg-stone-800/50 p-6 lg:block">
                <div className="mb-8 flex items-center gap-3">
                  <MindCaveLogo className="h-8 w-8" />
                  <span className="text-lg font-bold text-stone-200">
                    Mind Cave
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 bg-orange-500/20 px-4 py-3 text-sm text-orange-400">
                    <div className="h-4 w-4 bg-orange-500/30" />
                    All Bookmarks
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3 text-sm text-stone-400">
                    <div className="h-4 w-4 bg-stone-600" />
                    Learning
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3 text-sm text-stone-400">
                    <div className="h-4 w-4 bg-stone-600" />
                    Work
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3 text-sm text-stone-400">
                    <div className="h-4 w-4 bg-stone-600" />
                    Projects
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-8">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-stone-200">
                    All Bookmarks
                  </h2>
                  <div className="h-10 w-32 bg-orange-500 text-center text-sm leading-10 text-white">
                    + Add Bookmark
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                      key={i}
                      className="overflow-hidden border border-stone-700"
                    >
                      <div className="aspect-video bg-linear-to-br from-stone-700 to-stone-800" />
                      <div className="p-4">
                        <div className="h-4 w-3/4 bg-stone-600" />
                        <div className="mt-2 h-3 w-1/2 bg-stone-700" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Decorative glow */}
          <div className="pointer-events-none absolute -inset-8 -z-10 bg-orange-500/5 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
