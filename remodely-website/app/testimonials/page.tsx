'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, Quote, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { SITE_IMAGES } from '@/lib/site-images'

const TestimonialsPage = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            title: 'Homeowner • Phoenix, AZ',
            image: SITE_IMAGES.people.sarah_johnson,
            rating: 5,
            quote: "REMODELY transformed our outdated kitchen into a modern masterpiece. The attention to detail and quality of work exceeded our expectations. Our home value increased significantly, and we couldn't be happier!",
            project: 'Kitchen Remodeling',
            projectDetails: 'Complete kitchen renovation with custom cabinetry, quartz countertops, and premium appliances',
            date: 'March 2024'
        },
        {
            id: 2,
            name: 'Michael Chen',
            title: 'Business Owner • Scottsdale, AZ',
            image: SITE_IMAGES.people.michael_chen,
            rating: 5,
            quote: "The commercial renovation of our restaurant was completed on time and within budget. REMODELY's team was professional, clean, and minimally disruptive to our business operations.",
            project: 'Commercial Renovation',
            projectDetails: 'Full restaurant interior renovation including kitchen upgrades, dining area remodel, and ADA compliance updates',
            date: 'February 2024'
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            title: 'Interior Designer • Tempe, AZ',
            image: SITE_IMAGES.people.emily_rodriguez,
            rating: 5,
            quote: "As an interior designer, I've worked with many contractors. REMODELY stands out for their craftsmanship, communication, and ability to bring complex designs to life flawlessly.",
            project: 'Bathroom Remodeling',
            projectDetails: 'Luxury master bathroom with custom tile work, frameless shower, and heated floors',
            date: 'January 2024'
        },
        {
            id: 4,
            name: 'David Wilson',
            title: 'Homeowner • Mesa, AZ',
            image: SITE_IMAGES.people.david_wilson,
            rating: 5,
            quote: "Our whole house renovation was a massive undertaking, but REMODELY managed every detail perfectly. They coordinated all trades, stayed on schedule, and the quality is outstanding.",
            project: 'Whole House Renovation',
            projectDetails: 'Complete home renovation including structural changes, kitchen, bathrooms, and flooring throughout',
            date: 'December 2023'
        },
        {
            id: 5,
            name: 'Lisa Thompson',
            title: 'Homeowner • Chandler, AZ',
            image: SITE_IMAGES.people.lisa_thompson,
            rating: 5,
            quote: "The team at REMODELY turned our small, cramped bathroom into a beautiful, functional space. Their creative solutions maximized every square inch perfectly.",
            project: 'Small Bathroom Renovation',
            projectDetails: 'Space optimization with custom vanity, walk-in shower, and smart storage solutions',
            date: 'November 2023'
        },
        {
            id: 6,
            name: 'James Anderson',
            title: 'Property Manager • Glendale, AZ',
            image: SITE_IMAGES.people.james_anderson,
            rating: 5,
            quote: "REMODELY has been our go-to contractor for multiple properties. Their consistency, reliability, and quality workmanship make them invaluable partners in our business.",
            project: 'Multi-Property Renovations',
            projectDetails: 'Ongoing renovation projects across 15+ rental properties including kitchens, bathrooms, and flooring',
            date: 'Ongoing Partnership'
        }
    ]

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
        ))
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                        What Our Clients Say
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Read testimonials from satisfied homeowners who trusted REMODELY with their kitchen and bathroom renovations.
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 relative"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-6 right-6">
                                <Quote className="w-8 h-8 text-primary-200" />
                            </div>

                            {/* Client Info */}
                            <div className="flex items-center mb-6">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover"
                                        sizes="64px"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {testimonial.title}
                                    </p>
                                    <p className="text-primary-600 text-sm font-medium">
                                        {testimonial.project}
                                    </p>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center mb-4">
                                {renderStars(testimonial.rating)}
                            </div>

                            {/* Quote */}
                            <p className="text-gray-700 leading-relaxed mb-4">
                                "{testimonial.quote}"
                            </p>

                            {/* Date */}
                            <p className="text-gray-500 text-sm">
                                {testimonial.date}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="bg-primary-50 rounded-2xl p-12 text-center mt-16"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Ready to Create Your Success Story?
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join our satisfied clients and transform your space with REMODELY.
                        Schedule a consultation to discuss your remodeling project.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="inline-flex items-center bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors"
                        >
                            Schedule Consultation
                        </a>
                        <a
                            href="/gallery"
                            className="inline-flex items-center bg-white text-primary-600 px-8 py-3 rounded-full font-semibold border border-primary-600 hover:bg-primary-50 transition-colors"
                        >
                            View Our Work
                        </a>
                    </div>
                </motion.div>

                {/* Review Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center"
                >
                    <div>
                        <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
                        <div className="text-gray-600">Projects Completed</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-primary-600 mb-2">5.0</div>
                        <div className="text-gray-600">Average Rating</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-primary-600 mb-2">100%</div>
                        <div className="text-gray-600">Client Satisfaction</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-primary-600 mb-2">2+</div>
                        <div className="text-gray-600">Years Experience</div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default TestimonialsPage
