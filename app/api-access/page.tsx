'use client'

import { Metadata } from 'next'
import { useState } from 'react'
import { 
  Key, 
  Copy, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  Calendar,
  Activity,
  Code,
  Book,
  ExternalLink,
  Shield,
  Zap,
  BarChart3
} from 'lucide-react'

export default function APIAccessPage() {
  const [showKey, setShowKey] = useState<{[key: string]: boolean}>({})
  const [newKeyName, setNewKeyName] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)

  const apiKeys = [
    {
      id: '1',
      name: 'Production App',
      key: 'aeon_sk_1234567890abcdef1234567890abcdef',
      created: '2024-01-15',
      lastUsed: '2024-01-20',
      requests: 15420,
      status: 'active'
    },
    {
      id: '2',
      name: 'Development Testing',
      key: 'aeon_sk_abcdef1234567890abcdef1234567890',
      created: '2024-01-10',
      lastUsed: '2024-01-19',
      requests: 892,
      status: 'active'
    },
    {
      id: '3',
      name: 'Mobile App Beta',
      key: 'aeon_sk_fedcba0987654321fedcba0987654321',
      created: '2024-01-05',
      lastUsed: '2024-01-18',
      requests: 3456,
      status: 'limited'
    }
  ]

  const usageStats = [
    { label: 'Total Requests', value: '19.8K', change: '+12%', color: 'text-green-400' },
    { label: 'This Month', value: '4.2K', change: '+8%', color: 'text-blue-400' },
    { label: 'Success Rate', value: '99.2%', change: '+0.1%', color: 'text-green-400' },
    { label: 'Avg Response', value: '245ms', change: '-15ms', color: 'text-green-400' }
  ]

  const endpoints = [
    {
      method: 'POST',
      path: '/api/v1/generate/video',
      description: 'Generate AI videos from text prompts',
      rateLimit: '10/min'
    },
    {
      method: 'POST',
      path: '/api/v1/generate/image',
      description: 'Create AI-generated images',
      rateLimit: '20/min'
    },
    {
      method: 'POST',
      path: '/api/v1/generate/audio',
      description: 'Synthesize audio and music',
      rateLimit: '15/min'
    },
    {
      method: 'GET',
      path: '/api/v1/library',
      description: 'List user content library',
      rateLimit: '100/min'
    },
    {
      method: 'GET',
      path: '/api/v1/models',
      description: 'Get available AI models',
      rateLimit: '50/min'
    }
  ]

  const toggleKeyVisibility = (keyId: string) => {
    setShowKey(prev => ({ ...prev, [keyId]: !prev[keyId] }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const maskKey = (key: string) => {
    return key.substring(0, 12) + '•'.repeat(20) + key.substring(key.length - 8)
  }

  const createNewKey = () => {
    if (newKeyName.trim()) {
      // Handle key creation logic here
      setNewKeyName('')
      setShowCreateForm(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center">
                <Key className="w-8 h-8 mr-3 text-orange-400" />
                API Access
              </h1>
              <p className="text-gray-400">Manage your API keys and integrate AEON into your applications</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create API Key
              </button>
              <button className="border border-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all flex items-center">
                <Book className="w-4 h-4 mr-2" />
                Documentation
                <ExternalLink className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Usage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {usageStats.map((stat, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">{stat.label}</span>
                <span className={`text-sm ${stat.color}`}>{stat.change}</span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* API Keys */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-semibold flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-400" />
                  API Keys
                </h2>
                <p className="text-gray-400 text-sm mt-1">Manage your API authentication keys</p>
              </div>

              <div className="p-6">
                {/* Create New Key Form */}
                {showCreateForm && (
                  <div className="mb-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                    <h3 className="text-lg font-medium mb-3">Create New API Key</h3>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Enter key name (e.g., 'Production App')"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
                      />
                      <button
                        onClick={createNewKey}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all"
                      >
                        Create
                      </button>
                      <button
                        onClick={() => setShowCreateForm(false)}
                        className="border border-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* API Keys List */}
                <div className="space-y-4">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{apiKey.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>Created: {new Date(apiKey.created).toLocaleDateString()}</span>
                            <span>Last used: {new Date(apiKey.lastUsed).toLocaleDateString()}</span>
                            <span>{apiKey.requests.toLocaleString()} requests</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            apiKey.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {apiKey.status}
                          </span>
                          <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex-1 font-mono text-sm bg-gray-800 px-3 py-2 rounded border">
                          {showKey[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                        </div>
                        <button
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showKey[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(apiKey.key)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* API Endpoints */}
            <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-semibold flex items-center">
                  <Code className="w-5 h-5 mr-2 text-green-400" />
                  Available Endpoints
                </h2>
                <p className="text-gray-400 text-sm mt-1">Explore our API endpoints and their capabilities</p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {endpoints.map((endpoint, index) => (
                    <div key={index} className="p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded text-xs font-mono ${
                            endpoint.method === 'POST' 
                              ? 'bg-orange-500/20 text-orange-400' 
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {endpoint.method}
                          </span>
                          <span className="font-mono text-sm">{endpoint.path}</span>
                        </div>
                        <span className="text-xs text-gray-400">{endpoint.rateLimit}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{endpoint.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Quick Start */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Quick Start
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-gray-700/50 rounded-lg">
                    <div className="font-medium mb-1">1. Get your API key</div>
                    <div className="text-gray-400">Create a new API key above</div>
                  </div>
                  <div className="p-3 bg-gray-700/50 rounded-lg">
                    <div className="font-medium mb-1">2. Make your first request</div>
                    <div className="text-gray-400">Use our documentation to get started</div>
                  </div>
                  <div className="p-3 bg-gray-700/50 rounded-lg">
                    <div className="font-medium mb-1">3. Monitor usage</div>
                    <div className="text-gray-400">Track your API usage and limits</div>
                  </div>
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all">
                  View Documentation
                </button>
              </div>

              {/* Usage Chart */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                  Usage This Week
                </h3>
                <div className="space-y-3">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                    const usage = Math.random() * 100
                    return (
                      <div key={day} className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">{day}</span>
                        <div className="flex items-center gap-2 flex-1 ml-3">
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" 
                              style={{width: `${usage}%`}}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400 w-8">{Math.round(usage)}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Rate Limits */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-red-400" />
                  Rate Limits
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Video Generation</span>
                    <span>10/min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Image Generation</span>
                    <span>20/min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Audio Generation</span>
                    <span>15/min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Library Access</span>
                    <span>100/min</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="text-yellow-400 text-xs font-medium">Need higher limits?</div>
                  <div className="text-yellow-300/80 text-xs mt-1">Upgrade to Pro or Enterprise</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
