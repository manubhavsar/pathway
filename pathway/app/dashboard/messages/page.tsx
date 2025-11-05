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
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Search, Send, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

export default function MessagesPage() {
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Instructor",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Great work on the assignment!",
      time: "2 min",
      unread: true,
    },
    {
      id: 2,
      name: "Web Dev Study Group",
      role: "15 members",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Anyone free for a study session?",
      time: "5 min",
      unread: false,
    },
    {
      id: 3,
      name: "Mike Chen",
      role: "Peer",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Can you help with the DSA problem?",
      time: "1 hour",
      unread: false,
    },
    {
      id: 4,
      name: "Career Mentorship",
      role: "1 mentor",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Here are some interview tips...",
      time: "Yesterday",
      unread: false,
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "other",
      name: "Sarah Johnson",
      content: "Great work on the React assignment! Your component structure is clean.",
      time: "2:30 PM",
    },
    {
      id: 2,
      sender: "user",
      content: "Thank you! I found the hooks documentation really helpful.",
      time: "2:35 PM",
    },
    {
      id: 3,
      sender: "other",
      name: "Sarah Johnson",
      content: "Keep it up! Would you like to take the advanced course next?",
      time: "2:40 PM",
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
                  <BreadcrumbPage>Messages</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 gap-4 p-4 pt-0">
          <div className="hidden lg:flex flex-col w-80 gap-3">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
              <Plus className="mr-2 h-4 w-4" />
              New Message
            </Button>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-9" />
            </div>

            <div className="space-y-2">
              {conversations.map((conv) => (
                <Card
                  key={conv.id}
                  className={`p-3 cursor-pointer hover:bg-blue-50 transition-colors ${
                    conv.unread ? "border-blue-200 bg-blue-50/30" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src={conv.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{conv.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">{conv.name}</h4>
                        <span className="text-xs text-muted-foreground">{conv.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{conv.role}</p>
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread && <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Card className="flex-1 flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">Sarah Johnson</CardTitle>
                    <p className="text-sm text-muted-foreground">Online</p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-lg rounded-br-none"
                        : "bg-gray-100 text-gray-900 rounded-lg rounded-bl-none"
                    } p-3`}
                  >
                    {msg.sender === "other" && <p className="text-xs font-semibold mb-1">{msg.name}</p>}
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-blue-100" : "text-gray-600"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <Textarea placeholder="Type your message..." className="resize-none" rows={2} />
                <Button className="bg-blue-600 hover:bg-blue-700" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
