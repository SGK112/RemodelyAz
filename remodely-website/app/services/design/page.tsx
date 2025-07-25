'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Clock, DollarSign, Star, Users, Shield, Palette, Lightbulb, Ruler } from 'lucide-react'

const DesignServices = () => {
  const service = {
    title: 'Design Services',
    subtitle: 'Bringing Your Vision to Life',
    description: 'Our expert design team creates stunning, functional spaces tailored to your lifestyle and preferences. From initial concept to final implementation, we guide you through every design decision.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    price: 'Starting at $2,500',
    duration: '2-4 weeks',
    features: [
      '3D Design Visualization',
      'Material Selection & Sourcing',
      'Color Palette Development',
      'Space Planning & Layout',
      'Lighting Design',
      'Custom Furniture Selection',
      'Architectural Drawings',
      'Project Management'
    ],
    process: [
      'Initial Design Consultation',
      'Concept Development',
      '3D Rendering & Approval',
      'Material & Finish Selection',
      'Final Design Package'
    ]
  }

  const portfolioImages = [
    {
      id: 1,
      title: 'Modern Kitchen Design',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Contemporary kitchen with custom cabinetry'
    },
    {
      id: 2,
      title: 'Luxury Bathroom Design',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Spa-inspired bathroom with premium finishes'
    },
    {
      id: 3,
      title: 'Living Room Design',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Open concept living space design'
    }
  ]

  const stats = [
    { icon: <Users className="w-6 h-6" />, number: '200+', label: 'Design Projects' },
    { icon: <Star className="w-6 h-6" />, number: '4.9/5', label: 'Design Rating' },
    { icon: <Palette className="w-6 h-6" />, number: '100%', label: 'Custom Designs' },
    { icon: <Clock className="w-6 h-6" />, number: '95%', label: 'On-Time Delivery' }
  ]

  const designServices = [
    {
      icon: <Ruler className="w-8 h-8" />,
      title: 'Space Planning',
      description: 'Optimize your space layout for maximum functionality and flow.',
      features: ['Room layout optimization', 'Traffic flow analysis', 'Furniture placement', 'Storage solutions']
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Interior Design',
      description: 'Create cohesive, beautiful interiors that reflect your personal style.',
      features: ['Color scheme development', 'Material selection', 'Furniture & decor', 'Style coordination']
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: '3D Visualization',
      description: 'See your design come to life with photorealistic 3D renderings.',
      features: ['3D modeling', 'Virtual walkthroughs', 'Material previews', 'Design revisions']
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
                  Get Design Quote
                </Link>
                <Link
                  href="/gallery"
                  className="glass-card text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  View Designs
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

      {/* Design Services Section */}
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
              Our Design Specialties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From space planning to final styling, we offer comprehensive design services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {designServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-accent-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="text-left space-y-2">
                  {service.features.map((feature, idx) => (
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
              Complete Design Package
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive design service includes everything you need to transform your space.
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
                    <p className="text-gray-600 text-sm">Professional design service with attention to every detail and your personal preferences.</p>
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
              Our Design Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial consultation to final design delivery, we ensure your vision becomes reality.
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
              Design Portfolio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our recent design projects and see how we transform spaces for Arizona homeowners.
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
              View All Design Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Arizona Design Considerations */}
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
              Arizona-Inspired Design
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our designs embrace Arizona's unique climate, lifestyle, and natural beauty.
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
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Natural Materials</h3>
              <p className="text-gray-600">Stone, wood, and earth-toned materials that complement Arizona's desert landscape.</p>
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
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Climate Conscious</h3>
              <p className="text-gray-600">Designs that consider Arizona's extreme temperatures and seasonal weather patterns.</p>
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
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Indoor-Outdoor Living</h3>
              <p className="text-gray-600">Seamless integration between interior and exterior spaces for year-round enjoyment.</p>
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
              Ready to Design Your Dream Space?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Contact us today to schedule your design consultation and bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                Start Your Design
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

export default DesignServices
