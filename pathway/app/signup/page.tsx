"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation" // <-- 1. Import router
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { BookOpen, ArrowRight, Mail, Lock, User } from "lucide-react"

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter() // <-- 2. Initialize router

  // --- 3. This handler is for <Input> fields ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }
  
  // --- 4. This handler is for the <Checkbox> field ---
  const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
    setFormData((prev) => ({
      ...prev,
      agreeToTerms: !!checked, // !!checked converts 'indeterminate' to false
    }));
    // Clear error for this field
    if (errors.agreeToTerms) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.agreeToTerms;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email is required"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // --- 5. This is the updated signup logic ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({}) // Clear errors

    try {
      const response = await fetch(
        'https://pathway-backend-n6ht.onrender.com/api/auth/register', // Your live backend URL
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register')
      }

      // --- SUCCESS! ---
      // 1. Save the new token
      localStorage.setItem('token', data.token)
      
      // 2. Redirect to dashboard
      router.push('/dashboard')

    } catch (err: any) {
      // If backend sends "User already exists", show it
      setErrors({ form: err.message }) 
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* ... (Header is unchanged) ... */}
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
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* ... (Decorative elements are unchanged) ... */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur-2xl"></div>
          <div className="absolute bottom-40 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-3xl blur-3xl"></div>

          {/* Signup Card */}
          <Card className="relative z-10 border-gray-200 shadow-lg">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Join Pathway
              </CardTitle>
              <CardDescription className="text-gray-600">
                Create an account to start your journey to academic success
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* --- 6. Show form-wide errors --- */}
                {errors.form && (
                  <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                    {errors.form}
                  </div>
                )}
                
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={`pl-10 bg-gray-50 border-gray-200 hover:bg-white focus:bg-white transition-colors ${
                        errors.name ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`pl-10 bg-gray-50 border-gray-200 hover:bg-white focus:bg-white transition-colors ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`pl-10 bg-gray-50 border-gray-200 hover:bg-white focus:bg-white transition-colors ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                  <p className="text-xs text-gray-500">At least 8 characters required</p>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`pl-10 bg-gray-50 border-gray-200 hover:bg-white focus:bg-white transition-colors ${
                        errors.confirmPassword ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                </div>

                {/* Terms Checkbox */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    {/* --- 7. This is the corrected Checkbox --- */}
                    <Checkbox
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={handleCheckboxChange} // <-- Use onCheckedChange
                      className="mt-1"
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                      I agree to the{" "}
                      <Link href="#" className="text-blue-600 hover:underline font-medium">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-blue-600 hover:underline font-medium">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {errors.agreeToTerms && <p className="text-xs text-red-500">{errors.agreeToTerms}</p>}
                </div>

                {/* ... (Rest of the file is unchanged) ... */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium h-10 mt-2"
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-gray-200 hover:bg-gray-50 text-gray-700 font-medium h-10 bg-transparent"
                >
                  Sign up with Google
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}