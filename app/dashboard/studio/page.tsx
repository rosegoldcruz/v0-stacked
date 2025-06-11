// @ts-nocheck
'use client'

import React, { useState, useRef } from 'react';
import { 
  Play, 
  Video,
  Image,
  Users,
  Music,
  Target,
  Sparkles,
  Brain,
  Layers,
  Film,
  Grid3x3,
  Save,
  Download,
  Share2,
  Settings,
  Zap,
  Upload,
  Edit3,
  Camera,
  Mic,
  Palette,
  Square,
  Star,
  Monitor,
  Triangle,
  ShoppingBag,
  Wand2,
  FileText,
  TrendingUp,
  BarChart3,
  Megaphone,
  Volume2,
  Scissors,
  Clock,
  Check
} from 'lucide-react';

const AeonStudio = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isGenerating, setIsGenerating] = useState(false);

  const mainSections = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: <Grid3x3 className="w-5 h-5" />, 
      color: 'from-blue-500 to-cyan-500' 
    },
    { 
      id: 'video-studio', 
      name: 'Video Forge', 
      icon: <Video className="w-5 h-5" />, 
      color: 'from-purple-500 to-pink-500' 
    },
    { 
      id: 'storyboard', 
      name: 'Vision Builder', 
      icon: <Film className="w-5 h-5" />, 
      color: 'from-pink-500 to-rose-500' 
    },
    { 
      id: 'image-gen', 
      name: 'Visual Creator', 
      icon: <Image className="w-5 h-5" />, 
      color: 'from-green-500 to-emerald-500' 
    },
    { 
      id: 'avatars', 
      name: 'Human Studio', 
      icon: <Users className="w-5 h-5" />, 
      color: 'from-orange-500 to-red-500' 
    },
    { 
      id: 'audio-studio', 
      name: 'Sound Lab', 
      icon: <Music className="w-5 h-5" />, 
      color: 'from-teal-500 to-cyan-500' 
    },
    { 
      id: 'batch-mode', 
      name: 'Mass Creator', 
      icon: <Layers className="w-5 h-5" />, 
      color: 'from-violet-500 to-purple-500' 
    },
    { 
      id: 'marketing', 
      name: 'Campaign Hub', 
      icon: <Target className="w-5 h-5" />, 
      color: 'from-indigo-500 to-purple-500' 
    },
    { 
      id: 'elements', 
      name: 'Asset Vault', 
      icon: <Sparkles className="w-5 h-5" />, 
      color: 'from-yellow-500 to-orange-500' 
    },
    { 
      id: 'custom-models', 
      name: 'Personal AI', 
      icon: <Brain className="w-5 h-5" />, 
      color: 'from-red-500 to-pink-500' 
    }
  ];

  const featuredTools = [
    {
      title: 'AI-Powered Video Creation',
      description: 'Create 1-minute videos with intelligent stitching',
      icon: <Video className="w-8 h-8" />,
      gradient: 'from-purple-500 to-pink-500',
      action: 'Create Video'
    },
    {
      title: 'Avatar Video Generator',
      description: 'Turn scripts into talking avatar videos',
      icon: <Users className="w-8 h-8" />,
      gradient: 'from-blue-500 to-cyan-500',
      action: 'Create Avatar'
    },
    {
      title: 'Instant AI Video',
      description: 'Generate videos from text with stunning visuals',
      icon: <Zap className="w-8 h-8" />,
      gradient: 'from-green-500 to-emerald-500',
      action: 'Generate Now'
    },
    {
      title: 'Brainstorm with AI',
      description: 'Let AI help you create compelling scripts',
      icon: <Brain className="w-8 h-8" />,
      gradient: 'from-orange-500 to-red-500',
      action: 'Start Brainstorm'
    }
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-purple-500/20">
        <h2 className="text-3xl font-bold mb-4">Welcome to AEON Studio</h2>
        <p className="text-gray-400 text-lg mb-6">
          The ultimate AI creative workspace. Create 1-minute videos, generate stunning visuals, and build complete marketing campaigns.
        </p>
        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-colors">
            Start New Project
          </button>
          <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors">
            View Tutorials
          </button>
        </div>
      </div>

      {/* Featured Tools Grid */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Featured Tools</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTools.map((tool, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors cursor-pointer group">
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${tool.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {tool.icon}
              </div>
              <h4 className="text-xl font-semibold mb-2">{tool.title}</h4>
              <p className="text-gray-400 mb-4">{tool.description}</p>
              <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors font-medium">
                {tool.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Recent Projects</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Product Launch Video', 'Brand Avatar Campaign', 'Social Media Series', 'Marketing Assets'].map((project, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors cursor-pointer">
              <div className="w-full h-32 bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg mb-3 flex items-center justify-center">
                <Video className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="font-semibold">{project}</h4>
              <p className="text-sm text-gray-400">2 days ago</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVideoStudio = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4 flex items-center">
          <Video className="w-6 h-6 mr-3 text-purple-400" />
          Video Forge - Advanced Creation Studio
        </h3>
        <p className="text-gray-400 mb-6">Create professional 1-minute videos with AI-powered stitching and editing</p>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Project Type</label>
            <select className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3">
              <option>Social Media Video</option>
              <option>Product Demo</option>
              <option>Brand Story</option>
              <option>Educational Content</option>
              <option>Marketing Campaign</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Target Duration</label>
            <select className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3">
              <option>15 seconds</option>
              <option>30 seconds</option>
              <option>45 seconds</option>
              <option>60 seconds (Recommended)</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-4 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-cyan-400" />
            Smart Assembly Engine (AEON Secret Sauce)
          </h4>
          <p className="text-gray-400 mb-4">
            Upload multiple clips or generate scenes, and AEON's AI will intelligently stitch them into a cohesive 1-minute video with professional transitions.
          </p>
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Zap className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-sm">Automatic scene analysis and ordering</span>
                </div>
                <div className="flex items-center">
                  <Scissors className="w-4 h-4 text-blue-400 mr-2" />
                  <span className="text-sm">Intelligent transition selection</span>
                </div>
                <div className="flex items-center">
                  <Music className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-sm">Auto music sync and timing</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <h5 className="font-semibold mb-3">Assembly Settings</h5>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Video Style</label>
                  <select className="w-full bg-gray-600 border border-gray-500 rounded p-2 text-sm">
                    <option>Dynamic (Fast cuts)</option>
                    <option>Cinematic (Smooth flow)</option>
                    <option>Documentary (Narrative)</option>
                    <option>Social Media (Engaging)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Music Genre</label>
                  <select className="w-full bg-gray-600 border border-gray-500 rounded p-2 text-sm">
                    <option>Upbeat Electronic</option>
                    <option>Corporate Inspiring</option>
                    <option>Chill Ambient</option>
                    <option>No Music</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-semibold transition-colors flex items-center">
            <Play className="w-5 h-5 mr-2" />
            Generate Video
          </button>
        </div>
      </div>
    </div>
  );

  const renderImageGeneration = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-4 flex items-center">
          <Image className="w-6 h-6 mr-3 text-green-400" />
          Visual Creator - AI Image Generation
        </h3>
        <p className="text-gray-400 mb-6">Generate stunning visuals with advanced AI-powered tools</p>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Prompt</label>
            <textarea
              placeholder="A futuristic cityscape at sunset with neon lights and flying cars..."
              className="w-full h-32 bg-gray-700 border border-gray-600 rounded-lg p-4 resize-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Style Preset</label>
              <select className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3">
                <option>Photorealistic</option>
                <option>Digital Art</option>
                <option>Oil Painting</option>
                <option>Anime</option>
                <option>Sketch</option>
                <option>Cinematic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Aspect Ratio</label>
              <div className="grid grid-cols-3 gap-2">
                <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-sm">1:1</button>
                <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-sm">16:9</button>
                <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-sm">9:16</button>
              </div>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg font-semibold transition-colors">
              Generate Images
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard': 
        return renderDashboard();
      case 'video-studio': 
        return renderVideoStudio();
      case 'image-gen': 
        return renderImageGeneration();
      default: 
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AEON Studio
              </h1>
              <p className="text-gray-400 text-sm">Premium AI Creative Workspace</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold text-black">
              PRO
            </span>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Save className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-72 bg-gray-800 border-r border-gray-700 h-[calc(100vh-80px)] overflow-y-auto">
          <div className="p-4">
            <nav className="space-y-2">
              {mainSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-l-4 border-purple-500'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${section.color}`}>
                    {section.icon}
                  </div>
                  <span className="font-medium">{section.name}</span>
                </button>
              ))}
            </nav>

            {/* Usage Stats */}
            <div className="mt-8 p-4 bg-gray-700 rounded-lg">
              <h3 className="font-semibold mb-3">Monthly Usage</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Videos</span>
                  <span>23/50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Images</span>
                  <span>156/∞</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Audio</span>
                  <span>8/∞</span>
                </div>
              </div>
            </div>

            {/* Recent Projects */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Recent Projects</h3>
              <div className="space-y-2">
                {['Brand Video Campaign', 'Product Demo Series', 'Avatar Presentation', 'Social Media Kit'].map((project, index) => (
                  <div key={index} className="p-2 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
                    {project}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AeonStudio;
