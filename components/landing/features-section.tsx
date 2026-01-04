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
    <div className="relative h-full min-h-48 overflow-hidden rounded border border-stone-700 bg-stone-900">
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
              className="flex items-center gap-2 rounded bg-orange-500 px-4 py-2 text-sm font-medium text-white"
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
            className="p-4"
          >
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: formStep >= 1 ? 1 : 0.3, x: 0 }}
                className="space-y-1"
              >
                <div className="text-xs text-stone-500">Title</div>
                <div className="h-8 rounded border border-stone-700 bg-stone-800 px-3 py-1.5">
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
                <div className="h-8 rounded border border-stone-700 bg-stone-800 px-3 py-1.5">
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
                  className="flex items-center justify-center gap-2 rounded bg-green-500/20 p-2 text-green-400"
                >
                  <HugeiconsIcon icon={Tick02Icon} className="h-4 w-4" />
                  <span className="text-sm">Saved!</span>
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
    <div className="h-full min-h-48 overflow-hidden rounded border border-stone-700 bg-stone-900 p-3">
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
            className="flex items-center justify-between rounded border border-transparent px-3 py-2"
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
      <div className="mt-3 border-t border-stone-700 pt-3">
        <button className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-stone-400 hover:bg-stone-800">
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
    <div className="h-full min-h-48 overflow-hidden rounded border border-stone-700 bg-stone-900 p-4">
      <div className="flex items-center gap-2 rounded border border-stone-600 bg-stone-800 px-3 py-2">
        <HugeiconsIcon icon={Search01Icon} className="h-4 w-4 text-stone-500" />
        <span className="text-sm text-stone-300">{query}</span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="h-4 w-0.5 bg-orange-400"
        />
        <span className="ml-auto text-xs text-stone-500">⌘K</span>
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 space-y-2"
          >
            <div className="rounded bg-stone-800 p-2">
              <div className="text-sm text-stone-300">
                Next.js Documentation
              </div>
              <div className="text-xs text-stone-500">nextjs.org/docs</div>
            </div>
            <div className="rounded bg-stone-800/50 p-2">
              <div className="text-sm text-stone-400">Next.js Tutorial</div>
              <div className="text-xs text-stone-600">vercel.com/learn</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Card Preview Demo
function CardPreviewDemo() {
  return (
    <div className="grid h-full min-h-48 gap-3 rounded border border-stone-700 bg-stone-900 p-4 sm:grid-cols-2">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="overflow-hidden rounded border border-stone-700"
      >
        <div className="aspect-video bg-gradient-to-br from-stone-700 to-stone-800" />
        <div className="space-y-1 p-3">
          <div className="text-sm font-medium text-stone-200">React Docs</div>
          <div className="text-xs text-stone-500">react.dev</div>
        </div>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="overflow-hidden rounded border border-stone-700"
      >
        <div className="aspect-video bg-gradient-to-br from-orange-900/30 to-stone-800" />
        <div className="space-y-1 p-3">
          <div className="text-sm font-medium text-stone-200">Supabase</div>
          <div className="text-xs text-stone-500">supabase.com</div>
        </div>
      </motion.div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24 md:py-32"
      style={{ backgroundColor: "oklch(0.216 0.006 56.043)" }}
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-stone-100 md:text-4xl lg:text-5xl">
            Powerful Features
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-400">
            Everything you need to organize your digital life, built with care
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Quick Add - Large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col rounded-lg border border-stone-800 bg-stone-900/50 p-6 lg:col-span-2"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-stone-100">
                Quick Add
              </h3>
              <p className="mt-1 text-sm text-stone-400">
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
            className="flex flex-col rounded-lg border border-stone-800 bg-stone-900/50 p-6"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-stone-100">
                Categories
              </h3>
              <p className="mt-1 text-sm text-stone-400">
                Organize with custom icons
              </p>
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
            className="flex flex-col rounded-lg border border-stone-800 bg-stone-900/50 p-6"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-stone-100">
                Instant Search
              </h3>
              <p className="mt-1 text-sm text-stone-400">
                Find anything with ⌘K
              </p>
            </div>
            <div className="flex-1">
              <SearchDemo />
            </div>
          </motion.div>

          {/* Card Previews - Full width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col rounded-lg border border-stone-800 bg-stone-900/50 p-6 lg:col-span-4"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-stone-100">
                Beautiful Card Previews
              </h3>
              <p className="mt-1 text-sm text-stone-400">
                Rich previews with OpenGraph images for every bookmark
              </p>
            </div>
            <div className="flex-1">
              <CardPreviewDemo />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
