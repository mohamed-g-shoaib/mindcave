"use client";

import { useState } from "react";
import Link from "next/link";
import MindCaveLogo from "@/components/mind-cave-logo";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";

export function Navbar() {
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 z-50 w-full border-b border-stone-800"
      style={{
        backgroundColor: "oklch(0.216 0.006 56.043 / 0.95)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="mx-auto flex h-20 max-w-450 items-center justify-between px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <MindCaveLogo className="h-10 w-10" />
          <span className="text-xl font-bold text-stone-100">Mind Cave</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <div className="relative">
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="flex items-center gap-1 text-sm font-medium text-stone-300 hover:text-stone-100"
            >
              Features
              <HugeiconsIcon icon={ArrowDown01Icon} className="h-4 w-4" />
            </button>
            {productsOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProductsOpen(false)}
                />
                <div className="absolute left-0 top-full z-50 mt-2 w-64 border border-stone-700 bg-stone-900 p-4 shadow-xl">
                  <Link
                    href="#features"
                    onClick={() => setProductsOpen(false)}
                    className="block py-2 text-sm text-stone-300 hover:text-orange-400"
                  >
                    Quick Add
                  </Link>
                  <Link
                    href="#features"
                    onClick={() => setProductsOpen(false)}
                    className="block py-2 text-sm text-stone-300 hover:text-orange-400"
                  >
                    Smart Categories
                  </Link>
                  <Link
                    href="#features"
                    onClick={() => setProductsOpen(false)}
                    className="block py-2 text-sm text-stone-300 hover:text-orange-400"
                  >
                    Instant Search
                  </Link>
                </div>
              </>
            )}
          </div>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-stone-300 hover:text-stone-100"
          >
            Testimonials
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-stone-300 hover:text-stone-100"
          >
            FAQ
          </Link>
        </div>

        {/* Auth */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-stone-400 hover:text-stone-200"
          >
            Sign In
          </Link>
          <Link
            href="/login"
            className="bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
