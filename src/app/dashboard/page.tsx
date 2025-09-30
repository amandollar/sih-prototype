'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, MapPin, Users, TrendingUp, CheckCircle } from 'lucide-react'
import { Report, Hotspot } from '../../types'
import { fakeReports, fakeHotspots } from '../../lib/fakeData'

export default function Dashboard() {
  const [reports, setReports] = useState<Report[]>([])
  const [hotspots, setHotspots] = useState<Hotspot[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setReports(fakeReports)
      setHotspots(fakeHotspots)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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
      value: Array.isArray(reports) ? reports.filter(r => r.verified).length : 0,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Critical Alerts',
      value: Array.isArray(reports) ? reports.filter(r => r.severity === 'CRITICAL').length : 0,
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
      {/* Hero Section with Ocean Images */}
      <section className="relative h-96 rounded-2xl overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/50 to-cyan-900/70" />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Ocean Hazard
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                Monitoring Dashboard
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Real-time ocean hazard monitoring and reporting system powered by AI and community intelligence
            </p>
          </div>
        </div>
      </section>

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">System Overview</h2>
        <p className="mt-2 text-gray-600">
          Monitor and track ocean hazards in real-time
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

      {/* Features Section with Ocean Images */}
      <div className="bg-white rounded-lg shadow p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Advanced ocean monitoring capabilities powered by cutting-edge technology and community intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 - Real-time Monitoring */}
          <div className="relative group overflow-hidden rounded-2xl">
            <div 
              className="h-48 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-14bda5d4c4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-6 w-6 text-yellow-400 mr-2" />
                <h3 className="text-xl font-bold">Real-time Monitoring</h3>
              </div>
              <p className="text-sm text-white/90">
                24/7 continuous monitoring of ocean conditions with instant alerts for hazardous situations
              </p>
            </div>
          </div>

          {/* Feature 2 - Interactive Maps */}
          <div className="relative group overflow-hidden rounded-2xl">
            <div 
              className="h-48 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center mb-2">
                <MapPin className="h-6 w-6 text-blue-400 mr-2" />
                <h3 className="text-xl font-bold">Interactive Maps</h3>
              </div>
              <p className="text-sm text-white/90">
                Visualize hazards in real-time with detailed mapping and location-based alerts
              </p>
            </div>
          </div>

          {/* Feature 3 - Community Intelligence */}
          <div className="relative group overflow-hidden rounded-2xl">
            <div 
              className="h-48 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center mb-2">
                <Users className="h-6 w-6 text-green-400 mr-2" />
                <h3 className="text-xl font-bold">Community Reports</h3>
              </div>
              <p className="text-sm text-white/90">
                Crowdsourced intelligence from coastal communities and verified by experts
              </p>
            </div>
          </div>

          {/* Feature 4 - AI Analysis */}
          <div className="relative group overflow-hidden rounded-2xl">
            <div 
              className="h-48 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-6 w-6 text-purple-400 mr-2" />
                <h3 className="text-xl font-bold">AI-Powered Analysis</h3>
              </div>
              <p className="text-sm text-white/90">
                Machine learning algorithms analyze patterns and predict potential hazards
              </p>
            </div>
          </div>

          {/* Feature 5 - Early Warning System */}
          <div className="relative group overflow-hidden rounded-2xl">
            <div 
              className="h-48 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-6 w-6 text-red-400 mr-2" />
                <h3 className="text-xl font-bold">Early Warning System</h3>
              </div>
              <p className="text-sm text-white/90">
                Advanced warning system with multiple notification channels for maximum safety
              </p>
            </div>
          </div>

          {/* Feature 6 - Data Visualization */}
          <div className="relative group overflow-hidden rounded-2xl">
            <div 
              className="h-48 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-cyan-400 rounded mr-2 flex items-center justify-center">
                  <span className="text-black text-xs font-bold">📊</span>
                </div>
                <h3 className="text-xl font-bold">Data Visualization</h3>
              </div>
              <p className="text-sm text-white/90">
                Comprehensive charts and graphs for detailed analysis and trend monitoring
              </p>
            </div>
          </div>
        </div>
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
