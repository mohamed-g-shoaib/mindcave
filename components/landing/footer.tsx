import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="border-t border-stone-800 py-12"
      style={{ backgroundColor: "oklch(0.216 0.006 56.043)" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-bold text-stone-100">
              Mind Cave
            </Link>
            <p className="mt-2 text-sm text-stone-500">
              Organize your digital life with ease
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 font-semibold text-stone-200">Product</h3>
            <ul className="space-y-2 text-sm text-stone-500">
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
            <h3 className="mb-4 font-semibold text-stone-200">Company</h3>
            <ul className="space-y-2 text-sm text-stone-500">
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
            <h3 className="mb-4 font-semibold text-stone-200">Legal</h3>
            <ul className="space-y-2 text-sm text-stone-500">
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

        <div className="mt-12 border-t border-stone-800 pt-8 text-center text-sm text-stone-600">
          <p>© {new Date().getFullYear()} Mind Cave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
