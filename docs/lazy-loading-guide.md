# Lazy Loading & Animation Optimization Guide

A comprehensive guide for implementing performant lazy loading and animation patterns in React/Next.js landing pages with multiple sections and animations.

---

## Overview

This guide covers three core optimization patterns:

1. **LazyRender Component** - Defer rendering of heavy components until viewport entry
2. **Animation Lifecycle Control** - Stop/start animations based on visibility
3. **Code Splitting with Dynamic Imports** - Load JavaScript chunks on demand

---

## Pattern 1: LazyRender Component

### What It Does

Wraps any component and defers its rendering until the element enters (or approaches) the viewport. This prevents:

- Heavy components from mounting on initial page load
- Dynamic imports from triggering until actually needed
- Layout recalculations from off-screen content

### Implementation

```tsx
// components/ui/lazy-render.tsx
"use client";

import React, { useRef, useState, useEffect, ReactNode } from "react";

interface LazyRenderProps {
  children: ReactNode;
  placeholder?: ReactNode;
  rootMargin?: string; // Default: "200px 0px" - preload 200px before visible
  threshold?: number; // Default: 0 - trigger when any part is visible
  minHeight?: string | number; // Prevent layout shift
  className?: string;
}

export function LazyRender({
  children,
  placeholder,
  rootMargin = "200px 0px",
  threshold = 0,
  minHeight,
  className,
}: LazyRenderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (shouldRender) return;

    const element = containerRef.current;
    if (!element) return;

    // Fallback for browsers without IntersectionObserver
    if (!("IntersectionObserver" in window)) {
      const timer = setTimeout(() => setShouldRender(true), 100);
      return () => clearTimeout(timer);
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observerRef.current?.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observerRef.current.observe(element);

    return () => observerRef.current?.disconnect();
  }, [rootMargin, threshold, shouldRender]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={
        !shouldRender && minHeight
          ? {
              minHeight:
                typeof minHeight === "number" ? `${minHeight}px` : minHeight,
            }
          : undefined
      }
    >
      {shouldRender ? children : placeholder}
    </div>
  );
}
```

### How to Use

```tsx
import { LazyRender } from "@/components/ui/lazy-render";
import { ExpensiveAnimation } from "@/components/animations/expensive-animation";

// In your section component:
export function MySection() {
  return (
    <LazyRender
      minHeight={400} // Prevents layout shift
      placeholder={
        <div className="animate-pulse bg-muted/30 h-full rounded-xl" />
      }
    >
      <ExpensiveAnimation />
    </LazyRender>
  );
}
```

### Key Configuration Options

| Option        | Purpose                               | Recommended Value                                      |
| ------------- | ------------------------------------- | ------------------------------------------------------ |
| `rootMargin`  | How early to start loading            | `"200px 0px"` for animations, `"100px 0px"` for images |
| `threshold`   | How much must be visible to trigger   | `0` for early load, `0.5` for half-visible             |
| `minHeight`   | Reserve space to prevent layout shift | Match expected content height                          |
| `placeholder` | Show while loading                    | Skeleton loader matching content shape                 |

---

## Pattern 2: Animation Lifecycle Control with useInView

### What It Does

Controls animation playback based on viewport visibility:

- **Starts** animations when scrolled into view
- **Pauses/Stops** animations when scrolled out of view
- **Resets** animation state on re-entry
- **Cleans up** timers and intervals when not visible

### Why It Matters

Animations running off-screen:

- Waste CPU/GPU cycles
- Drain battery on mobile devices
- Can cause jank when scrolling
- Accumulate memory from leaked timers

### Implementation Pattern

