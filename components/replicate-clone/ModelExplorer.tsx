'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Clock, Star, Zap, Lock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSubscription } from '@/hooks/useSubscription'

const MODEL_CATEGORIES = [
  { id: 'all', name: 'All Models', icon: '🎯' },
  { id: 'image', name: 'Image Generation', icon: '🎨' },
  { id: 'video', name: 'Video Generation', icon: '🎬' },
  { id: 'audio', name: 'Audio & Music', icon: '🎵' },
  { id: 'text', name: 'Language Models', icon: '📝' },
  { id: '3d', name: '3D Generation', icon: '🎮' },
  { id: 'upscale', name: 'Enhancement', icon: '✨' },
]

const FEATURED_MODELS = [
  {
    id: 'stable-diffusion-xl',
    name: 'Stable Diffusion XL',
    category: 'image',
    description: 'High-quality image generation',
    runs: '10M+',
    avgTime: '5s',
    tier: 'free'
  },
  {
    id: 'animate-diff',
    name: 'AnimateDiff',
    category: 'video',
    description: 'Text to video animation',
    runs: '500K+',
    avgTime: '30s',
    tier: 'starter'
  },
  {
    id: 'musicgen',
    name: 'MusicGen',
    category: 'audio',
    description: 'AI music generation',
    runs: '1M+',
    avgTime: '20s',
    tier: 'free'
  }
]

export default function ModelExplorer() {
  const { tier } = useSubscription()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [models, setModels] = useState(FEATURED_MODELS)

  const canAccessModel = (modelTier: string) => {
    if (tier === 'ultimate') return true
    if (tier === 'pro' && ['free', 'starter'].includes(modelTier)) return true
    if (tier === 'starter' && modelTier === 'free') return true
    return tier === modelTier
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">AI Model Explorer</h1>
          <p className="text-gray-400">
            Access cutting-edge AI models for all your creative needs
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-800"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {MODEL_CATEGORIES.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat.id)}
                className="whitespace-nowrap"
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Models Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model) => {
            const hasAccess = canAccessModel(model.tier)
            
            return (
              <Card
                key={model.id}
                className={`p-6 bg-gray-900 border-gray-800 relative ${
                  !hasAccess ? 'opacity-75' : ''
                }`}
              >
                {!hasAccess && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                    <div className="text-center">
                      <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">
                        Upgrade to {model.tier === 'starter' ? 'Starter' : 'Pro'} to access
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
                    <p className="text-gray-400 text-sm">{model.description}</p>
                  </div>
                  <span className="text-2xl">{MODEL_CATEGORIES.find(c => c.id === model.category)?.icon}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    <span>{model.runs} runs</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>~{model.avgTime}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  variant={hasAccess ? 'default' : 'secondary'}
                  disabled={!hasAccess}
                >
                  {hasAccess ? 'Try Model' : 'Upgrade to Access'}
                </Button>
              </Card>
            )
          })}
        </div>

        {/* Tier Notice */}
        {(tier === 'free' || tier === 'starter') && (
          <Card className="mt-8 p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {tier === 'free' ? 'Unlock All Models' : 'Get AEON Studio Access'}
                </h3>
                <p className="text-gray-400">
                  {tier === 'free' 
                    ? 'Upgrade to access all AI models and create longer videos'
                    : 'Upgrade to Pro for AEON Studio - AI-powered video editing'
                  }
                </p>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                Upgrade Now
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
