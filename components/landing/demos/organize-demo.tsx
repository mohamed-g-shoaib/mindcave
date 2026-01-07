"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

// Step 2: Assign to category
export function OrganizeDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [selected, setSelected] = useState<number | null>(null);
  const categories = ["Quran", "Learning", "Projects"];

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

    setSelected(null);

    const cycle = () => {
      clearAllTimeouts();
      setSelected(null);
      timeoutsRef.current.push(setTimeout(() => setSelected(0), 1000));
    };

    cycle();
    intervalRef.current = setInterval(cycle, 4000);

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
      className="relative h-32 overflow-hidden bg-secondary/30 p-4"
    >
      <div className="mb-2 text-xs text-muted-foreground">SELECT CATEGORY</div>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat, i) => (
          <div key={cat} className="relative">
            {/* Performant opacity overlay */}
            <motion.div
              className="absolute inset-0 border border-primary/50 bg-primary/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: selected === i ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ willChange: "opacity" }}
            />
            <button className="relative z-10 border border-border px-3 py-1.5 text-xs text-foreground">
              {cat}
            </button>
          </div>
        ))}
      </div>
      {/* Fixed position for confirmation - bottom right */}
      <div className="absolute bottom-3 right-3">
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ willChange: "opacity, transform" }}
              className="flex items-center gap-1.5 text-[10px] font-medium text-green-500"
            >
              <HugeiconsIcon icon={Tick02Icon} className="h-3 w-3" />
              <span>Saved</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
