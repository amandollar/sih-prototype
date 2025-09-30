export interface Report {
  id: string
  title: string
  description?: string
  hazardType: string
  severity: string
  latitude: number
  longitude: number
  location: string
  mediaUrls?: string
  status?: string
  verified: boolean
  createdAt: string
  updatedAt?: string
  user?: {
    name: string
    email: string
  }
}

export interface Hotspot {
  id: string
  latitude: number
  longitude: number
  radius: number
  intensity: number
  hazardType: string
  reportCount: number
  createdAt: string
}

export interface SocialMediaPost {
  id: string
  platform: string
  postId: string
  content: string
  author: string
  latitude?: number
  longitude?: number
  location?: string
  hazardType?: string
  sentiment?: string
  confidence: number
  isRelevant: boolean
  createdAt: string
  updatedAt?: string
  user?: {
    name: string
    email: string
  }
}

export interface ReportFormData {
  title: string
  description: string
  hazardType: string
  severity: string
  latitude: number
  longitude: number
  location: string
  mediaUrls?: string[]
}

export type UserRole = 'CITIZEN' | 'OFFICIAL' | 'ANALYST' | 'ADMIN'
export type HazardType = 'TSUNAMI' | 'STORM_SURGE' | 'HIGH_WAVES' | 'SWELL_SURGE' | 'COASTAL_CURRENT' | 'FLOODING' | 'COASTAL_DAMAGE' | 'ABNORMAL_TIDE' | 'OTHER'
export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type ReportStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'INVESTIGATING'
export type Sentiment = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | 'URGENT'
