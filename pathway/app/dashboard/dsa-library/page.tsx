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
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Search, Filter, Play, CheckCircle, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function DSALibraryPage() {
  const problems = [
    {
      id: 1,
      title: "Two Sum",
      category: "Array",
      difficulty: "Easy",
      status: "Solved",
      attempts: 1,
      timeLimit: "3 min",
    },
    {
      id: 2,
      title: "Valid Parentheses",
      category: "String, Stack",
      difficulty: "Easy",
      status: "Solving",
      attempts: 2,
      timeLimit: "2 min",
    },
    {
      id: 3,
      title: "Binary Tree Inorder",
      category: "Tree, DFS",
      difficulty: "Medium",
      status: "Attempted",
      attempts: 3,
      timeLimit: "5 min",
    },
    {
      id: 4,
      title: "Longest Substring",
      category: "String, Hash Map",
      difficulty: "Medium",
      status: "Todo",
      attempts: 0,
      timeLimit: "4 min",
    },
    {
      id: 5,
      title: "Merge K Lists",
      category: "Linked List, Heap",
      difficulty: "Hard",
      status: "Todo",
      attempts: 0,
      timeLimit: "6 min",
    },
  ]

  const stats = [
    { label: "Easy", count: 156, color: "bg-green-50 text-green-600" },
    { label: "Medium", count: 89, color: "bg-yellow-50 text-yellow-600" },
    { label: "Hard", count: 23, color: "bg-red-50 text-red-600" },
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
                  <BreadcrumbPage>DSA Library</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div>
            <h1 className="text-3xl font-bold">DSA Library</h1>
            <p className="text-muted-foreground mt-1">Master data structures and algorithms with curated problems</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.count}</div>
                  <p className="text-xs text-muted-foreground">problems available</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search problems..." className="pl-9" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="space-y-3">
            {problems.map((problem) => (
              <Card key={problem.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        {problem.status === "Solved" && (
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        )}
                        {problem.status === "Solving" && <Play className="h-5 w-5 text-blue-500 flex-shrink-0" />}
                        {problem.status === "Attempted" && <Zap className="h-5 w-5 text-orange-500 flex-shrink-0" />}
                        {problem.status === "Todo" && (
                          <div className="h-5 w-5 border-2 border-gray-300 rounded flex-shrink-0" />
                        )}
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold truncate">{problem.title}</h3>
                          <p className="text-sm text-muted-foreground">{problem.category}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right hidden sm:block">
                        <Badge
                          variant="secondary"
                          className={
                            problem.difficulty === "Easy"
                              ? "bg-green-100 text-green-700"
                              : problem.difficulty === "Medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }
                        >
                          {problem.difficulty}
                        </Badge>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        {problem.status === "Solved" ? "Review" : "Solve"}
                      </Button>
                    </div>
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
