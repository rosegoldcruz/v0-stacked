'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="w-full bg-black text-white overflow-x-hidden">
      {/* Animated Background Gradients - Fixed positioning for scroll effect */}
      <div className="fixed inset-0 z-0">
        {/* Primary gradient pulse */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Secondary ambient gradients */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-violet-600/10 rounded-full blur-3xl animate-pulse delay-4000"></div>

        {/* Additional gradients for longer scroll */}
        <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-5000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-6000"></div>
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Hero Text Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6 sm:mb-8">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              THE AEON
            </span>
          </h1>

          {/* Subheadline */}
          <h2 className="text-sm sm:text-base lg:text-lg xl:text-xl font-medium tracking-[0.3em] sm:tracking-[0.4em] lg:tracking-[0.5em] uppercase text-gray-300 mb-8 sm:mb-10 lg:mb-12">
            Advanced. Efficient. Optimized. Network.
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-400 max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto leading-relaxed sm:leading-relaxed lg:leading-relaxed font-light">
            Forged for creators and machines. A modular system for intelligent automation, autonomous video production, and networked media orchestration.
          </p>
        </div>

        {/* Video Placeholder Container */}
        <div className="w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
          <div className="relative aspect-video bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden">
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20"></div>

            {/* Placeholder content */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-500 text-lg sm:text-xl lg:text-2xl font-mono tracking-wide">
                  &gt; Future HUD video goes here.
                </div>
              </div>
            </div>

            {/* Subtle border glow effect */}
            <div className="absolute inset-0 rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-600/30"></div>
          </div>
        </div>
      </section>

      {/* AEON TOOLS SECTION */}
      <section className="relative z-10 py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                AEON Tools
              </span>
            </h2>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {[
              {
                icon: '🎥',
                title: 'Video Forge',
                description: 'Transform scripts into viral videos using GPT + T2V'
              },
              {
                icon: '🖼️',
                title: 'Visual Creator',
                description: 'Generate branded images & art using I2V + AI models'
              },
              {
                icon: '🧠',
                title: 'Human Studio',
                description: 'Create intelligent talking avatars and video hosts'
              },
              {
                icon: '🎵',
                title: 'Sound Lab',
                description: 'Synth audio, music, and effects with AI audio tools'
              },
              {
                icon: '📦',
                title: 'Mass Creator',
                description: 'Batch-generate 100s of content variations instantly'
              },
              {
                icon: '📈',
                title: 'Campaign Hub',
                description: 'Manage & deploy content across platforms automatically'
              }
            ].map((tool, index) => (
              <div
                key={index}
                className="group relative bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-gray-600/70 transition-all duration-300"
              >
                {/* Glass effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 rounded-xl sm:rounded-2xl"></div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">{tool.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{tool.title}</h3>
                  <p className="text-gray-400 text-base sm:text-lg leading-relaxed">{tool.description}</p>
                </div>

                {/* Subtle border glow effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-gray-600/30 group-hover:border-gray-500/50 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY STACK STRIP */}
      <section className="relative z-10 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm lg:text-base text-white/60 uppercase tracking-widest font-medium">
            Built on Vercel • Secured by Supabase • Powered by Replicate • Monetized via Stripe
          </p>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="relative z-10 py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            {/* Free Plan */}
            <div className="group relative bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl p-8 sm:p-10 lg:p-12 hover:border-gray-600/70 transition-all duration-300">
              {/* Glass effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 rounded-xl sm:rounded-2xl"></div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Free</h3>
                <div className="mb-8">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">$0</span>
                  <span className="text-gray-400 text-lg sm:text-xl">/mo</span>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start text-gray-300 text-base sm:text-lg">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    5 videos per month
                  </li>
                  <li className="flex items-start text-gray-300 text-base sm:text-lg">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    Basic AI models
                  </li>
                  <li className="flex items-start text-gray-300 text-base sm:text-lg">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    720p video quality
                  </li>
                  <li className="flex items-start text-gray-300 text-base sm:text-lg">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    Community support
                  </li>
                </ul>
              </div>

              {/* Subtle border glow effect */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-gray-600/30 group-hover:border-gray-500/50 transition-all duration-300"></div>
            </div>

            {/* Pro Plan */}
            <div className="group relative bg-gray-900/40 backdrop-blur-sm border border-blue-500/50 rounded-xl sm:rounded-2xl p-8 sm:p-10 lg:p-12 hover:border-blue-400/70 transition-all duration-300">
              {/* Glass effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-xl sm:rounded-2xl"></div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Pro</h3>
                <div className="mb-8">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">$15</span>
                  <span className="text-gray-400 text-lg sm:text-xl">/mo</span>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start text-gray-300 text-base sm:text-lg">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    Unlimited videos
                  </li>
                  <li className="flex items-start text-gray-300 text-base sm:text-lg">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    Premium AI models
                  </li>
                  <li className="flex items-start text-gray-300 text-base sm:text-lg">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    4K video quality
                  </li>
                  <li className="flex items-start text-gray-300 text-base sm:text-lg">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    Priority support
                  </li>
                </ul>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-4 px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 text-base sm:text-lg">
                  Upgrade to Pro
                </button>
              </div>

              {/* Subtle border glow effect */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-blue-500/50 group-hover:border-blue-400/70 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA STRIP */}
      <section className="relative z-10 py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6 sm:mb-8">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Ready to Launch?
            </span>
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 mb-10 sm:mb-12 lg:mb-16 max-w-2xl mx-auto leading-relaxed">
            Start rendering your first video today inside AEON Studio.
          </p>

          <Link
            href="/studio"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 sm:py-5 lg:py-6 px-8 sm:px-10 lg:px-12 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 text-lg sm:text-xl lg:text-2xl"
          >
            Launch AEON Studio
          </Link>
        </div>
      </section>

      {/* Subtle vignette effect */}
      <div className="fixed inset-0 bg-gradient-radial from-transparent via-transparent to-black/20 pointer-events-none z-5"></div>
    </div>
  );
}
