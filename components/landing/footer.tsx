"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import MindCaveLogo from "@/components/mind-cave-logo";
import MindCaveWord from "@/components/mind-cave-word";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  NewTwitterIcon,
  GithubIcon,
  Linkedin02Icon,
  Sun01Icon,
  Moon02Icon,
  ComputerIcon,
} from "@hugeicons/core-free-icons";

interface FooterProps {
  user?: {
    id: string;
    email: string;
    name: string;
    avatar_url?: string;
  } | null;
}

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const options = [
    { value: "light", icon: Sun01Icon },
    { value: "dark", icon: Moon02Icon },
    { value: "system", icon: ComputerIcon },
  ];

  return (
    <div className="inline-flex border border-border overflow-hidden">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setTheme(option.value)}
          className={`px-2 py-1 transition-colors ${
            theme === option.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <HugeiconsIcon icon={option.icon} className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}

export function Footer({ user }: FooterProps) {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-350 px-4 sm:px-8 py-16">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <MindCaveLogo className="h-8 w-8" />
              <span className="text-xl font-bold text-foreground">
                Mind Cave
              </span>
            </Link>
            <p className="mt-4 text-base text-muted-foreground">
              Organize your digital life with ease
            </p>
            <p className="mt-4 text-base text-muted-foreground/60">
              © 2026 Mind Cave. All rights reserved.
            </p>
            <div className="mt-4">
              <ThemeToggle />
            </div>
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
                <Link href="#how-it-works" className="hover:text-foreground">
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href={user ? "/dashboard" : "/login"}
                  className="hover:text-foreground"
                >
                  {user ? "Dashboard" : "Get Started"}
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
                <Link href="/story" className="hover:text-foreground">
                  Our Story
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
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links - Right Side */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary">
              Connect
            </h3>
            <ul className="space-y-4 text-base text-muted-foreground">
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:text-foreground"
                >
                  <HugeiconsIcon icon={NewTwitterIcon} className="h-5 w-5" />X
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:text-foreground"
                >
                  <HugeiconsIcon icon={GithubIcon} className="h-5 w-5" />
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:text-foreground"
                >
                  <HugeiconsIcon icon={Linkedin02Icon} className="h-5 w-5" />
                  LinkedIn
                </Link>
              </li>
            </ul>
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
