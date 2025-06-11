"use client"

import type React from "react"

import { forwardRef, useLayoutEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface NativeAspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number
  asChild?: boolean
}

export const NativeAspectRatio = forwardRef<HTMLDivElement, NativeAspectRatioProps>(
  ({ className, ratio = 16 / 9, children, onClick, ...props }, ref) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const containerRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
      const updateDimensions = () => {
        if (containerRef.current) {
          const { offsetWidth } = containerRef.current
          setDimensions({
            width: offsetWidth,
            height: offsetWidth / ratio,
          })
        }
      }

      // Debounce resize updates
      let timeoutId: NodeJS.Timeout
      const debouncedUpdate = () => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(updateDimensions, 100)
      }

      updateDimensions()
      window.addEventListener("resize", debouncedUpdate, { passive: true })

      return () => {
        window.removeEventListener("resize", debouncedUpdate)
        clearTimeout(timeoutId)
      }
    }, [ratio])

    return (
      <div
        ref={containerRef}
        className={cn("relative w-full", className)}
        style={{ aspectRatio: ratio }}
        onClick={onClick}
        {...props}
      >
        <div ref={ref} className="absolute inset-0 w-full h-full">
          {children}
        </div>
      </div>
    )
  },
)

NativeAspectRatio.displayName = "NativeAspectRatio"
