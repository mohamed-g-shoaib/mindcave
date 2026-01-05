"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, Quran01Icon } from "@hugeicons/core-free-icons";

const YOUTUBE_LINK = "https://youtu.be/9B87lUEKLIw";

// Step 3: Search demo
export function FindDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [query, setQuery] = useState("");
  const [showResult, setShowResult] = useState(false);

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

    setQuery("");
    setShowResult(false);

    const cycle = () => {
      clearAllTimeouts();
      setQuery("");
      setShowResult(false);

      const text = "Baqarah";
      let delay = 0;

      for (let i = 0; i <= text.length; i++) {
        timeoutsRef.current.push(
          setTimeout(() => setQuery(text.slice(0, i)), delay + i * 80)
        );
      }
      delay += text.length * 80;
      timeoutsRef.current.push(setTimeout(() => setShowResult(true), delay));
    };

    cycle();
    intervalRef.current = setInterval(cycle, 4500);

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
      {/* Input with tight cursor positioning */}
      <div className="flex items-center border-b border-border pb-2">
        <HugeiconsIcon
          icon={Search01Icon}
          className="mr-2 h-4 w-4 shrink-0 text-muted-foreground"
        />
        <div className="flex h-5 items-center gap-px">
          <span className="text-sm text-foreground">{query}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="h-4 w-0.5 bg-primary"
          />
        </div>
      </div>

      {/* Fixed position to prevent layout shift */}
      <div className="absolute left-4 right-4 top-14">
        <AnimatePresence>
          {showResult && (
            <motion.a
              href={YOUTUBE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ willChange: "opacity" }}
              className="flex items-center gap-2 bg-primary/10 p-2 hover:bg-primary/20 transition-colors"
            >
              <HugeiconsIcon
                icon={Quran01Icon}
                className="h-4 w-4 shrink-0 text-primary"
              />
              <span className="truncate text-xs text-foreground">
                Surah Al-Baqarah
              </span>
            </motion.a>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
