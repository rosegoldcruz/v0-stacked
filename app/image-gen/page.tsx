'use client';

import React, { useState, useRef } from 'react';

interface GeneratedImage {
  id: number;
  url: string;
}

interface Layer {
  id: number;
  name: string;
  visible: boolean;
  locked: boolean;
}

interface UpscaleModel {
  id: string;
  name: string;
  multiplier: string;
  emoji: string;
}

export default function ImageGenerationInterface() {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('stable-diffusion');
  const [imageSize, setImageSize] = useState('512x512');
  const [numImages, setNumImages] = useState(1);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState('brush');
  const [brushSize, setBrushSize] = useState(10);
  const [selectedColor, setSelectedColor] = useState('#FF6B35');
  const [layers, setLayers] = useState<Layer[]>([
    { id: 1, name: 'Background', visible: true, locked: false },
    { id: 2, name: 'Layer 1', visible: true, locked: false }
  ]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const models = [
    { id: 'stable-diffusion', name: '🎨 Stable Diffusion', desc: 'High-quality image generation' },
    { id: 'dall-e-3', name: '🤖 DALL-E 3', desc: 'Creative and precise imagery' },
    { id: 'midjourney', name: '🎭 Midjourney Style', desc: 'Artistic and stylized results' },
    { id: 'flux', name: '⚡ FLUX.1', desc: 'Ultra-high quality generation' }
  ];

  const stylePresets = [
    { id: 'realistic', name: 'Realistic', emoji: '📸' },
    { id: 'artistic', name: 'Artistic', emoji: '🎨' },
    { id: 'anime', name: 'Anime', emoji: '🌸' },
    { id: 'digital-art', name: 'Digital Art', emoji: '💻' },
    { id: '3d-render', name: '3D Render', emoji: '🎮' },
    { id: 'photography', name: 'Photography', emoji: '📷' }
  ];

  const tools = [
    { id: 'brush', name: 'Brush', emoji: '🖌️' },
    { id: 'eraser', name: 'Eraser', emoji: '🧽' },
    { id: 'text', name: 'Text', emoji: '📝' },
    { id: 'rectangle', name: 'Rectangle', emoji: '⬜' },
    { id: 'circle', name: 'Circle', emoji: '⭕' },
    { id: 'line', name: 'Line', emoji: '📏' },
    { id: 'move', name: 'Move', emoji: '👆' },
    { id: 'select', name: 'Select', emoji: '🎯' }
  ];

  const upscaleModels = [
    { id: 'esrgan', name: 'ESRGAN', multiplier: '4x', emoji: '⚡' },
    { id: 'real-esrgan', name: 'Real-ESRGAN', multiplier: '4x', emoji: '🔥' },
    { id: 'waifu2x', name: 'Waifu2x', multiplier: '2x', emoji: '🌸' },
    { id: 'swinir', name: 'SwinIR', multiplier: '4x', emoji: '💎' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedImages([
        { id: 1, url: 'https://via.placeholder.com/512x512/FF6B35/FFFFFF?text=Generated+1' },
        { id: 2, url: 'https://via.placeholder.com/512x512/FF8F65/FFFFFF?text=Generated+2' }
      ]);
      setIsGenerating(false);
    }, 3000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          setUploadedImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpscale = async (model: UpscaleModel) => {
    console.log(`Upscaling with ${model.name}`);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
              <span className="text-2xl">🎨</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">AI Image Studio</h1>
              <p className="text-sm text-gray-400">Create & Edit Images</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">🤖 Model</label>
              <select 
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                {models.map(model => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-1">
                {models.find(m => m.id === selectedModel)?.desc}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">📝 Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate..."
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 resize-none h-24"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">📐 Size</label>
                <select 
                  value={imageSize}
                  onChange={(e) => setImageSize(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="512x512">512×512</option>
                  <option value="768x768">768×768</option>
                  <option value="1024x1024">1024×1024</option>
                  <option value="1024x768">1024×768</option>
                  <option value="768x1024">768×1024</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">🔢 Count</label>
                <select 
                  value={numImages}
                  onChange={(e) => setNumImages(parseInt(e.target.value))}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value={1}>1 Image</option>
                  <option value={2}>2 Images</option>
                  <option value={4}>4 Images</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!prompt || isGenerating}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 rounded-lg font-medium transition-colors"
            >
              {isGenerating ? '⏳ Generating...' : '🚀 Generate Images'}
            </button>
          </div>
        </div>

        <div className="p-4 border-b border-gray-700">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">🛠️ TOOLS</h3>
          <div className="grid grid-cols-4 gap-2">
            {tools.map(tool => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`p-2 rounded-lg text-center transition-colors ${
                  selectedTool === tool.id
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                title={tool.name}
              >
                <div className="text-lg mb-1">{tool.emoji}</div>
                <div className="text-xs">{tool.name}</div>
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm">🖌️ Size:</span>
              <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm w-8">{brushSize}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">🎨 Color:</span>
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-8 h-8 rounded border-0"
              />
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">🎭 STYLE PRESETS</h3>
          <div className="grid grid-cols-3 gap-2">
            {stylePresets.map(preset => (
              <button
                key={preset.id}
                className="p-2 bg-gray-700 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 rounded-lg text-center transition-all group"
              >
                <div className="text-lg mb-1 group-hover:scale-110 transition-transform">{preset.emoji}</div>
                <div className="text-xs">{preset.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold">🎨 AI Image Studio</h2>
            <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-sm font-medium">
              ♾️ Unlimited
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors">
              📁 Gallery
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg font-medium transition-colors">
              💾 Save Project
            </button>
          </div>
        </div>

        <div className="flex-1 flex">
          <div className="flex-1 p-6 bg-gray-900">
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg border border-gray-700 h-96 relative">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full rounded-lg cursor-crosshair"
                  width={800}
                  height={600}
                />
                {!uploadedImage && (
                  <div 
                    className="absolute inset-0 flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-orange-500 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span className="text-6xl mb-4">📤</span>
                    <p className="text-gray-400 text-lg mb-2">Drop image or click to upload</p>
                    <p className="text-gray-500 text-sm">Supports JPG, PNG, WebP up to 10MB</p>
                  </div>
                )}
              </div>

              {generatedImages.length > 0 && (
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">🖼️ Generated Images</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {generatedImages.map(image => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url}
                          alt="Generated"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                          <button className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg hover:bg-opacity-30 transition-colors">
                            <span className="text-lg">📥</span>
                          </button>
                          <button className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg hover:bg-opacity-30 transition-colors">
                            <span className="text-lg">✏️</span>
                          </button>
                          <button className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg hover:bg-opacity-30 transition-colors">
                            <span className="text-lg">🗑️</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold mb-4">⚡ AI Upscaler</h3>
                <div className="grid grid-cols-2 gap-4">
                  {upscaleModels.map(model => (
                    <button
                      key={model.id}
                      onClick={() => handleUpscale(model)}
                      className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{model.emoji} {model.name}</span>
                        <span className="text-orange-400 font-bold">{model.multiplier}</span>
                      </div>
                      <p className="text-sm text-gray-400">Enhance image quality</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-80 bg-gray-800 border-l border-gray-700 p-4">
            <h3 className="text-lg font-semibold mb-4">📚 Layers</h3>
            <div className="space-y-2">
              {layers.map(layer => (
                <div key={layer.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <button className="text-gray-400 hover:text-white">
                    {layer.visible ? <span>👁️</span> : <span>🙈</span>}
                  </button>
                  <span className="flex-1 text-sm">{layer.name}</span>
                  <button className="text-gray-400 hover:text-red-400">
                    <span>🗑️</span>
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg text-sm font-medium transition-colors">
              ➕ Add Layer
            </button>
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
