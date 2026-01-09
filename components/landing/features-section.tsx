"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { LazyRender } from "@/components/ui/lazy-render";

// Animation skeleton placeholder
const AnimationSkeleton = () => (
  <div className="h-full min-h-56 animate-pulse bg-muted/30" />
);

// Dynamic imports for code splitting - only load when rendered
const QuickAddDemo = dynamic(
  () => import("./demos/quick-add-demo").then((m) => m.QuickAddDemo),
  { ssr: false, loading: () => <AnimationSkeleton /> }
);

const CategoryDemo = dynamic(
  () => import("./demos/category-demo").then((m) => m.CategoryDemo),
  { ssr: false, loading: () => <AnimationSkeleton /> }
);

const SearchDemo = dynamic(
  () => import("./demos/search-demo").then((m) => m.SearchDemo),
  { ssr: false, loading: () => <AnimationSkeleton /> }
);

const SmartMetadataDemo = dynamic(
  () => import("./demos/smart-metadata-demo").then((m) => m.SmartMetadataDemo),
  { ssr: false, loading: () => <AnimationSkeleton /> }
);

const ViewModesDemo = dynamic(
  () => import("./demos/view-modes-demo").then((m) => m.ViewModesDemo),
  { ssr: false, loading: () => <AnimationSkeleton /> }
);

export function FeaturesSection() {
  return (
    <section id="features" className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-350 px-4 sm:px-8">
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
            Features that actually matter. No bloat, just what you need.
          </p>
        </motion.div>

        {/* Bento Grid - 4 columns */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Quick Add - 2 col span */}
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true }}
            className="flex flex-col border border-border bg-card p-4 sm:p-8 lg:col-span-2"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Quick Add
              </h3>
              <p className="mt-2 text-muted-foreground">
                Add bookmarks instantly from anywhere with our browser extension
              </p>
            </div>
            <div className="flex-1">
              <LazyRender
                minHeight={224}
                placeholder={<AnimationSkeleton />}
                className="h-full"
              >
                <QuickAddDemo />
              </LazyRender>
            </div>
          </motion.div>

          {/* Add Categories */}
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col border border-border bg-card p-4 sm:p-8"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Add Categories
              </h3>
              <p className="mt-2 text-muted-foreground">
                Customize icons and colors
              </p>
            </div>
            <div className="flex-1">
              <LazyRender
                minHeight={224}
                placeholder={<AnimationSkeleton />}
                className="h-full"
              >
                <CategoryDemo />
              </LazyRender>
            </div>
          </motion.div>

          {/* Instant Search */}
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col border border-border bg-card p-4 sm:p-8"
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
              <LazyRender
                minHeight={224}
                placeholder={<AnimationSkeleton />}
                className="h-full"
              >
                <SearchDemo />
              </LazyRender>
            </div>
          </motion.div>

          {/* Auto Metadata - 2 col span */}
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col border border-border bg-card p-4 sm:p-8 lg:col-span-2"
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
              <LazyRender
                minHeight={224}
                placeholder={<AnimationSkeleton />}
                className="h-full"
              >
                <SmartMetadataDemo />
              </LazyRender>
            </div>
          </motion.div>

          {/* Flexible Views - 2 col span */}
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col border border-border bg-card p-4 sm:p-8 lg:col-span-2"
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
              <LazyRender
                minHeight={224}
                placeholder={<AnimationSkeleton />}
                className="h-full"
              >
                <ViewModesDemo />
              </LazyRender>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
