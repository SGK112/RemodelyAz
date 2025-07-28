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
        <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-navy-800 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight">
                        Ready to Transform
                        <span className="block text-accent-400">Your Space?</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                        Get a free consultation and quote for your dream remodeling project.
                        Our experts are ready to bring your vision to life.
                    </p>

                    {/* Mobile-Optimized Contact Section */}
                    <div className="flex flex-col gap-4 sm:gap-6 justify-center items-center mb-6 sm:mb-8">
                        <Link
                            href="/contact"
                            className="group bg-white text-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl min-w-[200px] justify-center"
                        >
                            <span>Get Free Quote</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        {/* Mobile-Friendly Contact Info */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-white">
                            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-accent-400" />
                                <a 
                                    href={`tel:${companyData.phone}`}
                                    className="text-base sm:text-lg font-medium hover:text-accent-400 transition-colors"
                                >
                                    {companyData.phone}
                                </a>
                            </div>
                            
                            <div className="text-blue-200 text-sm hidden sm:block">or</div>
                            
                            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-accent-400" />
                                <a 
                                    href={`mailto:${companyData.email}`}
                                    className="text-base sm:text-lg font-medium hover:text-accent-400 transition-colors"
                                >
                                    {companyData.email}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="text-blue-100 text-xs sm:text-sm opacity-90">
                        Free consultation • No obligation • Professional service
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default CTA
