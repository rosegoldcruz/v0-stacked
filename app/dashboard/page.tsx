// @ts-nocheck
'use client'

import { 
  Video, 
  Image, 
  Users, 
  Music, 
  TrendingUp, 
  BarChart3,
  ArrowRight,
  Sparkles,
  Zap,
  Play
} from 'lucide-react'

export default function DashboardPage() {
  const tools = [
    {
      id: 'forge',
      name: 'Video Forge',
      icon: <Video className="w-8 h-8" />,
      description: 'Transform scripts into viral videos with AI',
      status: 'ready',
      route: '/dashboard/studio'
    },
    {
      id: 'visual',
      name: 'Visual Creator',
      icon: <Image className="w-8 h-8" />,
      description: 'Generate stunning visuals and animations',
      status: 'ready',
      route: '/dashboard/studio'
    },
    {
      id: 'human',
      name: 'Human Studio',
      icon: <Users className="w-8 h-8" />,
      description: 'Create realistic human avatars',
      status: 'ready',
      route: '/dashboard/studio'
    },
    {
      id: 'sound',
      name: 'Sound Lab',
      icon: <Music className="w-8 h-8" />,
      description: 'AI-powered music and effects',
      status: 'ready',
      route: '/dashboard/studio'
    },
    {
      id: 'mass',
      name: 'Mass Creator',
      icon: <TrendingUp className="w-8 h-8" />,
      description: 'Batch create hundreds of videos',
      status: 'premium',
      route: '/dashboard/studio'
    },
    {
      id: 'campaign',
      name: 'Campaign Hub',
      icon: <BarChart3 className="w-8 h-8" />,
      description: 'Manage multi-platform campaigns',
      status: 'premium',
      route: '/dashboard/studio'
    }
  ]

  const stats = [
    { label: 'Videos Created', value: '12', limit: '25' },
    { label: 'Plan', value: 'Pro', upgrade: false },
    { label: 'Usage', value: '48%', limit: '100%' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-aeon-dark to-aeon-gray text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-aeon-purple to-aeon-blue rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">AEON</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300">Welcome back!</div>
            <div className="w-8 h-8 bg-aeon-purple rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">U</span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="glass-effect p-6 rounded-xl">
              <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
              <div className="text-2xl font-bold gradient-text">
                {stat.value}
                {stat.limit && <span className="text-lg text-gray-400">/{stat.limit}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Ready to Create
            <span className="gradient-text"> Amazing Content?</span>
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Choose from our powerful AI tools to start building viral videos in seconds.
          </p>
          
          <button 
            onClick={() => window.location.href = '/dashboard/studio'}
            className="bg-gradient-to-r from-aeon-purple to-aeon-blue px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity flex items-center"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Creating Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>

        {/* Tools Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">AI Creation Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <div 
                key={tool.id} 
                onClick={() => window.location.href = tool.route}
                className="glass-effect p-6 rounded-xl hover-lift cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-aeon-purple to-aeon-blue rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  {tool.status === 'premium' && (
                    <Zap className="w-5 h-5 text-yellow-400" />
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-aeon-purple transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-300 text-sm mb-4">{tool.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    tool.status === 'ready' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {tool.status === 'ready' ? 'Ready' : 'Premium'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-aeon-purple group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">Need Help Getting Started?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/dashboard/studio'}
              className="border border-white/20 px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Watch Tutorial
            </button>
            <button 
              onClick={() => window.location.href = '/dashboard/studio'}
              className="border border-white/20 px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              View Examples
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}