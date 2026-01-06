"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Link01Icon,
  PlusSignIcon,
  GridViewIcon,
  ListViewIcon,
  ArrowDown01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

import { BookmarkCard } from "@/components/dashboard/bookmark-card";
import { BookmarkListItem } from "@/components/dashboard/bookmark-list-item";
import { EditBookmarkSheet } from "@/components/dashboard/edit-bookmark-sheet";
import { AddBookmarkSheet } from "@/components/dashboard/add-bookmark-sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBookmarks, useDeleteBookmark } from "@/hooks/use-bookmarks";
import { useCategories } from "@/hooks/use-categories";
import { useViewMode } from "@/hooks/use-preferences";
import { useIsMobile } from "@/hooks/use-mobile";
import type { BookmarkWithCategory, Category } from "@/lib/supabase/types";

// Mobile column options (1-2 cols)
const MOBILE_COLUMN_OPTIONS = [
  { value: 1, label: "1 column" },
  { value: 2, label: "2 columns" },
];

// Desktop column options for cards
const CARD_COLUMN_OPTIONS = [
  { value: 2, label: "2 columns" },
  { value: 3, label: "3 columns" },
  { value: 4, label: "4 columns" },
  { value: 5, label: "5 columns" },
  { value: 6, label: "6 columns" },
];

// Desktop column options for lists
const LIST_COLUMN_OPTIONS = [
  { value: 1, label: "1 column" },
  { value: 2, label: "2 columns" },
  { value: 3, label: "3 columns" },
];

// Grid class mapping for cards (desktop)
const CARD_GRID_CLASSES: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
  6: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6",
};

// Grid class mapping for lists (desktop)
const LIST_GRID_CLASSES: Record<number, string> = {
  1: "",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-2 xl:grid-cols-3",
};

// Mobile grid classes
const MOBILE_GRID_CLASSES: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

function DashboardContent() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category") || undefined;
  const isMobile = useIsMobile();

  const { data: bookmarks = [] as BookmarkWithCategory[], isLoading } =
    useBookmarks(categoryId);
  const { data: categories = [] as Category[] } = useCategories();
  const deleteBookmark = useDeleteBookmark();
  const {
    viewMode,
    cardColumns,
    listColumns,
    setViewMode,
    setCardColumns,
    setListColumns,
  } = useViewMode(isMobile);

  const [editingBookmark, setEditingBookmark] =
    useState<BookmarkWithCategory | null>(null);
  const [addBookmarkOpen, setAddBookmarkOpen] = useState(false);

  // Get current category name
  const currentCategory = categoryId
    ? categories.find((c) => c.id === categoryId)?.name
    : null;

  const handleEdit = (id: string) => {
    const bookmark = bookmarks.find((b) => b.id === id);
    if (bookmark) {
      setEditingBookmark(bookmark);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBookmark.mutateAsync(id);
      toast.success("Bookmark deleted successfully");
    } catch {
      toast.error("Failed to delete bookmark");
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  // Column options based on screen size and view mode
  const columnOptions = isMobile
    ? MOBILE_COLUMN_OPTIONS
    : viewMode === "card"
    ? CARD_COLUMN_OPTIONS
    : LIST_COLUMN_OPTIONS;

  const currentColumns = viewMode === "card" ? cardColumns : listColumns;

  const handleColumnChange = (cols: number) => {
    if (viewMode === "card") {
      setCardColumns(cols);
    } else {
      setListColumns(cols);
    }
  };

  // Build grid classes
  const getGridClasses = () => {
    if (isMobile) {
      return MOBILE_GRID_CLASSES[currentColumns] || "grid-cols-1";
    }
    const desktopClasses =
      viewMode === "card"
        ? CARD_GRID_CLASSES[cardColumns] || CARD_GRID_CLASSES[4]
        : LIST_GRID_CLASSES[listColumns] || LIST_GRID_CLASSES[1];
    return `grid-cols-1 ${desktopClasses}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Skeleton className="h-9 w-48" />
            <Skeleton className="mt-2 h-5 w-64" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-video w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              {currentCategory || "All Bookmarks"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground md:mt-2 md:text-base">
              {bookmarks.length === 0
                ? "No bookmarks yet. Add your first one!"
                : `${bookmarks.length} bookmark${
                    bookmarks.length === 1 ? "" : "s"
                  }`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1">
              <Button
                variant={viewMode === "card" ? "secondary" : "ghost"}
                size="icon-sm"
                onClick={() => setViewMode("card")}
                aria-label="Card view"
              >
                <HugeiconsIcon icon={GridViewIcon} className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon-sm"
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <HugeiconsIcon icon={ListViewIcon} className="h-4 w-4" />
              </Button>
            </div>

            {/* Column Selector Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    {columnOptions.find((o) => o.value === currentColumns)
                      ?.label || `${currentColumns} col`}
                    <HugeiconsIcon icon={ArrowDown01Icon} className="h-3 w-3" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                {columnOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => handleColumnChange(option.value)}
                    className="justify-between"
                  >
                    {option.label}
                    {currentColumns === option.value && (
                      <HugeiconsIcon icon={Tick02Icon} className="h-4 w-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Content */}
        {bookmarks.length === 0 ? (
          <div className="flex min-h-60 flex-col items-center justify-center gap-4 border border-dashed p-8 text-center md:min-h-80">
            <div className="flex h-16 w-16 items-center justify-center bg-muted">
              <HugeiconsIcon
                icon={Link01Icon}
                className="h-8 w-8 text-muted-foreground"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No bookmarks yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Get started by adding your first bookmark
              </p>
            </div>
            <Button className="mt-2" onClick={() => setAddBookmarkOpen(true)}>
              <HugeiconsIcon icon={PlusSignIcon} className="mr-2 h-4 w-4" />
              Add Bookmark
            </Button>
          </div>
        ) : viewMode === "card" ? (
          <div className={`grid gap-4 ${getGridClasses()}`}>
            {bookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark.id}
                bookmark={bookmark}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCopy={handleCopy}
              />
            ))}
          </div>
        ) : (
          <div className={`grid gap-4 ${getGridClasses()}`}>
            {bookmarks.map((bookmark) => (
              <div key={bookmark.id} className="overflow-hidden border">
                <BookmarkListItem
                  bookmark={bookmark}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onCopy={handleCopy}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <AddBookmarkSheet
        open={addBookmarkOpen}
        onOpenChange={setAddBookmarkOpen}
      />
      <EditBookmarkSheet
        open={!!editingBookmark}
        onOpenChange={(open) => !open && setEditingBookmark(null)}
        bookmark={editingBookmark}
      />
    </>
  );
}

function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Skeleton className="h-9 w-48" />
          <Skeleton className="mt-2 h-5 w-64" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-video w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}
