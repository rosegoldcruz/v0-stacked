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
// Using emojis instead of icons
const Icons = {
  Video: '🔮',  // Crystal ball for AEON video
  Upload: '⬆️',
  Play: '▶️',
  Download: '⬇️',
  Settings: '⚙️',
  Wand: '🪄',
  Clock: '⏰',
  Users: '👥',
  Zap: '⚡'
}
import { useSubscription } from '@/hooks/useSubscription'

const videoStyles = [
  { id: 'corporate', name: 'Corporate', description: 'Professional business style' },
  { id: 'educational', name: 'Educational', description: 'Learning-focused content' },
  { id: 'marketing', name: 'Marketing', description: 'Promotional and engaging' },
  { id: 'documentary', name: 'Documentary', description: 'Informative storytelling' },
  { id: 'social', name: 'Social Media', description: 'Short-form viral content' },
  { id: 'cinematic', name: 'Cinematic', description: 'Movie-like production' }
]

const voiceActors = [
  { id: 'sarah', name: 'Sarah', type: 'Professional Female', accent: 'American' },
  { id: 'david', name: 'David', type: 'Professional Male', accent: 'British' },
  { id: 'maria', name: 'Maria', type: 'Warm Female', accent: 'Spanish' },
  { id: 'james', name: 'James', type: 'Authoritative Male', accent: 'American' },
  { id: 'custom', name: 'Custom Voice', type: 'Upload your own', accent: 'Any' }
]

