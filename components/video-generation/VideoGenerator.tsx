import React, { useState } from 'react';
import { Play, Upload, Download, Settings, Zap, Video, Clock, Maximize, Film, RefreshCw, Sparkles } from 'lucide-react';

export default function VideoGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState('5s');
  const [selectedRatio, setSelectedRatio] = useState('16:9');
  const [selectedModel, setSelectedModel] = useState('minimax-video-01');

  const durations = [
    { id: '5s', name: '5 seconds', cost: '$0.05' },
    { id: '10s', name: '10 seconds', cost: '$0.10' },
    { id: '15s', name: '15 seconds', cost: '$0.15' },
    { id: '30s', name: '30 seconds', cost: '$0.30' }
  ];

  const aspectRatios = [
    { id: '16:9', name: '16:9 (Landscape)', width: '1920', height: '1080' },
    { id: '9:16', name: '9:16 (Portrait)', width: '1080', height: '1920' },
    { id: '1:1', name: '1:1 (Square)', width: '1080', height: '1080' },
    { id: '4:3', name: '4:3 (Classic)', width: '1440', height: '1080' }
  ];

  const models = [
    { id: 'minimax-video-01', name: 'MiniMax Video-01', type: 'Premium', speed: 'Fast' },
    { id: 'cogvideox-5b', name: 'CogVideoX-5B', type: 'Pro', speed: 'Medium' },
    { id: 'stable-video', name: 'Stable Video Diffusion', type: 'Standard', speed: 'Fast' },
    { id: 'zeroscope-v2', name: 'Zeroscope v2', type: 'Basic', speed: 'Ultra Fast' }
  ];

  const videoStyles = [
    'Cinematic', 'Anime', 'Realistic', 'Abstract', 'Cartoon', 'Film Noir',
    'Cyberpunk', 'Fantasy', 'Documentary', 'Music Video', 'Commercial', 'Artistic'
  ];

  const quickPrompts = [
    'A serene lake at sunset with gentle ripples',
    'Bustling city street with neon lights at night',
    'Close-up of flower petals dancing in the wind',
    'Drone shot flying over mountain peaks',
    'Abstract colorful paint mixing in slow motion',
    'Person walking through a futuristic corridor'
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call to Replicate via Vercel
    setTimeout(() => {
      setIsGenerating(false);
    }, 45000); // Video generation takes longer
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Input Panel */}
        <div className="w-1/2 p-6 border-r border-gray-700">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Video Generation</h1>
                  <p className="text-gray-400">Create AI videos from text prompts</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Zap className="w-4 h-4" />
                <span>Orange Powered</span>
              </div>
            </div>

            {/* Prompt Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Video Description
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the video you want to create... Be specific about movement, camera angles, and visual details."
                  className="w-full h-32 p-4 bg-gray-800 border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">{prompt.length}/500 characters</span>
                  <span className="text-xs text-blue-400">Be descriptive for best results</span>
                </div>
              </div>
            </div>

            {/* Quick Prompts */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Quick Start Prompts
              </label>
              <div className="grid grid-cols-1 gap-2">
                {quickPrompts.map((quickPrompt, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(quickPrompt)}
                    className="p-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg text-left transition-colors border border-gray-700 hover:border-gray-600"
                  >
                    {quickPrompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Video Settings */}
            <div className="space-y-4 p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Video Settings</span>
                <Settings className="w-4 h-4 text-gray-400" />
              </div>
              
              {/* Duration */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Duration</label>
                <div className="grid grid-cols-2 gap-2">
                  {durations.map(duration => (
                    <button
                      key={duration.id}
                      onClick={() => setSelectedDuration(duration.id)}
                      className={`p-3 rounded-lg border transition-colors ${
                        selectedDuration === duration.id
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 border-orange-400'
                          : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-sm font-medium">{duration.name}</div>
                      <div className="text-xs text-gray-400">{duration.cost}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Aspect Ratio</label>
                <div className="grid grid-cols-2 gap-2">
                  {aspectRatios.map(ratio => (
                    <button
                      key={ratio.id}
                      onClick={() => setSelectedRatio(ratio.id)}
                      className={`p-3 rounded-lg border transition-colors ${
                        selectedRatio === ratio.id
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 border-orange-400'
                          : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-sm font-medium">{ratio.name}</div>
                      <div className="text-xs text-gray-400">{ratio.width}×{ratio.height}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Model */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">AI Model</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  {models.map(model => (
                    <option key={model.id} value={model.id}>
                      {model.name} ({model.type})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full p-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-600 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Generating Video...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Video</span>
                </>
              )}
            </button>

            {isGenerating && (
              <div className="text-center text-sm text-gray-400">
                <div className="mb-2">Estimated time: 30-60 seconds</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full animate-pulse" style={{width: '45%'}}></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-1/2 p-6">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Preview</h2>
              <div className="flex space-x-2">
                <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  <Upload className="w-4 h-4" />
                </button>
                <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Preview Area */}
            <div className="flex-1 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center relative">
              {isGenerating ? (
                <div className="text-center">
                  <div className="w-20 h-20 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-400 font-medium">Creating your video...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take 30-60 seconds</p>
                  <div className="mt-4 text-xs text-gray-400">
                    <div>Model: {models.find(m => m.id === selectedModel)?.name}</div>
                    <div>Duration: {durations.find(d => d.id === selectedDuration)?.name}</div>
                    <div>Ratio: {selectedRatio}</div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Video className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 font-medium">Your generated video will appear here</p>
                  <p className="text-sm text-gray-500 mt-2">Enter a prompt and click Generate to start</p>
                  
                  {/* Preview Settings Display */}
                  <div className="mt-6 p-4 bg-gray-700 rounded-lg text-left max-w-sm mx-auto">
                    <div className="text-sm font-medium text-gray-300 mb-2">Current Settings:</div>
                    <div className="space-y-1 text-xs text-gray-400">
                      <div>Duration: {durations.find(d => d.id === selectedDuration)?.name}</div>
                      <div>Aspect Ratio: {selectedRatio}</div>
                      <div>Model: {models.find(m => m.id === selectedModel)?.name}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Sidebar */}
      <div className="w-80 p-6 bg-gray-800 border-l border-gray-700">
        <div className="space-y-6">
          {/* Usage Stats */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Usage This Month</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Videos Created</span>
                <span className="font-medium">12/25</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{width: '48%'}}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Duration</span>
                <span className="font-medium">2m 15s</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Avg. Generation</span>
                <span className="font-medium">45s</span>
              </div>
            </div>
          </div>

          {/* Popular Styles */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Styles</h3>
            <div className="grid grid-cols-2 gap-2">
              {videoStyles.slice(0, 8).map(style => (
                <button
                  key={style}
                  onClick={() => setPrompt(prev => prev + ` in ${style.toLowerCase()} style`)}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs transition-colors"
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Generation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Generation Queue</h3>
            <div className="space-y-2">
              {isGenerating && (
                <div className="p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Current Generation</span>
                    <Clock className="w-4 h-4 text-orange-400" />
                  </div>
                  <div className="text-xs text-gray-400 truncate">{prompt}</div>
                  <div className="mt-2 text-xs text-blue-400">In Progress...</div>
                </div>
              )}
              
              <div className="text-center py-4">
                <div className="text-sm text-gray-500">No pending generations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
