"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  BookOpen01Icon,
  GlobalIcon,
} from "@hugeicons/core-free-icons";

export function SearchDemo() {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const chars = "docs";
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i <= chars.length) {
        setQuery(chars.slice(0, i));
        if (i >= 1) setShowResults(true);
        i++;
      } else {
        setTimeout(() => {
          setQuery("");
          setShowResults(false);
          i = 0;
        }, 2000);
      }
    }, 200);

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <div className="h-full min-h-56 overflow-hidden border border-border bg-card p-5">
      <div className="relative flex items-center gap-2 border-b border-border pb-4">
        <HugeiconsIcon
          icon={Search01Icon}
          className="h-5 w-5 text-muted-foreground"
        />
        <span className="text-lg text-foreground">{query}</span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="h-6 w-0.5 bg-primary"
        />
        <div className="ml-auto flex items-center gap-1">
          <kbd className="hidden h-5 items-center bg-input px-1.5 text-[10px] font-medium text-muted-foreground sm:inline-flex">
            CTRL
          </kbd>
          <kbd className="hidden h-5 items-center bg-input px-1.5 text-[10px] font-medium text-muted-foreground sm:inline-flex">
            K
          </kbd>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <AnimatePresence>
          {showResults ? (
            <>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 bg-secondary p-2"
              >
                <div className="flex h-8 w-8 items-center justify-center bg-input">
                  <HugeiconsIcon
                    icon={BookOpen01Icon}
                    className="h-4 w-4 text-muted-foreground"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    Documentation
                  </div>
                  <div className="text-xs text-muted-foreground">Category</div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 p-2"
              >
                <div className="flex h-8 w-8 items-center justify-center bg-input">
                  <HugeiconsIcon
                    icon={GlobalIcon}
                    className="h-4 w-4 text-muted-foreground"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Next.js Docs
                  </div>
                  <div className="text-xs text-muted-foreground/60">
                    nextjs.org
                  </div>
                </div>
              </motion.div>
            </>
          ) : (
            <div className="py-8 text-center text-xs text-muted-foreground/60">
              Type to search...
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
