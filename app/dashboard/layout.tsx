"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopBar } from "@/components/dashboard/top-bar";
import { CommandPalette } from "@/components/dashboard/command-palette";
import { AddBookmarkSheet } from "@/components/dashboard/add-bookmark-sheet";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [addBookmarkOpen, setAddBookmarkOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isExpanded={sidebarExpanded}
        onToggle={() => setSidebarExpanded(!sidebarExpanded)}
      />

      <div
        className="transition-all duration-300"
        style={{
          marginLeft: sidebarExpanded ? "16rem" : "4rem",
        }}
      >
        <TopBar
          onAddBookmark={() => setAddBookmarkOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
        />

        <main className="p-6">{children}</main>
      </div>

      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
      <AddBookmarkSheet
        open={addBookmarkOpen}
        onOpenChange={setAddBookmarkOpen}
      />
    </div>
  );
}
