"use client";

import { motion } from "framer-motion";
import { QuickAddDemo } from "./demos/quick-add-demo";
import { CategoryDemo } from "./demos/category-demo";
import { SearchDemo } from "./demos/search-demo";
import { SmartMetadataDemo } from "./demos/smart-metadata-demo";
import { SmartTagsDemo } from "./demos/smart-tags-demo";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-28 md:py-40"
      style={{ backgroundColor: "oklch(0.216 0.006 56.043)" }}
    >
      <div className="mx-auto max-w-450 px-8">
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