```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

export function MyAnimation({ className }: { className?: string }) {
  // 1. Create container ref for viewport detection
  const containerRef = useRef<HTMLDivElement>(null);

  // 2. Use Framer Motion's useInView hook
  //    - amount: 0.5 means trigger when 50% visible
  //    - once: false (default) means re-trigger on each entry
  const isInView = useInView(containerRef, { amount: 0.5 });

  // 3. Track timeouts for cleanup
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 4. Animation state
  const [phase, setPhase] = useState(0);

  // 5. Helper to clear all timeouts
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  // 6. Animation lifecycle effect
  useEffect(() => {
    // IMPORTANT: When leaving viewport, clean up everything
    if (!isInView) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      clearAllTimeouts();
      return;
    }

    // When entering viewport, reset and start fresh
    setPhase(0);

    const runCycle = () => {
      clearAllTimeouts();
      setPhase(0);

      // Schedule animation phases
      timeoutsRef.current.push(setTimeout(() => setPhase(1), 500));
      timeoutsRef.current.push(setTimeout(() => setPhase(2), 1500));
      timeoutsRef.current.push(setTimeout(() => setPhase(3), 2500));
      // ... more phases as needed
    };

    // Run immediately on viewport entry
    runCycle();

    // For looping animations, set up interval
    intervalRef.current = setInterval(runCycle, 10000);

    // Cleanup on unmount or viewport exit
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      clearAllTimeouts();
    };
  }, [isInView]); // Re-run when visibility changes

  return (
    <div ref={containerRef} className={className}>
      {/* Animation content using phase state */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Phase 1 content
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

### Common useInView Options

```tsx
// Trigger when 50% of element is visible (recommended for animations)
const isInView = useInView(containerRef, { amount: 0.5 });

// Trigger when 30% visible (good for taller sections)
const isInView = useInView(containerRef, { amount: 0.3 });

// Only trigger once - never re-trigger on re-entry
// Good for entrance animations that should only play once
const isInView = useInView(containerRef, { once: true });

// With margin - trigger before fully visible
const isInView = useInView(containerRef, { margin: "100px 0px" });
```

### Timer Management Best Practices

```tsx
// ❌ BAD: Timeouts can leak if component leaves viewport
useEffect(() => {
  setTimeout(() => setPhase(1), 1000); // Leak!
}, []);

// ✅ GOOD: Track and cleanup all timeouts
const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

const clearAllTimeouts = () => {
  timeoutsRef.current.forEach(clearTimeout);
  timeoutsRef.current = [];
};

useEffect(() => {
  if (!isInView) {
    clearAllTimeouts();
    return;
  }

  // Push to tracking array
  timeoutsRef.current.push(setTimeout(() => setPhase(1), 1000));

  return () => clearAllTimeouts();
}, [isInView]);
```

---

## Pattern 3: Code Splitting with Dynamic Imports

### What It Does

- Splits heavy animation components into separate JavaScript chunks
- Only loads the chunk when the component is actually needed
- Reduces initial bundle size significantly
- Works with LazyRender to delay chunk loading until viewport entry

### Implementation

```tsx
import dynamic from "next/dynamic";

// Dynamically import heavy animation component
const AiAssistantAnimation = dynamic(
  () =>
    import("@/components/animations/ai-assistant-animation").then(
      (mod) => mod.AiAssistantAnimation
    ),
  {
    ssr: false, // Don't render on server - animations are client-only
    loading: () => (
      <div className="absolute inset-0 animate-pulse bg-muted/30 rounded-xl" />
    ),
  }
);

// Then wrap with LazyRender for scroll-triggered loading
export function Features() {
  return (
    <LazyRender
      className="absolute inset-0"
      placeholder={<AnimationSkeleton />}
    >
      <AiAssistantAnimation className="absolute inset-0" />
    </LazyRender>
  );
}
```

### Why Both dynamic() AND LazyRender?

| Layer        | What It Does                               | When It Triggers                 |
| ------------ | ------------------------------------------ | -------------------------------- |
| `LazyRender` | Prevents React from mounting the component | When element enters viewport     |
| `dynamic()`  | Prevents JavaScript chunk from downloading | When component is first rendered |

**Without LazyRender**: The dynamic import triggers on initial page load even for off-screen sections.

**With LazyRender**: The dynamic import is deferred until the user scrolls near the section.

### Configuration Options for dynamic()

```tsx
const MyAnimation = dynamic(
  () => import("@/components/animations/my-animation"),
  {
    // Don't render on server - important for client-only animations
    ssr: false,

    // Show loading state while chunk downloads
    loading: () => <Skeleton />,
  }
);
```

---

## Complete Implementation Example

Here's how all three patterns work together in a real section component:

```tsx
// components/sections/features/features.tsx
"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { LazyRender } from "@/components/ui/lazy-render";

// 1. Dynamic import for code splitting
const AiAssistantAnimation = dynamic(
  () =>
    import("@/components/animations/ai-assistant-animation").then(
      (mod) => mod.AiAssistantAnimation
    ),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 animate-pulse bg-muted/30 rounded-xl" />
    ),
  }
);

