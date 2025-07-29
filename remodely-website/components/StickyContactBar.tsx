'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageSquare, Calculator, X } from 'lucide-react'

interface StickyContactBarProps {
    onQuickQuote?: () => void
}

const StickyContactBar = ({ onQuickQuote }: StickyContactBarProps) => {
    const [isVisible, setIsVisible] = useState(true)
    const [isMinimized, setIsMinimized] = useState(false)

    useEffect(() => {
        // Show bar after 10 seconds
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 10000)

        return () => clearTimeout(timer)
    }, [])

    if (!isVisible) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
            >
                {!isMinimized ? (
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-2xl">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex-1">
                                <p className="text-sm font-semibold">Ready to Start Your Project?</p>
                                <p className="text-xs text-blue-100">Get instant quote or call now</p>
                            </div>
                            <button
                                onClick={() => setIsMinimized(true)}
                                className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        
                        <div className="flex gap-2">
                            <button
                                onClick={onQuickQuote}
                                className="flex-1 bg-accent-500 hover:bg-accent-600 text-white py-2.5 px-3 rounded-lg font-medium text-sm flex items-center justify-center space-x-1.5 transition-colors"
                            >
                                <Calculator className="w-4 h-4" />
                                <span>Quick Quote</span>
                            </button>
                            
                            <a
                                href="tel:(602) 818-5834"
                                className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2.5 px-3 rounded-lg font-medium text-sm flex items-center justify-center space-x-1.5 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                <span>Call Now</span>
                            </a>
                            
                            <a
                                href="/contact"
                                className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2.5 px-3 rounded-lg font-medium text-sm flex items-center justify-center space-x-1.5 transition-colors"
                            >
                                <MessageSquare className="w-4 h-4" />
                                <span>Contact</span>
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 shadow-2xl">
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={onQuickQuote}
                                className="bg-accent-500 hover:bg-accent-600 text-white p-2 rounded-full transition-colors"
                            >
                                <Calculator className="w-5 h-5" />
                            </button>
                            
                            <a
                                href="tel:(602) 818-5834"
                                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
                            >
                                <Phone className="w-5 h-5" />
                            </a>
                            
                            <a
                                href="/contact"
                                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
                            >
                                <MessageSquare className="w-5 h-5" />
                            </a>
                            
                            <button
                                onClick={() => setIsMinimized(false)}
                                className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-full text-xs font-medium transition-colors"
                            >
                                Expand
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    )
}

export default StickyContactBar
