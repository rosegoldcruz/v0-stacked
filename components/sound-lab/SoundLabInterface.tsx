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
  Music, 
  Volume2, 
  Upload, 
  Download, 
  Play, 
  Pause,
  Wand2, 
  Mic,
  Headphones,
  Radio,
  Zap,
  Clock,
  Star,
  Copy,
  Trash2,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Sparkles
} from 'lucide-react'
import { useSubscription } from '@/hooks/useSubscription'

const musicGenres = [
  { id: 'ambient', name: 'Ambient', description: 'Atmospheric soundscapes' },
  { id: 'electronic', name: 'Electronic', description: 'Synthesized beats' },
  { id: 'classical', name: 'Classical', description: 'Orchestral compositions' },
  { id: 'jazz', name: 'Jazz', description: 'Smooth and soulful' },
  { id: 'rock', name: 'Rock', description: 'Energetic guitar-driven' },
  { id: 'pop', name: 'Pop', description: 'Catchy mainstream' },
  { id: 'hiphop', name: 'Hip-Hop', description: 'Rhythmic rap beats' },
  { id: 'cinematic', name: 'Cinematic', description: 'Movie soundtrack style' }
]

const soundTypes = [
  { id: 'music', name: 'Music Track', description: 'Full musical compositions' },
  { id: 'sfx', name: 'Sound Effects', description: 'Environmental sounds' },
  { id: 'voice', name: 'Voice Synthesis', description: 'AI-generated speech' },
  { id: 'ambient', name: 'Ambient Audio', description: 'Background atmospheres' }
]

const instruments = [
  { id: 'piano', name: 'Piano' },
  { id: 'guitar', name: 'Guitar' },
  { id: 'drums', name: 'Drums' },
  { id: 'violin', name: 'Violin' },
  { id: 'synthesizer', name: 'Synthesizer' },
  { id: 'bass', name: 'Bass' },
  { id: 'saxophone', name: 'Saxophone' },
  { id: 'orchestra', name: 'Full Orchestra' }
]

const moods = [
  { id: 'energetic', name: 'Energetic' },
  { id: 'calm', name: 'Calm' },
  { id: 'dark', name: 'Dark' },
  { id: 'uplifting', name: 'Uplifting' },
  { id: 'mysterious', name: 'Mysterious' },
  { id: 'romantic', name: 'Romantic' },
  { id: 'aggressive', name: 'Aggressive' },
  { id: 'melancholic', name: 'Melancholic' }
]

const voiceTypes = [
  { id: 'male-professional', name: 'Male Professional', accent: 'American' },
  { id: 'female-professional', name: 'Female Professional', accent: 'British' },
  { id: 'male-casual', name: 'Male Casual', accent: 'Australian' },
  { id: 'female-warm', name: 'Female Warm', accent: 'Canadian' },
  { id: 'child', name: 'Child Voice', accent: 'American' },
  { id: 'elderly', name: 'Elderly Voice', accent: 'British' }
]

interface GeneratedAudio {
  id: string
  title: string
  type: string
  genre?: string
  duration: number
  url: string
  timestamp: Date
  isPlaying?: boolean
}

