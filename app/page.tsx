'use client'

import Link from 'next/link'
import { Play, CheckCircle, Star, Users, TrendingUp, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="w-full bg-white text-gray-900 overflow-x-hidden">
      {/* Subtle background gradients */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-100/20 rounded-full blur-3xl"></div>
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-8">
              <Star className="w-4 h-4 mr-2" />
              AI-Powered Video Generation
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                AI-powered solutions for smarter
              </span>
              <br />
              <span className="text-gray-900">business growth</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
              Transform your content creation with AEON's intelligent automation. Generate viral videos, optimize for engagement, and scale your social media presence effortlessly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/studio"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Creating
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                View Pricing
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center mb-16">
            <p className="text-sm text-gray-500 mb-6">Trusted by 10k+ creators worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Placeholder logos */}
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW SECTION */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Experience the Power of AI Automation
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how AEON transforms your content creation workflow with intelligent automation and data-driven insights.
            </p>
          </div>

          {/* Dashboard Mockup */}
          <div className="relative max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  </div>
                  <div className="text-white font-semibold">AEON Studio</div>
                  <div className="w-20"></div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Videos Generated</h3>
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-blue-600">2,847</div>
                    <div className="text-sm text-gray-600">+23% this month</div>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Engagement Rate</h3>
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-3xl font-bold text-purple-600">94.2%</div>
                    <div className="text-sm text-gray-600">Above industry avg</div>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Time Saved</h3>
                      <Zap className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-green-600">156h</div>
                    <div className="text-sm text-gray-600">Per month</div>
                  </div>
                </div>
                <div className="bg-gray-100 h-64 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Interactive Dashboard Preview</p>
                    <p className="text-sm text-gray-400">Real-time analytics and generation tools</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">About Our Platform</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              AI-powered SaaS solutions are revolutionizing business operations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From optimizing workflows and enhancing customer experiences to providing intelligent automation and data-driven insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">500TB+</div>
              <p className="text-gray-600">Data processed in real-time for valuable insights</p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-purple-600 mb-2">98.7%</div>
              <p className="text-gray-600">Accuracy in predictive analytics for business decisions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-green-600 mb-2">$1M+</div>
              <p className="text-gray-600">Cost savings through AI-powered optimizations</p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-orange-600 mb-2">100K+</div>
              <p className="text-gray-600">Active users driving platform success and engagement</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">Our Features</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              AI-powered automation for effortless business growth
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Boost productivity with seamless integration across your entire content creation workflow.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Play className="w-8 h-8 text-blue-600" />,
                title: 'Video Forge',
                description: 'Transform scripts into viral videos using advanced AI models and intelligent automation.'
              },
              {
                icon: <Users className="w-8 h-8 text-purple-600" />,
                title: 'Visual Creator',
                description: 'Generate branded images and artwork using cutting-edge AI visualization technology.'
              },
              {
                icon: <Zap className="w-8 h-8 text-green-600" />,
                title: 'Human Studio',
                description: 'Create intelligent talking avatars and video hosts with realistic AI-powered personas.'
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
                title: 'Sound Lab',
                description: 'Synthesize audio, music, and sound effects with professional-grade AI audio tools.'
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-indigo-600" />,
                title: 'Mass Creator',
                description: 'Batch-generate hundreds of content variations instantly with intelligent optimization.'
              },
              {
                icon: <Star className="w-8 h-8 text-pink-600" />,
                title: 'Campaign Hub',
                description: 'Manage and deploy content across multiple platforms with automated scheduling.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Link
              href="/features"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Explore All Features
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">Our Testimonials</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Customer success, fueled by intelligent automation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Content Creator",
                avatar: "SC",
                content: "AEON has transformed my content creation workflow. I can now generate 10x more videos with better engagement rates. The AI automation is incredible!",
                rating: 5
              },
              {
                name: "Marcus Rodriguez",
                role: "Marketing Director",
                avatar: "MR",
                content: "The Smart Assembly Engine is a game-changer. Our team saves 20+ hours per week while producing higher quality content that actually converts.",
                rating: 5
              },
              {
                name: "Emily Watson",
                role: "E-commerce Owner",
                avatar: "EW",
                content: "Since using AEON, our TikTok engagement increased by 340%. The platform pays for itself within the first week of use.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY STACK STRIP */}
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">
            Built on Vercel • Secured by Supabase • Powered by Replicate • Monetized via Stripe
          </p>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">Our Pricing Plan</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Find the Ideal Pricing Plan for Your Content Creation
            </h2>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className="text-gray-600">Monthly</span>
              <div className="relative">
                <input type="checkbox" className="sr-only" />
                <div className="w-12 h-6 bg-gray-300 rounded-full shadow-inner"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform"></div>
              </div>
              <span className="text-gray-900 font-semibold">Yearly</span>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Save 20%</span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic Plan</h3>
                <p className="text-gray-600 mb-6">Perfect for individual creators getting started</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">$25</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <Link
                  href="/signup"
                  className="w-full inline-block bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-all duration-300"
                >
                  Select Your Plan
                </Link>
              </div>

              <ul className="space-y-4">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  15 videos per month
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  HD video quality
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Basic AI models
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Email support
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  No watermark
                </li>
              </ul>
            </div>

            {/* Standard Plan */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-500 hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Standard Plan</h3>
                <p className="text-gray-600 mb-6">Ideal for growing businesses and agencies</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">$50</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <Link
                  href="/signup"
                  className="w-full inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Select Your Plan
                </Link>
              </div>

              <ul className="space-y-4">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  25 videos per month
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  4K video quality
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Premium AI models
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Priority support
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Advanced features
                </li>
              </ul>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Plan</h3>
                <p className="text-gray-600 mb-6">For enterprises and high-volume creators</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">$100</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <Link
                  href="/signup"
                  className="w-full inline-block bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-all duration-300"
                >
                  Select Your Plan
                </Link>
              </div>

              <ul className="space-y-4">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  50 videos per month
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  8K video quality
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  All AI models
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  24/7 phone support
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  White-label options
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Content Creation?
          </h2>

          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of creators who are already using AEON to generate viral content and grow their audience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/studio"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Creating Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-white font-bold text-2xl">AEON</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Advanced AI-powered video generation platform for creators, businesses, and agencies. Transform your content creation with intelligent automation.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <div className="w-6 h-6 bg-gray-400 rounded"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <div className="w-6 h-6 bg-gray-400 rounded"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <div className="w-6 h-6 bg-gray-400 rounded"></div>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/help-page" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 AEON. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
