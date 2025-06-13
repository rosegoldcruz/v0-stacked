'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  Clock, 
  Star, 
  Lightbulb, 
  Search,
  ArrowRight,
  Filter,
  Tag,
  Users,
  Zap
} from 'lucide-react'

interface Suggestion {
  id: string
  text: string
  type: 'search' | 'filter' | 'action'
  category: string
  popularity: number
  icon: string
  description?: string
  action?: () => void
}

interface SmartSuggestionsProps {
  context?: 'global' | 'library' | 'models' | 'studio'
  onSuggestionClick?: (suggestion: Suggestion) => void
  recentActivity?: string[]
  userPreferences?: string[]
}

export default function SmartSuggestions({ 
  context = 'global', 
  onSuggestionClick,
  recentActivity = [],
  userPreferences = []
}: SmartSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [activeTab, setActiveTab] = useState<'trending' | 'recent' | 'recommended'>('trending')

  // Generate context-aware suggestions
  useEffect(() => {
    const generateSuggestions = () => {
      const baseSuggestions: Suggestion[] = []

      // Global suggestions
      if (context === 'global') {
        baseSuggestions.push(
          {
            id: 'video-generation',
            text: 'video generation',
            type: 'search',
            category: 'Popular',
            popularity: 95,
            icon: '🎬',
            description: 'Create AI-powered videos from text'
          },
          {
            id: 'ai-avatars',
            text: 'AI avatars',
            type: 'search',
            category: 'Trending',
            popularity: 88,
            icon: '👤',
            description: 'Generate realistic human avatars'
          },
          {
            id: 'music-creation',
            text: 'music creation',
            type: 'search',
            category: 'Popular',
            popularity: 82,
            icon: '🎵',
            description: 'AI-generated music and soundtracks'
          }
        )
      }

      // Library-specific suggestions
      if (context === 'library') {
        baseSuggestions.push(
          {
            id: 'tag-viral',
            text: 'tag:viral',
            type: 'filter',
            category: 'Quick Filters',
            popularity: 90,
            icon: '🔥',
            description: 'Find your viral content'
          },
          {
            id: 'type-video',
            text: 'type:video',
            type: 'filter',
            category: 'Quick Filters',
            popularity: 85,
            icon: '🎬',
            description: 'Show only videos'
          },
          {
            id: 'recent-uploads',
            text: 'recent uploads',
            type: 'search',
            category: 'Quick Actions',
            popularity: 78,
            icon: '📤',
            description: 'Your latest content'
          }
        )
      }

      // Models-specific suggestions
      if (context === 'models') {
        baseSuggestions.push(
          {
            id: 'runway-gen3',
            text: 'Runway Gen-3',
            type: 'search',
            category: 'Popular Models',
            popularity: 92,
            icon: '🚀',
            description: 'Advanced video generation'
          },
          {
            id: 'dalle3',
            text: 'DALL-E 3',
            type: 'search',
            category: 'Popular Models',
            popularity: 89,
            icon: '🎨',
            description: 'Image generation model'
          },
          {
            id: 'free-models',
            text: 'free models',
            type: 'filter',
            category: 'Quick Filters',
            popularity: 75,
            icon: '💚',
            description: 'No-cost AI models'
          }
        )
      }

      // Studio-specific suggestions
      if (context === 'studio') {
        baseSuggestions.push(
          {
            id: 'quick-video',
            text: 'Create quick video',
            type: 'action',
            category: 'Quick Actions',
            popularity: 88,
            icon: '⚡',
            description: 'Start video creation'
          },
          {
            id: 'trending-templates',
            text: 'trending templates',
            type: 'search',
            category: 'Templates',
            popularity: 82,
            icon: '📋',
            description: 'Popular content templates'
          },
          {
            id: 'batch-create',
            text: 'batch creation',
            type: 'search',
            category: 'Advanced',
            popularity: 70,
            icon: '🔄',
            description: 'Create multiple videos'
          }
        )
      }

      // Add personalized suggestions based on recent activity
      if (recentActivity.length > 0) {
        recentActivity.slice(0, 3).forEach((activity, index) => {
          baseSuggestions.push({
            id: `recent-${index}`,
            text: activity,
            type: 'search',
            category: 'Recent',
            popularity: 60 + index * 5,
            icon: '🕒',
            description: 'From your recent activity'
          })
        })
      }

      // Add preference-based suggestions
      if (userPreferences.length > 0) {
        userPreferences.slice(0, 2).forEach((preference, index) => {
          baseSuggestions.push({
            id: `pref-${index}`,
            text: preference,
            type: 'search',
            category: 'For You',
            popularity: 70 + index * 5,
            icon: '⭐',
            description: 'Based on your preferences'
          })
        })
      }

      setSuggestions(baseSuggestions)
    }

    generateSuggestions()
  }, [context, recentActivity, userPreferences])

  const filteredSuggestions = suggestions.filter(suggestion => {
    switch (activeTab) {
      case 'trending':
        return suggestion.popularity >= 80
      case 'recent':
        return suggestion.category === 'Recent' || suggestion.category === 'Quick Actions'
      case 'recommended':
        return suggestion.category === 'For You' || suggestion.category === 'Popular'
      default:
        return true
    }
  }).sort((a, b) => b.popularity - a.popularity)

  const handleSuggestionClick = (suggestion: Suggestion) => {
    if (suggestion.action) {
      suggestion.action()
    }
    onSuggestionClick?.(suggestion)
  }

  const tabs = [
    { id: 'trending', name: 'Trending', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'recent', name: 'Recent', icon: <Clock className="w-4 h-4" /> },
    { id: 'recommended', name: 'For You', icon: <Star className="w-4 h-4" /> }
  ]

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
            Smart Suggestions
          </h3>
          <div className="text-xs text-gray-400">
            {filteredSuggestions.length} suggestions
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-700 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Suggestions List */}
      <div className="max-h-64 overflow-y-auto">
        {filteredSuggestions.length > 0 ? (
          <div className="p-2">
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center p-3 hover:bg-gray-700 rounded-lg transition-colors group"
              >
                <span className="text-2xl mr-3">{suggestion.icon}</span>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-white">{suggestion.text}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      suggestion.type === 'search' ? 'bg-blue-500/20 text-blue-400' :
                      suggestion.type === 'filter' ? 'bg-green-500/20 text-green-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {suggestion.type}
                    </span>
                  </div>
                  {suggestion.description && (
                    <div className="text-sm text-gray-400">{suggestion.description}</div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">{suggestion.category}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-gray-500">
                    {suggestion.popularity}% popular
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-orange-400 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="text-4xl mb-2">💡</div>
            <div className="text-gray-400 text-sm">No suggestions available</div>
          </div>
        )}
      </div>

      {/* Quick Actions Footer */}
      <div className="p-4 border-t border-gray-700 bg-gray-800/30">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-400">
            Suggestions update based on your activity
          </div>
          <div className="flex items-center gap-4">
            <button className="text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1">
              <Search className="w-3 h-3" />
              Search Tips
            </button>
            <button className="text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Filter Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
