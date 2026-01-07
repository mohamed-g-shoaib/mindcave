"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { QuoteUpIcon, QuoteDownIcon } from "@hugeicons/core-free-icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=Sarah",
    content:
      "Mind Cave has completely transformed how I manage my research and development resources. The category system is brilliant!",
  },
  {
    name: "Marcus Rodriguez",
    role: "Product Designer",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=Marcus",
    content:
      "Finally, a bookmark manager that's both powerful and beautiful. The dark mode is chef's kiss",
  },
  {
    name: "Emily Watson",
    role: "Content Creator",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=Emily",
    content:
      "I've tried so many bookmark tools, but Mind Cave is the only one that stuck. It's just that good.",
  },
  {
    name: "David Kim",
    role: "Entrepreneur",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=David",
    content:
      "The quick add feature saves me hours every week. I can't imagine going back to browser bookmarks.",
  },
  {
    name: "Lisa Anderson",
    role: "Student",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=Lisa",
    content:
      "Perfect for organizing all my study materials and research papers. The search is lightning fast!",
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
