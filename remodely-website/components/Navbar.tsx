'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
const DropInAz = () => {
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
    
    return (
        <span className={`inline-block text-accent-400 font-bold transition-all duration-700 ${
            isVisible 
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
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-accent-500/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src="/favicon.svg"
                                alt="Remodely Arizona Logo"
                                width={32}
                                height={32}
                                className="w-8 h-8"
                            />
                            <div className="hidden sm:block">
                                <h1 className="text-lg font-display font-bold text-white transition-colors duration-300">
                                    Remodely<DropInAz />
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
                                className={`transition-colors duration-200 ${scrolled
                                        ? 'text-white hover:text-accent-200'
                                        : 'text-accent-600 hover:text-accent-800'
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
                            className={`hidden sm:inline-flex px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${scrolled
                                    ? 'bg-white text-accent-600 hover:bg-accent-50'
                                    : 'bg-accent-600 text-white hover:bg-accent-500'
                                }`}
                        >
                            Get Quote
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white text-white hover:text-white/80"
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
                <div className={`lg:hidden backdrop-blur-md border-t border-white/20 ${scrolled
                        ? 'bg-accent-500/95'
                        : 'bg-accent-600/95'
                    }`}>
                    <div className="px-4 py-4 space-y-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block px-3 py-2 font-medium transition-colors duration-200 text-white hover:text-accent-100"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Mobile CTA */}
                        <div className="pt-3 border-t border-white/20">
                            <Link
                                href="/contact"
                                className="block w-full bg-white text-accent-600 hover:bg-accent-100 text-center py-2 rounded-md font-medium transition-colors duration-200"
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
