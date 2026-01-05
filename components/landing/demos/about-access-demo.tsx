"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  JavaScriptIcon,
  PythonIcon,
} from "@hugeicons/core-free-icons";

// Animated search demo for About section
export function AboutAccessDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isSearching, setIsSearching] = useState(false);
  const [typing, setTyping] = useState("");

  const searchResults = [
    {
      icon: JavaScriptIcon,
      title: "JavaScript Documentation",
      url: "developer.mozilla.org",
    },
    { icon: PythonIcon, title: "Python Documentation", url: "docs.python.org" },
  ];

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

    setIsSearching(false);
    setTyping("");

    const cycle = () => {
      clearAllTimeouts();
      setIsSearching(true);
      setTyping("");

      const text = "Documentation";
      let delay = 0;

      for (let i = 0; i <= text.length; i++) {
        timeoutsRef.current.push(
          setTimeout(() => setTyping(text.slice(0, i)), delay + i * 80)
        );
      }
      delay += text.length * 80 + 1500;
      timeoutsRef.current.push(
        setTimeout(() => {
          setIsSearching(false);
          setTyping("");
        }, delay)
      );
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
    <div
      ref={containerRef}
      className="relative h-48 w-full overflow-hidden bg-secondary/30"
    >
      {/* Browser Title Bar */}
      <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-2">
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        {/* Address bar */}
        <div className="flex flex-1 items-center gap-1.5 bg-background px-2 py-1">
          <HugeiconsIcon
            icon={Search01Icon}
            className="h-3 w-3 shrink-0 text-muted-foreground"
          />
          <div className="flex items-center gap-[1px]">
            <span className="text-[10px] text-foreground">{typing}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="h-3 w-0.5 bg-primary"
            />
          </div>
          <kbd className="ml-auto bg-input px-1.5 py-0.5 text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>
      <AnimatePresence>
        {isSearching && typing.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ willChange: "opacity" }}
            className="absolute left-4 right-4 top-16 space-y-1"
          >
            {searchResults.map((result, i) => (
              <motion.div
                key={result.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                style={{ willChange: "transform, opacity" }}
                className="flex items-center gap-2 bg-secondary p-2"
              >
                <HugeiconsIcon
                  icon={result.icon}
                  className="h-5 w-5 shrink-0 text-primary"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-medium text-foreground">
                    {result.title}
                  </div>
                  <div className="truncate text-[10px] text-muted-foreground">
                    {result.url}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
