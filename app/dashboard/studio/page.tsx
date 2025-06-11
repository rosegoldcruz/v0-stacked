// @ts-nocheck
'use client'

import { useState } from 'react'
import { 
  Play, 
  Pause, 
  Settings, 
  Download, 
  Upload, 
  Wand2, 
  Video, 
  Music, 
  Image, 
  Type, 
  Users, 
  TrendingUp,
  Sparkles,
  Eye,
  Clock,
  BarChart3,
  Zap
} from 'lucide-react'

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState('forge')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [formData, setFormData] = useState({
    topic: '',
    script: '',
    duration: '30' as '15' | '30' | '60',
    style: 'trendy' as 'trendy' | 'professional' | 'casual'
  })
  const [generatedVideo, setGeneratedVideo] = useState<any>(null)
  const [error, setError] = useState('')

  const tools = [
    {
      id: 'forge',
      name: 'Video Forge',
      icon: <Video className="w-5 h-5" />,
      description: 'Transform scripts into viral videos',
      status: 'ready'
    },
    {
      id: 'visual',
      name: 'Visual Creator',
      icon: <Image className="w-5 h-5" />,
      description: 'Generate stunning visuals and animations',
      status: 'ready'
    },
    {
      id: 'human',
      name: 'Human Studio',
      icon: <Users className="w-5 h-5" />,
      description: 'Create realistic human avatars',
      status: 'ready'
    },
    {
      id: 'sound',
      name: 'Sound Lab',
      icon: <Music className="w-5 h-5" />,
      description: 'AI-powered music and effects',
      status: 'ready'
    },
    {
      id: 'mass',
      name: 'Mass Creator',
      icon: <TrendingUp className="w-5 h-5" />,
      description: 'Batch create hundreds of videos',
      status: 'premium'
    },
    {
      id: 'campaign',
      name: 'Campaign Hub',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'Manage multi-platform campaigns',
      status: 'premium'
    }
  ]

  const recentProjects = [
    {
      id: 1,
      title: 'Summer Fashion Trends',
      thumbnail: '/api/placeholder/160/90',
      duration: '0:58',
      views: '12.3K',
      status: 'published'
    },
    {
      id: 2,
      title: 'Quick Recipe Tutorial',
      thumbnail: '/api/placeholder/160/90',
      duration: '1:12',
      views: '8.7K',
      status: 'published'
    },
    {
      id: 3,
      title: 'Tech Review Snippet',
      thumbnail: '/api/placeholder/160/90',
      duration: '0:45',
      views: '5.2K',
      status: 'draft'
    }
  ]

  const handleGenerate = async () => {
    if (!formData.topic.trim()) {
      setError('Please enter a video topic')
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)
    setError('')
    setGeneratedVideo(null)

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + Math.random() * 15
        })
      }, 500)

      const response = await fetch('/api/generate/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      clearInterval(progressInterval)
      setGenerationProgress(100)

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate video')
      }

      setGeneratedVideo(result.video)
    } catch (error) {
      console.error('Generation error:', error)
      setError(error instanceof Error ? error.message : 'Failed to generate video')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-aeon-dark to-aeon-gray">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-aeon-purple to-aeon-blue rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">AEON Studio</span>
            </div>
            <div className="hidden md:flex items-center space-x-1 bg-white/5 rounded-lg p-1">
              <span className="px-3 py-1 bg-aeon-purple rounded-md text-sm font-medium">Pro</span>
              <span className="px-3 py-1 text-sm text-gray-300">25 videos remaining</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-aeon-purple rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">U</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/10 bg-black/20 p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                AI Tools
              </h3>
              <nav className="space-y-2">
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTab(tool.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tool.id 
                        ? 'bg-aeon-purple text-white' 
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {tool.icon}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium truncate">{tool.name}</span>
                        {tool.status === 'premium' && (
                          <Zap className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-400 truncate">{tool.description}</p>
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Recent Projects
              </h3>
              <div className="space-y-2">
                {recentProjects.map((project) => (
                  <div key={project.id} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center">
                        <Play className="w-3 h-3" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{project.title}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{project.duration}</span>
                          <Eye className="w-3 h-3" />
                          <span>{project.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Tool Content */}
          <div className="flex-1 p-6">
            {activeTab === 'forge' && (
              <div className="h-full">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-2">Video Forge</h1>
                  <p className="text-gray-300">Transform your scripts into viral TikTok videos with AI-powered editing</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100%-100px)]">
                  {/* Input Panel */}
                  <div className="glass-effect rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">Script Input</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Video Topic</label>
                        <input
                          type="text"
                          placeholder="e.g., '5 Morning Habits That Changed My Life'"
                          value={formData.topic}
                          onChange={(e) => setFormData({...formData, topic: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-aeon-purple focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Script Content</label>
                        <textarea
                          rows={8}
                          placeholder="Enter your script or let AI generate one..."
                          value={formData.script}
                          onChange={(e) => setFormData({...formData, script: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-aeon-purple focus:border-transparent resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Duration</label>
                          <select 
                            value={formData.duration}
                            onChange={(e) => setFormData({...formData, duration: e.target.value as '15' | '30' | '60'})}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-aeon-purple"
                          >
                            <option value="15">15 seconds</option>
                            <option value="30">30 seconds</option>
                            <option value="60">60 seconds</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Style</label>
                          <select 
                            value={formData.style}
                            onChange={(e) => setFormData({...formData, style: e.target.value as 'trendy' | 'professional' | 'casual'})}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-aeon-purple"
                          >
                            <option value="trendy">Trendy</option>
                            <option value="professional">Professional</option>
                            <option value="casual">Casual</option>
                          </select>
                        </div>
                      </div>

                      {error && (
                        <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
                          {error}
                        </div>
                      )}

                      <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full bg-gradient-to-r from-aeon-purple to-aeon-blue px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
                      >
                        {isGenerating ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Generating... {Math.round(generationProgress)}%
                          </>
                        ) : (
                          <>
                            <Wand2 className="w-5 h-5 mr-2" />
                            Generate Video
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Preview Panel */}
                  <div className="glass-effect rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">Preview</h3>
                    <div className="aspect-[9/16] bg-black rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                      {isGenerating ? (
                        <div className="text-center">
                          <div className="animate-pulse mb-4">
                            <Sparkles className="w-12 h-12 mx-auto text-aeon-purple" />
                          </div>
                          <p className="text-gray-300">AI is crafting your video...</p>
                          <div className="w-48 bg-white/20 rounded-full h-2 mt-4">
                            <div 
                              className="bg-gradient-to-r from-aeon-purple to-aeon-blue h-2 rounded-full transition-all duration-200"
                              style={{ width: `${generationProgress}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-400 mt-2">{Math.round(generationProgress)}% complete</p>
                        </div>
                      ) : generatedVideo ? (
                        <div className="w-full h-full flex flex-col">
                          {generatedVideo.url ? (
                            <video 
                              src={generatedVideo.url} 
                              controls 
                              className="w-full h-full object-cover rounded-lg"
                              poster="/placeholder.jpg"
                            />
                          ) : (
                            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-aeon-purple/20 to-aeon-blue/20 rounded-lg">
                              <div className="text-center p-4">
                                <Video className="w-8 h-8 mx-auto mb-2 text-aeon-purple" />
                                <p className="text-sm text-gray-300">Video generated successfully!</p>
                                <p className="text-xs text-gray-400 mt-1">Script: {generatedVideo.script?.slice(0, 50)}...</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center text-gray-400">
                          <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p>Your video will appear here</p>
                          <p className="text-sm mt-2">Enter a topic and click Generate</p>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <button 
                        disabled={!generatedVideo}
                        className="flex-1 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Preview
                      </button>
                      <button 
                        disabled={!generatedVideo?.url}
                        onClick={() => generatedVideo?.url && window.open(generatedVideo.url, '_blank')}
                        className="flex-1 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'visual' && (
              <div className="h-full">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-2">Visual Creator</h1>
                  <p className="text-gray-300">Generate stunning visuals and animations for your content</p>
                </div>
                <div className="glass-effect rounded-xl p-8 text-center">
                  <Image className="w-16 h-16 mx-auto mb-4 text-aeon-purple" />
                  <h3 className="text-xl font-semibold mb-2">Visual Creator</h3>
                  <p className="text-gray-300 mb-6">Create stunning visuals, backgrounds, and animations</p>
                  <button className="bg-gradient-to-r from-aeon-purple to-aeon-blue px-6 py-3 rounded-lg font-semibold">
                    Coming Soon
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'human' && (
              <div className="h-full">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-2">Human Studio</h1>
                  <p className="text-gray-300">Create realistic human avatars and voiceovers</p>
                </div>
                <div className="glass-effect rounded-xl p-8 text-center">
                  <Users className="w-16 h-16 mx-auto mb-4 text-aeon-purple" />
                  <h3 className="text-xl font-semibold mb-2">Human Studio</h3>
                  <p className="text-gray-300 mb-6">Generate realistic human avatars and AI voices</p>
                  <button className="bg-gradient-to-r from-aeon-purple to-aeon-blue px-6 py-3 rounded-lg font-semibold">
                    Coming Soon
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'sound' && (
              <div className="h-full">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-2">Sound Lab</h1>
                  <p className="text-gray-300">AI-powered music and sound effect generation</p>
                </div>
                <div className="glass-effect rounded-xl p-8 text-center">
                  <Music className="w-16 h-16 mx-auto mb-4 text-aeon-purple" />
                  <h3 className="text-xl font-semibold mb-2">Sound Lab</h3>
                  <p className="text-gray-300 mb-6">Create custom music and sound effects with AI</p>
                  <button className="bg-gradient-to-r from-aeon-purple to-aeon-blue px-6 py-3 rounded-lg font-semibold">
                    Coming Soon
                  </button>
                </div>
              </div>
            )}

            {(activeTab === 'mass' || activeTab === 'campaign') && (
              <div className="h-full">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-2">
                    {activeTab === 'mass' ? 'Mass Creator' : 'Campaign Hub'}
                  </h1>
                  <p className="text-gray-300">
                    {activeTab === 'mass' 
                      ? 'Batch create hundreds of videos for campaigns' 
                      : 'Manage multi-platform campaigns and analytics'
                    }
                  </p>
                </div>
                <div className="glass-effect rounded-xl p-8 text-center">
                  {activeTab === 'mass' ? (
                    <TrendingUp className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                  ) : (
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                  )}
                  <h3 className="text-xl font-semibold mb-2">Premium Feature</h3>
                  <p className="text-gray-300 mb-6">This feature is available in Ultimate plan</p>
                  <button className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 rounded-lg font-semibold">
                    Upgrade to Ultimate
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}