// 2. Skeleton placeholder for loading state
const AnimationSkeleton = () => (
  <div className="absolute inset-0 bg-muted/10 rounded-xl" />
);

export function Features() {
  // 3. Define assets with LazyRender wrappers
  const featureAssets = [
    {
      component: (
        // LazyRender wraps static images too
        <LazyRender
          className="absolute inset-0"
          placeholder={<AnimationSkeleton />}
        >
          <Image
            src="/images/devices.png"
            alt="Responsive devices"
            fill
            className="object-cover"
          />
        </LazyRender>
      ),
    },
    {
      component: (
        // LazyRender + dynamic import for animations
        <LazyRender
          className="absolute inset-0"
          placeholder={<AnimationSkeleton />}
        >
          <AiAssistantAnimation className="absolute inset-0" />
        </LazyRender>
      ),
    },
  ];

  return (
    <Section id="features">
      {featureAssets.map((asset, index) => (
        <FeatureCard key={index} customAsset={asset.component} />
      ))}
    </Section>
  );
}
```

---

## Implementation Checklist

When adding a new section with animations:

### Step 1: Create the Animation Component

```tsx
// components/animations/my-animation.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

export function MyAnimation({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // ... animation logic with isInView control
  // ... cleanup in useEffect return

  return (
    <div ref={containerRef} className={className}>
      ...
    </div>
  );
}
```

### Step 2: Create Dynamic Import in Section

```tsx
import dynamic from "next/dynamic";

const MyAnimation = dynamic(
  () =>
    import("@/components/animations/my-animation").then((m) => m.MyAnimation),
  { ssr: false, loading: () => <Skeleton /> }
);
```

### Step 3: Wrap with LazyRender

```tsx
import { LazyRender } from "@/components/ui/lazy-render";

<LazyRender minHeight={400} placeholder={<Skeleton />}>
  <MyAnimation />
</LazyRender>;
```

---

## Performance Benefits Summary

| Technique  | Initial Load       | Memory               | CPU Usage            | UX                      |
| ---------- | ------------------ | -------------------- | -------------------- | ----------------------- |
| LazyRender | ✅ Defers mounting | ✅ Defers allocation | ✅ No render work    | ⚠️ May show placeholder |
| useInView  | ➖ No impact       | ✅ Cleanup on exit   | ✅ Pauses animations | ✅ Seamless             |
| dynamic()  | ✅ Smaller bundle  | ➖ No impact         | ➖ No impact         | ⚠️ May show loading     |

**Combined**: Initial bundle is smaller, off-screen content doesn't mount, animations only run when visible.

---

## Common Pitfalls

### 1. Timer Leaks

```tsx
// ❌ Timeout runs even after unmount
setTimeout(() => setState(x), 1000);

// ✅ Track and cleanup
const timeout = setTimeout(() => setState(x), 1000);
timeoutsRef.current.push(timeout);
```

### 2. Not Checking isInView in Effects

```tsx
// ❌ Animation continues when scrolled away
useEffect(() => {
  runAnimation();
}, []);

// ✅ Animation respects viewport
useEffect(() => {
  if (!isInView) return;
  runAnimation();
}, [isInView]);
```

### 3. Missing minHeight on LazyRender

```tsx
// ❌ Causes layout shift when content loads
<LazyRender>
  <TallComponent />
</LazyRender>

// ✅ Reserves space to prevent jump
<LazyRender minHeight={400}>
  <TallComponent />
</LazyRender>
```

### 4. Using once: true When You Want Replay

```tsx
// ❌ Animation only plays first time section is visited
const isInView = useInView(ref, { once: true });

// ✅ Animation plays each time user scrolls to section
const isInView = useInView(ref, { amount: 0.5 });
```

---

## Quick Reference

### LazyRender Import

```tsx
import { LazyRender } from "@/components/ui/lazy-render";
```

### useInView Import

```tsx
import { useInView } from "framer-motion";
```

### Dynamic Import Pattern

```tsx
import dynamic from "next/dynamic";
const Component = dynamic(() => import("./path").then((m) => m.Component), {
  ssr: false,
});
```

### Timeout Cleanup Pattern

```tsx
const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
const clearAllTimeouts = () => {
  timeoutsRef.current.forEach(clearTimeout);
  timeoutsRef.current = [];
};
```
