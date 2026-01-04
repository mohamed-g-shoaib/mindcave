"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Remove01Icon } from "@hugeicons/core-free-icons";

const faqs = [
  {
    question: "Is Mind Cave really free?",
    answer:
      "Yes! Mind Cave is completely free to use. No credit card required, no hidden fees. We believe in making powerful bookmark management accessible to everyone.",
  },
  {
    question: "How does Mind Cave differ from browser bookmarks?",
    answer:
      "Mind Cave offers a centralized, organized approach with categories, search, rich previews, and cross-browser access. Your bookmarks are stored in the cloud and accessible from any device.",
  },
  {
    question: "Can I import my existing bookmarks?",
    answer:
      "Bookmark import functionality is coming soon! You'll be able to import from Chrome, Firefox, Safari, and other popular browsers.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use Supabase with row-level security, ensuring your bookmarks are private and secure. Only you can access your data.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No installation needed! Mind Cave is a web application that works in any modern browser. Just sign in with Google and start organizing.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="py-24 md:py-32"
      style={{ backgroundColor: "oklch(0.216 0.006 56.043)" }}
    >
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-stone-100 md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-stone-400">
            Everything you need to know about Mind Cave
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-stone-800 bg-stone-900"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-stone-800/50"
              >
                <span className="font-medium text-stone-200">
                  {faq.question}
                </span>
                <HugeiconsIcon
                  icon={openIndex === index ? Remove01Icon : Add01Icon}
                  className="h-5 w-5 shrink-0 text-orange-400"
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="border-t border-stone-800 px-5 py-4">
                      <p className="text-sm text-stone-400">{faq.answer}</p>
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
