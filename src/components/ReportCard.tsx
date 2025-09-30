'use client'

import { Report } from '../types'

interface ReportCardProps {
  report: Report
  getSeverityColor: (severity: string) => string
  getHazardTypeIcon: (type: string) => string
}

export default function ReportCard({ report, getSeverityColor, getHazardTypeIcon }: ReportCardProps) {

  return (
    <>
      <div className="border rounded-lg p-4 hover:bg-gray-50">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">{getHazardTypeIcon(report.hazardType)}</span>
              <h4 className="font-medium text-black">{report.title}</h4>
            </div>
            <p className="text-sm text-black mb-2">{report.location}</p>
            
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getSeverityColor(report.severity)}`}>
                {report.severity}
              </span>
              {report.verified && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>
        <p className="text-xs text-black mt-2">
          {new Date(report.createdAt).toLocaleString()}
        </p>
      </div>
    </>
  )
}
