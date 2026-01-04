import Link from "next/link";
import MindCaveLogo from "@/components/mind-cave-logo";
import MindCaveWord from "@/components/mind-cave-word";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  NewTwitterIcon,
  GithubIcon,
  DiscordIcon,
  Linkedin02Icon,
  InstagramIcon,
} from "@hugeicons/core-free-icons";

export function Footer() {
  return (
    <footer
      className="border-t border-stone-800"
      style={{ backgroundColor: "oklch(0.216 0.006 56.043)" }}
    >
      <div className="mx-auto max-w-450 px-8 py-16">
        <div className="grid gap-12 md:grid-cols-5">
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
            <p className="mt-2 text-base text-stone-600">
              © 2026 Mind Cave. All rights reserved.
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

          {/* Social Links - Right Side */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-stone-200">
              Connect
            </h3>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-stone-500 transition-colors hover:text-stone-300"
              >
                <HugeiconsIcon icon={NewTwitterIcon} className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-stone-500 transition-colors hover:text-stone-300"
              >
                <HugeiconsIcon icon={GithubIcon} className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-stone-500 transition-colors hover:text-stone-300"
              >
                <HugeiconsIcon icon={DiscordIcon} className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-stone-500 transition-colors hover:text-stone-300"
              >
                <HugeiconsIcon icon={Linkedin02Icon} className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-stone-500 transition-colors hover:text-stone-300"
              >
                <HugeiconsIcon icon={InstagramIcon} className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        {/* Mind Cave word - inside padded container */}
        <div className="mt-16 w-full text-stone-800">
          <MindCaveWord className="h-auto w-full" />
        </div>
      </div>
    </footer>
  );
}
