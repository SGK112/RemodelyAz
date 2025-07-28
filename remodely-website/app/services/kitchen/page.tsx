'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Clock, DollarSign, Star, Users, Shield } from 'lucide-react'

const KitchenRemodeling = () => {
  const service = {
    title: 'Kitchen Remodeling',
    subtitle: 'Transform Your Culinary Space',
    description: 'Create the kitchen of your dreams with our comprehensive remodeling services. From modern minimalist designs to traditional farmhouse styles, we bring your vision to life with premium materials and expert craftsmanship.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop&crop=center',
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
  }

  const portfolioImages = [
    {
      id: 1,
      title: 'Modern Farmhouse Kitchen',
      image: 'https://images.unsplash.com/photo-1556909114-8ccd5bc71b7d?w=600&h=400&fit=crop&crop=center',
      description: 'White shaker cabinets with quartz countertops'
    },
    {
      id: 2,
      title: 'Contemporary Kitchen Island',
      image: 'https://images.unsplash.com/photo-1556909114-3e16c8374c59?w=600&h=400&fit=crop&crop=center',
      description: 'Large island with waterfall granite countertop'
    },
    {
      id: 3,
      title: 'Luxury Kitchen Design',
      image: 'https://images.unsplash.com/photo-1556909114-b1a8ab4fdc7c?w=600&h=400&fit=crop&crop=center',
      description: 'Premium finishes with custom lighting'
    },
    {
      id: 4,
      title: 'Traditional Kitchen Renovation',
      image: 'https://images.unsplash.com/photo-1556909114-8213a5b8eacd?w=600&h=400&fit=crop&crop=center',
      description: 'Classic design with marble backsplash'
    },
    {
      id: 5,
      title: 'Open Concept Kitchen',
      image: 'https://images.unsplash.com/photo-1556909114-97b05d0b2e87?w=600&h=400&fit=crop&crop=center',
      description: 'Spacious layout with breakfast bar'
    },
    {
      id: 6,
      title: 'Custom Cabinet Installation',
      image: 'https://images.unsplash.com/photo-1556909114-9c16bf7e8b2b?w=600&h=400&fit=crop&crop=center',
      description: 'Handcrafted cabinetry with soft-close doors'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'Our kitchen transformation exceeded all expectations. The team was professional, and the quality is outstanding.',
      rating: 5,
      location: 'Phoenix, AZ'
    },
    {
      name: 'Michael Chen',
      text: 'Beautiful work! They completed our kitchen remodel on time and within budget. Highly recommend!',
      rating: 5,
      location: 'Scottsdale, AZ'
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
              What's Included in Your Kitchen Remodel
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive kitchen remodeling service covers every aspect of your renovation
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
                <CheckCircle className="w-8 h-8 text-accent-600 mb-4" />
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
              Our Kitchen Remodeling Portfolio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our collection of stunning kitchen transformations
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
              Ready to Transform Your Kitchen?
            </h2>
            <p className="text-xl text-accent-100 mb-8">
              Get a free consultation and quote for your kitchen remodeling project
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

export default KitchenRemodeling
