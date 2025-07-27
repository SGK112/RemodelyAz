'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, Clock, Shield, Award } from 'lucide-react'

const ServicesPage = () => {
    const services = [
        {
            id: 'kitchen',
            title: 'Kitchen Remodeling',
            subtitle: 'Transform Your Culinary Space',
            description: 'Create the kitchen of your dreams with our comprehensive remodeling services. From modern minimalist designs to traditional farmhouse styles, we bring your vision to life with premium materials and expert craftsmanship.',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&h=750&fit=crop&crop=center',
            price: 'Starting at $25,000',
            duration: '2-4 weeks',
            features: [
                'Custom Cabinet Design & Installation',
                'Premium Countertop Materials (Quartz, Granite, Marble)',
                'Professional Appliance Installation',
                'Smart Lighting & Electrical Work',
                'Plumbing & Fixture Updates',
                'Flooring Installation',
                'Backsplash Design & Installation',
                'Paint & Finishing Work'
            ],
            process: [
                'Initial Consultation & Design Planning',
                'Material Selection & Ordering',
                'Demolition & Preparation',
                'Installation & Construction',
                'Final Inspection & Cleanup'
            ]
        },
        {
            id: 'bathroom',
            title: 'Bathroom Remodeling',
            subtitle: 'Create Your Personal Spa',
            description: 'Transform your bathroom into a luxurious retreat with our comprehensive remodeling services. Whether it\'s a powder room refresh or a complete master suite renovation, we deliver exceptional results.',
            image: 'https://images.unsplash.com/photo-1584622781003-d2311cc45946?w=1000&h=750&fit=crop&crop=center',
            price: 'Starting at $15,000',
            duration: '1-3 weeks',
            features: [
                'Custom Vanity Design & Installation',
                'Walk-in Showers & Luxury Tubs',
                'Heated Flooring Systems',
                'Premium Tile & Stone Work',
                'Modern Fixture Installation',
                'Lighting & Ventilation Updates',
                'Storage Solutions',
                'Accessibility Modifications'
            ],
            process: [
                'Space Assessment & Design Consultation',
                'Fixture & Material Selection',
                'Demolition & Plumbing Updates',
                'Installation & Tiling',
                'Final Details & Quality Check'
            ]
        },
        {
            id: 'commercial',
            title: 'Commercial Remodeling',
            subtitle: 'Professional Spaces That Impress',
            description: 'Enhance your business environment with our commercial remodeling expertise. From office spaces to retail stores and restaurants, we create functional, attractive spaces that boost productivity and impress clients.',
            image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000&h=750&fit=crop&crop=center',
            price: 'Custom Quote',
            duration: '3-8 weeks',
            features: [
                'Office Space Design & Build-out',
                'Retail Store Renovations',
                'Restaurant & Kitchen Facilities',
                'Medical Office Modifications',
                'ADA Compliance Updates',
                'Energy Efficient Solutions',
                'Technology Integration',
                'Branding & Signage Installation'
            ],
            process: [
                'Business Needs Assessment',
                'Permit & Compliance Planning',
                'Phased Construction Planning',
                'Professional Installation',
                'Final Inspection & Handover'
            ]
        }
    ]

    const whyChooseUs = [
        {
            icon: <Award className="w-8 h-8" />,
            title: 'Award-Winning Design',
            description: 'Recognized for excellence in design and craftsmanship by industry leaders.'
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: '10-Year Warranty',
            description: 'Comprehensive warranty on all work with premium materials and installation.'
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: 'On-Time Delivery',
            description: 'Project completed on schedule with minimal disruption to your routine.'
        },
        {
            icon: <Star className="w-8 h-8" />,
            title: '98% Satisfaction Rate',
            description: 'Consistently exceeding client expectations with quality results.'
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 pt-20">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-accent-100/30" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6">
                            Premium Remodeling
                            <span className="block text-accent-600">
                                Services
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Transform your space with our comprehensive remodeling services.
                            From kitchens and bathrooms to complete commercial renovations.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                        >
                            Get Free Consultation
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Services Detail Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                                }`}
                        >
                            {/* Content */}
                            <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                                <div className="glass-card rounded-2xl p-8 h-full">
                                    <div className="bg-accent-600 text-white text-sm font-semibold px-4 py-2 rounded-full w-fit mb-4">
                                        {service.price}
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                                        {service.title}
                                    </h2>
                                    <h3 className="text-xl text-primary-600 font-semibold mb-6">
                                        {service.subtitle}
                                    </h3>
                                    <p className="text-gray-600 mb-8 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* Project Duration */}
                                    <div className="flex items-center text-gray-700 mb-8">
                                        <Clock className="w-5 h-5 text-primary-500 mr-2" />
                                        <span className="font-medium">Typical Duration: {service.duration}</span>
                                    </div>

                                    {/* Features */}
                                    <div className="mb-8">
                                        <h4 className="font-semibold text-gray-900 mb-4">What's Included:</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {service.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start">
                                                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700 text-sm">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                                    >
                                        Get Quote for {service.title}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            </div>

                            {/* Image */}
                            <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-navy-900/30" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-navy-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                            Why Choose REMODELY?
                        </h2>
                        <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                            Experience, quality, and commitment to excellence in every project we undertake.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyChooseUs.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 inline-block">
                                    <div className="text-white">
                                        {item.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                                <p className="text-primary-100 leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                            Ready to Start Your Project?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Contact us today for a free consultation and personalized quote.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="bg-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                            >
                                Get Free Quote
                            </Link>
                            <Link
                                href="/gallery"
                                className="glass-card text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                            >
                                View Our Work
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default ServicesPage
