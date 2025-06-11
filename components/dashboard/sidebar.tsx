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
}: {
  name: string
  path: string
  icon: any
  isCollapsed: boolean
  exact?: boolean
}) => {
  const pathname = usePathname()
  const isActive = exact ? pathname === path : pathname.startsWith(path)

  return (
    <Link
      href={path}
      className={cn(
        "flex items-center px-4 py-3 text-sm font-medium transition-colors hover:bg-cyan-500/10 hover:text-cyan-300",
        isActive ? "bg-cyan-500/15 text-cyan-400 border-r-2 border-cyan-400" : "text-gray-400",
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsCollapsed(true)
      else setIsCollapsed(false)
    }

    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full bg-gray-900 transition-all duration-300 z-50 border-r border-cyan-500/20",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center">
              <Atom className="text-black h-5 w-5" />
            </div>
            {!isCollapsed && <span className="text-white text-xl font-semibold">AEON</span>}
          </div>
        </div>

        {/* Navigation - NO SCROLLING */}
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <SidebarItem
              key={item.path}
              name={item.name}
              path={item.path}
              icon={item.icon}
              isCollapsed={isCollapsed}
              exact={item.exact}
            />
          ))}
        </nav>

        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-4 text-gray-400 hover:text-white border-t border-gray-700 transition-colors"
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>
    </div>
  )
}

export default Sidebar
