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
  User, 
  Users, 
  Upload, 
  Download, 
  Wand2, 
  Eye, 
  Zap,
  Clock,
  Star,
  Copy,
  Trash2,
  Camera,
  Palette,
  Settings,
  Sparkles,
  RefreshCw
} from 'lucide-react'
import { useSubscription } from '@/hooks/useSubscription'

const humanTypes = [
  { id: 'portrait', name: 'Portrait', description: 'Professional headshots' },
  { id: 'full-body', name: 'Full Body', description: 'Complete figure' },
  { id: 'avatar', name: 'Avatar', description: 'Digital character' },
  { id: 'cartoon', name: 'Cartoon', description: 'Stylized character' },
  { id: 'realistic', name: 'Photorealistic', description: 'Life-like human' },
  { id: 'fantasy', name: 'Fantasy', description: 'Mythical character' }
]

const genders = [
  { id: 'male', name: 'Male' },
  { id: 'female', name: 'Female' },
  { id: 'non-binary', name: 'Non-binary' },
  { id: 'random', name: 'Random' }
]

const ethnicities = [
  { id: 'caucasian', name: 'Caucasian' },
  { id: 'african', name: 'African' },
  { id: 'asian', name: 'Asian' },
  { id: 'hispanic', name: 'Hispanic' },
  { id: 'middle-eastern', name: 'Middle Eastern' },
  { id: 'mixed', name: 'Mixed' },
  { id: 'random', name: 'Random' }
]

const ages = [
  { id: 'child', name: 'Child (5-12)', min: 5, max: 12 },
  { id: 'teen', name: 'Teen (13-19)', min: 13, max: 19 },
  { id: 'young-adult', name: 'Young Adult (20-35)', min: 20, max: 35 },
  { id: 'adult', name: 'Adult (36-55)', min: 36, max: 55 },
  { id: 'senior', name: 'Senior (55+)', min: 55, max: 80 }
]

const poses = [
  { id: 'neutral', name: 'Neutral', description: 'Standard pose' },
  { id: 'confident', name: 'Confident', description: 'Strong stance' },
  { id: 'casual', name: 'Casual', description: 'Relaxed pose' },
  { id: 'professional', name: 'Professional', description: 'Business pose' },
  { id: 'creative', name: 'Creative', description: 'Artistic pose' },
  { id: 'action', name: 'Action', description: 'Dynamic movement' }
]

interface GeneratedHuman {
  id: string
  url: string
  type: string
  gender: string
  age: string
  ethnicity: string
  timestamp: Date
}

