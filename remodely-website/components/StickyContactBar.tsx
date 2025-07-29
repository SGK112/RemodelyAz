'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageSquare, Calculator, X } from 'lucide-react'
import { popupPersistence } from '@/lib/popup-persistence'

interface StickyContactBarProps {
    onQuickQuote?: () => void
}

const StickyContactBar = ({ onQuickQuote }: StickyContactBarProps) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)

    useEffect(() => {
        // Check if contact bar was dismissed
        if (popupPersistence.isDismissed('stickyContactBar')) {
            setIsVisible(false)
            return
        }

        // Show bar after 10 seconds
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 10000)

        return () => clearTimeout(timer)
    }, [])

    const handleDismiss = () => {
        popupPersistence.dismissPopup('stickyContactBar', 24) // Dismiss for 24 hours
        setIsVisible(false)
    }

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
                    <div className="bg-white/98 border-t border-gray-200 text-gray-900 p-4 shadow-2xl">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">Ready to Start Your Project?</p>
                                <p className="text-xs text-gray-600">Get instant quote or call now</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsMinimized(true)}
                                    className="px-2 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 
                                             text-gray-700 font-medium text-sm transition-all duration-200 
                                             touch-manipulation shadow-sm hover:shadow-md"
                                    aria-label="Minimize contact bar"
                                >
                                    _
                                </button>
                                <button
                                    onClick={handleDismiss}
                                    className="px-3 py-1.5 rounded-lg bg-gray-600 hover:bg-gray-700 
                                             text-white font-medium text-sm transition-all duration-200 
                                             touch-manipulation shadow-md hover:shadow-lg
                                             border border-gray-700 hover:border-gray-800"
                                    aria-label="Dismiss contact bar"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex gap-2">
                            <button
                                onClick={onQuickQuote}
                                className="flex-1 bg-accent-600 hover:bg-accent-700 text-white 
                                         py-3 px-3 rounded-lg font-medium text-sm 
                                         flex items-center justify-center space-x-1.5 
                                         transition-all duration-200 touch-manipulation min-h-[44px]
                                         border border-accent-700 hover:border-accent-800"
                            >
                                <Calculator className="w-4 h-4" />
                                <span>Quick Quote</span>
                            </button>
                            
                            <a
                                href="tel:(602) 818-5834"
                                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white 
                                         py-3 px-3 rounded-lg font-medium text-sm 
                                         flex items-center justify-center space-x-1.5 
                                         transition-all duration-200 touch-manipulation min-h-[44px]
                                         border border-primary-700 hover:border-primary-800"
                            >
                                <Phone className="w-4 h-4" />
                                <span>Call Now</span>
                            </a>
                            
                            <a
                                href="/contact"
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 
                                         py-3 px-3 rounded-lg font-medium text-sm 
                                         flex items-center justify-center space-x-1.5 
                                         transition-all duration-200 touch-manipulation min-h-[44px]
                                         border border-gray-300 hover:border-gray-400"
                            >
                                <MessageSquare className="w-4 h-4" />
                                <span>Contact</span>
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white/98 border-t border-gray-200 text-gray-900 p-3 shadow-2xl">
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={onQuickQuote}
                                className="bg-accent-600 hover:bg-accent-700 text-white p-3 rounded-full 
                                         transition-all duration-200 touch-manipulation
                                         border border-accent-700 hover:border-accent-800"
                                aria-label="Quick Quote"
                            >
                                <Calculator className="w-5 h-5" />
                            </button>
                            
                            <a
                                href="tel:(602) 818-5834"
                                className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full 
                                         transition-all duration-200 touch-manipulation
                                         border border-primary-700 hover:border-primary-800"
                                aria-label="Call now"
                            >
                                <Phone className="w-5 h-5" />
                            </a>
                            
                            <a
                                href="/contact"
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-full 
                                         transition-all duration-200 touch-manipulation
                                         border border-gray-300 hover:border-gray-400"
                                aria-label="Contact us"
                            >
                                <MessageSquare className="w-5 h-5" />
                            </a>
                            
                            <button
                                onClick={() => setIsMinimized(false)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-full 
                                         text-xs font-medium transition-all duration-200 touch-manipulation
                                         border border-gray-300 hover:border-gray-400"
                            >
                                Expand
                            </button>
                            
                            <button
                                onClick={handleDismiss}
                                className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full 
                                         transition-all duration-200 touch-manipulation text-xs
                                         border border-gray-700 hover:border-gray-800"
                                aria-label="Dismiss contact bar"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    )
}

export default StickyContactBar
