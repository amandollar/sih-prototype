import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { HazardType, Sentiment } from '@/types'
import { processSocialMediaPost } from '@/lib/nlp'

// GET /api/social-media - Fetch social media posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const platform = searchParams.get('platform')
    const hazardType = searchParams.get('hazardType')
    const isRelevant = searchParams.get('isRelevant')
    const dateRange = searchParams.get('dateRange')

    // Calculate date filter
    let dateFilter: Date | undefined
    if (dateRange) {
      const now = new Date()
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
      }
    }

    const posts = await prisma.socialMediaPost.findMany({
      where: {
        ...(platform ? { platform } : {}),
        ...(hazardType && hazardType !== 'ALL' ? { hazardType: hazardType as HazardType } : {}),
        ...(isRelevant ? { isRelevant: isRelevant === 'true' } : {}),
        ...(dateFilter ? { createdAt: { gte: dateFilter } } : {}),
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 100 // Limit to 100 most recent posts
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching social media posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch social media posts' },
      { status: 500 }
    )
  }
}

// POST /api/social-media - Process and store social media post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, platform, author, location, latitude, longitude } = body

    if (!content || !platform || !author) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Process the post using NLP
    const processed = processSocialMediaPost({
      content,
      platform,
      author,
      location
    })

    // Only store if relevant to hazards
    if (!processed.isRelevant) {
      return NextResponse.json(
        { message: 'Post not relevant to ocean hazards' },
        { status: 200 }
      )
    }

    const post = await prisma.socialMediaPost.create({
      data: {
        platform,
        postId: `post_${Date.now()}`, // Generate unique ID
        content,
        author,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        location: processed.extractedLocation || location || null,
        hazardType: processed.hazardType as HazardType,
        sentiment: processed.sentiment as Sentiment,
        confidence: processed.confidence,
        isRelevant: true
      }
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error processing social media post:', error)
    return NextResponse.json(
      { error: 'Failed to process social media post' },
      { status: 500 }
    )
  }
}
