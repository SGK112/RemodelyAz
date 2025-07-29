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

    const handleClose = () => {
        if (!isSubmitting) {
            setIsSubmitted(false)
            onClose()
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={handleClose}
                    />
                    
                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>

                        {isSubmitted ? (
                            <div className="p-8 text-center">
                                <div className="bg-green-100 rounded-full p-6 w-fit mx-auto mb-6">
                                    <CheckCircle className="w-12 h-12 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                    Quote Request Sent!
                                </h3>
                                <p className="text-gray-600">
                                    We'll prepare your personalized quote and get back to you within 2 hours.
                                </p>
                            </div>
                        ) : (
                            <div className="p-8">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className="bg-accent-100 rounded-full p-4 w-fit mx-auto mb-4">
                                        <Calculator className="w-8 h-8 text-accent-600" />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                                        Get Your Quick Quote
                                    </h3>
                                    <p className="text-gray-600">
                                        Tell us about your project and we'll provide a personalized estimate
                                    </p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Personal Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                {...register('name', { required: 'Name is required' })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
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
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
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
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
                                            placeholder="(602) 123-4567"
                                        />
                                    </div>

                                    {/* Project Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Project Type *
                                            </label>
                                            <select
                                                {...register('projectType', { required: 'Project type is required' })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
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
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
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

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Timeframe *
                                            </label>
                                            <select
                                                {...register('timeframe', { required: 'Timeframe is required' })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
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
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
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
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
                                            placeholder="Describe your project, materials preferences, and any specific requirements..."
                                        />
                                        {errors.projectDescription && (
                                            <p className="text-red-600 text-sm mt-1">{errors.projectDescription.message}</p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-accent-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-accent-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
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

                                    <p className="text-sm text-gray-500 text-center">
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
