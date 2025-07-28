'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Award, Users, Clock, CheckCircle, Star, Heart } from 'lucide-react'

const AboutPage = () => {
  const stats = [
    { number: '500+', label: 'Projects Completed', icon: <CheckCircle className="w-6 h-6" /> },
    { number: '15+', label: 'Years Experience', icon: <Clock className="w-6 h-6" /> },
    { number: '98%', label: 'Client Satisfaction', icon: <Star className="w-6 h-6" /> },
    { number: '50+', label: 'Team Members', icon: <Users className="w-6 h-6" /> },
  ]

  const team = [
    {
      name: 'Michael Rodriguez',
      role: 'Founder & CEO',
      image: 'https://res.cloudinary.com/demo/image/upload/c_fill,w_400,h_400,g_face,q_auto,f_webp/people_1',
      bio: '20+ years in luxury home remodeling with a passion for innovative design and sustainable practices.',
      certifications: ['Licensed Contractor', 'LEED Certified', 'NKBA Member']
    },
    {
      name: 'Sarah Chen',
      role: 'Lead Designer',
      image: 'https://res.cloudinary.com/demo/image/upload/c_fill,w_400,h_400,g_face,q_auto,f_webp/people_2',
      bio: 'Expert interior designer specializing in modern and contemporary kitchen and bathroom spaces.',
      certifications: ['NCIDQ Certified', 'ASID Member', 'Design Excellence Award']
    },
    {
      name: 'David Thompson',
      role: 'Project Manager',
      image: 'https://res.cloudinary.com/demo/image/upload/c_fill,w_400,h_400,g_face,q_auto,f_webp/people_3',
      bio: 'Expert project coordinator ensuring every remodel is completed on time, within budget, and to perfection.',
      certifications: ['PMP Certified', 'Construction Manager', '15 Years Experience']
    }
  ]

  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We strive for perfection in every detail, from initial design to final installation.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Integrity',
      description: 'Honest communication, transparent pricing, and ethical business practices guide everything we do.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaboration',
      description: 'We work closely with clients, architects, and suppliers to bring your vision to life.'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Quality',
      description: 'Premium materials, skilled craftsmanship, and rigorous quality control in every project.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6">
                About
                <span className="block text-accent-600">
                  REMODELY
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                For over 15 years, REMODELY has been transforming homes and businesses with
                exceptional remodeling services. We combine innovative design, premium materials,
                and master craftsmanship to create spaces that exceed expectations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  Start Your Project
                </Link>
                <Link
                  href="/gallery"
                  className="glass-card text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  View Our Work
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/demo/image/upload/c_fill,w_800,h_800,q_auto,f_webp/office_1"
                  alt="REMODELY team at work"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-navy-900/30" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Our Track Record
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence and client satisfaction.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 inline-block">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-primary-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  REMODELY was founded in 2009 with a simple mission: to transform ordinary spaces
                  into extraordinary experiences. What started as a small family business has grown
                  into one of the region's most trusted remodeling companies.
                </p>
                <p>
                  Our founder, Michael Rodriguez, began his career as a craftsman, learning the
                  trade from master builders. His passion for quality and attention to detail
                  became the foundation of our company culture.
                </p>
                <p>
                  Today, we're proud to have completed over 500 successful projects, from intimate
                  bathroom renovations to large-scale commercial remodels. Every project is a
                  testament to our commitment to excellence, innovation, and client satisfaction.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/demo/image/upload/c_fill,w_800,h_600,q_auto,f_webp/office_2"
                  alt="REMODELY workshop"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Our Values
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do, from initial consultation to project completion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-accent-600 rounded-full p-4 w-fit mx-auto mb-6">
                  <div className="text-white">
                    {value.icon}
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The talented professionals who bring your remodeling dreams to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>

                <div className="space-y-2">
                  {member.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-primary-50 text-primary-700 text-xs px-3 py-1 rounded-full mr-2 mb-2"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
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
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join hundreds of satisfied clients who trusted REMODELY with their dream projects.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Your Project Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
