"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignIcon,
  FolderIcon,
  Search01Icon,
  Link01Icon,
  Tick02Icon,
  Home01Icon,
  BookOpen01Icon,
  Briefcase01Icon,
  Moon02Icon,
} from "@hugeicons/core-free-icons";

// Quick Add Demo - Shows the add bookmark animation
function QuickAddDemo() {
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
    <div className="relative h-full min-h-56 overflow-hidden border border-stone-700 bg-stone-900">
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
              className="flex items-center gap-2 bg-orange-500 px-5 py-3 text-sm font-medium text-white"
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
            className="p-5"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: formStep >= 1 ? 1 : 0.3, x: 0 }}
                className="space-y-1"
              >
                <div className="text-xs text-stone-500">Title</div>
                <div className="h-9 border border-stone-700 bg-stone-800 px-3 py-2">
                  {formStep >= 1 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-stone-300"
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
                <div className="text-xs text-stone-500">URL</div>
                <div className="h-9 border border-stone-700 bg-stone-800 px-3 py-2">
                  {formStep >= 2 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-stone-400"
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
                  className="flex items-center justify-center gap-2 bg-green-500/20 p-3 text-green-400"
                >
                  <HugeiconsIcon icon={Tick02Icon} className="h-4 w-4" />
                  <span className="text-sm font-medium">Saved!</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Category Organization Demo
function CategoryDemo() {
  const [activeCategory, setActiveCategory] = useState(0);
  const categories = [
    { name: "All", icon: Home01Icon, count: 24 },
    { name: "Learning", icon: BookOpen01Icon, count: 8 },
    { name: "Jobs", icon: Briefcase01Icon, count: 5 },
  ];

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
                activeCategory === i ? "rgb(249 115 22 / 0.2)" : "transparent",
              borderColor:
                activeCategory === i ? "rgb(249 115 22 / 0.5)" : "transparent",
            }}
            className="flex items-center justify-between border border-transparent px-4 py-2.5"
          >
            <div className="flex items-center gap-3">
              <HugeiconsIcon
                icon={cat.icon}
                className="h-4 w-4 text-stone-400"
              />
              <span className="text-sm text-stone-300">{cat.name}</span>
            </div>
            <span className="text-xs text-stone-500">{cat.count}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 border-t border-stone-700 pt-4">
        <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-stone-400 hover:bg-stone-800">
          <HugeiconsIcon icon={PlusSignIcon} className="h-4 w-4" />
          Add Category
        </button>
      </div>
    </div>
  );
}

// Search Demo
function SearchDemo() {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const chars = "next.js";
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i <= chars.length) {
        setQuery(chars.slice(0, i));
        if (i >= 3) setShowResults(true);
        i++;
      } else {
        setTimeout(() => {
          setQuery("");
          setShowResults(false);
          i = 0;
        }, 1500);
      }
    }, 200);

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <div className="h-full min-h-56 overflow-hidden border border-stone-700 bg-stone-900 p-5">
      <div className="flex items-center gap-2 border border-stone-600 bg-stone-800 px-4 py-2.5">
        <HugeiconsIcon icon={Search01Icon} className="h-4 w-4 text-stone-500" />
        <span className="text-sm text-stone-300">{query}</span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="h-5 w-0.5 bg-orange-400"
        />
        <span className="ml-auto text-xs text-stone-500">⌘K</span>
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 space-y-2"
          >
            <div className="bg-stone-800 p-3">
              <div className="text-sm text-stone-300">
                Next.js Documentation
              </div>
              <div className="text-xs text-stone-500">nextjs.org/docs</div>
            </div>
            <div className="bg-stone-800/50 p-3">
              <div className="text-sm text-stone-400">Next.js Tutorial</div>
              <div className="text-xs text-stone-600">vercel.com/learn</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Card Preview Demo - Animated
function CardPreviewDemo() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setHoveredCard((prev) => (prev === null ? 0 : prev === 0 ? 1 : null));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid h-full min-h-56 gap-4 border border-stone-700 bg-stone-900 p-5 sm:grid-cols-2">
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          animate={{
            scale: hoveredCard === i ? 1.02 : 1,
            borderColor:
              hoveredCard === i ? "rgb(249 115 22 / 0.5)" : "rgb(68 64 60)",
          }}
          className="overflow-hidden border border-stone-700"
        >
          <motion.div
            animate={{
              opacity: hoveredCard === i ? 0.9 : 0.7,
            }}
            className="aspect-video bg-gradient-to-br from-stone-700 to-stone-800"
          />
          <div className="space-y-2 p-4">
            <div className="h-3 w-3/4 bg-stone-600" />
            <div className="h-2 w-1/2 bg-stone-700" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Dark Mode Demo
function DarkModeDemo() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsDark((prev) => !prev);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full min-h-56 overflow-hidden border border-stone-700">
      <motion.div
        animate={{
          backgroundColor: isDark ? "rgb(28 25 23)" : "rgb(245 245 244)",
        }}
        className="flex h-full items-center justify-center"
      >
        <motion.div
          animate={{
            rotate: isDark ? 0 : 180,
          }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <HugeiconsIcon
            icon={Moon02Icon}
            className={`h-10 w-10 ${
              isDark ? "text-orange-400" : "text-stone-600"
            }`}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-28 md:py-40"
      style={{ backgroundColor: "oklch(0.216 0.006 56.043)" }}
    >
      <div className="mx-auto max-w-[1800px] px-8">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-bold text-stone-100 md:text-5xl lg:text-6xl">
            Powerful Features
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-stone-400">
            Everything you need to organize your digital life, built with care
          </p>
        </div>

        {/* Bento Grid - 4 columns */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Quick Add - 2 col span */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col border border-stone-800 bg-stone-900/50 p-8 lg:col-span-2"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-stone-100">
                Quick Add
              </h3>
              <p className="mt-2 text-stone-400">
                Add bookmarks instantly with automatic metadata fetching
              </p>
            </div>
            <div className="flex-1">
              <QuickAddDemo />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col border border-stone-800 bg-stone-900/50 p-8"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-stone-100">
                Categories
              </h3>
              <p className="mt-2 text-stone-400">Organize with custom icons</p>
            </div>
            <div className="flex-1">
              <CategoryDemo />
            </div>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col border border-stone-800 bg-stone-900/50 p-8"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-stone-100">
                Instant Search
              </h3>
              <p className="mt-2 text-stone-400">Find anything with ⌘K</p>
            </div>
            <div className="flex-1">
              <SearchDemo />
            </div>
          </motion.div>

          {/* Card Previews - 2 col span */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col border border-stone-800 bg-stone-900/50 p-8 lg:col-span-2"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-stone-100">
                Card Previews
              </h3>
              <p className="mt-2 text-stone-400">
                Rich previews with OpenGraph images
              </p>
            </div>
            <div className="flex-1">
              <CardPreviewDemo />
            </div>
          </motion.div>

          {/* Dark Mode - 2 col span */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col border border-stone-800 bg-stone-900/50 p-8 lg:col-span-2"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-stone-100">
                Dark Mode First
              </h3>
              <p className="mt-2 text-stone-400">
                Easy on the eyes, beautiful everywhere
              </p>
            </div>
            <div className="flex-1">
              <DarkModeDemo />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
