'use client'

import { useState, useEffect } from 'react'
import { Twitter, Facebook, Youtube, MessageSquare, TrendingUp } from 'lucide-react'

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

  useEffect(() => {
    fetchSocialMediaPosts()
  }, [filters])

  const fetchSocialMediaPosts = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams()
      if (filters.platform !== 'ALL') params.append('platform', filters.platform)
      if (filters.sentiment !== 'ALL') params.append('sentiment', filters.sentiment)
      if (filters.hazardType !== 'ALL') params.append('hazardType', filters.hazardType)

      const response = await fetch(`/api/social-media?${params}`)
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching social media posts:', error)
      // Mock data for demonstration
      setPosts([
        {
          id: '1',
          platform: 'twitter',
          content: 'High waves observed at Marina Beach Chennai. Stay safe everyone! #OceanSafety #Chennai',
          author: '@coastal_watcher',
          location: 'Chennai, Tamil Nadu',
          hazardType: 'HIGH_WAVES',
          sentiment: 'URGENT',
          confidence: 0.85,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          platform: 'facebook',
          content: 'Unusual tide levels in Kochi today. Water is much higher than normal. Anyone else noticed this?',
          author: 'Kerala Coastal Community',
          location: 'Kochi, Kerala',
          hazardType: 'ABNORMAL_TIDE',
          sentiment: 'NEGATIVE',
          confidence: 0.72,
          createdAt: new Date(Date.now() - 1800000).toISOString()
        },
        {
          id: '3',
          platform: 'youtube',
          content: 'Storm surge causing flooding in low lying areas of Mumbai. Video shows the extent of damage.',
          author: 'Mumbai Weather Updates',
          location: 'Mumbai, Maharashtra',
          hazardType: 'STORM_SURGE',
          sentiment: 'URGENT',
          confidence: 0.91,
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: '4',
          platform: 'twitter',
          content: 'Tsunami warning issued for coastal areas! Please evacuate immediately! #TsunamiAlert #Emergency',
          author: '@INCOIS_Official',
          location: 'Hyderabad, Telangana',
          hazardType: 'TSUNAMI',
          sentiment: 'URGENT',
          confidence: 0.98,
          createdAt: new Date(Date.now() - 300000).toISOString()
        },
        {
          id: '5',
          platform: 'facebook',
          content: 'Beach erosion getting worse at Puri. The shoreline has receded significantly in the last month.',
          author: 'Puri Beach Conservation Group',
          location: 'Puri, Odisha',
          hazardType: 'COASTAL_DAMAGE',
          sentiment: 'NEGATIVE',
          confidence: 0.78,
          createdAt: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: '6',
          platform: 'twitter',
          content: 'Flooding reported in Visakhapatnam coastal areas. Water levels rising rapidly. Stay indoors!',
          author: '@VizagWeather',
          location: 'Visakhapatnam, Andhra Pradesh',
          hazardType: 'FLOODING',
          sentiment: 'URGENT',
          confidence: 0.89,
          createdAt: new Date(Date.now() - 5400000).toISOString()
        },
        {
          id: '7',
          platform: 'youtube',
          content: 'Strong coastal currents at Digha Beach today. Swimming not recommended. Currents are very dangerous.',
          author: 'Digha Beach Safety',
          location: 'Digha, West Bengal',
          hazardType: 'COASTAL_CURRENT',
          sentiment: 'NEGATIVE',
          confidence: 0.82,
          createdAt: new Date(Date.now() - 10800000).toISOString()
        },
        {
          id: '8',
          platform: 'twitter',
          content: 'Sea conditions are calm and normal at Goa beaches today. Perfect weather for beach activities!',
          author: '@GoaBeachUpdates',
          location: 'Goa',
          hazardType: 'ABNORMAL_TIDE',
          sentiment: 'POSITIVE',
          confidence: 0.65,
          createdAt: new Date(Date.now() - 9000000).toISOString()
        },
        {
          id: '9',
          platform: 'facebook',
          content: 'Coastal flooding alert for Mumbai and surrounding areas. High tide expected in next 2 hours.',
          author: 'Mumbai Coastal Safety',
          location: 'Mumbai, Maharashtra',
          hazardType: 'FLOODING',
          sentiment: 'URGENT',
          confidence: 0.93,
          createdAt: new Date(Date.now() - 1200000).toISOString()
        },
        {
          id: '10',
          platform: 'twitter',
          content: 'Ocean monitoring systems showing unusual wave patterns. Authorities are investigating. #OceanResearch',
          author: '@OceanResearchIndia',
          location: 'Kochi, Kerala',
          hazardType: 'ABNORMAL_TIDE',
          sentiment: 'NEUTRAL',
          confidence: 0.71,
          createdAt: new Date(Date.now() - 14400000).toISOString()
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

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
      case 'URGENT': return 'bg-red-100 text-red-800'
      case 'NEGATIVE': return 'bg-orange-100 text-orange-800'
      case 'POSITIVE': return 'bg-green-100 text-green-800'
      case 'NEUTRAL': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getHazardTypeIcon = (type: string) => {
    switch (type) {
      case 'TSUNAMI': return '🌊'
      case 'STORM_SURGE': return '⛈️'
      case 'HIGH_WAVES': return '🌊'
      case 'FLOODING': return '🌧️'
      case 'COASTAL_DAMAGE': return '🏗️'
      case 'ABNORMAL_TIDE': return '🌊'
      default: return '⚠️'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-black flex items-center">
            <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
            Social Media Monitor
          </h3>
          <button
            onClick={fetchSocialMediaPosts}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Refresh
          </button>
        </div>
        <p className="text-sm text-black mt-1">
          Real-time social media posts about ocean hazards
        </p>
      </div>

      {/* Filters */}
      <div className="p-4 border-b bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-black mb-1">Platform</label>
            <select
              value={filters.platform}
              onChange={(e) => setFilters({...filters, platform: e.target.value})}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
            >
              <option value="ALL">All Platforms</option>
              <option value="twitter">Twitter</option>
              <option value="facebook">Facebook</option>
              <option value="youtube">YouTube</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-black mb-1">Sentiment</label>
            <select
              value={filters.sentiment}
              onChange={(e) => setFilters({...filters, sentiment: e.target.value})}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
            >
              <option value="ALL">All Sentiments</option>
              <option value="URGENT">Urgent</option>
              <option value="NEGATIVE">Negative</option>
              <option value="POSITIVE">Positive</option>
              <option value="NEUTRAL">Neutral</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-black mb-1">Hazard Type</label>
            <select
              value={filters.hazardType}
              onChange={(e) => setFilters({...filters, hazardType: e.target.value})}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
            >
              <option value="ALL">All Types</option>
              <option value="TSUNAMI">Tsunami</option>
              <option value="STORM_SURGE">Storm Surge</option>
              <option value="HIGH_WAVES">High Waves</option>
              <option value="FLOODING">Flooding</option>
              <option value="ABNORMAL_TIDE">Abnormal Tide</option>
            </select>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="max-h-96 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center text-black">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
            Loading social media posts...
          </div>
        ) : posts.length === 0 ? (
          <div className="p-4 text-center text-black">
            No social media posts found
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {posts.map((post) => (
              <div key={post.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getPlatformIcon(post.platform)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-black truncate">
                        {post.author}
                      </p>
                      <div className="flex items-center space-x-2">
                        {post.hazardType && (
                          <span className="text-lg">
                            {getHazardTypeIcon(post.hazardType)}
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(post.sentiment || 'NEUTRAL')}`}>
                          {post.sentiment}
                        </span>
                        <span className="text-xs text-black">
                          {Math.round(post.confidence * 100)}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-black mb-2">{post.content}</p>
                    <div className="flex items-center justify-between text-xs text-black">
                      <span>{post.location}</span>
                      <span>{new Date(post.createdAt).toLocaleString()}</span>
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
