'use client'

import { Metadata } from 'next'
import { useState, useMemo } from 'react'
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Download,
  Share2,
  Trash2,
  Play,
  Eye,
  Calendar,
  Tag,
  Star,
  MoreHorizontal,
  FolderPlus,
  Upload,
  X,
  ChevronDown,
  SlidersHorizontal,
  Clock,
  TrendingUp
} from 'lucide-react'

export default function LibraryPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'views' | 'size'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [dateRange, setDateRange] = useState<'all' | 'today' | 'week' | 'month' | 'year'>('all')
  const [qualityFilter, setQualityFilter] = useState<'all' | 'hd' | '4k' | '8k'>('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filters = [
    { id: 'all', name: 'All Content', count: 156 },
    { id: 'videos', name: 'Videos', count: 42 },
    { id: 'images', name: 'Images', count: 89 },
    { id: 'audio', name: 'Audio', count: 25 },
    { id: 'drafts', name: 'Drafts', count: 12 },
    { id: 'favorites', name: 'Favorites', count: 8 }
  ]

  const content = [
    {
      id: 1,
      title: 'Summer Fashion Trends 2024',
      description: 'AI-generated fashion video showcasing summer trends',
      type: 'video',
      thumbnail: '/api/placeholder/300/200',
      duration: '0:58',
      size: '12.4 MB',
      sizeBytes: 13000000,
      views: '12.3K',
      viewsCount: 12300,
      likes: '1.2K',
      created: '2024-01-15',
      status: 'published',
      quality: '4k',
      tags: ['fashion', 'trends', 'summer', 'ai-generated', 'viral'],
      model: 'Runway Gen-3'
    },
    {
      id: 2,
      title: 'Product Showcase Animation',
      description: 'Marketing video template for product demonstrations',
      type: 'video',
      thumbnail: '/api/placeholder/300/200',
      duration: '1:24',
      size: '18.7 MB',
      sizeBytes: 19600000,
      views: '8.9K',
      viewsCount: 8900,
      likes: '892',
      created: '2024-01-14',
      status: 'published',
      quality: 'hd',
      tags: ['product', 'animation', 'showcase', 'marketing', 'template'],
      model: 'Stable Video'
    },
    {
      id: 3,
      title: 'Brand Logo Variations',
      description: 'Collection of AI-generated logo designs',
      type: 'image',
      thumbnail: '/api/placeholder/300/200',
      size: '2.1 MB',
      sizeBytes: 2200000,
      views: '5.4K',
      viewsCount: 5400,
      likes: '456',
      created: '2024-01-13',
      status: 'published',
      quality: '4k',
      tags: ['logo', 'branding', 'design', 'variations', 'ai-art'],
      model: 'DALL-E 3'
    },
    {
      id: 4,
      title: 'Background Music Track',
      description: 'Ambient music for video backgrounds',
      type: 'audio',
      thumbnail: '/api/placeholder/300/200',
      duration: '2:15',
      size: '4.8 MB',
      sizeBytes: 5000000,
      views: '3.2K',
      viewsCount: 3200,
      likes: '234',
      created: '2024-01-12',
      status: 'published',
      quality: 'hd',
      tags: ['music', 'background', 'ambient', 'royalty-free', 'loop'],
      model: 'MusicGen'
    },
    {
      id: 5,
      title: 'Tech Review Draft',
      description: 'Draft video for technology product review',
      type: 'video',
      thumbnail: '/api/placeholder/300/200',
      duration: '0:45',
      size: '8.9 MB',
      sizeBytes: 9300000,
      views: '0',
      viewsCount: 0,
      likes: '0',
      created: '2024-01-11',
      status: 'draft',
      quality: 'hd',
      tags: ['tech', 'review', 'draft', 'unfinished'],
      model: 'Runway Gen-3'
    },
    {
      id: 6,
      title: 'Social Media Banner Set',
      description: 'Collection of social media banners for various platforms',
      type: 'image',
      thumbnail: '/api/placeholder/300/200',
      size: '5.6 MB',
      sizeBytes: 5900000,
      views: '7.8K',
      viewsCount: 7800,
      likes: '678',
      created: '2024-01-10',
      status: 'published',
      quality: '4k',
      tags: ['social', 'banner', 'marketing', 'platforms', 'set'],
      model: 'Midjourney'
    },
    {
      id: 7,
      title: 'Corporate Presentation Template',
      description: 'Professional presentation template with animations',
      type: 'video',
      thumbnail: '/api/placeholder/300/200',
      duration: '3:20',
      size: '25.1 MB',
      sizeBytes: 26300000,
      views: '15.2K',
      viewsCount: 15200,
      likes: '1.8K',
      created: '2024-01-09',
      status: 'published',
      quality: '4k',
      tags: ['corporate', 'presentation', 'professional', 'business', 'template'],
      model: 'Runway Gen-3'
    },
    {
      id: 8,
      title: 'Nature Landscape Collection',
      description: 'AI-generated nature and landscape images',
      type: 'image',
      thumbnail: '/api/placeholder/300/200',
      size: '8.3 MB',
      sizeBytes: 8700000,
      views: '9.1K',
      viewsCount: 9100,
      likes: '1.1K',
      created: '2024-01-08',
      status: 'published',
      quality: '8k',
      tags: ['nature', 'landscape', 'scenery', 'ai-art', 'collection'],
      model: 'DALL-E 3'
    }
  ]

  // All available tags for filtering
  const allTags = Array.from(new Set(content.flatMap(item => item.tags))).sort()

  // Search suggestions based on content
  const searchSuggestionsData = [
    'fashion trends',
    'product showcase',
    'brand logo',
    'background music',
    'tech review',
    'social media',
    'corporate presentation',
    'nature landscape',
    'ai-generated',
    'marketing',
    'template',
    'viral content',
    '4k quality',
    'runway gen-3',
    'dall-e 3'
  ]

  // Advanced filtering and sorting logic
  const filteredAndSortedContent = useMemo(() => {
    let filtered = content.filter(item => {
      // Basic filter
      const matchesFilter = selectedFilter === 'all' ||
                           (selectedFilter === 'videos' && item.type === 'video') ||
                           (selectedFilter === 'images' && item.type === 'image') ||
                           (selectedFilter === 'audio' && item.type === 'audio') ||
                           (selectedFilter === 'drafts' && item.status === 'draft') ||
                           (selectedFilter === 'favorites' && item.viewsCount > 10000)

      // Search filter with advanced operators
      let matchesSearch = true
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()

        // Support for search operators
        if (query.startsWith('tag:')) {
          const tagQuery = query.replace('tag:', '').trim()
          matchesSearch = item.tags.some(tag => tag.toLowerCase().includes(tagQuery))
        } else if (query.startsWith('type:')) {
          const typeQuery = query.replace('type:', '').trim()
          matchesSearch = item.type.toLowerCase().includes(typeQuery)
        } else if (query.startsWith('model:')) {
          const modelQuery = query.replace('model:', '').trim()
          matchesSearch = item.model.toLowerCase().includes(modelQuery)
        } else {
          // Full-text search
          matchesSearch = item.title.toLowerCase().includes(query) ||
                        item.description.toLowerCase().includes(query) ||
                        item.tags.some(tag => tag.toLowerCase().includes(query)) ||
                        item.model.toLowerCase().includes(query)
        }
      }

      // Date range filter
      const matchesDateRange = (() => {
        if (dateRange === 'all') return true
        const itemDate = new Date(item.created)
        const now = new Date()

        switch (dateRange) {
          case 'today':
            return itemDate.toDateString() === now.toDateString()
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            return itemDate >= weekAgo
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
            return itemDate >= monthAgo
          case 'year':
            const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
            return itemDate >= yearAgo
          default:
            return true
        }
      })()

      // Quality filter
      const matchesQuality = qualityFilter === 'all' || item.quality === qualityFilter

      // Tags filter
      const matchesTags = selectedTags.length === 0 ||
                         selectedTags.every(tag => item.tags.includes(tag))

      return matchesFilter && matchesSearch && matchesDateRange && matchesQuality && matchesTags
    })

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case 'date':
          comparison = new Date(a.created).getTime() - new Date(b.created).getTime()
          break
        case 'name':
          comparison = a.title.localeCompare(b.title)
          break
        case 'views':
          comparison = a.viewsCount - b.viewsCount
          break
        case 'size':
          comparison = a.sizeBytes - b.sizeBytes
          break
        default:
          comparison = 0
      }

      return sortOrder === 'desc' ? -comparison : comparison
    })

    return filtered
  }, [content, selectedFilter, searchQuery, dateRange, qualityFilter, selectedTags, sortBy, sortOrder])

  // Handle search suggestions
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)

    if (value.trim()) {
      const suggestions = searchSuggestionsData.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5)
      setSearchSuggestions(suggestions)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSearchSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)

    // Add to recent searches
    const newRecent = [suggestion, ...recentSearches.filter(s => s !== suggestion)].slice(0, 5)
    setRecentSearches(newRecent)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearAllFilters = () => {
    setSelectedFilter('all')
    setSearchQuery('')
    setDateRange('all')
    setQualityFilter('all')
    setSelectedTags([])
    setSortBy('date')
    setSortOrder('desc')
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎬'
      case 'image': return '🖼️'
      case 'audio': return '🎵'
      default: return '📄'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/20 text-green-400'
      case 'draft': return 'bg-yellow-500/20 text-yellow-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Content Library</h1>
              <p className="text-gray-400">Manage and organize all your AI-generated content</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </button>
              <button className="border border-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all flex items-center">
                <FolderPlus className="w-4 h-4 mr-2" />
                New Folder
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              <div className="space-y-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedFilter === filter.id
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <span>{filter.name}</span>
                    <span className="text-sm text-gray-500">{filter.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Usage */}
            <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Storage Usage</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Used</span>
                  <span>2.4 GB / 10 GB</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{width: '24%'}}></div>
                </div>
                <button className="w-full text-center bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all">
                  Upgrade Storage
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="space-y-4 mb-6">
              {/* Main Search Bar */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search content, tags, or try 'tag:fashion' or 'type:video'..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    className="w-full h-12 pl-10 pr-4 py-3 text-base bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
                  />

                  {/* Search Suggestions */}
                  {showSuggestions && (searchSuggestions.length > 0 || recentSearches.length > 0) && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                      {recentSearches.length > 0 && (
                        <div className="p-3 border-b border-gray-700">
                          <div className="text-xs text-gray-400 mb-2 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Recent Searches
                          </div>
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => handleSearchSuggestionClick(search)}
                              className="block w-full text-left px-2 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      )}

                      {searchSuggestions.length > 0 && (
                        <div className="p-3">
                          <div className="text-xs text-gray-400 mb-2 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Suggestions
                          </div>
                          {searchSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSearchSuggestionClick(suggestion)}
                              className="block w-full text-left px-2 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className={`h-12 px-4 border border-gray-700 rounded-lg transition-colors flex items-center gap-2 ${
                      showAdvancedFilters ? 'bg-orange-500 text-white' : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <SlidersHorizontal className="w-5 h-5" />
                    <span className="hidden sm:inline">Filters</span>
                  </button>

                  <div className="flex bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`h-12 w-12 flex items-center justify-center transition-colors ${
                        viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Grid3X3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`h-12 w-12 flex items-center justify-center transition-colors ${
                        viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Advanced Filters */}
              {showAdvancedFilters && (
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Advanced Filters</h3>
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-orange-400 hover:text-orange-300"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Sort By */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="w-full h-10 px-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      >
                        <option value="date">Date Created</option>
                        <option value="name">Name</option>
                        <option value="views">Views</option>
                        <option value="size">File Size</option>
                      </select>
                    </div>

                    {/* Sort Order */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Order</label>
                      <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as any)}
                        className="w-full h-10 px-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      >
                        <option value="desc">Newest First</option>
                        <option value="asc">Oldest First</option>
                      </select>
                    </div>

                    {/* Date Range */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Date Range</label>
                      <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value as any)}
                        className="w-full h-10 px-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      >
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                      </select>
                    </div>

                    {/* Quality */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Quality</label>
                      <select
                        value={qualityFilter}
                        onChange={(e) => setQualityFilter(e.target.value as any)}
                        className="w-full h-10 px-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      >
                        <option value="all">All Qualities</option>
                        <option value="hd">HD</option>
                        <option value="4k">4K</option>
                        <option value="8k">8K</option>
                      </select>
                    </div>
                  </div>

                  {/* Tags Filter */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {allTags.slice(0, 15).map((tag) => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            selectedTags.includes(tag)
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                    {selectedTags.length > 0 && (
                      <div className="mt-2 text-sm text-gray-400">
                        Selected: {selectedTags.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Active Filters Summary */}
              {(selectedTags.length > 0 || dateRange !== 'all' || qualityFilter !== 'all' || searchQuery) && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-400">Active filters:</span>
                  {searchQuery && (
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-sm flex items-center">
                      Search: "{searchQuery}"
                      <button onClick={() => setSearchQuery('')} className="ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedTags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm flex items-center">
                      {tag}
                      <button onClick={() => toggleTag(tag)} className="ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {dateRange !== 'all' && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm flex items-center">
                      {dateRange}
                      <button onClick={() => setDateRange('all')} className="ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {qualityFilter !== 'all' && (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-sm flex items-center">
                      {qualityFilter}
                      <button onClick={() => setQualityFilter('all')} className="ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-400">
                Showing {filteredAndSortedContent.length} of {content.length} items
              </div>
              <div className="text-sm text-gray-400">
                Sorted by {sortBy} ({sortOrder === 'desc' ? 'newest' : 'oldest'} first)
              </div>
            </div>

            {/* Content Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedContent.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all group"
                  >
                    <div className="aspect-video bg-gray-700 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-2 left-2 text-lg">{getTypeIcon(item.type)}</div>
                      {item.duration && (
                        <div className="absolute bottom-2 left-2 text-xs bg-black/70 px-2 py-1 rounded">
                          {item.duration}
                        </div>
                      )}
                      <div className="absolute bottom-2 right-2 text-xs bg-black/70 px-2 py-1 rounded">
                        {item.size}
                      </div>
                      
                      {/* Hover Actions */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="flex items-center gap-2">
                          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                            {item.type === 'video' ? <Play className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                            <Download className="w-5 h-5" />
                          </button>
                          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm line-clamp-2">{item.title}</h3>
                        <button className="text-gray-400 hover:text-white">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                        <span>{item.views} views</span>
                        <span className={`px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{new Date(item.created).toLocaleDateString()}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredAndSortedContent.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 bg-gray-700 rounded flex items-center justify-center text-lg">
                        {getTypeIcon(item.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{item.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{item.size}</span>
                          {item.duration && <span>{item.duration}</span>}
                          <span>{item.views} views</span>
                          <span>{new Date(item.created).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                        <button className="p-2 text-gray-400 hover:text-white">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredAndSortedContent.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📁</div>
                <h3 className="text-xl font-semibold mb-2">No content found</h3>
                <p className="text-gray-400 mb-6">
                  {searchQuery ? 'Try adjusting your search terms' : 'Start creating content to see it here'}
                </p>
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all">
                  Create New Content
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
