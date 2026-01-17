"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { useLazyImage } from "@/hooks/use-lazy-image";
import {
  Link01Icon,
  Edit02Icon,
  Delete02Icon,
  Copy01Icon,
} from "@hugeicons/core-free-icons";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { getOptimizedImageUrl } from "@/lib/image-proxy";
import { cn } from "@/lib/utils";
import type { DensityLevel } from "@/lib/density";
import type { BookmarkWithCategory } from "@/lib/supabase/types";

interface BookmarkListItemProps {
  bookmark: BookmarkWithCategory;
  density: DensityLevel;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCopy: (url: string) => void;
}

export function BookmarkListItem({
  bookmark,
  density,
  onEdit,
  onDelete,
  onCopy,
}: BookmarkListItemProps) {
  const handleOpen = () => {
    window.open(bookmark.url, "_blank", "noopener,noreferrer");
  };

  const handleCopy = () => {
    onCopy(bookmark.url);
  };

  // Use pre-generated thumbnails from database if available
  const faviconUrl =
    (bookmark as never as { favicon_url_thumb?: string }).favicon_url_thumb ||
    getOptimizedImageUrl(bookmark.favicon_url, 32, "webp");
  const { ref: faviconRef, imageSrc: faviconSrc } = useLazyImage(faviconUrl);

  // Determine layout based on density
  const isVertical = density === "compact" || density === "icon";
  const showTitle = density !== "icon";
  const showDescription = density === "normal";

  // Favicon size based on density
  const faviconSize =
    density === "icon"
      ? "size-10"
      : density === "compact"
        ? "size-8"
        : "size-6";
  const faviconContainerSize =
    density === "icon"
      ? "size-14"
      : density === "compact"
        ? "size-12"
        : "size-10";

  // Padding based on density
  const padding =
    density === "normal"
      ? "p-3"
      : density === "comfortable"
        ? "p-2.5"
        : density === "compact"
          ? "p-2"
          : "p-1.5";

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={cn(
            "group cursor-pointer transition-colors",
            "hover:bg-muted/50 hover:ring-1 hover:ring-primary/50",
            "border-b last:border-b-0",
            padding,
            isVertical
              ? "flex flex-col items-center justify-center text-center"
              : "flex items-center gap-3",
          )}
          onClick={handleOpen}
        >
          {/* Favicon */}
          <div
            className={cn(
              "shrink-0 flex items-center justify-center",
              faviconContainerSize,
            )}
          >
            {bookmark.favicon_url ? (
              <img
                ref={faviconRef}
                src={faviconSrc || undefined}
                alt=""
                className={cn("object-contain", faviconSize)}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <HugeiconsIcon
                icon={Link01Icon}
                className={cn("text-muted-foreground", faviconSize)}
              />
            )}
          </div>

          {/* Content */}
          {showTitle && (
            <div
              className={cn(
                "min-w-0",
                isVertical ? "w-full mt-1" : "flex-1 flex flex-col gap-0.5",
              )}
            >
              <span
                className={cn(
                  "line-clamp-1 font-medium",
                  density === "compact" ? "text-xs" : "text-sm",
                )}
              >
                {bookmark.title}
              </span>
              {showDescription && bookmark.description && (
                <span className="line-clamp-1 text-xs text-muted-foreground">
                  {bookmark.description}
                </span>
              )}
            </div>
          )}
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-48">
        <ContextMenuItem onClick={handleOpen}>
          <HugeiconsIcon icon={Link01Icon} className="mr-2 size-4" />
          Open Link
        </ContextMenuItem>
        <ContextMenuItem onClick={handleCopy}>
          <HugeiconsIcon icon={Copy01Icon} className="mr-2 size-4" />
          Copy Link
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => onEdit(bookmark.id)}>
          <HugeiconsIcon icon={Edit02Icon} className="mr-2 size-4" />
          Edit Bookmark
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => onDelete(bookmark.id)}
          variant="destructive"
        >
          <HugeiconsIcon icon={Delete02Icon} className="mr-2 size-4" />
          Delete Bookmark
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
