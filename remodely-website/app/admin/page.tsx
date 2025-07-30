'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Image, FileText, Users, Settings, ArrowRight, Upload, Eye, Activity } from 'lucide-react'
import { motion } from 'framer-motion'

interface DashboardStats {
    totalImages: number
    totalProjects: number
    totalBlogs: number
    totalTestimonials: number
}

const AdminDashboard = () => {
    const [stats, setStats] = useState<DashboardStats>({
        totalImages: 0,
        totalProjects: 0,
        totalBlogs: 0,
        totalTestimonials: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadStats = async () => {
            try {
                // Load images count
                const imagesResponse = await fetch('/api/admin/images')
                const imagesData = await imagesResponse.json()

                // Load projects count
                const projectsResponse = await fetch('/api/admin/gallery-projects')
                const projectsData = await projectsResponse.json()

                // Load blogs count
                const blogsResponse = await fetch('/api/admin/blogs')
                const blogsData = await blogsResponse.json()

                setStats({
                    totalImages: imagesData.images?.length || 0,
                    totalProjects: projectsData.projects?.length || 0,
                    totalBlogs: blogsData.blogs?.length || 0,
                    totalTestimonials: 0
                })
            } catch (error) {
                console.error('Failed to load stats:', error)
            } finally {
                setLoading(false)
            }
        }

        loadStats()
    }, [])

    const quickActions = [
        {
            title: 'Image Manager',
            description: 'Upload, organize and manage all site images with Cloudinary integration',
            href: '/admin/images',
            icon: Upload,
            color: 'bg-blue-500',
            stat: stats.totalImages,
            statLabel: 'Images'
        },
        {
            title: 'Gallery Manager',
            description: 'Update gallery images and descriptions with a visual interface',
            href: '/admin/gallery',
            icon: Image,
            color: 'bg-indigo-500',
            stat: stats.totalProjects,
            statLabel: 'Projects'
        },
        {
            title: 'Blog Posts',
            description: 'Manage blog content and articles',
            href: '/admin/blogs',
            icon: FileText,
            color: 'bg-green-500',
            stat: stats.totalBlogs,
            statLabel: 'Posts'
        },
        {
            title: 'Testimonials',
            description: 'Add and edit customer testimonials',
            href: '/admin/testimonials',
            icon: Users,
            color: 'bg-purple-500',
            stat: stats.totalTestimonials,
            statLabel: 'Reviews'
        }
    ]

    return (
        <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                        RemodelyAZ Admin Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Manage your website content, images, and customer interactions
                    </p>
                </div>

                {/* Quick Stats */}
                {!loading && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white p-4 rounded-lg shadow-sm border">
                            <div className="text-2xl font-bold text-blue-600">{stats.totalImages}</div>
                            <div className="text-sm text-gray-600">Total Images</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border">
                            <div className="text-2xl font-bold text-indigo-600">{stats.totalProjects}</div>
                            <div className="text-sm text-gray-600">Gallery Projects</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border">
                            <div className="text-2xl font-bold text-green-600">{stats.totalBlogs}</div>
                            <div className="text-sm text-gray-600">Blog Posts</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border">
                            <div className="text-2xl font-bold text-purple-600">{stats.totalTestimonials}</div>
                            <div className="text-sm text-gray-600">Testimonials</div>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {quickActions.map((action) => {
                        const Icon = action.icon
                        return (
                            <Link
                                key={action.href}
                                href={action.href}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`${action.color} text-white p-3 rounded-lg`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-accent-600 transition-colors" />
                                </div>

                                <h3 className="font-semibold text-gray-900 mb-2">
                                    {action.title}
                                </h3>

                                <p className="text-gray-600 text-sm">
                                    {action.description}
                                </p>
                            </Link>
                        )
                    })}
                </div>

                <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-900 mb-2">
                        🚀 New: Advanced Image Manager
                    </h3>
                    <p className="text-blue-800 mb-4">
                        Upload images directly to Cloudinary, organize by category, and manage all your site images from one place.
                        Supports bulk uploads, image editing, and automatic optimization.
                    </p>
                    <Link
                        href="/admin/images"
                        className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-3"
                    >
                        <Image className="w-4 h-4 mr-2" />
                        Open Image Manager
                    </Link>
                </div>

                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="font-semibold text-yellow-900 mb-2">
                        🎯 Gallery Manager - Quick Updates
                    </h3>
                    <p className="text-yellow-800 mb-4">
                        For quick gallery updates, the Gallery Manager lets you visually see each project and easily swap out image URLs.
                        You can copy image URLs from surprisegranite.com or any other source and paste them directly.
                    </p>
                    <Link
                        href="/admin/gallery"
                        className="inline-flex items-center bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                        <Image className="w-4 h-4 mr-2" />
                        Open Gallery Manager
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
