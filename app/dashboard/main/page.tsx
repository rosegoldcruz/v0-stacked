'use client'

import React, { useState, useEffect } from 'react'
import { Search, Bell, Settings, User, Play, TrendingUp, Zap, Crown, Star, ArrowRight, Plus, Activity, Clock, Target, Sparkles, Video, Image, Music, Bot, Megaphone, Code } from 'lucide-react'

export default function AEONMainDashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // MAIN 6 TILES - SELLING POINTS
  const mainFeatures = [
    {
      id: 'aeon-video',
      title: '🎬 AEON Video',
      subtitle: '1-Minute AI Videos',
      description: 'Generate viral TikTok videos in seconds with trending AI',
      metrics: '18M+ videos created',
      price: '$50-100/mo',
      gradient: 'from-orange-500 to-red-600',
      highlight: 'MAIN FEATURE',
      crown: true,
      tag: '🔥 HOT'
    },
    {
      id: 'ads-creator',
      title: '📺 AI Ads Studio',
      subtitle: 'Like Creatify Pro',
      description: 'Create converting video ads with AI avatars & voiceovers',
      metrics: '89% conversion boost',
      gradient: 'from-purple-500 to-indigo-600',
      tag: '💰 PROFIT'
    },
    {
      id: 'video-models',
      title: '🤖 Video Models Hub',
      subtitle: 'All Replicate Models',
      description: 'Access Runway, Luma, Kling, Haiper + 50+ video models',
      metrics: '60+ AI models',
      gradient: 'from-blue-500 to-cyan-600',
      tag: '⚡ POWER'
    },
    {
      id: 'ai-agents',
      title: '🧠 AI Agents + GPT Coder',
      subtitle: 'Complete AI Workforce',
      description: 'Marketing agents, code generation, campaign automation',
      metrics: '12 AI agents',
      gradient: 'from-green-500 to-teal-600',
      tag: '🚀 FUTURE'
    },
    {
      id: 'creative-suite',
      title: '🎨 Creative Everything',
      subtitle: 'Images + Music + Design',
      description: 'DALL-E, Midjourney, Suno AI, Canvas editor all-in-one',
      metrics: 'Unlimited generations',
      gradient: 'from-pink-500 to-rose-600',
      tag: '♾️ UNLIMITED'
    },
    {
      id: 'campaign-hub',
      title: '📈 Campaign Command Center',
      subtitle: 'Marketing Automation',
      description: 'Multi-platform campaigns, analytics, viral optimization',
      metrics: '300% engagement',
      gradient: 'from-yellow-500 to-orange-600',
      tag: '📊 RESULTS'
    }
  ]

  const recentProjects = [
    { name: 'TikTok Dance Video', type: '🎬', status: 'completed', time: '2 min ago' },
    { name: 'Product Ad Campaign', type: '📺', status: 'rendering', time: '5 min ago' },
    { name: 'Music Video Concept', type: '🎵', status: 'completed', time: '12 min ago' },
    { name: 'Brand Identity Assets', type: '🎨', status: 'completed', time: '28 min ago' }
  ]

  const trendingTemplates = [
    { name: 'Viral Dance Trend', category: 'TikTok', uses: '12.3K', emoji: '💃' },
    { name: 'Product Unboxing', category: 'YouTube', uses: '8.7K', emoji: '📦' },
    { name: 'Before/After Reveal', category: 'Instagram', uses: '15.2K', emoji: '✨' },
    { name: 'Tutorial Explainer', category: 'Multi', uses: '9.1K', emoji: '🎓' }
  ]

  const quickActions = [
    { name: 'New Video', icon: '🎬', action: 'video' },
    { name: 'Generate Ad', icon: '📺', action: 'ad' },
    { name: 'Create Image', icon: '🎨', action: 'image' },
    { name: 'AI Agent', icon: '🤖', action: 'agent' }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AEON Studio</h1>
                <p className="text-sm text-gray-400">Next-Gen AI Creative Platform</p>
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="🔍 Search projects, templates, or ask AI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-96 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium">Pro Plan</div>
              <div className="text-xs text-gray-400">25 videos remaining</div>
            </div>
            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></span>
            </button>
            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-72 bg-gray-800 border-r border-gray-700 p-6">
          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-400 mb-4">⚡ QUICK CREATE</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map(action => (
                <button
                  key={action.action}
                  className="p-3 bg-gray-700 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 rounded-lg text-center transition-all group"
                >
                  <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{action.icon}</div>
                  <div className="text-xs font-medium">{action.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Projects */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-400 mb-4">📁 RECENT</h3>
            <div className="space-y-2">
              {recentProjects.map((project, i) => (
                <div key={i} className="flex items-center space-x-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition-colors">
                  <span className="text-lg">{project.type}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{project.name}</div>
                    <div className="text-xs text-gray-400">{project.time}</div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${project.status === 'completed' ? 'bg-green-400' : 'bg-orange-400'}`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Stats */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3">📊 THIS MONTH</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>🎬 Videos</span>
                  <span className="text-orange-400">23/25</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>🎨 Images</span>
                  <span className="text-green-400">∞</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>🎵 Music</span>
                  <span className="text-blue-400">∞</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">Welcome back! 👋</h2>
                <p className="text-gray-400">Ready to create something viral? Pick your weapon below.</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-400">{currentTime.toLocaleTimeString()}</div>
                <div className="text-sm text-gray-400">{currentTime.toLocaleDateString()}</div>
              </div>
            </div>
          </div>

          {/* MAIN 6 FEATURES GRID - THE SELLING POINTS */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              🚀 Complete AI Creative Arsenal
              <span className="ml-3 px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-sm font-medium">
                Everything You Need
              </span>
            </h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {mainFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className={`relative p-6 bg-gradient-to-br ${feature.gradient} rounded-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 group overflow-hidden`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                  </div>

                  {/* Crown for premium feature */}
                  {feature.crown && (
                    <div className="absolute -top-2 -right-2">
                      <div className="p-2 bg-yellow-400 rounded-full">
                        <Crown className="w-4 h-4 text-gray-900" />
                      </div>
                    </div>
                  )}

                  {/* Highlight badge */}
                  {feature.highlight && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full whitespace-nowrap">
                        {feature.highlight}
                      </span>
                    </div>
                  )}

                  {/* Hot tag */}
                  {feature.tag && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-black/30 backdrop-blur-sm rounded-full text-xs font-bold">
                        {feature.tag}
                      </span>
                    </div>
                  )}

                  <div className="relative z-10">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-1">{feature.title}</h3>
                      <p className="text-sm opacity-90 font-medium">{feature.subtitle}</p>
                    </div>
                    
                    <p className="text-sm opacity-80 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold bg-black/20 backdrop-blur-sm px-2 py-1 rounded">
                        {feature.metrics}
                      </div>
                      {feature.price && (
                        <div className="text-xs font-bold">
                          {feature.price}
                        </div>
                      )}
                    </div>

                    {/* Hover arrow */}
                    <div className="absolute bottom-4 right-4 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Templates */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center">
                🔥 Trending Templates
                <span className="ml-2 px-2 py-1 bg-red-600 rounded-full text-xs">VIRAL</span>
              </h2>
              <button className="text-orange-400 hover:text-orange-300 flex items-center">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {trendingTemplates.map((template, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 cursor-pointer transition-colors border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{template.emoji}</span>
                    <span className="text-xs bg-orange-600 px-2 py-1 rounded-full">{template.category}</span>
                  </div>
                  <h3 className="font-medium mb-2">{template.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{template.uses} uses</span>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                📊 Performance
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Views</span>
                  <span className="font-bold text-green-400">2.3M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Engagement Rate</span>
                  <span className="font-bold text-blue-400">8.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Viral Videos</span>
                  <span className="font-bold text-orange-400">12</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                ⚡ AI Credits
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Video Credits</span>
                  <span className="font-bold text-orange-400">25/25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Image Credits</span>
                  <span className="font-bold text-green-400">∞</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Next Reset</span>
                  <span className="font-bold text-gray-300">Jan 15</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                🎯 Goals
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">Monthly Videos</span>
                    <span className="text-sm">23/30</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{width: '77%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">Viral Target</span>
                    <span className="text-sm">12/15</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '80%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
