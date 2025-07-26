'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'

const TestimonialsPage = () => {
    const testimonials = [
        {
            name: "Sarah Johnson",
            location: "Scottsdale, AZ",
            project: "Kitchen Remodel",
            rating: 5,
            image: "https://images.unsplash.com/photo-1494790108755-2616b09c3c1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            quote: "REMODELY transformed our outdated kitchen into a stunning modern space. The attention to detail and quality of work exceeded our expectations. The team was professional, clean, and finished on time.",
            date: "March 2024"
        },
        {
            name: "Michael Rodriguez",
            location: "Phoenix, AZ",
            project: "Master Bathroom Renovation",
            rating: 5,
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            quote: "Our master bathroom renovation was handled with incredible professionalism. The design team listened to our needs and created a spa-like retreat. We couldn't be happier with the results.",
            date: "February 2024"
        },
        {
            name: "Emily Chen",
            location: "Tempe, AZ",
            project: "Kitchen & Dining Room",
            rating: 5,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            quote: "From design to completion, REMODELY made our dream kitchen a reality. The open concept design perfectly fits our lifestyle, and the quality of materials and craftsmanship is outstanding.",
            date: "January 2024"
        },
        {
            name: "David Thompson",
            location: "Mesa, AZ",
            project: "Guest Bathroom Remodel",
            rating: 5,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            quote: "The team at REMODELY transformed our small guest bathroom into a beautiful, functional space. Their innovative solutions maximized every inch, and the modern fixtures are perfect.",
            date: "December 2023"
        },
        {
            name: "Lisa Martinez",
            location: "Chandler, AZ",
            project: "Kitchen Island Addition",
            rating: 5,
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            quote: "Adding a kitchen island seemed impossible in our layout, but REMODELY found a way. The new island provides extra storage and counter space while maintaining great flow throughout the kitchen.",
            date: "November 2023"
        },
        {
            name: "Robert Davis",
            location: "Glendale, AZ",
            project: "Complete Kitchen Renovation",
            rating: 5,
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            quote: "Our 1980s kitchen needed a complete overhaul. REMODELY delivered a stunning modern kitchen that perfectly suits our family's needs. The project management was excellent throughout.",
            date: "October 2023"
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
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {testimonial.location}
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
