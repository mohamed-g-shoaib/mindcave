"use client";

import { useEffect, useCallback, useRef } from "react";
import { driver, type DriveStep, type Config } from "driver.js";
import "driver.js/dist/driver.css";
import { useOnboarding } from "@/hooks/use-onboarding";

// Define onboarding steps
const ONBOARDING_STEPS: DriveStep[] = [
  {
    element: "[data-onboarding='sidebar-logo']",
    popover: {
      title: "Welcome to Mind Cave!",
      description:
        "Your digital library for saving and organizing bookmarks. Let's take a quick tour to help you get started.",
      side: "right",
      align: "start",
    },
  },
  {
    element: "[data-onboarding='all-bookmarks']",
    popover: {
      title: "All Bookmarks",
      description:
        "This shows all your saved bookmarks across every category. Click here anytime to see everything.",
      side: "right",
      align: "start",
    },
  },
  {
    element: "[data-onboarding='add-category']",
    popover: {
      title: "Create Categories",
      description:
        "Organize your bookmarks by creating custom categories. Choose an icon and color to make them easy to identify.",
      side: "right",
      align: "start",
    },
  },
  {
    element: "[data-onboarding='add-bookmark']",
    popover: {
      title: "Add Bookmarks",
      description:
        "Click here to save a new bookmark. Just paste the URL and we'll fetch the title and image automatically.",
      side: "bottom",
      align: "end",
    },
  },
  {
    element: "[data-onboarding='view-toggle']",
    popover: {
      title: "Switch Views",
      description:
        "Toggle between card view and list view. Choose what works best for you.",
      side: "bottom",
      align: "end",
    },
  },
  {
    element: "[data-onboarding='column-selector']",
    popover: {
      title: "Adjust Layout",
      description:
        "Change the number of columns to fit more or fewer bookmarks on screen.",
      side: "bottom",
      align: "end",
    },
  },
  {
    element: "[data-onboarding='user-menu']",
    popover: {
      title: "User Menu",
      description:
        "Access your profile, import bookmarks from your browser, toggle theme, or sign out.",
      side: "right",
      align: "end",
    },
  },
  {
    popover: {
      title: "You're All Set!",
      description:
        "Start saving your favorite links. Right-click on categories to edit or delete them, and hover over bookmarks for more options.",
    },
  },
];

// Driver.js configuration
const DRIVER_CONFIG: Config = {
  showProgress: true,
  animate: true,
  allowClose: true,
  overlayColor: "rgba(0, 0, 0, 0.75)",
  stagePadding: 8,
  stageRadius: 0,
  popoverClass: "driver-popover-custom",
  progressText: "{{current}} of {{total}}",
  nextBtnText: "Next →",
  prevBtnText: "← Back",
  doneBtnText: "Done",
};

interface DashboardOnboardingProps {
  autoStart?: boolean;
}

export function DashboardOnboarding({
  autoStart = true,
}: DashboardOnboardingProps) {
  const { hasCompletedOnboarding, isReady, completeOnboarding } =
    useOnboarding();
  const driverRef = useRef<ReturnType<typeof driver> | null>(null);
  const hasStartedRef = useRef(false);

  const startTour = useCallback(() => {
    if (driverRef.current) {
      driverRef.current.destroy();
    }

    driverRef.current = driver({
      ...DRIVER_CONFIG,
      steps: ONBOARDING_STEPS,
      onDestroyStarted: () => {
        completeOnboarding();
        driverRef.current?.destroy();
      },
    });

    driverRef.current.drive();
  }, [completeOnboarding]);

  useEffect(() => {
    // Only auto-start once when ready and not completed
    if (
      autoStart &&
      isReady &&
      hasCompletedOnboarding === false &&
      !hasStartedRef.current
    ) {
      hasStartedRef.current = true;
      // Small delay to ensure DOM elements are rendered
      const timer = setTimeout(() => {
        startTour();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoStart, isReady, hasCompletedOnboarding, startTour]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (driverRef.current) {
        driverRef.current.destroy();
      }
    };
  }, []);

  return null;
}

// Export a function to manually trigger the tour
export function useDashboardTour() {
  const { completeOnboarding, resetOnboarding } = useOnboarding();
  const driverRef = useRef<ReturnType<typeof driver> | null>(null);

  const startTour = useCallback(() => {
    if (driverRef.current) {
      driverRef.current.destroy();
    }

    driverRef.current = driver({
      ...DRIVER_CONFIG,
      steps: ONBOARDING_STEPS,
      onDestroyStarted: () => {
        completeOnboarding();
        driverRef.current?.destroy();
      },
    });

    driverRef.current.drive();
  }, [completeOnboarding]);

  return { startTour, resetOnboarding };
}
