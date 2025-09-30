import { Report, Hotspot, SocialMediaPost } from '../types'

// Fake reports data
export const fakeReports: Report[] = [
  {
    id: '1',
    title: 'High Waves Alert - Mumbai Coast',
    description: 'Unusually high waves observed along Mumbai coastline. Waves reaching 4-5 meters height. Coastal areas advised to stay alert.',
    hazardType: 'HIGH_WAVES',
    severity: 'HIGH',
    latitude: 19.0760,
    longitude: 72.8777,
    location: 'Mumbai, Maharashtra',
    mediaUrls: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500',
    status: 'VERIFIED',
    verified: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    user: {
      name: 'Coastal Watch Mumbai',
      email: 'mumbai@coastalwatch.com'
    }
  },
  {
    id: '2',
    title: 'Storm Surge Warning - Chennai',
    description: 'Heavy storm surge expected due to cyclonic activity. Water levels may rise by 2-3 meters above normal.',
    hazardType: 'STORM_SURGE',
    severity: 'CRITICAL',
    latitude: 13.0827,
    longitude: 80.2707,
    location: 'Chennai, Tamil Nadu',
    mediaUrls: 'https://images.unsplash.com/photo-1506905925346-14bda5d4c4ad?w=500',
    status: 'VERIFIED',
    verified: true,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    user: {
      name: 'Tamil Nadu IMD',
      email: 'chennai@imd.gov.in'
    }
  },
  {
    id: '3',
    title: 'Tsunami Alert - Andaman Islands',
    description: 'Tsunami warning issued for Andaman and Nicobar Islands. Evacuation recommended for coastal areas.',
    hazardType: 'TSUNAMI',
    severity: 'CRITICAL',
    latitude: 11.7401,
    longitude: 92.6586,
    location: 'Port Blair, Andaman Islands',
    mediaUrls: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500',
    status: 'PENDING',
    verified: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    user: {
      name: 'Andaman Disaster Management',
      email: 'andaman@disaster.gov.in'
    }
  },
  {
    id: '4',
    title: 'Coastal Erosion - Goa',
    description: 'Significant coastal erosion observed in North Goa beaches. Several beach shacks affected.',
    hazardType: 'COASTAL_DAMAGE',
    severity: 'MEDIUM',
    latitude: 15.2993,
    longitude: 74.1240,
    location: 'Calangute, Goa',
    mediaUrls: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
    status: 'VERIFIED',
    verified: true,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    user: {
      name: 'Goa Coastal Authority',
      email: 'goa@coastal.gov.in'
    }
  },
  {
    id: '5',
    title: 'Abnormal Tide - Kerala',
    description: 'Unusual tidal patterns observed along Kerala coast. Tides 1.5m higher than normal.',
    hazardType: 'ABNORMAL_TIDE',
    severity: 'LOW',
    latitude: 9.9312,
    longitude: 76.2673,
    location: 'Kochi, Kerala',
    mediaUrls: 'https://images.unsplash.com/photo-1506905925346-14bda5d4c4ad?w=500',
    status: 'PENDING',
    verified: false,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    user: {
      name: 'Kerala Marine Research',
      email: 'kerala@marine.gov.in'
    }
  },
  {
    id: '6',
    title: 'Flooding Alert - Sundarbans',
    description: 'Heavy rainfall causing flooding in Sundarbans delta region. Water levels rising rapidly.',
    hazardType: 'FLOODING',
    severity: 'HIGH',
    latitude: 21.9497,
    longitude: 89.1833,
    location: 'Sundarbans, West Bengal',
    mediaUrls: 'https://images.unsplash.com/photo-1506905925346-14bda5d4c4ad?w=500',
    status: 'VERIFIED',
    verified: true,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    user: {
      name: 'Sundarbans Forest Dept',
      email: 'sundarbans@forest.gov.in'
    }
  }
]

// Fake hotspots data
export const fakeHotspots: Hotspot[] = [
  {
    id: 'hotspot_1',
    latitude: 19.0760,
    longitude: 72.8777,
    radius: 5000,
    intensity: 0.8,
    hazardType: 'HIGH_WAVES',
    reportCount: 3,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'hotspot_2',
    latitude: 13.0827,
    longitude: 80.2707,
    radius: 8000,
    intensity: 0.9,
    hazardType: 'STORM_SURGE',
    reportCount: 5,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'hotspot_3',
    latitude: 11.7401,
    longitude: 92.6586,
    radius: 12000,
    intensity: 1.0,
    hazardType: 'TSUNAMI',
    reportCount: 8,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
  }
]

