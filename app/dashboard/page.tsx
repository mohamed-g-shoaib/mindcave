"use client";

import { BookmarkCard } from "@/components/dashboard/bookmark-card";

export default function DashboardPage() {
  // Mock data for demonstration
  const mockBookmarks = [
    {
      id: "1",
      user_id: "user",
      title: "Next.js Documentation",
      description:
        "The official Next.js documentation with guides and API reference",
      url: "https://nextjs.org/docs",
      og_image_url: null,
      media_type: null,
      media_embed_id: null,
      category_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: null,
    },
  ];

  const handleEdit = (id: string) => {
    console.log("Edit bookmark:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete bookmark:", id);
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    // TODO: Show toast notification
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Bookmarks</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your saved links and resources
        </p>
      </div>

      {mockBookmarks.length === 0 ? (
        <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <h3 className="text-lg font-semibold">No bookmarks yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get started by adding your first bookmark
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockBookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark.id}
              bookmark={bookmark}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onCopy={handleCopy}
            />
          ))}
        </div>
      )}
    </div>
  );
}
