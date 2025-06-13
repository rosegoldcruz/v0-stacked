import React, { useState } from 'react';
import { Brain, Upload, Download, Settings, Zap, BarChart3, Clock, CheckCircle, AlertTriangle, Play, Pause, Trash2, Eye } from 'lucide-react';

type ModelStatus = 'Ready' | 'Completed' | 'Training' | 'Queued' | 'Failed';

interface BaseModel {
  id: string;
  name: string;
  type: string;
  status: ModelStatus;
  accuracy: string;
  speed: string;
  description: string;
}

interface AvailableModel extends BaseModel {
  provider: string;
}

interface CustomModel extends BaseModel {
  progress: number;
  trainingData: string;
  eta: string;
}

interface TrainingJob {
  id: string;
  modelName: string;
  status: ModelStatus;
  progress: number;
  timeElapsed: string;
  timeRemaining: string;
  datasetSize: string;
}

export default function ModelTrainingInterface() {
  const [activeTab, setActiveTab] = useState('available');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const availableModels: AvailableModel[] = [
    {
      id: 'sdxl-turbo',
      name: 'SDXL Turbo',
      type: 'Image Generation',
      status: 'Ready',
      accuracy: '94%',
      speed: 'Ultra Fast',
      description: 'High-speed image generation with excellent quality',
      provider: 'Replicate'
    },
    {
      id: 'minimax-video',
      name: 'MiniMax Video-01',
      type: 'Video Generation', 
      status: 'Ready',
      accuracy: '91%',
      speed: 'Fast',
      description: 'Professional video generation from text prompts',
      provider: 'Replicate'
    },
    {
      id: 'cogvideox-5b',
      name: 'CogVideoX-5B',
      type: 'Video Generation',
      status: 'Ready',
      accuracy: '89%',
      speed: 'Medium',
      description: 'High-quality video synthesis with temporal consistency',
      provider: 'Replicate'
    },
    {
      id: 'flux-schnell',
      name: 'FLUX.1-schnell',
      type: 'Image Generation',
      status: 'Ready',
      accuracy: '96%',
      speed: 'Fast',
      description: 'Ultra-high quality image generation',
      provider: 'Replicate'
    }
  ];

  const customModels: CustomModel[] = [
    {
      id: 'custom-brand-1',
      name: 'Brand Style Model',
      type: 'Custom Image',
      status: 'Training',
      progress: 65,
      accuracy: '87%',
      speed: 'Medium',
      description: 'Custom model trained on brand assets',
      trainingData: '2,500 images',
      eta: '2h 15m'
    },
    {
      id: 'custom-product-1',
      name: 'Product Photography',
      type: 'Custom Image',
      status: 'Completed',
      progress: 100,
      accuracy: '92%',
      speed: 'Fast',
      description: 'Specialized product photography model',
      trainingData: '5,000 images',
      eta: 'Complete'
    }
  ];

  const trainingJobs: TrainingJob[] = [
    {
      id: 'job-1',
      modelName: 'Brand Style Model',
      status: 'Training',
      progress: 65,
      timeElapsed: '4h 32m',
      timeRemaining: '2h 15m',
      datasetSize: '2,500 images'
    },
    {
      id: 'job-2',
      modelName: 'Logo Generator',
      status: 'Queued',
      progress: 0,
      timeElapsed: '0m',
      timeRemaining: '6h 30m',
      datasetSize: '3,200 images'
    }
  ];

const getStatusColor = (status: ModelStatus) => {
    switch (status) {
      case 'Ready': case 'Completed': return 'text-green-400';
      case 'Training': return 'text-blue-400';
      case 'Queued': return 'text-yellow-400';
      case 'Failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

const getStatusIcon = (status: ModelStatus) => {
    switch (status) {
      case 'Ready': case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'Training': return <Play className="w-4 h-4" />;
      case 'Queued': return <Clock className="w-4 h-4" />;
      case 'Failed': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
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
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Models & Training</h1>
                <p className="text-gray-400">Manage AI models and train custom solutions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Zap className="w-4 h-4" />
                <span>Replicate Powered</span>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg font-medium transition-colors">
                Train New Model
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
            {[
              { id: 'available', name: 'Available Models' },
              { id: 'custom', name: 'Custom Models' },
              { id: 'training', name: 'Training Jobs' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Available Models Tab */}
          {activeTab === 'available' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableModels.map(model => (
                  <div key={model.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{model.name}</h3>
                        <p className="text-sm text-gray-400">{model.type}</p>
                      </div>
                      <div className={`flex items-center space-x-1 ${getStatusColor(model.status)}`}>
                        {getStatusIcon(model.status)}
                        <span className="text-sm font-medium">{model.status}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-300 mb-4">{model.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-400">{model.accuracy}</div>
                        <div className="text-xs text-gray-400">Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-400">{model.speed}</div>
                        <div className="text-xs text-gray-400">Speed</div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg text-sm font-medium transition-colors">
                        Use Model
                      </button>
                      <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Models Tab */}
          {activeTab === 'custom' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customModels.map(model => (
                  <div key={model.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{model.name}</h3>
                        <p className="text-sm text-gray-400">{model.type}</p>
                      </div>
                      <div className={`flex items-center space-x-1 ${getStatusColor(model.status)}`}>
                        {getStatusIcon(model.status)}
                        <span className="text-sm font-medium">{model.status}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-300 mb-4">{model.description}</p>

                    {model.status === 'Training' && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Training Progress</span>
                          <span>{model.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-orange-600 h-2 rounded-full transition-all duration-300" 
                            style={{width: `${model.progress}%`}}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">ETA: {model.eta}</div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-400">{model.accuracy}</div>
                        <div className="text-xs text-gray-400">Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-400">{model.speed}</div>
                        <div className="text-xs text-gray-400">Speed</div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-400 mb-4">
                      Training Data: {model.trainingData}
                    </div>

                    <div className="flex space-x-2">
                      {model.status === 'Completed' ? (
                        <button className="flex-1 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg text-sm font-medium transition-colors">
                          Use Model
                        </button>
                      ) : (
                        <button className="flex-1 py-2 bg-gray-600 cursor-not-allowed rounded-lg text-sm font-medium">
                          Training...
                        </button>
                      )}
                      <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                        <Settings className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Training Jobs Tab */}
          {activeTab === 'training' && (
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="text-lg font-semibold">Active Training Jobs</h3>
                </div>
                <div className="divide-y divide-gray-700">
                  {trainingJobs.map(job => (
                    <div key={job.id} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{job.modelName}</h4>
                          <p className="text-sm text-gray-400">Dataset: {job.datasetSize}</p>
                        </div>
                        <div className={`flex items-center space-x-1 ${getStatusColor(job.status)}`}>
                          {getStatusIcon(job.status)}
                          <span className="text-sm font-medium">{job.status}</span>
                        </div>
                      </div>

                      {job.status === 'Training' && (
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{job.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-orange-600 h-2 rounded-full transition-all duration-300" 
                              style={{width: `${job.progress}%`}}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Elapsed:</span>
                          <div className="font-medium">{job.timeElapsed}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Remaining:</span>
                          <div className="font-medium">{job.timeRemaining}</div>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        {job.status === 'Training' ? (
                          <button className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded text-sm font-medium transition-colors">
                            <Pause className="w-3 h-3 inline mr-1" />
                            Pause
                          </button>
                        ) : (
                          <button className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded text-sm font-medium transition-colors">
                            <Play className="w-3 h-3 inline mr-1" />
                            Start
                          </button>
                        )}
                        <button className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm font-medium transition-colors">
                          View Logs
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Sidebar */}
      <div className="w-80 p-6 bg-gray-800 border-l border-gray-700">
        <div className="space-y-6">
          {/* Training Stats */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Training Overview</h3>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Models Trained</span>
                  <BarChart3 className="w-4 h-4 text-orange-400" />
                </div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-xs text-green-400">+2 this month</div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Active Jobs</span>
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-bold">2</div>
                <div className="text-xs text-blue-400">6h 45m remaining</div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Training Time</span>
                  <Zap className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold">6h 45m</div>
                <div className="text-xs text-gray-400">This month</div>
              </div>
            </div>
          </div>

          {/* Model Performance */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Top Performing Models</h3>
            <div className="space-y-3">
              {availableModels.slice(0, 3).map(model => (
                <div key={model.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{model.name}</div>
                    <div className="text-xs text-gray-400">{model.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-400">{model.accuracy}</div>
                    <div className="text-xs text-gray-400">{model.speed}</div>
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
                Start New Training
              </button>
              <button className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
                Upload Dataset
              </button>
              <button className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
                View All Models
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
