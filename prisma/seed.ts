import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌊 Seeding Ocean Hazard Platform database...')

  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'citizen1@example.com',
        name: 'Rajesh Kumar',
        role: 'CITIZEN'
      }
    }),
    prisma.user.create({
      data: {
        email: 'official1@incois.gov.in',
        name: 'Dr. Priya Sharma',
        role: 'OFFICIAL'
      }
    }),
    prisma.user.create({
      data: {
        email: 'analyst1@incois.gov.in',
        name: 'Amit Patel',
        role: 'ANALYST'
      }
    })
  ])

  console.log('✅ Created users')

  // Create sample reports
  const reports = await Promise.all([
    prisma.report.create({
      data: {
        title: 'High waves observed at Marina Beach',
        description: 'Waves are unusually high today, reaching up to 3 meters. Beach activities have been suspended for safety.',
        hazardType: 'HIGH_WAVES',
        severity: 'HIGH',
        latitude: 13.0400,
        longitude: 80.2800,
        location: 'Marina Beach, Chennai, Tamil Nadu',
        mediaUrls: JSON.stringify(['https://images.unsplash.com/photo-1544551763-46a013bb2dcc?w=400&h=300&fit=crop']),
        status: 'VERIFIED',
        verified: true,
        userId: users[0].id
      }
    }),
    prisma.report.create({
      data: {
        title: 'Storm surge causing flooding in Mumbai',
        description: 'Heavy storm surge has caused flooding in low-lying areas near Gateway of India. Water levels rising rapidly.',
        hazardType: 'STORM_SURGE',
        severity: 'CRITICAL',
        latitude: 19.0760,
        longitude: 72.8777,
        location: 'Gateway of India, Mumbai, Maharashtra',
        mediaUrls: JSON.stringify(['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop']),
        status: 'VERIFIED',
        verified: true,
        userId: users[1].id
      }
    }),
    prisma.report.create({
      data: {
        title: 'Coastal erosion at Puri Beach',
        description: 'Significant beach erosion observed. The shoreline has receded by approximately 50 meters in the last month.',
        hazardType: 'COASTAL_DAMAGE',
        severity: 'HIGH',
        latitude: 19.8134,
        longitude: 85.8312,
        location: 'Puri Beach, Odisha',
        mediaUrls: JSON.stringify([]),
        status: 'PENDING',
        verified: false,
        userId: users[0].id
      }
    }),
    prisma.report.create({
      data: {
        title: 'Tsunami warning - high alert',
        description: 'Tsunami warning issued based on seismic activity. All coastal areas advised to evacuate immediately.',
        hazardType: 'TSUNAMI',
        severity: 'CRITICAL',
        latitude: 12.9716,
        longitude: 77.5946,
        location: 'Bangalore, Karnataka',
        mediaUrls: JSON.stringify([]),
        status: 'VERIFIED',
        verified: true,
        userId: users[1].id
      }
    }),
    prisma.report.create({
      data: {
        title: 'Flooding in Visakhapatnam coastal areas',
        description: 'Heavy rainfall and high tide causing flooding in low-lying coastal areas. Residents advised to move to higher ground.',
        hazardType: 'FLOODING',
        severity: 'HIGH',
        latitude: 17.6868,
        longitude: 83.2185,
        location: 'Rushikonda Beach, Visakhapatnam, Andhra Pradesh',
        mediaUrls: JSON.stringify(['https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop']),
        status: 'INVESTIGATING',
        verified: false,
        userId: users[0].id
      }
    }),
    prisma.report.create({
      data: {
        title: 'Extreme tsunami devastation in coastal areas',
        description: 'Massive tsunami waves causing widespread devastation along the southern coast. Emergency evacuation in progress.',
        hazardType: 'TSUNAMI',
        severity: 'CRITICAL',
        latitude: 8.0883,
        longitude: 77.5385,
        location: 'Kanyakumari, Tamil Nadu',
        mediaUrls: JSON.stringify(['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop']),
        status: 'VERIFIED',
        verified: true,
        userId: users[1].id
      }
    })
  ])

  console.log('✅ Created reports')

  // Create sample social media posts
  const socialPosts = await Promise.all([
    prisma.socialMediaPost.create({
      data: {
        platform: 'twitter',
        postId: 'tweet_123456',
        content: 'High waves observed at Marina Beach Chennai. Stay safe everyone! #OceanSafety #Chennai',
        author: '@coastal_watcher',
        latitude: 13.0400,
        longitude: 80.2800,
        location: 'Chennai, Tamil Nadu',
        hazardType: 'HIGH_WAVES',
        sentiment: 'URGENT',
        confidence: 0.85,
        isRelevant: true,
        userId: users[0].id
      }
    }),
    prisma.socialMediaPost.create({
      data: {
        platform: 'facebook',
        postId: 'fb_post_789',
        content: 'Unusual tide levels in Kochi today. Water is much higher than normal. Anyone else noticed this?',
        author: 'Kerala Coastal Community',
        latitude: 9.9312,
        longitude: 76.2673,
        location: 'Kochi, Kerala',
        hazardType: 'ABNORMAL_TIDE',
        sentiment: 'NEGATIVE',
        confidence: 0.72,
        isRelevant: true,
        userId: users[0].id
      }
    }),
    prisma.socialMediaPost.create({
      data: {
        platform: 'youtube',
        postId: 'yt_video_456',
        content: 'Storm surge causing flooding in low lying areas of Mumbai. Video shows the extent of damage.',
        author: 'Mumbai Weather Updates',
        latitude: 19.0760,
        longitude: 72.8777,
        location: 'Mumbai, Maharashtra',
        hazardType: 'STORM_SURGE',
        sentiment: 'URGENT',
        confidence: 0.91,
        isRelevant: true,
        userId: users[1].id
      }
    }),
    prisma.socialMediaPost.create({
      data: {
        platform: 'twitter',
        postId: 'tweet_789012',
        content: 'Tsunami warning issued for coastal areas! Please evacuate immediately! #TsunamiAlert #Emergency',
        author: '@INCOIS_Official',
        latitude: 12.9716,
        longitude: 77.5946,
        location: 'Hyderabad, Telangana',
        hazardType: 'TSUNAMI',
        sentiment: 'URGENT',
        confidence: 0.98,
        isRelevant: true,
        userId: users[1].id
      }
    }),
    prisma.socialMediaPost.create({
      data: {
        platform: 'facebook',
        postId: 'fb_post_101112',
        content: 'Beach erosion getting worse at Puri. The shoreline has receded significantly in the last month.',
        author: 'Puri Beach Conservation Group',
        latitude: 19.8134,
        longitude: 85.8312,
        location: 'Puri, Odisha',
        hazardType: 'COASTAL_DAMAGE',
        sentiment: 'NEGATIVE',
        confidence: 0.78,
        isRelevant: true,
        userId: users[2].id
      }
    })
  ])

  console.log('✅ Created social media posts')

  // Create sample hotspots
  const hotspots = await Promise.all([
    prisma.hotspot.create({
      data: {
        latitude: 13.0400,
        longitude: 80.2800,
        radius: 8000,
        intensity: 0.9,
        hazardType: 'HIGH_WAVES',
        reportCount: 12
      }
    }),
    prisma.hotspot.create({
      data: {
        latitude: 19.0760,
        longitude: 72.8777,
        radius: 12000,
        intensity: 0.95,
        hazardType: 'STORM_SURGE',
        reportCount: 18
      }
    }),
    prisma.hotspot.create({
      data: {
        latitude: 19.8134,
        longitude: 85.8312,
        radius: 6000,
        intensity: 0.7,
        hazardType: 'COASTAL_DAMAGE',
        reportCount: 8
      }
    }),
    prisma.hotspot.create({
      data: {
        latitude: 12.9716,
        longitude: 77.5946,
        radius: 15000,
        intensity: 1.0,
        hazardType: 'TSUNAMI',
        reportCount: 25
      }
    })
  ])

  console.log('✅ Created hotspots')

  console.log('🎉 Database seeding completed successfully!')
  console.log(`📊 Created:`)
  console.log(`   - ${users.length} users`)
  console.log(`   - ${reports.length} reports`)
  console.log(`   - ${socialPosts.length} social media posts`)
  console.log(`   - ${hotspots.length} hotspots`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
