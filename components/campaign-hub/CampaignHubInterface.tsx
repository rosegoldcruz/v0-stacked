// components/campaign-hub/CampaignHubInterface.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  Eye,
  Heart,
  Share2,
  MessageCircle,
  Calendar,
  Clock,
  Globe,
  Settings,
  Plus,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Zap,
  Brain,
  Filter,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { useSubscription } from '@/hooks/useSubscription'

const platforms = [
  { id: 'tiktok', name: 'TikTok', color: 'bg-pink-500', icon: '🎵' },
  { id: 'instagram', name: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500', icon: '📸' },
  { id: 'youtube', name: 'YouTube', color: 'bg-red-500', icon: '📺' },
  { id: 'facebook', name: 'Facebook', color: 'bg-blue-500', icon: '👥' },
  { id: 'twitter', name: 'Twitter/X', color: 'bg-gray-900', icon: '🐦' },
  { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-600', icon: '💼' }
]

const campaignStatuses = [
  { id: 'active', name: 'Active', color: 'bg-green-500' },
  { id: 'scheduled', name: 'Scheduled', color: 'bg-blue-500' },
  { id: 'paused', name: 'Paused', color: 'bg-yellow-500' },
  { id: 'completed', name: 'Completed', color: 'bg-gray-500' },
  { id: 'draft', name: 'Draft', color: 'bg-gray-400' }
]

interface Campaign {
  id: string
  name: string
  status: string
  platforms: string[]
  startDate: Date
  endDate: Date
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cpc: number
  roas: number
  posts: number
}

interface AnalyticsData {
  totalImpressions: number
  totalClicks: number
  totalConversions: number
  totalSpent: number
  avgCTR: number
  avgCPC: number
  avgROAS: number
  topPlatform: string
  growthRate: number
}

export default function CampaignHubInterface() {
  const { tier } = useSubscription()
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Summer Fashion Collection',
      status: 'active',
      platforms: ['instagram', 'tiktok', 'facebook'],
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-08-31'),
      budget: 5000,
      spent: 3240,
      impressions: 125000,
      clicks: 3750,
      conversions: 180,
      ctr: 3.0,
      cpc: 0.86,
      roas: 4.2,
      posts: 24
    },
    {
      id: '2',
      name: 'Tech Product Launch',
      status: 'scheduled',
      platforms: ['youtube', 'linkedin', 'twitter'],
      startDate: new Date('2024-07-15'),
      endDate: new Date('2024-09-15'),
      budget: 10000,
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      ctr: 0,
      cpc: 0,
      roas: 0,
      posts: 12
    },
    {
      id: '3',
      name: 'Holiday Sale Campaign',
      status: 'paused',
      platforms: ['facebook', 'instagram'],
      startDate: new Date('2024-05-01'),
      endDate: new Date('2024-06-30'),
      budget: 3000,
      spent: 2100,
      impressions: 89000,
      clicks: 2200,
      conversions: 95,
      ctr: 2.47,
      cpc: 0.95,
      roas: 3.1,
      posts: 18
    }
  ])

  const [analyticsData] = useState<AnalyticsData>({
    totalImpressions: 214000,
    totalClicks: 5950,
    totalConversions: 275,
    totalSpent: 5340,
    avgCTR: 2.78,
    avgCPC: 0.90,
    avgROAS: 3.8,
    topPlatform: 'Instagram',
    growthRate: 15.3
  })

  const isPremiumUser = tier === 'Pro' || tier === 'Ultimate'

  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`
  const formatNumber = (num: number) => num.toLocaleString()
  const formatPercentage = (num: number) => `${num.toFixed(1)}%`

  const getStatusBadge = (status: string) => {
    const statusConfig = campaignStatuses.find(s => s.id === status)
    return (
      <Badge className={`${statusConfig?.color} text-white`}>
        {statusConfig?.name}
      </Badge>
    )
  }

  const getPlatformIcon = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId)
    return platform?.icon || '🌐'
  }

  if (!isPremiumUser) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="h-8 w-8 text-blue-400" />
              <h1 className="text-3xl font-bold">Campaign Hub</h1>
              <Badge className="bg-blue-600">Premium Feature</Badge>
            </div>
            <p className="text-gray-400 text-lg">Manage multi-platform campaigns and analytics with AI insights</p>
          </div>

          <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/30 max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <BarChart3 className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <CardTitle className="text-2xl">Campaign Hub - Premium Only</CardTitle>
              <CardDescription className="text-lg">
                Advanced campaign management and analytics for serious marketers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-semibold text-blue-400">Pro Plan</h4>
                  <p className="text-2xl font-bold">10</p>
                  <p className="text-sm text-gray-400">active campaigns</p>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-semibold text-blue-400">Ultimate Plan</h4>
                  <p className="text-2xl font-bold">Unlimited</p>
                  <p className="text-sm text-gray-400">campaigns & analytics</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Premium Features Include:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Multi-platform campaign management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Advanced analytics & reporting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>AI-powered insights & recommendations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Automated scheduling & posting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Performance tracking & optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Custom reports & dashboards</span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
                  Upgrade to Pro
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
                  Upgrade to Ultimate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-blue-400" />
              <h1 className="text-3xl font-bold">Campaign Hub</h1>
              <Badge className="bg-blue-600">Premium</Badge>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </div>
          </div>
          <p className="text-gray-400 text-lg">Manage multi-platform campaigns and track performance with AI insights</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Impressions</p>
                      <p className="text-2xl font-bold">{formatNumber(analyticsData.totalImpressions)}</p>
                    </div>
                    <Eye className="h-8 w-8 text-blue-400" />
                  </div>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">+{formatPercentage(analyticsData.growthRate)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Clicks</p>
                      <p className="text-2xl font-bold">{formatNumber(analyticsData.totalClicks)}</p>
                    </div>
                    <Target className="h-8 w-8 text-green-400" />
                  </div>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">+12.3%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Conversions</p>
                      <p className="text-2xl font-bold">{formatNumber(analyticsData.totalConversions)}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-purple-400" />
                  </div>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">+8.7%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Spent</p>
                      <p className="text-2xl font-bold">{formatCurrency(analyticsData.totalSpent)}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-red-400" />
                  </div>
                  <div className="flex items-center mt-2">
                    <ArrowDownRight className="h-4 w-4 text-red-400 mr-1" />
                    <span className="text-sm text-red-400">+2.1%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average CTR</span>
                      <span className="font-medium">{formatPercentage(analyticsData.avgCTR)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average CPC</span>
                      <span className="font-medium">{formatCurrency(analyticsData.avgCPC)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average ROAS</span>
                      <span className="font-medium">{analyticsData.avgROAS.toFixed(1)}x</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Top Platform</span>
                      <span className="font-medium">{analyticsData.topPlatform}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Active Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {campaigns.filter(c => c.status === 'active').map((campaign) => (
                      <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div>
                          <h4 className="font-medium">{campaign.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            {campaign.platforms.map((platform) => (
                              <span key={platform} className="text-xs">
                                {getPlatformIcon(platform)}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{formatCurrency(campaign.spent)}</p>
                          <p className="text-xs text-gray-400">of {formatCurrency(campaign.budget)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">All Campaigns</h2>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="border-gray-600">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="border-gray-600">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{campaign.name}</h3>
                          {getStatusBadge(campaign.status)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="border-gray-600">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-600">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-400">Impressions</p>
                          <p className="font-medium">{formatNumber(campaign.impressions)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Clicks</p>
                          <p className="font-medium">{formatNumber(campaign.clicks)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">CTR</p>
                          <p className="font-medium">{formatPercentage(campaign.ctr)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">CPC</p>
                          <p className="font-medium">{formatCurrency(campaign.cpc)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Spent</p>
                          <p className="font-medium">{formatCurrency(campaign.spent)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">ROAS</p>
                          <p className="font-medium">{campaign.roas.toFixed(1)}x</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">Platforms:</span>
                          {campaign.platforms.map((platform) => (
                            <span key={platform} className="text-sm">
                              {getPlatformIcon(platform)}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{campaign.posts} posts</span>
                          <span>{campaign.startDate.toLocaleDateString()} - {campaign.endDate.toLocaleDateString()}</span>
                        </div>
                      </div>

                      {campaign.status === 'active' && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>Budget Progress</span>
                            <span>{formatPercentage((campaign.spent / campaign.budget) * 100)}</span>
                          </div>
                          <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
                <CardDescription>
                  In-depth performance metrics and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4" />
                    <p>Advanced analytics charts would be displayed here</p>
                    <p className="text-sm">Integration with analytics providers coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI-Powered Insights
                </CardTitle>
                <CardDescription>
                  Smart recommendations to optimize your campaigns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-400">Performance Optimization</h4>
                      <p className="text-sm text-gray-300 mt-1">
                        Your Instagram campaigns show 23% higher engagement on weekends. 
                        Consider increasing weekend ad spend by 15-20%.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-400">Audience Insight</h4>
                      <p className="text-sm text-gray-300 mt-1">
                        Ages 25-34 segment has the highest conversion rate (4.2%). 
                        Expand targeting to similar demographics.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-400">Timing Recommendation</h4>
                      <p className="text-sm text-gray-300 mt-1">
                        Peak engagement occurs at 7-9 PM. Schedule more content during these hours 
                        for maximum reach.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-400">Budget Allocation</h4>
                      <p className="text-sm text-gray-300 mt-1">
                        TikTok campaigns show 31% lower CPC than other platforms. 
                        Consider reallocating 10% of budget from Facebook to TikTok.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Campaign Hub Settings</CardTitle>
                <CardDescription>
                  Configure your campaign management preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="default-budget">Default Campaign Budget</Label>
                    <Input
                      id="default-budget"
                      placeholder="Enter default budget"
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="notification-email">Notification Email</Label>
                    <Input
                      id="notification-email"
                      type="email"
                      placeholder="Enter email for notifications"
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>

                  <div>
                    <Label>Connected Platforms</Label>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      {platforms.map((platform) => (
                        <div key={platform.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span>{platform.icon}</span>
                            <span className="text-sm">{platform.name}</span>
                          </div>
                          <Badge variant="outline">Connected</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}