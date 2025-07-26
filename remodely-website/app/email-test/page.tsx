'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Users, MessageSquare } from 'lucide-react'

export default function EmailTestPage() {
    const [results, setResults] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const testWelcomeEmail = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/email/welcome', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Test Customer',
                    email: 'test@remodely.ai'
                })
            })
            const result = await response.json()
            setResults({ type: 'welcome', ...result })
        } catch (error) {
            setResults({ type: 'welcome', error: 'Failed to send' })
        } finally {
            setLoading(false)
        }
    }

    const testQuoteEmail = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/email/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Test Customer',
                    email: 'test@remodely.ai',
                    projectType: 'Kitchen Remodel',
                    estimatedCost: '$25,000 - $35,000',
                    timeline: '6-8 weeks'
                })
            })
            const result = await response.json()
            setResults({ type: 'quote', ...result })
        } catch (error) {
            setResults({ type: 'quote', error: 'Failed to send' })
        } finally {
            setLoading(false)
        }
    }

    const testContactForm = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Test Customer',
                    email: 'test@remodely.ai',
                    phone: '(555) 123-4567',
                    projectType: 'Bathroom Remodel',
                    budget: '$15,000 - $25,000',
                    message: 'This is a test message from the email testing system.',
                    propertyType: 'residential'
                })
            })
            const result = await response.json()
            setResults({ type: 'contact', ...result })
        } catch (error) {
            setResults({ type: 'contact', error: 'Failed to send' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                        Email System Test Panel
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Test the various email functionalities for help@remodely.ai
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-lg p-8 text-center"
                    >
                        <div className="flex justify-center mb-4">
                            <Mail className="w-12 h-12 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Welcome Email</h3>
                        <p className="text-gray-600 mb-6">
                            Test the welcome email template sent to new customers
                        </p>
                        <button
                            onClick={testWelcomeEmail}
                            disabled={loading}
                            className="btn-glassmorphic w-full flex items-center justify-center space-x-2"
                        >
                            <Send className="w-4 h-4" />
                            <span>Send Test</span>
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-lg p-8 text-center"
                    >
                        <div className="flex justify-center mb-4">
                            <MessageSquare className="w-12 h-12 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Quote Email</h3>
                        <p className="text-gray-600 mb-6">
                            Test the quote email template with project details
                        </p>
                        <button
                            onClick={testQuoteEmail}
                            disabled={loading}
                            className="btn-glassmorphic w-full flex items-center justify-center space-x-2"
                        >
                            <Send className="w-4 h-4" />
                            <span>Send Test</span>
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-lg p-8 text-center"
                    >
                        <div className="flex justify-center mb-4">
                            <Users className="w-12 h-12 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Form</h3>
                        <p className="text-gray-600 mb-6">
                            Test the contact form submission email notification
                        </p>
                        <button
                            onClick={testContactForm}
                            disabled={loading}
                            className="btn-glassmorphic w-full flex items-center justify-center space-x-2"
                        >
                            <Send className="w-4 h-4" />
                            <span>Send Test</span>
                        </button>
                    </motion.div>
                </div>

                {results && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-2xl shadow-lg p-8"
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Test Results</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                                {JSON.stringify(results, null, 2)}
                            </pre>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 mt-12"
                >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Email Provider Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900">Current Provider</h4>
                            <p className="text-gray-600">Gmail (via SMTP)</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900">From Address</h4>
                            <p className="text-gray-600">help@remodely.ai</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900">Available Providers</h4>
                            <p className="text-gray-600">Gmail, SendGrid, Mailgun, SES, Custom SMTP</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900">Features</h4>
                            <p className="text-gray-600">Templates, Bulk Email, Analytics</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
