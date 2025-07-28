'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface HealthCheckProps {
  children: React.ReactNode
}

interface SystemStatus {
  overall: 'healthy' | 'degraded' | 'unhealthy'
  services: {
    database: { status: string; message: string }
    filesystem: { status: string; message: string }
    cloudinary: { status: string; message: string }
    email: { status: string; message: string }
  }
}

const HealthCheck = ({ children }: HealthCheckProps) => {
  const [status, setStatus] = useState<SystemStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkSystemHealth()
  }, [])

  const checkSystemHealth = async () => {
    try {
      const response = await fetch('/api/system-status')
      const data = await response.json()
      setStatus(data)
      
      // If the system is completely unhealthy, show warning but don't break
      if (data.overall === 'unhealthy') {
        console.warn('System health check shows unhealthy status')
      }
    } catch (error) {
      console.error('Health check failed:', error)
      setError('Unable to check system status')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking system status...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              System Check Warning
            </h2>
            <p className="text-gray-600 mb-6">
              Unable to verify system status. Some features may be limited.
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => {
                setLoading(true)
                setError(null)
                checkSystemHealth()
              }}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry System Check
            </button>
            
            <button
              onClick={() => setError(null)}
              className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Continue Anyway
            </button>
            
            <button
              onClick={() => router.push('/')}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Go to Main Website
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show degraded status warning but continue
  if (status?.overall === 'degraded') {
    return (
      <div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Some system services are not fully operational. Features may be limited.
              </p>
            </div>
          </div>
        </div>
        {children}
      </div>
    )
  }

  // Show unhealthy status warning but continue
  if (status?.overall === 'unhealthy') {
    return (
      <div>
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Multiple system services are experiencing issues. Admin functionality may be limited.
              </p>
            </div>
          </div>
        </div>
        {children}
      </div>
    )
  }

  // System is healthy, render normally
  return <>{children}</>
}

export default HealthCheck
