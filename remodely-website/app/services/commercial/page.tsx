'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Clock, DollarSign, Star, Users, Shield, Building, Briefcase, Store } from 'lucide-react'
import { SITE_IMAGES } from '@/lib/site-images'

const CommercialRemodeling = () => {
  const service = {
    title: 'Commercial Remodeling',
    subtitle: 'Professional Spaces That Impress',
    description: 'Enhance your business environment with our commercial remodeling expertise. From office spaces to retail stores and restaurants, we create functional, attractive spaces that boost productivity and impress clients.',
    image: SITE_IMAGES.projects.office,
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

  const portfolioImages = [
    {
      id: 1,
      title: 'Modern Office Space',
      image: SITE_IMAGES.projects.office,
      description: 'Open concept office with collaborative spaces'
    },
    {
      id: 2,
      title: 'Retail Store Design',
      image: SITE_IMAGES.blog.home_value,
      description: 'Modern retail space with premium fixtures'
    },
    {
      id: 3,
      title: 'Restaurant Interior',
      image: SITE_IMAGES.projects.bedroom,
      description: 'Contemporary dining space with custom lighting'
    }
  ]

  const stats = [
    { icon: <Building className="w-6 h-6" />, number: '150+', label: 'Commercial Projects' },
    { icon: <Star className="w-6 h-6" />, number: '4.9/5', label: 'Client Rating' },
    { icon: <Shield className="w-6 h-6" />, number: '5 Year', label: 'Commercial Warranty' },
    { icon: <Clock className="w-6 h-6" />, number: '100%', label: 'Code Compliance' }
  ]

  const businessTypes = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Office Spaces',
      description: 'Modern office environments that enhance productivity and company culture.',
      features: ['Open concept designs', 'Private meeting rooms', 'Reception areas', 'Break rooms']
    },
    {
      icon: <Store className="w-8 h-8" />,
      title: 'Retail Stores',
      description: 'Attractive retail spaces designed to maximize customer experience and sales.',
      features: ['Product display areas', 'Checkout counters', 'Storage solutions', 'Customer flow optimization']
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: 'Restaurants',
      description: 'Complete restaurant build-outs including kitchen and dining areas.',
      features: ['Commercial kitchen setup', 'Dining room design', 'Bar installations', 'Compliance with health codes']
    }
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

      {/* Business Types Section */}
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
              Commercial Specialties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in creating functional, attractive commercial spaces for various business types.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-accent-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {type.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{type.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{type.description}</p>
                <ul className="text-left space-y-2">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
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
              Comprehensive Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commercial remodeling services cover every aspect of your business transformation.
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
                    <p className="text-gray-600 text-sm">Professional commercial-grade installation with code compliance and quality assurance.</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              Our Commercial Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand that business continuity is crucial. Our process minimizes disruption while delivering exceptional results.
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
              Recent Commercial Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we've transformed commercial spaces for Arizona businesses.
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
              View All Commercial Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us for Commercial */}
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
              Commercial Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Why Arizona businesses choose REMODELY for their commercial projects.
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
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Assurance</h3>
              <p className="text-gray-600">Professional commercial contractors with comprehensive quality control processes.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Minimal Disruption</h3>
              <p className="text-gray-600">Phased construction approach to keep your business operational during renovation.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <div className="bg-navy-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Code Compliance</h3>
              <p className="text-gray-600">Expert knowledge of all commercial building codes and ADA requirements.</p>
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
              Transform Your Business Space
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Contact us today for a consultation and custom quote for your commercial remodeling project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                Get Commercial Quote
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

export default CommercialRemodeling
