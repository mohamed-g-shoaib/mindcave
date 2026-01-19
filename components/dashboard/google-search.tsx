"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function GoogleSearch() {
  const [query, setQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Fetch suggestions when query changes
  React.useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search/suggestions?q=${encodeURIComponent(query)}`,
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Suggestion fetch error:", error);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`,
      "_blank",
    );
    setQuery("");
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > -1 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        const finalTerm =
          selectedIndex >= 0 ? suggestions[selectedIndex] : query;
        handleSearch(finalTerm);
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-md mx-auto hidden lg:block"
    >
      <div className="relative group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <HugeiconsIcon
            icon={Search01Icon}
            className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors"
          />
        </div>
        <Input
          type="text"
          placeholder="Search the web..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 h-9 bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-full transition-all w-full"
        />
      </div>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full mt-2 w-full bg-background border rounded-2xl shadow-xl overflow-hidden z-50 p-1.5 ring-1 ring-black/5"
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                onClick={() => handleSearch(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={cn(
                  "flex items-center w-full px-3 py-2 text-sm rounded-xl transition-colors text-left",
                  index === selectedIndex
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50",
                )}
              >
                <HugeiconsIcon
                  icon={Search01Icon}
                  className="mr-3 h-3.5 w-3.5 opacity-40"
                />
                <span className="truncate">{suggestion}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
