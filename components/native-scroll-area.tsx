"use client"

import type React from "react"

import { forwardRef, useLayoutEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface NativeScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal" | "both"
  showScrollbar?: boolean
}

export const NativeScrollArea = forwardRef<HTMLDivElement, NativeScrollAreaProps>(
  ({ className, orientation = "vertical", showScrollbar = true, children, ...props }, ref) => {
    const [isScrolling, setIsScrolling] = useState(false)

    useLayoutEffect(() => {
      let timeoutId: NodeJS.Timeout

      const handleScroll = () => {
        setIsScrolling(true)
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          setIsScrolling(false)
        }, 150)
      }

      const element = ref && typeof ref === "object" && ref.current
      if (element) {
        element.addEventListener("scroll", handleScroll, { passive: true })
        return () => {
          element.removeEventListener("scroll", handleScroll)
          clearTimeout(timeoutId)
        }
      }

      return () => clearTimeout(timeoutId)
    }, [ref])

    const getOverflowClass = () => {
      switch (orientation) {
        case "horizontal":
          return "overflow-x-auto overflow-y-hidden"
        case "both":
          return "overflow-auto"
        default:
          return "overflow-y-auto overflow-x-hidden"
      }
    }

    return (
      <div
        ref={ref}
        className={cn(getOverflowClass(), showScrollbar ? "native-scroll" : "", "relative", className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)

NativeScrollArea.displayName = "NativeScrollArea"

// Horizontal scroll bar component
export const NativeScrollBar = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "h-2.5 w-full bg-transparent",
        "after:content-[''] after:block after:h-full after:bg-primary/50 after:rounded-full",
        className,
      )}
      {...props}
    />
  )
}
