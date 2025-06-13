'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, Zap, ArrowUp, Image, RefreshCw, Maximize, Eye, Trash2, Settings, BarChart3, Shield } from 'lucide-react';

interface UpscaleStats {
  totalImages: number;
  successRate: string;
  avgProcessingTime: string;
}

interface RecentUpscale {
  id: number;
  name: string;
  size: string;
  status: 'completed' | 'processing' | 'failed';
  timestamp: string;
}

export default function UniversalUpscalerInterface() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [upscaleFactor, setUpscaleFactor] = useState(2);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const stats: UpscaleStats = {
    totalImages: 1247,
    successRate: "99.8%",
    avgProcessingTime: "1.2s"
  };

  const recentUpscales: RecentUpscale[] = [
    { id: 1, name: "landscape.jpg", size: "2048x1536", status: "completed", timestamp: "2m ago" },
    { id: 2, name: "portrait.png", size: "1024x1536", status: "processing", timestamp: "5m ago" },
    { id: 3, name: "artwork.jpg", size: "1920x1080", status: "completed", timestamp: "10m ago" }
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add('border-orange-500');
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('border-orange-500');
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('border-orange-500');
    }
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpscale = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    
    // Simulate API call to Replicate
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Here you would normally:
      // 1. Upload the image to your server
      // 2. Call Replicate's API
      // 3. Get the result URL
      // 4. Update the preview
      setIsProcessing(false);
    } catch (error) {
      console.error('Error upscaling image:', error);
      setIsProcessing(false);
    }
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
                <ArrowUp className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Universal Upscaler</h1>
                <p className="text-gray-400">Enhance your images with AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Zap className="w-4 h-4" />
                <span>Replicate Powered</span>
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg font-medium transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Upscaler Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Drop Zone */}
            <div
              ref={dropZoneRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className="aspect-square bg-gray-800 rounded-lg border-2 border-dashed border-gray-700 hover:border-orange-500 transition-colors"
            >
              {previewUrl ? (
                <div className="relative w-full h-full">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                      }}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <Upload className="w-12 h-12 mb-4" />
                  <p className="text-lg font-medium">Drag and drop your image here</p>
                  <p className="text-sm">or click the upload button above</p>
                </div>
              )}
            </div>

            {/* Settings & Preview */}
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Upscale Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Upscale Factor</label>
                    <div className="flex items-center space-x-4">
                      {[2, 4, 8].map(factor => (
                        <button
                          key={factor}
                          onClick={() => setUpscaleFactor(factor)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            upscaleFactor === factor
                              ? 'bg-gradient-to-r from-orange-500 to-orange-600'
                              : 'bg-gray-700 hover:bg-gray-600'
                          }`}
                        >
                          {factor}x
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleUpscale}
                    disabled={!selectedFile || isProcessing}
                    className={`w-full p-3 rounded-lg font-medium transition-colors ${
                      !selectedFile || isProcessing
                        ? 'bg-gray-700 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Zap className="w-4 h-4" />
                        <span>Upscale Image</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {selectedFile && (
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Image Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">File Name</span>
                      <span>{selectedFile.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">File Size</span>
                      <span>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Output Size</span>
                      <span>Up to {upscaleFactor}x larger</span>
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
          {/* Stats */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Total Images</h3>
                <BarChart3 className="w-5 h-5 text-orange-400" />
              </div>
              <div className="text-2xl font-bold">{stats.totalImages}</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Success Rate</h3>
                <Shield className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-2xl font-bold">{stats.successRate}</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Avg Processing</h3>
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-2xl font-bold">{stats.avgProcessingTime}</div>
            </div>
          </div>

          {/* Recent Upscales */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Upscales</h3>
            <div className="space-y-3">
              {recentUpscales.map(upscale => (
                <div key={upscale.id} className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium">{upscale.name}</div>
                      <div className="text-sm text-gray-400">{upscale.size}</div>
                      <div className="text-xs text-gray-500">{upscale.timestamp}</div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      upscale.status === 'completed'
                        ? 'bg-green-600/20 text-green-400'
                        : upscale.status === 'processing'
                        ? 'bg-blue-600/20 text-blue-400'
                        : 'bg-red-600/20 text-red-400'
                    }`}>
                      {upscale.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full p-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg text-sm font-medium transition-colors">
                View All Upscales
              </button>
              <button className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
                Download Report
              </button>
              <button className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
