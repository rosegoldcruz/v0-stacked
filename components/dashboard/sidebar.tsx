// @ts-nocheck
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "🏠 Home", path: "/dashboard", emoji: "🏠", exact: true },
  { name: "🎨 AEON Studio", path: "/dashboard/studio", emoji: "🎨" },
  { name: "📚 Library", path: "/dashboard/library", emoji: "📚" },
  { name: "🖼️ Image Gen", path: "/image-gen", emoji: "🖼️" },
  { name: "🎬 Video Gen", path: "/video-gen", emoji: "🎬" },
  { name: "🤖 Models", path: "/dashboard/models", emoji: "🤖" },
  { name: "🔗 API Access", path: "/dashboard/api-access", emoji: "🔗" },
  { name: "⚙️ Settings", path: "/dashboard/settings", emoji: "⚙️" },
  { name: "👤 Profile", path: "/dashboard/profile", emoji: "👤" }
]

const SidebarItem = ({
  name,
  path,
  emoji,
  isCollapsed,
  exact = false,
  onClick,
}: {
  name: string
  path: string
  emoji: string
  isCollapsed: boolean
  exact?: boolean
  onClick?: () => void
}) => {
  const pathname = usePathname()
  const isActive = exact ? pathname === path : pathname.startsWith(path)

  return (
    <Link
      href={path}
      onClick={onClick}
      className={cn(
        "flex items-center px-4 py-3 text-sm font-medium transition-colors hover:bg-orange-500/10 hover:text-orange-300",
        isActive ? "bg-orange-500/15 text-orange-400 border-r-2 border-orange-400" : "text-gray-400",
        isCollapsed ? "justify-center px-2" : "space-x-3",
      )}
    >
      <span className={cn("shrink-0", isCollapsed ? "text-xl" : "text-lg")}>{emoji}</span>
      {!isCollapsed && <span>{name.split(" ")[1]}</span>}
    </Link>
  )
}

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true)
        setIsMobileOpen(false)
      } else {
        setIsCollapsed(false)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleOverlayClick = () => {
    setIsMobileOpen(false)
  }

  const handleItemClick = () => {
    if (window.innerWidth < 1024) {
      setIsMobileOpen(false)
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-gray-800 p-2 rounded-lg"
      >
        <span className="text-xl">☰</span>
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full bg-gray-900/95 backdrop-blur-md transition-all duration-300 z-50 border-r border-orange-500/20",
          isCollapsed ? "w-16" : "w-64",
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <Link href="/" className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">✨</span>
              </div>
              {!isCollapsed && (
                <span className="text-white text-xl font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  AEON
                </span>
              )}
            </div>
          </Link>

          {/* Navigation with Scrolling */}
          <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {navItems.map((item) => (
              <SidebarItem
                key={item.path}
                name={item.name}
                path={item.path}
                emoji={item.emoji}
                isCollapsed={isCollapsed}
                exact={item.exact}
                onClick={handleItemClick}
              />
            ))}
          </nav>

          {/* Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-4 text-gray-400 hover:text-white border-t border-gray-700 transition-colors hidden lg:block"
          >
            {isCollapsed ? "→" : "←"}
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
