'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, MapPin, DollarSign, Users, Award, Briefcase, Heart, Shield, TrendingUp, Mail, Phone } from 'lucide-react'
import { PRODUCTION_IMAGES } from '@/lib/production-images'

const CareersPage = () => {
  const openPositions = [
    {
      id: 1,
      title: 'Senior Project Manager',
      department: 'Operations',
      type: 'Full-time',
      location: 'Surprise, AZ',
      salary: '$65,000 - $85,000',
      description: 'Lead residential and commercial remodeling projects from start to finish. Coordinate with clients, contractors, and design teams.',
      requirements: [
        '5+ years project management experience',
        'Construction or remodeling background preferred',
        'Strong communication and leadership skills',
        'Arizona contractor license preferred',
        'Proficiency in project management software'
      ],
      benefits: [
        'Health, dental, and vision insurance',
        '401(k) with company matching',
        'Paid time off and holidays',
        'Professional development opportunities',
        'Company vehicle allowance'
      ]
    },
    {
      id: 2,
      title: 'Licensed Electrician',
      department: 'Construction',
      type: 'Full-time',
      location: 'Surprise, AZ',
      salary: '$55,000 - $75,000',
      description: 'Perform electrical installations and repairs for residential and commercial remodeling projects.',
      requirements: [
        'Arizona electrical license required',
        '3+ years residential/commercial experience',
        'Knowledge of NEC codes and local regulations',
        'Ability to read blueprints and schematics',
        'Own basic hand tools'
      ],
      benefits: [
        'Competitive hourly wage',
        'Health insurance coverage',
        'Tool allowance program',
        'Overtime opportunities',
        'Skills development training'
      ]
    },
    {
      id: 3,
      title: 'Interior Designer',
      department: 'Design',
      type: 'Full-time',
      location: 'Surprise, AZ',
      salary: '$45,000 - $65,000',
      description: 'Create stunning interior designs for residential and commercial spaces. Work closely with clients to bring their vision to life.',
      requirements: [
        'Bachelor\'s degree in Interior Design or related field',
        '2+ years design experience',
        'Proficiency in AutoCAD, SketchUp, or similar software',
        'Strong portfolio of completed projects',
        'Excellent client communication skills'
      ],
      benefits: [
        'Creative work environment',
        'Professional development budget',
        'Health and dental insurance',
        'Flexible work arrangements',
        'Design software licenses provided'
      ]
    },
    {
      id: 4,
      title: 'Skilled Carpenter',
      department: 'Construction',
      type: 'Full-time',
      location: 'Surprise, AZ',
      salary: '$45,000 - $65,000',
      description: 'Perform custom carpentry work including cabinet installation, trim work, and finish carpentry for high-end remodeling projects.',
      requirements: [
        '5+ years carpentry experience',
        'Experience with custom cabinet installation',
        'Knowledge of finish carpentry techniques',
        'Ability to read construction drawings',
        'Own professional tools'
      ],
      benefits: [
        'Competitive wages',
        'Health insurance options',
        'Paid holidays and vacation',
        'Tool replacement program',
        'Opportunities for advancement'
      ]
    }
  ]

  const benefits = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision insurance coverage for you and your family.',
      details: ['Medical insurance', 'Dental coverage', 'Vision benefits', 'Mental health support']
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Financial Security',
      description: 'Competitive salaries and retirement planning to secure your financial future.',
      details: ['Competitive pay', '401(k) matching', 'Performance bonuses', 'Tool allowances']
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Work-Life Balance',
      description: 'Flexible schedules and generous time off to maintain a healthy work-life balance.',
      details: ['Flexible hours', 'Paid vacation', 'Personal days', 'Holiday pay']
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Career Growth',
      description: 'Opportunities for advancement and professional development in a growing company.',
      details: ['Training programs', 'Skill development', 'Leadership opportunities', 'Certification support']
    }
  ]

  const companyValues = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We strive for excellence in every project and continuously improve our craft.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Teamwork',
      description: 'Collaboration and mutual support are the foundation of our success.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Integrity',
      description: 'We conduct business with honesty, transparency, and ethical practices.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Customer Focus',
      description: 'Our clients\' satisfaction and happiness drive everything we do.'
    }
  ]

  const stats = [
    { number: '15+', label: 'Years in Business', icon: <Award className="w-6 h-6" /> },
    { number: '500+', label: 'Projects Completed', icon: <TrendingUp className="w-6 h-6" /> },
    { number: '25+', label: 'Team Members', icon: <Users className="w-6 h-6" /> },
    { number: '4.9/5', label: 'Employee Rating', icon: <Heart className="w-6 h-6" /> }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-navy-800/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6">
                Join the
                <span className="block text-accent-600">
                  REMODELY LLC Team
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Build your career with Arizona's premier remodeling company. We're looking for passionate professionals who share our commitment to excellence and customer satisfaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#open-positions"
                  className="bg-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  View Open Positions
                </Link>
                <Link
                  href="/contact"
                  className="glass-card text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  Contact Us
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
                src={PRODUCTION_IMAGES.team_work}
                alt="REMODELY LLC Team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-navy-900/20" />
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

      {/* Why Work With Us Section */}
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
              Why Work With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a company that values its employees and provides opportunities for growth and development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-accent-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{benefit.title}</h3>
                <p className="text-gray-600 mb-4 text-center leading-relaxed">{benefit.description}</p>
                <ul className="space-y-2">
                  {benefit.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-accent-600 rounded-full mr-2"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values Section */}
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
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide how we work together and serve our clients every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-positions" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore current opportunities to join our growing team of remodeling professionals.
            </p>
          </motion.div>

          <div className="space-y-8">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Position Info */}
                  <div className="lg:col-span-2">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-2xl font-semibold text-gray-900">{position.title}</h3>
                      <span className="bg-accent-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {position.type}
                      </span>
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {position.department}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{position.location}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span>{position.salary}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">{position.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                        <ul className="space-y-2">
                          {position.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-700">
                              <div className="w-2 h-2 bg-accent-600 rounded-full mr-2 mt-2"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Benefits:</h4>
                        <ul className="space-y-2">
                          {position.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-700">
                              <div className="w-2 h-2 bg-primary-600 rounded-full mr-2 mt-2"></div>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Apply Section */}
                  <div className="flex flex-col justify-center">
                    <div className="bg-accent-50 rounded-xl p-6 text-center">
                      <h4 className="font-semibold text-gray-900 mb-4">Interested in this position?</h4>
                      <p className="text-gray-600 mb-6 text-sm">
                        Send your resume and cover letter to get started.
                      </p>
                      <Link
                        href={`mailto:help.remodely@gmail.com?subject=Application for ${position.title}&body=Hello REMODELY LLC team,%0A%0AI am interested in the ${position.title} position. Please find my resume attached.%0A%0AThank you for your consideration.`}
                        className="bg-accent-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-accent-700 transition-colors inline-flex items-center"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Don't See Your Perfect Role?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              We're always looking for talented individuals to join our team. Send us your resume and let us know how you can contribute to REMODELY LLC.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="mailto:help.remodely@gmail.com?subject=Career Inquiry&body=Hello REMODELY LLC team,%0A%0AI am interested in joining your team. Please find my resume attached.%0A%0AThank you for your consideration."
                className="bg-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                Send Your Resume
              </Link>
              <Link
                href="/contact"
                className="glass-card text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>

            {/* Contact Info */}
            <div className="pt-8 border-t border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-primary-100">
                <div className="flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>(602) 818-5834</span>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>help.remodely@gmail.com</span>
                </div>
                <div className="flex items-center justify-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>15464 W Aster Dr, Surprise, AZ 85379</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CareersPage
