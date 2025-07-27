'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, Mail } from 'lucide-react'

interface CompanyData {
    phone: string
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [companyData, setCompanyData] = useState<CompanyData>({
        phone: '(480) 255-5887'
    })

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        fetch('/api/admin/company')
            .then(res => res.json())
            .then(data => setCompanyData(data))
            .catch(console.error)
    }, [])

    useEffect(() => {
        // Check authentication status
        const checkAuth = () => {
            const token = sessionStorage.getItem('admin_token')
            const authenticated = sessionStorage.getItem('admin_authenticated')
            setIsAuthenticated(Boolean(token && authenticated === 'true'))
        }

        checkAuth()
        // Listen for auth changes
        window.addEventListener('storage', checkAuth)
        return () => window.removeEventListener('storage', checkAuth)
    }, [])

    const navigation = [
        { name: 'Home', href: '/' },
        {
            name: 'Services',
            href: '/services',
            submenu: [
                { name: 'Kitchen Remodeling', href: '/services/kitchen' },
                { name: 'Bathroom Remodeling', href: '/services/bathroom' },
                { name: 'Commercial Remodeling', href: '/services/commercial' },
                { name: 'Design Consultation', href: '/services/design' },
            ]
        },
        { name: 'Gallery', href: '/gallery' },
        { name: 'About', href: '/about' },
        { name: 'Process', href: '/process' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
        { 
            name: isAuthenticated ? 'Admin' : 'Login', 
            href: isAuthenticated ? '/admin' : '/admin/login' 
        },
    ]

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-navbar shadow-lg' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg sm:text-xl">R</span>
                            </div>
                            <span className="font-display font-bold text-lg sm:text-xl text-gray-900">
                                REMODELY
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info & CTA */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{companyData.phone}</span>
                        </div>
                        <Link
                            href="/contact"
                            className="bg-accent-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-accent-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Get Quote
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-primary-600 p-3 rounded-lg touch-manipulation"
                            aria-label="Toggle mobile menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-700 hover:text-primary-600 block px-4 py-3 rounded-lg text-base font-medium touch-manipulation"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="border-t border-gray-200 pt-4 mt-4">
                            <div className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600">
                                <Phone className="w-4 h-4" />
                                <span>{companyData.phone}</span>
                            </div>
                            <Link
                                href="/contact"
                                className="block mx-4 mt-3 bg-accent-600 text-white px-6 py-3 rounded-full text-center text-base font-medium touch-manipulation min-h-[48px] flex items-center justify-center"
                                onClick={() => setIsOpen(false)}
                            >
                                Get Quote
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
