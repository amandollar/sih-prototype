'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { MapPin, AlertTriangle, Filter, RefreshCw } from 'lucide-react'
import { Report, Hotspot } from '../../types'

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('../../components/MapComponent'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-center">
        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Loading Map...</p>
      </div>
    </div>
  )
})

export default function Map() {
  const [reports, setReports] = useState<Report[]>([])
  const [hotspots, setHotspots] = useState<Hotspot[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    hazardType: 'ALL',
    severity: 'ALL',
    dateRange: '24h'
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchData()
  }, [filters])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [reportsRes, hotspotsRes] = await Promise.all([
        fetch(`/api/reports?${new URLSearchParams({
          ...(filters.hazardType !== 'ALL' && { hazardType: filters.hazardType }),
          ...(filters.severity !== 'ALL' && { severity: filters.severity }),
          dateRange: filters.dateRange
        })}`),
        fetch(`/api/hotspots?${new URLSearchParams({
          dateRange: filters.dateRange
        })}`)
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


  const hazardTypes = [
    'ALL', 'TSUNAMI', 'STORM_SURGE', 'HIGH_WAVES', 'SWELL_SURGE', 
    'COASTAL_CURRENT', 'FLOODING', 'COASTAL_DAMAGE', 'ABNORMAL_TIDE', 'OTHER'
  ]

  const severities = ['ALL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
  const dateRanges = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Interactive Map</h1>
          <p className="mt-2 text-gray-600">
            Real-time ocean hazard monitoring and visualization
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Hazard Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hazard Type
              </label>
              <select
                value={filters.hazardType}
                onChange={(e) => setFilters({...filters, hazardType: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {hazardTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'ALL' ? 'All Types' : type.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Severity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity
              </label>
              <select
                value={filters.severity}
                onChange={(e) => setFilters({...filters, severity: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {severities.map(severity => (
                  <option key={severity} value={severity}>
                    {severity === 'ALL' ? 'All Severities' : severity}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Map Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Reports on Map</p>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Active Hotspots</p>
              <p className="text-2xl font-bold text-gray-900">{hotspots.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">High Severity</p>
              <p className="text-2xl font-bold text-gray-900">
                {reports.filter(r => r.severity === 'HIGH' || r.severity === 'CRITICAL').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Component */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Hazard Map</h2>
          <p className="text-sm text-gray-600">
            Click on markers to view report details. Red circles indicate hotspots.
          </p>
        </div>
        <div className="h-96">
          <MapComponent
            reports={reports}
            hotspots={hotspots}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Map Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Report Severity</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Low</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Medium</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">High</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Critical</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Map Elements</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-blue-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Individual Reports</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-3 opacity-50"></div>
                <span className="text-sm text-gray-600">Hotspot Areas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
