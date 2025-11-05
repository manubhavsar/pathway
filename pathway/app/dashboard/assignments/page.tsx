"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useUser } from "@/contexts/UserContext"

import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Search, Filter, Plus, Clock, AlertCircle, CheckCircle, Trash2, Send } from "lucide-react" // <-- 1. Added icons
import { Input } from "@/components/ui/input"
import { format } from "date-fns" 

interface IAssignment {
  _id: string;
  title: string;
  course: string;
  dueDate: string; 
  status: 'Pending' | 'Submitted' | 'Not Started';
  priority: 'High' | 'Medium' | 'Low' | 'Critical';
  description: string;
}
type AssignmentStatus = "Pending" | "Submitted" | "Not Started" | string;

export default function AssignmentsPage() {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useUser();
  
  const [assignments, setAssignments] = useState<IAssignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // For handling errors

  // Auth Protection
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  // Data Fetching Hook
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user) return; 

    const fetchAssignments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://pathway-backend-n6ht.onrender.com/api/assignments', {
          headers: { 'Authorization': `Bearer ${token}` },
          cache: 'no-store'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch assignments');
        }
        const data = await response.json();
        setAssignments(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAssignments();
  }, [user]); 

  // --- 2. NEW FUNCTION TO HANDLE SUBMIT ---
  const handleSubmit = async (assignmentId: string) => {
    const token = localStorage.getItem('token');
    setError(null);

    try {
      const response = await fetch(`https://pathway-backend-n6ht.onrender.com/api/assignments/${assignmentId}/submit`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to submit assignment');
      }

      // This is the "Aha!" moment for your demo
      // Update the state locally to re-render the list
      setAssignments(prevAssignments => 
        prevAssignments.map(a => 
          a._id === assignmentId ? { ...a, status: 'Submitted' } : a
        )
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  // --- 3. NEW FUNCTION TO HANDLE DELETE ---
  const handleDelete = async (assignmentId: string) => {
    const token = localStorage.getItem('token');
    setError(null);

    // Optional: Add a confirmation dialog
    if (!window.confirm("Are you sure you want to delete this assignment?")) {
      return;
    }

    try {
      const response = await fetch(`https://pathway-backend-n6ht.onrender.com/api/assignments/${assignmentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete assignment');
      }

      // This is the other "Aha!" moment
      // Update the state locally to remove the assignment from the list
      setAssignments(prevAssignments => 
        prevAssignments.filter(a => a._id !== assignmentId)
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const getStatusIcon = (status: AssignmentStatus) => {
    if (status === "Submitted") return <CheckCircle className="h-4 w-4 text-green-500" />
    if (status === "Pending") return <Clock className="h-4 w-4 text-orange-500" />
    return <AlertCircle className="h-4 w-4 text-red-500" />
  }
  
  if (isUserLoading || !user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader breadcrumbLabel="Assignments" />

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Assignments</h1>
              <p className="text-muted-foreground mt-1">Track and manage your course assignments</p>
            </div>
            
            <Link href="/dashboard/assignments/new">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                New Assignment
              </Button>
            </Link>
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
          
          {/* --- 4. Show a global error message if API fails --- */}
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-3">
            {isLoading && <p>Loading assignments...</p>}
            {!isLoading && assignments.length === 0 && (
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6 text-center text-muted-foreground">
                  You have no assignments. Click "New Assignment" to add one!
                </CardContent>
              </Card>
            )}
            {!isLoading && assignments.map((assignment) => (
              <Card key={assignment._id} className="hover:shadow-md transition-shadow">
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
                          Due: {format(new Date(assignment.dueDate), "PPP")}
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

                  {/* --- 5. UPDATED BUTTONS --- */}
                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      className="flex-1 bg-transparent text-red-600 hover:bg-red-50 hover:text-red-700" 
                      size="sm"
                      onClick={() => handleDelete(assignment._id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                    {assignment.status !== "Submitted" && (
                      <Button 
                        className="flex-1 bg-blue-600 hover:bg-blue-700" 
                        size="sm"
                        onClick={() => handleSubmit(assignment._id)}
                      >
                        <Send className="mr-2 h-4 w-4" />
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