// Fake social media posts
export const fakeSocialMediaPosts: SocialMediaPost[] = [
  {
    id: 'post_1',
    platform: 'TWITTER',
    postId: 'twitter_123456',
    content: 'Just witnessed massive waves hitting the Mumbai coastline! Stay safe everyone #OceanAlert #Mumbai',
    author: '@MumbaiCoastal',
    latitude: 19.0760,
    longitude: 72.8777,
    location: 'Mumbai, Maharashtra',
    hazardType: 'HIGH_WAVES',
    sentiment: 'URGENT',
    confidence: 0.92,
    isRelevant: true,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'post_2',
    platform: 'FACEBOOK',
    postId: 'fb_789012',
    content: 'Chennai residents please be cautious! Storm surge warning issued by IMD. Water levels expected to rise significantly.',
    author: 'Chennai Weather Updates',
    latitude: 13.0827,
    longitude: 80.2707,
    location: 'Chennai, Tamil Nadu',
    hazardType: 'STORM_SURGE',
    sentiment: 'NEGATIVE',
    confidence: 0.88,
    isRelevant: true,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'post_3',
    platform: 'YOUTUBE',
    postId: 'yt_345678',
    content: 'Tsunami alert for Andaman Islands! Please evacuate coastal areas immediately. This is not a drill!',
    author: 'Disaster Alert Channel',
    latitude: 11.7401,
    longitude: 92.6586,
    location: 'Port Blair, Andaman Islands',
    hazardType: 'TSUNAMI',
    sentiment: 'URGENT',
    confidence: 0.95,
    isRelevant: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'post_4',
    platform: 'INSTAGRAM',
    postId: 'ig_901234',
    content: 'Beautiful but dangerous waves at Calangute beach today. Coastal erosion is really concerning 😰 #Goa #OceanSafety',
    author: '@GoaBeachLife',
    latitude: 15.2993,
    longitude: 74.1240,
    location: 'Calangute, Goa',
    hazardType: 'COASTAL_DAMAGE',
    sentiment: 'NEGATIVE',
    confidence: 0.75,
    isRelevant: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'post_5',
    platform: 'TWITTER',
    postId: 'twitter_567890',
    content: 'Unusual tidal patterns in Kochi today. The ocean seems restless. Anyone else noticing this? #Kerala #Tides',
    author: '@KochiMarine',
    latitude: 9.9312,
    longitude: 76.2673,
    location: 'Kochi, Kerala',
    hazardType: 'ABNORMAL_TIDE',
    sentiment: 'NEUTRAL',
    confidence: 0.65,
    isRelevant: true,
    createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString()
  }
]

// Helper functions for filtering
export const getFilteredReports = (filters: {
  hazardType: string
  severity: string
  dateRange: string
  search?: string
}) => {
  let filtered = [...fakeReports]

  // Filter by hazard type
  if (filters.hazardType !== 'ALL') {
    filtered = filtered.filter(report => report.hazardType === filters.hazardType)
  }

  // Filter by severity
  if (filters.severity !== 'ALL') {
    filtered = filtered.filter(report => report.severity === filters.severity)
  }

  // Filter by date range
  const now = new Date()
  let dateFilter: Date
  switch (filters.dateRange) {
    case '1h':
      dateFilter = new Date(now.getTime() - 60 * 60 * 1000)
      break
    case '24h':
      dateFilter = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      break
    case '7d':
      dateFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      break
    case '30d':
      dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      break
    default:
      dateFilter = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  }

  filtered = filtered.filter(report => new Date(report.createdAt) >= dateFilter)

  // Filter by search
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(report => 
      report.title.toLowerCase().includes(searchLower) ||
      report.location.toLowerCase().includes(searchLower) ||
      (report.description && report.description.toLowerCase().includes(searchLower))
    )
  }

  return filtered
}

export const getFilteredHotspots = (dateRange: string) => {
  const now = new Date()
  let dateFilter: Date
  switch (dateRange) {
    case '1h':
      dateFilter = new Date(now.getTime() - 60 * 60 * 1000)
      break
    case '24h':
      dateFilter = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      break
    case '7d':
      dateFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      break
    case '30d':
      dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      break
    default:
      dateFilter = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  }

  return fakeHotspots.filter(hotspot => new Date(hotspot.createdAt) >= dateFilter)
}

export const getFilteredSocialMediaPosts = (filters: {
  platform: string
  hazardType: string
  sentiment: string
  dateRange: string
}) => {
  let filtered = [...fakeSocialMediaPosts]

  // Filter by platform
  if (filters.platform !== 'ALL') {
    filtered = filtered.filter(post => post.platform === filters.platform)
  }

  // Filter by hazard type
  if (filters.hazardType !== 'ALL') {
    filtered = filtered.filter(post => post.hazardType === filters.hazardType)
  }

  // Filter by sentiment
  if (filters.sentiment !== 'ALL') {
    filtered = filtered.filter(post => post.sentiment === filters.sentiment)
  }

  // Filter by date range
  const now = new Date()
  let dateFilter: Date
  switch (filters.dateRange) {
    case '1h':
      dateFilter = new Date(now.getTime() - 60 * 60 * 1000)
      break
    case '24h':
      dateFilter = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      break
    case '7d':
      dateFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      break
    case '30d':
      dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      break
    default:
      dateFilter = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  }

  return filtered.filter(post => new Date(post.createdAt) >= dateFilter)
}
