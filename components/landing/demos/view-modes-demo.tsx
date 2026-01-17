"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GridViewIcon,
  ListViewIcon,
  YoutubeIcon,
  SpotifyIcon,
  PaintBoardIcon,
} from "@hugeicons/core-free-icons";
import { OGPreview } from "../og-preview";

const bookmarks = [
  {
    id: "youtube",
    title: "YouTube",
    description: "Streaming",
    icon: YoutubeIcon,
    color: "#ff0000",
  },
  {
    id: "spotify",
    title: "Spotify",
    description: "Music",
    icon: SpotifyIcon,
    color: "#1db954",
  },
  {
    id: "figma",
    title: "Design",
    description: "Inspire",
    icon: PaintBoardIcon,
    color: "#ec4899",
  },
];

export function ViewModesDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isListView, setIsListView] = useState(false);

  useEffect(() => {
    if (!isInView) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    setIsListView(false);

    intervalRef.current = setInterval(() => {
      setIsListView((prev) => !prev);
    }, 3500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="flex h-full min-h-56 flex-col overflow-hidden border border-border bg-card p-4"
    >
      {/* Toggle Header */}
      <div className="mb-3 flex shrink-0 items-center justify-between">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          View Mode
        </div>
        <div className="flex border border-border bg-muted/50 p-0.5">
          {/* Grid button */}
          <button
            onClick={() => setIsListView(false)}
            className={`relative flex h-6 w-8 items-center justify-center transition-colors ${
              !isListView ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {!isListView && (
              <motion.div
                layoutId="activeView"
                className="absolute inset-0 bg-background border border-border shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{ willChange: "transform" }}
              />
            )}
            <HugeiconsIcon
              icon={GridViewIcon}
              className="relative z-10 h-3.5 w-3.5"
            />
          </button>
          {/* List button */}
          <button
            onClick={() => setIsListView(true)}
            className={`relative flex h-6 w-8 items-center justify-center transition-colors ${
              isListView ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {isListView && (
              <motion.div
                layoutId="activeView"
                className="absolute inset-0 bg-background border border-border shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{ willChange: "transform" }}
              />
            )}
            <HugeiconsIcon
              icon={ListViewIcon}
              className="relative z-10 h-3.5 w-3.5"
            />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {!isListView ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, transform: "scale(0.98)" }}
              animate={{ opacity: 1, transform: "scale(1)" }}
              exit={{ opacity: 0, transform: "scale(0.98)" }}
              transition={{ duration: 0.3 }}
              style={{ willChange: "transform, opacity" }}
              className="grid h-full grid-cols-3 gap-2"
            >
              {bookmarks.map((bookmark, i) => (
                <div
                  key={bookmark.title}
                  className="flex flex-col border border-border bg-secondary/50 overflow-hidden"
                >
                  {/* OG Image placeholder */}
                  <div className="relative min-h-0 flex-1 w-full overflow-hidden border-b border-border/50">
                    <OGPreview id={bookmark.id} className="h-full w-full" />
                  </div>

                  {/* Info area */}
                  <div className="p-2 pt-1.5 shrink-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <div
                        className="flex h-4 w-4 shrink-0 items-center justify-center"
                        style={{ backgroundColor: bookmark.color + "15" }}
                      >
                        <HugeiconsIcon
                          icon={bookmark.icon}
                          className="h-2.5 w-2.5"
                          style={{ color: bookmark.color }}
                        />
                      </div>
                      <div className="min-w-0 flex-1 truncate text-[10px] font-bold text-foreground">
                        {bookmark.title}
                      </div>
                    </div>
                    <div className="truncate text-[8px] text-muted-foreground font-medium">
                      {bookmark.description}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, transform: "translateX(10px)" }}
              animate={{ opacity: 1, transform: "translateX(0)" }}
              exit={{ opacity: 0, transform: "translateX(-10px)" }}
              transition={{ duration: 0.2 }}
              style={{ willChange: "transform, opacity" }}
              className="space-y-1.5 h-full"
            >
              {bookmarks.map((bookmark, i) => (
                <div
                  key={bookmark.title}
                  className="flex items-center gap-2 border border-border bg-secondary/50 px-2.5 py-1.5"
                >
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center"
                    style={{ backgroundColor: bookmark.color + "15" }}
                  >
                    <HugeiconsIcon
                      icon={bookmark.icon}
                      className="h-3.5 w-3.5"
                      style={{ color: bookmark.color }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-bold text-foreground">
                      {bookmark.title}
                    </div>
                  </div>
                  <div className="shrink-0 text-[10px] text-muted-foreground font-medium bg-muted/30 px-1.5 py-0.5 border border-border/30">
                    {bookmark.description}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
