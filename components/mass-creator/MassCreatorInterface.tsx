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
  Zap, 
  Upload, 
  Download, 
  FileText,
  Database,
  Settings,
  Play,
  Pause,
  Clock,
  Target,
  Users,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Table,
  BarChart3,
  Filter,
  Search,
  Eye,
  Copy,
  Trash2
} from 'lucide-react'
import { useSubscription } from '@/hooks/useSubscription'

const contentTypes = [
  { id: 'video', name: 'Video Content', description: 'Batch generate videos' },
  { id: 'image', name: 'Image Content', description: 'Mass create images' },
  { id: 'text', name: 'Text Content', description: 'Generate copy variations' },
  { id: 'audio', name: 'Audio Content', description: 'Batch audio generation' },
  { id: 'social', name: 'Social Posts', description: 'Multi-platform content' },
  { id: 'ads', name: 'Ad Creatives', description: 'Marketing materials' }
]

const platforms = [
  { id: 'tiktok', name: 'TikTok', aspect: '9:16' },
  { id: 'instagram', name: 'Instagram', aspect: '1:1' },
  { id: 'youtube', name: 'YouTube', aspect: '16:9' },
  { id: 'facebook', name: 'Facebook', aspect: '16:9' },
  { id: 'twitter', name: 'Twitter/X', aspect: '16:9' },
  { id: 'linkedin', name: 'LinkedIn', aspect: '1:1' }
]

const variations = [
  { id: 'style', name: 'Visual Style', description: 'Different art styles' },
  { id: 'color', name: 'Color Scheme', description: 'Various color palettes' },
  { id: 'text', name: 'Text Content', description: 'Different copy versions' },
  { id: 'layout', name: 'Layout Design', description: 'Various compositions' },
  { id: 'format', name: 'Format Size', description: 'Multiple aspect ratios' },
  { id: 'language', name: 'Language', description: 'Multi-language content' }
]

interface BatchJob {
  id: string
  name: string
  type: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  totalItems: number
  completedItems: number
  createdAt: Date
  estimatedTime?: number
}

interface GeneratedItem {
  id: string
  jobId: string
  type: string
  variation: string
  url: string
  platform?: string
  status: 'success' | 'failed'
}

