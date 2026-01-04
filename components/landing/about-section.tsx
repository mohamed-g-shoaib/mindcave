"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Link01Icon,
  FolderLibraryIcon,
  Search01Icon,
  GlobalIcon,
} from "@hugeicons/core-free-icons";

// Animated demo showing a scattered → organized transition
function VaultDemo() {
  const [isOrganized, setIsOrganized] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOrganized((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scatteredPositions = [
    { x: 10, y: 5, rotate: -12 },
    { x: 60, y: 15, rotate: 8 },
    { x: 25, y: 50, rotate: -5 },
    { x: 70, y: 45, rotate: 15 },
    { x: 40, y: 75, rotate: -8 },
    { x: 5, y: 70, rotate: 10 },
  ];

  const organizedPositions = [
    { x: 8, y: 8, rotate: 0 },
    { x: 54, y: 8, rotate: 0 },
    { x: 8, y: 40, rotate: 0 },
    { x: 54, y: 40, rotate: 0 },
    { x: 8, y: 72, rotate: 0 },
    { x: 54, y: 72, rotate: 0 },
  ];

  return (
    <div className="relative h-48 w-full overflow-hidden border border-stone-700 bg-stone-900">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          animate={{
            left: `${
              isOrganized ? organizedPositions[i].x : scatteredPositions[i].x
            }%`,
            top: `${
              isOrganized ? organizedPositions[i].y : scatteredPositions[i].y
            }%`,
            rotate: isOrganized
              ? organizedPositions[i].rotate
              : scatteredPositions[i].rotate,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="absolute h-16 w-14 border border-stone-600 bg-stone-800 p-2"
        >
          <div className="h-2 w-8 bg-stone-600" />
          <div className="mt-1 h-1.5 w-6 bg-stone-700" />
          <HugeiconsIcon
            icon={GlobalIcon}
            className="mt-2 h-4 w-4 text-stone-500"
          />
        </motion.div>
      ))}
      <motion.div
        animate={{ opacity: isOrganized ? 1 : 0 }}
        className="absolute bottom-2 right-2 text-xs font-medium text-orange-400"
      >
        Organized ✓
      </motion.div>
    </div>
  );
}

// Animated category sidebar demo
function CategoriesDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = ["All", "Tech", "Design", "Learning"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-48 w-full overflow-hidden border border-stone-700 bg-stone-900 p-4">
      <div className="mb-3 text-xs font-medium text-stone-500">CATEGORIES</div>
      <div className="space-y-1">
        {categories.map((cat, i) => (
          <motion.div
            key={cat}
            animate={{
              backgroundColor:
                i === activeIndex ? "rgb(249 115 22 / 0.15)" : "rgba(0,0,0,0)",
              borderColor:
                i === activeIndex ? "rgb(249 115 22 / 0.4)" : "rgba(0,0,0,0)",
            }}
            className="flex items-center gap-2 border border-transparent px-3 py-2 text-sm"
          >
            <div
              className={`h-2 w-2 ${
                i === activeIndex ? "bg-orange-400" : "bg-stone-600"
              }`}
            />
            <span
              className={
                i === activeIndex
                  ? "font-medium text-stone-100"
                  : "text-stone-400"
              }
            >
              {cat}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Animated search demo
function AccessDemo() {
  const [isSearching, setIsSearching] = useState(false);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    const cycle = async () => {
      setIsSearching(true);
      setTyping("");
      const text = "react";
      for (let i = 0; i <= text.length; i++) {
        setTyping(text.slice(0, i));
        await new Promise((r) => setTimeout(r, 100));
      }
      await new Promise((r) => setTimeout(r, 1500));
      setIsSearching(false);
      setTyping("");
      await new Promise((r) => setTimeout(r, 2000));
    };

    const interval = setInterval(cycle, 5500);
    cycle();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-48 w-full overflow-hidden border border-stone-700 bg-stone-900 p-4">
      <div className="flex items-center gap-2 border-b border-stone-700 pb-3">
        <HugeiconsIcon icon={Search01Icon} className="h-4 w-4 text-stone-500" />
        <span className="text-sm text-stone-300">{typing}</span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="h-4 w-0.5 bg-orange-500"
        />
        <kbd className="ml-auto bg-stone-800 px-1.5 py-0.5 text-[10px] text-stone-500">
          ⌘K
        </kbd>
      </div>
      <AnimatePresence>
        {isSearching && typing.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 space-y-2"
          >
            <div className="flex items-center gap-2 bg-stone-800/50 p-2">
              <div className="h-6 w-6 bg-stone-700" />
              <div>
                <div className="text-xs font-medium text-stone-200">
                  React Docs
                </div>
                <div className="text-[10px] text-stone-500">reactjs.org</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const pillars = [
  {
    title: "Centralized",
    description: "All your links in one organized vault",
    Demo: VaultDemo,
  },
  {
    title: "Organized",
    description: "Custom categories to sort everything",
    Demo: CategoriesDemo,
  },
  {
    title: "Accessible",
    description: "Instant search finds anything fast",
    Demo: AccessDemo,
  },
];

export function AboutSection() {
  return (
    <section
      className="py-28 md:py-40"
      style={{ backgroundColor: "oklch(0.216 0.006 56.043)" }}
    >
      <div className="mx-auto max-w-450 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl font-bold text-stone-100 md:text-5xl lg:text-6xl">
            Your Digital Vault
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-stone-400">
            More than bookmarks. A complete system to capture and organize the
            web.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-stone-800 bg-stone-900/50"
            >
              <pillar.Demo />
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-stone-100">
                  {pillar.title}
                </h3>
                <p className="text-stone-400">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
