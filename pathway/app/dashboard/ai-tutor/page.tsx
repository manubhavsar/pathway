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
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Bot, Send, Plus, Settings } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function AITutorPage() {
  const conversations = [
    {
      id: 1,
      title: "Understanding Recursion",
      lastMessage: "Can you explain recursion with tree examples?",
      date: "Today",
    },
    {
      id: 2,
      title: "Binary Search Optimization",
      lastMessage: "How to optimize binary search for large datasets?",
      date: "Yesterday",
    },
    {
      id: 3,
      title: "Interview Preparation",
      lastMessage: "Tips for cracking FAANG interviews",
      date: "Dec 14",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "user",
      content: "Can you help me understand binary search trees?",
    },
    {
      id: 2,
      sender: "ai",
      content:
        "Of course! A Binary Search Tree (BST) is a data structure where each node has at most two children. The key property is that all values in the left subtree are smaller than the node's value, and all values in the right subtree are larger.",
    },
    {
      id: 3,
      sender: "user",
      content: "What's the time complexity for search operations?",
    },
    {
      id: 4,
      sender: "ai",
      content:
        "Great question! In a balanced BST, search, insert, and delete operations have O(log n) time complexity. However, in the worst case (when the tree is skewed), it can degrade to O(n). That's why self-balancing trees like AVL trees are often preferred.",
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
                  <BreadcrumbPage>AI Tutor</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 gap-4 p-4 pt-0">
          <div className="hidden lg:flex flex-col w-64 gap-4">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Recent Conversations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {conversations.map((conv) => (
                  <div key={conv.id} className="p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                    <h4 className="font-medium text-sm truncate">{conv.title}</h4>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                    <p className="text-xs text-muted-foreground mt-1">{conv.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <Card className="flex-1 flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Pathway AI Tutor</CardTitle>
                      <CardDescription>Your personal AI learning assistant</CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-900 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </CardContent>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Ask me anything about courses, DSA, internships..."
                    className="resize-none"
                    rows={2}
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
