'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Clock, DollarSign, Star, Users, Shield } from 'lucide-react'

const BathroomRemodeling = () => {
  const service = {
    title: 'Bathroom Remodeling',
    subtitle: 'Create Your Personal Spa',
    description: 'Transform your bathroom into a luxurious retreat with our comprehensive remodeling services. Whether it\'s a powder room refresh or a complete master suite renovation, we deliver exceptional results.',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
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
  }

  const portfolioImages = [
    {
      id: 1,
      title: 'Modern Master Bathroom',
      image: 'https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Floating vanity with geometric tile design'
    },
    {
      id: 2,
      title: 'Luxury Spa Bathroom',
      image: 'https://images.unsplash.com/photo-1584622781564-1d987522fda9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Freestanding tub with marble surround'
    },
    {
      id: 3,
      title: 'Contemporary Guest Bath',
      image: 'https://images.unsplash.com/photo-1565008576874-4c5b6f54bd84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Compact design with premium finishes'
    }
  ]

  const stats = [
    { icon: <Users className="w-6 h-6" />, number: '300+', label: 'Bathrooms Completed' },
    { icon: <Star className="w-6 h-6" />, number: '4.8/5', label: 'Customer Rating' },
    { icon: <Shield className="w-6 h-6" />, number: '10 Year', label: 'Warranty' },
    { icon: <Clock className="w-6 h-6" />, number: '95%', label: 'On-Time Delivery' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Back to Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href="/services"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Services
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-accent-600 text-white text-sm font-semibold px-4 py-2 rounded-full w-fit mb-6">
                {service.price}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6">
                {service.title}
              </h1>
              
              <h2 className="text-2xl text-primary-600 font-semibold mb-6">
                {service.subtitle}
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {service.description}
              </p>

              <div className="flex items-center text-gray-700 mb-8">
                <Clock className="w-5 h-5 text-primary-500 mr-2" />
                <span className="font-medium">Typical Duration: {service.duration}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  Get Free Quote
                </Link>
                <Link
                  href="/gallery"
                  className="glass-card text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  View Portfolio
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4 inline-block">
                  <div className="text-accent-400">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-primary-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              What's Included
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive bathroom remodeling service covers every detail from design to completion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature}</h3>
                    <p className="text-gray-600 text-sm">Expert installation with premium materials and meticulous attention to detail.</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial consultation to final walkthrough, we ensure your bathroom renovation exceeds expectations.
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
                <div className="bg-accent-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step}</h3>
                <div className="w-8 h-1 bg-accent-600 mx-auto"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Recent Bathroom Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how we've created stunning bathroom transformations for Arizona homeowners.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioImages.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative aspect-square">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              View All Bathroom Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Special Features Section */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Arizona-Specific Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our bathroom designs address the unique challenges of Arizona's climate and lifestyle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <div className="bg-accent-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L13.09 8.26L20 9L15 14L16.18 21L10 17.27L3.82 21L5 14L0 9L6.91 8.26L10 2Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Heat-Resistant Materials</h3>
              <p className="text-gray-600">Premium materials designed to withstand Arizona's extreme temperatures and UV exposure.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Enhanced Ventilation</h3>
              <p className="text-gray-600">Superior ventilation systems to manage humidity during Arizona's monsoon season.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <div className="bg-navy-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Energy Efficiency</h3>
              <p className="text-gray-600">Smart fixtures and LED lighting to reduce energy costs in Arizona's demanding climate.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready for Your Spa-Like Bathroom?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Contact us today for a free consultation and personalized quote for your bathroom remodeling project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                Get Free Bathroom Quote
              </Link>
              <Link
                href="/services"
                className="glass-card text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                View All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default BathroomRemodeling
