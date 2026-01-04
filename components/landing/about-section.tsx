"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FolderLibraryIcon,
  GridViewIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons";

const pillars = [
  {
    icon: FolderLibraryIcon,
    title: "Centralized",
    description:
      "All your important links in one secure place. No more scattered bookmarks across browsers and devices.",
  },
  {
    icon: GridViewIcon,
    title: "Organized",
    description:
      "Custom categories with icons keep everything sorted. Find what you need instantly with smart search.",
  },
  {
    icon: Search01Icon,
    title: "Accessible",
    description:
      "Access your links from anywhere. Quick add, instant search, and one-click opens to your content.",
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
            Mind Cave is more than bookmarks. It&apos;s a comprehensive system
            to capture, organize, and access everything important on the web.
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
              className="group border border-stone-800 bg-stone-900/50 p-8 transition-colors hover:border-orange-500/30"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center border border-stone-700 bg-stone-800 transition-colors group-hover:border-orange-500/50 group-hover:bg-orange-500/10">
                <HugeiconsIcon
                  icon={pillar.icon}
                  className="h-7 w-7 text-stone-400 transition-colors group-hover:text-orange-400"
                />
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-stone-100">
                {pillar.title}
              </h3>
              <p className="text-stone-400 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
