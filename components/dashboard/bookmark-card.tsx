"use client";

import { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Link01Icon,
  Edit02Icon,
  Delete02Icon,
  Copy01Icon,
  MoreVerticalIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

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
import { getCategoryIcon } from "@/components/dashboard/icon-picker";
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

  const getColorFromUrl = (url: string) => {
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
      hash = url.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 85%)`;
  };

  return (
    <Card className="group flex flex-col overflow-hidden transition-shadow hover:shadow-md p-0">
      {/* Media Section - now the only clickable area to open bookmark */}
      <div className="cursor-pointer overflow-hidden" onClick={handleOpen}>
        {isYouTube ? (
          <div className="aspect-video w-full bg-muted">
            <iframe
              src={`https://www.youtube.com/embed/${bookmark.media_embed_id}`}
              title={bookmark.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full pointer-events-none"
            />
          </div>
        ) : bookmark.og_image_url ? (
          <div className="aspect-video w-full bg-muted">
            <img
              src={bookmark.og_image_url}
              alt={bookmark.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        ) : bookmark.favicon_url ? (
          <div
            className="flex aspect-video w-full items-center justify-center transition-opacity hover:opacity-90"
            style={{ backgroundColor: getColorFromUrl(bookmark.url) }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/80 shadow-sm backdrop-blur-sm">
              <img
                src={bookmark.favicon_url}
                alt={`${bookmark.title} favicon`}
                className="h-10 w-10 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = `<svg class="h-10 w-10 text-foreground/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`;
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

      {/* Content */}
      <CardHeader className="flex-1 p-3 space-y-1">
        <div className="flex items-start justify-between gap-1">
          <CardTitle className="line-clamp-2 text-base flex-1 min-w-0">
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
                <HugeiconsIcon icon={MoreVerticalIcon} className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(bookmark.id)}>
                  <HugeiconsIcon icon={Edit02Icon} className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete(bookmark.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <HugeiconsIcon icon={Delete02Icon} className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Description - takes full width below title and actions */}
        {bookmark.description && (
          <CardDescription className="line-clamp-2 w-full">
            {bookmark.description}
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  );
}
