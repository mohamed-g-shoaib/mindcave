"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  WhatsappIcon,
  MessengerIcon,
} from "@hugeicons/core-free-icons";

export function SearchDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [phase, setPhase] = useState<"hint" | "opening" | "typing" | "results">(
    "hint"
  );
  const [query, setQuery] = useState("");

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

    setPhase("hint");
    setQuery("");

    const cycle = () => {
      clearAllTimeouts();
      setPhase("hint");
      setQuery("");

      const text = "socials";
      let delay = 1200;

      // Open command box
      timeoutsRef.current.push(setTimeout(() => setPhase("opening"), delay));
      delay += 400;

      // Type characters
      timeoutsRef.current.push(setTimeout(() => setPhase("typing"), delay));
      for (let i = 0; i <= text.length; i++) {
        timeoutsRef.current.push(
          setTimeout(() => setQuery(text.slice(0, i)), delay + i * 80)
        );
      }
      delay += text.length * 80 + 300;

      // Show results
      timeoutsRef.current.push(setTimeout(() => setPhase("results"), delay));
    };

    cycle();
    intervalRef.current = setInterval(cycle, 6000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      clearAllTimeouts();
    };
  }, [isInView]);

  const isOpen = phase !== "hint";

  return (
    <div
      ref={containerRef}
      className="relative flex h-full min-h-56 items-center justify-center overflow-hidden border border-border bg-card p-5"
    >
      {/* Keyboard shortcut hint (centered initially) */}
      <AnimatePresence>
        {phase === "hint" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transform: "scale(0.8)" }}
            transition={{ duration: 0.2 }}
            style={{ willChange: "transform, opacity" }}
            className="flex items-center gap-1"
          >
            <kbd className="flex h-6 items-center bg-input px-2 text-xs font-medium text-muted-foreground">
              ⌘
            </kbd>
            <kbd className="flex h-6 items-center bg-input px-2 text-xs font-medium text-muted-foreground">
              K
            </kbd>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, transform: "scale(0.9) translateY(10px)" }}
            animate={{ opacity: 1, transform: "scale(1) translateY(0)" }}
            exit={{ opacity: 0, transform: "scale(0.9)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ willChange: "transform, opacity" }}
            className="absolute inset-4 flex flex-col border border-border bg-card shadow-lg"
          >
            {/* Search input */}
            <div className="flex items-center border-b border-border px-4 py-3">
              <HugeiconsIcon
                icon={Search01Icon}
                className="mr-3 h-5 w-5 text-muted-foreground lg:hidden xl:block"
              />
              <div className="flex h-5 flex-1 items-center gap-px lg:justify-center xl:justify-start">
                <span className="text-base text-foreground">{query}</span>
                {(phase === "typing" || phase === "opening") && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="h-5 w-0.5 bg-primary"
                  />
                )}
              </div>
              <kbd className="flex h-5 items-center bg-input px-1.5 text-[10px] font-medium text-muted-foreground lg:hidden xl:flex">
                ESC
              </kbd>
            </div>

            {/* Results area */}
            <div className="flex-1 overflow-hidden p-2">
              <AnimatePresence>
                {phase === "results" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ willChange: "opacity" }}
                    className="space-y-1"
                  >
                    <div className="px-2 py-1 text-xs text-muted-foreground">
                      Results
                    </div>
                    <motion.div
                      initial={{ opacity: 0, transform: "translateX(-10px)" }}
                      animate={{ opacity: 1, transform: "translateX(0)" }}
                      transition={{ delay: 0.1 }}
                      style={{ willChange: "transform, opacity" }}
                      className="flex items-center gap-2 bg-primary/10 p-2"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-green-500/20 lg:h-8 lg:w-8">
                        <HugeiconsIcon
                          icon={WhatsappIcon}
                          className="h-3.5 w-3.5 text-green-500 lg:h-4 lg:w-4"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-foreground">
                          WhatsApp
                        </div>
                        <div className="truncate text-xs text-muted-foreground">
                          whatsapp.com
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, transform: "translateX(-10px)" }}
                      animate={{ opacity: 1, transform: "translateX(0)" }}
                      transition={{ delay: 0.2 }}
                      style={{ willChange: "transform, opacity" }}
                      className="flex items-center gap-2 p-2"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-blue-500/20 lg:h-8 lg:w-8">
                        <HugeiconsIcon
                          icon={MessengerIcon}
                          className="h-3.5 w-3.5 text-blue-500 lg:h-4 lg:w-4"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm text-muted-foreground">
                          Messenger
                        </div>
                        <div className="truncate text-xs text-muted-foreground">
                          messenger.com
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
                {(phase === "opening" || phase === "typing") &&
                  query === "" && (
                    <div className="flex h-full items-center justify-center py-8 text-xs text-muted-foreground">
                      Type to search...
                    </div>
                  )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
