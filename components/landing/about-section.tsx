"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Link01Icon,
  FolderLibraryIcon,
  Search01Icon,
  GlobalIcon,
  Home01Icon,
  AiInnovation01Icon,
  PaintBoardIcon,
  BookOpen01Icon,
  JavaScriptIcon,
  PythonIcon,
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
    { x: 25, y: 12, rotate: -12 },
    { x: 60, y: 8, rotate: 8 },
    { x: 45, y: 42, rotate: -5 },
    { x: 70, y: 48, rotate: 15 },
    { x: 25, y: 65, rotate: -8 },
    { x: 55, y: 72, rotate: 10 },
  ];

  const organizedPositions = [
    { x: 20, y: 15, rotate: 0 },
    { x: 50, y: 15, rotate: 0 },
    { x: 80, y: 15, rotate: 0 },
    { x: 20, y: 55, rotate: 0 },
    { x: 50, y: 55, rotate: 0 },
    { x: 80, y: 55, rotate: 0 },
  ];

  return (
    <div className="relative h-48 w-full overflow-hidden border border-border bg-card">
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
          style={{ willChange: "left, top, transform" }}
          className="absolute h-16 w-14 -translate-x-1/2 border border-border bg-secondary p-2"
        >
          <div className="h-2 w-8 bg-border" />
          <div className="mt-1 h-1.5 w-6 bg-border/50" />
          <HugeiconsIcon
            icon={GlobalIcon}
            className="mt-2 h-4 w-4 text-muted-foreground"
          />
        </motion.div>
      ))}
    </div>
  );
}

// Animated category sidebar demo
function CategoriesDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = [
    { name: "All", icon: Home01Icon },
    { name: "Tech", icon: AiInnovation01Icon },
    { name: "Design", icon: PaintBoardIcon },
    { name: "Learning", icon: BookOpen01Icon },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-48 w-full overflow-hidden border border-border bg-card p-3">
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

// Animated search demo
function AccessDemo() {
  const [isSearching, setIsSearching] = useState(false);
  const [typing, setTyping] = useState("");

  const searchResults = [
    {
      icon: JavaScriptIcon,
      title: "JavaScript Documentation",
      url: "developer.mozilla.org",
    },
    { icon: PythonIcon, title: "Python Documentation", url: "docs.python.org" },
  ];

  useEffect(() => {
    const cycle = async () => {
      setIsSearching(true);
      setTyping("");
      const text = "Documentation";
      for (let i = 0; i <= text.length; i++) {
        setTyping(text.slice(0, i));
        await new Promise((r) => setTimeout(r, 80));
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
    <div className="relative h-48 w-full overflow-hidden border border-border bg-card p-4">
      <div className="flex items-center border-b border-border pb-3">
        <HugeiconsIcon
          icon={Search01Icon}
          className="mr-2 h-4 w-4 text-muted-foreground"
        />
        <div className="flex items-center gap-[1px]">
          <span className="text-sm text-foreground">{typing}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="h-4 w-0.5 bg-primary"
          />
        </div>
        <kbd className="ml-auto bg-input px-1.5 py-0.5 text-[10px] text-muted-foreground">
          ⌘K
        </kbd>
      </div>
      <AnimatePresence>
        {isSearching && typing.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ willChange: "opacity" }}
            className="absolute left-4 right-4 top-16 space-y-1"
          >
            {searchResults.map((result, i) => (
              <motion.div
                key={result.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                style={{ willChange: "transform, opacity" }}
                className="flex items-center gap-2 bg-secondary p-2"
              >
                <HugeiconsIcon
                  icon={result.icon}
                  className="h-5 w-5 shrink-0 text-primary"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-medium text-foreground">
                    {result.title}
                  </div>
                  <div className="truncate text-[10px] text-muted-foreground">
                    {result.url}
                  </div>
                </div>
              </motion.div>
            ))}
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
    <section className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-450 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            Your Digital Vault
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-muted-foreground">
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
              className="border border-border bg-card"
            >
              <pillar.Demo />
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
