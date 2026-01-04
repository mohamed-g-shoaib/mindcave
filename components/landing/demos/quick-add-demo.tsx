"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon, Tick02Icon } from "@hugeicons/core-free-icons";

export function QuickAddDemo() {
  const [isAdding, setIsAdding] = useState(false);
  const [formStep, setFormStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAdding(true);
      setFormStep(0);

      setTimeout(() => setFormStep(1), 400);
      setTimeout(() => setFormStep(2), 800);
      setTimeout(() => setFormStep(3), 1200);
      setTimeout(() => {
        setIsAdding(false);
        setFormStep(0);
      }, 2500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full min-h-56 overflow-hidden border border-stone-700 bg-stone-900 shadow-sm">
      <AnimatePresence>
        {!isAdding ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-orange-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-orange-500/20"
            >
              <HugeiconsIcon icon={PlusSignIcon} className="h-4 w-4" />
              Add Bookmark
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex h-full flex-col justify-center p-5"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: formStep >= 1 ? 1 : 0.3, x: 0 }}
                className="space-y-1"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Title
                </div>
                <div className="flex h-10 items-center border border-stone-700 bg-stone-800 px-3 text-stone-300 shadow-inner">
                  {formStep >= 1 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm"
                    >
                      Next.js Docs
                    </motion.span>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: formStep >= 2 ? 1 : 0.3, x: 0 }}
                className="space-y-1"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  URL
                </div>
                <div className="flex h-10 items-center border border-stone-700 bg-stone-800 px-3 text-stone-400 shadow-inner">
                  {formStep >= 2 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm"
                    >
                      nextjs.org/docs
                    </motion.span>
                  )}
                </div>
              </motion.div>

              {formStep >= 3 && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center justify-center gap-2 border border-green-500/20 bg-green-500/10 p-2 text-green-400"
                >
                  <HugeiconsIcon icon={Tick02Icon} className="h-4 w-4" />
                  <span className="text-xs font-medium">Saved to Library</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
