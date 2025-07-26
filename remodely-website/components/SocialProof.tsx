'use client'

import { motion } from 'framer-motion'
import { Star, Shield, Award, CheckCircle, Users, ThumbsUp } from 'lucide-react'

const SocialProof = () => {
    const certifications = [
        {
            name: 'Better Business Bureau',
            rating: 'A+ Rating',
            icon: <Shield className="w-8 h-8 text-blue-600" />,
            color: 'bg-blue-50 border-blue-200',
            textColor: 'text-blue-800'
        },
        {
            name: 'Arizona ROC Licensed',
            rating: 'License #327266',
            icon: <Award className="w-8 h-8 text-green-600" />,
            color: 'bg-green-50 border-green-200',
            textColor: 'text-green-800'
        },
        {
            name: 'HomeAdvisor',
            rating: 'Elite Service Pro',
            icon: <ThumbsUp className="w-8 h-8 text-orange-600" />,
            color: 'bg-orange-50 border-orange-200',
            textColor: 'text-orange-800'
        },
        {
            name: 'Angie\'s List',
            rating: 'Super Service Award',
            icon: <Star className="w-8 h-8 text-purple-600" />,
            color: 'bg-purple-50 border-purple-200',
            textColor: 'text-purple-800'
        }
    ]

    const trustedBy = [
        {
            logo: (
                <svg className="w-24 h-8" viewBox="0 0 120 32" fill="none">
                    <rect x="0" y="8" width="48" height="16" rx="2" fill="#1f2937" />
                    <text x="24" y="20" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">BBB</text>
                    <rect x="52" y="12" width="16" height="8" rx="1" fill="#10b981" />
                    <text x="72" y="20" fill="#1f2937" fontSize="10" fontWeight="600">A+ Rating</text>
                </svg>
            ),
            name: 'Better Business Bureau'
        },
        {
            logo: (
                <svg className="w-24 h-8" viewBox="0 0 120 32" fill="none">
                    <circle cx="16" cy="16" r="12" fill="#f97316" />
                    <text x="16" y="20" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">HA</text>
                    <text x="36" y="20" fill="#1f2937" fontSize="10" fontWeight="600">HomeAdvisor</text>
                </svg>
            ),
            name: 'HomeAdvisor Certified'
        },
        {
            logo: (
                <svg className="w-24 h-8" viewBox="0 0 120 32" fill="none">
                    <rect x="0" y="4" width="32" height="24" rx="4" fill="#8b5cf6" />
                    <text x="16" y="20" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">AZ</text>
                    <text x="40" y="20" fill="#1f2937" fontSize="10" fontWeight="600">ROC Licensed</text>
                </svg>
            ),
            name: 'Arizona ROC #327266'
        },
        {
            logo: (
                <svg className="w-24 h-8" viewBox="0 0 120 32" fill="none">
                    <polygon points="16,4 20,12 28,12 22,18 24,26 16,22 8,26 10,18 4,12 12,12" fill="#eab308" />
                    <text x="36" y="20" fill="#1f2937" fontSize="10" fontWeight="600">Angie's List</text>
                </svg>
            ),
            name: 'Super Service Award'
        }
    ]

    const stats = [
        { number: '500+', label: 'Projects Completed', icon: <CheckCircle className="w-5 h-5" /> },
        { number: '98%', label: 'Customer Satisfaction', icon: <ThumbsUp className="w-5 h-5" /> },
        { number: '15+', label: 'Years Experience', icon: <Award className="w-5 h-5" /> },
        { number: '50+', label: '5-Star Reviews', icon: <Star className="w-5 h-5" /> }
    ]

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                        Trusted by Thousands, Certified by the Best
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Licensed, insured, and recognized by Arizona's leading industry organizations
                    </p>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <div className="text-accent-600">{stat.icon}</div>
                                <span className="text-3xl font-bold text-gray-900">{stat.number}</span>
                            </div>
                            <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Certifications Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`${cert.color} border-2 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                        >
                            <div className="flex justify-center mb-4">
                                {cert.icon}
                            </div>
                            <h4 className={`font-bold text-lg ${cert.textColor} mb-2`}>{cert.name}</h4>
                            <p className="text-sm text-gray-600 font-medium">{cert.rating}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Trust Logos */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl shadow-lg p-8"
                >
                    <h3 className="text-xl font-display font-bold text-gray-900 text-center mb-8">
                        Recognized By Industry Leaders
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                        {trustedBy.map((company, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center text-center space-y-2 group cursor-pointer"
                            >
                                <div className="transform group-hover:scale-110 transition-transform duration-300">
                                    {company.logo}
                                </div>
                                <p className="text-xs text-gray-500 font-medium">{company.name}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <div className="bg-gradient-to-r from-accent-600 to-primary-600 rounded-2xl p-8 text-white">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <Users className="w-6 h-6" />
                            <span className="text-lg font-semibold">Join Our Satisfied Customers</span>
                        </div>
                        <p className="text-accent-100 mb-6">
                            Experience the quality and professionalism that has earned us Arizona's trust
                        </p>
                        <button className="bg-white text-accent-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                            Get Your Free Quote Today
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default SocialProof
