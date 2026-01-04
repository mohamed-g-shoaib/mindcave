"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Link01Icon,
  Edit02Icon,
  Delete02Icon,
  Copy01Icon,
  MoreVerticalIcon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import type { BookmarkWithCategory } from "@/lib/supabase/types";

interface BookmarkCardProps {
  bookmark: BookmarkWithCategory;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCopy: (url: string) => void;
}

export function BookmarkCard({
  bookmark,
  onEdit,
  onDelete,
  onCopy,
}: BookmarkCardProps) {
  const handleOpen = () => {
    window.open(bookmark.url, "_blank", "noopener,noreferrer");
  };

  // Check if it's a YouTube video
  const isYouTube =
    bookmark.media_type === "youtube" && bookmark.media_embed_id;

  // Generate a color based on the URL for consistent backgrounds
  const getColorFromUrl = (url: string) => {
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
      hash = url.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 85%)`;
  };

  return (
    <Card className="group flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      {/* Media Section */}
      {isYouTube ? (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <iframe
            src={`https://www.youtube.com/embed/${bookmark.media_embed_id}`}
            title={bookmark.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      ) : bookmark.og_image_url ? (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={bookmark.og_image_url}
            alt={bookmark.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      ) : bookmark.favicon_url ? (
        <div
          className="flex aspect-video w-full items-center justify-center"
          style={{ backgroundColor: getColorFromUrl(bookmark.url) }}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/80 shadow-sm backdrop-blur-sm">
            <img
              src={bookmark.favicon_url}
              alt={`${bookmark.title} favicon`}
              className="h-10 w-10 object-contain"
              onError={(e) => {
                // Fallback to link icon if favicon fails to load
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
        <div className="flex aspect-video w-full items-center justify-center bg-muted">
          <HugeiconsIcon
            icon={Link01Icon}
            className="h-12 w-12 text-muted-foreground"
          />
        </div>
      )}

      {/* Content */}
      <CardHeader className="flex-1 pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2 text-base">
            {bookmark.title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
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
              <DropdownMenuItem onClick={() => onCopy(bookmark.url)}>
                <HugeiconsIcon icon={Copy01Icon} className="mr-2 h-4 w-4" />
                Copy Link
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
        {bookmark.description && (
          <CardDescription className="line-clamp-2">
            {bookmark.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardFooter className="flex items-center justify-between gap-2 pt-0">
        {bookmark.category ? (
          <Badge variant="secondary">{bookmark.category.name}</Badge>
        ) : (
          <span />
        )}
        <Button onClick={handleOpen} size="sm" className="gap-1">
          Open
          <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
}
