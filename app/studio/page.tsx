'use client'

import Link from 'next/link'
import {
  Video,
  Image,
  Music,
  Users,
  TrendingUp,
  BarChart3,
  Sparkles,
  Play,
  ArrowRight,
  Clock,
  Star,
  Zap
} from 'lucide-react'

export default function StudioPage() {
  const tools = [
    {
      id: 'video-forge',
      name: 'Video Forge',
      icon: <Video className="w-8 h-8" />,
      description: 'Transform scripts into viral videos with AI narration and visuals',
      href: '/video-forge',
      status: 'ready',
      gradient: 'from-red-500 to-orange-600',
      tag: '🔥 HOT'
    },
    {
      id: 'visual-creator',
      name: 'Visual Creator',
      icon: <Image className="w-8 h-8" />,
      description: 'Generate stunning visuals and artwork with advanced AI models',
      href: '/visual-creator',
      status: 'ready',
      gradient: 'from-purple-500 to-indigo-600',
      tag: '🎨 NEW'
    },
    {
      id: 'human-studio',
      name: 'Human Studio',
      icon: <Users className="w-8 h-8" />,
      description: 'Create realistic human avatars and AI presenters',
      href: '/human-studio',
      status: 'ready',
      gradient: 'from-blue-500 to-cyan-600',
      tag: '👤 BETA'
    },
    {
      id: 'sound-lab',
      name: 'Sound Lab',
      icon: <Music className="w-8 h-8" />,
      description: 'AI-powered music, sound effects, and voice generation',
      href: '/sound-lab',
      status: 'ready',
      gradient: 'from-green-500 to-teal-600',
      tag: '🎵 LIVE'
    },
    {
      id: 'mass-creator',
      name: 'Mass Creator',
      icon: <TrendingUp className="w-8 h-8" />,
      description: 'Batch create hundreds of videos and content variations',
      href: '/mass-creator',
      status: 'premium',
      gradient: 'from-yellow-500 to-orange-600',
      tag: '⚡ PRO'
    },
    {
      id: 'campaign-hub',
      name: 'Campaign Hub',
      icon: <BarChart3 className="w-8 h-8" />,
      description: 'Manage multi-platform campaigns and analytics',
      href: '/campaign-hub',
      status: 'premium',
      gradient: 'from-pink-500 to-rose-600',
      tag: '📊 PRO'
    }
  ]

  const recentProjects = [
    {
      id: 1,
      title: 'Summer Fashion Trends',
      type: 'Video',
      thumbnail: '/api/placeholder/160/90',
      duration: '0:58',
      views: '12.3K',
      status: 'published',
      tool: 'Video Forge'
    },
    {
      id: 2,
      title: 'Product Showcase',
      type: 'Image',
      thumbnail: '/api/placeholder/160/90',
      views: '8.7K',
      status: 'published',
      tool: 'Visual Creator'
    },
    {
      id: 3,
      title: 'Brand Jingle',
      type: 'Audio',
      thumbnail: '/api/placeholder/160/90',
      duration: '0:30',
      views: '5.2K',
      status: 'draft',
      tool: 'Sound Lab'
    }
  ]

  const quickActions = [
    { name: 'New Video', icon: '🎬', action: 'video' },
    { name: 'Generate Image', icon: '🖼️', action: 'image' },
    { name: 'Create Music', icon: '🎵', action: 'music' },
    { name: 'AI Avatar', icon: '👤', action: 'avatar' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-8 lg:mb-0">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl mr-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">AEON Studio</h1>
                  <p className="text-gray-400">Your AI Creative Command Center</p>
                </div>
              </div>
              <p className="text-xl text-gray-300 max-w-2xl">
                Transform ideas into viral content with our suite of AI-powered creative tools. 
                From videos to visuals, we've got everything you need to dominate social media.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/video-forge"
                className="w-full sm:w-auto h-12 bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center touch-manipulation"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Creating
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/library"
                className="w-full sm:w-auto h-12 border border-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all flex items-center justify-center touch-manipulation"
              >
                View Library
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* AI Tools Grid */}
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
                <h2 className="text-2xl font-bold">AI Creative Tools</h2>
                <div className="text-sm text-gray-400">Choose your weapon</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="group relative w-full max-w-sm mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105 touch-manipulation"
                  >
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="text-xs px-2 py-1 bg-gray-700 rounded-full">
                        {tool.tag}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-r ${tool.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      {tool.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{tool.description}</p>

                    {/* Status */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        tool.status === 'ready'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {tool.status === 'ready' ? 'Ready' : 'Premium'}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Projects */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
                <h2 className="text-2xl font-bold">Recent Projects</h2>
                <Link
                  href="/library"
                  className="text-orange-400 hover:text-orange-300 text-sm font-medium flex items-center"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="w-full max-w-sm mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <div className="aspect-video bg-gray-700 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-2 left-2 text-xs bg-black/50 px-2 py-1 rounded">
                        {project.duration || project.type}
                      </div>
                      <div className="absolute bottom-2 right-2 text-xs bg-black/50 px-2 py-1 rounded">
                        {project.views}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">{project.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>{project.tool}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          project.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-orange-400" />
                  Quick Create
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action) => (
                    <button
                      key={action.action}
                      className="h-12 w-full p-3 bg-gray-700 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 rounded-lg text-center transition-all group touch-manipulation"
                    >
                      <div className="text-xl mb-1 group-hover:scale-110 transition-transform">
                        {action.icon}
                      </div>
                      <div className="text-xs font-medium">{action.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Usage Stats */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                  Usage This Month
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Videos Created</span>
                      <span>12/25</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{width: '48%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Images Generated</span>
                      <span>156/500</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{width: '31%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Audio Clips</span>
                      <span>8/50</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '16%'}}></div>
                    </div>
                  </div>
                </div>
                <Link
                  href="/pricing"
                  className="block mt-4 text-center bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 h-12 rounded-lg text-base font-medium hover:from-orange-600 hover:to-orange-700 transition-all touch-manipulation flex items-center justify-center"
                >
                  Upgrade Plan
                </Link>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-green-400" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {[
                    { action: 'Video generated', time: '2 min ago', icon: '🎬' },
                    { action: 'Image created', time: '15 min ago', icon: '🖼️' },
                    { action: 'Audio synthesized', time: '1 hour ago', icon: '🎵' },
                    { action: 'Project shared', time: '3 hours ago', icon: '📤' }
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-center space-x-3 text-sm">
                      <span className="text-lg">{activity.icon}</span>
                      <div className="flex-1">
                        <div className="text-gray-300">{activity.action}</div>
                        <div className="text-gray-500 text-xs">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
