'use client'

import { useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Report, Hotspot } from '../types'

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: string })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom icons for different hazard types
const createHazardIcon = (hazardType: string, severity: string) => {
  const getColor = (severity: string) => {
    switch (severity) {
      case 'LOW': return '#10B981'
      case 'MEDIUM': return '#F59E0B'
      case 'HIGH': return '#F97316'
      case 'CRITICAL': return '#EF4444'
      default: return '#6B7280'
    }
  }

  const getIcon = (hazardType: string) => {
    switch (hazardType) {
      case 'TSUNAMI': return '🌊'
      case 'STORM_SURGE': return '⛈️'
      case 'HIGH_WAVES': return '🌊'
      case 'FLOODING': return '🌧️'
      case 'COASTAL_DAMAGE': return '🏗️'
      case 'ABNORMAL_TIDE': return '🌊'
      default: return '⚠️'
    }
  }

  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
      background-color: ${getColor(severity)};
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    ">${getIcon(hazardType)}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  })
}

interface MapComponentProps {
  reports: Report[]
  hotspots: Hotspot[]
}

export default function MapComponent({ reports, hotspots }: MapComponentProps) {
  const mapRef = useRef<L.Map>(null)

  // Center on India's coastline
  const center: [number, number] = [12.9716, 77.5946] // Bangalore as center
  const zoom = 6

  return (
    <div className="w-full h-full">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        {/* Free OpenStreetMap tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render hazard reports as markers */}
        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[report.latitude, report.longitude]}
            icon={createHazardIcon(report.hazardType, report.severity)}
          >
            <Popup>
              <div className="p-2 max-w-xs">
                <h3 className="font-semibold text-black mb-2">{report.title}</h3>
                
                {/* Show first image if available */}
                {report.mediaUrls && (() => {
                  try {
                    const mediaUrls = JSON.parse(report.mediaUrls)
                    if (mediaUrls.length > 0) {
                      return (
                        <div className="mb-2">
                          <img
                            src={mediaUrls[0]}
                            alt="Report image"
                            className="w-full h-32 object-cover rounded"
                          />
                        </div>
                      )
                    }
                  } catch {
                    // Ignore parsing errors
                  }
                  return null
                })()}
                
                <div className="space-y-1 text-sm">
                  <p><strong>Type:</strong> {report.hazardType.replace('_', ' ')}</p>
                  <p><strong>Severity:</strong> 
                    <span className={`ml-1 px-2 py-1 rounded text-xs text-white ${
                      report.severity === 'LOW' ? 'bg-green-500' :
                      report.severity === 'MEDIUM' ? 'bg-yellow-500' :
                      report.severity === 'HIGH' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}>
                      {report.severity}
                    </span>
                  </p>
                  <p><strong>Location:</strong> {report.location}</p>
                  <p><strong>Time:</strong> {new Date(report.createdAt).toLocaleString()}</p>
                  {report.verified && (
                    <p className="text-green-600 font-medium">✓ Verified</p>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Render hotspots as circles */}
        {hotspots.map((hotspot) => (
          <Circle
            key={hotspot.id}
            center={[hotspot.latitude, hotspot.longitude]}
            radius={hotspot.radius}
            pathOptions={{
              color: '#FF6B6B',
              fillColor: '#FF6B6B',
              fillOpacity: hotspot.intensity * 0.3,
              weight: 2,
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-black mb-2">Hazard Hotspot</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Type:</strong> {hotspot.hazardType.replace('_', ' ')}</p>
                  <p><strong>Intensity:</strong> {Math.round(hotspot.intensity * 100)}%</p>
                  <p><strong>Reports:</strong> {hotspot.reportCount}</p>
                  <p><strong>Radius:</strong> {Math.round(hotspot.radius / 1000)} km</p>
                </div>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  )
}
