'use client';

import { useState } from 'react';
// Using emojis instead of Lucide icons
const Icons = {
  Sparkles: '✨',
  Upload: '⬆️',
  Download: '⬇️',
  Settings: '⚙️',
  Zap: '⚡',
  Image: '🖼️',
  Palette: '🎨',
  Wand: '🪄',
  RefreshCw: '🔄'
};

export default function ImageGenerationInterface() {
  const [selectedModel, setSelectedModel] = useState('stable-diffusion');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!prompt) return;
    
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    // Add placeholder generated image
    setGeneratedImages(prev => [...prev, '/placeholder.png']);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                <span className="text-2xl">{Icons.Wand}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI Image Generation</h1>
                <p className="text-gray-400">Create stunning images with AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span className="text-lg">{Icons.Zap}</span>
                <span>Replicate Powered</span>
              </div>
            </div>
          </div>

          {/* Generation Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Generation Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Model</label>
                    <select 
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="stable-diffusion">Stable Diffusion</option>
                      <option value="dalle">DALL-E</option>
                      <option value="midjourney">Midjourney</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Prompt</label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe the image you want to generate..."
                      className="w-full h-32 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 resize-none"
                    />
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={!prompt || isGenerating}
                    className={`w-full p-3 rounded-lg font-medium transition-colors ${
                      !prompt || isGenerating
                        ? 'bg-gray-700 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                    }`}
                  >
                    {isGenerating ? (
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg inline-block animate-spin">{Icons.RefreshCw}</span>
                        <span>Generating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg">{Icons.Sparkles}</span>
                        <span>Generate Image</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Advanced Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Image Size</label>
                    <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500">
                      <option>512x512</option>
                      <option>768x768</option>
                      <option>1024x1024</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Number of Images</label>
                    <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500">
                      <option>1</option>
                      <option>2</option>
                      <option>4</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold">Generated Images</h3>
              </div>
              <div className="p-6">
                {generatedImages.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {generatedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Generated ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                          <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                            <span className="text-lg">{Icons.Download}</span>
                          </button>
                          <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                            <span className="text-lg">{Icons.Image}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <span className="text-4xl mb-4">{Icons.Image}</span>
                    <p>No images generated yet</p>
                    <p className="text-sm">Enter a prompt and click generate to start</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sidebar */}
      <div className="w-80 p-6 bg-gray-800 border-l border-gray-700">
        <div className="space-y-6">
          {/* Model Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Model Information</h3>
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Current Model</h4>
                  <span className="text-lg text-gray-400">{Icons.Settings}</span>
                </div>
                <p className="text-sm text-gray-400">{selectedModel}</p>
              </div>
            </div>
          </div>

          {/* Style Presets */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Style Presets</h3>
            <div className="grid grid-cols-2 gap-2">
              {['Realistic', 'Artistic', 'Anime', 'Digital Art', '3D Render', 'Photography'].map((style) => (
                <button
                  key={style}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full p-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg text-sm font-medium transition-colors">
                View Gallery
              </button>
              <button className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
                Export All
              </button>
              <button className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
                Clear History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
