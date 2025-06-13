'use client'

import { Metadata } from 'next'
import { useState } from 'react'
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Palette, 
  Globe, 
  Download,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Check,
  X,
  Settings as SettingsIcon
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account')
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
    updates: true
  })

  const tabs = [
    { id: 'account', name: 'Account', icon: <User className="w-5 h-5" /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'security', name: 'Security', icon: <Shield className="w-5 h-5" /> },
    { id: 'billing', name: 'Billing', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'preferences', name: 'Preferences', icon: <Palette className="w-5 h-5" /> },
    { id: 'data', name: 'Data & Privacy', icon: <Globe className="w-5 h-5" /> }
  ]

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center">
            <SettingsIcon className="w-8 h-8 mr-3 text-orange-400" />
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-gray-400">Manage your account preferences and configuration</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    {tab.icon}
                    <span className="ml-3">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
              {/* Account Settings */}
              {activeTab === 'account' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Account Information</h2>
                  
                  <div className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-2xl font-bold">
                        JD
                      </div>
                      <div>
                        <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors mr-3">
                          Change Photo
                        </button>
                        <button className="text-red-400 hover:text-red-300 px-4 py-2 transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <input
                          type="email"
                          defaultValue="john.doe@example.com"
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Bio</label>
                        <textarea
                          rows={3}
                          defaultValue="Content creator and AI enthusiast"
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all flex items-center">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications */}
              {activeTab === 'notifications' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Email Notifications</h3>
                      {[
                        { key: 'email', label: 'General email notifications', desc: 'Receive updates about your account and projects' },
                        { key: 'marketing', label: 'Marketing emails', desc: 'Product updates, tips, and promotional content' },
                        { key: 'updates', label: 'Product updates', desc: 'New features and important announcements' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-sm text-gray-400">{item.desc}</div>
                          </div>
                          <button
                            onClick={() => handleNotificationChange(item.key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notifications[item.key as keyof typeof notifications] ? 'bg-orange-500' : 'bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Push Notifications</h3>
                      <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                        <div>
                          <div className="font-medium">Browser notifications</div>
                          <div className="text-sm text-gray-400">Get notified when your content is ready</div>
                        </div>
                        <button
                          onClick={() => handleNotificationChange('push')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.push ? 'bg-orange-500' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.push ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security */}
              {activeTab === 'security' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    {/* Change Password */}
                    <div className="p-4 bg-gray-700/30 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Current Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white pr-10"
                            />
                            <button
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">New Password</label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                          />
                        </div>
                        <button className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all">
                          Update Password
                        </button>
                      </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="p-4 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                        </div>
                        <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">Disabled</span>
                      </div>
                      <button className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all">
                        Enable 2FA
                      </button>
                    </div>

                    {/* Active Sessions */}
                    <div className="p-4 bg-gray-700/30 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
                      <div className="space-y-3">
                        {[
                          { device: 'Chrome on Windows', location: 'New York, US', current: true },
                          { device: 'Safari on iPhone', location: 'New York, US', current: false },
                          { device: 'Firefox on Mac', location: 'San Francisco, US', current: false }
                        ].map((session, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                            <div>
                              <div className="font-medium flex items-center">
                                {session.device}
                                {session.current && <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Current</span>}
                              </div>
                              <div className="text-sm text-gray-400">{session.location}</div>
                            </div>
                            {!session.current && (
                              <button className="text-red-400 hover:text-red-300 text-sm">
                                Revoke
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing */}
              {activeTab === 'billing' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Billing & Subscription</h2>
                  
                  <div className="space-y-6">
                    {/* Current Plan */}
                    <div className="p-6 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg border border-orange-500/30">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">Pro Plan</h3>
                          <p className="text-gray-300">$29/month • Renews on Feb 15, 2024</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">$29</div>
                          <div className="text-sm text-gray-400">per month</div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all">
                          Upgrade Plan
                        </button>
                        <button className="border border-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all">
                          Cancel Subscription
                        </button>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="p-4 bg-gray-700/30 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-6 bg-blue-500 rounded mr-3 flex items-center justify-center text-xs font-bold text-white">
                            VISA
                          </div>
                          <div>
                            <div className="font-medium">•••• •••• •••• 4242</div>
                            <div className="text-sm text-gray-400">Expires 12/25</div>
                          </div>
                        </div>
                        <button className="text-orange-400 hover:text-orange-300 text-sm">
                          Update
                        </button>
                      </div>
                    </div>

                    {/* Billing History */}
                    <div className="p-4 bg-gray-700/30 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Billing History</h3>
                      <div className="space-y-3">
                        {[
                          { date: '2024-01-15', amount: '$29.00', status: 'Paid' },
                          { date: '2023-12-15', amount: '$29.00', status: 'Paid' },
                          { date: '2023-11-15', amount: '$29.00', status: 'Paid' }
                        ].map((invoice, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                            <div>
                              <div className="font-medium">{invoice.date}</div>
                              <div className="text-sm text-gray-400">Pro Plan</div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-medium">{invoice.amount}</span>
                              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">{invoice.status}</span>
                              <button className="text-orange-400 hover:text-orange-300 text-sm">
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences */}
              {activeTab === 'preferences' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Preferences</h2>
                  
                  <div className="space-y-6">
                    {/* Theme */}
                    <div className="p-4 bg-gray-700/30 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Appearance</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-2">Theme</label>
                          <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white">
                            <option>Dark (Current)</option>
                            <option>Light</option>
                            <option>Auto</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Language</label>
                          <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white">
                            <option>English (US)</option>
                            <option>English (UK)</option>
                            <option>Spanish</option>
                            <option>French</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Default Settings */}
                    <div className="p-4 bg-gray-700/30 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Default Generation Settings</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-2">Video Quality</label>
                          <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white">
                            <option>4K (Recommended)</option>
                            <option>1080p</option>
                            <option>720p</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Image Format</label>
                          <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white">
                            <option>PNG</option>
                            <option>JPEG</option>
                            <option>WebP</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Data & Privacy */}
              {activeTab === 'data' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Data & Privacy</h2>
                  
                  <div className="space-y-6">
                    {/* Data Export */}
                    <div className="p-4 bg-gray-700/30 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Export Your Data</h3>
                      <p className="text-gray-400 mb-4">Download a copy of all your data including projects, settings, and usage history.</p>
                      <button className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Request Data Export
                      </button>
                    </div>

                    {/* Delete Account */}
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4 text-red-400">Delete Account</h3>
                      <p className="text-gray-400 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                      <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition-all flex items-center">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
