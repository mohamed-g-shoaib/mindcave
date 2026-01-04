"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignIcon,
  FolderIcon,
  Search01Icon,
  Link01Icon,
} from "@hugeicons/core-free-icons";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="border-t border-primary-foreground/10 bg-primary-foreground/5 py-20 md:py-32"
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
            Everything You Need
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/70">
            Powerful features to organize your digital life
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Quick Add */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-lg border border-primary-foreground/20 bg-primary p-6 hover:border-accent/50"
          >
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
              <HugeiconsIcon
                icon={PlusSignIcon}
                className="h-6 w-6 text-accent"
              />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-primary-foreground">
              Quick Add
            </h3>
            <p className="text-sm text-primary-foreground/70">
              Add bookmarks instantly with automatic metadata fetching. Just
              paste the URL and we'll do the rest.
            </p>
            <div className="mt-6 rounded-md border border-primary-foreground/10 bg-primary-foreground/5 p-4">
              <div className="space-y-2">
                <div className="h-2 w-3/4 rounded bg-primary-foreground/20" />
                <div className="h-2 w-1/2 rounded bg-primary-foreground/20" />
              </div>
            </div>
          </motion.div>

          {/* Category Organization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative overflow-hidden rounded-lg border border-primary-foreground/20 bg-primary p-6 hover:border-accent/50"
          >
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
              <HugeiconsIcon
                icon={FolderIcon}
                className="h-6 w-6 text-accent"
              />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-primary-foreground">
              Smart Categories
            </h3>
            <p className="text-sm text-primary-foreground/70">
              Organize bookmarks into custom categories with icons and colors
              for easy navigation.
            </p>
            <div className="mt-6 flex gap-2">
              <div className="flex items-center gap-2 rounded-md border border-primary-foreground/10 bg-primary-foreground/5 px-3 py-2">
                <div className="h-3 w-3 rounded bg-accent/50" />
                <span className="text-xs text-primary-foreground/60">Tech</span>
              </div>
              <div className="flex items-center gap-2 rounded-md border border-primary-foreground/10 bg-primary-foreground/5 px-3 py-2">
                <div className="h-3 w-3 rounded bg-accent/30" />
                <span className="text-xs text-primary-foreground/60">
                  Learning
                </span>
              </div>
            </div>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative overflow-hidden rounded-lg border border-primary-foreground/20 bg-primary p-6 hover:border-accent/50"
          >
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
              <HugeiconsIcon
                icon={Search01Icon}
                className="h-6 w-6 text-accent"
              />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-primary-foreground">
              Instant Search
            </h3>
            <p className="text-sm text-primary-foreground/70">
              Find any bookmark in seconds with powerful search. Press ⌘K to
              open the command palette.
            </p>
            <div className="mt-6 rounded-md border border-primary-foreground/10 bg-primary-foreground/5 p-3">
              <div className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Search01Icon}
                  className="h-4 w-4 text-primary-foreground/40"
                />
                <div className="h-2 w-24 rounded bg-primary-foreground/20" />
              </div>
            </div>
          </motion.div>

          {/* Beautiful UI - Spanning 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group relative overflow-hidden rounded-lg border border-primary-foreground/20 bg-primary p-6 hover:border-accent/50 md:col-span-2"
          >
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
              <HugeiconsIcon
                icon={Link01Icon}
                className="h-6 w-6 text-accent"
              />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-primary-foreground">
              Beautiful Card Previews
            </h3>
            <p className="mb-6 text-sm text-primary-foreground/70">
              Rich preview cards with OpenGraph images, titles, and descriptions
              for every bookmark.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-md border border-primary-foreground/10">
                <div className="aspect-video bg-primary-foreground/10" />
                <div className="space-y-2 bg-primary-foreground/5 p-4">
                  <div className="h-2 w-3/4 rounded bg-primary-foreground/20" />
                  <div className="h-2 w-1/2 rounded bg-primary-foreground/15" />
                </div>
              </div>
              <div className="overflow-hidden rounded-md border border-primary-foreground/10">
                <div className="aspect-video bg-primary-foreground/10" />
                <div className="space-y-2 bg-primary-foreground/5 p-4">
                  <div className="h-2 w-3/4 rounded bg-primary-foreground/20" />
                  <div className="h-2 w-1/2 rounded bg-primary-foreground/15" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dark Mode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="group relative overflow-hidden rounded-lg border border-primary-foreground/20 bg-primary p-6 hover:border-accent/50"
          >
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
              <span className="text-2xl">🌙</span>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-primary-foreground">
              Dark Mode First
            </h3>
            <p className="text-sm text-primary-foreground/70">
              Designed with dark mode in mind. Easy on the eyes, beautiful
              everywhere.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
