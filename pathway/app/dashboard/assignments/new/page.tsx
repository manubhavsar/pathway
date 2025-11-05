"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/UserContext"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

export default function NewAssignmentPage() {
  const router = useRouter()
  const { user, isLoading: isUserLoading } = useUser()

  // Form State
  const [title, setTitle] = useState("")
  const [course, setCourse] = useState("")
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)
  const [priority, setPriority] = useState("")
  const [description, setDescription] = useState("")
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Auth Protection
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dueDate) {
      setError("Please select a due date.");
      return;
    }
    
    setIsLoading(true);
    setError("");

    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('https://pathway-backend-n6ht.onrender.com/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          course,
          dueDate,
          priority,
          description,
          status: 'Not Started'
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to create assignment");
      }

      // This is the "Aha!" moment
      // After creating, redirect back to the assignments list
      router.push('/dashboard/assignments');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isUserLoading || !user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader breadcrumbLabel="New Assignment" />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Card className="max-w-3xl mx-auto w-full">
            <CardHeader>
              <CardTitle>Create New Assignment</CardTitle>
              <CardDescription>Fill out the details for your new task.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., React Hooks Project"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    placeholder="e.g., Web Development"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={`w-full justify-start text-left font-normal ${!dueDate && "text-muted-foreground"
                            }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dueDate}
                          onSelect={setDueDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select onValueChange={setPriority} value={priority}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., Build a To-Do app using useState and useEffect..."
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => router.push('/dashboard/assignments')}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isLoading ? "Saving..." : "Save Assignment"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}