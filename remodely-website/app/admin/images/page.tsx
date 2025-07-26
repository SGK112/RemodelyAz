'use client'

import { useState } from 'react'
import ImageManager from '@/components/ImageManager'

const ImageManagementPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <nav className="flex items-center space-x-4 text-sm text-gray-500">
                            <a href="/admin" className="hover:text-gray-900">Admin</a>
                            <span>/</span>
                            <span className="text-gray-900 font-medium">Image Management</span>
                        </nav>
                        <h1 className="mt-2 text-3xl font-bold text-gray-900">Image Management</h1>
                        <p className="mt-1 text-gray-600">
                            Manage your website images, optimize URLs, and organize your gallery content.
                        </p>
                    </div>
                </div>
            </div>

            <ImageManager />
        </div>
    )
}

export default ImageManagementPage
