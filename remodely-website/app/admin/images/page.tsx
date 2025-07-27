'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ImageManager from '../../../components/ImageManager'

export default function AdminImagesPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

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
                        <h1 className="text-2xl font-bold text-gray-900">Image Management</h1>
                        <button
                            onClick={() => router.push('/admin')}
                            className="text-gray-600 hover:text-gray-900 font-medium"
                        >
                            ← Back to Admin
                        </button>
                    </div>
                </div>
            </div>
            
            <ImageManager />
        </div>
    )
}
