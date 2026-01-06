import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  UserPreferences,
  UserPreferencesUpdate,
} from "@/lib/supabase/types";

const DEFAULT_PREFERENCES: Partial<UserPreferences> = {
  // Desktop
  view_mode_desktop: "card",
  card_columns_desktop: 4,
  list_columns_desktop: 1,
  // Mobile
  view_mode_mobile: "card",
  card_columns_mobile: 1,
  list_columns_mobile: 1,
};

export function usePreferences() {
  return useQuery({
    queryKey: ["preferences"],
    queryFn: async () => {
      const res = await fetch("/api/preferences");
      if (!res.ok) throw new Error("Failed to fetch preferences");
      return res.json() as Promise<UserPreferences>;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useUpdatePreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserPreferencesUpdate) => {
      const res = await fetch("/api/preferences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update preferences");
      return res.json() as Promise<UserPreferences>;
    },
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["preferences"] });
      const previousPrefs = queryClient.getQueryData<UserPreferences>([
        "preferences",
      ]);
      queryClient.setQueryData<UserPreferences>(
        ["preferences"],
        (old) =>
          ({
            ...DEFAULT_PREFERENCES,
            ...old,
            ...newData,
          } as UserPreferences)
      );
      return { previousPrefs };
    },
    onError: (_err, _newData, context) => {
      if (context?.previousPrefs) {
        queryClient.setQueryData(["preferences"], context.previousPrefs);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["preferences"] });
    },
  });
}

/**
 * Hook for managing view mode and column preferences.
 * Automatically selects desktop/mobile preferences based on isMobile param.
 */
export function useViewMode(isMobile: boolean) {
  const { data: preferences } = usePreferences();
  const updatePreferences = useUpdatePreferences();

  // Desktop preferences
  const viewModeDesktop = preferences?.view_mode_desktop ?? "card";
  const cardColumnsDesktop = preferences?.card_columns_desktop ?? 4;
  const listColumnsDesktop = preferences?.list_columns_desktop ?? 1;

  // Mobile preferences
  const viewModeMobile = preferences?.view_mode_mobile ?? "card";
  const cardColumnsMobile = preferences?.card_columns_mobile ?? 1;
  const listColumnsMobile = preferences?.list_columns_mobile ?? 1;

  // Current platform values
  const viewMode = isMobile ? viewModeMobile : viewModeDesktop;
  const cardColumns = isMobile ? cardColumnsMobile : cardColumnsDesktop;
  const listColumns = isMobile ? listColumnsMobile : listColumnsDesktop;

  const setViewMode = (mode: "card" | "list") => {
    if (isMobile) {
      updatePreferences.mutate({ view_mode_mobile: mode });
    } else {
      updatePreferences.mutate({ view_mode_desktop: mode });
    }
  };

  const setCardColumns = (columns: number) => {
    if (isMobile) {
      updatePreferences.mutate({ card_columns_mobile: columns });
    } else {
      updatePreferences.mutate({ card_columns_desktop: columns });
    }
  };

  const setListColumns = (columns: number) => {
    if (isMobile) {
      updatePreferences.mutate({ list_columns_mobile: columns });
    } else {
      updatePreferences.mutate({ list_columns_desktop: columns });
    }
  };

  return {
    viewMode,
    cardColumns,
    listColumns,
    setViewMode,
    setCardColumns,
    setListColumns,
    isLoading: updatePreferences.isPending,
  };
}
