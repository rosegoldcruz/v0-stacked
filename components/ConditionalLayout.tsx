'use client'

import { usePathname } from 'next/navigation'
import LayoutWrapper from './LayoutWrapper'
import Navbar from './Navbar'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()

  // Pages that should use the full sidebar layout (dashboard-style pages)
  const sidebarPages = ['/studio', '/library', '/models', '/settings', '/profile', '/api-access']
  
  // Pages that should use simple navbar layout
  const navbarPages = ['/pricing']
  
  // Homepage uses no navigation (cinematic layout)
  const isHomepage = pathname === '/'
  
  // Check if current page should use sidebar
  const useSidebar = sidebarPages.some(page => pathname.startsWith(page))
  
  // Check if current page should use navbar
  const useNavbar = navbarPages.some(page => pathname.startsWith(page))

  if (isHomepage) {
    // Homepage: Show navbar with cinematic experience
    return (
      <>
        <Navbar showOnHomepage={true} />
        <main>{children}</main>
      </>
    )
  }

  if (useSidebar) {
    // Dashboard-style pages: Use full sidebar layout
    return <LayoutWrapper>{children}</LayoutWrapper>
  }

  if (useNavbar) {
    // Simple pages: Use top navbar only
    return (
      <>
        <Navbar showOnHomepage={false} />
        <main>{children}</main>
      </>
    )
  }

  // Default: Use navbar for any other pages
  return (
    <>
      <Navbar showOnHomepage={false} />
      <main>{children}</main>
    </>
  )
}
