"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Is Mind Cave really free?",
    answer:
      "Yes! Mind Cave is completely free to use. No credit card required, no hidden fees. We believe in making powerful bookmark management accessible to everyone.",
  },
  {
    question: "How does Mind Cave differ from browser bookmarks?",
    answer:
      "Mind Cave offers a centralized, organized approach with custom categories, instant search, rich previews with auto-fetched metadata, and a beautiful interface. Your bookmarks are stored securely and accessible from any browser.",
  },
  {
    question: "What is auto metadata?",
    answer:
      "When you add a bookmark, Mind Cave automatically fetches the page's title, description, and favicon. No manual entry needed — just paste a URL and we handle the rest.",
  },
  {
    question: "Can I customize categories?",
    answer:
      "Absolutely! You can create categories with custom names, icons, and colors. This makes organizing and finding your bookmarks intuitive and personalized to your workflow.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We use Supabase with row-level security, ensuring your bookmarks are private and secure. Only you can access your data.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No installation needed! Mind Cave is a web application that works in any modern browser. Just sign in with Google and start organizing.",
  },
  {
    question: "Can I import my existing bookmarks?",
    answer:
      "Bookmark import functionality is coming soon! You'll be able to import from Chrome, Firefox, Safari, and other popular browsers.",
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
            Everything you need to know about Mind Cave
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden border border-border bg-card"
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
