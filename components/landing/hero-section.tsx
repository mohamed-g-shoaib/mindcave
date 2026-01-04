import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left: Text Content */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Your Digital Library,
              <br />
              Perfectly Organized
            </h1>
            <p className="text-lg text-primary-foreground/70 md:text-xl">
              Mind Cave helps you centralize and organize all your important
              links, bookmarks, and resources in one beautiful place.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-medium text-accent-foreground hover:bg-accent/90"
            >
              Get Started Free
              <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary-foreground/20 px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary-foreground/5"
            >
              See Features
            </Link>
          </div>

          <div className="flex items-center gap-8 text-sm text-primary-foreground/60">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span>Free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>

        {/* Right: Dashboard Preview */}
        <div className="relative">
          <div className="overflow-hidden rounded-lg border border-primary-foreground/20 bg-gradient-to-br from-primary-foreground/5 to-primary-foreground/10 p-1">
            <div className="aspect-video w-full rounded-md bg-background">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Dashboard Preview
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
