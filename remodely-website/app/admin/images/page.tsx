'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import UnifiedImageManager from '../../../components/UnifiedImageManager'
import { useImageStats } from '../../../hooks/useUnifiedImages'

export default function AdminImagesPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const { stats, loading: statsLoading } = useImageStats()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/admin/verify', {
                    credentials: 'include'
                })

                if (response.ok) {
                    setIsAuthenticated(true)
                } else {
                    router.push('/admin/login')
                }
            } catch (error) {
                console.error('Auth check failed:', error)
                router.push('/admin/login')
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [router])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-600"></div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null // Will redirect to login
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Unified Image Management</h1>
                            {!statsLoading && stats && (
                                <p className="text-sm text-gray-600 mt-1">
                                    {stats.images.total} images • {stats.projects.total} projects •
                                    {' '}{Math.round(stats.images.totalSize / 1024 / 1024)}MB total
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => router.push('/admin')}
                            className="text-gray-600 hover:text-gray-900 font-medium"
                        >
                            ← Back to Admin
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <UnifiedImageManager
                    mode="admin"
                    allowUpload={true}
                    allowProjectCreation={true}
                    showSearch={true}
                    showFilters={true}
                    gridColumns={4}
                />
            </div>
        </div>
    )
}
