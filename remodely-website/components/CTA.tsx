'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, Mail } from 'lucide-react'

const CTA = () => {
    return (
        <section className="py-20 bg-navy-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        Ready to Transform
                        <span className="block">Your Space?</span>
                    </h2>
                    <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                        Get a free consultation and quote for your dream remodeling project.
                        Our experts are ready to bring your vision to life.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <Link
                            href="/contact"
                            className="group bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
                        >
                            <span>Get Free Quote</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <div className="flex items-center space-x-4 text-white">
                            <div className="flex items-center space-x-2">
                                <Phone className="w-5 h-5" />
                                <span className="text-lg font-medium">(555) 123-4567</span>
                            </div>
                            <div className="text-primary-200">or</div>
                            <div className="flex items-center space-x-2">
                                <Mail className="w-5 h-5" />
                                <span className="text-lg font-medium">info@remodely.ai.com</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-primary-100 text-sm">
                        Free consultation • No obligation • Licensed & insured
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default CTA
