"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Link01Icon,
  FolderIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed left-1/2 top-[20%] w-full max-w-2xl -translate-x-1/2 rounded-lg border bg-popover shadow-lg">
        <Command className="rounded-lg">
          <div className="flex items-center border-b px-3">
            <HugeiconsIcon
              icon={Search01Icon}
              className="mr-2 h-5 w-5 shrink-0 text-muted-foreground"
            />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search bookmarks and categories..."
              className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            <kbd className="ml-auto hidden rounded border bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground sm:inline-block">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            <Command.Group heading="Suggestions">
              <Command.Item
                onSelect={() => {
                  router.push("/dashboard");
                  onOpenChange(false);
                }}
                className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 hover:bg-accent"
              >
                <HugeiconsIcon icon={Link01Icon} className="h-4 w-4" />
                <span>All Bookmarks</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  onOpenChange(false);
                }}
                className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 hover:bg-accent"
              >
                <HugeiconsIcon icon={FolderIcon} className="h-4 w-4" />
                <span>Categories</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>

      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={() => onOpenChange(false)} />
    </div>
  );
}
