'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

const Breadcrumbs = () => {
    const pathname = usePathname()
    
    // Don't show breadcrumbs on home page
    if (pathname === '/') return null
    
    const pathSegments = pathname.split('/').filter(segment => segment !== '')
    
    const breadcrumbItems = [
        { name: 'Home', href: '/' },
        ...pathSegments.map((segment, index) => {
            const href = '/' + pathSegments.slice(0, index + 1).join('/')
            const name = segment
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
            
            return { name, href }
        })
    ]
    
    return (
        <nav className="bg-gray-50 border-b border-gray-200 py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ol className="flex items-center space-x-2 text-sm">
                    {breadcrumbItems.map((item, index) => (
                        <li key={item.href} className="flex items-center">
                            {index > 0 && (
                                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                            )}
                            {index === 0 ? (
                                <Link
                                    href={item.href}
                                    className="flex items-center text-gray-600 hover:text-accent-600 transition-colors"
                                >
                                    <Home className="w-4 h-4 mr-1" />
                                    {item.name}
                                </Link>
                            ) : index === breadcrumbItems.length - 1 ? (
                                <span className="text-gray-900 font-medium">
                                    {item.name}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="text-gray-600 hover:text-accent-600 transition-colors"
                                >
                                    {item.name}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    )
}

export default Breadcrumbs
