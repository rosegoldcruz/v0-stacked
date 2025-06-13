'use client'

import React, { useState, useRef, useEffect, ChangeEvent } from 'react'
import { Upload, Download, Zap, Play, Pause, RotateCcw, Save, Settings, Layers, Palette, Type, Move, Square, Circle, Minus, Plus, Eye, EyeOff, Trash2, Copy, Scissors, Image, Video, Music, Bot, Code, Target, TrendingUp, Sparkles, Wand2, Crown } from 'lucide-react'

export default function VideoForgePage() {
  const [activeTab, setActiveTab] = useState('aeon-video')
  const [isPlaying, setIsPlaying] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedTool, setSelectedTool] = useState('brush')
  const [brushSize, setBrushSize] = useState(10)
  const [selectedColor, setSelectedColor] = useState('#FF6B35')
  const [layers, setLayers] = useState([
    { id: 1, name: 'Background', visible: true, locked: false },
    { id: 2, name: 'Layer 1', visible: true, locked: false }
  ])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const mainFeatures = [
    { 
      id: 'aeon-video', 
      name: '🎬 AEON Video', 
      description: '1-minute AI video generation',
      premium: true,
      highlight: 'MAIN FEATURE'
    },
    { 
      id: 'ads', 
      name: '📺 AI Ads Creator', 
      description: 'Generate viral video ads instantly'
    },
    { 
      id: 'models', 
      name: '🤖 Video Models Hub', 
      description: 'All Replicate models & more'
    },
    { 
      id: 'images', 
      name: '🎨 Image Generation', 
      description: 'DALL-E, Midjourney, Stable Diffusion'
    },
    { 
      id: 'music', 
      name: '🎵 AI Music Studio', 
      description: 'Custom soundtracks & effects'
    },
    { 
      id: 'agents', 
      name: '🧠 AI Agents & GPT Coder', 
      description: 'Marketing agents + code generation'
    }
  ]

  const tools = [
    { id: 'brush', name: 'Brush', icon: '🖌️' },
    { id: 'eraser', name: 'Eraser', icon: '🧽' },
    { id: 'text', name: 'Text', icon: '📝' },
    { id: 'rectangle', name: 'Rectangle', icon: '⬜' },
    { id: 'circle', name: 'Circle', icon: '⭕' },
    { id: 'line', name: 'Line', icon: '📏' },
    { id: 'move', name: 'Move', icon: '👆' },
    { id: 'select', name: 'Select', icon: '🎯' }
  ]

  const upscaleModels = [
    { id: 'esrgan', name: 'ESRGAN', multiplier: '4x', emoji: '⚡' },
    { id: 'real-esrgan', name: 'Real-ESRGAN', multiplier: '4x', emoji: '🔥' },
    { id: 'waifu2x', name: 'Waifu2x', multiplier: '2x', emoji: '🌸' },
    { id: 'swinir', name: 'SwinIR', multiplier: '4x', emoji: '💎' }
  ]

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return
    const file = files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  interface UpscaleModel {
    id: string
    name: string
    multiplier: string
    emoji: string
  }

  const handleUpscale = async (model: UpscaleModel) => {
    console.log(`Upscaling with ${model.name}`)
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">🎬 AEON Video</h1>
              <p className="text-sm text-gray-400">AI Video Generation</p>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-3">
            {mainFeatures.map(feature => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`p-3 rounded-lg text-left transition-all relative ${
                  activeTab === feature.id
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 transform scale-105'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {feature.premium && (
                  <div className="absolute -top-1 -right-1">
                    <Crown className="w-4 h-4 text-yellow-400" />
                  </div>
                )}
                {feature.highlight && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="px-2 py-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full">
                      {feature.highlight}
                    </span>
                  </div>
                )}
                <div className="text-lg mb-1">{feature.name}</div>
                <div className="text-xs text-gray-300">{feature.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Analytics */}
        <div className="p-4 mt-auto">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">📊 USAGE</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Videos:</span>
              <span className="text-sm text-orange-400">23/25</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{width: '92%'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold">🎬 AEON Video Generation</h2>
            <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-sm font-medium">
              🔥 PREMIUM FEATURE
            </span>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg font-medium transition-colors">
            💾 Save Project
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 bg-gray-900">
          <div className="space-y-6">
            {/* Video Generation UI */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                🎬 1-Minute Video Generator
                <span className="ml-2 px-2 py-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded">MAIN FEATURE</span>
              </h3>
              <div className="space-y-4">
                <textarea
                  placeholder="Describe your video idea... (e.g., 'A cat dancing in space with neon lights')"
                  className="w-full h-32 p-4 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 resize-none"
                />
                <div className="grid grid-cols-3 gap-4">
                  <select className="p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500">
                    <option>🎨 Style: Realistic</option>
                    <option>🎨 Style: Anime</option>
                    <option>🎨 Style: Cartoon</option>
                    <option>🎨 Style: Cinematic</option>
                  </select>
                  <select className="p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500">
                    <option>⏱️ Duration: 60s</option>
                    <option>⏱️ Duration: 30s</option>
                    <option>⏱️ Duration: 15s</option>
                  </select>
                  <select className="p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500">
                    <option>📱 Aspect: 9:16 (TikTok)</option>
                    <option>📺 Aspect: 16:9 (YouTube)</option>
                    <option>📷 Aspect: 1:1 (Instagram)</option>
                  </select>
                </div>
                <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg font-semibold text-lg transition-colors">
                  🚀 Generate Video (2 credits)
                </button>
              </div>
            </div>

            {/* Recent Generations */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">📱 Recent Videos</h3>
              <div className="grid grid-cols-3 gap-4">
                {[1,2,3].map(i => (
                  <div key={i} className="bg-gray-700 rounded-lg p-4 aspect-video flex items-center justify-center">
                    <Play className="w-12 h-12 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  )
}