export default function AEONVideoInterface() {
  const { tier } = useSubscription()
  const [activeTab, setActiveTab] = useState('script')
  const [script, setScript] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('')
  const [selectedVoice, setSelectedVoice] = useState('')
  const [duration, setDuration] = useState([60])
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)

  const maxDuration = tier === 'Free' ? 30 : tier === 'Starter' ? 120 : tier === 'Pro' ? 600 : 1800

  const handleGenerate = async () => {
    if (!script || !selectedStyle || !selectedVoice) return
    
    setIsGenerating(true)
    setProgress(0)

    // Simulate video generation with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          setGeneratedVideo('/api/placeholder/400/225')
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const canUseFeature = (feature: string) => {
    if (feature === 'custom-voice') return tier === 'Pro' || tier === 'Ultimate'
    if (feature === 'cinematic') return tier === 'Pro' || tier === 'Ultimate'
    if (feature === 'bulk-generation') return tier === 'Ultimate'
    return true
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{Icons.Video}</span>
            <h1 className="text-3xl font-bold">AEON Video</h1>
            <Badge variant="secondary">AI-Powered</Badge>
          </div>
          <p className="text-gray-400 text-lg">Transform scripts into professional videos with AI narration and visuals</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Creation Panel */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                <TabsTrigger value="script">Script Input</TabsTrigger>
                <TabsTrigger value="style">Video Style</TabsTrigger>
                <TabsTrigger value="voice">Voice & Audio</TabsTrigger>
              </TabsList>

              <TabsContent value="script" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-xl">{Icons.Upload}</span>
                      Script Input
                    </CardTitle>
                    <CardDescription>
                      Enter your script or upload a document. AI will automatically segment it for video scenes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="script">Script Content</Label>
                      <Textarea
                        id="script"
                        placeholder="Enter your script here... AI will automatically break it into scenes and add appropriate visuals."
                        value={script}
                        onChange={(e) => setScript(e.target.value)}
                        className="min-h-[200px] bg-gray-700 border-gray-600"
                      />
                      <p className="text-sm text-gray-400 mt-2">
                        {script.length} characters • Estimated duration: {Math.ceil(script.length / 10)} seconds
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="border-gray-600">
                        <span className="text-lg mr-2">{Icons.Upload}</span>
                        Upload Script File
                      </Button>
                      <Button variant="outline" className="border-gray-600">
                        <span className="text-lg mr-2">{Icons.Wand}</span>
                        AI Script Generator
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="style" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Video Style & Format</CardTitle>
                    <CardDescription>
                      Choose the visual style and format for your video
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Video Style</Label>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {videoStyles.map((style) => (
                          <div
                            key={style.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedStyle === style.id
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-gray-600 hover:border-gray-500'
                            } ${!canUseFeature(style.id) ? 'opacity-50' : ''}`}
                            onClick={() => canUseFeature(style.id) && setSelectedStyle(style.id)}
                          >
                            <h4 className="font-medium">{style.name}</h4>
                            <p className="text-sm text-gray-400">{style.description}</p>
                            {!canUseFeature(style.id) && (
                              <Badge variant="outline" className="mt-2">Pro Required</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="duration">Video Duration: {duration[0]} seconds</Label>
                      <Slider
                        id="duration"
                        min={10}
                        max={maxDuration}
                        step={10}
                        value={duration}
                        onValueChange={setDuration}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-sm text-gray-400 mt-1">
                        <span>10s</span>
                        <span>Max: {maxDuration}s ({tier} plan)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Aspect Ratio</Label>
                        <Select>
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue placeholder="Select ratio" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                            <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                            <SelectItem value="1:1">1:1 (Square)</SelectItem>
                            <SelectItem value="4:5">4:5 (Instagram)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Resolution</Label>
                        <Select>
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue placeholder="Select resolution" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="720p">720p HD</SelectItem>
                            <SelectItem value="1080p">1080p Full HD</SelectItem>
                            <SelectItem value="4k">4K Ultra HD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="voice" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Voice & Audio Settings</CardTitle>
                    <CardDescription>
                      Select voice actor and audio preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Voice Actor</Label>
                      <div className="grid gap-3 mt-2">
                        {voiceActors.map((voice) => (
                          <div
                            key={voice.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedVoice === voice.id
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-gray-600 hover:border-gray-500'
                            } ${!canUseFeature('custom-voice') && voice.id === 'custom' ? 'opacity-50' : ''}`}
                            onClick={() => {
                              if (voice.id === 'custom' && !canUseFeature('custom-voice')) return
                              setSelectedVoice(voice.id)
                            }}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{voice.name}</h4>
                                <p className="text-sm text-gray-400">{voice.type} • {voice.accent}</p>
                              </div>
                              {voice.id === 'custom' && !canUseFeature('custom-voice') && (
                                <Badge variant="outline">Pro Required</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Speaking Speed</Label>
                        <Select>
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue placeholder="Normal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="slow">Slow</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="fast">Fast</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Background Music</Label>
                        <Select>
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue placeholder="None" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="corporate">Corporate</SelectItem>
                            <SelectItem value="upbeat">Upbeat</SelectItem>
                            <SelectItem value="ambient">Ambient</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Generation Controls */}
            <Card className="bg-gray-800 border-gray-700 mt-6">
              <CardContent className="pt-6">
                {!isGenerating && !generatedVideo && (
                  <Button 
                    onClick={handleGenerate} 
                    disabled={!script || !selectedStyle || !selectedVoice}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    <span className="text-xl mr-2">{Icons.Video}</span>
                    Generate Video
                  </Button>
                )}

                {isGenerating && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                      <span>Generating video... {progress}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-gray-400 text-center">
                      AI is creating scenes, adding narration, and rendering your video
                    </p>
                  </div>
                )}

                {generatedVideo && (
                  <div className="space-y-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="aspect-video bg-gray-600 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-4xl text-gray-400">{Icons.Play}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">
                          <span className="text-lg mr-2">{Icons.Play}</span>
                          Preview
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <span className="text-lg mr-2">{Icons.Download}</span>
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Generation Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-blue-400">{Icons.Clock}</span>
                    <span className="text-sm">Time Remaining</span>
                  </div>
                  <Badge variant="outline">
                    {tier === 'Free' ? '5:00' : tier === 'Starter' ? '30:00' : 'Unlimited'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-green-400">{Icons.Users}</span>
                    <span className="text-sm">Videos Created</span>
                  </div>
                  <Badge variant="outline">12 this month</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-yellow-400">{Icons.Zap}</span>
                    <span className="text-sm">Credits</span>
                  </div>
                  <Badge variant="outline">
                    {tier === 'Free' ? '3/5' : tier === 'Starter' ? '47/100' : 'Unlimited'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recent Videos */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Recent Videos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: 'Product Demo Video', duration: '2:34', created: '2 hours ago' },
                  { title: 'Company Overview', duration: '1:45', created: '1 day ago' },
                  { title: 'Tutorial Series Ep.1', duration: '3:12', created: '3 days ago' }
                ].map((video, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                    <div className="w-12 h-8 bg-gray-600 rounded flex items-center justify-center">
                      <span className="text-sm">{Icons.Play}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{video.title}</p>
                      <p className="text-xs text-gray-400">{video.duration} • {video.created}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upgrade Prompt */}
            {tier === 'Free' && (
              <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-lg">Upgrade for More</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 mb-4">
                    <li>• Longer video duration</li>
                    <li>• Custom voice actors</li>
                    <li>• 4K resolution</li>
                    <li>• Bulk generation</li>
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
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
