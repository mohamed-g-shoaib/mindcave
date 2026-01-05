"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Tick02Icon,
  Quran01Icon,
  Copy01Icon,
} from "@hugeicons/core-free-icons";

// Step 4: One click open with browser window animation
export function HowItWorksAccessDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [phase, setPhase] = useState<"idle" | "opening" | "opened" | "copied">(
    "idle"
  );

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  useEffect(() => {
    if (!isInView) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      clearAllTimeouts();
      return;
    }

    setPhase("idle");

    const cycle = () => {
      clearAllTimeouts();
      setPhase("idle");
      timeoutsRef.current.push(setTimeout(() => setPhase("opening"), 1000));
      timeoutsRef.current.push(setTimeout(() => setPhase("opened"), 1300));
      timeoutsRef.current.push(setTimeout(() => setPhase("copied"), 2800));
    };

    cycle();
    intervalRef.current = setInterval(cycle, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      clearAllTimeouts();
    };
  }, [isInView]);

  const isOpened = phase === "opened" || phase === "copied";

  return (
    <div
      ref={containerRef}
      className="relative h-32 overflow-hidden bg-secondary/30 p-3"
    >
      {/* Buttons row */}
      <div className="flex gap-2">
        {/* Open Link Button */}
        <motion.div
          animate={{
            scale: phase === "opening" ? [1, 0.95, 1] : 1,
          }}
          transition={{ duration: 0.2 }}
          style={{ willChange: "transform" }}
          className={`flex items-center gap-1.5 border px-2.5 py-1 transition-colors ${
            isOpened
              ? "border-green-500/50 bg-green-500/10"
              : "border-border bg-secondary"
          }`}
        >
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            className={`h-3 w-3 ${
              isOpened ? "text-green-400" : "text-primary"
            }`}
          />
          <span className="text-xs text-foreground">
            {isOpened ? "Opened" : "Open"}
          </span>
        </motion.div>

        {/* Copy Link Button */}
        <motion.div
          animate={{
            scale: phase === "copied" ? [1, 0.95, 1] : 1,
          }}
          transition={{ duration: 0.2 }}
          style={{ willChange: "transform" }}
          className={`flex items-center gap-1.5 border px-2.5 py-1 transition-colors ${
            phase === "copied"
              ? "border-green-500/50 bg-green-500/10"
              : "border-border bg-secondary"
          }`}
        >
          <HugeiconsIcon
            icon={phase === "copied" ? Tick02Icon : Copy01Icon}
            className={`h-3 w-3 ${
              phase === "copied" ? "text-green-400" : "text-muted-foreground"
            }`}
          />
          <span className="text-xs text-foreground">
            {phase === "copied" ? "Copied" : "Copy"}
          </span>
        </motion.div>
      </div>

      {/* Browser window skeleton that slides open */}
      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{
              opacity: 0,
              transform: "scale(0.3) translate(-40px, -20px)",
            }}
            animate={{ opacity: 1, transform: "scale(1) translate(0, 0)" }}
            exit={{ opacity: 0, transform: "scale(0.5) translate(0, -10px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ willChange: "transform, opacity" }}
            className="absolute left-3 right-3 top-12 border border-border bg-secondary shadow-lg"
          >
            {/* Browser title bar */}
            <div className="flex items-center gap-1.5 border-b border-border bg-muted px-2 py-1.5">
              {/* Traffic lights */}
              <div className="flex gap-1">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              {/* Address bar */}
              <div className="ml-2 flex min-w-0 flex-1 items-center gap-1 bg-background px-2 py-0.5">
                <HugeiconsIcon
                  icon={Quran01Icon}
                  className="h-2.5 w-2.5 shrink-0 text-primary"
                />
                <span className="truncate text-[9px] text-muted-foreground">
                  youtu.be/9B87lUEKLIw
                </span>
              </div>
            </div>
            {/* Browser content skeleton */}
            <div className="p-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary/20" />
                <div className="flex-1 space-y-1">
                  <div className="h-2 w-3/4 bg-border" />
                  <div className="h-1.5 w-1/2 bg-border/50" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
