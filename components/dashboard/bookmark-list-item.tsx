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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { BookmarkWithCategory } from "@/lib/supabase/types";

interface BookmarkListItemProps {
  bookmark: BookmarkWithCategory;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCopy: (url: string) => void;
}

export function BookmarkListItem({
  bookmark,
  onEdit,
  onDelete,
  onCopy,
}: BookmarkListItemProps) {
  const handleOpen = () => {
    window.open(bookmark.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="group flex items-center gap-4 border-b p-3 transition-colors hover:bg-muted/50 last:border-b-0">
      {/* Favicon */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center">
        {bookmark.favicon_url ? (
          <img
            src={bookmark.favicon_url}
            alt=""
            className="h-6 w-6 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <HugeiconsIcon
            icon={Link01Icon}
            className="h-5 w-5 text-muted-foreground"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate font-medium">{bookmark.title}</span>
        {bookmark.description && (
          <span className="truncate text-sm text-muted-foreground">
            {bookmark.description}
          </span>
        )}
      </div>

      {/* Actions Menu */}
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

      {/* Category Badge */}
      {bookmark.category && (
        <Badge
          variant="secondary"
          style={
            bookmark.category.color
              ? {
                  backgroundColor: bookmark.category.color + "20",
                  color: bookmark.category.color,
                  borderColor: bookmark.category.color + "40",
                }
              : undefined
          }
          className={`shrink-0 ${bookmark.category.color ? "border" : ""}`}
        >
          {bookmark.category.name}
        </Badge>
      )}

      {/* Open Button */}
      <Button onClick={handleOpen} size="sm" className="shrink-0 gap-1">
        Open
        <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3 w-3" />
      </Button>
    </div>
  );
}
