'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Palette, 
  Image, 
  Upload, 
  Download, 
  Wand2, 
  Grid3X3, 
  Eye, 
  Zap,
  Clock,
  Star,
  Copy,
  Trash2,
  Sparkles
} from 'lucide-react'
import { useSubscription } from '@/hooks/useSubscription'

const visualStyles = [
  { id: 'photorealistic', name: 'Photorealistic', description: 'Life-like images' },
  { id: 'digital-art', name: 'Digital Art', description: 'Modern digital artwork' },
  { id: 'oil-painting', name: 'Oil Painting', description: 'Classical painting style' },
  { id: 'watercolor', name: 'Watercolor', description: 'Soft watercolor effects' },
  { id: 'sketch', name: 'Sketch', description: 'Hand-drawn sketches' },
  { id: 'anime', name: 'Anime', description: 'Japanese animation style' },
  { id: 'cyberpunk', name: 'Cyberpunk', description: 'Futuristic neon aesthetic' },
  { id: 'minimalist', name: 'Minimalist', description: 'Clean, simple designs' }
]

const aspectRatios = [
  { id: '1:1', name: 'Square', description: '1:1 - Social media' },
  { id: '16:9', name: 'Landscape', description: '16:9 - Widescreen' },
  { id: '9:16', name: 'Portrait', description: '9:16 - Mobile/Stories' },
  { id: '4:3', name: 'Standard', description: '4:3 - Classic format' },
  { id: '3:2', name: 'Photo', description: '3:2 - Photography' }
]

const resolutions = [
  { id: '512x512', name: '512×512', description: 'Small - Fast generation' },
  { id: '768x768', name: '768×768', description: 'Medium - Balanced' },
  { id: '1024x1024', name: '1024×1024', description: 'Large - High quality' },
  { id: '1536x1536', name: '1536×1536', description: 'XL - Premium only' },
  { id: '2048x2048', name: '2048×2048', description: 'XXL - Ultimate only' }
]

interface GeneratedImage {
  id: string
  url: string
  prompt: string
  style: string
  timestamp: Date
}

