"use client"

// --- 1. Imports for data fetching and auth ---
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/UserContext"

import { AppSidebar } from "@/components/app-sidebar" // <-- Fixed import path
import { DashboardHeader } from "@/components/dashboard-header" // <-- Import header
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import {
  Briefcase,
  Clock,
  Star,
  MapPin,
  Building,
  Plus,
  Search
} from "lucide-react"
import { Input } from "@/components/ui/input"

// --- 2. Interface for your Internship data ---
interface IInternship {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: 'Remote' | 'Hybrid' | 'On-site';
  duration?: string;
  rating?: number;
}

export default function InternshipsPage() {
  const [internships, setInternships] = useState<IInternship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useUser();

  // --- 3. Auth Protection Hook ---
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  // --- 4. Data Fetching Hook (Gets ALL internships) ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user) return; // Wait for user to be loaded

    const fetchAllInternships = async () => {
      try {
        const response = await fetch('https://pathway-backend-n6ht.onrender.com/api/internships', { 
          cache: 'no-store'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch internships');
        }
        
        const data = await response.json();
        setInternships(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllInternships();
  }, [user]); // Re-fetch if user changes

  // --- 5. Loading State ---
  if (isUserLoading || isLoading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader breadcrumbLabel="Internships" />
          <div className="flex-1 p-4">Loading all internships...</div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader breadcrumbLabel="Internships" />

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          
          {/* --- 6. Header and Search --- */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">All Internships</h1>
              <p className="text-muted-foreground mt-1">Search and apply for opportunities</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Internship
            </Button>
          </div>
          
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by title, company, or location..." className="pl-9" />
          </div>

          {/* --- 7. DYNAMIC Internships List --- */}
          <Card>
            <CardHeader>
              <CardTitle>All Opportunities ({internships.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {!internships || internships.length === 0 ? (
                <p>No internships found. Check back later!</p>
              ) : (
                internships.map((internship) => (
                  <div key={internship._id} className="flex flex-col md:flex-row items-start space-x-0 md:space-x-4 p-3 rounded-lg border">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mb-2 md:mb-0">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                        <h4 className="font-semibold">{internship.title}</h4>
                        <Badge variant="secondary" className="mt-1 md:mt-0">{internship.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{internship.company} • {internship.location}</p>
                      <div className="flex items-center flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
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
                    <Button size="sm" className="w-full md:w-auto mt-3 md:mt-0">Apply</Button>
                  </div>
                ))
              )}
              
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}