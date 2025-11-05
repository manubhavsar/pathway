"use client"

// --- 1. Import React hooks ---
import { useState, useEffect } from "react" 

import { AppSidebar } from "../../components/app-sidebar" // Using your provided path
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
import {
  Briefcase,
  Code2,
  Users,
  Trophy,
  Calendar,
  Clock,
  TrendingUp,
  Star,
  MapPin,
  Building,
  ArrowRight,
  Play,
  CheckCircle,
  AlertCircle,
  Plus,
} from "lucide-react"

// --- 2. Define a type for your Internship data ---
interface Internship {
  _id: string; // MongoDB uses _id
  title: string;
  company: string;
  location: string;
  type: 'Remote' | 'Hybrid' | 'On-site';
  duration?: string;
  rating?: number;
  companyLogo?: string; // We had this in the model
}

export default function DashboardPage() {
  // --- 3. Set up state to hold your data ---
  const [internships, setInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- 4. Fetch data from your API when the page loads ---
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        // --- THIS IS THE CORRECTED LINE ---
        // It points to your live Render backend and disables caching
        const response = await fetch('https://pathway-backend.onrender.com/api/internships', { cache: 'no-store' });
        // ------------------------------------

        if (!response.ok) {
          throw new Error('Failed to fetch internships');
        }
        const data = await response.json();
        setInternships(data); // Store the data in state
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchInternships();
  }, []); // The empty [] array means this runs once on component mount

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* ... (Header and Welcome sections are unchanged) ... */}
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Student Portal</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Welcome Section */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white md:col-span-2">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Welcome back, Alex! 👋</h1>
                  <p className="text-blue-100 mb-4">
                    Ready to continue your learning journey? You have 3 assignments due this week.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    View Assignments
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Study Plan
                  </Button>
                </div>
              </div>
            </div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">Course completion</p>
                <Progress value={87} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions (unchanged) */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* ... (Your 4 quick action cards) ... */}
             <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Internships</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">New opportunities</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">DSA Problems</CardTitle>
                <Code2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">Solved this month</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Groups</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Active groups</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">Badges earned</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* --- 5. Modified Internships Section --- */}
            <Card className="lg:col-span-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Latest Internships
                    </CardTitle>
                    <CardDescription>Discover new opportunities that match your skills</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Show loading message */}
                {isLoading && <p>Loading opportunities...</p>}

                {/* Show message if no internships are found */}
                {!isLoading && internships.length === 0 && (
                  <p>No internships found. Check back later!</p>
                )}

                {/* Map over the internships data and render
                    This replaces your static blocks! */}
                {!isLoading && internships.map((internship) => (
                  <div key={internship._id} className="flex items-start space-x-4 p-3 rounded-lg border">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{internship.title}</h4>
                        <Badge variant="secondary">{internship.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{internship.company} • {internship.location}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {internship.type}
                        </span>
                        {internship.duration && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {internship.duration}
                          </span>
                        )}
                        {internship.rating && internship.rating > 0 && (
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {internship.rating}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button size="sm">Apply</Button>
                  </div>
                ))}
                
              </CardContent>
            </Card>

            {/* DSA Library Section (still static) */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Code2 className="h-5 w-5" />
                      DSA Library
                    </CardTitle>
                    <CardDescription>Practice coding problems</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* ... (all your static DSA content remains here) ... */}
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-3 rounded-lg bg-green-50">
                      <div className="text-lg font-bold text-green-600">156</div>
                      <div className="text-xs text-green-600">Easy</div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-50">
                      <div className="text-lg font-bold text-yellow-600">89</div>
                      <div className="text-xs text-yellow-600">Medium</div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-50">
                      <div className="text-lg font-bold text-red-600">23</div>
                      <div className="text-xs text-red-600">Hard</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <div>
                          <div className="font-medium text-sm">Two Sum</div>
                          <div className="text-xs text-muted-foreground">Array, Hash Table</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Easy
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Play className="h-4 w-4 text-blue-500" />
                        <div>
                          <div className="font-medium text-sm">Valid Parentheses</div>
                          <div className="text-xs text-muted-foreground">String, Stack</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Easy
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <div>
                          <div className="font-medium text-sm">Binary Tree Inorder</div>
                          <div className="text-xs text-muted-foreground">Tree, DFS</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                        Medium
                      </Badge>
                    </div>
                  </div>

                  <Button className="w-full bg-transparent" variant="outline">
                    Start Daily Challenge
                  </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section (still static) */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Recent Activity */}
            <Card>
              {/* ... (static content) ... */}
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Completed "React Fundamentals" course</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Solved 5 DSA problems</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Joined "Web Dev Study Group"</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Applied to Google internship</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              {/* ... (static content) ... */}
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">15</div>
                    <div className="text-xs text-blue-600">Dec</div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Algorithm Design Workshop</p>
                    <p className="text-xs text-muted-foreground">2:00 PM - 4:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">18</div>
                    <div className="text-xs text-green-600">Dec</div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Career Fair 2024</p>
                    <p className="text-xs text-muted-foreground">10:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">22</div>
                    <div className="text-xs text-purple-600">Dec</div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Final Project Presentation</p>
                    <p className="text-xs text-muted-foreground">9:00 AM - 12:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}