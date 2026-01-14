"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Link01Icon,
  PlusSignIcon,
  GridViewIcon,
  ListViewIcon,
  ArrowDown01Icon,
  Tick02Icon,
  CursorAddSelection01Icon,
  CheckListIcon,
  Cancel01Icon,
  Delete02Icon,
  DownloadIcon,
} from "@hugeicons/core-free-icons";

import { BookmarkCard } from "@/components/dashboard/bookmark-card";
import { BookmarkListItem } from "@/components/dashboard/bookmark-list-item";
import { EditBookmarkSheet } from "@/components/dashboard/edit-bookmark-sheet";
import { AddBookmarkSheet } from "@/components/dashboard/add-bookmark-sheet";
import { ImportBookmarksSheet } from "@/components/dashboard/import-bookmarks-sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBookmarks, useDeleteBookmark } from "@/hooks/use-bookmarks";
import { useBookmarksRealtime } from "@/hooks/use-bookmarks-realtime";
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
  { value: 7, label: "7 columns" },
  { value: 8, label: "8 columns" },
];

// Desktop column options for lists
const LIST_COLUMN_OPTIONS = [
  { value: 1, label: "1 column" },
  { value: 2, label: "2 columns" },
  { value: 3, label: "3 columns" },
  { value: 4, label: "4 columns" },
  { value: 5, label: "5 columns" },
];

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

