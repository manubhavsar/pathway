"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Users, Search, Filter, Plus, MessageSquare, User } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function StudyGroupsPage() {
  const groups = [
    {
      id: 1,
      name: "Web Dev Study Group",
      topic: "React & Web Development",
      members: 8,
      active: "5 online",
      lastMessage: "2 hours ago",
      status: "Joined",
    },
    {
      id: 2,
      name: "DSA Bootcamp",
      topic: "Data Structures & Algorithms",
      members: 15,
      active: "12 online",
      lastMessage: "10 minutes ago",
      status: "Joined",
    },
    {
      id: 3,
      name: "Internship Prep Group",
      topic: "Interview Preparation",
      members: 12,
      active: "8 online",
      lastMessage: "1 hour ago",
      status: "Joined",
    },
    {
      id: 4,
      name: "JavaScript Masters",
      topic: "Advanced JavaScript",
      members: 20,
      active: "14 online",
      lastMessage: "5 minutes ago",
      status: "Join",
    },
    {
      id: 5,
      name: "Frontend Experts",
      topic: "Frontend Development",
      members: 18,
      active: "11 online",
      lastMessage: "30 minutes ago",
      status: "Join",
    },
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Study Groups</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Study Groups</h1>
              <p className="text-muted-foreground mt-1">Connect and collaborate with peers</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Group
            </Button>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search groups..." className="pl-9" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="grid gap-4">
            {groups.map((group) => (
              <Card key={group.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-purple-600" />
                        {group.name}
                      </CardTitle>
                      <CardDescription className="mt-1">{group.topic}</CardDescription>
                    </div>
                    <Badge
                      variant={group.status === "Joined" ? "default" : "secondary"}
                      className={group.status === "Joined" ? "bg-green-100 text-green-700" : ""}
                    >
                      {group.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {group.members} members
                      </span>
                      <span className="text-green-600 font-semibold">{group.active}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      {group.lastMessage}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                      View Group
                    </Button>
                    {group.status === "Joined" ? (
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700" size="sm">
                        Open Chat
                      </Button>
                    ) : (
                      <Button className="flex-1 bg-purple-600 hover:bg-purple-700" size="sm">
                        Join Group
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
