'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import { SITE_IMAGES } from '@/lib/site-images'

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            title: 'Homeowner',
            image: SITE_IMAGES.people.sarah_johnson,
            rating: 5,
            text: "REMODELY transformed our outdated kitchen into a modern masterpiece. The attention to detail and quality of work exceeded our expectations. Our home value increased significantly!",
            project: 'Kitchen Remodeling'
        },
        {
            id: 2,
            name: 'Michael Chen',
            title: 'Business Owner',
            image: SITE_IMAGES.people.michael_chen,
            rating: 5,
            text: "The commercial renovation of our restaurant was completed on time and within budget. REMODELY's team was professional, clean, and minimally disruptive to our business.",
            project: 'Commercial Renovation'
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            title: 'Interior Designer',
            image: SITE_IMAGES.people.emily_rodriguez,
            rating: 5,
            text: "As an interior designer, I've worked with many contractors. REMODELY stands out for their craftsmanship, communication, and ability to bring complex designs to life.",
            project: 'Bathroom Remodeling'
        }
    ]

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                        What Our Clients
                        <span className="block text-accent-600">
                            Testimonials
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Don't just take our word for it. Hear from satisfied clients who transformed their spaces with REMODELY.
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="modern-card rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
                        >
                            {/* Quote Icon */}
                            <div className="bg-accent-600 rounded-full p-3 w-fit mb-6">
                                <Quote className="w-6 h-6 text-white" />
                            </div>

                            {/* Rating */}
                            <div className="flex space-x-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                "{testimonial.text}"
                            </p>

                            {/* Project Badge */}
                            <div className="bg-primary-50 text-primary-700 text-sm font-medium px-3 py-1 rounded-full w-fit mb-6">
                                {testimonial.project}
                            </div>

                            {/* Client Info */}
                            <div className="flex items-center">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover"
                                        sizes="48px"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-gray-600 text-sm">{testimonial.title}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-20 bg-navy-800 rounded-3xl p-8 md:p-12 text-white"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold mb-2">500+</div>
                            <div className="text-primary-100">Projects Completed</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">98%</div>
                            <div className="text-primary-100">Client Satisfaction</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">15</div>
                            <div className="text-primary-100">Years Experience</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">2,500+</div>
                            <div className="text-primary-100">Happy Clients</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Testimonials
