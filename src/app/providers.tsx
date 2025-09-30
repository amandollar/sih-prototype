'use client'

import { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  // Temporarily disable NextAuth to prevent errors
  // In production, you would configure NextAuth properly
  return (
    <div>
      {children}
    </div>
  )
}
