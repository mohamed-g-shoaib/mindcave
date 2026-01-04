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
    og_image_url: string;
    favicon_url: string;
    media_type: "youtube" | "vimeo" | "default";
    media_embed_id: string;
  }>({
    title: "",
    url: "",
    description: "",
    category_id: "",
    og_image_url: "",
    favicon_url: "",
    media_type: "default",
    media_embed_id: "",
  });
  const [isFetchingMetadata, setIsFetchingMetadata] = useState(false);
  const [initialUrl, setInitialUrl] = useState("");

  const updateBookmark = useUpdateBookmark();
  const { data: categories = [] } = useCategories();

  useEffect(() => {
    if (bookmark) {
      setFormData({
        title: bookmark.title,
        url: bookmark.url,
        description: bookmark.description || "",
        category_id: bookmark.category_id || "",
        og_image_url: bookmark.og_image_url || "",
        favicon_url: bookmark.favicon_url || "",
        media_type:
          (bookmark.media_type as "youtube" | "vimeo" | "default") || "default",
        media_embed_id: bookmark.media_embed_id || "",
      });
      setInitialUrl(bookmark.url);
    }
  }, [bookmark]);

  // Fetch metadata when URL changes (but not on initial load)
  useEffect(() => {
    const fetchMetadata = async () => {
      if (!formData.url || formData.url === initialUrl) return;

      // Basic URL validation
      try {
        new URL(formData.url);
      } catch {
        return;
      }

      setIsFetchingMetadata(true);

      try {
        const response = await fetch("/api/fetch-metadata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: formData.url }),
        });

        if (response.ok) {
          const data = await response.json();
          setFormData((prev) => ({
            ...prev,
            og_image_url: data.og_image_url || "",
            favicon_url: data.favicon_url || "",
            media_type:
              (data.media_type as "youtube" | "vimeo" | "default") || "default",
            media_embed_id: data.media_embed_id || "",
          }));
        }
      } catch (error) {
        console.error("Failed to fetch metadata:", error);
      } finally {
        setIsFetchingMetadata(false);
      }
    };

    const debounce = setTimeout(fetchMetadata, 500);
    return () => clearTimeout(debounce);
  }, [formData.url, initialUrl]);

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
        og_image_url: formData.og_image_url || null,
        favicon_url: formData.favicon_url || null,
        media_type: formData.media_type,
        media_embed_id: formData.media_embed_id || null,
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
