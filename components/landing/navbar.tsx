"use client";

import { useState } from "react";
import Link from "next/link";
import MindCaveLogo from "@/components/mind-cave-logo";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

interface NavbarProps {
  user?: {
    id: string;
    email: string;
    name: string;
    avatar_url?: string;
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-60 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-350 items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <MindCaveLogo className="h-10 w-10" />
          <span className="text-xl font-bold text-foreground">Mind Cave</span>
        </Link>

        {/* Desktop Navigation Menu */}
        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link href="#about" />}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-base text-foreground/80 hover:bg-secondary hover:text-foreground"
                  )}
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link href="#how-it-works" />}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-base text-foreground/80 hover:bg-secondary hover:text-foreground"
                  )}
                >
                  How It Works
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link href="#features" />}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-base text-foreground/80 hover:bg-secondary hover:text-foreground"
                  )}
                >
                  Features
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link href="#testimonials" />}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-base text-foreground/80 hover:bg-secondary hover:text-foreground"
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
                    "bg-transparent text-base text-foreground/80 hover:bg-secondary hover:text-foreground"
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
          <div className="lg:hidden">
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
                <div className="flex h-full flex-col overflow-y-auto px-8 pt-8 pb-24 custom-scrollbar">
                  <nav className="flex flex-col gap-6 pb-8">
                    {/* Section Links */}
                    <div className="space-y-1">
                      <SheetClose
                        render={<Link href="#about" />}
                        nativeButton={false}
                        className="block p-4 text-lg font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        About
                      </SheetClose>
                      <SheetClose
                        render={<Link href="#how-it-works" />}
                        nativeButton={false}
                        className="block p-4 text-lg font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        How It Works
                      </SheetClose>
                      <SheetClose
                        render={<Link href="#features" />}
                        nativeButton={false}
                        className="block p-4 text-lg font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        Features
                      </SheetClose>
                      <SheetClose
                        render={<Link href="#testimonials" />}
                        nativeButton={false}
                        className="block p-4 text-lg font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        Testimonials
                      </SheetClose>
                      <SheetClose
                        render={<Link href="#faq" />}
                        nativeButton={false}
                        className="block p-4 text-lg font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        FAQ
                      </SheetClose>
                    </div>
                  </nav>

                  {/* Mobile Auth Button */}
                  <div className="border-t border-border pt-8">
                    <SheetClose
                      render={<Link href={user ? "/dashboard" : "/login"} />}
                      nativeButton={false}
                      className="block bg-primary p-4 text-center text-base font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      {user ? "Dashboard" : "Get Started"}
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Auth */}
          <div className="hidden items-center lg:flex">
            <Link
              href={user ? "/dashboard" : "/login"}
              className="bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {user ? "Dashboard" : "Get Started"}
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
