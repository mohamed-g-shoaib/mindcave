import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-primary-foreground/10 bg-primary-foreground/5 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="text-xl font-bold text-primary-foreground"
            >
              Mind Cave
            </Link>
            <p className="mt-2 text-sm text-primary-foreground/60">
              Organize your digital life with ease
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 font-semibold text-primary-foreground">
              Product
            </h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link
                  href="#features"
                  className="hover:text-primary-foreground"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary-foreground">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 font-semibold text-primary-foreground">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link href="#" className="hover:text-primary-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-semibold text-primary-foreground">
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link href="#" className="hover:text-primary-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Mind Cave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
