// @ts-nocheck
'use client'

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Image, 
  Video, 
  Music, 
  Users, 
  Zap, 
  Star, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Camera, 
  Mic, 
  Palette, 
  Brain, 
  Target, 
  TrendingUp,
  ChevronRight,
  Globe,
  Shield,
  Clock,
  Award
} from 'lucide-react';

const AeonHomepage = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Image className="w-8 h-8" />,
      title: "AI Image Generation",
      description: "Create stunning visuals with advanced AI models",
      gradient: "from-purple-500 to-pink-500",
      preview: "Generate photorealistic images, artwork, and designs"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Video Creation",
      description: "Professional videos from text prompts",
      gradient: "from-blue-500 to-cyan-500",
      preview: "Text-to-video, scene control, and editing tools"
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "Audio & Sound",
      description: "Generate music, voiceovers, and sound effects",
      gradient: "from-green-500 to-emerald-500",
      preview: "AI music composition and voice synthesis"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "AI Avatars",
      description: "Lifelike digital humans for your content",
      gradient: "from-orange-500 to-red-500",
      preview: "Custom avatars with natural movements and speech"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Marketing Tools",
      description: "AI-powered marketing and advertising",
      gradient: "from-indigo-500 to-purple-500",
      preview: "Automated campaigns and content optimization"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Assistant",
      description: "Intelligent creative companion",
      gradient: "from-teal-500 to-cyan-500",
      preview: "Creative guidance and project management"
    }
  ];

  const useCases = [
    {
      title: "Content Creators",
      description: "YouTube videos, social media content, and digital art",
      icon: <Camera className="w-6 h-6" />,
      tools: ["Video Templates", "Thumbnail Generation", "Audio Mixing"]
    },
    {
      title: "Businesses",
      description: "Marketing materials, product demos, and brand content",
      icon: <TrendingUp className="w-6 h-6" />,
      tools: ["Ad Creation", "Product Videos", "Brand Assets"]
    },
    {
      title: "Educators",
      description: "Educational content, presentations, and training materials",
      icon: <Award className="w-6 h-6" />,
      tools: ["Lesson Videos", "Interactive Content", "Avatars"]
    },
    {
      title: "Artists",
      description: "Digital art, music composition, and creative projects",
      icon: <Palette className="w-6 h-6" />,
      tools: ["Art Generation", "Music Creation", "Style Transfer"]
    }
  ];

  const stats = [
    { number: "1M+", label: "Creations Generated" },
    { number: "50K+", label: "Active Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "4.9/5", label: "User Rating" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                AEON
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                Sign In
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-lg font-semibold transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium">
              🚀 The Future of AI Creation is Here
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            Create Anything with
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              AI-Powered Magic
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            The all-in-one AI platform that combines image generation, video creation, audio synthesis, 
            avatars, and marketing tools. Everything you need to bring your creative vision to life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 flex items-center">
              <Play className="w-5 h-5 mr-2" />
              Start Creating Free
            </button>
            <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-lg transition-colors flex items-center">
              <Video className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section id="features" className="py-20 px-6" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need in
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                One Powerful Platform
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              No more switching between different tools. AEON combines the best AI technologies 
              into a seamless creative experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? 'bg-gray-800 border-cyan-500'
                      : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${features[activeFeature].gradient} flex items-center justify-center mx-auto mb-6`}>
                  {features[activeFeature].icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{features[activeFeature].title}</h3>
                <p className="text-gray-400 text-lg">{features[activeFeature].preview}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-gray-800/30" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built for Every
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Creative Professional
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                <p className="text-gray-400 mb-4">{useCase.description}</p>
                <div className="space-y-2">
                  {useCase.tools.map((tool, toolIndex) => (
                    <div key={toolIndex} className="flex items-center text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-400 mr-2" />
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="py-20 px-6" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-bold mb-6">
                Why Choose
                <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  AEON?
                </span>
              </h2>
              <p className="text-gray-400 text-lg">
                We've built the most comprehensive AI creative platform to streamline your workflow 
                and unlock unlimited creative potential.
              </p>
            </div>

            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Lightning Fast",
                  description: "Generate content in seconds, not hours"
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "Enterprise Security",
                  description: "Your data is protected with bank-level encryption"
                },
                {
                  icon: <Globe className="w-6 h-6" />,
                  title: "Global Access",
                  description: "Available worldwide with 99.9% uptime"
                },
                {
                  icon: <Clock className="w-6 h-6" />,
                  title: "24/7 Support",
                  description: "Get help whenever you need it"
                }
              ].map((benefit, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-gray-800/30" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent
              <span className="block bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-400">Choose the plan that fits your creative needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                name: "Free",
                price: "Free",
                description: "Get started with AEON",
                features: ["5 videos/month", "1 minute max", "Basic templates", "720p resolution", "Watermarked", "Community support"],
                cta: "Get Started",
                popular: false,
                highlight: false
              },
              {
                name: "Creator",
                price: "$25",
                description: "For growing creators",
                features: ["15 videos/month", "1 minute each", "All templates", "1080p resolution", "No watermark", "Basic avatars", "Commercial license"],
                cta: "Start Free Trial",
                popular: false,
                highlight: false
              },
              {
                name: "Pro",
                price: "$50",
                description: "For serious content creators",
                features: ["25 videos/month", "1 minute each", "Premium templates", "1080p + effects", "Custom avatars", "Priority processing", "Advanced editing"],
                cta: "Start Pro Trial",
                popular: true,
                highlight: true
              },
              {
                name: "Ultimate",
                price: "$100",
                description: "Access to EVERYTHING",
                features: ["50 videos/month", "1 minute each", "🔥 ALL FEATURES", "🎨 Image generation", "🎵 Audio & music", "👤 Unlimited avatars", "🚀 Marketing tools", "⚡ Priority support", "📊 Analytics dashboard"],
                cta: "Get Ultimate Access",
                popular: false,
                highlight: false,
                ultimate: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large organizations",
                features: ["Custom video limits", "White label options", "API integration", "Custom models", "Dedicated support", "SLA guarantee", "On-premise deployment"],
                cta: "Contact Sales",
                popular: false,
                highlight: false
              }
            ].map((plan, index) => (
              <div key={index} className={`bg-gray-800 rounded-xl p-6 relative ${
                plan.highlight ? 'border-2 border-cyan-500 transform scale-105' : 
                plan.ultimate ? 'border-2 border-gradient-to-r from-yellow-500 to-orange-500 bg-gradient-to-br from-yellow-500/5 to-orange-500/5' :
                'border border-gray-700'
              } transition-all`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                {plan.ultimate && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      🔥 EVERYTHING
                    </span>
                  </div>
                )}
                <div className="text-center mb-4">
                  <h3 className={`text-xl font-bold mb-2 ${plan.ultimate ? 'bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent' : ''}`}>
                    {plan.name}
                  </h3>
                  <div className={`text-3xl font-bold mb-2 ${plan.ultimate ? 'bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent' : ''}`}>
                    {plan.price}
                    {plan.price !== "Free" && plan.price !== "Custom" && <span className="text-sm text-gray-400">/month</span>}
                  </div>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      <span className={`text-sm ${plan.ultimate && feature.includes('🔥') ? 'font-semibold text-yellow-400' : 'text-gray-300'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2.5 rounded-lg font-semibold transition-colors text-sm ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600'
                    : plan.ultimate
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6" data-animate>
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl p-12 border border-gray-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Create
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Something Amazing?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of creators who are already using AEON to bring their ideas to life
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Creating Now
              </button>
              <button className="px-8 py-4 bg-transparent border border-gray-600 hover:border-gray-500 rounded-xl font-semibold text-lg transition-colors flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo Video
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">AEON</span>
              </div>
              <p className="text-gray-400">
                The all-in-one AI platform for creative professionals and businesses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">Features</a>
                <a href="#" className="block hover:text-white transition-colors">Pricing</a>
                <a href="#" className="block hover:text-white transition-colors">API</a>
                <a href="#" className="block hover:text-white transition-colors">Integrations</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">About</a>
                <a href="#" className="block hover:text-white transition-colors">Blog</a>
                <a href="#" className="block hover:text-white transition-colors">Careers</a>
                <a href="#" className="block hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block hover:text-white transition-colors">Community</a>
                <a href="#" className="block hover:text-white transition-colors">Status</a>
                <a href="#" className="block hover:text-white transition-colors">Privacy</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AEON. All rights reserved. Built with AI for the future of creativity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AeonHomepage;
