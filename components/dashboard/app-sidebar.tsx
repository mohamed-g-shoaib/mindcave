"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignIcon,
  Home01Icon,
  LogoutIcon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { useTheme } from "next-themes";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import MindCaveLogo from "@/components/mind-cave-logo";
import { useCategories } from "@/hooks/use-categories";
import { getCategoryIcon } from "@/components/dashboard/icon-picker";
import { AddCategorySheet } from "@/components/dashboard/add-category-sheet";

interface AppSidebarProps {
  user: {
    id: string;
    email: string;
    name: string;
    avatar_url?: string;
  };
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("category");
  const { state } = useSidebar();
  const { setTheme, theme } = useTheme();

  const { data: categories = [], isLoading } = useCategories();
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);

  const isCollapsed = state === "collapsed";

  const handleSignOut = async () => {
    const res = await fetch("/api/auth/signout", { method: "POST" });
    if (res.ok) {
      window.location.href = "/";
    }
  };

  return (
    <>
      <Sidebar collapsible="icon">
        {/* Header with Logo */}
        <SidebarHeader className="border-b">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                render={<Link href="/dashboard" />}
                tooltip="Mind Cave"
              >
                <MindCaveLogo className="h-6 w-6 shrink-0" />
                <span className="font-bold">Mind Cave</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={<Link href="/dashboard" />}
                    isActive={pathname === "/dashboard" && !currentCategoryId}
                    tooltip="All Bookmarks"
                  >
                    <HugeiconsIcon icon={Home01Icon} className="h-4 w-4" />
                    <span>All Bookmarks</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          {/* Categories */}
          <SidebarGroup>
            <SidebarGroupLabel>Categories</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {isLoading ? (
                  <>
                    {[1, 2, 3].map((i) => (
                      <SidebarMenuItem key={i}>
                        <div className="flex items-center gap-2 px-2 py-1.5">
                          <Skeleton className="h-4 w-4" />
                          {!isCollapsed && <Skeleton className="h-4 w-24" />}
                        </div>
                      </SidebarMenuItem>
                    ))}
                  </>
                ) : (
                  categories.map((category) => (
                    <SidebarMenuItem key={category.id}>
                      <SidebarMenuButton
                        render={
                          <Link href={`/dashboard?category=${category.id}`} />
                        }
                        isActive={currentCategoryId === category.id}
                        tooltip={category.name}
                      >
                        <HugeiconsIcon
                          icon={getCategoryIcon(category.icon)}
                          className="h-4 w-4"
                        />
                        <span>{category.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                )}

                {/* Add Category Button */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setAddCategoryOpen(true)}
                    tooltip="Add Category"
                  >
                    <HugeiconsIcon icon={PlusSignIcon} className="h-4 w-4" />
                    <span>Add Category</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer with User Menu */}
        <SidebarFooter className="border-t">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <SidebarMenuButton
                      size="lg"
                      tooltip={user.name}
                      className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
                    />
                  }
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.avatar_url} alt={user.name} />
                    <AvatarFallback className="text-xs">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-xs leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  side={isCollapsed ? "right" : "top"}
                  align="start"
                  sideOffset={8}
                >
                  <div className="px-2 py-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    <HugeiconsIcon
                      icon={Settings01Icon}
                      className="mr-2 h-4 w-4"
                    />
                    Toggle Theme
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <HugeiconsIcon icon={LogoutIcon} className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <AddCategorySheet
        open={addCategoryOpen}
        onOpenChange={setAddCategoryOpen}
      />
    </>
  );
}
