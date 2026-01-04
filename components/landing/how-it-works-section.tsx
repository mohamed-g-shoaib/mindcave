"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Link01Icon,
  FolderLibraryIcon,
  Search01Icon,
  ArrowRight01Icon,
  Tick02Icon,
  GlobalIcon,
} from "@hugeicons/core-free-icons";

// Step 1: Paste URL and see metadata appear
function SaveDemo() {
  const [phase, setPhase] = useState<"paste" | "fetch" | "done">("paste");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const cycle = async () => {
      setPhase("paste");
      setUrl("");
      const link = "github.com/react";
      for (let i = 0; i <= link.length; i++) {
        setUrl(link.slice(0, i));
        await new Promise((r) => setTimeout(r, 60));
      }
      await new Promise((r) => setTimeout(r, 400));
      setPhase("fetch");
      await new Promise((r) => setTimeout(r, 800));
      setPhase("done");
      await new Promise((r) => setTimeout(r, 2000));
    };
    const interval = setInterval(cycle, 5000);
    cycle();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-32 border border-stone-700 bg-stone-900 p-4">
      <div className="flex items-center gap-2 border-b border-stone-700 pb-2">
        <HugeiconsIcon icon={Link01Icon} className="h-4 w-4 text-stone-500" />
        <span className="text-sm text-stone-300 font-mono">{url}</span>
        {phase === "paste" && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="h-4 w-0.5 bg-orange-500"
          />
        )}
      </div>
      <AnimatePresence mode="wait">
        {phase === "fetch" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-orange-400"
          >
            Fetching metadata...
          </motion.div>
        )}
        {phase === "done" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-center gap-2"
          >
            <div className="h-6 w-6 bg-stone-700" />
            <div className="text-xs text-stone-300">React · GitHub</div>
            <HugeiconsIcon
              icon={Tick02Icon}
              className="ml-auto h-3 w-3 text-green-400"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Step 2: Assign to category
function OrganizeDemo() {
  const [selected, setSelected] = useState<number | null>(null);
  const categories = ["Tech", "Learning", "Projects"];

  useEffect(() => {
    const cycle = async () => {
      setSelected(null);
      await new Promise((r) => setTimeout(r, 1000));
      setSelected(0);
      await new Promise((r) => setTimeout(r, 2500));
    };
    const interval = setInterval(cycle, 4000);
    cycle();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-32 border border-stone-700 bg-stone-900 p-4">
      <div className="mb-2 text-xs text-stone-500">SELECT CATEGORY</div>
      <div className="flex gap-2">
        {categories.map((cat, i) => (
          <motion.button
            key={cat}
            animate={{
              backgroundColor:
                selected === i
                  ? "rgb(249 115 22 / 0.2)"
                  : "rgb(68 64 60 / 0.5)",
              borderColor:
                selected === i ? "rgb(249 115 22 / 0.5)" : "rgb(87 83 78)",
            }}
            className="border px-3 py-1.5 text-xs text-stone-300"
          >
            {cat}
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center gap-1 text-xs text-green-400"
          >
            <HugeiconsIcon icon={Tick02Icon} className="h-3 w-3" />
            Added to {categories[selected]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Step 3: Search demo
function FindDemo() {
  const [query, setQuery] = useState("");
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const cycle = async () => {
      setQuery("");
      setShowResult(false);
      const text = "git";
      for (let i = 0; i <= text.length; i++) {
        setQuery(text.slice(0, i));
        await new Promise((r) => setTimeout(r, 150));
      }
      setShowResult(true);
      await new Promise((r) => setTimeout(r, 2500));
    };
    const interval = setInterval(cycle, 4500);
    cycle();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-32 border border-stone-700 bg-stone-900 p-4">
      <div className="flex items-center gap-2 border-b border-stone-700 pb-2">
        <HugeiconsIcon icon={Search01Icon} className="h-4 w-4 text-stone-500" />
        <span className="text-sm text-stone-200">{query}</span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="h-4 w-0.5 bg-orange-500"
        />
      </div>
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-center gap-2 bg-orange-500/10 p-2"
          >
            <HugeiconsIcon
              icon={GlobalIcon}
              className="h-4 w-4 text-orange-400"
            />
            <span className="text-xs text-stone-200">GitHub React</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Step 4: One click open
function AccessDemo() {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const cycle = async () => {
      setClicked(false);
      await new Promise((r) => setTimeout(r, 1500));
      setClicked(true);
      await new Promise((r) => setTimeout(r, 2000));
    };
    const interval = setInterval(cycle, 4000);
    cycle();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-32 items-center justify-center border border-stone-700 bg-stone-900 p-4">
      <motion.div
        animate={{
          scale: clicked ? [1, 0.95, 1] : 1,
          backgroundColor: clicked
            ? "rgb(249 115 22 / 0.2)"
            : "rgb(68 64 60 / 0.5)",
        }}
        className="flex items-center gap-2 border border-stone-600 px-4 py-2"
      >
        <HugeiconsIcon icon={GlobalIcon} className="h-4 w-4 text-stone-400" />
        <span className="text-sm text-stone-200">Open Link</span>
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          className="h-4 w-4 text-orange-400"
        />
      </motion.div>
      <AnimatePresence>
        {clicked && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 20 }}
            exit={{ opacity: 0 }}
            className="text-xs text-green-400"
          >
            ↗ Opened
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const steps = [
  { number: "01", title: "Save", description: "Paste a link", Demo: SaveDemo },
  {
    number: "02",
    title: "Organize",
    description: "Pick a category",
    Demo: OrganizeDemo,
  },
  {
    number: "03",
    title: "Find",
    description: "Search instantly",
    Demo: FindDemo,
  },
  {
    number: "04",
    title: "Access",
    description: "One click open",
    Demo: AccessDemo,
  },
];

export function HowItWorksSection() {
  return (
    <section
      className="py-28 md:py-40"
      style={{ backgroundColor: "oklch(0.200 0.006 56.043)" }}
    >
      <div className="mx-auto max-w-450 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl font-bold text-stone-100 md:text-5xl lg:text-6xl">
            How It Works
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-stone-400">
            Four simple steps to organize your digital life.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-stone-800 bg-stone-900/50"
            >
              <step.Demo />
              <div className="p-4">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xl font-bold text-orange-500">
                    {step.number}
                  </span>
                  <span className="text-lg font-semibold text-stone-100">
                    {step.title}
                  </span>
                </div>
                <p className="text-sm text-stone-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
