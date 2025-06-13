'use client'

import { useState, useMemo } from 'react'
import { 
  Search, 
  Filter, 
  Star, 
  TrendingUp, 
  Zap, 
  Clock, 
  Users,
  BarChart3,
  CheckCircle,
  X,
  ArrowUpDown,
  Eye,
  Play,
  Download
} from 'lucide-react'

interface Model {
  id: string
  name: string
  description: string
  category: 'video' | 'image' | 'audio' | 'text'
  provider: string
  performance: number
  popularity: number
  cost: 'free' | 'low' | 'medium' | 'high'
  capabilities: string[]
  useCases: string[]
  rating: number
  reviews: number
  lastUpdated: string
  featured: boolean
  tags: string[]
}

interface ModelBrowserProps {
  onModelSelect?: (model: Model) => void
  selectedModels?: string[]
  showComparison?: boolean
}

export default function ModelBrowser({ onModelSelect, selectedModels = [], showComparison = false }: ModelBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'popularity' | 'performance' | 'rating' | 'updated'>('popularity')
  const [costFilter, setCostFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([])

  const models: Model[] = [
    {
      id: 'runway-gen3',
      name: 'Runway Gen-3',
      description: 'State-of-the-art video generation with exceptional quality and control',
      category: 'video',
      provider: 'Runway',
      performance: 95,
      popularity: 92,
      cost: 'high',
      capabilities: ['text-to-video', 'image-to-video', 'video-editing', 'motion-control'],
      useCases: ['marketing videos', 'social content', 'film production', 'advertising'],
      rating: 4.8,
      reviews: 1247,
      lastUpdated: '2024-01-20',
      featured: true,
      tags: ['video', 'generation', 'high-quality', 'professional']
    },
    {
      id: 'dalle3',
      name: 'DALL-E 3',
      description: 'Advanced image generation with improved prompt understanding',
      category: 'image',
      provider: 'OpenAI',
      performance: 90,
      popularity: 88,
      cost: 'medium',
      capabilities: ['text-to-image', 'style-transfer', 'inpainting', 'variations'],
      useCases: ['concept art', 'marketing materials', 'social media', 'illustrations'],
      rating: 4.7,
      reviews: 2156,
      lastUpdated: '2024-01-18',
      featured: true,
      tags: ['image', 'generation', 'creative', 'versatile']
    },
    {
      id: 'elevenlabs-voice',
      name: 'ElevenLabs Voice',
      description: 'Realistic voice synthesis with emotion and accent control',
      category: 'audio',
      provider: 'ElevenLabs',
      performance: 88,
      popularity: 85,
      cost: 'medium',
      capabilities: ['text-to-speech', 'voice-cloning', 'emotion-control', 'multilingual'],
      useCases: ['voiceovers', 'audiobooks', 'podcasts', 'virtual assistants'],
      rating: 4.6,
      reviews: 892,
      lastUpdated: '2024-01-15',
      featured: false,
      tags: ['audio', 'voice', 'synthesis', 'realistic']
    },
    {
      id: 'stable-video',
      name: 'Stable Video Diffusion',
      description: 'Open-source video generation with customizable parameters',
      category: 'video',
      provider: 'Stability AI',
      performance: 82,
      popularity: 78,
      cost: 'low',
      capabilities: ['text-to-video', 'image-to-video', 'custom-training'],
      useCases: ['content creation', 'prototyping', 'education', 'research'],
      rating: 4.4,
      reviews: 567,
      lastUpdated: '2024-01-12',
      featured: false,
      tags: ['video', 'open-source', 'customizable', 'affordable']
    },
    {
      id: 'midjourney',
      name: 'Midjourney',
      description: 'Artistic image generation with unique aesthetic styles',
      category: 'image',
      provider: 'Midjourney',
      performance: 85,
      popularity: 90,
      cost: 'medium',
      capabilities: ['text-to-image', 'style-variations', 'upscaling', 'artistic-styles'],
      useCases: ['digital art', 'concept design', 'creative projects', 'inspiration'],
      rating: 4.5,
      reviews: 1834,
      lastUpdated: '2024-01-10',
      featured: true,
      tags: ['image', 'artistic', 'creative', 'popular']
    },
    {
      id: 'musicgen',
      name: 'MusicGen',
      description: 'AI music generation from text descriptions',
      category: 'audio',
      provider: 'Meta',
      performance: 75,
      popularity: 70,
      cost: 'free',
      capabilities: ['text-to-music', 'melody-conditioning', 'genre-control'],
      useCases: ['background music', 'soundtracks', 'jingles', 'ambient audio'],
      rating: 4.2,
      reviews: 423,
      lastUpdated: '2024-01-08',
      featured: false,
      tags: ['audio', 'music', 'free', 'experimental']
    }
  ]

  const categories = [
    { id: 'all', name: 'All Models', icon: '🤖' },
    { id: 'video', name: 'Video', icon: '🎬' },
    { id: 'image', name: 'Image', icon: '🖼️' },
    { id: 'audio', name: 'Audio', icon: '🎵' },
    { id: 'text', name: 'Text', icon: '📝' }
  ]

  const allCapabilities = Array.from(new Set(models.flatMap(m => m.capabilities))).sort()

  const filteredAndSortedModels = useMemo(() => {
    let filtered = models.filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           model.capabilities.some(cap => cap.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           model.useCases.some(use => use.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === 'all' || model.category === selectedCategory
      const matchesCost = costFilter === 'all' || model.cost === costFilter
      const matchesCapabilities = selectedCapabilities.length === 0 || 
                                 selectedCapabilities.every(cap => model.capabilities.includes(cap))

      return matchesSearch && matchesCategory && matchesCost && matchesCapabilities
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity
        case 'performance':
          return b.performance - a.performance
        case 'rating':
          return b.rating - a.rating
        case 'updated':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [models, searchQuery, selectedCategory, sortBy, costFilter, selectedCapabilities])

  const toggleCapability = (capability: string) => {
    setSelectedCapabilities(prev =>
      prev.includes(capability)
        ? prev.filter(c => c !== capability)
        : [...prev, capability]
    )
  }

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'free': return 'text-green-400'
      case 'low': return 'text-blue-400'
      case 'medium': return 'text-yellow-400'
      case 'high': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getCostLabel = (cost: string) => {
    switch (cost) {
      case 'free': return 'Free'
      case 'low': return '$'
      case 'medium': return '$$'
      case 'high': return '$$$'
      default: return cost
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search models by name, capabilities, or use cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-4 py-3 text-base bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-12 px-4 bg-gray-800 border border-gray-700 rounded-lg text-white"
          >
            <option value="popularity">Most Popular</option>
            <option value="performance">Best Performance</option>
            <option value="rating">Highest Rated</option>
            <option value="updated">Recently Updated</option>
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`h-12 px-4 border border-gray-700 rounded-lg transition-colors flex items-center gap-2 ${
              showFilters ? 'bg-orange-500 text-white' : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cost Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Cost</label>
                <select
                  value={costFilter}
                  onChange={(e) => setCostFilter(e.target.value)}
                  className="w-full h-10 px-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                >
                  <option value="all">All Costs</option>
                  <option value="free">Free</option>
                  <option value="low">Low Cost ($)</option>
                  <option value="medium">Medium Cost ($$)</option>
                  <option value="high">High Cost ($$$)</option>
                </select>
              </div>

              {/* Capabilities */}
              <div>
                <label className="block text-sm font-medium mb-2">Capabilities</label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {allCapabilities.map((capability) => (
                    <button
                      key={capability}
                      onClick={() => toggleCapability(capability)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedCapabilities.includes(capability)
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {capability}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          {filteredAndSortedModels.length} models found
        </div>
        {showComparison && selectedModels.length > 0 && (
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
            Compare {selectedModels.length} Models
          </button>
        )}
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAndSortedModels.map((model) => (
          <div
            key={model.id}
            className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border transition-all hover:border-gray-600 ${
              selectedModels.includes(model.id) ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-gray-700'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold">{model.name}</h3>
                  {model.featured && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                </div>
                <p className="text-sm text-gray-400">{model.provider}</p>
              </div>
              <div className={`text-lg font-bold ${getCostColor(model.cost)}`}>
                {getCostLabel(model.cost)}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">{model.description}</p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-orange-400">{model.performance}</div>
                <div className="text-xs text-gray-500">Performance</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">{model.rating}</div>
                <div className="text-xs text-gray-500">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">{model.reviews}</div>
                <div className="text-xs text-gray-500">Reviews</div>
              </div>
            </div>

            {/* Capabilities */}
            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Capabilities</div>
              <div className="flex flex-wrap gap-1">
                {model.capabilities.slice(0, 3).map((capability) => (
                  <span
                    key={capability}
                    className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                  >
                    {capability}
                  </span>
                ))}
                {model.capabilities.length > 3 && (
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                    +{model.capabilities.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => onModelSelect?.(model)}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all"
              >
                Use Model
              </button>
              <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedModels.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No models found</h3>
          <p className="text-gray-400">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  )
}
