'use client'

import { motion } from 'framer-motion'
import Gallery from '@/components/Gallery'

export default function GalleryPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Gallery Component */}
            <Gallery />

            {/* Call to Action */}
            <section className="py-20 bg-accent-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                            Ready to Start Your Project?
                        </h2>
                        <p className="text-xl text-accent-100 mb-8">
                            Let's discuss your vision and create something amazing together
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact"
                                className="inline-flex items-center bg-white text-accent-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
                            >
                                Get Free Consultation
                            </a>
                            <a 
                                href="tel:(602) 818-5834"
                                className="inline-block bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-700 transition-colors"
                            >
                                Call Now: (602) 818-5834
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
