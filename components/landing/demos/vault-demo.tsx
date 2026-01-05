"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { GlobalIcon } from "@hugeicons/core-free-icons";

// Animated demo showing a scattered → organized transition
export function VaultDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isOrganized, setIsOrganized] = useState(false);

  useEffect(() => {
    if (!isInView) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    setIsOrganized(false);

    intervalRef.current = setInterval(() => {
      setIsOrganized((prev) => !prev);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isInView]);

  const scatteredPositions = [
    { x: 25, y: 12, rotate: -12 },
    { x: 60, y: 8, rotate: 8 },
    { x: 45, y: 42, rotate: -5 },
    { x: 70, y: 48, rotate: 15 },
    { x: 25, y: 65, rotate: -8 },
    { x: 55, y: 72, rotate: 10 },
  ];

  const organizedPositions = [
    { x: 20, y: 15, rotate: 0 },
    { x: 50, y: 15, rotate: 0 },
    { x: 80, y: 15, rotate: 0 },
    { x: 20, y: 55, rotate: 0 },
    { x: 50, y: 55, rotate: 0 },
    { x: 80, y: 55, rotate: 0 },
  ];

  return (
    <div
      ref={containerRef}
      className="relative h-48 w-full overflow-hidden bg-secondary/30"
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          animate={{
            left: `${
              isOrganized ? organizedPositions[i].x : scatteredPositions[i].x
            }%`,
            top: `${
              isOrganized ? organizedPositions[i].y : scatteredPositions[i].y
            }%`,
            rotate: isOrganized
              ? organizedPositions[i].rotate
              : scatteredPositions[i].rotate,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          style={{ willChange: "left, top, transform" }}
          className="absolute h-16 w-14 -translate-x-1/2 border border-border bg-secondary p-2"
        >
          <div className="h-2 w-8 bg-border" />
          <div className="mt-1 h-1.5 w-6 bg-border/50" />
          <HugeiconsIcon
            icon={GlobalIcon}
            className="mt-2 h-4 w-4 text-muted-foreground"
          />
        </motion.div>
      ))}
    </div>
  );
}
