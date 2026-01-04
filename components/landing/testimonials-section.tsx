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
    <section className="overflow-hidden border-t border-primary-foreground/10 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
            Loved by Users
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/70">
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
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="w-96 shrink-0 rounded-lg border border-primary-foreground/20 bg-primary p-6"
                >
                  <p className="mb-4 text-sm text-primary-foreground/80">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-accent/20" />
                    <div>
                      <p className="font-medium text-primary-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-primary-foreground/60">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Gradient overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
}
