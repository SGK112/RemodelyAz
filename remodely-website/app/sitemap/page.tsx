'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const SitemapPage = () => {
    const siteStructure = {
        main: [
            { name: 'Home', href: '/' },
            { name: 'About Us', href: '/about' },
            { name: 'Contact', href: '/contact' },
            { name: 'Gallery', href: '/gallery' }
        ],
        services: [
            { name: 'All Services', href: '/services' },
            { name: 'Kitchen Remodeling', href: '/services/kitchen' },
            { name: 'Bathroom Remodeling', href: '/services/bathroom' },
            { name: 'Commercial Remodeling', href: '/services/commercial' },
            { name: 'Design Consultation', href: '/services/design' }
        ],
        resources: [
            { name: 'Blog', href: '/blog' },
            { name: 'FAQ', href: '/faq' },
            { name: 'Testimonials', href: '/testimonials' },
            { name: 'Our Process', href: '/process' },
            { name: 'Careers', href: '/careers' }
        ],
        legal: [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
            { name: 'Sitemap', href: '/sitemap' }
        ],
        blog: [
            { name: 'Kitchen Design Trends 2024', href: '/blog/1' },
            { name: 'Maximizing Small Bathroom Spaces', href: '/blog/2' },
            { name: 'ROI of Kitchen Remodeling', href: '/blog/3' },
            { name: 'Sustainable Materials for Eco-Friendly Remodeling', href: '/blog/4' },
            { name: 'Planning Your Remodel: Timeline Guide', href: '/blog/5' },
            { name: 'Smart Home Integration', href: '/blog/6' },
            { name: 'Desert Landscaping', href: '/blog/7' },
            { name: 'Southwest Style Design', href: '/blog/9' }
        ]
    }

    const SectionCard = ({ title, links, delay = 0 }: { title: string, links: any[], delay?: number }) => (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
        >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                {title}
            </h2>
            <ul className="space-y-3">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link
                            href={link.href}
                            className="flex items-center text-gray-700 hover:text-primary-600 transition-colors group"
                        >
                            <span className="mr-2 group-hover:mr-3 transition-all">
                                {link.name}
                            </span>
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </li>
                ))}
            </ul>
        </motion.div>
    )

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
                        Site Map
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Navigate through all pages and sections of the REMODELY website.
                        Find everything you need to know about our kitchen and bathroom remodeling services.
                    </p>
                </motion.div>

                {/* Site Structure */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <SectionCard title="Main Pages" links={siteStructure.main} delay={0.1} />
                    <SectionCard title="Services" links={siteStructure.services} delay={0.2} />
                    <SectionCard title="Resources" links={siteStructure.resources} delay={0.3} />
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <SectionCard title="Legal" links={siteStructure.legal} delay={0.4} />
                    <SectionCard title="Recent Blog Posts" links={siteStructure.blog} delay={0.5} />
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="bg-primary-50 rounded-2xl p-8 mt-12"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Need Help Finding Something?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        If you can't find what you're looking for, please don't hesitate to contact us.
                        Our team is here to help you with any questions about our services or website.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors"
                        >
                            Contact Us
                        </Link>
                        <Link
                            href="/faq"
                            className="inline-flex items-center bg-white text-primary-600 px-6 py-3 rounded-full font-semibold border border-primary-600 hover:bg-primary-50 transition-colors"
                        >
                            View FAQ
                        </Link>
                    </div>
                </motion.div>

                {/* Last Updated */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-center mt-12 text-gray-500 text-sm"
                >
                    Last updated: {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </motion.div>
            </div>
        </div>
    )
}

export default SitemapPage
