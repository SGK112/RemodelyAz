'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Phone, MessageCircle, X } from 'lucide-react'
import { leadAnalytics } from '@/lib/lead-analytics'

interface LeadEngagementTrackerProps {
    onQuickQuote?: () => void
}

const LeadEngagementTracker = ({ onQuickQuote }: LeadEngagementTrackerProps) => {
    const [timeOnSite, setTimeOnSite] = useState(0)
    const [showExitIntent, setShowExitIntent] = useState(false)
    const [showTimePrompt, setShowTimePrompt] = useState(false)
    const [hasShownExitIntent, setHasShownExitIntent] = useState(false)

    useEffect(() => {
        // Track time on site
        const timer = setInterval(() => {
            setTimeOnSite(prev => prev + 1)
        }, 1000)

        // Check for engagement prompts based on analytics
        const engagementTimer = setInterval(() => {
            if (leadAnalytics) {
                if (leadAnalytics.shouldShowEngagementPrompt() && !showTimePrompt) {
                    setShowTimePrompt(true)
                    clearInterval(engagementTimer)
                }
            }
        }, 5000)

        // Exit intent detection
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY < 50 && !hasShownExitIntent) {
                if (leadAnalytics?.shouldShowExitIntent()) {
                    setShowExitIntent(true)
                    setHasShownExitIntent(true)
                }
            }
        }

        document.addEventListener('mouseleave', handleMouseLeave)

        // Cleanup
        return () => {
            clearInterval(timer)
            clearInterval(engagementTimer)
            document.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [hasShownExitIntent, showTimePrompt])

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        if (minutes > 0) {
            return `${minutes}m ${remainingSeconds}s`
        }
        return `${remainingSeconds}s`
    }

    const handleQuickQuoteClick = () => {
        leadAnalytics?.trackCTAClick('quick_quote', 'exit_intent_modal')
        setShowExitIntent(false)
        onQuickQuote?.()
    }

    const handleTimePromptQuoteClick = () => {
        leadAnalytics?.trackCTAClick('quick_quote', 'time_prompt')
        setShowTimePrompt(false)
        onQuickQuote?.()
    }

    return (
        <>
            {/* Exit Intent Modal */}
            <AnimatePresence>
                {showExitIntent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowExitIntent(false)}
                        />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 text-center"
                        >
                            <button
                                onClick={() => setShowExitIntent(false)}
                                className="absolute top-4 right-4 px-3 py-1.5 rounded-lg 
                                         bg-gray-600 hover:bg-gray-700 text-white 
                                         font-medium text-sm transition-all duration-200 
                                         shadow-md hover:shadow-lg border border-gray-700 hover:border-gray-800"
                            >
                                Close
                            </button>

                            <div className="bg-accent-100 rounded-full p-4 w-fit mx-auto mb-6">
                                <Clock className="w-8 h-8 text-accent-600" />
                            </div>

                            <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                Wait! Don't Leave Yet
                            </h3>
                            
                            <p className="text-gray-600 mb-6">
                                You've spent {formatTime(timeOnSite)} exploring our services. 
                                Get a free quote before you go - it only takes 2 minutes!
                            </p>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleQuickQuoteClick}
                                    className="bg-accent-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-accent-700 transition-colors"
                                >
                                    Get Quick Quote (2 min)
                                </button>
                                
                                <div className="flex gap-2">
                                    <a
                                        href="tel:(602) 818-5834"
                                        className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-full font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <Phone className="w-4 h-4" />
                                        <span>Call Now</span>
                                    </a>
                                    
                                    <button
                                        onClick={() => setShowExitIntent(false)}
                                        className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-full font-medium hover:bg-gray-300 transition-colors"
                                    >
                                        Maybe Later
                                    </button>
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 mt-4">
                                📞 Available 24/7 for emergencies • Free consultation
                            </p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Time-based Engagement Prompt */}
            <AnimatePresence>
                {showTimePrompt && !showExitIntent && (
                    <motion.div
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 300 }}
                        className="fixed bottom-20 right-6 z-40 bg-white rounded-xl shadow-2xl p-6 max-w-sm border border-gray-200"
                    >
                        <button
                            onClick={() => setShowTimePrompt(false)}
                            className="absolute top-2 right-2 px-2 py-1 rounded text-xs 
                                     bg-gray-600 hover:bg-gray-700 text-white 
                                     font-medium transition-all duration-200 
                                     shadow-sm hover:shadow-md border border-gray-700 hover:border-gray-800"
                        >
                            Close
                        </button>

                        <div className="flex items-start space-x-3">
                            <div className="bg-accent-100 rounded-full p-2 flex-shrink-0">
                                <MessageCircle className="w-5 h-5 text-accent-600" />
                            </div>
                            
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    Interested in Remodeling?
                                </h4>
                                <p className="text-sm text-gray-600 mb-3">
                                    You've been browsing for {formatTime(timeOnSite)}. Ready for a quick quote?
                                </p>
                                
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleTimePromptQuoteClick}
                                        className="bg-accent-600 text-white text-sm py-2 px-3 rounded-lg font-medium hover:bg-accent-700 transition-colors"
                                    >
                                        Get Quote
                                    </button>
                                    
                                    <button
                                        onClick={() => setShowTimePrompt(false)}
                                        className="bg-gray-100 text-gray-700 text-sm py-2 px-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                                    >
                                        Not Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default LeadEngagementTracker
