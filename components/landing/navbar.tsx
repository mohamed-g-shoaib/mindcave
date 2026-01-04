"use client";

import Link from "next/link";
import MindCaveLogo from "@/components/mind-cave-logo";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const features: { title: string; href: string; description: string }[] = [
  {
    title: "Quick Add",
    href: "#features",
    description: "Save any link instantly with our streamlined capture tool.",
  },
  {
    title: "Smart Categories",
    href: "#features",
    description: "Automated organization with intelligent tagging and sorting.",
  },
  {
    title: "Instant Search",
    href: "#features",
    description: "Find any resource in seconds with our lightning-fast search.",
  },
];

export function Navbar() {
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

        {/* Navigation Menu */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-stone-300 hover:bg-stone-800 hover:text-stone-100 data-open:bg-stone-800">
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent className="border border-stone-700 bg-stone-900 p-4">
                  <ul className="grid w-100 gap-2 p-2">
                    {features.map((feature) => (
                      <ListItem
                        key={feature.title}
                        title={feature.title}
                        href={feature.href}
                      >
                        {feature.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link href="#testimonials" />}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-stone-300 hover:bg-stone-800 hover:text-stone-100"
                  )}
                >
                  Testimonials
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link href="#faq" />}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-stone-300 hover:bg-stone-800 hover:text-stone-100"
                  )}
                >
                  FAQ
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth */}
        <div className="flex items-center gap-4 text-stone-100">
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

function ListItem({
  title,
  children,
  href,
  className,
  ...props
}: {
  title: string;
  href: string;
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<"li">) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={<Link href={href} />}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-stone-800 hover:text-stone-100 focus:bg-stone-800 focus:text-stone-100",
          className
        )}
      >
        <div className="text-sm font-medium leading-none text-stone-100">
          {title}
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-stone-500">
          {children}
        </p>
      </NavigationMenuLink>
    </li>
  );
}
