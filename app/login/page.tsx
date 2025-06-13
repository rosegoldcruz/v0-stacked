'use client'

'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  Github,
  Chrome
} from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      // Handle login logic here
      console.log('Login attempt:', formData)
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`)
    // Handle social login logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to continue creating amazing content</p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full h-12 pl-10 pr-4 py-3 text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full h-12 pl-10 pr-12 py-3 text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-300">Remember me</span>
              </label>
              <Link 
                href="/forgot-password" 
                className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 py-3 px-4 text-base rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center touch-manipulation"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-sm text-gray-400">or continue with</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center h-12 px-4 py-3 text-base bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg transition-colors touch-manipulation"
            >
              <Chrome className="w-5 h-5 mr-2" />
              Google
            </button>
            <button
              onClick={() => handleSocialLogin('github')}
              className="flex items-center justify-center h-12 px-4 py-3 text-base bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg transition-colors touch-manipulation"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link 
                href="/register" 
                className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">Join thousands of creators using AEON</p>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-gray-300">AI Video Generation</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              <span className="text-gray-300">Advanced Models</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
              <span className="text-gray-300">API Access</span>
            </div>
          </div>
        </div>

        {/* Demo Account */}
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="text-center">
            <p className="text-blue-400 text-sm font-medium mb-2">Try Demo Account</p>
            <p className="text-xs text-gray-400 mb-3">
              Email: demo@aeon.ai • Password: demo123
            </p>
            <button
              onClick={() => {
                setFormData({
                  email: 'demo@aeon.ai',
                  password: 'demo123',
                  rememberMe: false
                })
              }}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              Fill Demo Credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
