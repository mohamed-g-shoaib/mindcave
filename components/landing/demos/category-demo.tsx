"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Tick02Icon,
  Home01Icon,
  BookOpen01Icon,
  Briefcase01Icon,
  PaintBoardIcon,
} from "@hugeicons/core-free-icons";

const iconOptions = [
  Home01Icon,
  BookOpen01Icon,
  Briefcase01Icon,
  PaintBoardIcon,
];
const colorOptions = ["#f97316", "#3b82f6", "#22c55e", "#a855f7"];

export function CategoryDemo() {
  const [phase, setPhase] = useState<
    | "idle"
    | "typing"
    | "typed"
    | "iconHover"
    | "iconSelected"
    | "colorHover"
    | "colorSelected"
    | "done"
  >("idle");
  const [categoryName, setCategoryName] = useState("");
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);
  const [hoveredColor, setHoveredColor] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);

  useEffect(() => {
    const cycle = async () => {
      // Reset
      setPhase("idle");
      setCategoryName("");
      setHoveredIcon(null);
      setSelectedIcon(null);
      setHoveredColor(null);
      setSelectedColor(null);
      await new Promise((r) => setTimeout(r, 600));

      // 1. Type name first
      setPhase("typing");
      const name = "Design";
      for (let i = 0; i <= name.length; i++) {
        setCategoryName(name.slice(0, i));
        await new Promise((r) => setTimeout(r, 80));
      }
      setPhase("typed");
      await new Promise((r) => setTimeout(r, 500));

      // 2. Hover over icons then select (slower)
      setPhase("iconHover");
      setHoveredIcon(0);
      await new Promise((r) => setTimeout(r, 350));
      setHoveredIcon(1);
      await new Promise((r) => setTimeout(r, 350));
      setHoveredIcon(2);
      await new Promise((r) => setTimeout(r, 350));
      setHoveredIcon(3); // PaintBoard
      await new Promise((r) => setTimeout(r, 500));
      setSelectedIcon(3);
      setHoveredIcon(null);
      setPhase("iconSelected");
      await new Promise((r) => setTimeout(r, 600));

      // 3. Hover over colors then select (slower)
      setPhase("colorHover");
      setHoveredColor(1);
      await new Promise((r) => setTimeout(r, 350));
      setHoveredColor(2);
      await new Promise((r) => setTimeout(r, 350));
      setHoveredColor(0); // Orange
      await new Promise((r) => setTimeout(r, 500));
      setSelectedColor(0);
      setHoveredColor(null);
      setPhase("colorSelected");
      await new Promise((r) => setTimeout(r, 400));

      // 4. Done - show success inline
      setPhase("done");
      await new Promise((r) => setTimeout(r, 2000));
    };

    const interval = setInterval(cycle, 9000);
    cycle();
    return () => clearInterval(interval);
  }, []);

  const isDone = phase === "done";
  const activeColor =
    selectedColor !== null ? colorOptions[selectedColor] : "#888";

  return (
    <div className="relative h-full min-h-56 overflow-hidden border border-border bg-card p-4">
      <div className="space-y-3">
        {/* Header */}
        <div className="text-xs font-medium text-muted-foreground">
          NEW CATEGORY
        </div>

        {/* Name Field */}
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Name</div>
          <div className="flex h-8 items-center border border-border bg-input px-2">
            <div className="flex h-5 flex-1 items-center gap-px">
              <span className="text-sm text-foreground">{categoryName}</span>
              {phase === "typing" && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="h-4 w-0.5 bg-primary"
                />
              )}
            </div>
            {/* Success checkmark in name field */}
            {isDone && (
              <motion.div
                initial={{ opacity: 0, transform: "scale(0)" }}
                animate={{ opacity: 1, transform: "scale(1)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ willChange: "transform, opacity" }}
              >
                <HugeiconsIcon
                  icon={Tick02Icon}
                  className="h-4 w-4 text-green-400"
                />
              </motion.div>
            )}
          </div>
        </div>

        {/* Icon Picker */}
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Icon</div>
          <div className="flex flex-wrap gap-1.5 lg:gap-2">
            {iconOptions.map((Icon, i) => {
              const isHovered = hoveredIcon === i;
              const isSelected = selectedIcon === i;
              const isActive = isHovered || isSelected;
              const canInteract = phase !== "idle" && phase !== "typing";

              // Icon uses hovered color during color selection, or selected color when done
              const previewColor =
                hoveredColor !== null
                  ? colorOptions[hoveredColor]
                  : selectedColor !== null
                  ? colorOptions[selectedColor]
                  : null;

              const iconColor =
                isSelected && previewColor !== null
                  ? previewColor
                  : isActive
                  ? "#f97316" // primary during hover/selection before color is chosen
                  : undefined;

              return (
                <div key={i} className="relative">
                  {/* Selection/hover indicator */}
                  <motion.div
                    className={`absolute inset-0 ${
                      isSelected
                        ? "border-2 border-primary bg-primary/20"
                        : "border-2 border-primary/50 bg-primary/10"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      willChange: "opacity",
                      borderColor:
                        isSelected && previewColor !== null
                          ? previewColor
                          : undefined,
                      backgroundColor:
                        isSelected && previewColor !== null
                          ? previewColor + "20"
                          : undefined,
                    }}
                  />
                  <div
                    className={`relative z-10 flex h-8 w-8 items-center justify-center transition-colors ${
                      canInteract ? "bg-secondary" : "bg-secondary/50"
                    }`}
                  >
                    <HugeiconsIcon
                      icon={Icon}
                      className="h-4 w-4 transition-colors"
                      style={{
                        color:
                          iconColor ??
                          (canInteract
                            ? "hsl(var(--muted-foreground))"
                            : "hsl(var(--muted-foreground) / 0.4)"),
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Color Picker */}
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Color</div>
          <div className="flex gap-2 lg:gap-1.5 xl:gap-2">
            {colorOptions.map((color, i) => {
              const isHovered = hoveredColor === i;
              const isSelected = selectedColor === i;
              const isActive = isHovered || isSelected;
              const canInteract = [
                "colorHover",
                "colorSelected",
                "done",
              ].includes(phase);

              return (
                <div key={i} className="relative">
                  {/* Selection ring */}
                  <motion.div
                    className="absolute -inset-1 rounded-full border-2 border-foreground"
                    initial={{ opacity: 0, transform: "scale(0.8)" }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "scale(1)" : "scale(0.8)",
                    }}
                    transition={{ duration: 0.2 }}
                    style={{ willChange: "opacity, transform" }}
                  />
                  <div
                    className="relative z-10 h-6 w-6 rounded-full transition-opacity lg:h-5 lg:w-5 xl:h-6 xl:w-6"
                    style={{
                      backgroundColor: color,
                      opacity: canInteract ? 1 : 0.4,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
