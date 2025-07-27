'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Mail } from 'lucide-react'

// Typing animation component for "Az"
const TypingAz = () => {
    const [displayText, setDisplayText] = useState('')
    const [isTyping, setIsTyping] = useState(true)

    useEffect(() => {
        const text = 'Az'
        let currentIndex = 0

        const typeInterval = setInterval(() => {
            if (currentIndex <= text.length) {
                setDisplayText(text.slice(0, currentIndex))
                currentIndex++
            } else {
                clearInterval(typeInterval)
                setIsTyping(false)
                // Restart after 3 seconds
                setTimeout(() => {
                    setDisplayText('')
                    currentIndex = 0
                    setIsTyping(true)

                    const restartInterval = setInterval(() => {
                        if (currentIndex <= text.length) {
                            setDisplayText(text.slice(0, currentIndex))
                            currentIndex++
                        } else {
                            clearInterval(restartInterval)
                            setIsTyping(false)
                        }
                    }, 300)
                }, 3000)
            }
        }, 300)

        return () => clearInterval(typeInterval)
    }, [])

    return (
        <span className="text-accent-400 font-bold">
            {displayText}
            <span className={`inline-block w-0.5 h-5 bg-accent-400 ml-1 ${isTyping ? 'animate-pulse' : 'opacity-0'}`}></span>
        </span>
    )
}

// Drop-in animation component for "Az" 
const DropInAz = ({ scrolled = false, isDarkPage = false }) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false)
            setTimeout(() => setIsVisible(true), 100)
        }, 4000)

        // Initial animation
        setTimeout(() => setIsVisible(true), 500)

        return () => clearInterval(interval)
    }, [])

    const getTextColor = () => {
        if (scrolled) {
            return 'text-accent-600'
        }
        return isDarkPage ? 'text-accent-400' : 'text-accent-600'
    }

    return (
        <span className={`inline-block font-bold transition-all duration-700 ${
            isDarkPage && !scrolled ? 'text-accent-400' : 'text-accent-600'
        } ${isVisible
                ? 'translate-y-0 opacity-100 rotate-0'
                : '-translate-y-8 opacity-0 rotate-12'
            }`}>
            Az
        </span>
    )
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()

    // Define pages with dark backgrounds  
    const darkBackgroundPages = ['/']  // Only home page has dark background now
    const isDarkPage = darkBackgroundPages.includes(pathname)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Process', href: '/process' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ]

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/10 backdrop-blur-sm'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center space-x-3">
                            <Image
                                src="/favicon.svg"
                                alt="Remodely Arizona Logo"
                                width={48}
                                height={48}
                                className="w-12 h-12"
                            />
                            <div className="block">
                                <h1 className={`text-xl font-display font-bold transition-colors duration-300 ${
                                    scrolled 
                                        ? 'text-gray-700'
                                        : pathname === '/'
                                            ? 'text-white'
                                            : 'text-gray-700'
                                }`}>
                                    Remodely<DropInAz scrolled={scrolled} isDarkPage={pathname === '/'} />
                                    {/* Alternative: Replace <DropInAz /> with <TypingAz /> for typing effect */}
                                </h1>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-medium transition-colors duration-200 hover:scale-105 transform ${
                                    scrolled
                                        ? 'text-gray-700 hover:text-accent-600'
                                        : pathname === '/' 
                                            ? 'text-white hover:text-accent-200'
                                            : 'text-gray-700 hover:text-accent-600'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA & Mobile Menu Button */}
                    <div className="flex items-center space-x-3">
                        {/* CTA Button */}
                        <Link
                            href="/contact"
                            className={`hidden sm:inline-flex px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105 transform ${
                                scrolled
                                    ? 'bg-accent-600 text-white hover:bg-accent-700'
                                    : pathname === '/'
                                        ? 'bg-white text-accent-600 hover:bg-gray-100'
                                        : 'bg-accent-600 text-white hover:bg-accent-700'
                            }`}
                        >
                            Get Quote
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`md:hidden inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                scrolled
                                    ? 'text-gray-700 hover:text-accent-600 focus:ring-accent-500'
                                    : pathname === '/'
                                        ? 'text-white hover:text-accent-200 focus:ring-white'
                                        : 'text-gray-700 hover:text-accent-600 focus:ring-accent-500'
                            }`}
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className={`md:hidden backdrop-blur-md border-t ${
                    scrolled
                        ? 'bg-white/95 border-gray-200'
                        : pathname === '/'
                            ? 'bg-white/10 border-white/20'
                            : 'bg-white/95 border-gray-200'
                }`}>
                    <div className="px-4 py-4 space-y-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`block px-3 py-2 font-medium transition-colors duration-200 rounded-md ${
                                    scrolled
                                        ? 'text-gray-700 hover:text-accent-600 hover:bg-gray-100'
                                        : pathname === '/'
                                            ? 'text-white hover:text-accent-200 hover:bg-white/10'
                                            : 'text-gray-700 hover:text-accent-600 hover:bg-gray-100'
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Mobile CTA */}
                        <div className={`pt-3 border-t ${
                            scrolled
                                ? 'border-gray-200'
                                : pathname === '/'
                                    ? 'border-white/20'
                                    : 'border-gray-200'
                        }`}>
                            <Link
                                href="/contact"
                                className="block w-full bg-accent-600 text-white hover:bg-accent-700 text-center py-2 rounded-md font-medium transition-colors duration-200"
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
