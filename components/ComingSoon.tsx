'use client'

import { Clock, Sparkles, Bell, ArrowRight } from 'lucide-react'

interface ComingSoonProps {
  title?: string
  description?: string
  feature?: string
  estimatedDate?: string
  showNotifyButton?: boolean
  className?: string
}

export default function ComingSoon({
  title = "Coming Soon",
  description = "This feature is currently in development and will be available soon.",
  feature = "Exciting New Feature",
  estimatedDate,
  showNotifyButton = true,
  className = ""
}: ComingSoonProps) {
  const handleNotifyMe = () => {
    // Handle notification signup
    console.log('User wants to be notified about:', feature)
    // You could integrate with email service here
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center p-6 ${className}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative text-center max-w-2xl mx-auto">
        {/* Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-6">
            <Clock className="w-12 h-12 animate-pulse" />
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <Sparkles className="w-8 h-8 mr-3 text-orange-400" />
            {title}
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            {description}
          </p>
          {estimatedDate && (
            <p className="text-gray-400">
              Expected launch: <span className="text-orange-400 font-semibold">{estimatedDate}</span>
            </p>
          )}
        </div>

        {/* Features Preview */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">What's Coming</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold mb-1">Enhanced Performance</h3>
                <p className="text-gray-400 text-sm">Faster processing and improved quality</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold mb-1">New AI Models</h3>
                <p className="text-gray-400 text-sm">Access to cutting-edge AI technology</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold mb-1">Advanced Features</h3>
                <p className="text-gray-400 text-sm">More customization and control options</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold mb-1">Better Integration</h3>
                <p className="text-gray-400 text-sm">Seamless workflow improvements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notify Button */}
        {showNotifyButton && (
          <div className="mb-8">
            <button
              onClick={handleNotifyMe}
              className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center mx-auto"
            >
              <Bell className="w-5 h-5 mr-2" />
              Notify Me When Ready
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <p className="text-gray-400 text-sm mt-3">
              Be the first to know when this feature launches
            </p>
          </div>
        )}

        {/* Alternative Actions */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-400">In the Meantime</h3>
          <p className="text-gray-300 mb-4">
            Explore our other amazing AI tools while you wait
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/studio"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Visit AEON Studio
            </a>
            <span className="hidden sm:inline text-gray-500">•</span>
            <a
              href="/video-forge"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Try Video Forge
            </a>
            <span className="hidden sm:inline text-gray-500">•</span>
            <a
              href="/library"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Browse Library
            </a>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8">
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          </div>
          <p className="text-gray-400 text-xs mt-2">Development Progress: 60%</p>
        </div>
      </div>
    </div>
  )
}

// Specific variants for different features
export function VideoFeatureComingSoon() {
  return (
    <ComingSoon
      title="Advanced Video Features"
      description="We're working on revolutionary video generation capabilities that will transform how you create content."
      feature="Advanced Video Generation"
      estimatedDate="Q2 2024"
    />
  )
}

export function APIFeatureComingSoon() {
  return (
    <ComingSoon
      title="Enhanced API Features"
      description="More powerful API endpoints and developer tools are coming to supercharge your integrations."
      feature="Enhanced API"
      estimatedDate="March 2024"
    />
  )
}

export function PremiumFeatureComingSoon() {
  return (
    <ComingSoon
      title="Premium Feature"
      description="This premium feature is currently being developed and will be available to Pro and Enterprise users."
      feature="Premium Feature"
      estimatedDate="Coming Soon"
    />
  )
}
