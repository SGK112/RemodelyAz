'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { X, Send, CheckCircle, Calculator, DollarSign } from 'lucide-react'
import { leadAnalytics } from '@/lib/lead-analytics'

interface QuickQuoteData {
    name: string
    email: string
    phone: string
    projectType: string
    propertyType: 'residential' | 'commercial'
    timeframe: string
    estimatedBudget: string
    projectDescription: string
}

interface QuickQuoteModalProps {
    isOpen: boolean
    onClose: () => void
}

const QuickQuoteModal = ({ isOpen, onClose }: QuickQuoteModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<QuickQuoteData>()

    // Track form start when modal opens
    useEffect(() => {
        if (isOpen) {
            leadAnalytics?.trackFormStart('quick_quote')
        }
    }, [isOpen])

    // Handle close with persistence
    const handleClose = () => {
        if (!isSubmitting) {
            // Set localStorage to remember modal was dismissed for 24 hours
            const dismissUntil = Date.now() + (24 * 60 * 60 * 1000) // 24 hours
            localStorage.setItem('quickQuoteModalDismissed', dismissUntil.toString())
            setIsSubmitted(false)
            onClose()
        }
    }

    const onSubmit = async (data: QuickQuoteData) => {
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/quick-quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    type: 'quick-quote'
                }),
            })

            if (response.ok) {
                setIsSubmitted(true)
                reset()
                leadAnalytics?.trackFormSubmit('quick_quote', true)
                // Auto-close after success
                setTimeout(() => {
                    setIsSubmitted(false)
                    onClose()
                }, 3000)
            } else {
                throw new Error('Failed to send quote request')
            }
        } catch (error) {
            console.error('Error sending quote request:', error)
            leadAnalytics?.trackFormSubmit('quick_quote', false)
            alert('Failed to send quote request. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    {/* Professional Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-navy-900/80 backdrop-blur-md"
                        onClick={handleClose}
                    />

                    {/* Modal Container - Mobile Optimized */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl 
                                 w-full max-w-lg sm:max-w-2xl max-h-[90vh] sm:max-h-[95vh] overflow-y-auto
                                 mx-auto my-auto"
                    >
                        {/* Close Button - Enhanced Mobile Design */}
                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 
                                     p-3 sm:p-3 rounded-full bg-gray-900/10 hover:bg-gray-900/20
                                     backdrop-blur-sm border border-white/40 hover:border-white/60
                                     transition-all duration-200 touch-manipulation
                                     flex items-center justify-center shadow-lg
                                     w-10 h-10 sm:w-12 sm:h-12"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 font-bold stroke-2" />
                        </button>

                        {isSubmitted ? (
                            <div className="p-6 sm:p-8 text-center">
                                <div className="bg-accent-50 border border-accent-100 rounded-2xl p-6 sm:p-8 w-fit mx-auto mb-6">
                                    <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-accent-600 mx-auto" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-4">
                                    Quote Request Sent!
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                    We'll prepare your personalized quote and get back to you within 2 hours.
                                </p>
                            </div>
                        ) : (
                            <div className="p-4 sm:p-6 lg:p-8">
                                {/* Header - Professional Design */}
                                <div className="text-center mb-6 sm:mb-8">
                                    <div className="bg-accent-50 border border-accent-100 rounded-2xl p-3 sm:p-4 w-fit mx-auto mb-4">
                                        <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-accent-600 mx-auto" />
                                    </div>
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-gray-900 mb-2">
                                        Get Your Quick Quote
                                    </h2>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto">
                                        Tell us about your project and we'll provide a personalized estimate
                                    </p>
                                </div>

                                {/* Form - Mobile Optimized */}
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                                    {/* Personal Info */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                {...register('name', { required: 'Name is required' })}
                                                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl 
                                                         focus:ring-2 focus:ring-accent-500 focus:border-accent-500 
                                                         transition-all duration-200 text-base touch-manipulation
                                                         bg-white/80 backdrop-blur-sm"
                                                placeholder="Your name"
                                            />
                                            {errors.name && (
                                                <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                {...register('email', {
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^\S+@\S+$/i,
                                                        message: 'Invalid email address'
                                                    }
                                                })}
                                                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl 
                                                         focus:ring-2 focus:ring-accent-500 focus:border-accent-500 
                                                         transition-all duration-200 text-base touch-manipulation
                                                         bg-white/80 backdrop-blur-sm"
                                                placeholder="your@email.com"
                                            />
                                            {errors.email && (
                                                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            {...register('phone')}
                                            className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl 
                                                     focus:ring-2 focus:ring-accent-500 focus:border-accent-500 
                                                     transition-all duration-200 text-base touch-manipulation
                                                     bg-white/80 backdrop-blur-sm"
                                            placeholder="(602) 123-4567"
                                        />
                                    </div>

                                    {/* Project Details */}
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Project Type *
                                            </label>
                                            <select
                                                {...register('projectType', { required: 'Project type is required' })}
                                                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl 
                                                         focus:ring-2 focus:ring-accent-500 focus:border-accent-500 
                                                         transition-all duration-200 text-base touch-manipulation
                                                         bg-white/80 backdrop-blur-sm appearance-none cursor-pointer"
                                            >
                                                <option value="">Select project type</option>
                                                <option value="kitchen-remodel">Kitchen Remodel</option>
                                                <option value="bathroom-remodel">Bathroom Remodel</option>
                                                <option value="countertops">Countertops</option>
                                                <option value="flooring">Flooring</option>
                                                <option value="home-addition">Home Addition</option>
                                                <option value="commercial-renovation">Commercial Renovation</option>
                                                <option value="other">Other</option>
                                            </select>
                                            {errors.projectType && (
                                                <p className="text-red-600 text-sm mt-1">{errors.projectType.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Property Type *
                                            </label>
                                            <select
                                                {...register('propertyType', { required: 'Property type is required' })}
                                                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl 
                                                         focus:ring-2 focus:ring-accent-500 focus:border-accent-500 
                                                         transition-all duration-200 text-base touch-manipulation
                                                         bg-white/80 backdrop-blur-sm appearance-none cursor-pointer"
                                            >
                                                <option value="">Select property type</option>
                                                <option value="residential">Residential</option>
                                                <option value="commercial">Commercial</option>
                                            </select>
                                            {errors.propertyType && (
                                                <p className="text-red-600 text-sm mt-1">{errors.propertyType.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Timeframe *
                                            </label>
                                            <select
                                                {...register('timeframe', { required: 'Timeframe is required' })}
                                                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl 
                                                         focus:ring-2 focus:ring-accent-500 focus:border-accent-500 
                                                         transition-all duration-200 text-base touch-manipulation
                                                         bg-white/80 backdrop-blur-sm appearance-none cursor-pointer"
                                            >
                                                <option value="">Select timeframe</option>
                                                <option value="asap">ASAP</option>
                                                <option value="1-3-months">1-3 months</option>
                                                <option value="3-6-months">3-6 months</option>
                                                <option value="6-12-months">6-12 months</option>
                                                <option value="planning">Just planning</option>
                                            </select>
                                            {errors.timeframe && (
                                                <p className="text-red-600 text-sm mt-1">{errors.timeframe.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Estimated Budget *
                                            </label>
                                            <select
                                                {...register('estimatedBudget', { required: 'Budget range is required' })}
                                                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl 
                                                         focus:ring-2 focus:ring-accent-500 focus:border-accent-500 
                                                         transition-all duration-200 text-base touch-manipulation
                                                         bg-white/80 backdrop-blur-sm appearance-none cursor-pointer"
                                            >
                                                <option value="">Select budget range</option>
                                                <option value="under-10k">Under $10,000</option>
                                                <option value="10k-25k">$10,000 - $25,000</option>
                                                <option value="25k-50k">$25,000 - $50,000</option>
                                                <option value="50k-100k">$50,000 - $100,000</option>
                                                <option value="over-100k">Over $100,000</option>
                                            </select>
                                            {errors.estimatedBudget && (
                                                <p className="text-red-600 text-sm mt-1">{errors.estimatedBudget.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Project Description *
                                        </label>
                                        <textarea
                                            {...register('projectDescription', { required: 'Project description is required' })}
                                            rows={4}
                                            className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl 
                                                     focus:ring-2 focus:ring-accent-500 focus:border-accent-500 
                                                     transition-all duration-200 text-base touch-manipulation
                                                     bg-white/80 backdrop-blur-sm resize-none"
                                            placeholder="Describe your project, materials preferences, and any specific requirements..."
                                        />
                                        {errors.projectDescription && (
                                            <p className="text-red-600 text-sm mt-1">{errors.projectDescription.message}</p>
                                        )}
                                    </div>

                                    {/* Submit Button - Professional Design */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-accent-600 hover:bg-accent-700 text-white 
                                                 py-3 sm:py-4 px-6 rounded-xl font-semibold text-base sm:text-lg 
                                                 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed 
                                                 transition-all duration-300 touch-manipulation
                                                 flex items-center justify-center space-x-2 min-h-[48px]
                                                 border border-accent-700 hover:border-accent-800"
                                    >
                                        {isSubmitting ? (
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        ) : (
                                            <>
                                                <DollarSign className="w-5 h-5" />
                                                <span>Get My Quote</span>
                                            </>
                                        )}
                                    </button>

                                    <p className="text-sm text-gray-500 text-center leading-relaxed">
                                        We'll respond with your personalized quote within 2 hours
                                    </p>
                                </form>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default QuickQuoteModal