export default function SoundLabInterface() {
  const { tier } = useSubscription()
  const [activeTab, setActiveTab] = useState('music')
  const [soundType, setSoundType] = useState('')
  const [genre, setGenre] = useState('')
  const [mood, setMood] = useState('')
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([])
  const [tempo, setTempo] = useState([120])
  const [duration, setDuration] = useState([30])
  const [energy, setEnergy] = useState([5])
  const [prompt, setPrompt] = useState('')
  const [voiceType, setVoiceType] = useState('')
  const [voiceText, setVoiceText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedAudio, setGeneratedAudio] = useState<GeneratedAudio[]>([])
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)

  const maxDuration = tier === 'Free' ? 30 : tier === 'Starter' ? 120 : tier === 'Pro' ? 300 : 600

  const handleGenerate = async () => {
    if (!soundType) return
    
    setIsGenerating(true)
    setProgress(0)

    // Simulate audio generation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          
          // Add generated audio
          const newAudio: GeneratedAudio = {
            id: Date.now() + '',
            title: `Generated ${soundType}`,
            type: soundType,
            genre: genre,
            duration: duration[0],
            url: '/api/placeholder/audio',
            timestamp: new Date(),
            isPlaying: false
          }
          
          setGeneratedAudio(prev => [newAudio, ...prev])
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const togglePlayPause = (id: string) => {
    if (currentlyPlaying === id) {
      setCurrentlyPlaying(null)
    } else {
      setCurrentlyPlaying(id)
    }
    
    setGeneratedAudio(prev => prev.map(audio => ({
      ...audio,
      isPlaying: audio.id === id ? !audio.isPlaying : false
    })))
  }

  const deleteAudio = (id: string) => {
    setGeneratedAudio(prev => prev.filter(audio => audio.id !== id))
  }

  const canUseFeature = (feature: string) => {
    if (feature === 'voice-synthesis') return tier !== 'Free'
    if (feature === 'long-duration') return tier === 'Pro' || tier === 'Ultimate'
    if (feature === 'advanced-models') return tier === 'Ultimate'
    return true
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Music className="h-8 w-8 text-red-400" />
            <h1 className="text-3xl font-bold">Sound Lab</h1>
            <Badge variant="secondary">AI-Powered</Badge>
          </div>
          <p className="text-gray-400 text-lg">Create music, sound effects, and voices with advanced AI audio generation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Generation Panel */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-800">
                <TabsTrigger value="music">Music</TabsTrigger>
                <TabsTrigger value="voice">Voice</TabsTrigger>
                <TabsTrigger value="sfx">Sound FX</TabsTrigger>
                <TabsTrigger value="library">Library</TabsTrigger>
              </TabsList>

              <TabsContent value="music" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Music className="h-5 w-5" />
                      Music Generation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="music-prompt">Music Description</Label>
                      <Textarea
                        id="music-prompt"
                        placeholder="Describe the music you want to create... e.g., 'Upbeat electronic dance track with heavy bass'"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[100px] bg-gray-700 border-gray-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Genre</Label>
                        <Select value={genre} onValueChange={setGenre}>
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue placeholder="Select genre" />
                          </SelectTrigger>
                          <SelectContent>
                            {musicGenres.map((g) => (
                              <SelectItem key={g.id} value={g.id}>
                                {g.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Mood</Label>
                        <Select value={mood} onValueChange={setMood}>
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue placeholder="Select mood" />
                          </SelectTrigger>
                          <SelectContent>
                            {moods.map((m) => (
                              <SelectItem key={m.id} value={m.id}>
                                {m.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Tempo: {tempo[0]} BPM</Label>
                        <Slider
                          value={tempo}
                          onValueChange={setTempo}
                          max={200}
                          min={60}
                          step={5}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label>Duration: {duration[0]}s</Label>
                        <Slider
                          value={duration}
                          onValueChange={setDuration}
                          max={maxDuration}
                          min={10}
                          step={5}
                          className="mt-2"
                        />
                        <p className="text-xs text-gray-400 mt-1">Max: {maxDuration}s</p>
                      </div>
                      <div>
                        <Label>Energy Level: {energy[0]}/10</Label>
                        <Slider
                          value={energy}
                          onValueChange={setEnergy}
                          max={10}
                          min={1}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    {!isGenerating ? (
                      <Button 
                        onClick={() => {
                          setSoundType('music')
                          handleGenerate()
                        }}
                        disabled={!prompt && !genre}
                        className="w-full bg-red-600 hover:bg-red-700"
                        size="lg"
                      >
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate Music
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-400"></div>
                          <span>Composing music... {progress}%</span>
                        </div>
                        <Progress value={progress} className="w-full" />
                        <p className="text-sm text-gray-400 text-center">
                          Creating {duration[0]}s {genre} track
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="voice" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mic className="h-5 w-5" />
                      Voice Synthesis
                    </CardTitle>
                    <CardDescription>
                      {!canUseFeature('voice-synthesis') && (
                        <Badge variant="outline" className="ml-2">Pro Feature</Badge>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {!canUseFeature('voice-synthesis') ? (
                      <div className="text-center py-8">
                        <Mic className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-300 mb-2">Voice Synthesis</h3>
                        <p className="text-gray-400 mb-4">Upgrade to create AI voices</p>
                        <Button className="bg-red-600 hover:bg-red-700">
                          Upgrade Plan
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div>
                          <Label htmlFor="voice-text">Text to Speak</Label>
                          <Textarea
                            id="voice-text"
                            placeholder="Enter the text you want to convert to speech..."
                            value={voiceText}
                            onChange={(e) => setVoiceText(e.target.value)}
                            className="min-h-[100px] bg-gray-700 border-gray-600"
                          />
                          <p className="text-sm text-gray-400 mt-2">
                            {voiceText.length} characters • ~{Math.ceil(voiceText.length / 10)} seconds
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Voice Type</Label>
                            <Select value={voiceType} onValueChange={setVoiceType}>
                              <SelectTrigger className="bg-gray-700 border-gray-600">
                                <SelectValue placeholder="Select voice" />
                              </SelectTrigger>
                              <SelectContent>
                                {voiceTypes.map((voice) => (
                                  <SelectItem key={voice.id} value={voice.id}>
                                    {voice.name} ({voice.accent})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Speaking Speed</Label>
                            <Select>
                              <SelectTrigger className="bg-gray-700 border-gray-600">
                                <SelectValue placeholder="Normal" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="slow">Slow (0.8x)</SelectItem>
                                <SelectItem value="normal">Normal (1.0x)</SelectItem>
                                <SelectItem value="fast">Fast (1.2x)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <Button 
                          onClick={() => {
                            setSoundType('voice')
                            handleGenerate()
                          }}
                          disabled={!voiceText || !voiceType}
                          className="w-full bg-red-600 hover:bg-red-700"
                        >
                          <Mic className="h-4 w-4 mr-2" />
                          Generate Voice
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sfx" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Volume2 className="h-5 w-5" />
                      Sound Effects
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="sfx-prompt">Sound Effect Description</Label>
                      <Textarea
                        id="sfx-prompt"
                        placeholder="Describe the sound effect... e.g., 'thunder in a storm', 'footsteps on gravel', 'door creaking'"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[100px] bg-gray-700 border-gray-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Category</Label>
                        <Select>
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nature">Nature</SelectItem>
                            <SelectItem value="urban">Urban</SelectItem>
                            <SelectItem value="mechanical">Mechanical</SelectItem>
                            <SelectItem value="human">Human</SelectItem>
                            <SelectItem value="fantasy">Fantasy</SelectItem>
                            <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Duration: {duration[0]}s</Label>
                        <Slider
                          value={duration}
                          onValueChange={setDuration}
                          max={30}
                          min={1}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={() => {
                        setSoundType('sfx')
                        handleGenerate()
                      }}
                      disabled={!prompt}
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      <Volume2 className="h-4 w-4 mr-2" />
                      Generate Sound Effect
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="library" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Headphones className="h-5 w-5" />
                      Audio Library
                    </CardTitle>
                    <CardDescription>
                      Your generated audio • {generatedAudio.length} tracks
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {generatedAudio.length === 0 ? (
                      <div className="text-center py-12">
                        <Music className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-300 mb-2">No audio generated yet</h3>
                        <p className="text-gray-500">Create your first track to see it here</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {generatedAudio.map((audio) => (
                          <div key={audio.id} className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => togglePlayPause(audio.id)}
                              className="border-gray-600"
                            >
                              {audio.isPlaying ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                            
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">{audio.title}</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span>{audio.type}</span>
                                {audio.genre && (
                                  <>
                                    <span>•</span>
                                    <span>{audio.genre}</span>
                                  </>
                                )}
                                <span>•</span>
                                <span>{formatDuration(audio.duration)}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" className="border-gray-600">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-gray-600">
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => deleteAudio(audio.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Audio Stats */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Generation Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Music className="h-4 w-4 text-red-400" />
                    <span className="text-sm">Tracks Created</span>
                  </div>
                  <Badge variant="outline">15/25</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">Total Duration</span>
                  </div>
                  <Badge variant="outline">8m 45s</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Favorites</span>
                  </div>
                  <Badge variant="outline">3</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Popular Genres */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Popular Genres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Electronic', usage: '35%' },
                  { name: 'Ambient', usage: '28%' },
                  { name: 'Cinematic', usage: '20%' },
                  { name: 'Classical', usage: '17%' }
                ].map((genre, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm">{genre.name}</span>
                    <Badge variant="outline">{genre.usage}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Quick Generate</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-gray-600">
                  <Radio className="h-4 w-4 mr-2" />
                  Background Music
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-600">
                  <Mic className="h-4 w-4 mr-2" />
                  Narration Voice
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-600">
                  <Volume2 className="h-4 w-4 mr-2" />
                  Sound Effects
                </Button>
              </CardContent>
            </Card>

            {/* Upgrade Prompt */}
            {tier === 'Free' && (
              <Card className="bg-gradient-to-br from-red-600/20 to-orange-600/20 border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-lg">Unlock Audio Pro</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 mb-4">
                    <li>• Longer audio duration</li>
                    <li>• Voice synthesis</li>
                    <li>• Advanced models</li>
                    <li>• Commercial license</li>
                  </ul>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
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
