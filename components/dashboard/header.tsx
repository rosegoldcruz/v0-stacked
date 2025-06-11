// @ts-nocheck
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, Settings, LogOut, User, CreditCard } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-primary/20 bg-background/30 backdrop-blur-lg px-4 relative">
      {/* Subtle gradient border effect */}
      <div className="absolute inset-x-0 bottom-0 h-px pointer-events-none bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-70 animate-subtle-glow"></div>

      <div className="flex items-center gap-4">
        {/* Placeholder for global search or breadcrumbs, styled for the new theme */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/70" />
          <Input
            type="search"
            placeholder="Search AEON Universe..."
            className="pl-9 pr-4 py-1 sm:w-[250px] md:w-[200px] lg:w-[300px] bg-input/50 border-primary/30 rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all h-9"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all group h-8 w-8"
        >
          <Bell className="h-5 w-5 group-hover:animate-pulse" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full group">
              <Avatar className="h-8 w-8 border-2 border-transparent group-hover:border-primary/70 transition-all">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User Avatar" />
                <AvatarFallback className="bg-secondary text-secondary-foreground">AE</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-popover border-primary/30 shadow-xl backdrop-blur-md">
            <DropdownMenuLabel className="font-medium text-foreground">My Universe</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="cursor-pointer hover:!bg-primary/10 focus:!bg-primary/20">
                <Link href="/dashboard/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-primary/80" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer hover:!bg-primary/10 focus:!bg-primary/20">
                <Link href="/dashboard/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4 text-primary/80" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer hover:!bg-primary/10 focus:!bg-primary/20">
                <Link href="/dashboard/billing" className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4 text-primary/80" />
                  <span>Billing</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem className="cursor-pointer hover:!bg-destructive/20 focus:!bg-destructive/30 text-destructive-foreground hover:!text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
