import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { HazardType, Severity } from '@/types'

// GET /api/reports - Fetch all reports with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const hazardType = searchParams.get('hazardType')
    const severity = searchParams.get('severity')
    const dateRange = searchParams.get('dateRange')
    const verified = searchParams.get('verified')

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

    const reports = await prisma.report.findMany({
      where: {
        ...(hazardType && hazardType !== 'ALL' ? { hazardType: hazardType as HazardType } : {}),
        ...(severity && severity !== 'ALL' ? { severity: severity as Severity } : {}),
        ...(verified ? { verified: verified === 'true' } : {}),
        ...(dateFilter ? { createdAt: { gte: dateFilter } } : {}),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(reports)
  } catch (error) {
    console.error('Error fetching reports:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}

// POST /api/reports - Create a new report
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      hazardType,
      severity,
      latitude,
      longitude,
      location,
      mediaUrls,
      userId
    } = body

    // Validate required fields
    if (!title || !description || !hazardType || !severity || !latitude || !longitude || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const report = await prisma.report.create({
      data: {
        title,
        description,
        hazardType: hazardType as HazardType,
        severity: severity as Severity,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        location,
        mediaUrls: JSON.stringify(mediaUrls || []),
        userId: userId || 'anonymous', // For demo purposes
        status: 'PENDING',
        verified: false
      }
    })

    return NextResponse.json(report, { status: 201 })
  } catch (error) {
    console.error('Error creating report:', error)
    return NextResponse.json(
      { error: 'Failed to create report' },
      { status: 500 }
    )
  }
}
