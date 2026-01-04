"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignIcon,
  Home01Icon,
  LogoutIcon,
  Settings01Icon,
  Edit02Icon,
  Delete02Icon,
  MoreVerticalIcon,
} from "@hugeicons/core-free-icons";
import { useTheme } from "next-themes";
import { toast } from "sonner";

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
  SidebarMenuAction,
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
import { useCategories, useDeleteCategory } from "@/hooks/use-categories";
import { getCategoryIcon } from "@/components/dashboard/icon-picker";
import { AddCategorySheet } from "@/components/dashboard/add-category-sheet";
import { EditCategorySheet } from "@/components/dashboard/edit-category-sheet";
import type { Category } from "@/lib/supabase/types";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("category");
  const { state } = useSidebar();
  const { setTheme, theme } = useTheme();

  const { data: categories = [], isLoading } = useCategories();
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const deleteCategory = useDeleteCategory();

  const isCollapsed = state === "collapsed";

  const handleDeleteCategory = async (id: string, name: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${name}"? Bookmarks in this category will become uncategorized.`
      )
    ) {
      return;
    }

    try {
      await deleteCategory.mutateAsync(id);
      toast.success("Category deleted successfully");
      if (currentCategoryId === id) {
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

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
        <SidebarHeader className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                onClick={() => router.push("/dashboard")}
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground [&_svg]:size-auto"
              >
                <MindCaveLogo width={32} height={32} className="shrink-0" />
                <span className="truncate font-bold text-lg group-data-[collapsible=icon]:hidden">
                  Mind Cave
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Library</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => router.push("/dashboard")}
                    isActive={pathname === "/dashboard" && !currentCategoryId}
                    tooltip="All Bookmarks"
                  >
                    <HugeiconsIcon icon={Home01Icon} className="h-4 w-4" />
                    <span>All Bookmarks</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

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
                        onClick={() =>
                          router.push(`/dashboard?category=${category.id}`)
                        }
                        isActive={currentCategoryId === category.id}
                        tooltip={category.name}
                      >
                        <HugeiconsIcon
                          icon={getCategoryIcon(category.icon)}
                          className="h-4 w-4"
                          style={
                            category.color
                              ? { color: category.color }
                              : undefined
                          }
                        />
                        <span>{category.name}</span>
                      </SidebarMenuButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={<SidebarMenuAction showOnHover />}
                        >
                          <HugeiconsIcon
                            icon={MoreVerticalIcon}
                            className="h-4 w-4"
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" align="start">
                          <DropdownMenuItem
                            onClick={() => setEditingCategory(category)}
                          >
                            <HugeiconsIcon
                              icon={Edit02Icon}
                              className="mr-2 h-4 w-4"
                            />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              handleDeleteCategory(category.id, category.name)
                            }
                            className="text-destructive focus:text-destructive"
                          >
                            <HugeiconsIcon
                              icon={Delete02Icon}
                              className="mr-2 h-4 w-4"
                            />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
                      className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center"
                    />
                  }
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.avatar_url} alt={user.name} />
                    <AvatarFallback className="text-xs">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-xs leading-tight group-data-[collapsible=icon]:hidden">
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
      <EditCategorySheet
        open={!!editingCategory}
        onOpenChange={(open) => !open && setEditingCategory(null)}
        category={editingCategory}
      />
    </>
  );
}
