'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Settings, FileText, Image, Users, BarChart3, Home } from 'lucide-react'

const AdminNavigation = () => {
    const pathname = usePathname()

    const navItems = [
        {
            label: 'Dashboard',
            href: '/admin',
            icon: BarChart3
        },
        {
            label: 'Gallery Manager',
            href: '/admin/gallery',
            icon: Image
        },
        {
            label: 'Blog Posts',
            href: '/admin/blogs',
            icon: FileText
        },
        {
            label: 'Testimonials',
            href: '/admin/testimonials',
            icon: Users
        },
        {
            label: 'Settings',
            href: '/admin/settings',
            icon: Settings
        }
    ]

    return (
        <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <Link href="/" className="flex items-center space-x-2 text-accent-600 hover:text-accent-700">
                            <Home className="w-5 h-5" />
                            <span className="font-medium">Back to Site</span>
                        </Link>

                        <nav className="flex space-x-6">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                                ? 'bg-accent-100 text-accent-700'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{item.label}</span>
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>

                    <div className="text-sm text-gray-500">
                        Admin Panel
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminNavigation
