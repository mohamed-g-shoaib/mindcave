"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Link01Icon,
  FolderLibraryIcon,
  Search01Icon,
  CursorPointer01Icon,
} from "@hugeicons/core-free-icons";

const steps = [
  {
    number: "01",
    icon: Link01Icon,
    title: "Save",
    description:
      "Paste any link and we automatically fetch the title, description, and preview image.",
  },
  {
    number: "02",
    icon: FolderLibraryIcon,
    title: "Organize",
    description:
      "Assign to custom categories with icons. Keep everything sorted your way.",
  },
  {
    number: "03",
    icon: Search01Icon,
    title: "Find",
    description:
      "Instant search with ⌘K. Filter by category or search across all your links.",
  },
  {
    number: "04",
    icon: CursorPointer01Icon,
    title: "Access",
    description:
      "One click to open. Your bookmarks are always just a keystroke away.",
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
            From saving to accessing, everything is designed to be fast and
            intuitive.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="absolute left-0 right-0 top-20 hidden h-px bg-linear-to-r from-transparent via-stone-700 to-transparent lg:block" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                {/* Step number badge */}
                <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-stone-700 bg-stone-900">
                  <span className="text-2xl font-bold text-orange-500">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center">
                  <HugeiconsIcon
                    icon={step.icon}
                    className="h-8 w-8 text-stone-400"
                  />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-semibold text-stone-100">
                  {step.title}
                </h3>
                <p className="text-stone-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
