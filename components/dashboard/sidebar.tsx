"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  PlusSignIcon,
  Menu01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCategories } from "@/hooks/use-categories";

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export function Sidebar({ isExpanded, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { data: categories = [], isLoading } = useCategories();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-card transition-all duration-300",
        isExpanded ? "w-64" : "w-16"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {isExpanded && (
          <Link href="/dashboard" className="font-bold text-lg">
            Mind Cave
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(!isExpanded && "mx-auto")}
        >
          <HugeiconsIcon
            icon={isExpanded ? Cancel01Icon : Menu01Icon}
            className="h-5 w-5"
          />
        </Button>
      </div>

      {/* Categories */}
      <nav className="flex-1 space-y-1 p-2">
        {/* All Bookmarks */}
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
            pathname === "/dashboard"
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent",
            !isExpanded && "justify-center"
          )}
        >
          <HugeiconsIcon icon={Home01Icon} className="h-5 w-5 shrink-0" />
          {isExpanded && <span>All Bookmarks</span>}
        </Link>

        {/* User Categories */}
        {isLoading
          ? isExpanded && (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                Loading...
              </div>
            )
          : categories.map((category) => (
              <Link
                key={category.id}
                href={`/dashboard?category=${category.id}`}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-accent",
                  !isExpanded && "justify-center"
                )}
              >
                <HugeiconsIcon icon={Home01Icon} className="h-5 w-5 shrink-0" />
                {isExpanded && <span>{category.name}</span>}
              </Link>
            ))}

        {/* Add Category Button */}
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3",
            !isExpanded && "justify-center px-0"
          )}
        >
          <HugeiconsIcon icon={PlusSignIcon} className="h-5 w-5 shrink-0" />
          {isExpanded && <span>Add Category</span>}
        </Button>
      </nav>

      {/* User Profile - TODO: Add dropdown */}
      <div className="border-t p-4">
        {isExpanded ? (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary" />
            <div className="flex-1 text-sm">
              <p className="font-medium">User Name</p>
              <p className="text-xs text-muted-foreground">user@email.com</p>
            </div>
          </div>
        ) : (
          <div className="mx-auto h-8 w-8 rounded-full bg-primary" />
        )}
      </div>
    </aside>
  );
}
