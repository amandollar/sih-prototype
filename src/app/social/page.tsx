'use client'

import { useState, useEffect, useCallback } from 'react'
import { Users, MessageSquare, TrendingUp, Filter, RefreshCw } from 'lucide-react'
import SocialMediaMonitor from '../../components/SocialMediaMonitor'
import { SocialMediaPost } from '../../types'
import { getFilteredSocialMediaPosts } from '../../lib/fakeData'

export default function SocialMedia() {
  const [posts, setPosts] = useState<SocialMediaPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    platform: 'ALL',
    hazardType: 'ALL',
    sentiment: 'ALL',
    dateRange: '24h'
  })
  const [showFilters, setShowFilters] = useState(false)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    // Simulate API delay
    setTimeout(() => {
      const filteredPosts = getFilteredSocialMediaPosts(filters)
      setPosts(filteredPosts)
      setLoading(false)
    }, 500)
  }, [filters])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const platforms = ['ALL', 'TWITTER', 'FACEBOOK', 'YOUTUBE', 'INSTAGRAM']
  const hazardTypes = [
    'ALL', 'TSUNAMI', 'STORM_SURGE', 'HIGH_WAVES', 'SWELL_SURGE', 
    'COASTAL_CURRENT', 'FLOODING', 'COASTAL_DAMAGE', 'ABNORMAL_TIDE', 'OTHER'
  ]
  const sentiments = ['ALL', 'POSITIVE', 'NEGATIVE', 'NEUTRAL', 'URGENT']
  const dateRanges = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ]

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'TWITTER': return '🐦'
      case 'FACEBOOK': return '📘'
      case 'YOUTUBE': return '📺'
      case 'INSTAGRAM': return '📷'
      default: return '📱'
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'POSITIVE': return 'text-green-600 bg-green-100'
      case 'NEGATIVE': return 'text-red-600 bg-red-100'
      case 'NEUTRAL': return 'text-gray-600 bg-gray-100'
      case 'URGENT': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const stats = [
    {
      name: 'Total Posts',
      value: posts.length,
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Platforms',
      value: new Set(posts.map(p => p.platform)).size,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Urgent Posts',
      value: Array.isArray(posts) ? posts.filter(p => p.sentiment === 'URGENT').length : 0,
      icon: TrendingUp,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      name: 'High Confidence',
      value: Array.isArray(posts) ? posts.filter(p => p.confidence > 0.8).length : 0,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Hero Section with Ocean Images */}
      <section className="relative h-80 rounded-2xl overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-cyan-900/80" />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Social Media
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                Intelligence
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Monitor social media for ocean hazard discussions and community reports in real-time
            </p>
          </div>
        </div>
      </section>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Social Media Monitor</h2>
          <p className="mt-2 text-gray-600">
            Monitor social media for ocean hazard discussions and alerts
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          <button
            onClick={fetchPosts}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Platform */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform
              </label>
              <select
                value={filters.platform}
                onChange={(e) => setFilters({...filters, platform: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {platforms.map(platform => (
                  <option key={platform} value={platform}>
                    {platform === 'ALL' ? 'All Platforms' : platform}
                  </option>
                ))}
              </select>
            </div>

            {/* Hazard Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hazard Type
              </label>
              <select
                value={filters.hazardType}
                onChange={(e) => setFilters({...filters, hazardType: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {hazardTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'ALL' ? 'All Types' : type.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Sentiment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sentiment
              </label>
              <select
                value={filters.sentiment}
                onChange={(e) => setFilters({...filters, sentiment: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sentiments.map(sentiment => (
                  <option key={sentiment} value={sentiment}>
                    {sentiment === 'ALL' ? 'All Sentiments' : sentiment}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Visual Enhancement Section */}
      <div className="bg-white rounded-lg shadow p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Social Media Intelligence in Action</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how we harness the power of social media to gather real-time ocean hazard intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Real-time Monitoring */}
          <div className="relative group overflow-hidden rounded-xl">
            <div 
              className="h-48 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h4 className="text-lg font-bold mb-2">Real-time Monitoring</h4>
              <p className="text-sm text-white/90">
                Continuous scanning of social platforms for ocean-related discussions and emergency reports
              </p>
            </div>
          </div>

          {/* Sentiment Analysis */}
          <div className="relative group overflow-hidden rounded-xl">
            <div 
              className="h-48 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h4 className="text-lg font-bold mb-2">Sentiment Analysis</h4>
              <p className="text-sm text-white/90">
                AI-powered analysis to detect urgency levels and emotional context in social media posts
              </p>
            </div>
          </div>

          {/* Community Engagement */}
          <div className="relative group overflow-hidden rounded-xl">
            <div 
              className="h-48 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h4 className="text-lg font-bold mb-2">Community Engagement</h4>
              <p className="text-sm text-white/90">
                Engaging with coastal communities to gather ground-level intelligence and first-hand reports
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Monitor Component */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Social Media Posts ({posts.length})
          </h2>
          <p className="text-sm text-gray-600">
            Real-time social media monitoring for ocean hazard discussions
          </p>
        </div>
        
        <div className="p-6">
          <SocialMediaMonitor />
        </div>
      </div>

      {/* Platform Distribution */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {platforms.filter(p => p !== 'ALL').map(platform => {
            const count = Array.isArray(posts) ? posts.filter(p => p.platform === platform).length : 0
            const percentage = Array.isArray(posts) && posts.length > 0 ? (count / posts.length * 100).toFixed(1) : 0
            return (
              <div key={platform} className="text-center">
                <div className="text-2xl mb-2">{getPlatformIcon(platform)}</div>
                <div className="text-sm font-medium text-gray-900">{platform}</div>
                <div className="text-lg font-bold text-blue-600">{count}</div>
                <div className="text-xs text-gray-500">{percentage}%</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Sentiment Analysis */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Analysis</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sentiments.filter(s => s !== 'ALL').map(sentiment => {
            const count = Array.isArray(posts) ? posts.filter(p => p.sentiment === sentiment).length : 0
            const percentage = Array.isArray(posts) && posts.length > 0 ? (count / posts.length * 100).toFixed(1) : 0
            return (
              <div key={sentiment} className="text-center">
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(sentiment)}`}>
                  {sentiment}
                </div>
                <div className="text-lg font-bold text-gray-900 mt-2">{count}</div>
                <div className="text-xs text-gray-500">{percentage}%</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
