'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Search, 
  Clock, 
  TrendingUp, 
  Command, 
  ArrowRight,
  X,
  Filter,
  Star,
  Video,
  Image,
  Music,
  Settings,
  User,
  CreditCard
} from 'lucide-react'

interface SearchResult {
  id: string
  title: string
  description: string
  type: 'content' | 'model' | 'setting' | 'page'
  category: string
  href: string
  icon: string
  tags?: string[]
}

interface GlobalSearchProps {
  isOpen: boolean
  onClose: () => void
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Mock search data
  const searchData: SearchResult[] = [
    // Content
    { id: '1', title: 'Summer Fashion Trends', description: 'AI-generated fashion video', type: 'content', category: 'Videos', href: '/library?filter=videos', icon: '🎬', tags: ['fashion', 'trends', 'summer'] },
    { id: '2', title: 'Product Showcase', description: 'Marketing video template', type: 'content', category: 'Videos', href: '/library?filter=videos', icon: '🎬', tags: ['product', 'marketing'] },
    { id: '3', title: 'Brand Logo Collection', description: 'AI-generated logos', type: 'content', category: 'Images', href: '/library?filter=images', icon: '🖼️', tags: ['logo', 'branding'] },
    
    // Models
    { id: '4', title: 'Runway Gen-3', description: 'Advanced video generation model', type: 'model', category: 'Video Models', href: '/models?category=video', icon: '🤖', tags: ['video', 'generation', 'runway'] },
    { id: '5', title: 'DALL-E 3', description: 'Image generation model', type: 'model', category: 'Image Models', href: '/models?category=image', icon: '🎨', tags: ['image', 'generation', 'dalle'] },
    { id: '6', title: 'ElevenLabs Voice', description: 'Voice synthesis model', type: 'model', category: 'Audio Models', href: '/models?category=audio', icon: '🎵', tags: ['voice', 'audio', 'synthesis'] },
    
    // Settings & Pages
    { id: '7', title: 'Account Settings', description: 'Manage your account preferences', type: 'setting', category: 'Settings', href: '/settings', icon: '⚙️', tags: ['account', 'preferences'] },
    { id: '8', title: 'Billing & Subscription', description: 'Manage your subscription', type: 'setting', category: 'Settings', href: '/settings?tab=billing', icon: '💳', tags: ['billing', 'subscription', 'payment'] },
    { id: '9', title: 'API Access', description: 'Manage API keys and integration', type: 'page', category: 'Developer', href: '/api-access', icon: '🔗', tags: ['api', 'integration', 'developer'] },
    { id: '10', title: 'Video Forge', description: 'Create AI videos from scripts', type: 'page', category: 'Tools', href: '/video-forge', icon: '🎬', tags: ['video', 'creation', 'ai'] },
    { id: '11', title: 'Human Studio', description: 'Create AI avatars and presenters', type: 'page', category: 'Tools', href: '/human-studio', icon: '👤', tags: ['avatar', 'human', 'presenter'] },
    { id: '12', title: 'Sound Lab', description: 'Generate music and audio', type: 'page', category: 'Tools', href: '/sound-lab', icon: '🎵', tags: ['music', 'audio', 'generation'] }
  ]

  const popularSearches = [
    'video generation',
    'AI avatars',
    'music creation',
    'image editing',
    'API documentation',
    'billing settings'
  ]

  // Search function
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = searchData.filter(item => {
        const searchLower = searchQuery.toLowerCase()
        return (
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.category.toLowerCase().includes(searchLower) ||
          item.tags?.some(tag => tag.toLowerCase().includes(searchLower))
        )
      })

      // Sort by relevance (exact matches first, then partial matches)
      const sorted = filtered.sort((a, b) => {
        const aExact = a.title.toLowerCase().includes(searchQuery.toLowerCase())
        const bExact = b.title.toLowerCase().includes(searchQuery.toLowerCase())
        if (aExact && !bExact) return -1
        if (!aExact && bExact) return 1
        return 0
      })

      setResults(sorted)
      setSelectedIndex(0)
      setIsLoading(false)
    }, 200)
  }

  // Handle search input
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(query)
    }, 150)

    return () => clearTimeout(debounceTimer)
  }, [query])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('aeon-recent-searches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (results[selectedIndex]) {
            handleResultClick(results[selectedIndex])
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, onClose])

  const handleResultClick = (result: SearchResult) => {
    // Add to recent searches
    const newRecent = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5)
    setRecentSearches(newRecent)
    localStorage.setItem('aeon-recent-searches', JSON.stringify(newRecent))

    // Navigate to result
    router.push(result.href)
    onClose()
  }

  const handleRecentSearchClick = (search: string) => {
    setQuery(search)
    performSearch(search)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('aeon-recent-searches')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="flex items-start justify-center pt-[10vh] px-4">
        <div className="w-full max-w-2xl bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center px-6 py-4 border-b border-gray-700">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search models, library content, settings..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
            />
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <kbd className="px-2 py-1 bg-gray-700 rounded">↑↓</kbd>
              <span>navigate</span>
              <kbd className="px-2 py-1 bg-gray-700 rounded">↵</kbd>
              <span>select</span>
              <kbd className="px-2 py-1 bg-gray-700 rounded">esc</kbd>
              <span>close</span>
            </div>
            <button
              onClick={onClose}
              className="ml-3 p-1 hover:bg-gray-700 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 text-gray-400">Searching...</span>
              </div>
            ) : query && results.length > 0 ? (
              <div className="py-2">
                {results.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className={`w-full flex items-center px-6 py-3 hover:bg-gray-700 transition-colors ${
                      index === selectedIndex ? 'bg-gray-700' : ''
                    }`}
                  >
                    <span className="text-2xl mr-4">{result.icon}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-white">{result.title}</div>
                      <div className="text-sm text-gray-400">{result.description}</div>
                      <div className="text-xs text-gray-500 mt-1">{result.category}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500" />
                  </button>
                ))}
              </div>
            ) : query && !isLoading ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🔍</div>
                <div className="text-gray-400">No results found for "{query}"</div>
                <div className="text-sm text-gray-500 mt-2">Try different keywords or check spelling</div>
              </div>
            ) : (
              <div className="py-4">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="px-6 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-400 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Recent Searches
                      </h3>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-gray-500 hover:text-gray-400"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleRecentSearchClick(search)}
                          className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div className="px-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Popular Searches
                  </h3>
                  <div className="space-y-1">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearchClick(search)}
                        className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
