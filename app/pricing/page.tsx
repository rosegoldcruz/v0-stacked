'use client'

import { Check, Crown, Zap, Star, ArrowRight } from 'lucide-react'

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out AEON',
      features: [
        '5 videos per month',
        'Basic AI models',
        '720p video quality',
        'Community support',
        'Basic templates'
      ],
      limitations: [
        'Watermarked videos',
        'Limited export formats'
      ],
      cta: 'Get Started Free',
      popular: false,
      gradient: 'from-gray-500 to-gray-600'
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'month',
      description: 'For content creators and small teams',
      features: [
        '100 videos per month',
        'Premium AI models',
        '4K video quality',
        'Priority support',
        'Advanced templates',
        'No watermarks',
        'All export formats',
        'Custom branding'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true,
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'month',
      description: 'For agencies and large teams',
      features: [
        'Unlimited videos',
        'All AI models',
        '8K video quality',
        'Dedicated support',
        'Custom templates',
        'API access',
        'Team collaboration',
        'Advanced analytics',
        'Custom integrations',
        'SLA guarantee'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      gradient: 'from-purple-500 to-purple-600'
    }
  ]

  const features = [
    {
      category: 'Video Generation',
      items: [
        { name: 'AI Video Creation', starter: '✓', pro: '✓', enterprise: '✓' },
        { name: 'Script to Video', starter: '✓', pro: '✓', enterprise: '✓' },
        { name: 'Voice Synthesis', starter: 'Basic', pro: 'Premium', enterprise: 'Custom' },
        { name: 'Video Quality', starter: '720p', pro: '4K', enterprise: '8K' },
        { name: 'Monthly Videos', starter: '5', pro: '100', enterprise: 'Unlimited' }
      ]
    },
    {
      category: 'AI Models',
      items: [
        { name: 'Basic Models', starter: '✓', pro: '✓', enterprise: '✓' },
        { name: 'Premium Models', starter: '✗', pro: '✓', enterprise: '✓' },
        { name: 'Custom Models', starter: '✗', pro: '✗', enterprise: '✓' },
        { name: 'Model Training', starter: '✗', pro: 'Limited', enterprise: 'Full' }
      ]
    },
    {
      category: 'Features',
      items: [
        { name: 'Watermark Removal', starter: '✗', pro: '✓', enterprise: '✓' },
        { name: 'API Access', starter: '✗', pro: 'Limited', enterprise: 'Full' },
        { name: 'Team Collaboration', starter: '✗', pro: '✗', enterprise: '✓' },
        { name: 'Priority Support', starter: '✗', pro: '✓', enterprise: '✓' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Choose Your
              <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent"> Power Level</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              From free exploration to enterprise domination. Pick the plan that matches your creative ambitions.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border ${
                plan.popular 
                  ? 'border-orange-500 ring-2 ring-orange-500/20' 
                  : 'border-gray-700'
              } hover:border-gray-600 transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Crown className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400">/{plan.period}</span>
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, idx) => (
                  <div key={idx} className="flex items-center opacity-60">
                    <span className="w-5 h-5 text-red-400 mr-3 flex-shrink-0">✗</span>
                    <span className="text-gray-400">{limitation}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {}}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Compare All Features</h2>
          <p className="text-gray-400">See exactly what's included in each plan</p>
        </div>

        <div className="bg-gray-800/30 rounded-2xl overflow-hidden">
          {features.map((category, categoryIdx) => (
            <div key={category.category} className={categoryIdx > 0 ? 'border-t border-gray-700' : ''}>
              <div className="bg-gray-800/50 px-6 py-4">
                <h3 className="text-lg font-semibold">{category.category}</h3>
              </div>
              {category.items.map((item, itemIdx) => (
                <div key={item.name} className={`grid grid-cols-4 gap-4 px-6 py-4 ${itemIdx % 2 === 0 ? 'bg-gray-800/20' : ''}`}>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-center">{item.starter}</div>
                  <div className="text-center">{item.pro}</div>
                  <div className="text-center">{item.enterprise}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-6">
          {[
            {
              q: "Can I change plans anytime?",
              a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
            },
            {
              q: "What happens to my videos if I downgrade?",
              a: "All your existing videos remain accessible. You'll just have lower limits for new creations."
            },
            {
              q: "Do you offer refunds?",
              a: "We offer a 30-day money-back guarantee for all paid plans. No questions asked."
            },
            {
              q: "Is there a free trial for Pro?",
              a: "Yes! All new users get a 7-day free trial of Pro features when they sign up."
            }
          ].map((faq, idx) => (
            <div key={idx} className="bg-gray-800/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
              <p className="text-gray-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Creating?</h2>
          <p className="text-gray-300 mb-8">Join thousands of creators making viral content with AEON</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {}}
              className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => {}}
              className="border border-gray-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
