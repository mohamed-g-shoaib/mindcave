"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { LazyRender } from "@/components/ui/lazy-render";

// Animation skeleton placeholder
const AnimationSkeleton = () => (
  <div className="h-32 w-full animate-pulse bg-muted/30" />
);

// Dynamic imports for code splitting
const SaveDemo = dynamic(
  () => import("./demos/save-demo").then((m) => m.SaveDemo),
  { ssr: false, loading: () => <AnimationSkeleton /> }
);

const OrganizeDemo = dynamic(
  () => import("./demos/organize-demo").then((m) => m.OrganizeDemo),
  { ssr: false, loading: () => <AnimationSkeleton /> }
);

const FindDemo = dynamic(
  () => import("./demos/find-demo").then((m) => m.FindDemo),
  { ssr: false, loading: () => <AnimationSkeleton /> }
);

const HowItWorksAccessDemo = dynamic(
  () =>
    import("./demos/how-it-works-access-demo").then(
      (m) => m.HowItWorksAccessDemo
    ),
  { ssr: false, loading: () => <AnimationSkeleton /> }
);

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
    Demo: HowItWorksAccessDemo,
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative bg-muted py-28 md:py-40">
      {/* Top Bleed - smoother transition */}
      <div className="absolute inset-x-0 top-0 h-64 bg-linear-to-b from-background via-background/50 to-transparent pointer-events-none" />

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
            Four steps. That's all it takes to stay organized.
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
              <LazyRender minHeight={128} placeholder={<AnimationSkeleton />}>
                <step.Demo />
              </LazyRender>
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
