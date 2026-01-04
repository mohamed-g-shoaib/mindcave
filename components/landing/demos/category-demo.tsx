"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  BookOpen01Icon,
  Briefcase01Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";

const categories = [
  { name: "All", icon: Home01Icon, count: 24 },
  { name: "Learning", icon: BookOpen01Icon, count: 8 },
  { name: "Jobs", icon: Briefcase01Icon, count: 5 },
];

export function CategoryDemo() {
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % categories.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full min-h-56 overflow-hidden border border-border bg-card p-4">
      <div className="space-y-1">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            animate={{
              backgroundColor:
                activeCategory === i
                  ? "rgb(249 115 22 / 0.15)"
                  : "rgba(0,0,0,0)",
              borderColor:
                activeCategory === i
                  ? "rgb(249 115 22 / 0.4)"
                  : "rgba(0,0,0,0)",
            }}
            className="flex items-center justify-between border border-transparent px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <HugeiconsIcon
                icon={cat.icon}
                className={`h-4 w-4 ${
                  activeCategory === i
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-sm ${
                  activeCategory === i
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {cat.name}
              </span>
            </div>
            <span
              className={`text-xs ${
                activeCategory === i
                  ? "text-primary"
                  : "text-muted-foreground/60"
              }`}
            >
              {cat.count}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 border-t border-border pt-4">
        <button className="group flex w-full items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
          <div className="flex h-6 w-6 items-center justify-center bg-input text-muted-foreground group-hover:bg-secondary group-hover:text-foreground">
            <HugeiconsIcon icon={PlusSignIcon} className="h-3 w-3" />
          </div>
          Create Category
        </button>
      </div>
    </div>
  );
}
