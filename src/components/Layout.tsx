'use client'

import { useState } from 'react'
import Navigation from './Navigation'
import ReportForm from './ReportForm'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isReportFormOpen, setIsReportFormOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onReportFormOpen={() => setIsReportFormOpen(true)} />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      <ReportForm 
        isOpen={isReportFormOpen}
        onClose={() => setIsReportFormOpen(false)}
        onSubmit={async (report) => {
          try {
            const response = await fetch('/api/reports', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(report)
            })
            if (response.ok) {
              // Refresh the page or show success message
              window.location.reload()
            }
          } catch (error) {
            console.error('Error submitting report:', error)
          }
        }}
      />
    </div>
  )
}
