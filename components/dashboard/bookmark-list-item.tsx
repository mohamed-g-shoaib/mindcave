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
    <div
      className="group flex cursor-pointer items-center gap-3 border-b p-3 transition-colors hover:bg-muted/50 last:border-b-0 md:cursor-default md:gap-4"
      onClick={(e) => {
        // On mobile, clicking the row (not buttons) opens the bookmark
        const target = e.target as HTMLElement;
        const isButton = target.closest("button");
        if (window.innerWidth < 768 && !isButton) {
          handleOpen();
        }
      }}
    >
      {/* Favicon */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center md:h-10 md:w-10">
        {bookmark.favicon_url ? (
          <img
            src={bookmark.favicon_url}
            alt=""
            className="h-5 w-5 object-contain md:h-6 md:w-6"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <HugeiconsIcon
            icon={Link01Icon}
            className="h-4 w-4 text-muted-foreground md:h-5 md:w-5"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-medium md:text-base">
          {bookmark.title}
        </span>
        {bookmark.description && (
          <span className="hidden truncate text-sm text-muted-foreground md:block">
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
              className="shrink-0 md:opacity-0 md:transition-opacity md:group-hover:opacity-100"
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
          <DropdownMenuItem onClick={() => onCopy(bookmark.url)}>
            <HugeiconsIcon icon={Copy01Icon} className="mr-2 h-4 w-4" />
            Copy Link
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpen} className="md:hidden">
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="mr-2 h-4 w-4" />
            Open
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

      {/* Category Badge - hidden on mobile */}
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
          className={`hidden shrink-0 md:inline-flex ${
            bookmark.category.color ? "border" : ""
          }`}
        >
          {bookmark.category.name}
        </Badge>
      )}

      {/* Open Button - hidden on mobile */}
      <Button
        onClick={handleOpen}
        size="sm"
        className="hidden shrink-0 gap-1 md:inline-flex"
      >
        Open
        <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3 w-3" />
      </Button>
    </div>
  );
}
