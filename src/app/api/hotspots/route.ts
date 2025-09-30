import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Report, Hotspot } from '@/types'

// GET /api/hotspots - Generate hotspots based on report density
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dateRange = searchParams.get('dateRange') || '24h'

    // Calculate date filter
    let dateFilter: Date
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
      default:
        dateFilter = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    }

    // Get all reports within the date range
    const reports = await prisma.report.findMany({
      where: {
        createdAt: { gte: dateFilter }
      },
      select: {
        id: true,
        title: true,
        location: true,
        latitude: true,
        longitude: true,
        hazardType: true,
        severity: true,
        verified: true,
        createdAt: true
      }
    })

    // Convert dates to strings for the Report interface
    const reportsWithStringDates = reports.map((report: {
      id: string
      title: string
      location: string
      latitude: number
      longitude: number
      hazardType: string
      severity: string
      verified: boolean
      createdAt: Date
    }) => ({
      ...report,
      createdAt: report.createdAt.toISOString()
    }))

    // Generate hotspots using clustering algorithm
    const hotspots = generateHotspots(reportsWithStringDates)

    return NextResponse.json(hotspots)
  } catch (error) {
    console.error('Error generating hotspots:', error)
    return NextResponse.json(
      { error: 'Failed to generate hotspots' },
      { status: 500 }
    )
  }
}

// Simple clustering algorithm to generate hotspots
function generateHotspots(reports: Report[]): Hotspot[] {
  if (reports.length === 0) return []

  const hotspots: Hotspot[] = []
  const processed = new Set<number>()

  // Group reports by proximity (within 10km)
  const clusterRadius = 10000 // 10km in meters

  for (let i = 0; i < reports.length; i++) {
    if (processed.has(i)) continue

    const cluster = [reports[i]]
    processed.add(i)

    // Find nearby reports
    for (let j = i + 1; j < reports.length; j++) {
      if (processed.has(j)) continue

      const distance = calculateDistance(
        reports[i].latitude,
        reports[i].longitude,
        reports[j].latitude,
        reports[j].longitude
      )

      if (distance <= clusterRadius) {
        cluster.push(reports[j])
        processed.add(j)
      }
    }

    // Create hotspot if cluster has enough reports
    if (cluster.length >= 2) {
      const hotspot = createHotspotFromCluster(cluster)
      hotspots.push(hotspot)
    }
  }

  return hotspots
}

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000 // Earth's radius in meters
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

// Create hotspot from cluster of reports
function createHotspotFromCluster(cluster: Report[]): Hotspot {
  // Calculate centroid
  const avgLat = cluster.reduce((sum, report) => sum + report.latitude, 0) / cluster.length
  const avgLon = cluster.reduce((sum, report) => sum + report.longitude, 0) / cluster.length

  // Calculate intensity based on report count and severity
  const severityWeights: { [key: string]: number } = { LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 }
  const totalWeight = cluster.reduce((sum, report) => 
    sum + (severityWeights[report.severity] || 1), 0
  )
  const intensity = Math.min(totalWeight / cluster.length / 4, 1) // Normalize to 0-1

  // Determine dominant hazard type
  const hazardCounts: { [key: string]: number } = {}
  cluster.forEach(report => {
    hazardCounts[report.hazardType] = (hazardCounts[report.hazardType] || 0) + 1
  })
  const dominantHazard = Object.keys(hazardCounts).reduce((a, b) => 
    hazardCounts[a] > hazardCounts[b] ? a : b
  )

  // Calculate radius based on cluster spread
  let maxDistance = 0
  for (let i = 0; i < cluster.length; i++) {
    for (let j = i + 1; j < cluster.length; j++) {
      const distance = calculateDistance(
        cluster[i].latitude,
        cluster[i].longitude,
        cluster[j].latitude,
        cluster[j].longitude
      )
      maxDistance = Math.max(maxDistance, distance)
    }
  }

  return {
    id: `hotspot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    latitude: avgLat,
    longitude: avgLon,
    radius: Math.max(maxDistance / 2, 2000), // Minimum 2km radius
    intensity,
    hazardType: dominantHazard,
    reportCount: cluster.length,
    createdAt: new Date().toISOString()
  }
}
