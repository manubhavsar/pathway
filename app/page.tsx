import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Users,
  Trophy,
  Calendar,
  MessageSquare,
  BarChart3,
  ArrowRight,
  Mail,
  Bell,
  Rocket,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 w-full">
        <Link href="/" className="flex items-center justify-center">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Pathway
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Features
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Dashboard
          </Link>
        </nav>
        <div className="ml-6 flex gap-2">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Get Started
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full min-h-screen overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>

          {/* Content Container */}
          <div className="relative z-10 container mx-auto max-w-none px-4 md:px-8 lg:px-12 py-2 md:py-10 lg:py-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16 xl:grid-cols-[1fr_1.2fr] items-center min-h-[80vh]">
              <div className="flex flex-col justify-center space-y-4 text-left pl-0 lg:pl-8 z-20 relative">
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit bg-blue-100 text-blue-700 hover:bg-blue-200 self-start">
                    🎓 Student Success Platform
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent"
                  style={{ textShadow: '4px 4px 8px rgba(128, 90, 213, 0.3)' }}
>
                    Your Academic Journey Starts Here
                  </h1>
                  <p className="max-w-[600px] text-gray-700 md:text-xl">
                    Pathway empowers students with the tools, resources, and community they need to  land top internships and master DSA.
                    Track progress, connect with peers, and unlock your potential.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" className="border-blue-300 hover:bg-blue-50 bg-transparent">
                    Watch Demo
                  </Button>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-blue-600" />
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Coming Soon</span> - Join the beta waitlist
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diagonal Hero Image */}
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
            {/* Background blur effects */}
            <div className="absolute top-1/4 right-0 w-[120%] h-[80%] bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl transform rotate-12 translate-x-1/4"></div>
            <div className="absolute top-1/3 right-0 w-[100%] h-[70%] bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-3xl blur-2xl transform rotate-6 translate-x-1/6"></div>

            {/* Main dashboard image */}
            <div className="absolute top-[56%] right-[3%] w-[85%] h-[75%] transform -translate-y-1/2 rotate-12 translate-x-1/3 hover:rotate-[10deg] transition-transform duration-700 ease-out">
              <div className="relative w-full h-full">
                <Image
                  src="hero.png"
                  fill
                  alt="Pathway Student Dashboard"
                  className="object-cover rounded-2xl shadow-2xl border border-gray-200/50"
                  priority
                />
              </div>
            </div>

            {/* Additional floating elements */}
            <div className="absolute top-1/6 right-[15%] w-32 h-32 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-2xl transform rotate-45 blur-sm animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-purple-400/25 to-pink-400/25 rounded-xl transform -rotate-12 blur-sm"></div>
            <div className="absolute top-1/3 right-1/6 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-lg transform rotate-30 blur-sm"></div>
          </div>

          {/* Gradient overlay to blend with next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative w-full py-16 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto max-w-none px-12 lg:px-20 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                  ✨ Features
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Succeed</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From tracking internships to mastering DSA, Pathway provides comprehensive tools designed
                  specifically for student success.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-7xl items-start gap-10 py-12 lg:grid-cols-3 lg:gap-16">
              <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-200">
                <CardHeader>
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Internship Hub</CardTitle>
                  <CardDescription>
                    Effortlessly track internship opportunities, monitor your application progress, and stay on top of important deadlines— all in one place.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-purple-200">
                <CardHeader>
                  <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Progress Tracking</CardTitle>
                  <CardDescription>
                    Explore DSA resources and visualize your progress with detailed analytics and insights to help you stay on track.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-green-200">
                <CardHeader>
                  <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Study Groups</CardTitle>
                  <CardDescription>
                    Connect with peers, form study groups, and collaborate on projects to enhance your learning experience.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-orange-200">
                <CardHeader>
                  <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Smart Calendar</CardTitle>
                  <CardDescription>
                    Sync all your academic events, internship deadlines, and learning sessions in one intelligent calendar system.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-pink-200">
                <CardHeader>
                  <div className="h-12 w-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>AI Tutor</CardTitle>
                  <CardDescription>
                    Get instant help with DSA concepts and finding internships through our AI-powered tutoring assistant.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-yellow-200">
                <CardHeader>
                  <div className="h-12 w-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>
                    Earn badges and celebrate key milestones as you advance through your academic journey with confidence.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Beta Access Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <div className="text-center text-white space-y-6">
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                  🚀 Beta Access
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Be Among the First to Experience Pathway
                </h2>
                <p className="text-blue-100 md:text-lg max-w-2xl mx-auto">
                  Join our exclusive beta program and help shape the future of student success. Get early access to all
                  features and provide valuable feedback.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-white/40"
                />
                <Button variant="secondary" className="bg-white text-blue-600 hover:bg-white/90 font-semibold">
                  <Bell className="mr-2 h-4 w-4" />
                  Join Beta
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Early Access</h3>
                  <p className="text-blue-100 text-sm">Be the first to try new features before public release</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Exclusive Community</h3>
                  <p className="text-blue-100 text-sm">Connect with other beta testers and share feedback</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Direct Feedback</h3>
                  <p className="text-blue-100 text-sm">Your input directly influences product development</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Transform Your Academic Journey?
                </h2>
                <p className="text-gray-600 md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed mx-auto max-w-[700px]">
                  Join the beta program and be part of building the future of student success. Your feedback will help
                  create the perfect learning platform.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row items-center justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Join Beta Program
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="border-gray-300 hover:bg-gray-100 bg-transparent">
                  Learn More
                </Button>
              </div>
              <p className="text-sm text-gray-500 text-center">
                Free beta access • Early bird benefits • Shape the product
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <p className="text-xs text-gray-600">© 2024 Pathway. All rights reserved.</p>
        </div>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600 hover:text-gray-900">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600 hover:text-gray-900">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600 hover:text-gray-900">
            Support
          </Link>
        </nav>
      </footer>
    </div>
  )
}
