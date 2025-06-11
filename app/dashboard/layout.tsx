// @ts-nocheck
import type React from "react"
import Sidebar from "@/components/dashboard/sidebar"
import Header from "@/components/dashboard/header"
import { ThemeProvider } from "@/components/theme-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="flex h-screen bg-gray-950 text-gray-100">
        <Sidebar />
        {/* Main content area, dynamically adjust margin based on sidebar state */}
        <div className="flex flex-1 flex-col transition-all duration-300 md:ml-16 lg:ml-64">
          <Header />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}
