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
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Search, Filter, Plus, Clock, AlertCircle, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function AssignmentsPage() {
  const assignments = [
    {
      id: 1,
      title: "React Component Assignment",
      course: "React Fundamentals",
      dueDate: "Dec 15, 2024",
      status: "Pending",
      priority: "High",
      description: "Build a todo app with React hooks",
    },
    {
      id: 2,
      title: "DSA Problem Set #5",
      course: "Data Structures & Algorithms",
      dueDate: "Dec 18, 2024",
      status: "Submitted",
      priority: "Medium",
      description: "Solve 10 problems related to graphs",
    },
    {
      id: 3,
      title: "JavaScript Quiz",
      course: "Advanced JavaScript",
      dueDate: "Dec 20, 2024",
      status: "Pending",
      priority: "High",
      description: "Online quiz covering async/await and promises",
    },
    {
      id: 4,
      title: "Final Project Proposal",
      course: "Web Development",
      dueDate: "Dec 25, 2024",
      status: "Not Started",
      priority: "Critical",
      description: "Submit project proposal and implementation plan",
    },
  ]

  const getStatusIcon = (status: string) => {
    if (status === "Submitted") return <CheckCircle className="h-4 w-4 text-green-500" />
    if (status === "Pending") return <Clock className="h-4 w-4 text-orange-500" />
    return <AlertCircle className="h-4 w-4 text-red-500" />
  }

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
                  <BreadcrumbPage>Assignments</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Assignments</h1>
              <p className="text-muted-foreground mt-1">Track and manage your course assignments</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              New Assignment
            </Button>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search assignments..." className="pl-9" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="space-y-3">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="pt-1">{getStatusIcon(assignment.status)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">{assignment.course}</p>
                          <p className="text-sm text-muted-foreground mt-1">{assignment.description}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge
                            variant="secondary"
                            className={
                              assignment.priority === "Critical"
                                ? "bg-red-100 text-red-700"
                                : assignment.priority === "High"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-blue-100 text-blue-700"
                            }
                          >
                            {assignment.priority}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          Due: {assignment.dueDate}
                        </span>
                        <Badge
                          variant="outline"
                          className={
                            assignment.status === "Submitted"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : assignment.status === "Pending"
                                ? "bg-orange-50 text-orange-700 border-orange-200"
                                : "bg-red-50 text-red-700 border-red-200"
                          }
                        >
                          {assignment.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                      View Details
                    </Button>
                    {assignment.status !== "Submitted" && (
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700" size="sm">
                        Submit
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
