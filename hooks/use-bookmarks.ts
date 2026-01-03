import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  BookmarkWithCategory,
  BookmarkInsert,
  BookmarkUpdate,
} from "@/lib/supabase/types";

export function useBookmarks(categoryId?: string) {
  return useQuery({
    queryKey: ["bookmarks", categoryId],
    queryFn: async () => {
      const url = categoryId
        ? `/api/bookmarks?category=${categoryId}`
        : "/api/bookmarks";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch bookmarks");
      return res.json() as Promise<BookmarkWithCategory[]>;
    },
  });
}

export function useCreateBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BookmarkInsert) => {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create bookmark");
      return res.json() as Promise<BookmarkWithCategory>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
}

export function useUpdateBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: BookmarkUpdate & { id: string }) => {
      const res = await fetch(`/api/bookmarks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update bookmark");
      return res.json() as Promise<BookmarkWithCategory>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
}

export function useDeleteBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/bookmarks/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete bookmark");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
}
