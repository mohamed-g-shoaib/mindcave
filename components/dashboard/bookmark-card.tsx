"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { useLazyImage } from "@/hooks/use-lazy-image";
import {
  Link01Icon,
  Edit02Icon,
  Delete02Icon,
  Copy01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { YouTubePreview } from "@/components/dashboard/youtube-preview";
import { getOptimizedImageUrl } from "@/lib/image-proxy";
import type { DensityLevel } from "@/lib/density";
import type { BookmarkWithCategory } from "@/lib/supabase/types";

interface BookmarkCardProps {
  bookmark: BookmarkWithCategory;
  density: DensityLevel;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCopy: (url: string) => void;
}

export function BookmarkCard({
  bookmark,
  density,
  onEdit,
  onDelete,
  onCopy,
}: BookmarkCardProps) {
  const handleOpen = () => {
    window.open(bookmark.url, "_blank", "noopener,noreferrer");
  };

  const handleCopy = () => {
    onCopy(bookmark.url);
  };

  const isYouTube =
    bookmark.media_type === "youtube" && bookmark.media_embed_id;

  // Use pre-generated thumbnails from database if available
  const ogImageUrl =
    (bookmark as never as { og_image_url_thumb?: string }).og_image_url_thumb ||
    getOptimizedImageUrl(bookmark.og_image_url, 300, "webp", 75);
  const { ref: ogImageRef, imageSrc: ogImageSrc } = useLazyImage(ogImageUrl);

  const faviconUrl =
    (bookmark as never as { favicon_url_thumb?: string }).favicon_url_thumb ||
    getOptimizedImageUrl(bookmark.favicon_url, 32, "webp");
  const { ref: faviconRef, imageSrc: faviconSrc } = useLazyImage(faviconUrl);

  // Determine what to show based on density
  const showTitle = density === "normal" || density === "comfortable";
  const showDescription = density === "normal";
  const showOnlyFavicon = density === "icon";

  // Aspect ratio based on density
  const aspectClass =
    density === "compact"
      ? "aspect-[4/3]"
      : showOnlyFavicon
        ? "aspect-square"
        : "aspect-video";

  // Padding based on density
  const contentPadding = density === "normal" ? "p-3" : "p-2";

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card
          className={cn(
            "group flex h-full flex-col overflow-hidden transition-colors",
            "hover:ring-1 hover:ring-primary/50 hover:bg-muted/80",
            "cursor-pointer p-0",
          )}
          onClick={handleOpen}
        >
          {/* Media Section */}
          <div className={cn("w-full bg-muted overflow-hidden", aspectClass)}>
            {showOnlyFavicon ? (
              // Icon density: show favicon only, centered
              <div className="flex size-full items-center justify-center">
                {bookmark.favicon_url ? (
                  <img
                    ref={faviconRef}
                    src={faviconSrc || undefined}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <HugeiconsIcon
                    icon={Link01Icon}
                    className="size-10 text-muted-foreground"
                  />
                )}
              </div>
            ) : isYouTube && bookmark.media_embed_id ? (
              <YouTubePreview
                embedId={bookmark.media_embed_id}
                title={bookmark.title}
              />
            ) : bookmark.og_image_url ? (
              <img
                ref={ogImageRef}
                src={ogImageSrc || undefined}
                alt={bookmark.title}
                width={300}
                height={169}
                className="size-full object-cover transition-transform group-hover:scale-105"
              />
            ) : bookmark.favicon_url ? (
              <div className="flex size-full items-center justify-center">
                <div className="flex size-14 items-center justify-center bg-background/70 ring-1 ring-foreground/10">
                  <img
                    ref={faviconRef}
                    src={faviconSrc || undefined}
                    alt=""
                    width={32}
                    height={32}
                    className="size-8 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex size-full items-center justify-center">
                <HugeiconsIcon
                  icon={Link01Icon}
                  className="size-12 text-muted-foreground"
                />
              </div>
            )}
          </div>

          {/* Content - only shown at normal/comfortable density */}
          {showTitle && (
            <div className={cn("space-y-1", contentPadding)}>
              <h3 className="truncate text-sm font-medium text-balance">
                {bookmark.title}
              </h3>
              {showDescription && bookmark.description && (
                <p className="truncate text-xs text-muted-foreground text-pretty">
                  {bookmark.description}
                </p>
              )}
            </div>
          )}
        </Card>
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
