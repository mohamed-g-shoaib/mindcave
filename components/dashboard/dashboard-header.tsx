"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon, Search01Icon } from "@hugeicons/core-free-icons";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CommandDialog } from "@/components/dashboard/command-dialog";
import { AddBookmarkSheet } from "@/components/dashboard/add-bookmark-sheet";
import { useCategories } from "@/hooks/use-categories";

export function DashboardHeader() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const { data: categories = [] } = useCategories();

  const [commandOpen, setCommandOpen] = useState(false);
  const [addBookmarkOpen, setAddBookmarkOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/(Mac|iPhone|iPad|iPod)/i.test(navigator.platform));
  }, []);

  const shortcutKey = isMac ? "⌘" : "Ctrl";

  // Get current category name
  const currentCategory = categoryId
    ? categories.find((c) => c.id === categoryId)?.name
    : null;

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
        {/* Sidebar Toggle */}
        <Tooltip>
          <TooltipTrigger render={<SidebarTrigger className="-ml-1" />} />
          <TooltipContent side="right">Toggle sidebar (Ctrl+B)</TooltipContent>
        </Tooltip>
        <Separator orientation="vertical" className="mx-2 h-4" />

        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            {currentCategory ? (
              <>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    All Bookmarks
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentCategory}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage className="max-w-30 truncate">
                  All Bookmarks
                </BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCommandOpen(true)}
            className="hidden gap-2 text-muted-foreground sm:flex"
          >
            <HugeiconsIcon icon={Search01Icon} className="h-4 w-4" />
            <span className="text-xs">Search...</span>
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
              <span className="text-xs">{shortcutKey}</span>K
            </kbd>
          </Button>

          {/* Mobile Search */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setCommandOpen(true)}
            className="sm:hidden"
          >
            <HugeiconsIcon icon={Search01Icon} className="h-4 w-4" />
          </Button>

          {/* Add Bookmark */}
          <Button
            size="sm"
            onClick={() => setAddBookmarkOpen(true)}
            data-onboarding="add-bookmark"
          >
            <HugeiconsIcon icon={PlusSignIcon} className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Add Bookmark</span>
          </Button>
        </div>
      </header>

      {/* Dialogs */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen} />
      <AddBookmarkSheet
        open={addBookmarkOpen}
        onOpenChange={setAddBookmarkOpen}
      />
    </>
  );
}
