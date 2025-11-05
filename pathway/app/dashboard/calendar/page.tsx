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
import { Clock, MapPin, Plus, ChevronLeft, ChevronRight } from "lucide-react"

export default function CalendarPage() {
  const events = [
    {
      id: 1,
      title: "React Workshop",
      date: "Dec 15, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Online",
      type: "Workshop",
    },
    {
      id: 2,
      title: "DSA Mock Interview",
      date: "Dec 16, 2024",
      time: "3:30 PM - 4:30 PM",
      location: "Zoom",
      type: "Interview",
    },
    {
      id: 3,
      title: "Web Dev Study Group",
      date: "Dec 17, 2024",
      time: "7:00 PM - 8:30 PM",
      location: "Discord",
      type: "Study",
    },
    {
      id: 4,
      title: "Career Fair",
      date: "Dec 18, 2024",
      time: "10:00 AM - 6:00 PM",
      location: "Campus Hall",
      type: "Event",
    },
  ]

  const days = Array.from({ length: 42 }, (_, i) => {
    const date = new Date(2024, 11, 1)
    date.setDate(date.getDate() + i - (date.getDay() || 7) + 1)
    return date
  })

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
                  <BreadcrumbPage>Calendar</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Calendar</h1>
              <p className="text-muted-foreground mt-1">Manage your academic schedule</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>December 2024</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center font-semibold text-sm py-2">
                      {day}
                    </div>
                  ))}
                  {days.map((day, i) => (
                    <div
                      key={i}
                      className={`p-2 text-center rounded-lg text-sm ${
                        day.getMonth() === 11 ? "bg-white hover:bg-blue-50 cursor-pointer" : "bg-gray-50 text-gray-400"
                      }`}
                    >
                      {day.getDate()}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex gap-3 pb-3 border-b last:border-0">
                    <div className="pt-1">
                      <Badge variant="secondary" className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{event.title}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
