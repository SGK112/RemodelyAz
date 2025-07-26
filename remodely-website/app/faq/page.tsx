'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const faqs = [
        {
            question: "How long does a typical kitchen remodel take?",
            answer: "A typical kitchen remodel takes 6-12 weeks depending on the scope of work. Minor updates may take 2-4 weeks, while major renovations with structural changes can take 12-16 weeks. We provide detailed timelines during the planning phase."
        },
        {
            question: "Do I need permits for my remodeling project?",
            answer: "Most remodeling projects require permits, especially those involving electrical, plumbing, or structural changes. We handle all permit applications and work with local authorities to ensure compliance with current building codes."
        },
        {
            question: "Can I live in my home during the renovation?",
            answer: "In most cases, yes. We work to minimize disruption to your daily life by containing work areas and maintaining clean, safe pathways. For major renovations, you may need alternative arrangements for certain rooms during specific phases."
        },
        {
            question: "What's included in your design consultation?",
            answer: "Our design consultation includes a thorough assessment of your space, discussion of your vision and needs, preliminary design concepts, material recommendations, and a detailed project estimate. We also provide 3D renderings for major projects."
        },
        {
            question: "How do you handle cost overruns?",
            answer: "We provide detailed estimates and stick to agreed-upon budgets. Any changes to the original scope are discussed and approved before implementation. We maintain transparent communication about costs throughout the project."
        },
        {
            question: "What warranties do you provide?",
            answer: "We provide comprehensive warranties on our workmanship and stand behind all installations. Specific warranty terms vary by project scope and materials used. We'll review warranty details during your consultation."
        },
        {
            question: "Do you work with HOA requirements?",
            answer: "Yes, we're experienced with Arizona HOA requirements and handle all necessary approvals. We prepare and submit architectural review applications and ensure your project meets community standards."
        },
        {
            question: "What payment schedule do you use?",
            answer: "We typically use a progress-based payment schedule with an initial deposit, milestone payments during construction, and final payment upon completion. Specific terms are outlined in your contract."
        },
        {
            question: "Can you work with my existing design ideas?",
            answer: "Absolutely! We love collaborating with homeowners who have vision and inspiration. We'll work with your ideas, Pinterest boards, and wish lists to create a design that reflects your personal style."
        },
        {
            question: "What makes your company different?",
            answer: "We focus exclusively on kitchen and bathroom remodeling, bringing specialized expertise to every project. Our team understands Arizona's unique climate considerations, local building codes, and design preferences that work best in desert living."
        }
    ]

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Get answers to common questions about our remodeling process, timelines, and services.
                    </p>
                </motion.div>

                {/* FAQ List */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-4"
                >
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                                    {faq.question}
                                </h3>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-primary-600 flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                )}
                            </button>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="px-6 pb-6"
                                >
                                    <p className="text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </motion.div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="bg-primary-50 rounded-2xl p-8 text-center mt-16"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Still Have Questions?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Our team is here to help with any additional questions about your remodeling project.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors"
                    >
                        Contact Us Today
                    </a>
                </motion.div>
            </div>
        </div>
    )
}

export default FAQPage
