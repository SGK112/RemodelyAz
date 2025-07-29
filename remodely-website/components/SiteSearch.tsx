'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface SearchResult {
    title: string
    url: string
    type: 'service' | 'page' | 'content'
    description: string
}

const searchData: SearchResult[] = [
    // Services
    { title: 'Kitchen Remodeling', url: '/services', type: 'service', description: 'Transform your kitchen with expert renovation services' },
    { title: 'Bathroom Renovation', url: '/services', type: 'service', description: 'Complete bathroom remodeling and design' },
    { title: 'Countertops', url: '/services', type: 'service', description: 'Premium countertop installation and replacement' },
    { title: 'Flooring', url: '/services', type: 'service', description: 'Professional flooring installation and refinishing' },
    { title: 'Commercial Remodeling', url: '/services', type: 'service', description: 'Business and commercial space renovation' },
    
    // Pages
    { title: 'Gallery', url: '/gallery', type: 'page', description: 'View our completed projects and portfolio' },
    { title: 'About Us', url: '/about', type: 'page', description: 'Learn about REMODELY and our team' },
    { title: 'Contact', url: '/contact', type: 'page', description: 'Get in touch for a free consultation' },
    { title: 'Process', url: '/process', type: 'page', description: 'Our step-by-step remodeling process' },
    { title: 'Careers', url: '/careers', type: 'page', description: 'Join our team of professionals' },
    { title: 'Testimonials', url: '/testimonials', type: 'page', description: 'What our customers say about us' },
    
    // Content
    { title: 'Free Quote', url: '/contact', type: 'content', description: 'Get a personalized estimate for your project' },
    { title: 'Surprise Granite', url: '/about', type: 'content', description: 'Our parent company with 7+ years experience' },
    { title: 'Arizona Licensed', url: '/about', type: 'content', description: 'AzRoc #327266 licensed contractor' },
    { title: 'Emergency Service', url: '/contact', type: 'content', description: '24/7 emergency repair services' }
]

const SiteSearch = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])

    useEffect(() => {
        if (query.length > 1) {
            const filtered = searchData.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 6) // Limit to 6 results
            setResults(filtered)
        } else {
            setResults([])
        }
    }, [query])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsOpen(false)
            setQuery('')
        }
    }

    return (
        <>
            {/* Search Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Search site"
            >
                <Search className="w-5 h-5 text-white" />
            </button>

            {/* Search Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden"
                        >
                            {/* Search Input */}
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center space-x-4">
                                    <Search className="w-6 h-6 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search services, pages, or content..."
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="flex-1 text-lg outline-none placeholder-gray-400"
                                        autoFocus
                                    />
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Search Results */}
                            <div className="max-h-96 overflow-y-auto">
                                {query.length > 1 && results.length === 0 && (
                                    <div className="p-6 text-center text-gray-500">
                                        No results found for "{query}"
                                    </div>
                                )}

                                {results.map((result, index) => (
                                    <Link
                                        key={index}
                                        href={result.url}
                                        onClick={() => setIsOpen(false)}
                                        className="block p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <h4 className="font-semibold text-gray-900">
                                                        {result.title}
                                                    </h4>
                                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                                        result.type === 'service' 
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : result.type === 'page'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-amber-100 text-amber-700'
                                                    }`}>
                                                        {result.type}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    {result.description}
                                                </p>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-gray-400" />
                                        </div>
                                    </Link>
                                ))}

                                {query.length <= 1 && (
                                    <div className="p-6">
                                        <h4 className="font-semibold text-gray-900 mb-4">Popular Searches</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['Kitchen Remodeling', 'Bathroom Renovation', 'Free Quote', 'Gallery'].map((term) => (
                                                <button
                                                    key={term}
                                                    onClick={() => setQuery(term)}
                                                    className="text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm"
                                                >
                                                    {term}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Quick Actions */}
                            <div className="p-4 bg-gray-50 border-t border-gray-200">
                                <div className="flex justify-center space-x-4">
                                    <Link
                                        href="/contact"
                                        onClick={() => setIsOpen(false)}
                                        className="bg-accent-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-700 transition-colors text-sm"
                                    >
                                        Get Quote
                                    </Link>
                                    <a
                                        href="tel:(602) 818-5834"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                                    >
                                        Call Now
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

export default SiteSearch
