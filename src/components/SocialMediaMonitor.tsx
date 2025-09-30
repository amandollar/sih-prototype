'use client'

import { useState, useEffect, useCallback } from 'react'
import { Twitter, Facebook, Youtube, MessageSquare, TrendingUp } from 'lucide-react'
import { getFilteredSocialMediaPosts } from '../lib/fakeData'

interface SocialMediaPost {
  id: string
  platform: string
  content: string
  author: string
  location?: string
  hazardType?: string
  sentiment?: string
  confidence: number
  createdAt: string
}

export default function SocialMediaMonitor() {
  const [posts, setPosts] = useState<SocialMediaPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    platform: 'ALL',
    sentiment: 'ALL',
    hazardType: 'ALL'
  })

  const fetchSocialMediaPosts = useCallback(async () => {
    setIsLoading(true)
    // Simulate API delay
    setTimeout(() => {
      const filteredPosts = getFilteredSocialMediaPosts({
        ...filters,
        dateRange: '24h' // Default to 24h for this component
      })
      setPosts(filteredPosts)
      setIsLoading(false)
    }, 500)
  }, [filters])

  useEffect(() => {
    fetchSocialMediaPosts()
  }, [fetchSocialMediaPosts])

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter': return <Twitter className="w-4 h-4 text-blue-400" />
      case 'facebook': return <Facebook className="w-4 h-4 text-blue-600" />
      case 'youtube': return <Youtube className="w-4 h-4 text-red-500" />
      default: return <MessageSquare className="w-4 h-4 text-gray-400" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'POSITIVE': return 'text-green-600 bg-green-100'
      case 'NEGATIVE': return 'text-red-600 bg-red-100'
      case 'URGENT': return 'text-orange-600 bg-orange-100'
      case 'NEUTRAL': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getHazardTypeIcon = (hazardType: string) => {
    switch (hazardType) {
      case 'TSUNAMI': return '🌊'
      case 'STORM_SURGE': return '⛈️'
      case 'HIGH_WAVES': return '🌊'
      case 'SWELL_SURGE': return '🌊'
      case 'COASTAL_CURRENT': return '🌊'
      case 'FLOODING': return '🌧️'
      case 'COASTAL_DAMAGE': return '🏗️'
      case 'ABNORMAL_TIDE': return '🌊'
      default: return '⚠️'
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Social Media Monitor</h2>
          <p className="text-gray-600">Real-time ocean hazard mentions across social platforms</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={filters.platform}
            onChange={(e) => setFilters({...filters, platform: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="ALL">All Platforms</option>
            <option value="TWITTER">Twitter</option>
            <option value="FACEBOOK">Facebook</option>
            <option value="YOUTUBE">YouTube</option>
            <option value="INSTAGRAM">Instagram</option>
          </select>
          <select
            value={filters.sentiment}
            onChange={(e) => setFilters({...filters, sentiment: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="ALL">All Sentiments</option>
            <option value="POSITIVE">Positive</option>
            <option value="NEGATIVE">Negative</option>
            <option value="URGENT">Urgent</option>
            <option value="NEUTRAL">Neutral</option>
          </select>
          <select
            value={filters.hazardType}
            onChange={(e) => setFilters({...filters, hazardType: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="ALL">All Hazards</option>
            <option value="TSUNAMI">Tsunami</option>
            <option value="STORM_SURGE">Storm Surge</option>
            <option value="HIGH_WAVES">High Waves</option>
            <option value="FLOODING">Flooding</option>
            <option value="COASTAL_DAMAGE">Coastal Damage</option>
            <option value="ABNORMAL_TIDE">Abnormal Tide</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Posts</p>
              <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Urgent Posts</p>
              <p className="text-2xl font-bold text-gray-900">
                {posts.filter(p => p.sentiment === 'URGENT').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">High Confidence</p>
              <p className="text-2xl font-bold text-gray-900">
                {posts.filter(p => p.confidence > 0.8).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Verified</p>
              <p className="text-2xl font-bold text-gray-900">
                {posts.filter(p => p.confidence > 0.7).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Posts ({posts.length})
          </h3>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No posts found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your filters or check back later.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {posts.map((post) => (
              <div key={post.id} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getPlatformIcon(post.platform)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900">{post.author}</p>
                        <span className="text-sm text-gray-500">•</span>
                        <p className="text-sm text-gray-500">{post.location}</p>
                        <span className="text-sm text-gray-500">•</span>
                        <p className="text-sm text-gray-500">{formatTimeAgo(post.createdAt)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSentimentColor(post.sentiment || 'NEUTRAL')}`}>
                          {post.sentiment}
                        </span>
                        <span className="text-xs text-gray-500">
                          {Math.round((post.confidence || 0) * 100)}% confidence
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-900">{post.content}</p>
                    <div className="mt-3 flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <span className="text-lg">{getHazardTypeIcon(post.hazardType || 'OTHER')}</span>
                        <span className="text-sm text-gray-600">{post.hazardType?.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}