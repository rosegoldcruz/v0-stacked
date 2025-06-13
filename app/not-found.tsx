import Link from 'next/link'
import { Home, ArrowLeft, Search, Sparkles } from 'lucide-react'

export default function NotFound() {
  const popularPages = [
    { name: 'AEON Studio', href: '/studio', icon: '🎨' },
    { name: 'Video Forge', href: '/video-forge', icon: '🎬' },
    { name: 'Image Generator', href: '/image-gen', icon: '🖼️' },
    { name: 'Sound Lab', href: '/sound-lab', icon: '🎵' },
    { name: 'Library', href: '/library', icon: '📚' },
    { name: 'API Access', href: '/api-access', icon: '🔗' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative text-center max-w-2xl mx-auto">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-6 animate-pulse">
            <Sparkles className="w-12 h-12" />
          </div>
          <div className="text-8xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent mb-4">
            404
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-300 mb-6">
            Oops! The page you're looking for seems to have vanished into the digital void.
          </p>
          <p className="text-gray-400">
            Don't worry though - our AI is still working perfectly, and there's plenty of amazing content to create!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="border border-gray-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Popular Pages */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center justify-center">
            <Search className="w-6 h-6 mr-2 text-orange-400" />
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="flex items-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all group"
              >
                <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">
                  {page.icon}
                </span>
                <span className="font-medium group-hover:text-orange-400 transition-colors">
                  {page.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-blue-400">Need Help?</h3>
          <p className="text-gray-300 mb-4">
            If you think this page should exist, or if you're experiencing technical issues, 
            our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/support"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Contact Support
            </Link>
            <span className="hidden sm:inline text-gray-500">•</span>
            <Link
              href="/docs"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              View Documentation
            </Link>
            <span className="hidden sm:inline text-gray-500">•</span>
            <Link
              href="/status"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              System Status
            </Link>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm mb-2">Fun fact while you're here:</p>
          <p className="text-gray-300">
            Our AI has generated over 2.3 million videos and counting! 🚀
          </p>
        </div>
      </div>
    </div>
  )
}
