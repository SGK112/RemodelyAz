'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AuthWrapperProps {
  children: React.ReactNode
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated (simple check for admin access)
    const checkAuth = () => {
      const isLoggedIn = sessionStorage.getItem('admin-logged-in') === 'true'

      if (!isLoggedIn) {
        router.push('/admin/login')
      } else {
        setIsAuthenticated(true)
      }
      setLoading(false)
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-accent-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Router will redirect to login
  }

  return <>{children}</>
}

export default AuthWrapper