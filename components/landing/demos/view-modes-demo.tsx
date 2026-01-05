"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GridViewIcon,
  ListViewIcon,
  YoutubeIcon,
  SpotifyIcon,
  DribbbleIcon,
} from "@hugeicons/core-free-icons";

const bookmarks = [
  {
    title: "YouTube",
    description: "Streaming",
    icon: YoutubeIcon,
    color: "#ff0000",
  },
  {
    title: "Spotify",
    description: "Music",
    icon: SpotifyIcon,
    color: "#1db954",
  },
  {
    title: "Dribbble",
    description: "Inspiration",
    icon: DribbbleIcon,
    color: "#ea4c89",
  },
];

export function ViewModesDemo() {
  const [isListView, setIsListView] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsListView((prev) => !prev);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full min-h-56 flex-col overflow-hidden border border-border bg-card p-4">
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
                    {bookmark.title === "YouTube" && (
                      <div className="flex h-full w-full flex-col bg-gradient-to-b from-neutral-800 to-black p-2 relative">
                        {/* Play button area */}
                        <div className="flex-1 flex items-center justify-center">
                          <div className="w-5 h-4 bg-[#f00]/90 flex items-center justify-center">
                            <div className="w-0 h-0 border-t-2 border-t-transparent border-b-2 border-b-transparent border-l-4 border-l-white ml-0.5" />
                          </div>
                        </div>
                        {/* Timestamp */}
                        <div className="absolute bottom-3.5 right-1.5 bg-black/80 px-0.5 text-[5px] text-white font-medium">
                          3:42
                        </div>
                        {/* Progress bar */}
                        <div className="h-0.5 w-full bg-white/20 overflow-hidden mt-auto">
                          <div className="h-full w-[45%] bg-[#f00]" />
                        </div>
                      </div>
                    )}
                    {bookmark.title === "Spotify" && (
                      <div className="flex h-full w-full flex-col bg-gradient-to-br from-[#1db954] to-[#191414] p-1.5 relative overflow-hidden">
                        {/* Equalizer bars */}
                        <div className="flex-1 flex items-end justify-center gap-0.5 pb-1">
                          <div className="w-1 h-[60%] bg-white/80" />
                          <div className="w-1 h-[90%] bg-white/80" />
                          <div className="w-1 h-[45%] bg-white/80" />
                          <div className="w-1 h-[75%] bg-white/80" />
                          <div className="w-1 h-[50%] bg-white/80" />
                        </div>
                        {/* Text like a song preview */}
                        <div className="mt-auto">
                          <div className="text-[5px] text-white/60 truncate">
                            Now Playing
                          </div>
                          <div className="text-[6px] text-white font-bold truncate">
                            Song Title
                          </div>
                        </div>
                      </div>
                    )}
                    {bookmark.title === "Dribbble" && (
                      <div className="flex h-full w-full flex-col bg-white p-1.5 relative overflow-hidden">
                        {/* Design portfolio card style */}
                        <div className="flex-1 bg-gradient-to-br from-[#ea4c89] to-[#f082ac]" />
                        {/* Bottom info bar */}
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-2 h-2 bg-[#ea4c89]" />
                          <div className="flex-1">
                            <div className="h-0.5 w-full bg-muted-foreground/20" />
                            <div className="h-0.5 w-[60%] bg-muted-foreground/20 mt-0.5" />
                          </div>
                        </div>
                      </div>
                    )}
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
