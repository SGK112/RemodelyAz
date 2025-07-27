'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, Phone, Mail } from 'lucide-react'

interface CompanyData {
    phone: string
    email: string
}

const CTA = () => {
    const [companyData, setCompanyData] = useState<CompanyData>({
        phone: '(480) 255-5887',
        email: 'help.remodely@gmail.com'
    })

    useEffect(() => {
        fetch('/api/admin/company')
            .then(res => res.json())
            .then(data => setCompanyData(data))
            .catch(console.error)
    }, [])
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
                        Start Your Dream
                        <span className="block">Remodel Today</span>
                    </h2>
                    <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                        Contact us for a free consultation and personalized quote.
                        Let's bring your vision to life with expert craftsmanship.
                    </p>

                    <div className="space-y-6">
                        {/* Primary CTA Button */}
                        <div className="flex justify-center">
                            <Link
                                href="/contact"
                                className="group bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 shadow-lg"
                            >
                                <span>Get Free Quote</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Contact Options */}
                        <div className="space-y-4">
                            <div className="text-primary-200 text-sm font-medium">
                                or contact us directly
                            </div>

                            {/* Phone and Email - Stacked on Mobile */}
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                                <a
                                    href={`tel:${companyData.phone}`}
                                    className="flex items-center space-x-2 text-white hover:text-primary-200 transition-colors group"
                                >
                                    <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <span className="text-lg font-medium">{companyData.phone}</span>
                                </a>

                                <div className="hidden md:block text-primary-200 text-sm">•</div>

                                <a
                                    href={`mailto:${companyData.email}`}
                                    className="flex items-center space-x-2 text-white hover:text-primary-200 transition-colors group"
                                >
                                    <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span className="text-lg font-medium break-all md:break-normal">{companyData.email}</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="text-primary-100 text-sm mt-8 space-y-2">
                        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                            <span className="flex items-center">
                                ✓ Free consultation
                            </span>
                            <span className="flex items-center">
                                ✓ No obligation
                            </span>
                            <span className="flex items-center">
                                ✓ Licensed & insured
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default CTA
