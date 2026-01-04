import Link from "next/link";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(0.216 0.006 56.043)" }}
    >
      {/* Navigation */}
      <nav
        className="fixed top-0 z-50 w-full border-b border-stone-800"
        style={{
          backgroundColor: "oklch(0.216 0.006 56.043 / 0.9)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold text-stone-100">
            Mind Cave
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-stone-400 hover:text-stone-200"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="rounded bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
