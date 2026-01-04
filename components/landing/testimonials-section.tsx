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
      className="overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "oklch(0.216 0.006 56.043)" }}
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-stone-100 md:text-4xl lg:text-5xl">
            Loved by Users
          </h2>
          <p className="mt-4 text-lg text-stone-400">
            See what people are saying about Mind Cave
          </p>
        </div>

        {/* Marquee */}
        <div className="relative">
          <div className="flex gap-6 overflow-hidden">
            <motion.div
              className="flex shrink-0 gap-6"
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
                  className="w-80 shrink-0 rounded-lg border border-stone-800 bg-stone-900 p-6"
                >
                  <p className="mb-4 text-sm text-stone-300">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-orange-500/20" />
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
            className="pointer-events-none absolute inset-y-0 left-0 w-32"
            style={{
              background:
                "linear-gradient(to right, oklch(0.216 0.006 56.043), transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-32"
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
