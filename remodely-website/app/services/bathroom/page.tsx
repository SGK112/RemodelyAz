'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Clock, DollarSign, Star, Shield, Droplets } from 'lucide-react'
import { PRODUCTION_IMAGES } from '@/lib/production-images'

const BathroomRemodeling = () => {
    const service = {
        title: 'Bathroom Remodeling',
        subtitle: 'Create Your Perfect Sanctuary',
        description: 'Transform your bathroom into a luxurious retreat with our expert remodeling services. From spa-like master baths to efficient powder rooms, we create beautiful, functional spaces.',
        image: PRODUCTION_IMAGES.bathroom_luxury,
        price: 'From $150/sqft',
        duration: '1-3 weeks',
        features: [
            'Walk-in Tile Shower Installation',
            'Custom Vanity Design & Installation',
            'Premium Fixtures & Hardware',
            'Heated Floor Installation',
            'Lighting Design & Installation',
            'Tile Work & Waterproofing',
            'Plumbing & Electrical Updates',
            'Paint & Finishing Work'
        ],
        process: [
            'Design Consultation',
            'Material Selection',
            'Demolition Phase',
            'Installation Work',
            'Final Inspection'
        ]
    }

    const portfolioImages = [
        {
            id: 1,
            title: 'Arizona Bathroom Remodeling',
            image: PRODUCTION_IMAGES.bathroom_luxury,
            description: 'Professional bathroom remodeling services in Arizona'
        },
        {
            id: 2,
            title: 'Tub to Shower Conversion',
            image: PRODUCTION_IMAGES.bathroom_modern,
            description: 'Modern tub to shower conversion with premium fixtures'
        },
        {
            id: 3,
            title: 'Luxury Bathroom Design',
            image: PRODUCTION_IMAGES.bathroom_luxury,
            description: 'Spa-inspired bathroom with premium materials'
        },
        {
            id: 4,
            title: 'Walk-in Shower Installation',
            image: PRODUCTION_IMAGES.bathroom_shower,
            description: 'Custom walk-in shower with modern design'
        },
        {
            id: 5,
            title: 'Modern Bathroom Renovation',
            image: PRODUCTION_IMAGES.bathroom_modern,
            description: 'Contemporary bathroom with clean lines and functionality'
        },
        {
            id: 6,
            title: 'Master Bathroom Remodel',
            image: PRODUCTION_IMAGES.bathroom_luxury,
            description: 'Complete master bathroom transformation'
        }
    ]

    const testimonials = [
        {
            name: 'Emily Rodriguez',
            text: 'Our bathroom renovation was absolutely perfect! The attention to detail and quality of work exceeded our expectations.',
            rating: 5,
            location: 'Tempe, AZ'
        },
        {
            name: 'David Wilson',
            text: 'The team transformed our outdated bathroom into a beautiful, modern space. Professional and reliable throughout.',
            rating: 5,
            location: 'Mesa, AZ'
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-navy-900/70" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Link
                                href="/services"
                                className="inline-flex items-center text-accent-400 hover:text-accent-300 mb-6 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Services
                            </Link>

                            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                                {service.title}
                            </h1>
                            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                                {service.description}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                                <div className="flex items-center text-white">
                                    <DollarSign className="w-5 h-5 mr-2 text-accent-400" />
                                    <span className="font-semibold">{service.price}</span>
                                </div>
                                <div className="flex items-center text-white">
                                    <Clock className="w-5 h-5 mr-2 text-accent-400" />
                                    <span className="font-semibold">{service.duration}</span>
                                </div>
                                <div className="flex items-center text-white">
                                    <Shield className="w-5 h-5 mr-2 text-accent-400" />
                                    <span className="font-semibold">10-Year Warranty</span>
                                </div>
                            </div>

                            <Link
                                href="/contact"
                                className="inline-flex items-center bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Get Free Quote
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                            What's Included in Your Bathroom Remodel
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our comprehensive bathroom remodeling service covers every detail of your renovation
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {service.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <Droplets className="w-8 h-8 text-accent-600 mb-4" />
                                <h3 className="font-semibold text-gray-900 mb-2">{feature}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio Gallery */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                            Our Bathroom Remodeling Portfolio
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Browse our collection of stunning bathroom transformations
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {portfolioImages.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="aspect-[4/3] relative">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                        <p className="text-sm opacity-90">{project.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                            Our Remodeling Process
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            From concept to completion, we guide you through every step
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {service.process.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-accent-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                    {index + 1}
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">{step}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                            What Our Clients Say
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="bg-gray-50 rounded-2xl p-8"
                            >
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 text-lg">"{testimonial.text}"</p>
                                <div>
                                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                    <p className="text-gray-600">{testimonial.location}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-accent-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                            Ready to Transform Your Bathroom?
                        </h2>
                        <p className="text-xl text-accent-100 mb-8">
                            Get a free consultation and quote for your bathroom remodeling project
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center bg-white text-accent-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
                            >
                                Get Free Quote
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <Link
                                href="/gallery"
                                className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-accent-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
                            >
                                View More Projects
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default BathroomRemodeling
