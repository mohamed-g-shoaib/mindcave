import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

export function CTASection() {
  return (
    <section className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-[1800px] px-8">
        <div className="relative overflow-hidden border border-primary/50 bg-primary p-16 text-center md:p-24">
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold text-background md:text-5xl lg:text-6xl">
              Start Organizing Today
            </h2>
            <p className="mt-6 text-xl text-background/80">
              Join thousands of users who have already organized their digital
              lives with Mind Cave
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 bg-background px-10 py-5 text-lg font-medium text-foreground hover:bg-background/90"
              >
                Get Started
                <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
              </Link>
            </div>

            <p className="mt-8 text-base text-background/70">
              No subscription • Free forever • Sign In in seconds
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
