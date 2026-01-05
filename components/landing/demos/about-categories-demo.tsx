"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  AiInnovation01Icon,
  PaintBoardIcon,
  BookOpen01Icon,
} from "@hugeicons/core-free-icons";

// Animated category sidebar demo
export function CategoriesDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const categories = [
    { name: "All", icon: Home01Icon },
    { name: "Tech", icon: AiInnovation01Icon },
    { name: "Design", icon: PaintBoardIcon },
    { name: "Learning", icon: BookOpen01Icon },
  ];

  useEffect(() => {
    if (!isInView) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    setActiveIndex(0);

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 1500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="h-48 w-full overflow-hidden bg-secondary/30 p-3"
    >
      <div className="mb-2 text-xs font-medium text-muted-foreground">
        CATEGORIES
      </div>
      <div className="space-y-0.5">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            className="relative flex items-center gap-2 px-3 py-1.5 text-sm"
          >
            {/* Performant background overlay using opacity instead of paint-heavy backgroundColor animation */}
            <motion.div
              className="absolute inset-0 border border-primary/40 bg-primary/15"
              initial={{ opacity: 0 }}
              animate={{ opacity: i === activeIndex ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ willChange: "opacity" }}
            />
            <HugeiconsIcon
              icon={cat.icon}
              className={`relative z-10 h-4 w-4 ${
                i === activeIndex ? "text-primary" : "text-muted-foreground/50"
              }`}
            />
            <span
              className={`relative z-10 ${
                i === activeIndex
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {cat.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
