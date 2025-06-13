'use client'

'use client'

import { useState } from 'react'
import {
  User,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Mail,
  Edit3,
  Share2,
  Trophy,
  TrendingUp,
  Eye,
  Heart,
  Play,
  Download,
  Star,
  Users,
  Zap,
  Crown
} from 'lucide-react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  const stats = [
    { label: 'Videos Created', value: '127', icon: <Play className="w-5 h-5" />, color: 'text-orange-400' },
    { label: 'Total Views', value: '2.3M', icon: <Eye className="w-5 h-5" />, color: 'text-blue-400' },
    { label: 'Likes Received', value: '45.2K', icon: <Heart className="w-5 h-5" />, color: 'text-red-400' },
    { label: 'Downloads', value: '8.9K', icon: <Download className="w-5 h-5" />, color: 'text-green-400' }
  ]

  const achievements = [
    { 
      id: 1, 
      title: 'First Video', 
      description: 'Created your first AI video', 
      icon: '🎬', 
      earned: true,
      date: '2024-01-10'
    },
    { 
      id: 2, 
      title: 'Viral Creator', 
      description: 'Video reached 100K+ views', 
      icon: '🔥', 
      earned: true,
      date: '2024-01-15'
    },
    { 
      id: 3, 
      title: 'Prolific Creator', 
      description: 'Created 100+ videos', 
      icon: '⚡', 
      earned: true,
      date: '2024-01-18'
    },
    { 
      id: 4, 
      title: 'Master Creator', 
      description: 'Reached 1M total views', 
      icon: '👑', 
      earned: true,
      date: '2024-01-20'
    },
    { 
      id: 5, 
      title: 'Community Favorite', 
      description: 'Received 50K+ likes', 
      icon: '❤️', 
      earned: false,
      date: null
    },
    { 
      id: 6, 
      title: 'AI Pioneer', 
      description: 'Used all AI tools', 
      icon: '🤖', 
      earned: false,
      date: null
    }
  ]

  const recentWork = [
    {
      id: 1,
      title: 'Summer Fashion Trends 2024',
      type: 'Video',
      thumbnail: '/api/placeholder/300/200',
      views: '125K',
      likes: '12.3K',
      duration: '0:58',
      created: '2024-01-20'
    },
    {
      id: 2,
      title: 'Product Showcase Animation',
      type: 'Video',
      thumbnail: '/api/placeholder/300/200',
      views: '89K',
      likes: '8.9K',
      duration: '1:24',
      created: '2024-01-19'
    },
    {
      id: 3,
      title: 'Brand Identity Collection',
      type: 'Image',
      thumbnail: '/api/placeholder/300/200',
      views: '54K',
      likes: '5.4K',
      created: '2024-01-18'
    },
    {
      id: 4,
      title: 'Tech Review Highlights',
      type: 'Video',
      thumbnail: '/api/placeholder/300/200',
      views: '32K',
      likes: '3.2K',
      duration: '0:45',
      created: '2024-01-17'
    }
  ]

  const activityData = [
    { month: 'Jan', videos: 12, views: 450 },
    { month: 'Feb', videos: 18, views: 680 },
    { month: 'Mar', videos: 25, views: 920 },
    { month: 'Apr', videos: 22, views: 780 },
    { month: 'May', videos: 30, views: 1200 },
    { month: 'Jun', videos: 20, views: 650 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Profile Info */}
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-4xl font-bold">
                  JD
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                  <Crown className="w-5 h-5 text-yellow-900" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-4xl font-bold">John Doe</h1>
                  <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-sm font-semibold">
                    Pro Creator
                  </span>
                </div>
                <p className="text-xl text-gray-300 mb-4">
                  AI Content Creator & Digital Marketing Specialist
                </p>
                <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Joined January 2024
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    New York, USA
                  </div>
                  <div className="flex items-center">
                    <LinkIcon className="w-4 h-4 mr-2" />
                    johndoe.com
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    john@example.com
                  </div>
                </div>
                <p className="text-gray-300 max-w-2xl">
                  Passionate about creating viral content with AI. Specializing in short-form videos, 
                  brand storytelling, and innovative visual content. Always exploring the latest in AI technology.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
              <button className="border border-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all flex items-center">
                <Share2 className="w-4 h-4 mr-2" />
                Share Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-700 mb-3 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Work */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold">Recent Work</h2>
                <p className="text-gray-400">Latest creations and projects</p>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {recentWork.map((work) => (
                    <div key={work.id} className="group cursor-pointer">
                      <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden relative mb-3">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 text-xs bg-black/70 px-2 py-1 rounded">
                          {work.duration || work.type}
                        </div>
                        <div className="absolute top-2 right-2 text-xs bg-black/70 px-2 py-1 rounded">
                          {work.views} views
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <h3 className="font-semibold mb-1 group-hover:text-orange-400 transition-colors">{work.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>{work.likes} likes</span>
                        <span>{new Date(work.created).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity Chart */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold">Activity Overview</h2>
                <p className="text-gray-400">Your creation activity over the past 6 months</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-6 gap-4 h-48">
                  {activityData.map((data, index) => {
                    const maxViews = Math.max(...activityData.map(d => d.views))
                    const height = (data.views / maxViews) * 100
                    return (
                      <div key={index} className="flex flex-col items-center">
                        <div className="flex-1 flex items-end mb-2">
                          <div 
                            className="w-8 bg-gradient-to-t from-orange-500 to-orange-600 rounded-t"
                            style={{ height: `${height}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-400 text-center">
                          <div>{data.month}</div>
                          <div className="font-semibold text-white">{data.videos}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-between text-sm text-gray-400 mt-4">
                  <span>Videos Created</span>
                  <span>Views (K)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Achievements */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-xl font-semibold flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                  Achievements
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        achievement.earned 
                          ? 'bg-yellow-500/10 border border-yellow-500/20' 
                          : 'bg-gray-700/30 opacity-50'
                      }`}
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium">{achievement.title}</div>
                        <div className="text-sm text-gray-400">{achievement.description}</div>
                        {achievement.earned && achievement.date && (
                          <div className="text-xs text-yellow-400 mt-1">
                            Earned {new Date(achievement.date).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      {achievement.earned && (
                        <Star className="w-5 h-5 text-yellow-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-xl font-semibold flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                  This Month
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Videos Created</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Views</span>
                    <span className="font-semibold text-green-400">+245K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">New Followers</span>
                    <span className="font-semibold text-blue-400">+1.2K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Engagement Rate</span>
                    <span className="font-semibold text-orange-400">8.7%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tools Used */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-xl font-semibold flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-purple-400" />
                  Favorite Tools
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {[
                    { name: 'Video Forge', usage: 85, icon: '🎬' },
                    { name: 'Visual Creator', usage: 72, icon: '🎨' },
                    { name: 'Sound Lab', usage: 45, icon: '🎵' },
                    { name: 'Human Studio', usage: 38, icon: '👤' }
                  ].map((tool, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{tool.icon}</span>
                          <span className="text-sm">{tool.name}</span>
                        </div>
                        <span className="text-sm text-gray-400">{tool.usage}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" 
                          style={{width: `${tool.usage}%`}}
                        ></div>
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
