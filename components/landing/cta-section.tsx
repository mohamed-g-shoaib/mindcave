import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

export function CTASection() {
  return (
    <section
      className="py-24 md:py-32"
      style={{ backgroundColor: "oklch(0.216 0.006 56.043)" }}
    >
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-orange-900/5 p-12 text-center md:p-20">
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-stone-100 md:text-4xl lg:text-5xl">
              Start Organizing Today
            </h2>
            <p className="mt-4 text-lg text-stone-400">
              Join thousands of users who have already organized their digital
              lives with Mind Cave
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded bg-orange-500 px-8 py-4 text-base font-medium text-white hover:bg-orange-600"
              >
                Get Started Free
                <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
              </Link>
            </div>

            <p className="mt-6 text-sm text-stone-500">
              No credit card required • Free forever • Sign up in seconds
            </p>
          </div>

          {/* Decorative elements */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-500/5 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
