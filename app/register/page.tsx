'use client'

'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Sparkles,
  ArrowRight,
  Github,
  Chrome,
  Check,
  X
} from 'lucide-react'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  })
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false)
      // Handle registration logic here
      console.log('Registration attempt:', formData)
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Calculate password strength
    if (name === 'password') {
      let strength = 0
      if (value.length >= 8) strength++
      if (/[A-Z]/.test(value)) strength++
      if (/[a-z]/.test(value)) strength++
      if (/[0-9]/.test(value)) strength++
      if (/[^A-Za-z0-9]/.test(value)) strength++
      setPasswordStrength(strength)
    }
  }

  const handleSocialRegister = (provider: string) => {
    console.log(`Register with ${provider}`)
    // Handle social registration logic here
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500'
    if (passwordStrength <= 3) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak'
    if (passwordStrength <= 3) return 'Medium'
    return 'Strong'
  }

  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== ''

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
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-400">Join AEON and start creating viral content today</p>
        </div>

        {/* Registration Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className="w-full h-12 pl-10 pr-4 py-3 text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className="w-full h-12 px-4 py-3 text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                  required
                />
              </div>
            </div>

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
                  placeholder="john@example.com"
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
                  placeholder="Create a strong password"
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
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-400">Password strength</span>
                    <span className={`font-medium ${
                      passwordStrength <= 2 ? 'text-red-400' : 
                      passwordStrength <= 3 ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="w-full h-12 pl-10 pr-12 py-3 text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.confirmPassword && (
                <div className="mt-1 flex items-center text-sm">
                  {passwordsMatch ? (
                    <div className="flex items-center text-green-400">
                      <Check className="w-4 h-4 mr-1" />
                      Passwords match
                    </div>
                  ) : (
                    <div className="flex items-center text-red-400">
                      <X className="w-4 h-4 mr-1" />
                      Passwords don't match
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2 mt-0.5"
                  required
                />
                <span className="ml-2 text-sm text-gray-300">
                  I agree to the{' '}
                  <Link href="/terms" className="text-orange-400 hover:text-orange-300">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-orange-400 hover:text-orange-300">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2 mt-0.5"
                />
                <span className="ml-2 text-sm text-gray-300">
                  Subscribe to our newsletter for updates and tips
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !formData.agreeToTerms || !passwordsMatch}
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 py-3 px-4 text-base rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center touch-manipulation"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-sm text-gray-400">or sign up with</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Social Registration */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleSocialRegister('google')}
              className="flex items-center justify-center h-12 px-4 py-3 text-base bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg transition-colors touch-manipulation"
            >
              <Chrome className="w-5 h-5 mr-2" />
              Google
            </button>
            <button
              onClick={() => handleSocialRegister('github')}
              className="flex items-center justify-center h-12 px-4 py-3 text-base bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg transition-colors touch-manipulation"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </button>
          </div>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">What you get with AEON</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-center">
              <Check className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-gray-300">5 free videos per month</span>
            </div>
            <div className="flex items-center justify-center">
              <Check className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-gray-300">Access to basic AI models</span>
            </div>
            <div className="flex items-center justify-center">
              <Check className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-gray-300">Community support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
