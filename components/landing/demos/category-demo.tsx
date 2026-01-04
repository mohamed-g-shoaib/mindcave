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
    <div className="h-full min-h-56 overflow-hidden border border-stone-700 bg-stone-900 p-4">
      <div className="space-y-1">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            animate={{
              backgroundColor:
                activeCategory === i ? "rgb(249 115 22 / 0.15)" : "transparent",
              borderColor:
                activeCategory === i ? "rgb(249 115 22 / 0.4)" : "transparent",
            }}
            className="flex items-center justify-between border border-transparent px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <HugeiconsIcon
                icon={cat.icon}
                className={`h-4 w-4 ${
                  activeCategory === i ? "text-orange-400" : "text-stone-400"
                }`}
              />
              <span
                className={`text-sm ${
                  activeCategory === i
                    ? "font-medium text-stone-100"
                    : "text-stone-400"
                }`}
              >
                {cat.name}
              </span>
            </div>
            <span
              className={`text-xs ${
                activeCategory === i ? "text-orange-400" : "text-stone-600"
              }`}
            >
              {cat.count}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 border-t border-stone-800 pt-4">
        <button className="group flex w-full items-center gap-2 px-4 py-2 text-sm text-stone-400 hover:text-stone-200">
          <div className="flex h-6 w-6 items-center justify-center bg-stone-800 text-stone-500 group-hover:bg-stone-700 group-hover:text-stone-300">
            <HugeiconsIcon icon={PlusSignIcon} className="h-3 w-3" />
          </div>
          Create Category
        </button>
      </div>
    </div>
  );
}
