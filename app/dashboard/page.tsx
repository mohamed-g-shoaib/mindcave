"use client";

import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { BookmarkCard } from "@/components/dashboard/bookmark-card";
import { useBookmarks, useDeleteBookmark } from "@/hooks/use-bookmarks";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category") || undefined;

  const { data: bookmarks = [], isLoading } = useBookmarks(categoryId);
  const deleteBookmark = useDeleteBookmark();

  const handleEdit = (id: string) => {
    // TODO: Open edit sheet
    console.log("Edit bookmark:", id);
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
          <h1 className="text-3xl font-bold">All Bookmarks</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your saved links and resources
          </p>
        </div>
        <div className="text-center text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {categoryId ? "Category" : "All Bookmarks"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your saved links and resources
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex min-h-100 items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <h3 className="text-lg font-semibold">No bookmarks yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get started by adding your first bookmark
            </p>
          </div>
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
  );
}
