"use client"

import type React from "react"
import Link from "next/link" // <-- 1. Import Link
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useUser } from "@/contexts/UserContext"

import {
  BookOpen,
  Bot,
  Calendar,
  ChevronUp,
  Code2,
  Home,
  Briefcase,
  Users,
  Trophy,
  Settings2,
  User2,
  Bell,
  FileText,
  BarChart3,
  MessageSquare,
  LogOut,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// --- 3. I updated all the URLs here ---
const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard", // <-- Fixed URL
    icon: Home,
  },
  {
    title: "Assignments",
    url: "/dashboard/assignments", // <-- Fixed URL
    icon: FileText,
  },
  {
    title: "Progress",
    url: "/dashboard/progress", // <-- Fixed URL
    icon: BarChart3,
  },
  {
    title: "Achievements",
    url: "/dashboard/achievements", // <-- Fixed URL
    icon: Trophy,
  },
  {
    title: "Internships",
    url: "/dashboard/internships", // <-- Fixed URL
    icon: Briefcase,
  },
  {
    title: "DSA Library",
    url: "/dashboard/dsa-library", // <-- Fixed URL
    icon: Code2,
  },
  {
    title: "Study Groups",
    url: "/dashboard/study-groups", // <-- Fixed URL
    icon: Users,
  },
  {
    title: "Calendar",
    url: "/dashboard/calendar", // <-- Fixed URL
    icon: Calendar,
  },
  {
    title: "AI Tutor",
    url: "/dashboard/ai-tutor", // <-- Fixed URL
    icon: Bot,
  },
]

const navSecondary = [
  {
    title: "My Courses",
    url: "/dashboard/my-courses", // <-- Fixed URL
    icon: BookOpen,
  },
  {
    title: "Messages",
    url: "/dashboard/messages", // <-- Fixed URL
    icon: MessageSquare,
  },
  {
    title: "Settings",
    url: "/dashboard/settings", // <-- Fixed URL
    icon: Settings2,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname() 
  
  // --- 3. Get live user data and logout function from context ---
  const { user, logout, isLoading } = useUser();

  // 4. Get user initials
  const initials = user?.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "??";

  // Don't show the footer if data is still loading or no user
  const userFooter = !isLoading && user && (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              {/* Using a placeholder for avatar, you can update this later */}
              <AvatarImage src={"/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
            <ChevronUp className="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          side="bottom"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={"/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User2 className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings2 className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2">
          {/* --- 5. LOGO FIX --- */}
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
            {/* Make sure you have 'icon.png' in your 'public/' folder */}
            <Image 
              src="/icon.png" 
              alt="Pathway Logo" 
              width={24} 
              height={24} 
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Pathway</span>
            <span className="truncate text-xs text-muted-foreground">Student Portal</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {/* --- 6. LINKS FIX --- */}
            {navMain.map((item) => (
              <Link key={item.title} href={item.url} passHref legacyBehavior>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={pathname === item.url} 
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
          <SidebarMenu>
            {navSecondary.map((item) => (
              <Link key={item.title} href={item.url} passHref legacyBehavior>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={item.title}
                    size="sm"
                    isActive={pathname === item.url} 
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {/* 7. Render the dynamic user footer */}
          {userFooter}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}