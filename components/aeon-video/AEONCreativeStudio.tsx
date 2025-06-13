'use client'

import React, { useState, useRef, useEffect } from 'react'
import { 
  Play, Pause, RotateCcw, Save, Download, Upload, Zap, Settings, 
  Layers, Eye, EyeOff, Trash2, Copy, Move, Type, Square, Circle, 
  Minus, Plus, Palette, Brush, Eraser, Scissors, Image, Video, 
  Music, Bot, Code, Target, TrendingUp, Sparkles, Wand2, Crown,
  ChevronDown, ChevronRight, Lock, Unlock, MoreHorizontal
} from 'lucide-react'

export default function AEONCreativeStudio() {
  const [activeTab, setActiveTab] = useState('video')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(60)
  const [selectedTool, setSelectedTool] = useState('select')
  const [brushSize, setBrushSize] = useState(10)
  const [selectedColor, setSelectedColor] = useState('#FF6B35')
  const [zoom, setZoom] = useState(100)
  const [layers, setLayers] = useState([
    { id: 1, name: 'Background', visible: true, locked: false, type: 'video' },
    { id: 2, name: 'Text Layer', visible: true, locked: false, type: 'text' },
    { id: 3, name: 'Effects', visible: true, locked: false, type: 'effect' }
  ])

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  // Main feature tabs
  const mainTabs = [
    { id: 'video', name: '🎬 Video', description: 'AI Video Generation' },
    { id: 'image', name: '🎨 Images', description: 'AI Image Creation' },
    { id: 'music', name: '🎵 Music', description: 'AI Music & Audio' },
    { id: 'effects', name: '✨ Effects', description: 'Visual Effects' },
    { id: 'text', name: '📝 Text', description: 'Typography & Titles' },
    { id: 'templates', name: '📋 Templates', description: 'Ready-made Templates' }
  ]

  // Tools for canvas editing
  const tools = [
    { id: 'select', name: 'Select', icon: '🎯' },
    { id: 'move', name: 'Move', icon: '👆' },
    { id: 'brush', name: 'Brush', icon: '🖌️' },
    { id: 'eraser', name: 'Eraser', icon: '🧽' },
    { id: 'text', name: 'Text', icon: '📝' },
    { id: 'rectangle', name: 'Rectangle', icon: '⬜' },
    { id: 'circle', name: 'Circle', icon: '⭕' },
    { id: 'line', name: 'Line', icon: '📏' }
  ]

  // Video generation models
  const videoModels = [
    { id: 'runway', name: 'Runway ML', type: 'Text-to-Video', emoji: '🚀', premium: true },
    { id: 'luma', name: 'Luma Dream', type: 'Text-to-Video', emoji: '💫', premium: true },
    { id: 'kling', name: 'Kling AI', type: 'Text-to-Video', emoji: '⚡', premium: false },
    { id: 'haiper', name: 'Haiper AI', type: 'Text-to-Video', emoji: '🔥', premium: false },
    { id: 'pika', name: 'Pika Labs', type: 'Text-to-Video', emoji: '🎭', premium: true },
    { id: 'stable', name: 'Stable Video', type: 'Image-to-Video', emoji: '🎪', premium: false }
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const toggleLayer = (layerId: number) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ))
  }

  const lockLayer = (layerId: number) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, locked: !layer.locked } : layer
    ))
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Left Sidebar - Tools & Assets */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AEON Studio</h1>
              <p className="text-sm text-gray-400">Creative AI Platform</p>
            </div>
          </div>

          {/* Main Tabs */}
          <div className="grid grid-cols-3 gap-2">
            {mainTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-2 rounded-lg text-xs transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <div className="font-medium">{tab.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'video' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">🎬 AI Video Models</h3>
              {videoModels.map(model => (
                <div key={model.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 cursor-pointer transition-colors relative">
                  {model.premium && (
                    <div className="absolute top-2 right-2">
                      <Crown className="w-4 h-4 text-yellow-400" />
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{model.emoji}</span>
                    <div>
                      <h4 className="font-medium">{model.name}</h4>
                      <p className="text-sm text-gray-400">{model.type}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">🎯 Quick Generate</h4>
                <textarea
                  placeholder="Describe your video... (e.g., 'A cat dancing in space')"
                  className="w-full h-24 p-3 bg-gray-700 border border-gray-600 rounded-lg resize-none text-sm"
                />
                <button className="w-full mt-3 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg font-medium">
                  🚀 Generate Video
                </button>
              </div>
            </div>
          )}

          {activeTab === 'image' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">🎨 AI Image Models</h3>
              {[
                { name: 'DALL-E 3', type: 'OpenAI', emoji: '🤖' },
                { name: 'Midjourney', type: 'Text-to-Image', emoji: '🎭' },
                { name: 'Stable Diffusion', type: 'Open Source', emoji: '🌟' },
                { name: 'Firefly', type: 'Adobe', emoji: '🔥' }
              ].map((model, i) => (
                <div key={i} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{model.emoji}</span>
                    <div>
                      <h4 className="font-medium">{model.name}</h4>
                      <p className="text-sm text-gray-400">{model.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'music' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">🎵 AI Music & Audio</h3>
              {[
                { name: 'Suno AI', type: 'Music Generation', emoji: '🎼' },
                { name: 'Udio', type: 'Music Creation', emoji: '🎹' },
                { name: 'ElevenLabs', type: 'Voice Synthesis', emoji: '🗣️' },
                { name: 'Mubert', type: 'Background Music', emoji: '🎧' }
              ].map((model, i) => (
                <div key={i} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{model.emoji}</span>
                    <div>
                      <h4 className="font-medium">{model.name}</h4>
                      <p className="text-sm text-gray-400">{model.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">📋 Viral Templates</h3>
              {[
                { name: 'TikTok Dance', category: 'Social', emoji: '💃', trending: true },
                { name: 'Product Review', category: 'Commercial', emoji: '📦', trending: false },
                { name: 'Tutorial Style', category: 'Educational', emoji: '🎓', trending: true },
                { name: 'Meme Format', category: 'Entertainment', emoji: '😂', trending: true }
              ].map((template, i) => (
                <div key={i} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 cursor-pointer transition-colors relative">
                  {template.trending && (
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 bg-red-600 text-xs rounded-full">🔥 VIRAL</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{template.emoji}</span>
                    <div>
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-gray-400">{template.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            {/* Tools */}
            <div className="flex items-center space-x-2">
              {tools.slice(0, 4).map(tool => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    selectedTool === tool.id
                      ? 'bg-orange-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  title={tool.name}
                >
                  <span className="text-lg">{tool.icon}</span>
                </button>
              ))}
            </div>

            <div className="w-px h-8 bg-gray-600"></div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setZoom(Math.max(25, zoom - 25))}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm w-12 text-center">{zoom}%</span>
              <button 
                onClick={() => setZoom(Math.min(400, zoom + 25))}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
              <Upload className="w-4 h-4 mr-2 inline" />
              Import
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg">
              <Save className="w-4 h-4 mr-2 inline" />
              Save Project
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black rounded-lg shadow-2xl" style={{ width: '80%', aspectRatio: '16/9' }}>
              <canvas
                ref={canvasRef}
                className="w-full h-full rounded-lg"
                style={{ transform: `scale(${zoom / 100})` }}
              />
              {/* Placeholder content */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Video className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg">Canvas Area</p>
                  <p className="text-sm">Drop assets here or use AI generation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="h-32 bg-gray-800 border-t border-gray-700">
          <div className="flex items-center justify-between px-6 py-2 border-b border-gray-700">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 bg-orange-600 hover:bg-orange-700 rounded-lg"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <span className="text-sm font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                <RotateCcw className="w-4 h-4" />
              </button>
              <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Timeline Track */}
          <div ref={timelineRef} className="flex-1 p-4">
            <div className="bg-gray-700 rounded-lg h-16 relative">
              {/* Timeline ruler */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-gray-600 rounded-t-lg flex items-center px-2">
                {Array.from({ length: Math.ceil(duration / 10) }, (_, i) => (
                  <div key={i} className="flex-1 text-xs text-gray-400 text-center">
                    {i * 10}s
                  </div>
                ))}
              </div>
              
              {/* Playhead */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-orange-400 z-10"
                style={{ left: `${(currentTime / duration) * 100}%` }}
              />
              
              {/* Sample timeline content */}
              <div className="absolute top-4 left-2 right-2 bottom-2 flex space-x-1">
                <div className="bg-blue-600 rounded h-full" style={{ width: '30%' }}>
                  <div className="p-1 text-xs">Video Track</div>
                </div>
                <div className="bg-green-600 rounded h-full" style={{ width: '20%' }}>
                  <div className="p-1 text-xs">Audio</div>
                </div>
                <div className="bg-purple-600 rounded h-full" style={{ width: '25%' }}>
                  <div className="p-1 text-xs">Effects</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Layers & Properties */}
      <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
        {/* Layers Panel */}
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Layers className="w-5 h-5 mr-2" />
            Layers
          </h3>
          <div className="space-y-2">
            {layers.map(layer => (
              <div key={layer.id} className="bg-gray-700 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button onClick={() => toggleLayer(layer.id)}>
                    {layer.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-gray-500" />}
                  </button>
                  <span className="text-sm">{layer.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => lockLayer(layer.id)}>
                    {layer.locked ? <Lock className="w-4 h-4 text-gray-500" /> : <Unlock className="w-4 h-4" />}
                  </button>
                  <button className="text-gray-400 hover:text-white">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Properties Panel */}
        <div className="flex-1 p-4">
          <h3 className="text-lg font-semibold mb-4">Properties</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-8 h-8 rounded border border-gray-600"
                />
                <input
                  type="text"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm"
                />
              </div>
            </div>

            {selectedTool === 'brush' && (
              <div>
                <label className="block text-sm font-medium mb-2">Brush Size: {brushSize}px</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Opacity</label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="100"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Blend Mode</label>
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm">
                <option>Normal</option>
                <option>Multiply</option>
                <option>Screen</option>
                <option>Overlay</option>
                <option>Soft Light</option>
              </select>
            </div>
          </div>
        </div>

        {/* Export Panel */}
        <div className="p-4 border-t border-gray-700">
          <button className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg font-medium flex items-center justify-center">
            <Download className="w-5 h-5 mr-2" />
            Export Video
          </button>
        </div>
      </div>
    </div>
  )
}
