import Link from "next/link";
import MindCaveLogo from "@/components/mind-cave-logo";

export function Footer() {
  return (
    <footer
      className="border-t border-stone-800 py-16"
      style={{ backgroundColor: "oklch(0.216 0.006 56.043)" }}
    >
      <div className="mx-auto max-w-450 px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <MindCaveLogo className="h-8 w-8" />
              <span className="text-xl font-bold text-stone-100">
                Mind Cave
              </span>
            </Link>
            <p className="mt-4 text-base text-stone-500">
              Organize your digital life with ease
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-stone-200">
              Product
            </h3>
            <ul className="space-y-4 text-base text-stone-500">
              <li>
                <Link href="#features" className="hover:text-stone-300">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-stone-300">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-stone-200">
              Company
            </h3>
            <ul className="space-y-4 text-base text-stone-500">
              <li>
                <Link href="#" className="hover:text-stone-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-stone-300">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-stone-200">
              Legal
            </h3>
            <ul className="space-y-4 text-base text-stone-500">
              <li>
                <Link href="#" className="hover:text-stone-300">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-stone-300">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-stone-800 pt-10 text-center text-base text-stone-600">
          <p>© 2026 Mind Cave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