export default function HumanStudioInterface() {
  const { tier } = useSubscription()
  const [activeTab, setActiveTab] = useState('create')
  const [humanType, setHumanType] = useState('')
  const [gender, setGender] = useState('')
  const [ethnicity, setEthnicity] = useState('')
  const [ageGroup, setAgeGroup] = useState('')
  const [specificAge, setSpecificAge] = useState([25])
  const [pose, setPose] = useState('')
  const [clothing, setClothing] = useState('')
  const [expression, setExpression] = useState('')
  const [hairStyle, setHairStyle] = useState('')
  const [eyeColor, setEyeColor] = useState('')
  const [customPrompt, setCustomPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedHumans, setGeneratedHumans] = useState<GeneratedHuman[]>([])
  const [batchSize, setBatchSize] = useState([1])

  const maxBatchSize = tier === 'Free' ? 1 : tier === 'Starter' ? 4 : tier === 'Pro' ? 8 : 16

  const handleGenerate = async () => {
    if (!humanType || !gender) return
    
    setIsGenerating(true)
    setProgress(0)

    // Simulate human generation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          
          // Add generated humans
          const newHumans: GeneratedHuman[] = Array.from({ length: batchSize[0] }, (_, i) => ({
            id: Date.now() + i + '',
            url: '/api/placeholder/400/600',
            type: humanType,
            gender,
            age: ageGroup,
            ethnicity,
            timestamp: new Date()
          }))
          
          setGeneratedHumans(prev => [...newHumans, ...prev])
          return 100
        }
        return prev + 2.5
      })
    }, 100)
  }

  const deleteHuman = (id: string) => {
    setGeneratedHumans(prev => prev.filter(human => human.id !== id))
  }

  const canUseFeature = (feature: string) => {
    if (feature === 'full-body') return tier !== 'Free'
    if (feature === 'fantasy') return tier === 'Pro' || tier === 'Ultimate'
    if (feature === 'batch') return tier !== 'Free'
    return true
  }

  const generateRandomHuman = () => {
    setHumanType(humanTypes[Math.floor(Math.random() * humanTypes.length)].id)
    setGender(genders[Math.floor(Math.random() * (genders.length - 1))].id)
    setEthnicity(ethnicities[Math.floor(Math.random() * (ethnicities.length - 1))].id)
    setAgeGroup(ages[Math.floor(Math.random() * ages.length)].id)
    setPose(poses[Math.floor(Math.random() * poses.length)].id)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-8 w-8 text-green-400" />
            <h1 className="text-3xl font-bold">Human Studio</h1>
            <Badge variant="secondary">AI-Powered</Badge>
          </div>
          <p className="text-gray-400 text-lg">Create realistic human avatars and characters with advanced AI</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Creation Panel */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                <TabsTrigger value="create">Create Human</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="animate">Animate</TabsTrigger>
              </TabsList>

              <TabsContent value="create" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wand2 className="h-5 w-5" />
                      Character Generator
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={generateRandomHuman}
                        className="ml-auto border-gray-600"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Random
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Basic Settings */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Human Type</Label>
                        <Select value={humanType} onValueChange={setHumanType}>
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {humanTypes.map((type) => (
                              <SelectItem 
                                key={type.id} 
                                value={type.id}
                                disabled={!canUseFeature(type.id)}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span>{type.name}</span>
                                  {!canUseFeature(type.id) && (
                                    <Badge variant="outline" className="ml-2">Pro</Badge>
                                  )}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Gender</Label>
                        <Select value={gender} onValueChange={setGender}>
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            {genders.map((g) => (
                              <SelectItem key={g.id} value={g.id}>
                                {g.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Ethnicity</Label>
                        <Select value={ethnicity} onValueChange={setEthnicity}>
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue placeholder="Select ethnicity" />
                          </SelectTrigger>
                          <SelectContent>
                            {ethnicities.map((eth) => (
                              <SelectItem key={eth.id} value={eth.id}>
                                {eth.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Age Group</Label>
                        <Select value={ageGroup} onValueChange={setAgeGroup}>
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue placeholder="Select age" />
                          </SelectTrigger>
                          <SelectContent>
                            {ages.map((age) => (
                              <SelectItem key={age.id} value={age.id}>
                                {age.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Specific Age Slider */}
                    <div>
                      <Label>Specific Age: {specificAge[0]} years</Label>
                      <Slider
                        value={specificAge}
                        onValueChange={setSpecificAge}
                        max={80}
                        min={5}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    {/* Appearance Details */}
                    <div className="border-t border-gray-700 pt-4">
                      <Label className="text-sm text-gray-300">Appearance Details</Label>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <Label>Pose</Label>
                          <Select value={pose} onValueChange={setPose}>
                            <SelectTrigger className="bg-gray-700 border-gray-600">
                              <SelectValue placeholder="Select pose" />
                            </SelectTrigger>
                            <SelectContent>
                              {poses.map((p) => (
                                <SelectItem key={p.id} value={p.id}>
                                  {p.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Expression</Label>
                          <Select value={expression} onValueChange={setExpression}>
                            <SelectTrigger className="bg-gray-700 border-gray-600">
                              <SelectValue placeholder="Select expression" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="neutral">Neutral</SelectItem>
                              <SelectItem value="smile">Smile</SelectItem>
                              <SelectItem value="serious">Serious</SelectItem>
                              <SelectItem value="confident">Confident</SelectItem>
                              <SelectItem value="friendly">Friendly</SelectItem>
                              <SelectItem value="surprised">Surprised</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label>Hair Style</Label>
                          <Input
                            placeholder="e.g., long blonde hair"
                            value={hairStyle}
                            onChange={(e) => setHairStyle(e.target.value)}
                            className="bg-gray-700 border-gray-600"
                          />
                        </div>
                        <div>
                          <Label>Eye Color</Label>
                          <Select value={eyeColor} onValueChange={setEyeColor}>
                            <SelectTrigger className="bg-gray-700 border-gray-600">
                              <SelectValue placeholder="Select eye color" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="brown">Brown</SelectItem>
                              <SelectItem value="blue">Blue</SelectItem>
                              <SelectItem value="green">Green</SelectItem>
                              <SelectItem value="hazel">Hazel</SelectItem>
                              <SelectItem value="gray">Gray</SelectItem>
                              <SelectItem value="amber">Amber</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Label>Clothing Style</Label>
                        <Input
                          placeholder="e.g., business suit, casual wear, traditional dress"
                          value={clothing}
                          onChange={(e) => setClothing(e.target.value)}
                          className="bg-gray-700 border-gray-600"
                        />
                      </div>
                    </div>

                    {/* Custom Prompt */}
                    <div className="border-t border-gray-700 pt-4">
                      <Label htmlFor="custom-prompt">Additional Details (Optional)</Label>
                      <Textarea
                        id="custom-prompt"
                        placeholder="Add any specific details or styling instructions..."
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        className="bg-gray-700 border-gray-600"
                        rows={3}
                      />
                    </div>

                    {/* Batch Size */}
                    <div>
                      <Label>Generate: {batchSize[0]} variation{batchSize[0] > 1 ? 's' : ''}</Label>
                      <Slider
                        value={batchSize}
                        onValueChange={setBatchSize}
                        max={maxBatchSize}
                        min={1}
                        step={1}
                        className="mt-2"
                        disabled={!canUseFeature('batch')}
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Max {maxBatchSize} variations ({tier} plan)
                      </p>
                    </div>

                    {!isGenerating ? (
                      <Button 
                        onClick={handleGenerate}
                        disabled={!humanType || !gender}
                        className="w-full bg-green-600 hover:bg-green-700"
                        size="lg"
                      >
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate Human
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-400"></div>
                          <span>Creating human... {progress}%</span>
                        </div>
                        <Progress value={progress} className="w-full" />
                        <p className="text-sm text-gray-400 text-center">
                          Generating {batchSize[0]} {humanType} character{batchSize[0] > 1 ? 's' : ''}
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
                      <Users className="h-5 w-5" />
                      Generated Characters
                    </CardTitle>
                    <CardDescription>
                      Your character library • {generatedHumans.length} characters
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {generatedHumans.length === 0 ? (
                      <div className="text-center py-12">
                        <User className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-300 mb-2">No characters created yet</h3>
                        <p className="text-gray-500">Create your first character to see it here</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {generatedHumans.map((human) => (
                          <div key={human.id} className="group relative">
                            <div className="aspect-[3/4] bg-gray-700 rounded-lg overflow-hidden">
                              <img 
                                src={human.url} 
                                alt={`${human.gender} ${human.type}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                              <Button size="sm" variant="secondary">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="secondary">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="secondary">
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => deleteHuman(human.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="mt-2">
                              <p className="text-xs font-medium">{human.type}</p>
                              <p className="text-xs text-gray-400">{human.gender} • {human.ethnicity}</p>
                              <p className="text-xs text-gray-500">{human.age}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="animate" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      Character Animation
                    </CardTitle>
                    <CardDescription>
                      Bring your characters to life with AI animation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {tier === 'Free' ? (
                      <div className="text-center py-8">
                        <Camera className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-300 mb-2">Character Animation</h3>
                        <p className="text-gray-400 mb-4">Upgrade to animate your characters</p>
                        <Button className="bg-green-600 hover:bg-green-700">
                          Upgrade Plan
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-gray-400">
                          Select a character from your gallery to animate with various poses and expressions
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <Button variant="outline" className="border-gray-600">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Character
                          </Button>
                          <Button variant="outline" className="border-gray-600">
                            <Wand2 className="h-4 w-4 mr-2" />
                            Animation Presets
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
            {/* Character Stats */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Creation Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-green-400" />
                    <span className="text-sm">Characters Created</span>
                  </div>
                  <Badge variant="outline">23/50</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">Avg. Generation</span>
                  </div>
                  <Badge variant="outline">45s</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Favorites</span>
                  </div>
                  <Badge variant="outline">5</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Popular Styles */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Popular Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Portrait', usage: '45%' },
                  { name: 'Avatar', usage: '32%' },
                  { name: 'Full Body', usage: '18%' },
                  { name: 'Fantasy', usage: '5%' }
                ].map((type, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm">{type.name}</span>
                    <Badge variant="outline">{type.usage}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Presets */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Quick Presets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-gray-600">
                  <Palette className="h-4 w-4 mr-2" />
                  Business Professional
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  Casual Character
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-600">
                  <Star className="h-4 w-4 mr-2" />
                  Fantasy Hero
                </Button>
              </CardContent>
            </Card>

            {/* Upgrade Prompt */}
            {tier === 'Free' && (
              <Card className="bg-gradient-to-br from-green-600/20 to-blue-600/20 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-lg">Unlock Advanced</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 mb-4">
                    <li>• Full body characters</li>
                    <li>• Character animation</li>
                    <li>• Batch generation</li>
                    <li>• Fantasy styles</li>
                  </ul>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
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
