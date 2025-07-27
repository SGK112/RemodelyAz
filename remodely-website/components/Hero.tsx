'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SafeImage from './SafeImage'
import { ArrowRight, Star, CheckCircle } from 'lucide-react'

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <SafeImage
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&h=1080&fit=crop&crop=faces&auto=format&q=85&sharp=10&sat=10"
                    alt="Professional Kitchen Remodeling by Remodely Arizona - Modern Kitchen with Premium Countertops and Custom Cabinetry"
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/70 to-navy-900/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6"
                    >
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                        <span className="text-white text-xs sm:text-sm font-medium">4.7★ Rating - 146+ Google Reviews</span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight"
                    >
                        Remodely Arizona
                        <span className="block text-accent-500">
                            Premium Remodeling
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0"
                    >
                        Arizona's trusted remodeling experts with 400+ completed projects.
                        Premium kitchen & bathroom renovations with 5+ years of proven excellence.
                    </motion.p>

                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-6 mb-10"
                    >
                        {[
                            'Licensed AzRoc #327266',
                            '400+ Projects',
                            '4.7★ Rating',
                            'Surprise, AZ Based'
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 text-white">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span className="font-medium">{feature}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
                    >
                        <Link
                            href="/contact"
                            className="group bg-accent-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-accent-700 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto justify-center min-h-[48px] touch-manipulation"
                        >
                            <span>Start Your Project</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/gallery"
                            className="group glass-card text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto justify-center min-h-[48px] touch-manipulation"
                        >
                            <span>View Gallery</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/20"
                    >
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">400+</div>
                            <div className="text-gray-300 text-xs sm:text-sm">Projects Completed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">5+</div>
                            <div className="text-gray-300 text-xs sm:text-sm">Years Experience</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">4.7★</div>
                            <div className="text-gray-300 text-xs sm:text-sm">Google Rating</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator - Hidden on small screens */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
            >
                <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1 h-2 sm:h-3 bg-white/60 rounded-full mt-1 sm:mt-2"
                    />
                </div>
            </motion.div>
        </section>
    )
}

export default Hero
