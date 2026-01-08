"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { QuoteUpIcon, QuoteDownIcon } from "@hugeicons/core-free-icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Husseini Sobhy",
    role: "AI Engineer",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=Sarah",
    content:
      "I keep every API doc, paper, and GitHub repo here. The category system actually makes sense for how I work.",
    rating: 5,
  },
  {
    name: "Ahmed Saad",
    role: "Video Editor",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=Marcus",
    content:
      "All my stock sites, tutorials, and client refs in one place. Clean interface, works fast. Dark mode is perfect for late nights.",
    rating: 5,
  },
  {
    name: "Mohamed Hassan",
    role: "Cross-platform Developer",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=Emily",
    content:
      "Switching between Flutter docs, React Native guides, and platform-specific resources used to be chaos. Not anymore.",
    rating: 5,
  },
  {
    name: "Salah Khattab",
    role: "AI Engineer",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=David",
    content:
      "Quick add saves me when I'm deep in research mode. Just bookmark and keep working. I organize later.",
    rating: 5,
  },
  {
    name: "Yahya Hassan",
    role: "Backend Developer",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=Lisa",
    content:
      "Database docs, API references, stack overflow threads. Everything I need, searchable in milliseconds. Exactly what I wanted.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const x = useMotionValue(0);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    animationRef.current = animate(x, -1920, {
      duration: 40,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return () => animationRef.current?.stop();
  }, [x]);

  const handleMouseEnter = () => animationRef.current?.pause();
  const handleMouseLeave = () => animationRef.current?.play();

  return (
    <section
      id="testimonials"
      className="overflow-hidden bg-background py-28 md:py-40"
    >
      <div className="mx-auto max-w-350 px-4 sm:px-8">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            Loved by Users
          </h2>
          <p className="mt-6 text-xl text-muted-foreground">
            See what people are saying about Mind Cave
          </p>
        </div>

        {/* Marquee */}
        <div className="relative">
          <div className="flex gap-8 overflow-hidden">
            <motion.div
              className="flex shrink-0 gap-8"
              style={{ x, willChange: "transform" }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleMouseEnter}
              onTouchEnd={handleMouseLeave}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex h-64 w-96 shrink-0 flex-col border border-border bg-card p-8 transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:shadow-sm dark:hover:bg-primary/10"
                >
                  {/* Quote content - takes available space */}
                  <div className="flex-1">
                    <div className="flex items-start gap-1">
                      <HugeiconsIcon
                        icon={QuoteUpIcon}
                        className="h-4 w-4 shrink-0 text-primary/50"
                      />
                      <p className="text-base text-foreground/80">
                        {testimonial.content}
                      </p>
                      <HugeiconsIcon
                        icon={QuoteDownIcon}
                        className="h-4 w-4 shrink-0 self-end text-primary/50"
                      />
                    </div>
                  </div>

                  {/* Avatar, name, role - always at bottom */}
                  <div className="mt-auto flex items-center gap-4">
                    <Avatar className="h-12 w-12 shrink-0">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Gradient overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-linear-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-linear-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
}
