'use client'

import Link from 'next/link'

export default function HomePage() {

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back! 👋</h2>
            <p className="text-gray-400">Ready to create something viral? Pick your weapon below.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: '🎬 AEON Video',
            subtitle: '1-Minute AI Videos',
            description: 'Generate viral TikTok videos in seconds',
            href: '/video-gen',
            gradient: 'from-orange-500 to-red-600',
            tag: '🔥 HOT'
          },
          {
            title: '🎨 AI Image Studio',
            subtitle: 'Create & Edit Images',
            description: 'Generate, edit, and enhance images with AI',
            href: '/image-gen',
            gradient: 'from-purple-500 to-indigo-600',
            tag: '♾️ UNLIMITED'
          },
          {
            title: '🤖 Video Models Hub',
            subtitle: 'All AI Models',
            description: 'Access 60+ video generation models',
            href: '/models',
            gradient: 'from-blue-500 to-cyan-600',
            tag: '⚡ POWER'
          },
          {
            title: '🔗 API Access',
            subtitle: 'Developer Tools',
            description: 'Integrate AEON with your applications',
            href: '/api',
            gradient: 'from-green-500 to-teal-600',
            tag: '🚀 DEV'
          },
          {
            title: '📚 Library',
            subtitle: 'Your Creations',
            description: 'Access all your generated content',
            href: '/library',
            gradient: 'from-pink-500 to-rose-600',
            tag: '📁 STORAGE'
          },
          {
            title: '⚙️ Settings',
            subtitle: 'Account Settings',
            description: 'Manage your account and preferences',
            href: '/settings',
            gradient: 'from-yellow-500 to-orange-600',
            tag: '🛠️ CONFIG'
          }
        ].map((feature, index) => (
          <Link
            key={index}
            href={feature.href}
            className={`relative p-6 bg-gradient-to-br ${feature.gradient} rounded-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 group overflow-hidden`}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            </div>

            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 bg-black/30 backdrop-blur-sm rounded-full text-xs font-bold">
                {feature.tag}
              </span>
            </div>

            <div className="relative z-10">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-1">{feature.title}</h3>
                <p className="text-sm opacity-90 font-medium">{feature.subtitle}</p>
              </div>

              <p className="text-sm opacity-80 mb-4 leading-relaxed">
                {feature.description}
              </p>

              <div className="absolute bottom-4 right-4 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                <span className="text-xl">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

