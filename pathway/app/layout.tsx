import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider" // Assuming you have this
import { UserProvider } from "@/contexts/UserContext" // <-- 1. Import UserProvider
import { PageTransition } from "@/components/PageTransition" // <-- 2. Import PageTransition

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pathway - Student Portal",
  description: "Your Academic Journey Starts Here",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning> {/* Added suppressHydrationWarning for theme */}
      <body className={inter.className}>
        {/* 3. Wrap everything in the UserProvider */}
        <UserProvider> 
          {/* Assuming you have a ThemeProvider. If not, you can remove it. */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* 4. Wrap the children in PageTransition */}
            <PageTransition>
              {children}
            </PageTransition>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  )
}