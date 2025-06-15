'use client'

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden relative">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0">
        {/* Primary gradient pulse */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Secondary ambient gradients */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-violet-600/10 rounded-full blur-3xl animate-pulse delay-4000"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
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
      </div>

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20 pointer-events-none"></div>
    </div>
  );
}

