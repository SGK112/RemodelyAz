'use client'

import { motion } from 'framer-motion'
import { Star, CheckCircle, Users, ThumbsUp, Clock, Shield } from 'lucide-react'

const SocialProof = () => {
    const features = [
        {
            name: 'Quality Assurance',
            rating: 'Premium Service',
            icon: <Shield className="w-8 h-8 text-blue-600" />,
            color: 'bg-blue-50 border-blue-200',
            textColor: 'text-blue-800'
        },
        {
            name: 'Customer Satisfaction',
            rating: '98% Success Rate',
            icon: <ThumbsUp className="w-8 h-8 text-green-600" />,
            color: 'bg-green-50 border-green-200',
            textColor: 'text-green-800'
        },
        {
            name: 'Timely Delivery',
            rating: 'On-Time Completion',
            icon: <Clock className="w-8 h-8 text-orange-600" />,
            color: 'bg-orange-50 border-orange-200',
            textColor: 'text-orange-800'
        },
        {
            name: 'Expert Team',
            rating: 'Skilled Professionals',
            icon: <Users className="w-8 h-8 text-purple-600" />,
            color: 'bg-purple-50 border-purple-200',
            textColor: 'text-purple-800'
        }
    ]

    const stats = [
        { number: '500+', label: 'Projects Completed', icon: <CheckCircle className="w-5 h-5" /> },
        { number: '98%', label: 'Customer Satisfaction', icon: <ThumbsUp className="w-5 h-5" /> },
        { number: '15+', label: 'Years Experience', icon: <Users className="w-5 h-5" /> },
        { number: '2,500+', label: 'Happy Clients', icon: <Star className="w-5 h-5" /> }
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
                        Arizona's Premier Remodeling Experience
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Professional, reliable, and trusted by Arizona homeowners
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
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`${feature.color} border-2 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                        >
                            <div className="flex justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h4 className={`font-bold text-lg ${feature.textColor} mb-2`}>{feature.name}</h4>
                            <p className="text-sm text-gray-600 font-medium">{feature.rating}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl shadow-lg p-8"
                >
                    <h3 className="text-xl font-display font-bold text-gray-900 text-center mb-8">
                        Proven Track Record
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center space-y-2"
                            >
                                <div className="text-accent-600 mb-2">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
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
