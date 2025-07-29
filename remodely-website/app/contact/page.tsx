'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

interface FormData {
    name: string
    email: string
    phone: string
    projectType: string
    budget: string
    message: string
    propertyType: 'residential' | 'commercial'
}

interface CompanyData {
    phone: string
    email: string
    address: string
}

const ContactPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [companyData, setCompanyData] = useState<CompanyData>({
        phone: '(602) 818-5834',
        email: 'help.remodely@gmail.com',
        address: '15464 W Aster Dr, Surprise, AZ 85379'
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

    useEffect(() => {
        fetch('/api/admin/company')
            .then(res => res.json())
            .then(data => setCompanyData(data))
            .catch(console.error)
    }, [])

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                setIsSubmitted(true)
                reset()
            } else {
                throw new Error('Failed to send message')
            }
        } catch (error) {
            console.error('Error sending message:', error)
            alert('Failed to send message. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md mx-auto px-4"
                >
                    <div className="bg-green-100 rounded-full p-6 w-fit mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                        Thank You!
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Your message has been sent successfully. We'll get back to you within 24 hours.
                    </p>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-accent-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-accent-700 hover:shadow-lg transition-all duration-300"
                    >
                        Send Another Message
                    </button>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                        Let's Discuss Your
                        <span className="block text-accent-600">
                            Contact Us
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Ready to transform your space? Get in touch for a free consultation and personalized quote.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <div className="glass-card rounded-2xl p-8 h-fit">
                            <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                                Get in Touch
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary-100 rounded-full p-3">
                                        <Phone className="w-6 h-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                                        <p className="text-gray-600">{companyData.phone}</p>
                                        <p className="text-sm text-gray-500">Available 24/7 for emergencies</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary-100 rounded-full p-3">
                                        <Mail className="w-6 h-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                                        <p className="text-gray-600">{companyData.email}</p>
                                        <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary-100 rounded-full p-3">
                                        <MapPin className="w-6 h-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                                        <p className="text-gray-600">
                                            {companyData.address}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary-100 rounded-full p-3">
                                        <Clock className="w-6 h-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                                        <div className="text-gray-600 text-sm space-y-1">
                                            <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                                            <p>Sat: 9:00 AM - 4:00 PM</p>
                                            <p>Sun: Closed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h4 className="font-semibold text-gray-900 mb-3">Why Choose Us?</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                        Quality Assurance
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                        10-Year Warranty
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                        Free Consultation
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                        Premium Design
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:col-span-2"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="glass-card rounded-2xl p-8">
                            <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                                Request Your Free Consultation
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        {...register('name', { required: 'Name is required' })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Your full name"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address'
                                            }
                                        })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                        placeholder="your.email@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        {...register('phone')}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                        placeholder="(555) 123-4567"
                                    />
                                </div>

                                {/* Property Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Property Type *
                                    </label>
                                    <select
                                        {...register('propertyType', { required: 'Property type is required' })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                    >
                                        <option value="">Select property type</option>
                                        <option value="residential">Residential</option>
                                        <option value="commercial">Commercial</option>
                                    </select>
                                    {errors.propertyType && (
                                        <p className="text-red-500 text-sm mt-1">{errors.propertyType.message}</p>
                                    )}
                                </div>

                                {/* Project Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Project Type *
                                    </label>
                                    <select
                                        {...register('projectType', { required: 'Project type is required' })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                    >
                                        <option value="">Select project type</option>
                                        <option value="kitchen">Kitchen Remodeling</option>
                                        <option value="bathroom">Bathroom Remodeling</option>
                                        <option value="whole-home">Whole Home Renovation</option>
                                        <option value="commercial">Commercial Remodeling</option>
                                        <option value="consultation">Design Consultation</option>
                                    </select>
                                    {errors.projectType && (
                                        <p className="text-red-500 text-sm mt-1">{errors.projectType.message}</p>
                                    )}
                                </div>

                                {/* Budget */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Budget Range *
                                    </label>
                                    <select
                                        {...register('budget', { required: 'Budget range is required' })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                    >
                                        <option value="">Select budget range</option>
                                        <option value="under-25k">Under $25,000</option>
                                        <option value="25k-50k">$25,000 - $50,000</option>
                                        <option value="50k-100k">$50,000 - $100,000</option>
                                        <option value="100k-200k">$100,000 - $200,000</option>
                                        <option value="over-200k">Over $200,000</option>
                                    </select>
                                    {errors.budget && (
                                        <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Message */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Project Details *
                                </label>
                                <textarea
                                    {...register('message', { required: 'Message is required' })}
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Tell us about your project, timeline, specific requirements, and any questions you have..."
                                />
                                {errors.message && (
                                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="mt-8">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-accent-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            <p className="text-sm text-gray-500 mt-4 text-center">
                                By submitting this form, you agree to our privacy policy and terms of service.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage
