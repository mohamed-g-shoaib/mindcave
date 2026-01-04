"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    content:
      "Mind Cave has completely transformed how I manage my research and development resources. The category system is brilliant!",
  },
  {
    name: "Marcus Rodriguez",
    role: "Product Designer",
    content:
      "Finally, a bookmark manager that's both powerful and beautiful. The dark mode is chef's kiss 👨‍🍳",
  },
  {
    name: "Emily Watson",
    role: "Content Creator",
    content:
      "I've tried so many bookmark tools, but Mind Cave is the only one that stuck. It's just that good.",
  },
  {
    name: "David Kim",
    role: "Entrepreneur",
    content:
      "The quick add feature saves me hours every week. I can't imagine going back to browser bookmarks.",
  },
  {
    name: "Lisa Anderson",
    role: "Student",
    content:
      "Perfect for organizing all my study materials and research papers. The search is lightning fast!",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="overflow-hidden py-28 md:py-40"
      style={{ backgroundColor: "oklch(0.216 0.006 56.043)" }}
    >
      <div className="mx-auto max-w-450 px-8">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-bold text-stone-100 md:text-5xl lg:text-6xl">
            Loved by Users
          </h2>
          <p className="mt-6 text-xl text-stone-400">
            See what people are saying about Mind Cave
          </p>
        </div>

        {/* Marquee */}
        <div className="relative">
          <div className="flex gap-8 overflow-hidden">
            <motion.div
              className="flex shrink-0 gap-8"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="w-96 shrink-0 border border-stone-800 bg-stone-900 p-8"
                >
                  <p className="mb-6 text-base text-stone-300">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-orange-500/20" />
                    <div>
                      <p className="font-medium text-stone-200">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-stone-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Gradient overlays */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-40"
            style={{
              background:
                "linear-gradient(to right, oklch(0.216 0.006 56.043), transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-40"
            style={{
              background:
                "linear-gradient(to left, oklch(0.216 0.006 56.043), transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
