'use client'

import ModelBrowser from '@/components/search/ModelBrowser'

export default function ModelsPage() {
  const handleModelSelect = (model: any) => {
    console.log('Selected model:', model)
    // Handle model selection logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">AI Models Explorer</h1>
              <p className="text-gray-400">Discover and compare hundreds of AI models for your creative projects</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden lg:block">
                <div className="text-sm font-medium">Pro Plan</div>
                <div className="text-xs text-gray-400">Access to all models</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <ModelBrowser
          onModelSelect={handleModelSelect}
          showComparison={true}
        />
      </div>
    </div>
  )
}
