'use client';

import { useState, useRef, useEffect } from 'react';
import { Palette, Upload, Download, Undo, Redo, Type, Square, Circle, Minus, Brush, Eraser, Layers, Move, RotateCw, Zap, Eye, Save } from 'lucide-react';

export default function CanvasInterface() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState('brush');
  const [brushSize, setBrushSize] = useState(5);
  const [selectedColor, setSelectedColor] = useState('#FF6B35');
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasHistory, setCanvasHistory] = useState<string[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  // Rest of the component implementation remains exactly the same...
  const tools = [
    { id: 'move', name: 'Move', icon: Move },
    { id: 'brush', name: 'Brush', icon: Brush },
    { id: 'eraser', name: 'Eraser', icon: Eraser },
    { id: 'line', name: 'Line', icon: Minus },
    { id: 'rectangle', name: 'Rectangle', icon: Square },
    { id: 'circle', name: 'Circle', icon: Circle },
    { id: 'text', name: 'Text', icon: Type }
  ];

  const colors = [
    '#FF6B35', '#F7931E', '#FFD23F', '#06FFA5', '#118AB2', '#073B4C',
    '#FFFFFF', '#E5E5E5', '#999999', '#666666', '#333333', '#000000',
    '#FF006E', '#8338EC', '#3A86FF', '#4CAF50', '#FFBE0B', '#FB8500'
  ];

  const layers = [
    { id: 1, name: 'Background', visible: true, locked: false },
    { id: 2, name: 'Main Content', visible: true, locked: false },
    { id: 3, name: 'Overlay', visible: true, locked: true }
  ];

  const recentProjects = [
    { id: 1, name: 'Logo Design', size: '1920x1080', modified: '2 hours ago' },
    { id: 2, name: 'Social Media Banner', size: '1200x630', modified: '1 day ago' },
    { id: 3, name: 'Product Mockup', size: '2000x2000', modified: '3 days ago' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Initialize canvas
    canvas.width = 800;
    canvas.height = 600;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Save initial state
    saveCanvasState();
  }, []);

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const newHistory = canvasHistory.slice(0, currentHistoryIndex + 1);
    newHistory.push(canvas.toDataURL());
    setCanvasHistory(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (currentHistoryIndex > 0) {
      const newIndex = currentHistoryIndex - 1;
      restoreCanvasState(newIndex);
      setCurrentHistoryIndex(newIndex);
    }
  };

  const redo = () => {
    if (currentHistoryIndex < canvasHistory.length - 1) {
      const newIndex = currentHistoryIndex + 1;
      restoreCanvasState(newIndex);
      setCurrentHistoryIndex(newIndex);
    }
  };

  const restoreCanvasState = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = canvasHistory[index];
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedTool === 'brush' || selectedTool === 'eraser') {
      setIsDrawing(true);
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || (selectedTool !== 'brush' && selectedTool !== 'eraser')) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    
    if (selectedTool === 'brush') {
      ctx.strokeStyle = selectedColor;
      ctx.globalCompositeOperation = 'source-over';
    } else if (selectedTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveCanvasState();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveCanvasState();
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'canvas-design.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Tools Sidebar */}
      <div className="w-16 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 space-y-2">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              selectedTool === tool.id 
                ? 'bg-gradient-to-r from-orange-500 to-orange-600' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            title={tool.name}
          >
            <tool.icon className="w-5 h-5" />
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Canvas</h1>
              <p className="text-sm text-gray-400">Browser image/video editing</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Brush Size:</span>
              <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-20"
              />
              <span className="text-sm font-medium">{brushSize}px</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={undo}
                disabled={currentHistoryIndex <= 0}
                className="p-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <Undo className="w-4 h-4" />
              </button>
              <button
                onClick={redo}
                disabled={currentHistoryIndex >= canvasHistory.length - 1}
                className="p-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <Redo className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={downloadCanvas}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg font-medium transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex">
          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center p-6 bg-gray-850">
            <div className="relative">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="border border-gray-600 rounded-lg shadow-lg cursor-crosshair bg-white"
                style={{ cursor: selectedTool === 'move' ? 'move' : 'crosshair' }}
              />
              
              {/* Canvas Overlay Info */}
              <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                800 × 600px
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <div className="w-16 bg-gray-800 border-l border-gray-700 flex flex-col items-center py-4">
            <div className="mb-4">
              <div 
                className="w-10 h-10 rounded-lg border-2 border-gray-600 shadow-lg"
                style={{ backgroundColor: selectedColor }}
              ></div>
            </div>
            
            <div className="grid grid-cols-1 gap-1">
              {colors.map((color, index) => (
                <button
                  key={`${color}-${index}`}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded border-2 transition-all ${
                    selectedColor === color 
                      ? 'border-orange-500 scale-110' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Properties Sidebar */}
      <div className="w-80 p-6 bg-gray-800 border-l border-gray-700">
        <div className="space-y-6">
          {/* Layers Panel */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Layers className="w-5 h-5 mr-2" />
              Layers
            </h3>
            <div className="space-y-2">
              {layers.map(layer => (
                <div key={layer.id} className="flex items-center justify-between p-2 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <button className="p-1">
                      <Eye className={`w-4 h-4 ${layer.visible ? 'text-white' : 'text-gray-500'}`} />
                    </button>
                    <span className="text-sm">{layer.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {layer.locked && (
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tool Properties */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tool Properties</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Opacity</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="100"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-300 mb-2">Blend Mode</label>
                <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500">
                  <option>Normal</option>
                  <option>Multiply</option>
                  <option>Screen</option>
                  <option>Overlay</option>
                  <option>Soft Light</option>
                </select>
              </div>
            </div>
          </div>

          {/* Recent Projects */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
            <div className="space-y-2">
              {recentProjects.map(project => (
                <div key={project.id} className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer transition-colors">
                  <div className="font-medium text-sm">{project.name}</div>
                  <div className="text-xs text-gray-400">{project.size}</div>
                  <div className="text-xs text-gray-500">{project.modified}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Actions</h3>
            <div className="space-y-2">
              <button className="w-full p-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg text-sm font-medium transition-colors">
                Save Project
              </button>
              <button className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
                New Canvas
              </button>
              <button 
                onClick={clearCanvas}
                className="w-full p-3 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
              >
                Clear Canvas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
