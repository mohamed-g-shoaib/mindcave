"use client";

import { motion } from "framer-motion";
import { QuickAddDemo } from "./demos/quick-add-demo";
import { CategoryDemo } from "./demos/category-demo";
import { SearchDemo } from "./demos/search-demo";
import { SmartMetadataDemo } from "./demos/smart-metadata-demo";
import { ViewModesDemo } from "./demos/view-modes-demo";

export function FeaturesSection() {
  return (
    <section id="features" className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-450 px-8">
        <motion.div
          initial={{ opacity: 0, transform: "translateY(20px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            Powerful Features
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
            Everything you need to organize your digital life, built with care
          </p>
        </motion.div>

        {/* Bento Grid - 4 columns */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Quick Add - 2 col span */}
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true }}
            className="flex flex-col border border-border bg-card p-8 lg:col-span-2"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Quick Add
              </h3>
              <p className="mt-2 text-muted-foreground">
                Add bookmarks instantly from anywhere with browser extension
              </p>
            </div>
            <div className="flex-1">
              <QuickAddDemo />
            </div>
          </motion.div>

          {/* Custom Categories */}
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col border border-border bg-card p-8"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Custom Categories
              </h3>
              <p className="mt-2 text-muted-foreground">
                Customize icons and colors
              </p>
            </div>
            <div className="flex-1">
              <CategoryDemo />
            </div>
          </motion.div>

          {/* Instant Search */}
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col border border-border bg-card p-8"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Instant Search
              </h3>
              <p className="mt-2 text-muted-foreground">
                Find anything with ⌘K/CtrlK
              </p>
            </div>
            <div className="flex-1">
              <SearchDemo />
            </div>
          </motion.div>

          {/* Auto Metadata - 2 col span */}
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col border border-border bg-card p-8 lg:col-span-2"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Auto Metadata
              </h3>
              <p className="mt-2 text-muted-foreground">
                Automatically fetch titles, descriptions, and images
              </p>
            </div>
            <div className="flex-1">
              <SmartMetadataDemo />
            </div>
          </motion.div>

          {/* Flexible Views - 2 col span */}
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col border border-border bg-card p-8 lg:col-span-2"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Flexible Views
              </h3>
              <p className="mt-2 text-muted-foreground">
                Switch between card and list layouts
              </p>
            </div>
            <div className="flex-1">
              <ViewModesDemo />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
