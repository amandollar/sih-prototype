'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Camera, MapPin, AlertTriangle, Upload, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { ReportFormData } from '../types'

interface ReportFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (report: ReportFormData) => void
}

export default function ReportForm({ isOpen, onClose, onSubmit }: ReportFormProps) {
  const [formData, setFormData] = useState<ReportFormData>({
    title: '',
    description: '',
    hazardType: 'HIGH_WAVES',
    severity: 'MEDIUM',
    location: '',
    latitude: 0,
    longitude: 0,
  })
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi']
    },
    onDrop: (acceptedFiles) => {
      setFiles(prev => [...prev, ...acceptedFiles])
    },
    maxFiles: 5
  })

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }))
          toast.success('Location detected!')
        },
        () => {
          toast.error('Unable to get location. Please enter manually.')
        }
      )
    } else {
      toast.error('Geolocation not supported by this browser.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate file upload (in real app, upload to cloud storage)
      const mediaUrls = files.map(file => URL.createObjectURL(file))
      
      const report = {
        ...formData,
        mediaUrls: mediaUrls
      }

      onSubmit(report)
      toast.success('Report submitted successfully!')
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        hazardType: 'HIGH_WAVES',
        severity: 'MEDIUM',
        location: '',
        latitude: 0,
        longitude: 0,
      })
      setFiles([])
      onClose()
    } catch {
      toast.error('Failed to submit report. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-black flex items-center">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
              Report Ocean Hazard
            </h2>
            <button
              onClick={onClose}
              className="text-black hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-black mt-2">
            Help coastal communities by reporting ocean hazards you observe
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Report Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., High waves observed at Marina Beach"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe what you observed in detail..."
            />
          </div>

          {/* Hazard Type and Severity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Hazard Type *
              </label>
              <select
                required
                value={formData.hazardType}
                onChange={(e) => setFormData(prev => ({ ...prev, hazardType: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="TSUNAMI">Tsunami</option>
                <option value="STORM_SURGE">Storm Surge</option>
                <option value="HIGH_WAVES">High Waves</option>
                <option value="SWELL_SURGE">Swell Surge</option>
                <option value="COASTAL_CURRENT">Coastal Current</option>
                <option value="FLOODING">Flooding</option>
                <option value="COASTAL_DAMAGE">Coastal Damage</option>
                <option value="ABNORMAL_TIDE">Abnormal Tide</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Severity *
              </label>
              <select
                required
                value={formData.severity}
                onChange={(e) => setFormData(prev => ({ ...prev, severity: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Location *
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Marina Beach, Chennai, Tamil Nadu"
              />
              <button
                type="button"
                onClick={getCurrentLocation}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <MapPin className="w-4 h-4" />
                <span>Auto</span>
              </button>
            </div>
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Photos/Videos (Optional)
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input {...getInputProps()} />
              <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              {isDragActive ? (
                <p className="text-blue-600">Drop files here...</p>
              ) : (
                <div>
                  <p className="text-black">
                    Drag & drop files here, or click to select
                  </p>
                  <p className="text-sm text-black mt-1">
                    PNG, JPG, GIF, MP4 up to 10MB each
                  </p>
                </div>
              )}
            </div>

            {/* File previews */}
            {files.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                {files.map((file, index) => (
                  <div key={index} className="relative">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      {file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                          <p className="text-xs text-black">{file.name}</p>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
