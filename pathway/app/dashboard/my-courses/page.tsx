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
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { BookOpen, Search, Filter, Plus, Clock, Users, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function MyCoursesPage() {
  const courses = [
    {
      id: 1,
      title: "React Fundamentals",
      instructor: "Sarah Johnson",
      progress: 85,
      students: 1250,
      nextDeadline: "Dec 15",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      instructor: "Mike Chen",
      progress: 60,
      students: 890,
      nextDeadline: "Dec 18",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Advanced JavaScript",
      instructor: "Emma Wilson",
      progress: 45,
      students: 2100,
      nextDeadline: "Dec 22",
      status: "In Progress",
    },
    {
      id: 4,
      title: "Web Design Basics",
      instructor: "John Davis",
      progress: 100,
      students: 560,
      nextDeadline: "Completed",
      status: "Completed",
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
                  <BreadcrumbPage>My Courses</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Courses</h1>
              <p className="text-muted-foreground mt-1">Manage and track your enrolled courses</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Enroll in Course
            </Button>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search courses..." className="pl-9" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        {course.title}
                      </CardTitle>
                      <CardDescription>{course.instructor}</CardDescription>
                    </div>
                    <Badge
                      variant={course.status === "Completed" ? "secondary" : "default"}
                      className={course.status === "Completed" ? "bg-green-100 text-green-700" : ""}
                    >
                      {course.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} />
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{course.nextDeadline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>12 lessons</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                      View Course
                    </Button>
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700" size="sm">
                      Continue Learning
                    </Button>
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
