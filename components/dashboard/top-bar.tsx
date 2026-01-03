"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  onAddBookmark: () => void;
  onOpenSearch: () => void;
}

export function TopBar({ onAddBookmark, onOpenSearch }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
      {/* Breadcrumb */}
      <div className="flex-1">
        <nav className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Dashboard</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">All Bookmarks</span>
        </nav>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenSearch}
          title="Search (⌘K)"
        >
          <HugeiconsIcon icon={Search01Icon} className="h-5 w-5" />
        </Button>
        <Button onClick={onAddBookmark} size="sm">
          <HugeiconsIcon icon={PlusSignIcon} className="mr-2 h-4 w-4" />
          Add Bookmark
        </Button>
      </div>
    </header>
  );
}
