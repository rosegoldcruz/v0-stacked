'use client';

import React, { useState } from 'react';
import { Key, Copy, Eye, EyeOff, RefreshCw, Code, Book, BarChart3, Shield, Zap, Plus, Trash2, Settings, CheckCircle } from 'lucide-react';

interface ApiKey {
  id: number;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  status: 'Active' | 'Inactive';
  permissions: string[];
}

interface Endpoint {
  method: 'GET' | 'POST';
  path: string;
  description: string;
  rateLimit: string;
}

interface UsageStat {
  endpoint: string;
  requests: number;
  percentage: number;
}

export default function APIAccessInterface() {
  const [activeTab, setActiveTab] = useState('keys');
  const [showKey, setShowKey] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState('');

  const apiKeys: ApiKey[] = [
    {
      id: 1,
      name: 'Production API Key',
      key: 'aeon_live_sk_1a2b3c4d5e6f7g8h9i0j',
      created: '2024-01-15',
      lastUsed: '2 hours ago',
      status: 'Active',
      permissions: ['read', 'write', 'admin']
    },
    {
      id: 2,
      name: 'Development Key',
      key: 'aeon_test_sk_9z8y7x6w5v4u3t2s1r0q',
      created: '2024-01-10',
      lastUsed: '1 day ago',
      status: 'Active',
      permissions: ['read', 'write']
    },
    {
      id: 3,
      name: 'Legacy Key',
      key: 'aeon_live_sk_p0o9i8u7y6t5r4e3w2q1',
      created: '2023-12-01',
      lastUsed: '2 weeks ago',
      status: 'Inactive',
      permissions: ['read']
    }
  ];

  const endpoints: Endpoint[] = [
    {
      method: 'POST',
      path: '/api/v1/generate/image',
      description: 'Generate images from text prompts',
      rateLimit: '100/hour'
    },
    {
      method: 'POST',
      path: '/api/v1/generate/video',
      description: 'Generate videos from text prompts',
      rateLimit: '20/hour'
    },
    {
      method: 'POST',
      path: '/api/v1/upscale',
      description: 'Upscale images using AI',
      rateLimit: '50/hour'
    },
    {
      method: 'GET',
      path: '/api/v1/models',
      description: 'List available AI models',
      rateLimit: '1000/hour'
    },
    {
      method: 'GET',
      path: '/api/v1/usage',
      description: 'Get API usage statistics',
      rateLimit: '500/hour'
    }
  ];

  const codeExamples = {
    javascript: `// AEON Studio API - JavaScript
const response = await fetch('https://api.aeon.studio/v1/generate/image', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: 'A futuristic cityscape at sunset',
    model: 'sdxl-turbo',
    width: 1024,
    height: 1024
  })
});

const data = await response.json();
console.log(data.image_url);`,
    
    python: `# AEON Studio API - Python
import requests

url = "https://api.aeon.studio/v1/generate/image"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "prompt": "A futuristic cityscape at sunset",
    "model": "sdxl-turbo",
    "width": 1024,
    "height": 1024
}

response = requests.post(url, headers=headers, json=data)
result = response.json()
print(result["image_url"])`,
    
    curl: `# AEON Studio API - cURL
curl -X POST "https://api.aeon.studio/v1/generate/image" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: "application/json" \\
  -d '{
    "prompt": "A futuristic cityscape at sunset",
    "model": "sdxl-turbo",
    "width": 1024,
    "height": 1024
  }'`
  };

  const usageStats: UsageStat[] = [
    { endpoint: 'Image Generation', requests: 1247, percentage: 45 },
    { endpoint: 'Video Generation', requests: 823, percentage: 30 },
    { endpoint: 'Upscaling', requests: 456, percentage: 16 },
    { endpoint: 'Models List', requests: 234, percentage: 9 }
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  const toggleKeyVisibility = (id: number) => {
    setShowKey(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const maskKey = (key: string) => {
    return key.substring(0, 12) + '••••••••••••••••' + key.slice(-4);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                <Key className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">API Access</h1>
                <p className="text-gray-400">Integrate AEON with your applications</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Zap className="w-4 h-4" />
                <span>Replicate Powered</span>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg font-medium transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                Generate New Key
              </button>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
            {[
              { id: 'keys', name: 'API Keys', icon: Key },
              { id: 'docs', name: 'Documentation', icon: Book },
              { id: 'usage', name: 'Usage', icon: BarChart3 }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
          {/* API Keys Tab */}
          {activeTab === 'keys' && (
            <div className="space-y-4">
              <div className="grid gap-4">
                {apiKeys.map(key => (
                  <div key={key.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{key.name}</h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                          <span>Created: {key.created}</span>
                          <span>Last used: {key.lastUsed}</span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        key.status === 'Active' 
                          ? 'bg-green-600 text-green-100' 
                          : 'bg-gray-600 text-gray-300'
                      }`}>
                        {key.status}
                      </div>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <code className="text-sm font-mono text-orange-400">
                          {showKey[key.id] ? key.key : maskKey(key.key)}
                        </code>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => toggleKeyVisibility(key.id)}
                            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                          >
                            {showKey[key.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => copyToClipboard(key.key, `key-${key.id}`)}
                            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                          >
                            {copied === `key-${key.id}` ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {key.permissions.map(permission => (
                          <span key={permission} className="px-2 py-1 bg-gray-700 rounded text-xs">
                            {permission}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                          <Settings className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Documentation Tab */}
          {activeTab === 'docs' && (
            <div className="space-y-6">
              {/* API Endpoints */}
              <div>
                <h3 className="text-xl font-semibold mb-4">API Endpoints</h3>
                <div className="bg-gray-800 rounded-lg border border-gray-700">
                  <div className="divide-y divide-gray-700">
                    {endpoints.map((endpoint, index) => (
                      <div key={index} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              endpoint.method === 'GET' 
                                ? 'bg-blue-600 text-blue-100'
                                : 'bg-orange-600 text-orange-100'
                            }`}>
                              {endpoint.method}
                            </span>
                            <code className="text-orange-400 font-mono">{endpoint.path}</code>
                          </div>
                          <span className="text-sm text-gray-400">{endpoint.rateLimit}</span>
                        </div>
                        <p className="text-sm text-gray-300">{endpoint.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Code Examples */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Code Examples</h3>
                <div className="space-y-4">
                  {Object.entries(codeExamples).map(([language, code]) => (
                    <div key={language} className="bg-gray-800 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between p-4 border-b border-gray-700">
                        <span className="font-medium capitalize">{language}</span>
                        <button
                          onClick={() => copyToClipboard(code, language)}
                          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                        >
                          {copied === language ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <pre className="p-4 text-sm overflow-x-auto">
                        <code className="text-gray-300">{code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* Usage Tab */}
          {activeTab === 'usage' && (
            <div className="space-y-6">
              {/* Usage Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Total Requests</h3>
                    <BarChart3 className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="text-3xl font-bold mb-2">2,760</div>
                  <div className="text-sm text-green-400">+12% from last month</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Success Rate</h3>
                    <Shield className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="text-3xl font-bold mb-2">99.8%</div>
                  <div className="text-sm text-gray-400">Last 30 days</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Avg Response</h3>
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold mb-2">1.2s</div>
                  <div className="text-sm text-gray-400">Generation time</div>
                </div>
              </div>
              {/* Endpoint Usage */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Usage by Endpoint</h3>
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="space-y-4">
                    {usageStats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">{stat.endpoint}</span>
                          <span className="text-sm text-gray-400">{stat.requests} requests</span>
                        </div>
                        <div className="flex items-center space-x-3 w-48">
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${stat.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-8">{stat.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Stats Sidebar */}
      <div className="w-80 p-6 bg-gray-800 border-l border-gray-700">
        <div className="space-y-6">
          {/* Rate Limits */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Rate Limits</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Hourly Requests</span>
                <span className="font-medium">245/1000</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{width: '24.5%'}}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Daily Requests</span>
                <span className="font-medium">1,847/10,000</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{width: '18.47%'}}></div>
              </div>
            </div>
          </div>
          {/* Recent Activity */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300">Image Generation</span>
                  <span className="text-gray-500">2m ago</span>
                </div>
                <div className="text-xs text-gray-400">POST /api/v1/generate/image</div>
              </div>
              <div className="text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300">Video Generation</span>
                  <span className="text-gray-500">5m ago</span>
                </div>
                <div className="text-xs text-gray-400">POST /api/v1/generate/video</div>
              </div>
              <div className="text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300">Model List</span>
                  <span className="text-gray-500">8m ago</span>
                </div>
                <div className="text-xs text-gray-400">GET /api/v1/models</div>
              </div>
            </div>
          </div>
          {/* Quick Actions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full p-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg text-sm font-medium transition-colors">
                View Full Logs
              </button>
              <button className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
                Download Usage Report
              </button>
              <button className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
                API Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
