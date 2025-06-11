'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2, Download, Share2, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function ImageGenerationInterface() {
  const [prompt, setPrompt] = useState('')
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedModel, setSelectedModel] = useState('stable-diffusion')
  const [selectedStyle, setSelectedStyle] = useState('realistic')

  const imageStyles = [
    { id: 'realistic', name: 'Realistic', icon: '🎨' },
    { id: 'anime', name: 'Anime', icon: '🎌' },
    { id: 'digital-art', name: 'Digital Art', icon: '🖼️' },
    { id: 'oil-painting', name: 'Oil Painting', icon: '🎨' },
    { id: '3d-render', name: '3D Render', icon: '🎮' },
    { id: 'watercolor', name: 'Watercolor', icon: '🌊' },
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          model: selectedModel,
          style: selectedStyle,
          count: 4
        })
      })
      
      const data = await response.json()
      setGeneratedImages(data.images)
    } catch (error) {
      console.error('Generation failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          AI Image Generation
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Transform your ideas into stunning visuals with our advanced AI models
        </p>
      </div>

      {/* Main Interface */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 bg-gray-900 border-gray-800">
            <h3 className="text-xl font-semibold text-white mb-4">Create Your Image</h3>
            
            {/* Prompt Input */}
            <div className="space-y-2 mb-6">
              <label className="text-sm text-gray-400">Describe your image</label>
              <Textarea
                placeholder="A futuristic city at sunset, cyberpunk style, neon lights..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {/* Style Selection */}
            <div className="space-y-2 mb-6">
              <label className="text-sm text-gray-400">Choose Style</label>
              <div className="grid grid-cols-2 gap-2">
                {imageStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedStyle === style.id
                        ? 'bg-purple-600 border-purple-500'
                        : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <span className="text-2xl mb-1">{style.icon}</span>
                    <p className="text-xs text-white">{style.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Settings */}
            <details className="mb-6">
              <summary className="cursor-pointer text-sm text-gray-400 mb-3">
                Advanced Settings
              </summary>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Model</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  >
                    <option value="stable-diffusion">Stable Diffusion XL</option>
                    <option value="dall-e-3">DALL-E 3</option>
                    <option value="midjourney">Midjourney v6</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Aspect Ratio</label>
                  <select className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
                    <option>1:1 (Square)</option>
                    <option>16:9 (Landscape)</option>
                    <option>9:16 (Portrait)</option>
                    <option>4:3 (Classic)</option>
                  </select>
                </div>
              </div>
            </details>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Images
                </>
              )}
            </Button>
          </Card>

          {/* Quick Prompts */}
          <Card className="p-6 bg-gray-900 border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-3">Quick Prompts</h3>
            <div className="space-y-2">
              {[
                'Futuristic cityscape at night',
                'Fantasy dragon in mountains',
                'Abstract colorful explosion',
                'Serene Japanese garden'
              ].map((quickPrompt) => (
                <button
                  key={quickPrompt}
                  onClick={() => setPrompt(quickPrompt)}
                  className="w-full text-left p-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
                >
                  {quickPrompt}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-gray-900 border-gray-800 min-h-[600px]">
            {generatedImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {generatedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Generated image ${index + 1}`}
                      className="w-full rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
                      <Button size="sm" variant="secondary">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="h-12 w-12 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Ready to Create?
                </h3>
                <p className="text-gray-400 max-w-md">
                  Enter a prompt and click generate to bring your imagination to life
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
