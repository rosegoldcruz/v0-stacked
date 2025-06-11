'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Video, Upload, Wand2, AlertCircle, Play } from 'lucide-react'
import { useSubscription } from '@/hooks/useSubscription'
import { SUBSCRIPTION_TIERS } from '@/lib/subscription-tiers'

export default function VideoCreationInterface() {
  const { tier } = useSubscription()
  const [activeTab, setActiveTab] = useState('text-to-video')
  const [prompt, setPrompt] = useState('')
  const [duration, setDuration] = useState(5)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState<{
    url: string
    thumbnail: string
    duration: number
  } | null>(null)

  const tierKey = (tier?.toUpperCase() || 'FREE') as keyof typeof SUBSCRIPTION_TIERS
  const maxDuration = SUBSCRIPTION_TIERS[tierKey].features.videoLength
  const hasStudioAccess = SUBSCRIPTION_TIERS[tierKey].features.aeonStudio

  const videoStyles = [
    { id: 'realistic', name: 'Realistic', icon: '🎬' },
    { id: 'anime', name: 'Anime', icon: '🎌' },
    { id: 'cartoon', name: 'Cartoon', icon: '🎨' },
    { id: 'cinematic', name: 'Cinematic', icon: '🎥' },
    { id: 'abstract', name: 'Abstract', icon: '🌀' },
    { id: 'timelapse', name: 'Timelapse', icon: '⏱️' },
  ]

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setGeneratedVideo({
        url: 'https://example.com/video.mp4',
        thumbnail: 'https://picsum.photos/800/450',
        duration: duration
      })
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          AI Video Creation
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Transform your ideas into stunning videos with AI
        </p>
      </div>

      {/* Duration Warning for Free/Starter */}
      {(tier === 'free' || tier === 'starter') && (
        <Alert className="mb-6 bg-orange-900/20 border-orange-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>{tier === 'free' ? 'Free' : 'Starter'} Plan:</strong> Limited to {maxDuration} second clips. 
            Upgrade to Pro for 1-minute videos or Ultimate for unlimited length.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls Panel */}
        <div className="lg:col-span-1">
          <Card className="p-6 bg-gray-900 border-gray-800">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="text-to-video">Text to Video</TabsTrigger>
                <TabsTrigger value="image-to-video">Image to Video</TabsTrigger>
              </TabsList>

              <TabsContent value="text-to-video" className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Describe your video</label>
                  <Textarea
                    placeholder="A serene beach at sunset with waves gently crashing..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[120px] bg-gray-800 border-gray-700"
                  />
                </div>
              </TabsContent>

              <TabsContent value="image-to-video" className="space-y-4">
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                  <p className="text-sm text-gray-400">Upload an image to animate</p>
                  <Button variant="outline" className="mt-2">
                    Choose Image
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Video Style */}
            <div className="mb-6">
              <label className="text-sm text-gray-400 mb-2 block">Video Style</label>
              <div className="grid grid-cols-2 gap-2">
                {videoStyles.map((style) => (
                  <button
                    key={style.id}
                    className="p-3 rounded-lg bg-gray-800 border border-gray-700 hover:border-purple-600 transition-colors"
                  >
                    <span className="text-2xl block mb-1">{style.icon}</span>
                    <span className="text-xs">{style.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Slider */}
            <div className="mb-6">
              <label className="text-sm text-gray-400 mb-2 block">
                Duration: {duration}s
              </label>
              <input
                type="range"
                min="5"
                max={maxDuration === -1 ? 300 : maxDuration}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full"
                disabled={maxDuration !== -1 && duration > maxDuration}
              />
              {maxDuration !== -1 && (
                <p className="text-xs text-gray-500 mt-1">
                  Max duration for your plan: {maxDuration}s
                </p>
              )}
            </div>

            {/* Advanced Settings */}
            <details className="mb-6">
              <summary className="cursor-pointer text-sm text-gray-400 mb-3">
                Advanced Settings
              </summary>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Model</label>
                  <select className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded text-white">
                    <option>Stable Video Diffusion</option>
                    <option>AnimateDiff</option>
                    <option>RunwayML Gen-2</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400">FPS</label>
                  <select className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded text-white">
                    <option>24</option>
                    <option>30</option>
                    <option>60</option>
                  </select>
                </div>
              </div>
            </details>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Video...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Video
                </>
              )}
            </Button>

            {/* Studio Upsell */}
            {!hasStudioAccess && (
              <Alert className="mt-4 bg-purple-900/20 border-purple-800">
                <AlertDescription>
                  <strong>Want to edit your videos?</strong> Upgrade to Pro for AEON Studio access
                </AlertDescription>
              </Alert>
            )}
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-gray-900 border-gray-800 min-h-[600px]">
            {generatedVideo ? (
              <div className="space-y-4">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <img 
                    src={generatedVideo.thumbnail} 
                    alt="Video preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur"
                    >
                      <Play className="h-8 w-8" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1">Download</Button>
                  {hasStudioAccess && (
                    <Button variant="outline" className="flex-1">
                      Edit in Studio
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="h-12 w-12 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Create Your First Video
                  </h3>
                  <p className="text-gray-400 max-w-md">
                    Enter a prompt and generate stunning AI videos in seconds
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
