'use client'

import { useState } from 'react'
import { Play, Zap, Users, TrendingUp, Check, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [selectedPlan, setSelectedPlan] = useState('pro')

  const stats = [
    { value: '18M+', label: 'Videos Created' },
    { value: '60K+', label: 'Active Users' },
    { value: '99.8%', label: 'Uptime' },
    { value: '4.9/5', label: 'User Rating' }
  ]

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'AI-Powered Generation',
      description: 'Advanced AI creates professional videos from simple prompts'
    },
    {
      icon: <Play className="w-6 h-6" />,
      title: 'Video Forge',
      description: 'Transform scripts into engaging visual content automatically'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Human Studio',
      description: 'Create realistic human avatars and voice overs'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Mass Creator',
      description: 'Batch create hundreds of videos for campaigns'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Visual Creator',
      description: 'Generate stunning visuals and animations'
    },
    {
      icon: <Play className="w-6 h-6" />,
      title: 'Sound Lab',
      description: 'AI-powered music and sound effect generation'
    }
  ]

  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Get started with basic features',
      features: [
        '5 videos per month',
        'Basic templates',
        'Watermarked videos',
        'Standard quality',
        'Community support'
      ],
      buttonText: 'Start Free',
      popular: false
    },
    {
      name: 'Creator',
      price: '$25',
      description: 'Perfect for content creators',
      features: [
        '15 videos per month',
        'Premium templates',
        'No watermark',
        'HD quality',
        'Email support',
        'Basic analytics'
      ],
      buttonText: 'Start Creating',
      popular: false
    },
    {
      name: 'Pro',
      price: '$50',
      description: 'Most popular for professionals',
      features: [
        '25 videos per month',
        'All premium features',
        '4K quality',
        'Priority support',
        'Advanced analytics',
        'API access',
        'Custom branding'
      ],
      buttonText: 'Go Pro',
      popular: true
    },
    {
      name: 'Ultimate',
      price: '$100',
      description: 'Everything you need and more',
      features: [
        '50 videos per month',
        'AEON Studio access',
        'Unlimited everything',
        'White-label solution',
        'Dedicated support',
        'Custom integrations',
        'Enterprise features'
      ],
      buttonText: 'Get Ultimate',
      popular: false
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-aeon-purple to-aeon-blue rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">AEON</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-aeon-purple transition-colors">Features</a>
              <a href="#pricing" className="hover:text-aeon-purple transition-colors">Pricing</a>
              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="bg-gradient-to-r from-aeon-purple to-aeon-blue px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Create Anything with
            <br />
            <span className="gradient-text">AI-Powered Magic</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transform your ideas into viral TikTok videos in seconds. Our AI analyzes trending content 
            and creates engaging videos that capture attention and drive results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="bg-gradient-to-r from-aeon-purple to-aeon-blue px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center"
            >
              Start Creating Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="border border-white/20 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need in
              <br />
              <span className="gradient-text">One Powerful Platform</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Access professional-grade AI tools designed to create viral content. 
              From script generation to final video, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              type RouteKey = 'Video Forge' | 'Visual Creator' | 'Human Studio' | 'Sound Lab' | 'Mass Creator';
              const routes: Record<RouteKey, string> = {
                'Video Forge': '/video-forge',
                'Visual Creator': '/visual-creator',
                'Human Studio': '/human-studio',
                'Sound Lab': '/sound-lab',
                'Mass Creator': '/mass-creator'
              };
              
              const href = (routes as Record<string, string>)[feature.title] || '/campaign-hub';
              return (
                <Link key={index} href={href}>
                  <div className="glass-effect p-8 rounded-2xl hover-lift">
                    <div className="w-12 h-12 bg-gradient-to-r from-aeon-purple to-aeon-blue rounded-lg flex items-center justify-center mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent
              <br />
              <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the plan that fits your needs. All plans include our core AI features 
              with different usage limits and premium capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`relative p-8 rounded-2xl ${
                plan.popular 
                  ? 'bg-gradient-to-br from-aeon-purple/20 to-aeon-blue/20 border-2 border-aeon-purple' 
                  : 'glass-effect'
              } hover-lift`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-aeon-purple to-aeon-blue px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-2">
                    {plan.price}
                    {plan.price !== '$0' && <span className="text-lg text-gray-400">/month</span>}
                  </div>
                  <p className="text-gray-300">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
              onClick={() => window.location.href = '/dashboard'}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-aeon-purple to-aeon-blue hover:opacity-90' 
                      : 'border border-white/20 hover:bg-white/10'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Create
            <br />
            <span className="gradient-text">Something Amazing?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of creators who are already using AEON to build viral content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="bg-gradient-to-r from-aeon-purple to-aeon-blue px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Start Creating Free
            </button>
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="border border-white/20 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-aeon-purple to-aeon-blue rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">AEON</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2025 VULPINELLC. All rights reserved.</p>
              <p className="text-sm mt-1">Advanced. Efficient. Optimized. Network.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
