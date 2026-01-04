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
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-450 px-8 py-16">
        <div className="grid gap-12 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <MindCaveLogo className="h-8 w-8" />
              <span className="text-xl font-bold text-foreground">
                Mind Cave
              </span>
            </Link>
            <p className="mt-4 text-base text-muted-foreground">
              Organize your digital life with ease
            </p>
            <p className="mt-2 text-base text-muted-foreground/60">
              © 2026 Mind Cave. All rights reserved.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary">
              Product
            </h3>
            <ul className="space-y-4 text-base text-muted-foreground">
              <li>
                <Link href="#features" className="hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-foreground">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary">
              Company
            </h3>
            <ul className="space-y-4 text-base text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary">
              Legal
            </h3>
            <ul className="space-y-4 text-base text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links - Right Side */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary">
              Connect
            </h3>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <HugeiconsIcon icon={NewTwitterIcon} className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <HugeiconsIcon icon={GithubIcon} className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <HugeiconsIcon icon={DiscordIcon} className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <HugeiconsIcon icon={Linkedin02Icon} className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <HugeiconsIcon icon={InstagramIcon} className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        {/* Mind Cave word - inside padded container */}
        <div className="mt-16 w-full text-muted-foreground/30">
          <MindCaveWord className="h-auto w-full" />
        </div>
      </div>
    </footer>
  );
}
