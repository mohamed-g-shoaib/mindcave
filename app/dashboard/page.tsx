"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link01Icon, PlusSignIcon } from "@hugeicons/core-free-icons";

import { BookmarkCard } from "@/components/dashboard/bookmark-card";
import { EditBookmarkSheet } from "@/components/dashboard/edit-bookmark-sheet";
import { AddBookmarkSheet } from "@/components/dashboard/add-bookmark-sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useBookmarks, useDeleteBookmark } from "@/hooks/use-bookmarks";
import { useCategories } from "@/hooks/use-categories";
import type { BookmarkWithCategory, Category } from "@/lib/supabase/types";

function DashboardContent() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category") || undefined;

  const { data: bookmarks = [] as BookmarkWithCategory[], isLoading } =
    useBookmarks(categoryId);
  const { data: categories = [] as Category[] } = useCategories();
  const deleteBookmark = useDeleteBookmark();

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
    } catch (error) {
      toast.error("Failed to delete bookmark");
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-9 w-48" />
          <Skeleton className="mt-2 h-5 w-64" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
      <div>
        <Skeleton className="h-9 w-48" />
        <Skeleton className="mt-2 h-5 w-64" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
