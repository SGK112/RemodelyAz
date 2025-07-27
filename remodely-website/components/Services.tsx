'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SafeImage from './SafeImage'
import Link from 'next/link'
import { ArrowRight, Wrench, Home, Building, Palette, Clock, Shield } from 'lucide-react'

interface ServiceImage {
    id: string
    name: string
    url: string
    category: string
    description: string
}

const Services = () => {
    const [serviceImages, setServiceImages] = useState<{ [key: string]: string }>({
        kitchen: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
        bathroom: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
        commercial: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop&auto=format&crop=center&q=80'
    })

    useEffect(() => {
        const fetchServiceImages = async () => {
            try {
                const response = await fetch('/api/images?component=services&count=3')
                if (response.ok) {
                    const data = await response.json()
                    const images = data.data
                    const imageMap: { [key: string]: string } = {}

                    images.forEach((img: ServiceImage) => {
                        if (img.category === 'Kitchen') imageMap.kitchen = img.url
                        if (img.category === 'Bathroom') imageMap.bathroom = img.url
                        if (img.category === 'Commercial') imageMap.commercial = img.url
                    })

                    setServiceImages(prev => ({ ...prev, ...imageMap }))
                }
            } catch (error) {
                console.error('Error fetching service images:', error)
            }
        }

        fetchServiceImages()
    }, [])

    const services = [
        {
            id: 1,
            title: 'Kitchen Remodeling',
            description: 'Complete kitchen transformations featuring custom cabinetry, premium countertops, and professional installation by our Arizona experts.',
            image: serviceImages.kitchen,
            icon: <Palette className="w-8 h-8" />,
            features: ['Custom Cabinetry', 'Granite & Quartz Countertops', 'Backsplash Installation', 'Professional Design'],
            price: 'Free Consultation'
        },
        {
            id: 2,
            title: 'Bathroom Remodeling',
            description: 'Luxury bathroom renovations with premium fixtures, custom vanities, and spa-like features for Arizona homes.',
            image: serviceImages.bathroom,
            icon: <Home className="w-8 h-8" />,
            features: ['Custom Vanities', 'Tub to Shower Conversion', 'Tile Installation', 'Modern Fixtures'],
            price: 'Free Estimate'
        },
        {
            id: 3,
            title: 'Countertop Installation',
            description: 'Professional installation of granite, quartz, marble, and porcelain countertops with expert fabrication and finishing.',
            image: serviceImages.commercial,
            icon: <Building className="w-8 h-8" />,
            features: ['Granite Countertops', 'Quartz Surfaces', 'Custom Fabrication', 'Polish & Repair'],
            price: 'Call (602) 833-3189'
        }
    ]

    const features = [
        {
            icon: <Clock className="w-12 h-12" />,
            title: 'Professional Service',
            description: '5+ years of Arizona remodeling experience with 400+ completed projects and expert craftsmanship.'
        },
        {
            icon: <Shield className="w-12 h-12" />,
            title: 'Licensed & Trusted',
            description: 'AzRoc #327266 licensed contractor with 4.7★ Google rating and 146+ satisfied customer reviews.'
        },
        {
            icon: <Wrench className="w-12 h-12" />,
            title: 'Expert Team',
            description: 'Licensed professionals with 15+ years of experience in luxury remodeling.'
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
                        From concept to completion, we deliver exceptional results that exceed expectations
                        and transform your vision into reality.
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
                            className="group glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <SafeImage
                                    src={service.image}
                                    alt={service.title}
                                    width={800}
                                    height={256}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-navy-900/60" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3">
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
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 inline-block">
                                    <div className="text-white">
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
