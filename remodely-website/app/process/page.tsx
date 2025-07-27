'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Clock, Users, Star, Phone, Calendar, Hammer, Shield, Award } from 'lucide-react'

const ProcessPage = () => {
  const processSteps = [
    {
      id: 1,
      title: 'Initial Consultation',
      duration: '1-2 hours',
      description: 'We start with a comprehensive consultation to understand your vision, needs, and budget. Our design experts visit your space to assess the current condition and discuss your goals.',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: <Users className="w-8 h-8" />,
      details: [
        'In-home consultation and space assessment',
        'Discussion of your vision and requirements',
        'Budget planning and timeline overview',
        'Initial design concepts and ideas',
        'Material and style preference evaluation'
      ]
    },
    {
      id: 2,
      title: 'Design & Planning',
      duration: '1-2 weeks',
      description: 'Our design team creates detailed plans, 3D renderings, and material selections. We refine the design based on your feedback until it perfectly matches your vision.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: <Star className="w-8 h-8" />,
      details: [
        'Detailed architectural and design drawings',
        '3D renderings and virtual walkthrough',
        'Material and finish selections',
        'Permit applications and approvals',
        'Final design approval and contract signing'
      ]
    },
    {
      id: 3,
      title: 'Preparation & Permits',
      duration: '1-3 weeks',
      description: 'We handle all permits, order materials, and prepare your space for construction. This includes protecting your home and ensuring all necessary approvals are in place.',
      image: 'https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: <Calendar className="w-8 h-8" />,
      details: [
        'Permit acquisition and inspections scheduling',
        'Material ordering and delivery coordination',
        'Site preparation and protection setup',
        'Utility disconnections and rerouting',
        'Project timeline finalization'
      ]
    },
    {
      id: 4,
      title: 'Construction & Installation',
      duration: '2-8 weeks',
      description: 'Our skilled craftsmen bring your design to life with precision and attention to detail. We maintain clear communication throughout the construction process.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: <Hammer className="w-8 h-8" />,
      details: [
        'Demolition and structural modifications',
        'Electrical, plumbing, and HVAC updates',
        'Installation of cabinets, fixtures, and finishes',
        'Daily progress updates and communication',
        'Quality control inspections at each phase'
      ]
    },
    {
      id: 5,
      title: 'Final Inspection & Handover',
      duration: '2-3 days',
      description: 'We conduct thorough quality inspections, address any final details, and ensure everything meets our high standards before presenting your completed space.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: <Shield className="w-8 h-8" />,
      details: [
        'Comprehensive quality inspection',
        'Final touch-ups and detailing',
        'Client walkthrough and approval',
        'Warranty documentation and care instructions',
        'Project completion celebration'
      ]
    }
  ]

  const whyOurProcess = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Timely Completion',
      description: '98% of our projects are completed on schedule with minimal delays.'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Quality Assurance',
      description: 'Multiple quality checkpoints ensure the highest standards throughout.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Clear Communication',
      description: 'Regular updates and open communication keep you informed every step.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: '10-Year Warranty',
      description: 'Comprehensive warranty coverage gives you peace of mind.'
    }
  ]

  const stats = [
    { number: '500+', label: 'Projects Completed', icon: <Award className="w-6 h-6" /> },
    { number: '98%', label: 'On-Time Delivery', icon: <Clock className="w-6 h-6" /> },
    { number: '4.9/5', label: 'Customer Rating', icon: <Star className="w-6 h-6" /> },
    { number: '10 Year', label: 'Warranty', icon: <Shield className="w-6 h-6" /> }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-navy-800/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6">
              Our Proven
              <span className="block text-accent-600">
                Remodeling Process
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From initial consultation to final walkthrough, our systematic approach ensures your remodeling project exceeds expectations while staying on time and within budget.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
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

      {/* Process Steps Section */}
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
              Our 5-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each project follows our proven methodology, ensuring quality results and exceptional customer experience.
            </p>
          </motion.div>

          <div className="space-y-24">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="glass-card rounded-2xl p-8 h-full">
                    {/* Step Number and Duration */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="bg-accent-600 text-white w-16 h-16 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold">{step.id}</span>
                      </div>
                      <div className="bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold">
                        {step.duration}
                      </div>
                    </div>

                    {/* Icon and Title */}
                    <div className="flex items-center mb-4">
                      <div className="bg-accent-100 text-accent-600 p-3 rounded-lg mr-4">
                        {step.icon}
                      </div>
                      <h3 className="text-3xl font-display font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                      {step.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 mb-4">What's Included:</h4>
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-navy-900/20" />
                    <div className="absolute top-6 left-6">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                        <div className="text-accent-600">
                          {step.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Process Works Section */}
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
              Why Our Process Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Years of experience have refined our process to deliver exceptional results consistently.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyOurProcess.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-accent-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Timeline Section */}
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
              Typical Project Timelines
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding what to expect for different types of remodeling projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 text-center"
            >
              <div className="bg-accent-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">2-4</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Kitchen Remodeling</h3>
              <p className="text-gray-600 mb-4">2-4 weeks for complete kitchen transformation</p>
              <div className="text-sm text-gray-500">
                <div>Planning: 1-2 weeks</div>
                <div>Construction: 1-2 weeks</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 text-center"
            >
              <div className="bg-primary-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">1-3</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Bathroom Remodeling</h3>
              <p className="text-gray-600 mb-4">1-3 weeks for luxury bathroom renovation</p>
              <div className="text-sm text-gray-500">
                <div>Planning: 1 week</div>
                <div>Construction: 1-2 weeks</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 text-center"
            >
              <div className="bg-navy-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">3-8</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Commercial Projects</h3>
              <p className="text-gray-600 mb-4">3-8 weeks for commercial renovations</p>
              <div className="text-sm text-gray-500">
                <div>Planning: 2-3 weeks</div>
                <div>Construction: 1-5 weeks</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Contact REMODELY LLC today to schedule your consultation and experience our proven process firsthand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                Schedule Consultation
              </Link>
              <Link
                href="/gallery"
                className="glass-card text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>
            
            {/* Contact Info */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-primary-100">
                <div className="flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>(480) 255-5887</span>
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <span>help.remodely@gmail.com</span>
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  <span>Surprise, AZ 85379</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-primary-200">
                AzRoc License #327266
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ProcessPage
