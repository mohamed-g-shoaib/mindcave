"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { PuzzleIcon, Tick02Icon, ShadcnIcon } from "@hugeicons/core-free-icons";
import MindCaveLogo from "@/components/mind-cave-logo";

const mockBookmark = {
  url: "ui.shadcn.com",
  title: "shadcn/ui",
  favicon: ShadcnIcon,
};

export function QuickAddDemo() {
  const [phase, setPhase] = useState<
    "idle" | "click" | "popup" | "saving" | "saved"
  >("idle");

  useEffect(() => {
    const cycle = async () => {
      setPhase("idle");
      await new Promise((r) => setTimeout(r, 1000));
      setPhase("click");
      await new Promise((r) => setTimeout(r, 300));
      setPhase("popup");
      await new Promise((r) => setTimeout(r, 1200));
      setPhase("saving");
      await new Promise((r) => setTimeout(r, 800));
      setPhase("saved");
      await new Promise((r) => setTimeout(r, 2000));
    };
    const interval = setInterval(cycle, 6500);
    cycle();
    return () => clearInterval(interval);
  }, []);

  const showCard = phase === "saved";

  return (
    <div className="relative h-full min-h-56 overflow-hidden border border-border bg-card">
      {/* Browser Title Bar - similar to Access demo */}
      <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-2">
        {/* Traffic lights */}
        <div className="flex gap-1">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        {/* Address bar */}
        <div className="flex flex-1 items-center gap-1.5 bg-background px-2 py-1">
          <HugeiconsIcon
            icon={mockBookmark.favicon}
            className="h-3 w-3 shrink-0 text-muted-foreground"
          />
          <span className="truncate font-mono text-[10px] text-muted-foreground">
            {mockBookmark.url}
          </span>
        </div>
        {/* Extension Icon */}
        <motion.div
          animate={{
            transform: phase === "click" ? "scale(0.8)" : "scale(1)",
          }}
          transition={{ duration: 0.2 }}
          style={{ willChange: "transform" }}
          className={`flex h-7 w-7 shrink-0 items-center justify-center transition-colors ${
            phase !== "idle" ? "bg-primary/20" : "bg-secondary"
          }`}
        >
          <HugeiconsIcon
            icon={PuzzleIcon}
            className={`h-4 w-4 ${
              phase !== "idle" ? "text-primary" : "text-muted-foreground"
            }`}
          />
        </motion.div>
      </div>

      {/* Browser Content Area */}
      <div className="relative p-4">
        {/* Content area - switch between skeleton and card */}
        <AnimatePresence mode="wait">
          {!showCard ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ willChange: "opacity" }}
              className="space-y-3"
            >
              <div className="h-3 w-24 bg-border/50" />
              <div className="border border-border bg-secondary p-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 bg-muted" />
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="h-3.5 w-20 bg-border" />
                    <div className="h-2.5 w-24 bg-border/50" />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ willChange: "opacity" }}
              className="space-y-3"
            >
              <div className="text-xs font-medium text-muted-foreground">
                RECENTLY ADDED
              </div>
              <div className="border border-border bg-secondary p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary/10">
                    <HugeiconsIcon
                      icon={mockBookmark.favicon}
                      className="h-5 w-5 text-primary"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-foreground">
                      {mockBookmark.title}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {mockBookmark.url}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Extension Popup */}
        <AnimatePresence>
          {(phase === "popup" || phase === "saving" || phase === "saved") && (
            <motion.div
              initial={{ opacity: 0, transform: "translateY(-8px)" }}
              animate={{ opacity: 1, transform: "translateY(0)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ willChange: "transform, opacity" }}
              className="absolute right-4 top-0 w-40 border border-border bg-card shadow-lg"
            >
              {/* Popup Header with MindCave logo */}
              <div className="border-b border-border bg-muted px-2 py-1.5">
                <div className="flex items-center gap-1.5">
                  <MindCaveLogo className="h-3 w-3" />
                  <span className="text-[10px] font-medium text-foreground">
                    MindCave
                  </span>
                </div>
              </div>

              {/* Popup Content */}
              <div className="p-2">
                {(phase === "popup" || phase === "saving") && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    {/* URL */}
                    <div className="space-y-0.5">
                      <div className="text-[8px] uppercase text-muted-foreground">
                        URL
                      </div>
                      <div className="flex items-center gap-1.5 bg-input px-1.5 py-1">
                        <HugeiconsIcon
                          icon={mockBookmark.favicon}
                          className="h-2.5 w-2.5 shrink-0 text-muted-foreground"
                        />
                        <span className="truncate font-mono text-[10px] text-foreground">
                          {mockBookmark.url}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-0.5">
                      <div className="text-[8px] uppercase text-muted-foreground">
                        Title
                      </div>
                      <div className="bg-input px-1.5 py-1">
                        <span className="text-[10px] text-foreground">
                          {mockBookmark.title}
                        </span>
                      </div>
                    </div>

                    {/* Save button / Saving state */}
                    {phase === "saving" ? (
                      <div className="flex items-center justify-center gap-1.5 py-0.5">
                        <div className="h-2.5 w-2.5 animate-spin rounded-full border-[1.5px] border-primary border-t-transparent" />
                        <span className="text-[10px] text-muted-foreground">
                          Saving...
                        </span>
                      </div>
                    ) : (
                      <div className="flex h-6 w-full items-center justify-center bg-primary/20">
                        <span className="text-[10px] font-medium text-primary">
                          Save
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}

                {phase === "saved" && (
                  <motion.div
                    initial={{ opacity: 0, transform: "scale(0.95)" }}
                    animate={{ opacity: 1, transform: "scale(1)" }}
                    className="flex items-center justify-center gap-1.5 py-2 text-green-400"
                  >
                    <HugeiconsIcon icon={Tick02Icon} className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-medium">Saved!</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
