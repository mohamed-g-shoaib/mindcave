"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tag01Icon } from "@hugeicons/core-free-icons";

export function SmartTagsDemo() {
  const [tagsVisible, setTagsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTagsVisible((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full min-h-56 flex-col justify-center overflow-hidden border border-border bg-card p-6">
      <div className="border border-border bg-input p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="h-4 w-32 bg-muted" />
            <div className="h-3 w-48 bg-muted/50" />
          </div>
          <HugeiconsIcon
            icon={Tag01Icon}
            className={`h-5 w-5 transition-colors duration-500 ${
              tagsVisible ? "text-primary" : "text-muted-foreground/60"
            }`}
          />
        </div>

        <div className="mt-6 flex min-h-7 flex-wrap gap-2">
          <AnimatePresence>
            {tagsVisible && (
              <>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.1 }}
                  className="border border-border bg-input px-2 py-1 text-xs font-medium text-foreground"
                >
                  Design
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.2 }}
                  className="border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                >
                  Inspiration
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.3 }}
                  className="border border-border bg-input px-2 py-1 text-xs font-medium text-foreground"
                >
                  Web
                </motion.span>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
