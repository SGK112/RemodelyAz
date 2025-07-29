'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, CheckCircle, Play } from 'lucide-react'
import { PRODUCTION_IMAGES } from '@/lib/production-images'

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Hero Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={PRODUCTION_IMAGES.hero_kitchen}
                    alt="Luxury Kitchen Remodeling by RemodelyAz - Modern Design with Premium Finishes"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 via-navy-900/60 to-navy-900/40" />
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 z-5">
                {/* Top Right Project Preview */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="absolute top-20 right-8 hidden lg:block"
                >
                    <div className="bg-white/10  border border-white/20 rounded-2xl p-4 max-w-xs">
                        <div className="relative h-32 w-full rounded-lg overflow-hidden mb-3">
                            <Image
                                src={PRODUCTION_IMAGES.bathroom_luxury}
                                alt="Luxury Bathroom Remodel"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 0px, 320px"
                            />
                        </div>
                        <h4 className="text-white font-semibold text-sm mb-1">Latest Project</h4>
                        <p className="text-gray-300 text-xs">Luxury Master Bath - Phoenix</p>
                    </div>
                </motion.div>

                {/* Bottom Left Stats */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-20 left-8 hidden lg:block"
                >
                    <div className="bg-white/10  border border-white/20 rounded-2xl p-6">
                        <div className="flex items-center space-x-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">500+</div>
                                <div className="text-xs text-gray-300">Projects</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">100%</div>
                                <div className="text-xs text-gray-300">Satisfied</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">5★</div>
                                <div className="text-xs text-gray-300">Rating</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Hero Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight"
                    >
                        Premium Remodeling
                        <span className="block bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">
                            Beyond Expectations
                        </span>
                    </motion.h1>

                    {/* Enhanced Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
                    >
                        Transform your home with Arizona's trusted remodeling experts, backed by 7+ years 
                        of proven quality through Surprise Granite.
                        <span className="block mt-2 text-lg text-accent-300 font-medium">
                            Quick • Friendly • Neighborly Service
                        </span>
                    </motion.p>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-6 mb-10"
                    >
                        {[
                            { icon: CheckCircle, text: 'Quality Craftsmanship', subtext: 'Expert Team' },
                            { icon: CheckCircle, text: '10-Year Warranty', subtext: 'Full Coverage' },
                            { icon: CheckCircle, text: 'Free 3D Design', subtext: 'Visualization' },
                            { icon: CheckCircle, text: '24/7 Support', subtext: 'Always Available' }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                                className="flex flex-col items-center text-center min-w-[120px]"
                            >
                                <div className="flex items-center space-x-2 text-white mb-1">
                                    <feature.icon className="w-5 h-5 text-green-400" />
                                    <span className="font-medium text-sm">{feature.text}</span>
                                </div>
                                <span className="text-xs text-gray-400">{feature.subtext}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link
                            href="/contact"
                            className="btn-glassmorphic bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-2 group"
                        >
                            <span>Start Your Project</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/gallery"
                            className="btn-glassmorphic bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 border border-white/30 flex items-center space-x-2 group"
                        >
                            <Play className="w-5 h-5" />
                            <span>View Gallery</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
            >
                <div className="flex flex-col items-center">
                    <span className="text-white text-sm mb-2">Scroll to Explore</span>
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default Hero