export default function MassCreatorInterface() {
  const { tier } = useSubscription()
  const [activeTab, setActiveTab] = useState('create')
  const [contentType, setContentType] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [selectedVariations, setSelectedVariations] = useState<string[]>([])
  const [batchSize, setBatchSize] = useState([10])
  const [basePrompt, setBasePrompt] = useState('')
  const [csvData, setCsvData] = useState('')
  const [variationPrompts, setVariationPrompts] = useState<string[]>([''])
  const [batchJobs, setBatchJobs] = useState<BatchJob[]>([])
  const [generatedItems, setGeneratedItems] = useState<GeneratedItem[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentJobId, setCurrentJobId] = useState<string | null>(null)

  const maxBatchSize = tier === 'Pro' ? 50 : tier === 'Ultimate' ? 500 : 10
  const isPremiumUser = tier === 'Pro' || tier === 'Ultimate'

  const handleStartBatch = async () => {
    if (!contentType || !basePrompt) return
    
    const newJob: BatchJob = {
      id: Date.now() + '',
      name: `${contentType} Batch - ${Date.now()}`,
      type: contentType,
      status: 'processing',
      progress: 0,
      totalItems: batchSize[0] * selectedPlatforms.length,
      completedItems: 0,
      createdAt: new Date(),
      estimatedTime: batchSize[0] * 30 // 30 seconds per item
    }

    setBatchJobs(prev => [newJob, ...prev])
    setCurrentJobId(newJob.id)
    setIsProcessing(true)

    // Simulate batch processing
    const interval = setInterval(() => {
      setBatchJobs(prev => prev.map(job => {
        if (job.id === newJob.id && job.status === 'processing') {
          const newProgress = Math.min(job.progress + 2, 100)
          const newCompleted = Math.floor((newProgress / 100) * job.totalItems)
          
          if (newProgress >= 100) {
            clearInterval(interval)
            setIsProcessing(false)
            setCurrentJobId(null)
            
            // Generate sample items
            const items: GeneratedItem[] = Array.from({ length: job.totalItems }, (_, i) => ({
              id: `${job.id}-${i}`,
              jobId: job.id,
              type: job.type,
              variation: selectedVariations[i % selectedVariations.length] || 'default',
              url: '/api/placeholder/400/400',
              platform: selectedPlatforms[i % selectedPlatforms.length],
              status: Math.random() > 0.1 ? 'success' : 'failed'
            }))
            
            setGeneratedItems(prev => [...items, ...prev])
            
            return {
              ...job,
              status: 'completed' as const,
              progress: 100,
              completedItems: job.totalItems
            }
          }
          
          return {
            ...job,
            progress: newProgress,
            completedItems: newCompleted
          }
        }
        return job
      }))
    }, 200)
  }

  const addVariationPrompt = () => {
    setVariationPrompts(prev => [...prev, ''])
  }

  const updateVariationPrompt = (index: number, value: string) => {
    setVariationPrompts(prev => prev.map((prompt, i) => i === index ? value : prompt))
  }

  const removeVariationPrompt = (index: number) => {
    if (variationPrompts.length > 1) {
      setVariationPrompts(prev => prev.filter((_, i) => i !== index))
    }
  }

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    )
  }

  const toggleVariation = (variationId: string) => {
    setSelectedVariations(prev => 
      prev.includes(variationId) 
        ? prev.filter(id => id !== variationId)
        : [...prev, variationId]
    )
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m ${secs}s`
  }

  if (!isPremiumUser) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-8 w-8 text-yellow-400" />
              <h1 className="text-3xl font-bold">Mass Creator</h1>
              <Badge className="bg-yellow-600">Premium Feature</Badge>
            </div>
            <p className="text-gray-400 text-lg">Batch create hundreds of content variations with AI automation</p>
          </div>

          <Card className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border-yellow-500/30 max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <Zap className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <CardTitle className="text-2xl">Mass Creator - Premium Only</CardTitle>
              <CardDescription className="text-lg">
                Scale your content creation with automated batch generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-semibold text-yellow-400">Pro Plan</h4>
                  <p className="text-2xl font-bold">50</p>
                  <p className="text-sm text-gray-400">items per batch</p>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-semibold text-yellow-400">Ultimate Plan</h4>
                  <p className="text-2xl font-bold">500</p>
                  <p className="text-sm text-gray-400">items per batch</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Premium Features Include:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Batch video generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Multi-platform content creation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>CSV data import</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Automated variations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Progress tracking & analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Bulk export & download</span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
                  Upgrade to Pro
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
                  Upgrade to Ultimate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-yellow-400" />
            <h1 className="text-3xl font-bold">Mass Creator</h1>
            <Badge className="bg-yellow-600">Premium</Badge>
          </div>
          <p className="text-gray-400 text-lg">Batch create hundreds of content variations with AI automation</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 mb-8">
            <TabsTrigger value="create">Batch Create</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Content Configuration */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Batch Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Content Type</Label>
                      <Select value={contentType} onValueChange={setContentType}>
                        <SelectTrigger className="bg-gray-700 border-gray-600">
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent>
                          {contentTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Base Prompt</Label>
                      <Textarea
                        placeholder="Enter your base prompt that will be used for all variations..."
                        value={basePrompt}
                        onChange={(e) => setBasePrompt(e.target.value)}
                        className="min-h-[100px] bg-gray-700 border-gray-600"
                      />
                    </div>

                    <div>
                      <Label>Batch Size: {batchSize[0]} items</Label>
                      <Slider
                        value={batchSize}
                        onValueChange={setBatchSize}
                        max={maxBatchSize}
                        min={1}
                        step={1}
                        className="mt-2"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Max {maxBatchSize} items ({tier} plan)
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Platform Selection */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Target Platforms</CardTitle>
                    <CardDescription>
                      Select platforms to generate content for
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3">
                      {platforms.map((platform) => (
                        <div
                          key={platform.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedPlatforms.includes(platform.id)
                              ? 'border-yellow-500 bg-yellow-500/10'
                              : 'border-gray-600 hover:border-gray-500'
                          }`}
                          onClick={() => togglePlatform(platform.id)}
                        >
                          <h4 className="font-medium">{platform.name}</h4>
                          <p className="text-sm text-gray-400">{platform.aspect}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Variation Types */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Variation Types</CardTitle>
                    <CardDescription>
                      Choose what aspects to vary across the batch
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {variations.map((variation) => (
                        <div
                          key={variation.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedVariations.includes(variation.id)
                              ? 'border-yellow-500 bg-yellow-500/10'
                              : 'border-gray-600 hover:border-gray-500'
                          }`}
                          onClick={() => toggleVariation(variation.id)}
                        >
                          <h4 className="font-medium">{variation.name}</h4>
                          <p className="text-sm text-gray-400">{variation.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Variation Prompts */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Variation Prompts</CardTitle>
                    <CardDescription>
                      Add specific prompts for different variations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {variationPrompts.map((prompt, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder={`Variation ${index + 1} prompt...`}
                          value={prompt}
                          onChange={(e) => updateVariationPrompt(index, e.target.value)}
                          className="bg-gray-700 border-gray-600"
                        />
                        {variationPrompts.length > 1 && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeVariationPrompt(index)}
                            className="border-gray-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={addVariationPrompt}
                      className="border-gray-600"
                    >
                      Add Variation
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Batch Summary */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg">Batch Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Items</span>
                      <Badge variant="outline">
                        {batchSize[0] * Math.max(selectedPlatforms.length, 1)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Platforms</span>
                      <Badge variant="outline">{selectedPlatforms.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Variations</span>
                      <Badge variant="outline">{selectedVariations.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Est. Time</span>
                      <Badge variant="outline">
                        {formatTime(batchSize[0] * selectedPlatforms.length * 30)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start border-gray-600">
                      <Upload className="h-4 w-4 mr-2" />
                      Import CSV Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-gray-600">
                      <FileText className="h-4 w-4 mr-2" />
                      Load Template
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-gray-600">
                      <Database className="h-4 w-4 mr-2" />
                      Save Configuration
                    </Button>
                  </CardContent>
                </Card>

                {/* Start Batch */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="pt-6">
                    <Button 
                      onClick={handleStartBatch}
                      disabled={!contentType || !basePrompt || isProcessing}
                      className="w-full bg-yellow-600 hover:bg-yellow-700"
                      size="lg"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5 mr-2" />
                          Start Batch Creation
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Batch Jobs
                </CardTitle>
                <CardDescription>
                  Monitor your batch creation jobs
                </CardDescription>
              </CardHeader>
              <CardContent>
                {batchJobs.length === 0 ? (
                  <div className="text-center py-12">
                    <Database className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-300 mb-2">No batch jobs yet</h3>
                    <p className="text-gray-500">Start your first batch to see jobs here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {batchJobs.map((job) => (
                      <div key={job.id} className="p-4 bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{job.name}</h4>
                            <p className="text-sm text-gray-400">
                              {job.type} • {job.completedItems}/{job.totalItems} items
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={
                                job.status === 'completed' ? 'default' :
                                job.status === 'processing' ? 'secondary' :
                                job.status === 'failed' ? 'destructive' : 'outline'
                              }
                            >
                              {job.status}
                            </Badge>
                            {job.status === 'processing' && (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400"></div>
                            )}
                          </div>
                        </div>
                        
                        <Progress value={job.progress} />
                        
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>Progress: {job.progress}%</span>
                          {job.estimatedTime && job.status === 'processing' && (
                            <span>
                              ETA: {formatTime(Math.floor((job.estimatedTime * (100 - job.progress)) / 100))}
                            </span>
                          )}
                          <span>{job.createdAt.toLocaleTimeString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Table className="h-5 w-5" />
                  Generated Content
                </CardTitle>
                <CardDescription>
                  Browse and manage your batch-generated content
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedItems.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-300 mb-2">No content generated yet</h3>
                    <p className="text-gray-500">Complete a batch job to see results here</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {generatedItems.map((item) => (
                      <div key={item.id} className="group relative">
                        <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
                          <img 
                            src={item.url} 
                            alt={item.variation}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
                          <Button size="sm" variant="secondary">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="secondary">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="secondary">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs font-medium truncate">{item.variation}</p>
                          <p className="text-xs text-gray-400">{item.platform}</p>
                          {item.status === 'failed' && (
                            <Badge variant="destructive" className="text-xs mt-1">Failed</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg">Total Generated</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-400">
                    {generatedItems.length}
                  </div>
                  <p className="text-sm text-gray-400">Items created</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400">
                    {generatedItems.length > 0 
                      ? Math.round((generatedItems.filter(item => item.status === 'success').length / generatedItems.length) * 100)
                      : 0}%
                  </div>
                  <p className="text-sm text-gray-400">Generation success</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg">Active Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-400">
                    {batchJobs.filter(job => job.status === 'processing').length}
                  </div>
                  <p className="text-sm text-gray-400">Currently processing</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
