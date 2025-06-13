'use client';

import React, { useState } from 'react';

interface GeneratedVideo {
  id: number;
  prompt: string;
  url: string;
  duration: string;
  model: string;
  createdAt: string;
}

export default function VideoGenerationInterface() {
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState('5');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [selectedModel, setSelectedModel] = useState('minimax-video-01');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideos, setGeneratedVideos] = useState<GeneratedVideo[]>([]);

  const models = [
    { id: 'minimax-video-01', name: '🎬 MiniMax Video-01', desc: 'Professional video generation from text prompts', accuracy: '91%', speed: 'Fast' },
    { id: 'runway-gen3', name: '🎭 Runway Gen-3', desc: 'Creative video synthesis with artistic flair', accuracy: '89%', speed: 'Medium' },
    { id: 'luma-dream', name: '🌊 Luma Dream Machine', desc: 'Cinematic quality video creation', accuracy: '94%', speed: 'Ultra Fast' },
    { id: 'kling-ai', name: '⚡ Kling AI', desc: 'High-quality video synthesis', accuracy: '88%', speed: 'Fast' },
    { id: 'pika-labs', name: '🎪 Pika Labs', desc: 'Creative video effects and generation', accuracy: '85%', speed: 'Medium' },
    { id: 'stable-video', name: '🎥 Stable Video Diffusion', desc: 'Image to video animation', accuracy: '87%', speed: 'Fast' }
  ];

  const quickPrompts = [
    "A serene lake at sunset with gentle ripples",
    "Bustling city street with neon lights at night", 
    "Close-up of flower petals dancing in the wind",
    "Drone shot flying over mountain peaks",
    "Abstract colorful paint mixing in slow motion",
    "Person walking through a futuristic corridor"
  ];

  const popularStyles = [
    { id: 'cinematic', name: 'Cinematic', emoji: '🎬' },
    { id: 'anime', name: 'Anime', emoji: '🌸' },
    { id: 'realistic', name: 'Realistic', emoji: '📸' },
    { id: 'abstract', name: 'Abstract', emoji: '🎨' },
    { id: 'cartoon', name: 'Cartoon', emoji: '🎪' },
    { id: 'cyberpunk', name: 'Cyberpunk', emoji: '🤖' },
    { id: 'fantasy', name: 'Fantasy', emoji: '🧚' },
    { id: 'film-noir', name: 'Film Noir', emoji: '🎭' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedVideos(prev => [...prev, {
        id: Date.now(),
        prompt: prompt,
        url: 'https://via.placeholder.com/400x300/FF6B35/FFFFFF?text=Generated+Video',
        duration: duration,
        model: selectedModel,
        createdAt: new Date().toLocaleTimeString()
      }]);
      setIsGenerating(false);
    }, 5000);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-96 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
              <span className="text-2xl">🎬</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Video Generation</h1>
              <p className="text-sm text-gray-400">Create AI videos from text prompts</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">📝 Video Description</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the video you want to create... Be specific about movement, camera angles, and visual details."
                className="w-full h-32 p-4 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 resize-none text-sm"
                maxLength={500}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{prompt.length}/500 characters</span>
                <span>Be descriptive for best results</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">⚡ Quick Start Prompts</label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {quickPrompts.map((quickPrompt, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(quickPrompt)}
                    className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                  >
                    {quickPrompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">⏱️ Duration</label>
                <select 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="5">5 seconds</option>
                  <option value="10">10 seconds</option>
                  <option value="15">15 seconds</option>
                  <option value="30">30 seconds</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">📐 Aspect Ratio</label>
                <select 
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="16:9">16:9 (Landscape)</option>
                  <option value="9:16">9:16 (Portrait)</option>
                  <option value="1:1">1:1 (Square)</option>
                  <option value="4:3">4:3 (Classic)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">🤖 AI Model</label>
              <select 
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                {models.map(model => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
              <div className="mt-2 p-3 bg-gray-700 rounded-lg">
                <p className="text-xs text-gray-300 mb-1">
                  {models.find(m => m.id === selectedModel)?.desc}
                </p>
                <div className="flex justify-between text-xs">
                  <span className="text-green-400">
                    Accuracy: {models.find(m => m.id === selectedModel)?.accuracy}
                  </span>
                  <span className="text-blue-400">
                    Speed: {models.find(m => m.id === selectedModel)?.speed}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!prompt || isGenerating}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 rounded-lg font-semibold text-lg transition-colors"
            >
              {isGenerating ? '⏳ Generating Video...' : '🎬 Generate Video'}
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">🎭 Popular Styles</h3>
          <div className="grid grid-cols-4 gap-2">
            {popularStyles.map(style => (
              <button
                key={style.id}
                className="p-2 bg-gray-700 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 rounded-lg text-center transition-all group"
                onClick={() => setPrompt(prev => `${prev} in ${style.name.toLowerCase()} style`)}
              >
                <div className="text-lg mb-1 group-hover:scale-110 transition-transform">{style.emoji}</div>
                <div className="text-xs">{style.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold">🎬 AI Video Generation</h2>
            <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-sm font-medium">
              ♾️ Unlimited
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors">
              📁 My Videos
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg font-medium transition-colors">
              📥 Download All
            </button>
          </div>
        </div>

        <div className="flex-1 flex">
          <div className="flex-1 p-6 bg-gray-900">
            <div className="bg-gray-800 rounded-lg border border-gray-700 h-full">
              {!isGenerating && generatedVideos.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center">
                  <span className="text-8xl mb-6">🎬</span>
                  <h3 className="text-xl font-semibold mb-2">Your generated video will appear here</h3>
                  <p className="text-gray-400 text-center max-w-md">
                    Enter a prompt and click Generate to start creating your AI video
                  </p>
                  
                  {selectedModel && (
                    <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                      <h4 className="font-medium mb-2">Current Settings:</h4>
                      <div className="text-sm text-gray-300 space-y-1">
                        <div>Duration: {duration} seconds</div>
                        <div>Aspect Ratio: {aspectRatio}</div>
                        <div>Model: {models.find(m => m.id === selectedModel)?.name}</div>
                      </div>
                    </div>
                  )}
                </div>
              ) : isGenerating ? (
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="animate-spin text-6xl mb-4">⏳</div>
                  <h3 className="text-xl font-semibold mb-2">Generating your video...</h3>
                  <p className="text-gray-400 text-center max-w-md mb-4">
                    This may take a few minutes depending on the complexity
                  </p>
                  <div className="w-64 bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">📱 Generated Videos</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {generatedVideos.map(video => (
                      <div key={video.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="aspect-video bg-gray-600 rounded-lg mb-3 flex items-center justify-center">
                          <span className="text-4xl">▶️</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2 line-clamp-2">{video.prompt}</p>
                        <div className="flex justify-between text-xs text-gray-400 mb-3">
                          <span>{video.duration}s</span>
                          <span>{video.createdAt}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex-1 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded text-sm font-medium transition-colors">
                            ▶️ Preview
                          </button>
                          <button className="px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded text-sm transition-colors">
                            📥
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-80 bg-gray-800 border-l border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4">📊 Usage This Month</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>🎬 Videos Created</span>
                  <span className="text-orange-400 font-medium">12/25</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{width: '48%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>⏱️ Total Duration</span>
                  <span className="text-blue-400 font-medium">2m 15s</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>⚡ Avg. Generation</span>
                  <span className="text-green-400 font-medium">45s</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <h4 className="font-medium mb-3">🎯 Generation Queue</h4>
              {isGenerating ? (
                <div className="p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin text-lg">⏳</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Generating...</div>
                      <div className="text-xs text-gray-400">Estimated: 2-3 minutes</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-400 text-center py-4">
                  No pending generations
                </div>
              )}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-lg">
              <h4 className="font-medium mb-2 text-orange-400">💡 Pro Tip</h4>
              <p className="text-sm text-gray-300">
                Add camera movements like "drone shot", "close-up", or "pan left" for more dynamic videos!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
