"use client";

import { useState } from "react";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Home01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { useCreateCategory } from "@/hooks/use-categories";

interface AddCategorySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddCategorySheet({
  open,
  onOpenChange,
}: AddCategorySheetProps) {
  const [formData, setFormData] = useState({
    name: "",
    icon: "Home01Icon",
    color: "#ff6b35",
  });

  const createCategory = useCreateCategory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createCategory.mutateAsync({
        name: formData.name,
        icon: formData.icon,
        color: formData.color,
        order: 0,
        user_id: "", // Will be set by API
      });

      toast.success("Category created successfully");
      setFormData({ name: "", icon: "Home01Icon", color: "#ff6b35" });
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to create category");
    }
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
            <h2 className="text-lg font-semibold">Add Category</h2>
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
                <label htmlFor="name" className="text-sm font-medium">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-ring"
                  placeholder="e.g., Tech, Learning, Jobs"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Icon Preview</label>
                <div className="flex items-center gap-3 rounded-md border bg-muted p-4">
                  <HugeiconsIcon icon={Home01Icon} className="h-6 w-6" />
                  <span className="text-sm text-muted-foreground">
                    Icon customization coming soon
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="color" className="text-sm font-medium">
                  Color (Optional)
                </label>
                <div className="flex gap-2">
                  <input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    className="h-10 w-20 rounded-md border cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-ring"
                    placeholder="#ff6b35"
                  />
                </div>
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
                disabled={createCategory.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                className="flex-1"
                disabled={createCategory.isPending}
              >
                {createCategory.isPending ? "Creating..." : "Create Category"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
