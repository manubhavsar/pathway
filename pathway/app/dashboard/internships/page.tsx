
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
import { Briefcase, MapPin, Clock, Star, Search, Filter, Plus, DollarSign, Users } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function InternshipsPage() {
  const internships = [
    {
      id: 1,
      title: "Software Engineering Intern",
      company: "Google",
      location: "Mountain View, CA",
      type: "Remote",
      duration: "3 months",
      rating: 4.8,
      salary: "$25/hr",
      applicants: 1250,
      status: "Open",
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "Microsoft",
      location: "Seattle, WA",
      type: "Hybrid",
      duration: "6 months",
      rating: 4.9,
      salary: "$28/hr",
      applicants: 890,
      status: "Open",
    },
    {
      id: 3,
      title: "Frontend Developer Intern",
      company: "Meta",
      location: "Menlo Park, CA",
      type: "On-site",
      duration: "4 months",
      rating: 4.7,
      salary: "$26/hr",
      applicants: 2100,
      status: "Open",
    },
    {
      id: 4,
      title: "Backend Engineer Intern",
      company: "Amazon",
      location: "Seattle, WA",
      type: "Remote",
      duration: "3 months",
      rating: 4.6,
      salary: "$27/hr",
      applicants: 560,
      status: "Applied",
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
                  <BreadcrumbPage>Internships</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Internships</h1>
              <p className="text-muted-foreground mt-1">Discover and apply to internship opportunities</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Post Internship
            </Button>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search internships..." className="pl-9" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="grid gap-4">
            {internships.map((internship) => (
              <Card key={internship.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-blue-600" />
                        {internship.title}
                      </CardTitle>
                      <CardDescription className="mt-1">{internship.company}</CardDescription>
                    </div>
                    <Badge
                      variant={internship.status === "Applied" ? "secondary" : "default"}
                      className={internship.status === "Applied" ? "bg-green-100 text-green-700" : ""}
                    >
                      {internship.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{internship.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>{internship.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{internship.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{internship.applicants} applicants</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                      View Details
                    </Button>
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700" size="sm">
                      Apply Now
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
