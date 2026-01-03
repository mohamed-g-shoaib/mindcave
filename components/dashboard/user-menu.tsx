"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Settings01Icon,
  Logout03Icon,
  Moon02Icon,
  Sun03Icon,
} from "@hugeicons/core-free-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import type { User } from "@supabase/supabase-js";

interface UserMenuProps {
  isExpanded: boolean;
}

export function UserMenu({ isExpanded }: UserMenuProps) {
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!isExpanded) {
    return (
      <div className="border-t p-4">
        <div className="mx-auto h-8 w-8 rounded-full bg-primary" />
      </div>
    );
  }

  return (
    <div className="relative border-t p-4">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-accent"
      >
        <div className="h-8 w-8 rounded-full bg-primary shrink-0" />
        <div className="flex-1 text-sm text-left min-w-0">
          <p className="font-medium truncate">
            {user?.user_metadata?.full_name || "User"}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {user?.email}
          </p>
        </div>
      </button>

      {dropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setDropdownOpen(false)}
          />
          <div className="absolute bottom-full left-4 right-4 z-50 mb-2 rounded-lg border bg-popover p-2 shadow-lg">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <HugeiconsIcon
                icon={theme === "dark" ? Sun03Icon : Moon02Icon}
                className="h-4 w-4"
              />
              <span>{theme === "dark" ? "Light" : "Dark"} Mode</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => router.push("/settings")}
            >
              <HugeiconsIcon icon={Settings01Icon} className="h-4 w-4" />
              <span>Settings</span>
            </Button>
            <hr className="my-2" />
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive"
              onClick={handleSignOut}
            >
              <HugeiconsIcon icon={Logout03Icon} className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
