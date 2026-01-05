"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Link01Icon,
  Tick02Icon,
  Quran01Icon,
} from "@hugeicons/core-free-icons";

const YOUTUBE_LINK = "https://youtu.be/9B87lUEKLIw";
const METADATA_TITLE = "Surah Al-Baqarah by Sheikh Badr Al-Turki";

// Step 1: Paste URL and see metadata appear
export function SaveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [phase, setPhase] = useState<"paste" | "fetch" | "done">("paste");
  const [url, setUrl] = useState("");

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

    setPhase("paste");
    setUrl("");

    const cycle = () => {
      clearAllTimeouts();
      setPhase("paste");
      setUrl("");

      const link = "youtu.be/9B87lUEKLIw";
      let delay = 0;

      for (let i = 0; i <= link.length; i++) {
        timeoutsRef.current.push(
          setTimeout(() => setUrl(link.slice(0, i)), delay + i * 80)
        );
      }
      delay += link.length * 80 + 400;
      timeoutsRef.current.push(setTimeout(() => setPhase("fetch"), delay));
      delay += 800;
      timeoutsRef.current.push(setTimeout(() => setPhase("done"), delay));
    };

    cycle();
    intervalRef.current = setInterval(cycle, 5500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      clearAllTimeouts();
    };
  }, [isInView]);

  return (
    <div ref={containerRef} className="relative h-32 bg-secondary/30 p-4">
      {/* Input area with tight cursor positioning */}
      <div className="flex items-center border-b border-border pb-2">
        <HugeiconsIcon
          icon={Link01Icon}
          className="mr-2 h-4 w-4 shrink-0 text-muted-foreground"
        />
        <div className="flex h-5 min-w-0 flex-1 items-center gap-px">
          <span className="truncate text-sm font-mono text-foreground">
            {url}
          </span>
          {phase === "paste" && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="h-4 w-0.5 shrink-0 bg-primary"
            />
          )}
        </div>
      </div>

      {/* Fixed position container to prevent layout shift */}
      <div className="absolute left-4 right-4 top-14">
        <AnimatePresence mode="wait">
          {phase === "fetch" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ willChange: "opacity" }}
              className="text-xs text-primary"
            >
              Fetching metadata...
            </motion.div>
          )}
          {phase === "done" && (
            <motion.a
              href={YOUTUBE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ willChange: "opacity" }}
              className="flex items-center gap-2 hover:bg-muted/50 transition-colors p-1 -m-1 rounded"
            >
              <HugeiconsIcon
                icon={Quran01Icon}
                className="h-5 w-5 shrink-0 text-primary"
              />
              <div className="min-w-0 flex-1 truncate text-xs text-foreground">
                {METADATA_TITLE}
              </div>
              <HugeiconsIcon
                icon={Tick02Icon}
                className="h-3 w-3 shrink-0 text-green-400"
              />
            </motion.a>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
