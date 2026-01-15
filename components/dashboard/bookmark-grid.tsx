"use client";

import { motion, AnimatePresence } from "framer-motion";

import { BookmarkCard } from "@/components/dashboard/bookmark-card";
import { BookmarkListItem } from "@/components/dashboard/bookmark-list-item";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { BookmarkWithCategory } from "@/lib/supabase/types";

// Grid class mapping for cards (desktop)
const CARD_GRID_CLASSES: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
  6: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6",
  7: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7",
  8: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8",
};

// Grid class mapping for lists (desktop)
const LIST_GRID_CLASSES: Record<number, string> = {
  1: "",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-2 xl:grid-cols-3",
  4: "lg:grid-cols-2 xl:grid-cols-4",
  5: "lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5",
};

// Mobile grid classes
const MOBILE_GRID_CLASSES: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

interface BookmarkGridProps {
  bookmarks: BookmarkWithCategory[];
  viewMode: "card" | "list";
  columns: number;
  isMobile: boolean;
  showCategory?: boolean;
  compact?: boolean; // Hide category icon, move copy to menu
  isSelecting?: boolean;
  selectedIds?: Set<string>;
  onToggleSelect?: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCopy: (url: string) => void;
}

export function BookmarkGrid({
  bookmarks,
  viewMode,
  columns,
  isMobile,
  showCategory = true,
  compact = false,
  isSelecting = false,
  selectedIds = new Set(),
  onToggleSelect,
  onEdit,
  onDelete,
  onCopy,
}: BookmarkGridProps) {
  const getGridClasses = () => {
    if (isMobile) {
      return MOBILE_GRID_CLASSES[columns] || "grid-cols-1";
    }
    const cardColumns = columns;
    const listColumns = columns;
    const desktopClasses =
      viewMode === "card"
        ? CARD_GRID_CLASSES[cardColumns] || CARD_GRID_CLASSES[4]
        : LIST_GRID_CLASSES[listColumns] || LIST_GRID_CLASSES[1];
    return `grid-cols-1 ${desktopClasses}`;
  };

  if (bookmarks.length === 0) {
    return null;
  }

  return (
    <motion.div
      layout
      className={cn(
        "grid gap-4",
        getGridClasses(),
        viewMode === "card" && "auto-rows-fr"
      )}
    >
      <AnimatePresence mode="popLayout">
        {bookmarks.map((bookmark, index) => (
          <motion.div
            layout
            key={bookmark.id}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{
              layout: {
                type: "spring",
                stiffness: 200,
                damping: 25,
                mass: 0.6,
              },
              opacity: {
                duration: 0.35,
                ease: [0.25, 0.1, 0.25, 1.0],
              },
              scale: {
                duration: 0.4,
                ease: [0.34, 1.56, 0.64, 1],
              },
              y: {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            className={cn(
              "relative",
              viewMode === "list" && "overflow-hidden border"
            )}
            style={{
              ...(index > 10 && { contentVisibility: "auto" as never }),
            }}
          >
            {isSelecting && onToggleSelect && (
              <div
                className="absolute inset-0 z-10 cursor-pointer"
                onClick={() => onToggleSelect(bookmark.id)}
              >
                <div
                  className={cn(
                    "absolute z-20",
                    viewMode === "card"
                      ? "top-2 left-2"
                      : "left-3 top-1/2 -translate-y-1/2"
                  )}
                >
                  <Checkbox
                    checked={selectedIds.has(bookmark.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div
                  className={cn(
                    "absolute inset-0 transition-colors",
                    selectedIds.has(bookmark.id)
                      ? "bg-primary/10 ring-2 ring-primary"
                      : "hover:bg-muted/50"
                  )}
                />
              </div>
            )}

            {viewMode === "card" ? (
              <BookmarkCard
                bookmark={bookmark}
                onEdit={onEdit}
                onDelete={onDelete}
                onCopy={onCopy}
                showCategory={showCategory}
                columns={columns}
                compact={compact}
              />
            ) : (
              <BookmarkListItem
                bookmark={bookmark}
                onEdit={onEdit}
                onDelete={onDelete}
                onCopy={onCopy}
                showCategory={showCategory}
                columns={columns}
                compact={compact}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
