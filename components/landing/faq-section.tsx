"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Is Mind Cave free?",
    answer:
      "Yes. No credit card. No upsells. I want a tool that stays simple and usable.",
  },
  {
    question: "How does Mind Cave differ from browser bookmarks?",
    answer:
      "It is built for retrieval, not storage. Categories, fast search, and metadata that makes links scannable.",
  },
  {
    question: "What happens when I save a link?",
    answer:
      "You paste a URL. Mind Cave fetches the title, description, and favicon so the bookmark has context.",
  },
  {
    question: "Can I customize categories?",
    answer:
      "Yes. Create categories with names and icons. Keep it close to how you think, not how a browser thinks.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Mind Cave uses Supabase with row level security. Your bookmarks are private to your account.",
  },
  {
    question: "Do I need to install anything?",
    answer: "No. It runs in the browser. Sign in and start saving.",
  },
  {
    question: "Can I import my existing bookmarks?",
    answer:
      "Yes. Upload your browser bookmarks HTML export, pick the folders you want, and Mind Cave creates missing categories. You can also skip duplicate URLs.",
  },
];

// Animated plus/minus icon
function AccordionIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative flex h-5 w-5 items-center justify-center">
      {/* Horizontal bar (always visible) */}
      <motion.div
        className="absolute h-0.5 w-3 bg-primary"
        style={{ willChange: "transform" }}
      />
      {/* Vertical bar (animates to 0 when open) */}
      <motion.div
        className="absolute h-3 w-0.5 bg-primary"
        initial={false}
        animate={{ transform: isOpen ? "scaleY(0)" : "scaleY(1)" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={{ willChange: "transform" }}
      />
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-6 text-xl text-muted-foreground">
            Straight answers, no fluff
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden border border-border bg-card transition-all duration-300 hover:ring-1 hover:ring-primary/40 hover:bg-muted/30"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-secondary"
              >
                <span className="text-lg font-medium text-foreground">
                  {faq.question}
                </span>
                <AccordionIcon isOpen={openIndex === index} />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ willChange: "height, opacity" }}
                  >
                    <div className="border-t border-border px-6 py-5">
                      <p className="text-base text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
