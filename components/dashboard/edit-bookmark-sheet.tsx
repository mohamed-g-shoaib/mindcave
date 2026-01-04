"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [formData, setFormData] = useState<{
    title: string;
    url: string;
    description: string;
    category_id: string;
  }>({
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

    if (!formData.title.trim() || !formData.url.trim()) {
      toast.error("Title and URL are required");
      return;
    }

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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex flex-col w-full sm:max-w-lg p-0"
      >
        <SheetHeader className="px-6 py-4 border-b shrink-0">
          <SheetTitle>Edit Bookmark</SheetTitle>
          <SheetDescription>Update your bookmark details.</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <form
            id="edit-bookmark-form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter bookmark title"
              />
            </div>

            {/* URL */}
            <div className="space-y-2">
              <Label htmlFor="edit-url">URL *</Label>
              <Input
                id="edit-url"
                type="url"
                required
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                placeholder="https://example.com"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Optional description"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select
                value={formData.category_id || "uncategorized"}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    category_id: value === "uncategorized" ? "" : value ?? "",
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {formData.category_id
                      ? categories.find((c) => c.id === formData.category_id)
                          ?.name
                      : "Uncategorized"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uncategorized">Uncategorized</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>

        <SheetFooter className="px-6 py-4 border-t shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={updateBookmark.isPending}
          >
            Cancel
          </Button>
          <Button
            form="edit-bookmark-form"
            type="submit"
            disabled={updateBookmark.isPending}
          >
            {updateBookmark.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
