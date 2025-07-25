'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const SocialProof = () => {
    const badges = [
        {
            name: 'Better Business Bureau',
            image: 'https://images.unsplash.com/photo-1615736305026-6e7ffe1b8a77?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            rating: 'A+ Rating'
        },
        {
            name: 'Angie\'s List',
            image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            rating: 'Super Service Award'
        },
        {
            name: 'HomeAdvisor',
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            rating: 'Elite Service'
        },
        {
            name: 'Nextdoor',
            image: 'https://images.unsplash.com/photo-1587654902815-45b6f5a16aa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            rating: 'Neighborhood Favorite'
        }
    ]

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                        Trusted by Thousands, Certified by the Best
                    </h3>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {badges.map((badge, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                                <div className="relative w-16 h-16 mx-auto mb-4">
                                    <div className="w-full h-full bg-accent-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-2xl">{badge.name.charAt(0)}</span>
                                    </div>
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">{badge.name}</h4>
                                <p className="text-sm text-gray-600">{badge.rating}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SocialProof
