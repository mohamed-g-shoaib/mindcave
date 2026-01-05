"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Link01Icon,
  Search01Icon,
  ArrowRight01Icon,
  Tick02Icon,
  Quran01Icon,
  Copy01Icon,
} from "@hugeicons/core-free-icons";

const YOUTUBE_LINK = "https://youtu.be/9B87lUEKLIw";
const METADATA_TITLE = "Surah Al-Baqarah by Sheikh Badr Al-Turki";

// Step 1: Paste URL and see metadata appear
function SaveDemo() {
  const [phase, setPhase] = useState<"paste" | "fetch" | "done">("paste");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const cycle = async () => {
      setPhase("paste");
      setUrl("");
      const link = "youtu.be/9B87lUEKLIw";
      for (let i = 0; i <= link.length; i++) {
        setUrl(link.slice(0, i));
        await new Promise((r) => setTimeout(r, 80));
      }
      await new Promise((r) => setTimeout(r, 400));
      setPhase("fetch");
      await new Promise((r) => setTimeout(r, 800));
      setPhase("done");
      await new Promise((r) => setTimeout(r, 2500));
    };
    const interval = setInterval(cycle, 5500);
    cycle();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-32 bg-secondary/30 p-4">
      {/* Input area with tight cursor positioning */}
      <div className="flex items-center border-b border-border pb-2">
        <HugeiconsIcon
          icon={Link01Icon}
          className="mr-2 h-4 w-4 shrink-0 text-muted-foreground"
        />
        <div className="flex h-5 min-w-0 flex-1 items-center gap-px">
          <span className="truncate text-sm font-mono text-foreground">
            {url}
          </span>
          {phase === "paste" && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="h-4 w-0.5 shrink-0 bg-primary"
            />
          )}
        </div>
      </div>

      {/* Fixed position container to prevent layout shift */}
      <div className="absolute left-4 right-4 top-14">
        <AnimatePresence mode="wait">
          {phase === "fetch" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ willChange: "opacity" }}
              className="text-xs text-primary"
            >
              Fetching metadata...
            </motion.div>
          )}
          {phase === "done" && (
            <motion.a
              href={YOUTUBE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ willChange: "opacity" }}
              className="flex items-center gap-2 hover:bg-muted/50 transition-colors p-1 -m-1 rounded"
            >
              <HugeiconsIcon
                icon={Quran01Icon}
                className="h-5 w-5 shrink-0 text-primary"
              />
              <div className="min-w-0 flex-1 truncate text-xs text-foreground">
                {METADATA_TITLE}
              </div>
              <HugeiconsIcon
                icon={Tick02Icon}
                className="h-3 w-3 shrink-0 text-green-400"
              />
            </motion.a>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Step 2: Assign to category
function OrganizeDemo() {
  const [selected, setSelected] = useState<number | null>(null);
  const categories = ["Quran", "Learning", "Projects"];

  useEffect(() => {
    const cycle = async () => {
      setSelected(null);
      await new Promise((r) => setTimeout(r, 1000));
      setSelected(0); // Select "Quran"
      await new Promise((r) => setTimeout(r, 2500));
    };
    const interval = setInterval(cycle, 4000);
    cycle();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-32 overflow-hidden bg-secondary/30 p-4">
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
      {/* Fixed position for confirmation - bottom left, text hidden at lg breakpoint */}
      {/* Fixed position for confirmation - bottom right */}
      <div className="absolute bottom-3 right-3">
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ willChange: "opacity, transform" }}
              className="flex items-center gap-1.5 bg-green-500/10 px-2.5 py-1 text-[10px] font-medium text-green-500 border border-green-500/20 shadow-sm"
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

// Step 3: Search demo
function FindDemo() {
  const [query, setQuery] = useState("");
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const cycle = async () => {
      setQuery("");
      setShowResult(false);
      const text = "Baqarah";
      for (let i = 0; i <= text.length; i++) {
        setQuery(text.slice(0, i));
        await new Promise((r) => setTimeout(r, 80));
      }
      setShowResult(true);
      await new Promise((r) => setTimeout(r, 2500));
    };
    const interval = setInterval(cycle, 4500);
    cycle();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-32 bg-secondary/30 p-4">
      {/* Input with tight cursor positioning */}
      <div className="flex items-center border-b border-border pb-2">
        <HugeiconsIcon
          icon={Search01Icon}
          className="mr-2 h-4 w-4 shrink-0 text-muted-foreground"
        />
        <div className="flex h-5 items-center gap-px">
          <span className="text-sm text-foreground">{query}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="h-4 w-0.5 bg-primary"
          />
        </div>
      </div>

      {/* Fixed position to prevent layout shift */}
      <div className="absolute left-4 right-4 top-14">
        <AnimatePresence>
          {showResult && (
            <motion.a
              href={YOUTUBE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ willChange: "opacity" }}
              className="flex items-center gap-2 bg-primary/10 p-2 hover:bg-primary/20 transition-colors"
            >
              <HugeiconsIcon
                icon={Quran01Icon}
                className="h-4 w-4 shrink-0 text-primary"
              />
              <span className="truncate text-xs text-foreground">
                Surah Al-Baqarah
              </span>
            </motion.a>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Step 4: One click open with browser window animation
function AccessDemo() {
  const [phase, setPhase] = useState<"idle" | "opening" | "opened" | "copied">(
    "idle"
  );

  useEffect(() => {
    const cycle = async () => {
      setPhase("idle");
      await new Promise((r) => setTimeout(r, 1000));
      setPhase("opening");
      await new Promise((r) => setTimeout(r, 300));
      setPhase("opened");
      await new Promise((r) => setTimeout(r, 1500));
      setPhase("copied");
      await new Promise((r) => setTimeout(r, 1500));
    };
    const interval = setInterval(cycle, 5000);
    cycle();
    return () => clearInterval(interval);
  }, []);

  const isOpened = phase === "opened" || phase === "copied";

  return (
    <div className="relative h-32 overflow-hidden bg-secondary/30 p-3">
      {/* Buttons row */}
      <div className="flex gap-2">
        {/* Open Link Button */}
        <motion.div
          animate={{
            scale: phase === "opening" ? [1, 0.95, 1] : 1,
          }}
          transition={{ duration: 0.2 }}
          style={{ willChange: "transform" }}
          className={`flex items-center gap-1.5 border px-2.5 py-1 transition-colors ${
            isOpened
              ? "border-green-500/50 bg-green-500/10"
              : "border-border bg-secondary"
          }`}
        >
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            className={`h-3 w-3 ${
              isOpened ? "text-green-400" : "text-primary"
            }`}
          />
          <span className="text-xs text-foreground">
            {isOpened ? "Opened" : "Open"}
          </span>
        </motion.div>

        {/* Copy Link Button */}
        <motion.div
          animate={{
            scale: phase === "copied" ? [1, 0.95, 1] : 1,
          }}
          transition={{ duration: 0.2 }}
          style={{ willChange: "transform" }}
          className={`flex items-center gap-1.5 border px-2.5 py-1 transition-colors ${
            phase === "copied"
              ? "border-green-500/50 bg-green-500/10"
              : "border-border bg-secondary"
          }`}
        >
          <HugeiconsIcon
            icon={phase === "copied" ? Tick02Icon : Copy01Icon}
            className={`h-3 w-3 ${
              phase === "copied" ? "text-green-400" : "text-muted-foreground"
            }`}
          />
          <span className="text-xs text-foreground">
            {phase === "copied" ? "Copied" : "Copy"}
          </span>
        </motion.div>
      </div>

      {/* Browser window skeleton that slides open */}
      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{
              opacity: 0,
              transform: "scale(0.3) translate(-40px, -20px)",
            }}
            animate={{ opacity: 1, transform: "scale(1) translate(0, 0)" }}
            exit={{ opacity: 0, transform: "scale(0.5) translate(0, -10px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ willChange: "transform, opacity" }}
            className="absolute left-3 right-3 top-12 border border-border bg-secondary shadow-lg"
          >
            {/* Browser title bar */}
            <div className="flex items-center gap-1.5 border-b border-border bg-muted px-2 py-1.5">
              {/* Traffic lights */}
              <div className="flex gap-1">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              {/* Address bar */}
              <div className="ml-2 flex min-w-0 flex-1 items-center gap-1 bg-background px-2 py-0.5">
                <HugeiconsIcon
                  icon={Quran01Icon}
                  className="h-2.5 w-2.5 shrink-0 text-primary"
                />
                <span className="truncate text-[9px] text-muted-foreground">
                  youtu.be/9B87lUEKLIw
                </span>
              </div>
            </div>
            {/* Browser content skeleton */}
            <div className="p-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary/20" />
                <div className="flex-1 space-y-1">
                  <div className="h-2 w-3/4 bg-border" />
                  <div className="h-1.5 w-1/2 bg-border/50" />
                </div>
              </div>
            </div>
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
    <section id="how-it-works" className="bg-muted py-28 md:py-40">
      <div className="mx-auto max-w-350 px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, transform: "translateY(20px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            How It Works
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
            Four simple steps to organize your digital life.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, transform: "translateY(30px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0)" }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-border bg-card"
            >
              <step.Demo />
              <div className="p-3 sm:p-4">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">
                    {step.number}
                  </span>
                  <span className="text-lg font-semibold text-foreground">
                    {step.title}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
