"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Link01Icon,
  Loading03Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

// Vercel triangle logo component
function VercelLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 76 65" fill="currentColor" className={className}>
      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
    </svg>
  );
}

export function SmartMetadataDemo() {
  const [phase, setPhase] = useState<
    | "typing"
    | "analyzing"
    | "favicon"
    | "title"
    | "description"
    | "image"
    | "done"
  >("typing");
  const [text, setText] = useState("");

  useEffect(() => {
    const loop = async () => {
      // Reset
      setPhase("typing");
      setText("");

      // Type URL
      const url = "vercel.com/home";
      for (let i = 0; i <= url.length; i++) {
        setText(url.slice(0, i));
        await new Promise((r) => setTimeout(r, 80));
      }
      await new Promise((r) => setTimeout(r, 400));

      // Analyzing
      setPhase("analyzing");
      await new Promise((r) => setTimeout(r, 600));

      // Progressive reveal
      setPhase("favicon");
      await new Promise((r) => setTimeout(r, 400));
      setPhase("title");
      await new Promise((r) => setTimeout(r, 400));
      setPhase("description");
      await new Promise((r) => setTimeout(r, 400));
      setPhase("image");
      await new Promise((r) => setTimeout(r, 400));
      setPhase("done");
      await new Promise((r) => setTimeout(r, 1800));
    };

    const interval = setInterval(loop, 7500);
    loop();
    return () => clearInterval(interval);
  }, []);

  const showCard = [
    "favicon",
    "title",
    "description",
    "image",
    "done",
  ].includes(phase);
  const showFavicon = [
    "favicon",
    "title",
    "description",
    "image",
    "done",
  ].includes(phase);
  const showTitle = ["title", "description", "image", "done"].includes(phase);
  const showDescription = ["description", "image", "done"].includes(phase);
  const showImage = ["image", "done"].includes(phase);

  return (
    <div className="flex h-full min-h-56 flex-col justify-center overflow-hidden border border-border bg-card p-6">
      {/* URL Input */}
      <div className="flex items-center gap-3 border-b-2 border-border pb-3">
        <HugeiconsIcon
          icon={Link01Icon}
          className="h-5 w-5 shrink-0 text-muted-foreground"
        />
        <div className="flex h-5 min-w-0 flex-1 items-center gap-px">
          <span className="truncate font-mono text-base text-foreground">
            {text}
          </span>
          {phase === "typing" && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="h-5 w-0.5 shrink-0 bg-primary"
            />
          )}
        </div>
      </div>

      {/* Status & Card - fixed height to prevent layout shift */}
      <div className="relative mt-4 h-32">
        <AnimatePresence mode="wait">
          {phase === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ willChange: "opacity" }}
              className="flex items-center gap-2 text-sm text-primary"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{ willChange: "transform" }}
              >
                <HugeiconsIcon icon={Loading03Icon} className="h-4 w-4" />
              </motion.div>
              Fetching metadata...
            </motion.div>
          )}

          {showCard && (
            <motion.div
              key="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ willChange: "opacity" }}
              className="flex h-full gap-3 border border-border bg-secondary"
            >
              {/* Left side - OG Image */}
              <div className="relative w-32 shrink-0 overflow-hidden border-r border-border md:w-28 lg:w-48">
                {!showImage && (
                  <div className="h-full w-full animate-pulse bg-muted" />
                )}
                <AnimatePresence>
                  {showImage && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ willChange: "opacity" }}
                      className="relative h-full w-full bg-white"
                    >
                      {/* Vercel logo in corner */}
                      <div className="absolute left-2 top-2">
                        <VercelLogo className="h-3 w-3 text-black" />
                      </div>
                      {/* Colorful gradient blob in bottom right */}
                      <div
                        className="absolute -bottom-4 -right-4 h-20 w-20 opacity-70 blur-sm"
                        style={{
                          background:
                            "conic-gradient(from 180deg, #ff6b6b, #ffa94d, #ffe066, #69db7c, #4dabf7, #9775fa, #ff6b6b)",
                        }}
                      />
                      {/* Text */}
                      <div className="absolute bottom-2 left-2 text-[10px] font-semibold leading-tight text-black">
                        What will
                        <br />
                        you ship?
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right side - Metadata */}
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 py-3 pr-3">
                {/* Favicon + Title row */}
                <div className="flex items-center gap-2">
                  {/* Favicon */}
                  <div className="relative h-6 w-6 shrink-0">
                    {!showFavicon && (
                      <div className="h-full w-full animate-pulse bg-muted" />
                    )}
                    <AnimatePresence>
                      {showFavicon && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          style={{ willChange: "opacity" }}
                          className="flex h-full w-full items-center justify-center bg-black"
                        >
                          <VercelLogo className="h-3 w-3 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Title */}
                  <div className="min-w-0 flex-1">
                    {!showTitle && (
                      <div className="h-3.5 w-3/4 animate-pulse bg-muted" />
                    )}
                    <AnimatePresence>
                      {showTitle && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          style={{ willChange: "opacity" }}
                          className="truncate text-sm font-medium text-foreground"
                        >
                          Vercel
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Description */}
                <div>
                  {!showDescription && (
                    <div className="h-2.5 w-full animate-pulse bg-muted" />
                  )}
                  <AnimatePresence>
                    {showDescription && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ willChange: "opacity" }}
                        className="text-xs text-muted-foreground"
                      >
                        Build and deploy the best Web experiences
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
