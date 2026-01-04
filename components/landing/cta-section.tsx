import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

export function CTASection() {
  return (
    <section className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-[1800px] px-8">
        <div className="relative overflow-hidden border border-primary/20 bg-linear-to-br from-primary/10 to-accent/5 p-16 text-center md:p-24">
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              Start Organizing Today
            </h2>
            <p className="mt-6 text-xl text-muted-foreground">
              Join thousands of users who have already organized their digital
              lives with Mind Cave
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 bg-primary px-10 py-5 text-lg font-medium text-primary-foreground hover:bg-primary/90"
              >
                Get Started Free
                <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
              </Link>
            </div>

            <p className="mt-8 text-base text-muted-foreground">
              No credit card required • Free forever • Sign up in seconds
            </p>
          </div>

          {/* Decorative elements */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 bg-primary/5 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
