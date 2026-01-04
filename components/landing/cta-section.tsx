import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

export function CTASection() {
  return (
    <section className="border-t border-primary-foreground/10 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5 p-12 text-center md:p-20">
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
              Start Organizing Today
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/70">
              Join thousands of users who have already organized their digital
              lives with Mind Cave
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-medium text-accent-foreground hover:bg-accent/90"
              >
                Get Started Free
                <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
              </Link>
            </div>

            <p className="mt-6 text-sm text-primary-foreground/60">
              No credit card required • Free forever • Sign up in seconds
            </p>
          </div>

          {/* Decorative elements */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
