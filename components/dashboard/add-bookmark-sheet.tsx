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
    og_image_url: "",
    favicon_url: "",
    media_type: "default" as "youtube" | "vimeo" | "default",
    media_embed_id: "",
  });
  const [isFetchingMetadata, setIsFetchingMetadata] = useState(false);
  const [isUploadingOg, setIsUploadingOg] = useState(false);
  const [isUploadingFavicon, setIsUploadingFavicon] = useState(false);
  const [hasCustomOg, setHasCustomOg] = useState(false);
  const [hasCustomFavicon, setHasCustomFavicon] = useState(false);

  const createBookmark = useCreateBookmark();
  const { data: categories = [] } = useCategories();

  const fetchMetadataForUrl = async (rawUrl: string) => {
    try {
      const response = await fetch("/api/fetch-metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: rawUrl }),
      });

      if (!response.ok) return;
      const data = await response.json();

      setFormData((prev) => ({
        ...prev,
        // Only auto-fill title if it's empty
        title: prev.title.trim() ? prev.title : data.title || "",
        // Only auto-fill description if it's empty
        description: prev.description.trim()
          ? prev.description
          : data.description || "",
        og_image_url: hasCustomOg ? prev.og_image_url : data.og_image_url || "",
        favicon_url: hasCustomFavicon
          ? prev.favicon_url
          : data.favicon_url || "",
        media_type: data.media_type || "default",
        media_embed_id: data.media_embed_id || "",
      }));
    } catch (error) {
      console.error("Failed to fetch metadata:", error);
    }
  };

  const uploadCustom = async (kind: "ogimage" | "favicon", file: File) => {
    if (!formData.url) {
      toast.error("Set the URL first");
      return;
    }

    try {
      new URL(formData.url);
    } catch {
      toast.error("Enter a valid URL first");
      return;
    }

    const form = new FormData();
    form.set("kind", kind);
    form.set("url", formData.url);
    form.set("file", file);

    if (kind === "ogimage") setIsUploadingOg(true);
    else setIsUploadingFavicon(true);

    try {
      const res = await fetch("/api/storage/upload", {
        method: "POST",
        body: form,
      });

      const payload = await res.json();

      console.log("Upload response:", {
        ok: res.ok,
        status: res.status,
        payload,
      });

      if (!res.ok) {
        throw new Error(payload?.error || "Upload failed");
      }

      if (!payload.publicUrl) {
        throw new Error("No public URL in response");
      }

      if (kind === "ogimage") {
        setFormData((prev) => ({ ...prev, og_image_url: payload.publicUrl }));
        setHasCustomOg(true);
      } else {
        setFormData((prev) => ({ ...prev, favicon_url: payload.publicUrl }));
        setHasCustomFavicon(true);
      }

      toast.success(
        kind === "ogimage"
          ? "Custom OG image uploaded"
          : "Custom favicon uploaded"
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      if (kind === "ogimage") setIsUploadingOg(false);
      else setIsUploadingFavicon(false);
    }
  };

  // Fetch metadata when URL changes
  useEffect(() => {
    const fetchMetadata = async () => {
      if (!formData.url) return;

      // Basic URL validation
      try {
        new URL(formData.url);
      } catch {
        return;
      }

      setIsFetchingMetadata(true);

      try {
        await fetchMetadataForUrl(formData.url);
      } catch (error) {
        console.error("Failed to fetch metadata:", error);
      } finally {
        setIsFetchingMetadata(false);
      }
    };

    const debounce = setTimeout(fetchMetadata, 500);
    return () => clearTimeout(debounce);
  }, [formData.url]);

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
        og_image_url: formData.og_image_url || null,
        favicon_url: formData.favicon_url || null,
        media_type: formData.media_type,
        media_embed_id: formData.media_embed_id || null,
        user_id: "", // Will be set by API
      });

      toast.success("Bookmark added successfully");
      setFormData({
        title: "",
        url: "",
        description: "",
        category_id: "",
        og_image_url: "",
        favicon_url: "",
        media_type: "default",
        media_embed_id: "",
      });
      setHasCustomOg(false);
      setHasCustomFavicon(false);
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
              {isFetchingMetadata && (
                <p className="text-xs text-muted-foreground">
                  Fetching metadata...
                </p>
              )}
            </div>

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

            {/* Custom media */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="custom-og">Custom OG image (optional)</Label>
                <Input
                  id="custom-og"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  disabled={isUploadingOg || createBookmark.isPending}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadCustom("ogimage", f);
                  }}
                />
                <div className="flex items-center justify-between">
                  {hasCustomOg ? (
                    <p className="text-xs text-muted-foreground">
                      Using your uploaded OG image.
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      If empty, we’ll fetch it automatically.
                    </p>
                  )}
                  {hasCustomOg && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={isFetchingMetadata}
                      onClick={async () => {
                        setHasCustomOg(false);
                        setFormData((prev) => ({ ...prev, og_image_url: "" }));
                        if (formData.url) {
                          setIsFetchingMetadata(true);
                          await fetchMetadataForUrl(formData.url);
                          setIsFetchingMetadata(false);
                        }
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-favicon">
                  Custom favicon (optional)
                </Label>
                <Input
                  id="custom-favicon"
                  type="file"
                  accept="image/png,image/x-icon,image/vnd.microsoft.icon,image/svg+xml"
                  disabled={isUploadingFavicon || createBookmark.isPending}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadCustom("favicon", f);
                  }}
                />
                <div className="flex items-center justify-between">
                  {hasCustomFavicon ? (
                    <p className="text-xs text-muted-foreground">
                      Using your uploaded favicon.
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      If empty, we’ll fetch it automatically.
                    </p>
                  )}
                  {hasCustomFavicon && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={isFetchingMetadata}
                      onClick={async () => {
                        setHasCustomFavicon(false);
                        setFormData((prev) => ({ ...prev, favicon_url: "" }));
                        if (formData.url) {
                          setIsFetchingMetadata(true);
                          await fetchMetadataForUrl(formData.url);
                          setIsFetchingMetadata(false);
                        }
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
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
