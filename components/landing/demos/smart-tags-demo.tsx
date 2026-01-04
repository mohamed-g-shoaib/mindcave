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
    <div className="flex h-full min-h-56 flex-col justify-center overflow-hidden border border-stone-700 bg-stone-900 p-6">
      <div className="border border-stone-700 bg-stone-800 p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="h-4 w-32 bg-stone-600" />
            <div className="h-3 w-48 bg-stone-700" />
          </div>
          <HugeiconsIcon
            icon={Tag01Icon}
            className={`h-5 w-5 transition-colors duration-500 ${
              tagsVisible ? "text-orange-500" : "text-stone-600"
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
                  className="border border-stone-600 bg-stone-700 px-2 py-1 text-xs font-medium text-stone-300"
                >
                  Design
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.2 }}
                  className="border border-orange-500/20 bg-orange-500/10 px-2 py-1 text-xs font-medium text-orange-400"
                >
                  Inspiration
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.3 }}
                  className="border border-stone-600 bg-stone-700 px-2 py-1 text-xs font-medium text-stone-300"
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
