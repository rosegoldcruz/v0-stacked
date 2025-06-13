'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Bell, User, ChevronDown, LogOut, Settings, CreditCard, Command } from 'lucide-react';
import GlobalSearch from './search/GlobalSearch';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isOpen: isSearchOpen, openSearch, closeSearch } = useGlobalSearch();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  const navigation = [
    { name: '🏠 Home', href: '/', emoji: '🏠', short: 'Home' },
    { name: '🏢 AEON Studio', href: '/studio', emoji: '🏢', short: 'Studio' },
    { name: '📚 Library', href: '/library', emoji: '📚', short: 'Library' },
    { name: '🎨 Image Gen', href: '/image-gen', emoji: '🎨', short: 'Images' },
    { name: '🎬 Video Gen', href: '/video-gen', emoji: '🎬', short: 'Videos' },
    { name: '🤖 Models', href: '/models', emoji: '🤖', short: 'Models' },
    { name: '🔗 API Access', href: '/api-access', emoji: '🔗', short: 'API' },
    { name: '💎 Pricing', href: '/pricing', emoji: '💎', short: 'Pricing' },
    { name: '⚙️ Settings', href: '/settings', emoji: '⚙️', short: 'Settings' },
    { name: '👤 Profile', href: '/profile', emoji: '👤', short: 'Profile' }
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 h-12 w-12 bg-gray-800 rounded-lg flex items-center justify-center touch-manipulation"
        aria-label="Toggle navigation menu"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Full-screen overlay on mobile */}
      <div className={`fixed left-0 top-0 h-full bg-gray-800 border-r border-gray-700 transition-all duration-300 ease-in-out z-50 ${
        // Mobile: full-screen overlay
        isMobileOpen ? 'w-full' : 'w-0 md:w-64'
      } ${
        // Desktop: normal sidebar behavior
        isCollapsed ? 'md:w-16' : 'md:w-64'
      } ${
        // Transform for mobile slide-in
        isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>

        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {/* Mobile: Always show full logo, Desktop: conditional */}
            {(isMobileOpen || !isCollapsed) && (
              <Link href="/" className="flex items-center space-x-3" onClick={() => setIsMobileOpen(false)}>
                <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                  <span className="text-xl">✨</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold">AEON</h1>
                  <p className="text-xs text-gray-400">AI Creative Studio</p>
                </div>
              </Link>
            )}

            {/* Desktop collapsed state */}
            {!isMobileOpen && isCollapsed && (
              <Link href="/" className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg mx-auto">
                <span className="text-xl">✨</span>
              </Link>
            )}

            {/* Mobile close button */}
            {isMobileOpen && (
              <button
                onClick={() => setIsMobileOpen(false)}
                className="md:hidden h-12 w-12 flex items-center justify-center hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" />
              </button>
            )}

            {/* Desktop collapse toggle */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:block h-8 w-8 flex items-center justify-center hover:bg-gray-700 rounded transition-colors"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <span className="text-lg">{isCollapsed ? '👉' : '👈'}</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <div className="px-4 space-y-1">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={`group flex items-center h-12 w-full px-4 text-base font-medium rounded-lg transition-all duration-200 relative cursor-pointer touch-manipulation ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white active:bg-gray-600'
                  } ${(isCollapsed && !isMobileOpen) ? 'justify-center' : ''}`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <span className={`text-lg flex-shrink-0 ${(isCollapsed && !isMobileOpen) ? '' : 'mr-3'}`}>
                    {item.emoji}
                  </span>
                  {/* Show text on mobile or when not collapsed on desktop */}
                  {(isMobileOpen || !isCollapsed) && (
                    <span className="truncate">{item.short}</span>
                  )}
                  {/* Desktop tooltip for collapsed state */}
                  {(isCollapsed && !isMobileOpen) && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                      {item.short}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </nav>

        {/* Usage Stats - Show on mobile or when not collapsed on desktop */}
        {(isMobileOpen || !isCollapsed) && (
          <div className="p-4 border-t border-gray-700">
            <div className="bg-gray-700 rounded-lg p-3">
              <h3 className="text-xs font-semibold text-gray-400 mb-2">📊 USAGE</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-300">🎬 Videos</span>
                    <span className="text-orange-400">12/25</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-1.5 rounded-full" style={{width: '48%'}}></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300">🎨 Images</span>
                  <span className="text-green-400">∞</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed desktop state */}
        {(isCollapsed && !isMobileOpen) && (
          <div className="p-2 border-t border-gray-700">
            <div className="bg-gray-700 rounded-lg p-2 text-center group relative">
              <span className="text-lg">📊</span>
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                Usage Stats
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className={`min-h-screen transition-all duration-300 ${
        isCollapsed ? 'md:ml-16' : 'md:ml-64'
      } ${isMobileOpen ? 'ml-0' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Search (hidden on mobile to save space) */}
            <div className="flex items-center flex-1">
              {/* Mobile: Add left padding to avoid hamburger button */}
              <div className="ml-16 md:ml-0 flex-1">
                <div className="relative hidden lg:block max-w-md">
                  <button
                    onClick={openSearch}
                    className="w-full h-12 px-4 text-base bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors text-left flex items-center"
                  >
                    <Search className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-400">Search projects, templates, or ask AI...</span>
                    <div className="ml-auto flex items-center gap-1 text-xs text-gray-500">
                      <kbd className="px-1.5 py-0.5 bg-gray-600 rounded text-xs">⌘</kbd>
                      <kbd className="px-1.5 py-0.5 bg-gray-600 rounded text-xs">K</kbd>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right side - User info and actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Plan info - hidden on small screens */}
              <div className="text-right hidden lg:block">
                <div className="text-sm font-medium">Pro Plan</div>
                <div className="text-xs text-gray-400">25 videos remaining</div>
              </div>

              {/* Notifications */}
              <button className="h-12 w-12 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors relative touch-manipulation">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 h-12 px-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all touch-manipulation"
                  aria-label="User menu"
                >
                  <User className="w-5 h-5" />
                  <ChevronDown className="w-4 h-4 hidden sm:block" />
                </button>

                {/* Profile Dropdown Menu */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-[90vw] max-w-xs bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                    <div className="p-3 border-b border-gray-700">
                      <div className="font-medium">John Doe</div>
                      <div className="text-sm text-gray-400">john@example.com</div>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="flex items-center h-12 px-3 text-base hover:bg-gray-700 transition-colors touch-manipulation"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <User className="w-4 h-4 mr-3" />
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center h-12 px-3 text-base hover:bg-gray-700 transition-colors touch-manipulation"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                      </Link>
                      <Link
                        href="/pricing"
                        className="flex items-center h-12 px-3 text-base hover:bg-gray-700 transition-colors touch-manipulation"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <CreditCard className="w-4 h-4 mr-3" />
                        Billing
                      </Link>
                      <hr className="my-1 border-gray-700" />
                      <button
                        className="flex items-center w-full h-12 px-3 text-base hover:bg-gray-700 transition-colors text-red-400 touch-manipulation"
                        onClick={() => {
                          setShowProfileDropdown(false)
                          // Handle logout
                          console.log('Logout')
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={isSearchOpen} onClose={closeSearch} />
    </div>
  );
}
