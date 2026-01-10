"use client";

import { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLazyImage } from "@/hooks/use-lazy-image";
import {
  Link01Icon,
  Edit02Icon,
  Delete02Icon,
  Copy01Icon,
  MoreVerticalIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { getCategoryIcon } from "@/components/dashboard/icon-picker";
import { YouTubePreview } from "@/components/dashboard/youtube-preview";
import { getProxiedImageUrl, getOptimizedImageUrl } from "@/lib/image-proxy";
import type { BookmarkWithCategory } from "@/lib/supabase/types";

interface BookmarkCardProps {
  bookmark: BookmarkWithCategory;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCopy: (url: string) => void;
  showCategory?: boolean;
  columns?: number;
}

export function BookmarkCard({
  bookmark,
  onEdit,
  onDelete,
  onCopy,
  showCategory = true,
  columns = 1,
}: BookmarkCardProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleOpen = () => {
    window.open(bookmark.url, "_blank", "noopener,noreferrer");
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopy(bookmark.url);
    setCopied(true);
  };

  const isYouTube =
    bookmark.media_type === "youtube" && bookmark.media_embed_id;

  const ogImageUrl = getOptimizedImageUrl(
    bookmark.og_image_url,
    300,
    "webp",
    75
  );
  const { ref: ogImageRef, imageSrc: ogImageSrc } = useLazyImage(ogImageUrl);

  const faviconUrl = getOptimizedImageUrl(bookmark.favicon_url, 32, "webp");
  const { ref: faviconRef, imageSrc: faviconSrc } = useLazyImage(faviconUrl);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:ring-1 hover:ring-primary/50 hover:bg-muted/80 hover:shadow-md p-0">
          {/* Media Section - now the only clickable area to open bookmark */}
          <div className="cursor-pointer overflow-hidden" onClick={handleOpen}>
            {isYouTube ? (
              <YouTubePreview
                embedId={bookmark.media_embed_id}
                title={bookmark.title}
              />
            ) : bookmark.og_image_url ? (
              <div className="aspect-video w-full bg-muted">
                <img
                  ref={ogImageRef}
                  src={ogImageSrc || undefined}
                  alt={bookmark.title}
                  width={300}
                  height={169}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
            ) : bookmark.favicon_url ? (
              <div className="flex aspect-video w-full items-center justify-center bg-muted transition-colors hover:bg-muted/80">
                <div className="flex h-14 w-14 items-center justify-center rounded-none bg-background/70 ring-1 ring-foreground/10">
                  <img
                    ref={faviconRef}
                    src={faviconSrc || undefined}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = `<svg class="h-8 w-8 text-foreground/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`;
                      }
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex aspect-video w-full items-center justify-center bg-muted transition-colors hover:bg-muted/80">
                <HugeiconsIcon
                  icon={Link01Icon}
                  className="h-12 w-12 text-muted-foreground"
                />
              </div>
            )}
          </div>

          {/* Content - fixed height with description area always present */}
          <CardHeader className="p-3 space-y-1">
            <div className="flex items-start justify-between gap-1">
              <CardTitle className="line-clamp-2 text-base flex-1 min-w-0 min-h-12">
                {bookmark.title}
              </CardTitle>

              {/* Actions - consistent gap-0.5 and aligned to edge */}
              <div className="flex items-center -mr-1 gap-0.5 shrink-0">
                {/* Category Icon - show in 1-col card on mobile, or always on desktop */}
                {showCategory && bookmark.category && (
                  <div
                    className={`items-center justify-center w-8 h-8 ${
                      columns === 1 ? "flex" : "hidden md:flex"
                    }`}
                    style={{ color: bookmark.category.color || undefined }}
                    title={bookmark.category.name}
                  >
                    <HugeiconsIcon
                      icon={getCategoryIcon(bookmark.category.icon)}
                      className="h-4 w-4"
                    />
                  </div>
                )}

                {/* Copy Button */}
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleCopy}
                  className="hover:text-primary transition-colors h-8 w-8 px-0 shrink-0"
                  aria-label="Copy link"
                >
                  <HugeiconsIcon
                    icon={copied ? Tick02Icon : Copy01Icon}
                    className={`h-4 w-4 transition-all duration-200 ${
                      copied ? "text-green-500 scale-110" : ""
                    }`}
                  />
                </Button>

                {/* Menu Button */}
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="hover:text-primary transition-colors h-8 w-8 px-0 shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      />
                    }
                  >
                    <HugeiconsIcon
                      icon={MoreVerticalIcon}
                      className="h-4 w-4"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(bookmark.id)}>
                      <HugeiconsIcon
                        icon={Edit02Icon}
                        className="mr-2 h-4 w-4"
                      />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(bookmark.id)}
                      variant="destructive"
                    >
                      <HugeiconsIcon
                        icon={Delete02Icon}
                        className="mr-2 h-4 w-4"
                      />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Description - always present for consistent height, line-clamp-2 for truncation */}
            <CardDescription className="line-clamp-2 w-full min-h-10">
              {bookmark.description || "\u00A0"}
            </CardDescription>
          </CardHeader>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem onClick={handleOpen}>
          <HugeiconsIcon icon={Link01Icon} className="mr-2 h-4 w-4" />
          Open Link
        </ContextMenuItem>
        <ContextMenuItem onClick={handleCopy}>
          <HugeiconsIcon
            icon={copied ? Tick02Icon : Copy01Icon}
            className={cn("mr-2 h-4 w-4", copied && "text-green-500")}
          />
          {copied ? "Copied!" : "Copy Link"}
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => onEdit(bookmark.id)}>
          <HugeiconsIcon icon={Edit02Icon} className="mr-2 h-4 w-4" />
          Edit Bookmark
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => onDelete(bookmark.id)}
          variant="destructive"
        >
          <HugeiconsIcon icon={Delete02Icon} className="mr-2 h-4 w-4" />
          Delete Bookmark
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
