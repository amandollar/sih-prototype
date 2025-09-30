'use client'

import { useState, useEffect, useCallback } from 'react'
import { Filter, Search, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import ReportCard from '../../components/ReportCard'
import { Report } from '../../types'

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    hazardType: 'ALL',
    severity: 'ALL',
    dateRange: '24h',
    search: ''
  })
  const [showFilters, setShowFilters] = useState(false)

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filters.hazardType !== 'ALL') params.append('hazardType', filters.hazardType)
      if (filters.severity !== 'ALL') params.append('severity', filters.severity)
      params.append('dateRange', filters.dateRange)

      const response = await fetch(`/api/reports?${params}`)
      const data = await response.json()
      
      // Ensure data is always an array
      if (Array.isArray(data)) {
        setReports(data)
      } else {
        console.error('API returned non-array data:', data)
        setReports([])
      }
    } catch (error) {
      console.error('Error fetching reports:', error)
      setReports([])
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchReports()
  }, [fetchReports])

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

  const filteredReports = Array.isArray(reports) ? reports.filter(report => 
    filters.search === '' || 
    report.title.toLowerCase().includes(filters.search.toLowerCase()) ||
    report.location.toLowerCase().includes(filters.search.toLowerCase())
  ) : []

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
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="mt-2 text-gray-600">
            View and manage ocean hazard reports
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search reports..."
                />
              </div>
            </div>

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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{Array.isArray(reports) ? reports.length : 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Verified</p>
              <p className="text-2xl font-bold text-gray-900">
                {Array.isArray(reports) ? reports.filter(r => r.verified).length : 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {Array.isArray(reports) ? reports.filter(r => !r.verified).length : 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-gray-900">
                {Array.isArray(reports) ? reports.filter(r => r.severity === 'CRITICAL').length : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Reports ({filteredReports.length})
          </h2>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="text-center py-12">
            <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reports found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your filters or search terms.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredReports.map((report) => (
              <div key={report.id} className="p-6">
                <ReportCard
                  report={report}
                  getSeverityColor={getSeverityColor}
                  getHazardTypeIcon={getHazardTypeIcon}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