function DashboardContent() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category") || undefined;
  const isMobile = useIsMobile();

  const { data: bookmarks = [] as BookmarkWithCategory[], isLoading } =
    useBookmarks(categoryId);
  const { data: categories = [] as Category[] } = useCategories();
  const deleteBookmark = useDeleteBookmark();

  // Subscribe to real-time bookmark changes (e.g., from Chrome extension)
  useBookmarksRealtime();

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
  const [importBookmarksOpen, setImportBookmarksOpen] = useState(false);
  const [deletingBookmarkId, setDeletingBookmarkId] = useState<string | null>(
    null
  );

  // Bookmark multi-select state
  const [isSelectingBookmarks, setIsSelectingBookmarks] = useState(false);
  const [selectedBookmarkIds, setSelectedBookmarkIds] = useState<Set<string>>(
    () => new Set()
  );
  const [deletingBulk, setDeletingBulk] = useState(false);

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

  const handleDelete = (id: string) => {
    setDeletingBookmarkId(id);
  };

  const confirmDelete = async () => {
    if (!deletingBookmarkId) return;

    try {
      await deleteBookmark.mutateAsync(deletingBookmarkId);
      toast.success("Bookmark deleted successfully");
    } catch {
      toast.error("Failed to delete bookmark");
    } finally {
      setDeletingBookmarkId(null);
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  // Bookmark multi-select helpers
  const toggleBookmarkSelection = (id: string) => {
    setSelectedBookmarkIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAllBookmarks = () => {
    setSelectedBookmarkIds(new Set(bookmarks.map((b) => b.id)));
  };

  const clearSelectedBookmarks = () => {
    setSelectedBookmarkIds(new Set());
  };

  const confirmBulkDelete = async () => {
    const ids = Array.from(selectedBookmarkIds);
    if (ids.length === 0) {
      setDeletingBulk(false);
      return;
    }

    try {
      for (const id of ids) {
        await deleteBookmark.mutateAsync(id);
      }
      const successMessage = `Deleted ${ids.length} bookmark${
        ids.length === 1 ? "" : "s"
      }`;
      toast.success(successMessage);
      clearSelectedBookmarks();
      setIsSelectingBookmarks(false);
    } catch {
      toast.error("Failed to delete selected bookmarks");
    } finally {
      setDeletingBulk(false);
    }
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
            <div
              className="flex items-center gap-1"
              data-onboarding="view-toggle"
            >
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant={viewMode === "card" ? "secondary" : "ghost"}
                      size="icon-sm"
                      onClick={() => setViewMode("card")}
                      aria-label="Card view"
                    />
                  }
                >
                  <HugeiconsIcon icon={GridViewIcon} className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>Card view</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant={viewMode === "list" ? "secondary" : "ghost"}
                      size="icon-sm"
                      onClick={() => setViewMode("list")}
                      aria-label="List view"
                    />
                  }
                >
                  <HugeiconsIcon icon={ListViewIcon} className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>List view</TooltipContent>
              </Tooltip>
            </div>

            {/* Column Selector Dropdown */}
            <Tooltip>
              <DropdownMenu>
                <TooltipTrigger
                  render={
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-xs"
                          data-onboarding="column-selector"
                        />
                      }
                    />
                  }
                >
                  {columnOptions.find((o) => o.value === currentColumns)
                    ?.label || `${currentColumns} col`}
                  <HugeiconsIcon icon={ArrowDown01Icon} className="h-3 w-3" />
                </TooltipTrigger>
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
              <TooltipContent>Change column layout</TooltipContent>
            </Tooltip>

            {/* Bookmark Multi-Select Controls */}
            {bookmarks.length > 0 && (
              <>
                {!isSelectingBookmarks ? (
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => {
                            setIsSelectingBookmarks(true);
                            clearSelectedBookmarks();
                          }}
                        />
                      }
                    >
                      <HugeiconsIcon
                        icon={CursorAddSelection01Icon}
                        className="h-4 w-4"
                      />
                    </TooltipTrigger>
                    <TooltipContent>Select bookmarks</TooltipContent>
                  </Tooltip>
                ) : (
                  <div className="flex items-center gap-1">
                    {selectedBookmarkIds.size > 0 && (
                      <span className="text-xs text-muted-foreground mr-1">
                        {selectedBookmarkIds.size} selected
                      </span>
                    )}
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            disabled={
                              selectedBookmarkIds.size === 0 ||
                              deleteBookmark.isPending
                            }
                            onClick={() => setDeletingBulk(true)}
                          />
                        }
                      >
                        <HugeiconsIcon
                          icon={Delete02Icon}
                          className="h-4 w-4"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        {selectedBookmarkIds.size === 0
                          ? "Select bookmarks first"
                          : "Delete selected"}
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={selectAllBookmarks}
                          />
                        }
                      >
                        <HugeiconsIcon
                          icon={CheckListIcon}
                          className="h-4 w-4"
                        />
                      </TooltipTrigger>
                      <TooltipContent>Select all bookmarks</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => {
                              setIsSelectingBookmarks(false);
                              clearSelectedBookmarks();
                            }}
                          />
                        }
                      >
                        <HugeiconsIcon
                          icon={Cancel01Icon}
                          className="h-4 w-4"
                        />
                      </TooltipTrigger>
                      <TooltipContent>Cancel selection</TooltipContent>
                    </Tooltip>
                  </div>
                )}
              </>
            )}
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
                Get started by adding your first bookmark or import from your
                browser
              </p>
            </div>
            <div className="flex gap-2 mt-2">
              <Button onClick={() => setAddBookmarkOpen(true)}>
                <HugeiconsIcon icon={PlusSignIcon} className="mr-2 h-4 w-4" />
                Add Bookmark
              </Button>
              <Button
                variant="secondary"
                onClick={() => setImportBookmarksOpen(true)}
              >
                <HugeiconsIcon icon={DownloadIcon} className="mr-2 h-4 w-4" />
                Import Bookmarks
              </Button>
            </div>
          </div>
        ) : (
          <LayoutGroup>
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
                        ease: [0.25, 0.1, 0.25, 1.0], // Custom cubic-bezier for smooth fade
                      },
                      scale: {
                        duration: 0.4,
                        ease: [0.34, 1.56, 0.64, 1], // Subtle elastic out
                      },
                      y: {
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1], // Smooth vertical movement
                      },
                    }}
                    className={cn(
                      "relative",
                      viewMode === "list" && "overflow-hidden border"
                    )}
                    style={{
                      // Browser optimization: defer rendering of off-screen items
                      // Only applies to items after the first 10
                      ...(index > 10 && { contentVisibility: "auto" as any }),
                    }}
                  >
                    {isSelectingBookmarks && (
                      <div
                        className="absolute inset-0 z-10 cursor-pointer"
                        onClick={() => toggleBookmarkSelection(bookmark.id)}
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
                            checked={selectedBookmarkIds.has(bookmark.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <div
                          className={cn(
                            "absolute inset-0 transition-colors",
                            selectedBookmarkIds.has(bookmark.id)
                              ? "bg-primary/10 ring-2 ring-primary"
                              : "hover:bg-muted/50"
                          )}
                        />
                      </div>
                    )}

                    {viewMode === "card" ? (
                      <BookmarkCard
                        bookmark={bookmark}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onCopy={handleCopy}
                        showCategory={!categoryId}
                        columns={currentColumns}
                      />
                    ) : (
                      <BookmarkListItem
                        bookmark={bookmark}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onCopy={handleCopy}
                        showCategory={!categoryId}
                        columns={currentColumns}
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        )}
      </div>

      <AddBookmarkSheet
        open={addBookmarkOpen}
        onOpenChange={setAddBookmarkOpen}
      />

      <ImportBookmarksSheet
        open={importBookmarksOpen}
        onOpenChange={setImportBookmarksOpen}
      />

      <AlertDialog
        open={!!deletingBookmarkId}
        onOpenChange={(open) => !open && setDeletingBookmarkId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-medium text-foreground">
                &quot;
                {bookmarks.find((b) => b.id === deletingBookmarkId)?.title ||
                  "this bookmark"}
                &quot;
              </span>{" "}
              from your cave.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteBookmark.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
              variant="destructive"
              disabled={deleteBookmark.isPending}
            >
              {deleteBookmark.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog
        open={deletingBulk}
        onOpenChange={(open) => !open && setDeletingBulk(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {selectedBookmarkIds.size} bookmark
              {selectedBookmarkIds.size === 1 ? "" : "s"}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected bookmarks from your cave.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteBookmark.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                confirmBulkDelete();
              }}
              variant="destructive"
              disabled={deleteBookmark.isPending}
            >
              {deleteBookmark.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
