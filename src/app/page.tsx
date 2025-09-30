'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { MapPin, AlertTriangle, Users, TrendingUp, Filter, Plus } from 'lucide-react'
import ReportForm from '../components/ReportForm'
import SocialMediaMonitor from '../components/SocialMediaMonitor'
import ReportCard from '../components/ReportCard'
import { Report, Hotspot, ReportFormData } from '../types'

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('../components/MapComponent'), { 
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">Loading Map...</div>
})

export default function Home() {
  const [reports, setReports] = useState<Report[]>([])
  const [hotspots, setHotspots] = useState<Hotspot[]>([])
  const [isReportFormOpen, setIsReportFormOpen] = useState(false)
  const [filters, setFilters] = useState({
    hazardType: 'ALL',
    severity: 'ALL',
    dateRange: '24h'
  })

  // Fetch data from APIs
  useEffect(() => {
    fetchReports()
    fetchHotspots()
  }, [filters])

  // Auto-refresh data every 30 seconds to simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchReports()
      fetchHotspots()
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [filters])

  const fetchReports = async () => {
    try {
      const params = new URLSearchParams()
      if (filters.hazardType !== 'ALL') params.append('hazardType', filters.hazardType)
      if (filters.severity !== 'ALL') params.append('severity', filters.severity)
      params.append('dateRange', filters.dateRange)

      const response = await fetch(`/api/reports?${params}`)
      const data = await response.json()
      setReports(data)
    } catch (error) {
      console.error('Error fetching reports:', error)
      // Fallback to mock data
      setReports([
        {
          id: "1",
          title: "High waves observed at Marina Beach",
          hazardType: "HIGH_WAVES",
          severity: "HIGH",
          latitude: 13.0400,
          longitude: 80.2800,
          location: "Marina Beach, Chennai",
          createdAt: new Date().toISOString(),
          verified: true,
          mediaUrls: '["https://images.unsplash.com/photo-1544551763-46a013bb2dcc?w=400&h=300&fit=crop"]'
        },
        {
          id: "2",
          title: "Unusual tide levels in Kochi",
          hazardType: "ABNORMAL_TIDE",
          severity: "MEDIUM",
          latitude: 9.9312,
          longitude: 76.2673,
          location: "Kochi, Kerala",
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          verified: false,
          mediaUrls: '["https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"]'
        },
        {
          id: "3",
          title: "Storm surge causing flooding in Mumbai",
          hazardType: "STORM_SURGE",
          severity: "CRITICAL",
          latitude: 19.0760,
          longitude: 72.8777,
          location: "Gateway of India, Mumbai",
          createdAt: new Date(Date.now() - 1800000).toISOString(),
          verified: true,
          mediaUrls: '["https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop"]'
        },
        {
          id: "4",
          title: "Coastal erosion at Puri Beach",
          hazardType: "COASTAL_DAMAGE",
          severity: "HIGH",
          latitude: 19.8134,
          longitude: 85.8312,
          location: "Puri Beach, Odisha",
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          verified: true,
          mediaUrls: '["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop"]'
        },
        {
          id: "5",
          title: "Abnormal sea behavior in Goa",
          hazardType: "ABNORMAL_TIDE",
          severity: "LOW",
          latitude: 15.2993,
          longitude: 74.1240,
          location: "Calangute Beach, Goa",
          createdAt: new Date(Date.now() - 9000000).toISOString(),
          verified: false,
          mediaUrls: '["https://images.unsplash.com/photo-1544551763-46a013bb2dcc?w=400&h=300&fit=crop"]'
        },
        {
          id: "6",
          title: "Tsunami warning - high alert",
          hazardType: "TSUNAMI",
          severity: "CRITICAL",
          latitude: 12.9716,
          longitude: 77.5946,
          location: "Bangalore, Karnataka",
          createdAt: new Date(Date.now() - 300000).toISOString(),
          verified: true,
          mediaUrls: '["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"]'
        },
        {
          id: "7",
          title: "Flooding in low-lying areas of Visakhapatnam",
          hazardType: "FLOODING",
          severity: "HIGH",
          latitude: 17.6868,
          longitude: 83.2185,
          location: "Rushikonda Beach, Visakhapatnam",
          createdAt: new Date(Date.now() - 5400000).toISOString(),
          verified: true,
          mediaUrls: '["https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop"]'
        },
        {
          id: "8",
          title: "Strong coastal currents at Digha",
          hazardType: "COASTAL_CURRENT",
          severity: "MEDIUM",
          latitude: 21.6291,
          longitude: 87.5095,
          location: "Digha Beach, West Bengal",
          createdAt: new Date(Date.now() - 10800000).toISOString(),
          verified: false,
          mediaUrls: '["https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"]'
        },
        {
          id: "9",
          title: "Extreme tsunami devastation in coastal areas",
          hazardType: "TSUNAMI",
          severity: "CRITICAL",
          latitude: 8.0883,
          longitude: 77.5385,
          location: "Kanyakumari, Tamil Nadu",
          createdAt: new Date(Date.now() - 600000).toISOString(),
          verified: true,
          mediaUrls: '["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"]'
        }
      ])
    }
  }

  const fetchHotspots = async () => {
    try {
      const params = new URLSearchParams()
      params.append('dateRange', filters.dateRange)

      const response = await fetch(`/api/hotspots?${params}`)
      const data = await response.json()
      setHotspots(data)
    } catch (error) {
      console.error('Error fetching hotspots:', error)
      // Fallback to mock data
      setHotspots([
        {
          id: "1",
          latitude: 13.0400,
          longitude: 80.2800,
          radius: 8000,
          intensity: 0.9,
          hazardType: "HIGH_WAVES",
          reportCount: 12,
          createdAt: new Date().toISOString()
        },
        {
          id: "2",
          latitude: 19.0760,
          longitude: 72.8777,
          radius: 12000,
          intensity: 0.95,
          hazardType: "STORM_SURGE",
          reportCount: 18,
          createdAt: new Date(Date.now() - 1800000).toISOString()
        },
        {
          id: "3",
          latitude: 19.8134,
          longitude: 85.8312,
          radius: 6000,
          intensity: 0.7,
          hazardType: "COASTAL_DAMAGE",
          reportCount: 8,
          createdAt: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: "4",
          latitude: 17.6868,
          longitude: 83.2185,
          radius: 10000,
          intensity: 0.8,
          hazardType: "FLOODING",
          reportCount: 15,
          createdAt: new Date(Date.now() - 5400000).toISOString()
        },
        {
          id: "5",
          latitude: 12.9716,
          longitude: 77.5946,
          radius: 15000,
          intensity: 1.0,
          hazardType: "TSUNAMI",
          reportCount: 25,
          createdAt: new Date(Date.now() - 300000).toISOString()
        }
      ])
    }
  }

  const handleReportSubmit = async (reportData: ReportFormData) => {
    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      })

      if (response.ok) {
        // Refresh reports after successful submission
        fetchReports()
        fetchHotspots()
      }
    } catch (error) {
      console.error('Error submitting report:', error)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'LOW': return 'bg-green-500'
      case 'MEDIUM': return 'bg-yellow-500'
      case 'HIGH': return 'bg-orange-500'
      case 'CRITICAL': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getHazardTypeIcon = (type: string) => {
    switch (type) {
      case 'TSUNAMI': return '🌊'
      case 'STORM_SURGE': return '⛈️'
      case 'HIGH_WAVES': return '🌊'
      case 'FLOODING': return '🌧️'
      case 'COASTAL_DAMAGE': return '🏗️'
      default: return '⚠️'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">Yamuna Yuki</h1>
                <p className="text-sm text-black">Ocean Hazard Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-black">Live Monitoring</span>
              </div>
              <button 
                onClick={() => setIsReportFormOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Report Hazard</span>
              </button>
              <button 
                onClick={async () => {
                  try {
                    await fetch('/api/seed', { method: 'POST' })
                    fetchReports()
                    fetchHotspots()
                  } catch (error) {
                    console.error('Error loading sample data:', error)
                  }
                }}
                className="text-gray-600 hover:text-gray-900"
                title="Load Sample Data"
              >
                <Users className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-black">Active Reports</p>
                <p className="text-2xl font-semibold text-black">{reports.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-black">Hotspots</p>
                <p className="text-2xl font-semibold text-black">{hotspots.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-black">Verified</p>
                <p className="text-2xl font-semibold text-black">
                  {reports.filter(r => r.verified).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-black">Contributors</p>
                <p className="text-2xl font-semibold text-black">2,847</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-black">Filters</h3>
            <Filter className="w-5 h-5 text-black" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Hazard Type</label>
              <select 
                value={filters.hazardType}
                onChange={(e) => setFilters({...filters, hazardType: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="ALL">All Types</option>
                <option value="TSUNAMI">Tsunami</option>
                <option value="STORM_SURGE">Storm Surge</option>
                <option value="HIGH_WAVES">High Waves</option>
                <option value="FLOODING">Flooding</option>
                <option value="COASTAL_DAMAGE">Coastal Damage</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Severity</label>
              <select 
                value={filters.severity}
                onChange={(e) => setFilters({...filters, severity: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="ALL">All Severities</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Time Range</label>
              <select 
                value={filters.dateRange}
                onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Map and Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold text-black">Live Hazard Map</h3>
                <p className="text-sm text-black">Real-time ocean hazard reports and social media activity</p>
              </div>
              <div className="h-96">
                <MapComponent reports={reports} hotspots={hotspots} />
              </div>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-black">Recent Reports</h3>
            </div>
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              {reports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  getSeverityColor={getSeverityColor}
                  getHazardTypeIcon={getHazardTypeIcon}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Social Media Monitor */}
        <div className="mt-6">
          <SocialMediaMonitor />
        </div>
      </div>

      {/* Report Form Modal */}
      <ReportForm
        isOpen={isReportFormOpen}
        onClose={() => setIsReportFormOpen(false)}
        onSubmit={handleReportSubmit}
      />
    </div>
  )
}
