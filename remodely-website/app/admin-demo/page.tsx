'use client'

import { useEffect, useState } from 'react'
import DynamicCompanyInfo from '@/components/DynamicCompanyInfo'
import { ArrowRight, RefreshCw, CheckCircle, Settings } from 'lucide-react'
import Link from 'next/link'

export default function AdminDemoPage() {
  const [lastUpdated, setLastUpdated] = useState<string>('')

  useEffect(() => {
    // Check for last updated timestamp
    const checkLastUpdated = async () => {
      try {
        const response = await fetch('/api/admin/company')
        if (response.ok) {
          const data = await response.json()
          if (data.lastUpdated) {
            setLastUpdated(new Date(data.lastUpdated).toLocaleString())
          }
        }
      } catch (error) {
        console.error('Failed to fetch update time:', error)
      }
    }

    checkLastUpdated()
    
    // Poll for updates every 5 seconds
    const interval = setInterval(checkLastUpdated, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Admin Panel Demo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            This page shows how admin panel changes affect the live website
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admin"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              <Settings className="w-5 h-5 mr-2" />
              Open Admin Panel
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors inline-flex items-center"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Refresh Page
            </button>
          </div>
        </div>

        {/* Status */}
        {lastUpdated && (
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-800">
                Last updated: {lastUpdated}
              </span>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mr-4 mt-1">1</span>
              <div>
                <h3 className="font-semibold text-gray-900">Make Changes in Admin Panel</h3>
                <p className="text-gray-600">Open the admin panel and edit company information, blogs, or images.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mr-4 mt-1">2</span>
              <div>
                <h3 className="font-semibold text-gray-900">Changes Are Saved Automatically</h3>
                <p className="text-gray-600">All changes are saved to JSON files in the /data directory.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mr-4 mt-1">3</span>
              <div>
                <h3 className="font-semibold text-gray-900">Website Updates Automatically</h3>
                <p className="text-gray-600">The website components fetch data from the API and display the updated content.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Data Display */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Live Company Information
            <span className="text-sm font-normal text-gray-500 ml-2">
              (This updates when you change it in the admin panel)
            </span>
          </h2>
          
          <DynamicCompanyInfo />
        </div>

        {/* File System Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mt-8">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Data Storage Location</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <div><strong>Company Data:</strong> <code>/data/company.json</code></div>
            <div><strong>Blog Data:</strong> <code>/data/blogs.json</code></div>
            <div><strong>Image Data:</strong> <code>/data/images.json</code></div>
            <div><strong>Uploaded Images:</strong> <code>/public/uploads/</code></div>
          </div>
          <p className="text-blue-700 mt-4">
            All changes you make in the admin panel are permanently saved to these files.
          </p>
        </div>
      </div>
    </div>
  )
}
