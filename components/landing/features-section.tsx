"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignIcon,
  Search01Icon,
  Tick02Icon,
  Home01Icon,
  BookOpen01Icon,
  Briefcase01Icon,
  GlobalIcon,
  Tag01Icon,
  ZapIcon,
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
    <div className="relative h-full min-h-56 overflow-hidden border border-stone-700 bg-stone-900 shadow-sm">
      <AnimatePresence>
        {!isAdding ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full items-center justify-center bg-[url('/grid-pattern.svg')] bg-repeat opacity-50"
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
                  className="flex items-center justify-center gap-2 bg-green-500/10 p-2 text-green-400 border border-green-500/20"
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
                    ? "text-stone-100 font-medium"
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

// Search Demo
function SearchDemo() {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const chars = "docs";
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i <= chars.length) {
        setQuery(chars.slice(0, i));
        if (i >= 1) setShowResults(true);
        i++;
      } else {
        setTimeout(() => {
          setQuery("");
          setShowResults(false);
          i = 0;
        }, 2000);
      }
    }, 200);

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <div className="h-full min-h-56 overflow-hidden border border-stone-700 bg-stone-900 p-5">
      <div className="relative flex items-center gap-2 border-b border-stone-700 pb-4">
        <HugeiconsIcon icon={Search01Icon} className="h-5 w-5 text-stone-500" />
        <span className="text-lg text-stone-200">{query}</span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="h-6 w-0.5 bg-orange-500"
        />
        <div className="ml-auto flex items-center gap-1">
          <kbd className="hidden h-5 items-center bg-stone-800 px-1.5 text-[10px] font-medium text-stone-500 sm:inline-flex">
            CTRL
          </kbd>
          <kbd className="hidden h-5 items-center bg-stone-800 px-1.5 text-[10px] font-medium text-stone-500 sm:inline-flex">
            K
          </kbd>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <AnimatePresence>
          {showResults ? (
            <>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 bg-stone-800/50 p-2"
              >
                <div className="flex h-8 w-8 items-center justify-center bg-stone-700">
                  <HugeiconsIcon
                    icon={BookOpen01Icon}
                    className="h-4 w-4 text-stone-400"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-stone-200">
                    Documentation
                  </div>
                  <div className="text-xs text-stone-500">Category</div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 p-2"
              >
                <div className="flex h-8 w-8 items-center justify-center bg-stone-800">
                  <HugeiconsIcon
                    icon={GlobalIcon}
                    className="h-4 w-4 text-stone-400"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-stone-400">
                    Next.js Docs
                  </div>
                  <div className="text-xs text-stone-600">nextjs.org</div>
                </div>
              </motion.div>
            </>
          ) : (
            <div className="py-8 text-center text-xs text-stone-600">
              Type to search...
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Smart Metadata Demo
function SmartMetadataDemo() {
  const [state, setState] = useState<"typing" | "loading" | "card">("typing");
  const [text, setText] = useState("");

  useEffect(() => {
    const loop = async () => {
      // Reset
      setState("typing");
      setText("");

      // Type URL
      const url = "github.com";
      for (let i = 0; i <= url.length; i++) {
        setText(url.slice(0, i));
        await new Promise((r) => setTimeout(r, 100));
      }

      await new Promise((r) => setTimeout(r, 400));
      setState("loading");
      await new Promise((r) => setTimeout(r, 800));
      setState("card");
      await new Promise((r) => setTimeout(r, 3000));

      // Loop
      loop();
    };
    loop();
  }, []);

  return (
    <div className="h-full min-h-56 overflow-hidden border border-stone-700 bg-stone-900 p-6 flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {state === "card" ? (
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-hidden border border-stone-700 bg-stone-800"
          >
            <div className="h-24 bg-stone-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-stone-600/20 animate-pulse" />
              <HugeiconsIcon
                icon={GlobalIcon}
                className="absolute bottom-2 left-2 h-8 w-8 text-stone-400"
              />
            </div>
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 bg-stone-600" />
              <div className="h-3 w-1/2 bg-stone-700" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <div className="flex items-center gap-3 border-b-2 border-stone-700 py-2">
              <HugeiconsIcon
                icon={PlusSignIcon}
                className="h-5 w-5 text-stone-500"
              />
              <span className="text-lg text-stone-300 font-mono">{text}</span>
              {state === "typing" && (
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="h-5 w-2 bg-orange-500"
                />
              )}
            </div>
            {state === "loading" && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 flex items-center gap-2 text-xs text-orange-400"
              >
                <HugeiconsIcon
                  icon={ZapIcon}
                  className="h-3 w-3 animate-pulse"
                />
                Fetching metadata...
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Smart Tags Demo
function SmartTagsDemo() {
  const [tagsVisible, setTagsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTagsVisible((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full min-h-56 overflow-hidden border border-stone-700 bg-stone-900 p-6 flex flex-col justify-center">
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

        <div className="mt-6 flex gap-2 flex-wrap min-h-[28px]">
          <AnimatePresence>
            {tagsVisible && (
              <>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.1 }}
                  className="px-2 py-1 bg-stone-700 text-stone-300 text-xs font-medium border border-stone-600"
                >
                  Design
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.2 }}
                  className="px-2 py-1 bg-orange-500/10 text-orange-400 text-xs font-medium border border-orange-500/20"
                >
                  Inspiration
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.3 }}
                  className="px-2 py-1 bg-stone-700 text-stone-300 text-xs font-medium border border-stone-600"
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
                Smart Categories
              </h3>
              <p className="mt-2 text-stone-400">
                Organize with custom icons and counters
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

          {/* Smart Metadata - 2 col span */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col border border-stone-800 bg-stone-900/50 p-8 lg:col-span-2"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-stone-100">
                Smart Metadata
              </h3>
              <p className="mt-2 text-stone-400">
                We automatically fetch titles, descriptions, and images for your
                links
              </p>
            </div>
            <div className="flex-1">
              <SmartMetadataDemo />
            </div>
          </motion.div>

          {/* Smart Tags - 2 col span */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col border border-stone-800 bg-stone-900/50 p-8 lg:col-span-2"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-stone-100">
                Smart Tagging
              </h3>
              <p className="mt-2 text-stone-400">
                Organize your links with powerful tagging system
              </p>
            </div>
            <div className="flex-1">
              <SmartTagsDemo />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
