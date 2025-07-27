'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
    Menu, 
    X, 
    Phone, 
    Mail, 
    ChevronDown,
    Home,
    Wrench,
    Camera,
    User,
    FileText,
    MessageSquare,
    Hammer,
    Bath,
    Building,
    Palette
} from 'lucide-react'

interface CompanyData {
    phone: string
}

interface NavigationItem {
    name: string
    href: string
    icon: React.ComponentType<any>
    submenu?: {
        name: string
        href: string
        icon: React.ComponentType<any>
        description: string
    }[]
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [companyData, setCompanyData] = useState<CompanyData>({
        phone: '(480) 255-5887'
    })

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        fetch('/api/admin/company')
            .then(res => res.json())
            .then(data => setCompanyData(data))
            .catch(console.error)
    }, [])

    useEffect(() => {
        // Check authentication status
        const checkAuth = () => {
            const token = sessionStorage.getItem('admin_token')
            const authenticated = sessionStorage.getItem('admin_authenticated')
            setIsAuthenticated(Boolean(token && authenticated === 'true'))
        }

        checkAuth()
        // Listen for auth changes
        window.addEventListener('storage', checkAuth)
        return () => window.removeEventListener('storage', checkAuth)
    }, [])

    const navigation: NavigationItem[] = [
        { name: 'Home', href: '/', icon: Home },
        {
            name: 'Services',
            href: '/services',
            icon: Wrench,
            submenu: [
                { 
                    name: 'Kitchen Remodeling', 
                    href: '/services/kitchen',
                    icon: Hammer,
                    description: 'Transform your kitchen with custom cabinetry and premium finishes'
                },
                { 
                    name: 'Bathroom Remodeling', 
                    href: '/services/bathroom',
                    icon: Bath,
                    description: 'Create your perfect spa-like bathroom retreat'
                },
                { 
                    name: 'Commercial Remodeling', 
                    href: '/services/commercial',
                    icon: Building,
                    description: 'Professional commercial space renovations'
                },
                { 
                    name: 'Design Consultation', 
                    href: '/services/design',
                    icon: Palette,
                    description: 'Expert design guidance for your renovation project'
                },
            ]
        },
        { name: 'Gallery', href: '/gallery', icon: Camera },
        { name: 'About', href: '/about', icon: User },
        { name: 'Process', href: '/process', icon: FileText },
        { name: 'Blog', href: '/blog', icon: FileText },
        { name: 'Contact', href: '/contact', icon: MessageSquare },
    ]

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
                scrolled ? 'glass-navbar shadow-lg backdrop-blur-md' : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-18">
                    {/* Enhanced Logo */}
                    <motion.div 
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link href="/" className="flex items-center space-x-3">
                            <motion.div 
                                className="relative w-10 h-10 sm:w-12 sm:h-12"
                                whileHover={{ rotate: 5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="w-full h-full bg-gradient-to-br from-accent-500 to-accent-700 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-xl sm:text-2xl">R</span>
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl opacity-20 blur-sm"></div>
                            </motion.div>
                            <div className="flex flex-col">
                                <span className={`font-display font-bold text-xl sm:text-2xl transition-colors duration-200 ${
                                    scrolled ? 'text-gray-900' : 'text-gray-900 drop-shadow-sm'
                                }`}>
                                    REMODELY
                                </span>
                                <span className={`text-xs font-medium transition-colors duration-200 ${
                                    scrolled ? 'text-accent-600' : 'text-accent-600 drop-shadow-sm'
                                }`}>
                                    Arizona Remodeling
                                </span>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Enhanced Desktop Navigation */}
                    <div className="hidden lg:block">
                        <div className="flex items-center space-x-1">
                            {navigation.map((item, index) => (
                                <motion.div 
                                    key={item.name} 
                                    className="relative group"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        className={`${scrolled 
                                            ? 'text-gray-800 hover:text-accent-600' 
                                            : 'text-gray-900 hover:text-accent-600 drop-shadow-sm'
                                        } px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-2 hover:bg-white/10 backdrop-blur-sm group-hover:scale-105`}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        <span>{item.name}</span>
                                        {item.submenu && (
                                            <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                                        )}
                                    </Link>
                                    
                                    {/* Enhanced Dropdown Menu */}
                                    {item.submenu && (
                                        <AnimatePresence>
                                            <motion.div 
                                                className="absolute left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className="w-80 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-200/50 py-3 overflow-hidden">
                                                    <div className="px-4 py-2 border-b border-gray-100">
                                                        <h3 className="text-sm font-semibold text-gray-900">Our Services</h3>
                                                        <p className="text-xs text-gray-600">Professional remodeling solutions</p>
                                                    </div>
                                                    {item.submenu.map((subItem, subIndex) => (
                                                        <motion.div
                                                            key={subItem.name}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.2, delay: subIndex * 0.05 }}
                                                        >
                                                            <Link
                                                                href={subItem.href}
                                                                className="flex items-start space-x-3 px-4 py-3 text-sm text-gray-700 hover:text-accent-600 hover:bg-accent-50/50 transition-all duration-150 group/item"
                                                            >
                                                                <div className="flex-shrink-0 w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center group-hover/item:bg-accent-200 transition-colors">
                                                                    <subItem.icon className="w-4 h-4 text-accent-600" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="font-medium text-gray-900 group-hover/item:text-accent-600">
                                                                        {subItem.name}
                                                                    </p>
                                                                    <p className="text-xs text-gray-500 line-clamp-2">
                                                                        {subItem.description}
                                                                    </p>
                                                                </div>
                                                            </Link>
                                                        </motion.div>
                                                    ))}
                                                    <div className="px-4 py-2 mt-2 border-t border-gray-100">
                                                        <Link
                                                            href="/contact"
                                                            className="text-xs text-accent-600 hover:text-accent-700 font-medium"
                                                        >
                                                            Get a free consultation →
                                                        </Link>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Contact Info & CTA */}
                    <div className="hidden xl:flex items-center space-x-6">
                        <motion.div 
                            className="flex items-center space-x-2 text-sm"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.8 }}
                        >
                            <div className={`p-2 rounded-lg transition-colors duration-200 ${
                                scrolled ? 'bg-accent-100 text-accent-600' : 'bg-white/20 text-accent-600'
                            }`}>
                                <Phone className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 font-medium">Call Us Now</span>
                                <span className={`font-semibold transition-colors duration-200 ${
                                    scrolled ? 'text-gray-900' : 'text-gray-900 drop-shadow-sm'
                                }`}>
                                    {companyData.phone}
                                </span>
                            </div>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.9 }}
                        >
                            <Link
                                href="/contact"
                                className="group relative bg-gradient-to-r from-accent-600 to-accent-700 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center space-x-2">
                                    <span>Get Free Quote</span>
                                    <motion.div
                                        className="w-4 h-4"
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        →
                                    </motion.div>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-accent-700 to-accent-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Enhanced Mobile menu button */}
                    <div className="lg:hidden">
                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`${scrolled 
                                ? 'text-gray-800 hover:text-accent-600' 
                                : 'text-gray-900 hover:text-accent-600 drop-shadow-sm'
                            } p-3 rounded-xl touch-manipulation transition-all duration-200 hover:bg-white/10 backdrop-blur-sm`}
                            aria-label="Toggle mobile menu"
                            whileTap={{ scale: 0.95 }}
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="w-6 h-6" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="w-6 h-6" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Enhanced Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden bg-white/98 backdrop-blur-lg border-t border-gray-200/50 shadow-lg"
                    >
                        <div className="px-6 py-6 space-y-3 max-h-screen overflow-y-auto">
                            {navigation.map((item, index) => (
                                <motion.div 
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        className="flex items-center space-x-3 text-gray-800 hover:text-accent-600 px-4 py-3 rounded-xl text-base font-semibold touch-manipulation transition-all duration-200 hover:bg-accent-50/50 group"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center group-hover:bg-accent-200 transition-colors">
                                            <item.icon className="w-4 h-4 text-accent-600" />
                                        </div>
                                        <span>{item.name}</span>
                                        {item.submenu && (
                                            <ChevronDown className="w-4 h-4 ml-auto text-gray-400" />
                                        )}
                                    </Link>
                                    
                                    {/* Enhanced Mobile submenu */}
                                    {item.submenu && (
                                        <motion.div 
                                            className="ml-12 mt-2 space-y-2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {item.submenu.map((subItem, subIndex) => (
                                                <motion.div
                                                    key={subItem.name}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.2, delay: subIndex * 0.05 }}
                                                >
                                                    <Link
                                                        href={subItem.href}
                                                        className="flex items-center space-x-3 text-gray-600 hover:text-accent-600 px-4 py-2 rounded-lg text-sm font-medium touch-manipulation transition-all duration-200 hover:bg-accent-50/30 group/sub"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center group-hover/sub:bg-accent-100 transition-colors">
                                                            <subItem.icon className="w-3 h-3 text-gray-500 group-hover/sub:text-accent-600" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-medium">{subItem.name}</p>
                                                            <p className="text-xs text-gray-500 line-clamp-1">{subItem.description}</p>
                                                        </div>
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                            
                            {/* Enhanced Mobile Contact Section */}
                            <motion.div 
                                className="border-t border-gray-200 pt-6 mt-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.8 }}
                            >
                                <div className="flex items-center space-x-3 px-4 py-3 bg-accent-50/50 rounded-xl mb-4">
                                    <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-accent-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500 font-medium">Call us now</p>
                                        <p className="text-base font-semibold text-gray-900">{companyData.phone}</p>
                                    </div>
                                </div>
                                
                                <Link
                                    href="/contact"
                                    className="block bg-gradient-to-r from-accent-600 to-accent-700 text-white px-6 py-4 rounded-xl text-center text-base font-semibold touch-manipulation shadow-lg hover:shadow-xl transition-all duration-200 group"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="flex items-center justify-center space-x-2">
                                        <span>Get Free Quote</span>
                                        <motion.div
                                            animate={{ x: [0, 4, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            →
                                        </motion.div>
                                    </span>
                                    <p className="text-xs text-accent-100 mt-1">Fast response guaranteed</p>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
