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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { BarChart3, TrendingUp, Award, Zap, Download } from "lucide-react"

export default function ProgressPage() {
  const stats = [
    { label: "Overall Progress", value: "72%", icon: TrendingUp, color: "text-blue-600" },
    { label: "DSA Problems Solved", value: "156", icon: Zap, color: "text-purple-600" },
    { label: "Courses Completed", value: "3/8", icon: Award, color: "text-green-600" },
    { label: "Current Streak", value: "12 days", icon: TrendingUp, color: "text-orange-600" },
  ]

  const courseProgress = [
    { name: "React Fundamentals", progress: 85, lessons: "12/12", tests: "3/3" },
    { name: "Data Structures", progress: 60, lessons: "9/15", tests: "2/5" },
    { name: "Advanced JavaScript", progress: 45, lessons: "7/16", tests: "1/4" },
    { name: "Web Design Basics", progress: 100, lessons: "10/10", tests: "4/4" },
  ]

  const weeklyActivity = [
    { day: "Mon", hours: 2 },
    { day: "Tue", hours: 3 },
    { day: "Wed", hours: 2.5 },
    { day: "Thu", hours: 4 },
    { day: "Fri", hours: 3 },
    { day: "Sat", hours: 2 },
    { day: "Sun", hours: 1.5 },
  ]

  const maxHours = Math.max(...weeklyActivity.map((d) => d.hours))

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
                  <BreadcrumbPage>Progress</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Your Progress</h1>
              <p className="text-muted-foreground mt-1">Track your learning journey</p>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-2 h-32">
                {weeklyActivity.map((day) => (
                  <div key={day.day} className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-full bg-gray-200 rounded-t flex-1 relative">
                      <div
                        className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t absolute bottom-0"
                        style={{ height: `${(day.hours / maxHours) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground">{day.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {courseProgress.map((course, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm">{course.name}</h3>
                    <Badge variant="secondary">{course.progress}%</Badge>
                  </div>
                  <Progress value={course.progress} className="mb-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{course.lessons} lessons</span>
                    <span>{course.tests} tests</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
