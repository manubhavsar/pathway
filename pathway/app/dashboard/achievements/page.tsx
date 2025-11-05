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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Trophy, Star, Zap, Lock } from "lucide-react"

export default function AchievementsPage() {
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first course module",
      icon: Star,
      earned: true,
      progress: 100,
    },
    {
      id: 2,
      title: "DSA Master",
      description: "Solve 100 DSA problems",
      icon: Trophy,
      earned: true,
      progress: 75,
    },
    {
      id: 3,
      title: "Night Owl",
      description: "Study after 11 PM",
      icon: Zap,
      earned: false,
      progress: 0,
    },
    {
      id: 4,
      title: "Speed Runner",
      description: "Solve 5 problems in one day",
      icon: Zap,
      earned: true,
      progress: 100,
    },
    {
      id: 5,
      title: "Collaboration Expert",
      description: "Join 5 study groups",
      icon: Trophy,
      earned: false,
      progress: 40,
    },
    {
      id: 6,
      title: "Interview Ready",
      description: "Complete interview prep course",
      icon: Trophy,
      earned: false,
      progress: 25,
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
                  <BreadcrumbPage>Achievements</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div>
            <h1 className="text-3xl font-bold">Achievements</h1>
            <p className="text-muted-foreground mt-1">Earn badges as you progress through your journey</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">24</div>
                  <p className="text-sm text-muted-foreground">Badges Earned</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">6</div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">12</div>
                  <p className="text-sm text-muted-foreground">Locked</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">75%</div>
                  <p className="text-sm text-muted-foreground">Completion</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <Card
                  key={achievement.id}
                  className={`hover:shadow-md transition-all ${
                    achievement.earned ? "border-yellow-200 bg-yellow-50/30" : "opacity-60"
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-lg ${
                          achievement.earned ? "bg-yellow-200 text-yellow-700" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {achievement.earned ? <Icon className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        {!achievement.earned && achievement.progress > 0 && (
                          <>
                            <div className="flex items-center justify-between mt-2 text-xs">
                              <span>Progress</span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <Progress value={achievement.progress} className="mt-1" />
                          </>
                        )}
                        {achievement.earned && <Badge className="mt-2 bg-yellow-600 text-white">Earned</Badge>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
