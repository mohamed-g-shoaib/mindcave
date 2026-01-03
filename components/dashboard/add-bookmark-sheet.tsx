"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

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
    categoryId: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement bookmark creation
    console.log("Creating bookmark:", formData);
    onOpenChange(false);
  };

  if (!open) return null;

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
            <h2 className="text-lg font-semibold">Add Bookmark</h2>
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
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-ring"
                >
                  <option value="">Uncategorized</option>
                  {/* TODO: Load categories from database */}
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
              >
                Cancel
              </Button>
              <Button type="submit" onClick={handleSubmit} className="flex-1">
                Add Bookmark
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
