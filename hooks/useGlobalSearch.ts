'use client'

import { useState, useEffect } from 'react'

export function useGlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K on Mac, Ctrl+K on Windows/Linux
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const openSearch = () => setIsOpen(true)
  const closeSearch = () => setIsOpen(false)

  return {
    isOpen,
    openSearch,
    closeSearch
  }
}
