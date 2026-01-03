"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { useUpdateBookmark } from "@/hooks/use-bookmarks";
import { useCategories } from "@/hooks/use-categories";
import type { BookmarkWithCategory } from "@/lib/supabase/types";

interface EditBookmarkSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookmark: BookmarkWithCategory | null;
}

export function EditBookmarkSheet({
  open,
  onOpenChange,
  bookmark,
}: EditBookmarkSheetProps) {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    category_id: "",
  });

  const updateBookmark = useUpdateBookmark();
  const { data: categories = [] } = useCategories();

  useEffect(() => {
    if (bookmark) {
      setFormData({
        title: bookmark.title,
        url: bookmark.url,
        description: bookmark.description || "",
        category_id: bookmark.category_id || "",
      });
    }
  }, [bookmark]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookmark) return;

    try {
      await updateBookmark.mutateAsync({
        id: bookmark.id,
        title: formData.title,
        url: formData.url,
        description: formData.description || undefined,
        category_id: formData.category_id || null,
      });

      toast.success("Bookmark updated successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update bookmark");
    }
  };

  if (!open || !bookmark) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Sheet */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-lg border-l bg-background shadow-lg sm:max-w-md">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-6">
            <h2 className="text-lg font-semibold">Edit Bookmark</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
            >
              <HugeiconsIcon icon={Cancel01Icon} className="h-5 w-5" />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title *
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-ring"
                  placeholder="Enter bookmark title"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="url" className="text-sm font-medium">
                  URL *
                </label>
                <input
                  id="url"
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-ring"
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-ring"
                  placeholder="Optional description"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category_id}
                  onChange={(e) =>
                    setFormData({ ...formData, category_id: e.target.value })
                  }
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-ring"
                >
                  <option value="">Uncategorized</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="border-t p-6">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
                disabled={updateBookmark.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                className="flex-1"
                disabled={updateBookmark.isPending}
              >
                {updateBookmark.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