export default function VisualCreatorInterface() {
  const { tier } = useSubscription()
  const [activeTab, setActiveTab] = useState('generate')
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('')
  const [aspectRatio, setAspectRatio] = useState('1:1')
  const [resolution, setResolution] = useState('768x768')
  const [steps, setSteps] = useState([30])
  const [guidance, setGuidance] = useState([7.5])
  const [seed, setSeed] = useState('')
  const [batchSize, setBatchSize] = useState([1])
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([])

  const maxBatchSize = tier === 'Free' ? 1 : tier === 'Starter' ? 4 : tier === 'Pro' ? 8 : 16
  const maxSteps = tier === 'Free' ? 30 : tier === 'Starter' ? 50 : 150

  const handleGenerate = async () => {
    if (!prompt || !selectedStyle) return
    
    setIsGenerating(true)
    setProgress(0)

    // Simulate image generation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          
          // Add generated images
          const newImages: GeneratedImage[] = Array.from({ length: batchSize[0] }, (_, i) => ({
            id: Date.now() + i + '',
            url: '/api/placeholder/400/400',
            prompt,
            style: selectedStyle,
            timestamp: new Date()
          }))
          
          setGeneratedImages(prev => [...newImages, ...prev])
          return 100
        }
        return prev + 3
      })
    }, 150)
  }

  const canUseResolution = (res: string) => {
    if (res === '1536x1536') return tier === 'Pro' || tier === 'Ultimate'
    if (res === '2048x2048') return tier === 'Ultimate'
    return true
  }

  const deleteImage = (id: string) => {
    setGeneratedImages(prev => prev.filter(img => img.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="h-8 w-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Visual Creator</h1>
            <Badge variant="secondary">AI-Powered</Badge>
          </div>
          <p className="text-gray-400 text-lg">Generate stunning visuals and artwork with advanced AI models</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Generation Panel */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                <TabsTrigger value="generate">Generate</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="batch">Batch Create</TabsTrigger>
              </TabsList>

              <TabsContent value="generate" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wand2 className="h-5 w-5" />
                      Image Generation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="prompt">Prompt</Label>
                      <Textarea
                        id="prompt"
                        placeholder="Describe the image you want to create... Be detailed and specific for best results."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[100px] bg-gray-700 border-gray-600"
                      />
                    </div>

                    <div>
                      <Label htmlFor="negative-prompt">Negative Prompt (Optional)</Label>
                      <Textarea
                        id="negative-prompt"
                        placeholder="What you don't want in the image..."
                        value={negativePrompt}
                        onChange={(e) => setNegativePrompt(e.target.value)}
                        className="bg-gray-700 border-gray-600"
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Art Style</Label>
                        <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue placeholder="Choose style" />
                          </SelectTrigger>
                          <SelectContent>
                            {visualStyles.map((style) => (
                              <SelectItem key={style.id} value={style.id}>
                                {style.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Aspect Ratio</Label>
                        <Select value={aspectRatio} onValueChange={setAspectRatio}>
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {aspectRatios.map((ratio) => (
                              <SelectItem key={ratio.id} value={ratio.id}>
                                {ratio.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Resolution</Label>
                        <Select value={resolution} onValueChange={setResolution}>
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {resolutions.map((res) => (
                              <SelectItem 
                                key={res.id} 
                                value={res.id}
                                disabled={!canUseResolution(res.id)}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span>{res.name}</span>
                                  {!canUseResolution(res.id) && (
                                    <Badge variant="outline" className="ml-2">
                                      {res.id === '1536x1536' ? 'Pro' : 'Ultimate'}
                                    </Badge>
                                  )}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Batch Size: {batchSize[0]}</Label>
                        <Slider
                          value={batchSize}
                          onValueChange={setBatchSize}
                          max={maxBatchSize}
                          min={1}
                          step={1}
                          className="mt-2"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Max {maxBatchSize} images ({tier} plan)
                        </p>
                      </div>
                    </div>

                    {/* Advanced Settings */}
                    <div className="border-t border-gray-700 pt-4">
                      <Label className="text-sm text-gray-300">Advanced Settings</Label>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <Label className="text-sm">Steps: {steps[0]}</Label>
                          <Slider
                            value={steps}
                            onValueChange={setSteps}
                            max={maxSteps}
                            min={10}
                            step={5}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Guidance: {guidance[0]}</Label>
                          <Slider
                            value={guidance}
                            onValueChange={setGuidance}
                            max={20}
                            min={1}
                            step={0.5}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <Label htmlFor="seed" className="text-sm">Seed (Optional)</Label>
                        <Input
                          id="seed"
                          placeholder="Random seed for reproducible results"
                          value={seed}
                          onChange={(e) => setSeed(e.target.value)}
                          className="bg-gray-700 border-gray-600 mt-1"
                        />
                      </div>
                    </div>

                    {!isGenerating ? (
                      <Button 
                        onClick={handleGenerate}
                        disabled={!prompt || !selectedStyle}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        size="lg"
                      >
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate Images
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-400"></div>
                          <span>Generating images... {progress}%</span>
                        </div>
                        <Progress value={progress} className="w-full" />
                        <p className="text-sm text-gray-400 text-center">
                          Creating {batchSize[0]} image{batchSize[0] > 1 ? 's' : ''} with {selectedStyle} style
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Grid3X3 className="h-5 w-5" />
                      Generated Images
                    </CardTitle>
                    <CardDescription>
                      Your recent creations • {generatedImages.length} images
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {generatedImages.length === 0 ? (
                      <div className="text-center py-12">
                        <Image className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-300 mb-2">No images generated yet</h3>
                        <p className="text-gray-500">Create your first image to see it here</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {generatedImages.map((image) => (
                          <div key={image.id} className="group relative">
                            <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
                              <img 
                                src={image.url} 
                                alt={image.prompt}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                              <Button size="sm" variant="secondary" onClick={() => {}}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="secondary" onClick={() => {}}>
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="secondary" onClick={() => {}}>
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deleteImage(image.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="mt-2">
                              <p className="text-xs text-gray-400 truncate">{image.prompt}</p>
                              <p className="text-xs text-gray-500">{image.style}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="batch" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Batch Generation
                    </CardTitle>
                    <CardDescription>
                      Create multiple variations with different prompts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {tier === 'Free' ? (
                      <div className="text-center py-8">
                        <Zap className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-300 mb-2">Batch Generation</h3>
                        <p className="text-gray-400 mb-4">Upgrade to create multiple images at once</p>
                        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => {}}>
                          Upgrade Plan
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-gray-400">
                          Upload a CSV file with prompts or enter multiple prompts to generate variations
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <Button variant="outline" className="border-gray-600" onClick={() => {}}>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload CSV
                          </Button>
                          <Button variant="outline" className="border-gray-600" onClick={() => {}}>
                            <Wand2 className="h-4 w-4 mr-2" />
                            Prompt Templates
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Usage Stats */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Usage This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image className="h-4 w-4 text-purple-400" />
                    <span className="text-sm">Images Created</span>
                  </div>
                  <Badge variant="outline">47/100</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">Generation Time</span>
                  </div>
                  <Badge variant="outline">12m 34s</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Favorites</span>
                  </div>
                  <Badge variant="outline">8</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Popular Styles */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Popular Styles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Photorealistic', usage: '32%' },
                  { name: 'Digital Art', usage: '28%' },
                  { name: 'Anime', usage: '18%' },
                  { name: 'Oil Painting', usage: '12%' }
                ].map((style, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm">{style.name}</span>
                    <Badge variant="outline">{style.usage}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-gray-600" onClick={() => {}}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Reference
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-600" onClick={() => {}}>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Random Prompt
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-600" onClick={() => {}}>
                  <Copy className="h-4 w-4 mr-2" />
                  Prompt Library
                </Button>
              </CardContent>
            </Card>

            {/* Upgrade Prompt */}
            {tier === 'Free' && (
              <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-lg">Unlock Premium</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 mb-4">
                    <li>• Higher resolution images</li>
                    <li>• Batch generation</li>
                    <li>• Advanced models</li>
                    <li>• Priority processing</li>
                  </ul>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => {}}>
                    Upgrade Now
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
