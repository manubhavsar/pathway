"use client"

import type React from "react"
import Link from "next/link" // <-- 1. Import Link
import { usePathname } from "next/navigation" // <-- 2. Import usePathname

import {
  BookOpen,
  Bot,
  Calendar,
  ChevronUp,
  Code2,
  GraduationCap,
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

// This is sample user data
const userData = {
  name: "Alex Johnson",
  email: "alex@student.edu",
  avatar: "/placeholder.svg?height=32&width=32",
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname() // <-- 4. Get the current page's URL

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-sidebar-primary-foreground">
            <GraduationCap className="size-4 text-white" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Pathway</span>
            <span className="truncate text-xs text-muted-foreground">Student Portal</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {/* --- 5. I wrapped this in a <Link> component --- */}
            {navMain.map((item) => (
              <Link key={item.title} href={item.url} passHref>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={pathname === item.url} // <-- Make the active link work
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
              <Link key={item.title} href={item.url} passHref>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={item.title}
                    size="sm"
                    isActive={pathname === item.url} // <-- Make the active link work
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
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                    <AvatarFallback className="rounded-lg">AJ</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{userData.name}</span>
                    <span className="truncate text-xs">{userData.email}</span>
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
                      <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                      <AvatarFallback className="rounded-lg">AJ</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{userData.name}</span>
                      <span className="truncate text-xs">{userData.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User2 />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings2 />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}