'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import SiteSearch from './SiteSearch'

interface CompanyData {
    name: string
    phone: string
    email: string
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()
    const [companyData, setCompanyData] = useState<CompanyData>({
        name: 'REMODELY LLC',
        phone: '(602) 818-5834',
        email: 'info@remodely-az.com'
    })

    // Define pages with dark backgrounds (only home page has dark hero)
    const isHomePage = pathname === '/'
    const isBlogPage = pathname.startsWith('/blog')

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        // Load company data from local data file instead of admin API
        setCompanyData({
            name: 'REMODELY LLC',
            phone: '(623) 555-0123',
            email: 'info@remodely-az.com'
        })
    }, [])

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ]

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
            scrolled || isBlogPage ? 'glass-navbar shadow-lg' : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg sm:text-xl">R</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <span className={`font-display font-bold text-lg sm:text-xl transition-colors duration-300 ${
                                    scrolled || isBlogPage ? 'text-gray-900' : isHomePage ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    REMODELY
                                </span>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 1.5 }}
                                    className="ml-1 px-1.5 py-0.5 rounded text-xs font-bold bg-accent-600 text-white"
                                >
                                    AZ
                                </motion.div>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                        scrolled || isBlogPage
                                            ? 'text-gray-700 hover:text-primary-600'
                                            : isHomePage
                                                ? 'text-white hover:text-accent-200'
                                                : 'text-gray-700 hover:text-primary-600'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info & CTA */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <SiteSearch />
                        <div className={`flex items-center space-x-2 text-sm transition-colors duration-300 ${
                            scrolled || isBlogPage ? 'text-gray-600' : isHomePage ? 'text-white' : 'text-gray-600'
                            }`}>
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
                            className={`hover:text-primary-600 p-3 rounded-lg touch-manipulation transition-colors duration-300 ${
                                scrolled || isBlogPage ? 'text-gray-700' : isHomePage ? 'text-white' : 'text-gray-700'
                                }`}
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
