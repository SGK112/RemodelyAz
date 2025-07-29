'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Wrench, Home, Building, Palette, Clock, Shield } from 'lucide-react'
import { PRODUCTION_IMAGES } from '@/lib/production-images'

const Services = () => {
    const services = [
        {
            id: 1,
            title: 'Kitchen Remodeling',
            description: 'Transform your kitchen into a culinary masterpiece with modern designs, premium materials, and smart storage solutions.',
            image: PRODUCTION_IMAGES.kitchen_modern,
            icon: <Palette className="w-8 h-8" />,
            features: ['Custom Cabinetry', 'Premium Countertops', 'Modern Appliances', 'Smart Lighting'],
            price: 'From $180/sqft'
        },
        {
            id: 2,
            title: 'Bathroom Remodeling',
            description: 'Create a spa-like sanctuary with luxurious fixtures, elegant tiles, and innovative storage solutions.',
            image: PRODUCTION_IMAGES.bathroom_luxury,
            icon: <Home className="w-8 h-8" />,
            features: ['Luxury Fixtures', 'Heated Floors', 'Custom Vanities', 'Walk-in Showers'],
            price: 'From $150/sqft'
        },
        {
            id: 3,
            title: 'Commercial Remodeling',
            description: 'Enhance your business space with professional designs that boost productivity and impress clients.',
            image: PRODUCTION_IMAGES.commercial_office,
            icon: <Building className="w-8 h-8" />,
            features: ['Office Spaces', 'Retail Design', 'Restaurant Kitchens', 'Medical Facilities'],
            price: 'From $120/sqft'
        }
    ]

    const features = [
        {
            icon: <Clock className="w-12 h-12" />,
            title: 'Fast Turnaround',
            description: 'Complete most projects within 2-4 weeks with minimal disruption to your daily routine.'
        },
        {
            icon: <Shield className="w-12 h-12" />,
            title: 'Quality Guarantee',
            description: '10-year warranty on all work with premium materials and certified craftsmanship.'
        },
        {
            icon: <Wrench className="w-12 h-12" />,
            title: 'Expert Team',
            description: 'Skilled professionals with 15+ years of experience in luxury remodeling.'
        }
    ]

    return (
        <section className="py-16 sm:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4 sm:mb-6">
                        Our Premium
                        <span className="block text-accent-600">
                            Remodeling Services
                        </span>
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                        Built on 7+ years of countertop expertise, REMODELY delivers complete home transformations 
                        with the same quality craftsmanship and neighborly service Arizona homeowners trust.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="group modern-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-navy-900/60" />
                                <div className="absolute top-4 left-4 bg-white rounded-full p-3 shadow-lg border border-gray-200">
                                    <div className="text-primary-600">
                                        {service.icon}
                                    </div>
                                </div>
                                <div className="absolute bottom-4 right-4 bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                    {service.price}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-2 mb-6">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-gray-700">
                                            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <Link
                                    href="/services"
                                    className="group inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                                >
                                    Learn More
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Features Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-navy-800 rounded-3xl p-8 md:p-12 text-white"
                >
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
                            Why Choose REMODELY?
                        </h3>
                        <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                            We combine expertise, quality, and innovation to deliver results that stand the test of time.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="bg-white rounded-2xl p-6 mb-4 inline-block shadow-lg border border-gray-200">
                                    <div className="text-accent-600">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                                <p className="text-primary-100 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300"
                        >
                            Start Your Project Today
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Services
