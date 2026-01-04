"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  BookOpen01Icon,
  BriefcaseIcon,
  CodeIcon,
  Globe02Icon,
  FavouriteIcon,
  ImageIcon,
  Mail01Icon,
  MusicNote02Icon,
  PlayCircle02Icon,
  ShoppingCart01Icon,
  StarIcon,
  Target01Icon,
  UserIcon,
  Folder01Icon,
  Link01Icon,
  File02Icon,
  GameController01Icon,
  NewsIcon,
  Robot01Icon,
  GithubIcon,
  VisualStudioCodeIcon,
  SpotifyIcon,
} from "@hugeicons/core-free-icons";

// Type for icons
type IconType = typeof Folder01Icon;

// Popular icons for bookmark categories
export const CATEGORY_ICONS: { name: string; icon: IconType }[] = [
  { name: "folder", icon: Folder01Icon },
  { name: "link", icon: Link01Icon },
  { name: "home", icon: Home01Icon },
  { name: "book", icon: BookOpen01Icon },
  { name: "briefcase", icon: BriefcaseIcon },
  { name: "code", icon: CodeIcon },
  { name: "globe", icon: Globe02Icon },
  { name: "heart", icon: FavouriteIcon },
  { name: "image", icon: ImageIcon },
  { name: "mail", icon: Mail01Icon },
  { name: "music", icon: MusicNote02Icon },
  { name: "play", icon: PlayCircle02Icon },
  { name: "shopping", icon: ShoppingCart01Icon },
  { name: "star", icon: StarIcon },
  { name: "target", icon: Target01Icon },
  { name: "user", icon: UserIcon },
  { name: "document", icon: File02Icon },
  { name: "game", icon: GameController01Icon },
  { name: "news", icon: NewsIcon },
  { name: "ai", icon: Robot01Icon },
  { name: "github", icon: GithubIcon },
  { name: "stackoverflow", icon: VisualStudioCodeIcon },
  { name: "spotify", icon: SpotifyIcon },
];

// Get icon by name
export function getCategoryIcon(iconName: string): IconType {
  const found = CATEGORY_ICONS.find((i) => i.name === iconName);
  return found?.icon || Folder01Icon;
}

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {CATEGORY_ICONS.map(({ name, icon }) => (
        <button
          key={name}
          type="button"
          onClick={() => onChange(name)}
          aria-label={`Select ${name} icon`}
          title={`Select ${name} icon`}
          className={`flex h-10 w-10 items-center justify-center border transition-colors ${
            value === name
              ? "border-primary bg-primary/10 text-primary"
              : "border-border hover:bg-accent"
          }`}
        >
          <HugeiconsIcon icon={icon} className="h-5 w-5" />
        </button>
      ))}
    </div>
  );
}
