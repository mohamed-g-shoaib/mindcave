import { HugeiconsIcon } from "@hugeicons/react";
import {
  Link01Icon,
  Edit02Icon,
  Delete02Icon,
  Copy01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import type { BookmarkWithCategory } from "@/lib/supabase/types";

interface BookmarkCardProps {
  bookmark: BookmarkWithCategory;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCopy: (url: string) => void;
}

export function BookmarkCard({
  bookmark,
  onEdit,
  onDelete,
  onCopy,
}: BookmarkCardProps) {
  const handleOpen = () => {
    window.open(bookmark.url, "_blank", "noopener,noreferrer");
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-md">
      {/* OG Image */}
      {bookmark.og_image_url ? (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={bookmark.og_image_url}
            alt={bookmark.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-video w-full bg-muted flex items-center justify-center">
          <HugeiconsIcon
            icon={Link01Icon}
            className="h-12 w-12 text-muted-foreground"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold line-clamp-2">{bookmark.title}</h3>
        {bookmark.description && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {bookmark.description}
          </p>
        )}

        {/* Category Badge */}
        {bookmark.category && (
          <div className="mt-3">
            <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {bookmark.category.name}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex items-center gap-2">
          <Button onClick={handleOpen} size="sm" className="flex-1">
            Open
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(bookmark.id)}
            title="Edit"
          >
            <HugeiconsIcon icon={Edit02Icon} className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onCopy(bookmark.url)}
            title="Copy Link"
          >
            <HugeiconsIcon icon={Copy01Icon} className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(bookmark.id)}
            title="Delete"
          >
            <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
