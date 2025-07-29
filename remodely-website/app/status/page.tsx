'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react'

interface StatusCheck {
  name: string
  status: 'success' | 'error' | 'warning' | 'loading'
  message: string
}

export default function StatusPage() {
  const [checks, setChecks] = useState<StatusCheck[]>([
    { name: 'Company API', status: 'loading', message: 'Checking...' },
    { name: 'Blog API', status: 'loading', message: 'Checking...' },
    { name: 'Images API', status: 'loading', message: 'Checking...' },
    { name: 'Data Files', status: 'loading', message: 'Checking...' }
  ])

  const runHealthChecks = async () => {
    const newChecks: StatusCheck[] = []

    // ...existing code...

    // ...existing code...

    // ...existing code...

    // Check Data Files (implied by successful API calls)
    const successfulAPIs = newChecks.filter(check => check.status === 'success').length
    if (successfulAPIs >= 2) {
      newChecks.push({
        name: 'Data Files',
        status: 'success',
        message: 'Data persistence working'
      })
    } else {
      newChecks.push({
        name: 'Data Files',
        status: 'warning',
        message: 'Some data files may be missing'
      })
    }

    // ...existing code...

    setChecks(newChecks)
  }

  useEffect(() => {
    runHealthChecks()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case 'loading':
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
      default:
        return <RefreshCw className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'loading':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Website Status
          </h1>
          <p className="text-xl text-gray-600">
            REMODELY LLC Website Health Check
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {checks.map((check, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getStatusColor(check.status)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getStatusIcon(check.status)}
                  <span className="ml-3 font-semibold text-gray-900">
                    {check.name}
                  </span>
                </div>
                <span className="text-gray-600">
                  {check.message}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={runHealthChecks}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Status
          </button>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* ...existing code... */}
            <a
              href="/"
              className="bg-green-600 text-white p-4 rounded-lg text-center hover:bg-green-700 transition-colors"
            >
              View Website
            </a>
            <a
              href="/blog"
              className="bg-purple-600 text-white p-4 rounded-lg text-center hover:bg-purple-700 transition-colors"
            >
              View Blog
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
