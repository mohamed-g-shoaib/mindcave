"use client";

import { useState } from "react";
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
import { useCreateBookmark } from "@/hooks/use-bookmarks";
import { useCategories } from "@/hooks/use-categories";

interface AddBookmarkSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddBookmarkSheet({
  open,
  onOpenChange,
}: AddBookmarkSheetProps) {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    category_id: "",
  });

  const createBookmark = useCreateBookmark();
  const { data: categories = [] } = useCategories();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.url.trim()) {
      toast.error("Title and URL are required");
      return;
    }

    try {
      await createBookmark.mutateAsync({
        title: formData.title,
        url: formData.url,
        description: formData.description || undefined,
        category_id: formData.category_id || null,
        user_id: "", // Will be set by API
      });

      toast.success("Bookmark added successfully");
      setFormData({ title: "", url: "", description: "", category_id: "" });
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to add bookmark");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex flex-col w-full sm:max-w-lg p-0"
      >
        <SheetHeader className="px-6 py-4 border-b shrink-0">
          <SheetTitle>Add Bookmark</SheetTitle>
          <SheetDescription>
            Save a new link to your collection.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <form
            id="add-bookmark-form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
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
              <Label htmlFor="url">URL *</Label>
              <Input
                id="url"
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
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
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
              <Label htmlFor="category">Category</Label>
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
                  <SelectValue />
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
            disabled={createBookmark.isPending}
          >
            Cancel
          </Button>
          <Button
            form="add-bookmark-form"
            type="submit"
            disabled={createBookmark.isPending}
          >
            {createBookmark.isPending ? "Adding..." : "Add Bookmark"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
