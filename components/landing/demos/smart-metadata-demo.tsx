"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon, GlobalIcon, ZapIcon } from "@hugeicons/core-free-icons";

export function SmartMetadataDemo() {
  const [state, setState] = useState<"typing" | "loading" | "card">("typing");
  const [text, setText] = useState("");

  useEffect(() => {
    const loop = async () => {
      // Reset
      setState("typing");
      setText("");

      // Type URL
      const url = "github.com";
      for (let i = 0; i <= url.length; i++) {
        setText(url.slice(0, i));
        await new Promise((r) => setTimeout(r, 100));
      }

      await new Promise((r) => setTimeout(r, 400));
      setState("loading");
      await new Promise((r) => setTimeout(r, 800));
      setState("card");
      await new Promise((r) => setTimeout(r, 3000));

      // Loop
      loop();
    };
    loop();
  }, []);

  return (
    <div className="flex h-full min-h-56 flex-col justify-center overflow-hidden border border-stone-700 bg-stone-900 p-6">
      <AnimatePresence mode="wait">
        {state === "card" ? (
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-hidden border border-stone-700 bg-stone-800"
          >
            <div className="relative h-24 overflow-hidden bg-stone-700">
              <div className="absolute inset-0 animate-pulse bg-stone-600/20" />
              <HugeiconsIcon
                icon={GlobalIcon}
                className="absolute bottom-2 left-2 h-8 w-8 text-stone-400"
              />
            </div>
            <div className="space-y-2 p-4">
              <div className="h-4 w-3/4 bg-stone-600" />
              <div className="h-3 w-1/2 bg-stone-700" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <div className="flex items-center gap-3 border-b-2 border-stone-700 py-2">
              <HugeiconsIcon
                icon={PlusSignIcon}
                className="h-5 w-5 text-stone-500"
              />
              <span className="font-mono text-lg text-stone-300">{text}</span>
              {state === "typing" && (
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="h-5 w-2 bg-orange-500"
                />
              )}
            </div>
            {state === "loading" && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 flex items-center gap-2 text-xs text-orange-400"
              >
                <HugeiconsIcon
                  icon={ZapIcon}
                  className="h-3 w-3 animate-pulse"
                />
                Fetching metadata...
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
