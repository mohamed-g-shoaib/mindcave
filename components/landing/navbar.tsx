"use client";

import { useState } from "react";
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-60 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-450 items-center justify-between px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <MindCaveLogo className="h-10 w-10" />
          <span className="text-xl font-bold text-foreground">Mind Cave</span>
        </Link>

        {/* Desktop Navigation Menu */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-foreground/80 hover:bg-secondary hover:text-foreground data-open:bg-secondary">
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent className="border border-border bg-card p-4">
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
                    "bg-transparent text-foreground/80 hover:bg-secondary hover:text-foreground"
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
                    "bg-transparent text-foreground/80 hover:bg-secondary hover:text-foreground"
                  )}
                >
                  FAQ
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger
                render={
                  <button
                    className="relative flex h-6 w-6 flex-col items-center justify-center gap-1.5 text-foreground/80 hover:text-foreground"
                    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  />
                }
              >
                <span
                  className="h-0.5 w-5 bg-current transition-all duration-300 ease-out"
                  style={{
                    transform: mobileMenuOpen
                      ? "translateY(4px) rotate(45deg)"
                      : "translateY(0) rotate(0)",
                  }}
                />
                <span
                  className="h-0.5 w-5 bg-current transition-all duration-300 ease-out"
                  style={{
                    transform: mobileMenuOpen
                      ? "translateY(-4px) rotate(-45deg)"
                      : "translateY(0) rotate(0)",
                  }}
                />
              </SheetTrigger>
              <SheetContent
                side="top"
                className="top-20! h-[calc(100vh-5rem)]! w-full border-none bg-card"
                showCloseButton={false}
                overlayClassName="top-20!"
              >
                <div className="mx-auto flex h-full max-w-md flex-col px-8 py-8">
                  <nav className="flex flex-1 flex-col justify-center gap-8">
                    {/* Features Section */}
                    <div className="space-y-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Features
                      </div>
                      {features.map((feature) => (
                        <SheetClose
                          key={feature.title}
                          render={<Link href={feature.href} />}
                          nativeButton={false}
                          className="block space-y-1 p-4 transition-colors hover:bg-secondary"
                        >
                          <div className="text-base font-medium text-foreground">
                            {feature.title}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </SheetClose>
                      ))}
                    </div>

                    {/* Other Links */}
                    <div className="space-y-3">
                      <SheetClose
                        render={<Link href="#testimonials" />}
                        nativeButton={false}
                        className="block p-4 text-base font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        Testimonials
                      </SheetClose>
                      <SheetClose
                        render={<Link href="#faq" />}
                        nativeButton={false}
                        className="block p-4 text-base font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        FAQ
                      </SheetClose>
                    </div>
                  </nav>

                  {/* Mobile Auth Buttons */}
                  <div className="space-y-3 border-t border-border pt-8">
                    <SheetClose
                      render={<Link href="/login" />}
                      nativeButton={false}
                      className="block border border-border p-4 text-center text-base font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      Sign In
                    </SheetClose>
                    <SheetClose
                      render={<Link href="/login" />}
                      nativeButton={false}
                      className="block bg-primary p-4 text-center text-base font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      Get Started
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Auth */}
          <div className="hidden items-center gap-4 text-foreground md:flex">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Get Started
            </Link>
          </div>
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
} & React.ComponentPropsWithoutRef<"li">) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={<Link href={href} />}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary hover:text-foreground focus:bg-secondary focus:text-foreground",
          className
        )}
      >
        <div className="text-sm font-medium leading-none text-foreground">
          {title}
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </NavigationMenuLink>
    </li>
  );
}
