"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";
import { getCategoryIcon } from "@/components/dashboard/icon-picker";
import type { Category } from "@/lib/supabase/types";

interface CategoryGroupProps {
  category:
    | Category
    | { id: string; name: string; icon?: string; color?: string };
  bookmarkCount: number;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const COLLAPSED_CATEGORIES_KEY = "mindcave_collapsed_categories";

function getCollapsedCategories(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const saved = localStorage.getItem(COLLAPSED_CATEGORIES_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  } catch {
    return new Set();
  }
}

function saveCollapsedCategories(categories: Set<string>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      COLLAPSED_CATEGORIES_KEY,
      JSON.stringify(Array.from(categories))
    );
  } catch {
    // Ignore storage errors
  }
}

export function CategoryGroup({
  category,
  bookmarkCount,
  children,
  defaultExpanded = true,
}: CategoryGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load collapsed state from localStorage
  useEffect(() => {
    const collapsed = getCollapsedCategories();
    setIsExpanded(!collapsed.has(category.id));
    setIsInitialized(true);
  }, [category.id]);

  const toggleExpanded = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);

    // Persist to localStorage
    const collapsed = getCollapsedCategories();
    if (newExpanded) {
      collapsed.delete(category.id);
    } else {
      collapsed.add(category.id);
    }
    saveCollapsedCategories(collapsed);
  };

  const icon = getCategoryIcon(category.icon || "folder");
  const color = category.color || undefined;

  // Don't render until we've loaded the collapsed state
  if (!isInitialized) {
    return (
      <div className="border border-border bg-card">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/30">
          <div className="h-5 w-5 bg-muted animate-pulse" />
          <div className="h-4 w-32 bg-muted animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border bg-card overflow-hidden">
      {/* Category Header */}
      <button
        onClick={toggleExpanded}
        className="flex w-full items-center gap-3 px-4 py-3 border-b border-border bg-muted/30 hover:bg-muted/50 transition-colors text-left group"
      >
        {/* Expand/Collapse Icon */}
        <motion.div
          animate={{ rotate: isExpanded ? 0 : -90 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="shrink-0"
        >
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors"
          />
        </motion.div>

        {/* Category Icon */}
        <HugeiconsIcon
          icon={icon}
          className="h-5 w-5 shrink-0"
          style={color ? { color } : undefined}
        />

        {/* Category Name */}
        <span className="font-medium text-sm flex-1 truncate">
          {category.name}
        </span>

        {/* Bookmark Count */}
        <span className="text-xs text-muted-foreground tabular-nums">
          {bookmarkCount} {bookmarkCount === 1 ? "bookmark" : "bookmarks"}
        </span>
      </button>

      {/* Bookmarks Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.2, ease: "easeOut" },
            }}
          >
            <div className="p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
