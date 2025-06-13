'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Bell, User } from 'lucide-react';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const navigation = [
    { name: '🏠 Home', href: '/', emoji: '🏠', short: 'Home' },
    { name: '🏢 AEON Studio', href: '/studio', emoji: '🏢', short: 'Studio' },
    { name: '📚 Library', href: '/library', emoji: '📚', short: 'Library' },
    { name: '🎨 Image Gen', href: '/image-gen', emoji: '🎨', short: 'Images' },
    { name: '🎬 Video Gen', href: '/video-gen', emoji: '🎬', short: 'Videos' },
    { name: '🤖 Models', href: '/models', emoji: '🤖', short: 'Models' },
    { name: '🔗 API Access', href: '/api', emoji: '🔗', short: 'API' },
    { name: '⚙️ Settings', href: '/settings', emoji: '⚙️', short: 'Settings' },
    { name: '👤 Profile', href: '/profile', emoji: '👤', short: 'Profile' }
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className={`fixed left-0 top-0 h-full bg-gray-800 border-r border-gray-700 z-45 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                  <span className="text-xl">✨</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold">AEON</h1>
                  <p className="text-xs text-gray-400">AI Creative Studio</p>
                </div>
              </div>
            )}
            
            {isCollapsed && (
              <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg mx-auto">
                <span className="text-xl">✨</span>
              </div>
            )}
            
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:block p-1 hover:bg-gray-700 rounded transition-colors"
            >
              <span className="text-lg">{isCollapsed ? '👉' : '👈'}</span>
            </button>
          </div>
        </div>

        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative cursor-pointer ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } ${isCollapsed ? 'justify-center' : ''}`}
                onClick={() => setIsMobileOpen(false)}
              >
                <span className={`text-lg ${isCollapsed ? '' : 'mr-3'}`}>
                  {item.emoji}
                </span>
                {!isCollapsed && (
                  <span className="truncate">{item.short}</span>
                )}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                    {item.short}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </nav>

        {!isCollapsed && (
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

        {isCollapsed && (
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

      <div className={`transition-all duration-300 ${isCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="🔍 Search projects, templates, or ask AI..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-96 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden md:block">
                <div className="text-sm font-medium">Pro Plan</div>
                <div className="text-xs text-gray-400">25 videos remaining</div>
              </div>
              <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></span>
              </button>
              <button className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
