"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation" 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { BookOpen, ArrowRight, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("") 
  const router = useRouter() 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("") 

    try {
      const response = await fetch(
        'https://pathway-backend-n6ht.onrender.com/api/auth/login', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to login')
      }

      // --- SUCCESS! ---
      localStorage.setItem('token', data.token)

      // --- THIS IS THE FIX ---
      // We use window.location.href to force a full page reload,
      // which re-initializes the UserContext.
      window.location.href = '/dashboard';

    } catch (err: any) {
      setError(err.message) 
    } finally {
      setIsLoading(false)
    }
  }

  return (
    // ... (rest of your JSX is correct)
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
        <div className="ml-auto flex gap-2">
          <Button variant="ghost" size="sm">
            <Link href="/">Home</Link>
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur-2xl"></div>
          <div className="absolute bottom-40 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-3xl blur-3xl"></div>

          {/* Login Card */}
          <Card className="relative z-10 border-gray-200 shadow-lg">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to your Pathway account to continue your learning journey
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* --- Show error message --- */}
                {error && (
                  <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                    {error}
                  </div>
                )}
                
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 bg-gray-50 border-gray-200 hover:bg-white focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <Link href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 bg-gray-50 border-gray-200 hover:bg-white focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium h-10"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
                
                {/* Divider */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or</span>
                  </div>
                </div>

                {/* Social Sign In */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-gray-200 hover:bg-gray-50 text-gray-700 font-medium h-10 bg-transparent"
                >
                  Continue with Google
                </Button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-700">
                    Create one
                  </Link>
                </p>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center mt-4">
                By signing in, you agree to our{" "}
                <Link href="#" className="hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              New to Pathway?{" "}
              <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-700">
                Join now
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}