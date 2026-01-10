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
import { getProxiedImageUrl, getOptimizedImageUrl } from "@/lib/image-proxy";
import { cn } from "@/lib/utils";
import type { BookmarkWithCategory } from "@/lib/supabase/types";

interface BookmarkListItemProps {
  bookmark: BookmarkWithCategory;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCopy: (url: string) => void;
  showCategory?: boolean;
  columns?: number;
}

export function BookmarkListItem({
  bookmark,
  onEdit,
  onDelete,
  onCopy,
  showCategory = true,
  columns = 1,
}: BookmarkListItemProps) {
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

  const handleCopy = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onCopy(bookmark.url);
    setCopied(true);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className="group flex cursor-pointer items-center gap-2 border-b p-2 transition-all duration-300 hover:bg-muted/50 hover:border-primary/50 hover:shadow-md last:border-b-0 md:gap-3 md:p-3"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            // Don't open if clicking a button or a menu item
            if (
              !target.closest("button") &&
              !target.closest('[role="menuitem"]')
            ) {
              handleOpen();
            }
          }}
        >
          {/* Favicon */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center md:h-10 md:w-10 transition-transform group-hover:scale-110">
            {bookmark.favicon_url ? (
              <img
                src={
                  getOptimizedImageUrl(bookmark.favicon_url, 32, "webp") ||
                  undefined
                }
                alt=""
                loading="lazy"
                width={24}
                height={24}
                className="h-5 w-5 object-contain md:h-6 md:w-6 transition-transform"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <HugeiconsIcon
                icon={Link01Icon}
                className="h-4 w-4 text-muted-foreground md:h-5 md:w-5 transition-transform"
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

          {/* Actions Container - unified spacing and hit areas */}
          <div className="flex items-center -mr-1 gap-0.5 shrink-0">
            {/* Category Icon - no background, fixed container size for consistent gap */}
            {showCategory && bookmark.category && (
              <div
                className={`items-center justify-center w-8 h-8 shrink-0 ${
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

            {/* Copy Button - shown always, except for mobile 2 columns (moved to menu) */}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleCopy}
              className={`hover:text-primary transition-colors h-8 w-8 px-0 shrink-0 ${
                columns === 2 ? "hidden md:flex" : "flex"
              }`}
              aria-label="Copy link"
            >
              <HugeiconsIcon
                icon={copied ? Tick02Icon : Copy01Icon}
                className={`h-4 w-4 transition-all duration-200 ${
                  copied ? "text-green-500 scale-110" : ""
                }`}
              />
            </Button>

            {/* Menu Button - always visible, consistent size */}
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
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(bookmark.id);
                  }}
                >
                  <HugeiconsIcon icon={Edit02Icon} className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>

                {/* Mobile 2 Columns: Move Copy Link to menu */}
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy();
                  }}
                  className={columns === 2 ? "flex md:hidden" : "hidden"}
                >
                  <HugeiconsIcon
                    icon={copied ? Tick02Icon : Copy01Icon}
                    className={`mr-2 h-4 w-4 ${copied ? "text-green-500" : ""}`}
                  />
                  {copied ? "Copied!" : "Copy Link"}
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(bookmark.id);
                  }}
                  variant="destructive"
                >
                  <HugeiconsIcon icon={Delete02Icon} className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
        >
          <HugeiconsIcon icon={Link01Icon} className="mr-2 h-4 w-4" />
          Open Link
        </ContextMenuItem>
        <ContextMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleCopy();
          }}
        >
          <HugeiconsIcon
            icon={copied ? Tick02Icon : Copy01Icon}
            className={cn("mr-2 h-4 w-4", copied && "text-green-500")}
          />
          {copied ? "Copied!" : "Copy Link"}
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onEdit(bookmark.id);
          }}
        >
          <HugeiconsIcon icon={Edit02Icon} className="mr-2 h-4 w-4" />
          Edit Bookmark
        </ContextMenuItem>
        <ContextMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onDelete(bookmark.id);
          }}
          variant="destructive"
        >
          <HugeiconsIcon icon={Delete02Icon} className="mr-2 h-4 w-4" />
          Delete Bookmark
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
