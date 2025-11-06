"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

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
// --- FIX: ADDED PLUS TO THE IMPORT LIST ---
import { Bot, Send, Plus, Settings, User, Loader2 } from "lucide-react" 
import { Textarea } from "@/components/ui/textarea"

// Define the Message interface
interface Message {
  role: "user" | "model";
  text: string;
}

export default function AITutorPage() {
  const router = useRouter();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // --- 1. Auth Protection Hook ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  // --- 2. Auto-scroll to bottom ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // --- 3. System Prompt for the AI ---
  const systemPrompt = `
    You are "Pathway Tutor," a friendly and encouraging academic and career assistant 
    for university students. Your expertise is in:
    1.  **Computer Science:** Explaining Data Structures & Algorithms (DSA), debugging code, 
        and preparing for technical interviews.
    2.  **Internships:** Giving advice on resumes, cover letters, finding opportunities, 
        and interview soft skills.
    3.  **Study Habits:** Providing tips on time management, effective learning, and 
        staying motivated.
    
    Always be patient, positive, and break down complex topics into simple, 
    easy-to-understand steps. Keep your answers concise unless asked for detail.
  `;

  // --- 4. Handle Chat Submit (The FINAL FIX) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const payload = {
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: [
        ...messages.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }]
        })),
        {
          role: "user",
          parts: [{ text: input }]
        }
      ]
    };

    try {
      // This pulls the key from the NEXT_PUBLIC_GEMINI_API_KEY environment variable set in Vercel
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY; 
      if (!apiKey) {
        throw new Error("AI Key is missing. Please configure NEXT_PUBLIC_GEMINI_API_KEY in Vercel.");
      }
      
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Failed to get a response from the AI tutor. Check server status.");
      }

      const data = await response.json();
      const modelResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (modelResponse) {
        setMessages((prev) => [...prev, { role: "model", text: modelResponse }]);
      } else {
        throw new Error("Received an empty response from the AI tutor.");
      }

    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: `Sorry, I ran into an error: ${error.message}` }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Static conversation list ---
  const conversations = [
    { id: 1, title: "Understanding Recursion" },
    { id: 2, title: "Binary Search Optimization" },
    { id: 3, title: "Interview Preparation" },
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

        <div className="flex flex-1 gap-4 p-4 pt-0 h-[calc(100vh-4rem)]">
          {/* --- Sidebar for conversations (static) --- */}
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
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* --- Main Chat Window --- */}
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

              {/* --- DYNAMIC MESSAGE LIST --- */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {/* AI Avatar */}
                    {msg.role === "model" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    {/* Message Bubble */}
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-900 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    </div>
                    {/* User Avatar */}
                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    </div>
                    <div className="max-w-xs p-3 rounded-lg bg-gray-100 text-gray-800">
                      <p>Pathway Tutor is thinking...</p>
                    </div>
                  </div>
                )}
                {/* Auto-scroll target */}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* --- DYNAMIC INPUT FORM --- */}
              <div className="border-t p-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Textarea
                    placeholder="Ask me anything about courses, DSA, internships..."
                    className="resize-none"
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e as any);
                      }
                    }}
                  />
                  <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700" 
                    size="icon"
                    disabled={isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}