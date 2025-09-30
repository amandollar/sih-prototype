'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, MapPin, Users, TrendingUp, CheckCircle } from 'lucide-react'
import { Report, Hotspot } from '../../types'

export default function Dashboard() {
  const [reports, setReports] = useState<Report[]>([])
  const [hotspots, setHotspots] = useState<Hotspot[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [reportsRes, hotspotsRes] = await Promise.all([
        fetch('/api/reports?dateRange=24h'),
        fetch('/api/hotspots?dateRange=24h')
      ])
      
      const reportsData = await reportsRes.json()
      const hotspotsData = await hotspotsRes.json()
      
      setReports(reportsData)
      setHotspots(hotspotsData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
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
      case 'SWELL_SURGE': return '🌊'
      case 'COASTAL_CURRENT': return '🌊'
      case 'FLOODING': return '🌧️'
      case 'COASTAL_DAMAGE': return '🏗️'
      case 'ABNORMAL_TIDE': return '🌊'
      default: return '⚠️'
    }
  }

  const stats = [
    {
      name: 'Total Reports',
      value: reports.length,
      icon: AlertTriangle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Active Hotspots',
      value: hotspots.length,
      icon: MapPin,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      name: 'Verified Reports',
      value: reports.filter(r => r.verified).length,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Critical Alerts',
      value: reports.filter(r => r.severity === 'CRITICAL').length,
      icon: TrendingUp,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Real-time ocean hazard monitoring and reporting system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
        </div>
        <div className="p-6">
          {reports.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No reports</h3>
              <p className="mt-1 text-sm text-gray-500">No reports found for the last 24 hours.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.slice(0, 5).map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{getHazardTypeIcon(report.hazardType)}</span>
                    <div>
                      <h3 className="font-medium text-gray-900">{report.title}</h3>
                      <p className="text-sm text-gray-600">{report.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getSeverityColor(report.severity)}`}>
                      {report.severity}
                    </span>
                    {report.verified && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    <span className="text-xs text-gray-500">
                      {new Date(report.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/reports"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <AlertTriangle className="h-6 w-6 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">View All Reports</h3>
              <p className="text-sm text-gray-600">Browse and filter reports</p>
            </div>
          </a>
          
          <a
            href="/map"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MapPin className="h-6 w-6 text-green-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">View Map</h3>
              <p className="text-sm text-gray-600">Interactive hazard map</p>
            </div>
          </a>
          
          <a
            href="/social"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Users className="h-6 w-6 text-purple-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Social Media</h3>
              <p className="text-sm text-gray-600">Monitor social posts</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
