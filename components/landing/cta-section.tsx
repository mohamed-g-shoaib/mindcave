import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

interface CTASectionProps {
  user?: {
    id: string;
    email: string;
    name: string;
    avatar_url?: string;
  } | null;
}

export function CTASection({ user }: CTASectionProps) {
  return (
    <section className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-350 px-4 sm:px-8">
        <div className="relative overflow-hidden border border-primary/50 bg-primary p-8 text-center sm:p-16 md:p-24">
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
                href={user ? "/dashboard" : "/login"}
                className="inline-flex items-center justify-center gap-2 bg-background px-10 py-5 text-lg font-medium text-foreground hover:bg-background/90"
              >
                {user ? "Dashboard" : "Get Started"}
                <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-2 text-base text-background/70 sm:flex-row sm:gap-4">
              <span>No subscription</span>
              <span className="hidden sm:inline opacity-50">•</span>
              <span>Free forever</span>
              <span className="hidden sm:inline opacity-50">•</span>
              <span>Sign In fast</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
