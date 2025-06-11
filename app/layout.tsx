import type React from "react"
// @ts-nocheck
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AEON - Next-Generation AI Video Platform",
  description: "Create stunning AI-powered videos with AEON's advanced tools and models.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Global ResizeObserver error suppression
              window.addEventListener('error', function(e) {
                if (e.message === 'ResizeObserver loop completed with undelivered notifications.' || 
                    e.message.includes('ResizeObserver loop limit exceeded')) {
                  e.stopImmediatePropagation();
                  return false;
                }
              });
              
              // Also suppress unhandled promise rejections related to ResizeObserver
              window.addEventListener('unhandledrejection', function(e) {
                if (e.reason && e.reason.message && e.reason.message.includes('ResizeObserver')) {
                  e.preventDefault();
                  return false;
                }
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
