'use client'

import Link from 'next/link'
import { Image, FileText, Users, Settings, ArrowRight } from 'lucide-react'

const AdminDashboard = () => {
    const quickActions = [
        {
            title: 'Gallery Manager',
            description: 'Update gallery images and descriptions with a visual interface',
            href: '/admin/gallery',
            icon: Image,
            color: 'bg-blue-500'
        },
        {
            title: 'Blog Posts',
            description: 'Manage blog content and articles',
            href: '/admin/blogs',
            icon: FileText,
            color: 'bg-green-500'
        },
        {
            title: 'Testimonials',
            description: 'Add and edit customer testimonials',
            href: '/admin/testimonials',
            icon: Users,
            color: 'bg-purple-500'
        },
        {
            title: 'Settings',
            description: 'Configure site settings and company information',
            href: '/admin/settings',
            icon: Settings,
            color: 'bg-gray-500'
        }
    ]

    return (
        <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Manage your website content and settings
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

                <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="font-semibold text-yellow-900 mb-2">
                        🎯 Gallery Manager - Perfect for Your Needs!
                    </h3>
                    <p className="text-yellow-800 mb-4">
                        The Gallery Manager lets you visually see each project and easily swap out image URLs.
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
