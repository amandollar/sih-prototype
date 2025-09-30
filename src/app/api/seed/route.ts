import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    // Add some additional sample reports without userId to avoid relation issues
    const additionalReports = await Promise.all([
      prisma.report.create({
        data: {
          title: 'Swell surge affecting fishing activities',
          description: 'Large swells making it difficult for fishing boats to operate safely. Local fishermen advised to stay ashore.',
          hazardType: 'SWELL_SURGE',
          severity: 'MEDIUM',
          latitude: 15.2993,
          longitude: 74.1240,
          location: 'Calangute Beach, Goa',
          mediaUrls: JSON.stringify(['https://images.unsplash.com/photo-1544551763-46a013bb2dcc?w=400&h=300&fit=crop']),
          status: 'PENDING',
          verified: false
        }
      }),
      prisma.report.create({
        data: {
          title: 'Coastal flooding in low-lying areas',
          description: 'Heavy rainfall combined with high tide causing flooding in residential areas near the coast.',
          hazardType: 'FLOODING',
          severity: 'HIGH',
          latitude: 21.6291,
          longitude: 87.5095,
          location: 'Digha Beach, West Bengal',
          mediaUrls: JSON.stringify(['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop']),
          status: 'VERIFIED',
          verified: true
        }
      }),
      prisma.report.create({
        data: {
          title: 'Unusual sea color observed',
          description: 'Sea water appears unusually dark and murky. Possible pollution or natural phenomenon. Authorities investigating.',
          hazardType: 'OTHER',
          severity: 'LOW',
          latitude: 8.0883,
          longitude: 77.5385,
          location: 'Kanyakumari, Tamil Nadu',
          mediaUrls: JSON.stringify(['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop']),
          status: 'INVESTIGATING',
          verified: false
        }
      })
    ])

    // Add more social media posts
    const additionalSocialPosts = await Promise.all([
      prisma.socialMediaPost.create({
        data: {
          platform: 'TWITTER',
          postId: 'tweet_123456',
          content: 'Waves are getting really high at Puri Beach. Stay safe everyone! #OceanSafety #Puri',
          author: '@beach_watcher',
          location: 'Puri, Odisha',
          hazardType: 'HIGH_WAVES',
          sentiment: 'URGENT',
          confidence: 0.92,
          isRelevant: true
        }
      }),
      prisma.socialMediaPost.create({
        data: {
          platform: 'FACEBOOK',
          postId: 'fb_post_789012',
          content: 'Coastal flooding reported in several areas. Emergency services are responding. Please avoid low-lying areas.',
          author: 'Coastal Emergency Services',
          location: 'Mumbai, Maharashtra',
          hazardType: 'FLOODING',
          sentiment: 'URGENT',
          confidence: 0.88,
          isRelevant: true
        }
      }),
      prisma.socialMediaPost.create({
        data: {
          platform: 'YOUTUBE',
          postId: 'yt_video_345678',
          content: 'Tsunami warning issued for coastal areas. Please evacuate to higher ground immediately.',
          author: 'Emergency Broadcast',
          location: 'Chennai, Tamil Nadu',
          hazardType: 'TSUNAMI',
          sentiment: 'URGENT',
          confidence: 0.95,
          isRelevant: true
        }
      })
    ])

    return NextResponse.json({
      success: true,
      message: 'Sample data loaded successfully',
      data: {
        reports: additionalReports.length,
        socialPosts: additionalSocialPosts.length
      }
    })
  } catch (error) {
    console.error('Error adding sample data:', error)
    return NextResponse.json(
      { error: 'Failed to add sample data' },
      { status: 500 }
    )
  }
}
