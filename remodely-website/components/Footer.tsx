'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react'

interface CompanyData {
    name: string
    phone: string
    email: string
    address: string
}

const Footer = () => {
    const currentYear = new Date().getFullYear()
    const [companyData, setCompanyData] = useState<CompanyData>({
        name: 'REMODELY LLC',
        phone: '(480) 255-5887',
        email: 'help.remodely@gmail.com',
        address: '15464 W Aster Dr, Surprise, AZ 85379'
    })

    useEffect(() => {
        fetch('/api/admin/company')
            .then(res => res.json())
            .then(data => setCompanyData(data))
            .catch(console.error)
    }, [])

    const links = {
        services: [
            { name: 'Kitchen Remodeling', href: '/services/kitchen' },
            { name: 'Bathroom Remodeling', href: '/services/bathroom' },
            { name: 'Commercial Remodeling', href: '/services/commercial' },
            { name: 'Design Consultation', href: '/services/design' },
        ],
        company: [
            { name: 'About Us', href: '/about' },
            { name: 'Our Process', href: '/process' },
            { name: 'Careers', href: '/careers' },
            { name: 'Contact', href: '/contact' },
        ],
        resources: [
            { name: 'Blog', href: '/blog' },
            { name: 'Gallery', href: '/gallery' },
            { name: 'FAQs', href: '/faq' },
            { name: 'Testimonials', href: '/testimonials' },
        ],
    }

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-6">
                            <div className="w-10 h-10 bg-accent-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">R</span>
                            </div>
                            <span className="font-display font-bold text-xl">REMODELY</span>
                        </Link>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Transforming spaces with premium kitchen and bathroom remodeling services.
                            Your dream home is just a consultation away.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Services</h3>
                        <ul className="space-y-2">
                            {links.services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Company</h3>
                        <ul className="space-y-2">
                            {links.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-primary-400" />
                                <span className="text-gray-300">{companyData.phone}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-primary-400" />
                                <span className="text-gray-300">{companyData.email}</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-primary-400 mt-1" />
                                <span className="text-gray-300">
                                    {companyData.address}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="font-medium mb-2">Business Hours</h4>
                            <div className="text-gray-300 text-sm space-y-1">
                                <div>Mon - Fri: 8:00 AM - 6:00 PM</div>
                                <div>Sat: 9:00 AM - 4:00 PM</div>
                                <div>Sun: Closed</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-300 text-sm mb-4 md:mb-0">
                            © {currentYear} {companyData.name}. All rights reserved.
                        </div>
                        <div className="flex space-x-6 text-sm">
                            <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/sitemap" className="text-gray-300 hover:text-white transition-colors">
                                Sitemap
                            </Link>
                            <Link href="/admin/login" className="text-gray-500 hover:text-gray-300 transition-colors text-xs">
                                Admin
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
