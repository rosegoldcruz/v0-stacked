// @ts-nocheck
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import {
  Clapperboard,
  Library,
  ImageIcon,
  Video,
  Brain,
  Sparkles,
  Scan,
  Code2,
  Settings,
  UserCircle,
  Home,
  Atom,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", path: "/dashboard", icon: Home, exact: true },
  { name: "AEON Studio", path: "/dashboard/studio", icon: Clapperboard },
  { name: "Library", path: "/dashboard/library", icon: Library },
  { name: "Image Gen", path: "/dashboard/image-gen", icon: ImageIcon },
  { name: "Video Gen", path: "/dashboard/video-gen", icon: Video },
  { name: "Models", path: "/dashboard/models", icon: Brain },
  { name: "Upscaler", path: "/dashboard/upscaler", icon: Sparkles },
  { name: "Canvas", path: "/dashboard/canvas", icon: Scan },
  { name: "API Access", path: "/dashboard/api-access", icon: Code2 },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
  { name: "Profile", path: "/dashboard/profile", icon: UserCircle },
]

const SidebarItem = ({
  name,
  path,
  icon: Icon,
  isCollapsed,
  exact = false,
  onClick,
}: {
  name: string
  path: string
  icon: any
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
        "flex items-center px-4 py-3 text-sm font-medium transition-colors hover:bg-purple-500/10 hover:text-purple-300",
        isActive ? "bg-purple-500/15 text-purple-400 border-r-2 border-purple-400" : "text-gray-400",
        isCollapsed ? "justify-center px-2" : "space-x-3",
      )}
    >
      <Icon className={cn("shrink-0", isCollapsed ? "h-6 w-6" : "h-5 w-5")} />
      {!isCollapsed && <span>{name}</span>}
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
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full bg-gray-900/95 backdrop-blur-md transition-all duration-300 z-50 border-r border-purple-500/20",
          isCollapsed ? "w-16" : "w-64",
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <Link href="/" className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Atom className="text-white h-5 w-5" />
              </div>
              {!isCollapsed && (
                <span className="text-white text-xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
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
              icon={item.icon}
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
