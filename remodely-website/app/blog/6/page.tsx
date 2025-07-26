'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, BookOpen, ArrowRight, Smartphone, Home, Zap, Settings } from 'lucide-react'

const SmartHomeIntegrationArticle = () => {
    const article = {
        id: 6,
        title: 'Smart Home Integration in Modern Remodels',
        excerpt: 'How to incorporate cutting-edge technology into your kitchen and bathroom renovation projects.',
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        author: 'Michael Rodriguez',
        date: 'February 15, 2024',
        readTime: '6 min read',
        category: 'Technology',
        tags: ['Smart Home', 'Technology', 'Modern']
    }

    const smartFeatures = [
        {
            icon: Smartphone,
            title: "Voice Control",
            description: "Control lighting, music, and appliances with voice commands"
        },
        {
            icon: Home,
            title: "Automated Systems",
            description: "Sensors and timers that manage your home efficiently"
        },
        {
            icon: Zap,
            title: "Energy Management",
            description: "Monitor and optimize energy usage in real-time"
        },
        {
            icon: Settings,
            title: "Remote Access",
            description: "Control your home systems from anywhere in the world"
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Back to Blog */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </Link>
            </div>

            {/* Article Header */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Category Badge */}
                    <div className="mb-6">
                        <span className="bg-accent-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                            {article.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
                        {article.title}
                    </h1>

                    {/* Article Meta */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-accent-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">
                                    {article.author.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                            <span className="font-medium text-gray-900">{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{article.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{article.readTime}</span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                </motion.div>

                {/* Smart Features Overview */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Smart Home Features</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {smartFeatures.map((feature, index) => {
                            const IconComponent = feature.icon
                            return (
                                <div key={index} className="text-center">
                                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <IconComponent className="w-6 h-6 text-primary-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </motion.div>

                {/* Article Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="prose prose-lg max-w-none mb-12"
                >
                    <div className="text-xl text-gray-700 mb-8 font-medium leading-relaxed">
                        Smart home technology has evolved from a luxury novelty to an essential component of modern living. When planning your kitchen or bathroom remodel, integrating smart features from the beginning ensures seamless functionality, enhanced convenience, and increased home value that appeals to today's tech-savvy buyers.
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">The Smart Kitchen Revolution</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Today's smart kitchens go far beyond programmable coffee makers. From refrigerators that help plan meals to faucets that respond to voice commands, intelligent appliances and systems are transforming how we cook, clean, and interact with our kitchens daily.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Appliances Worth the Investment</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Smart refrigerators with internal cameras let you see what's inside while grocery shopping, suggest recipes based on available ingredients, and even order groceries automatically. Smart ovens can be preheated remotely, adjust cooking times based on recipes, and send notifications when food is ready.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Intelligent Lighting Systems</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Smart lighting goes beyond simple dimming. Modern systems adjust color temperature throughout the day, provide task-specific lighting for cooking activities, and can be programmed for different scenarios—bright white for food prep, warm amber for dining, or colorful accents for entertaining.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Voice-Activated Conveniences</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Voice assistants integrated into kitchen systems allow hands-free control when your hands are dirty or full. Start timers, adjust temperatures, play music, convert measurements, or ask for recipe steps—all without touching a device.
                    </p>

                    <div className="bg-accent-50 border-l-4 border-accent-600 p-6 mb-8 rounded-r-lg">
                        <h4 className="font-semibold text-accent-900 mb-2">Technology Tip</h4>
                        <p className="text-accent-800 text-sm leading-relaxed">
                            Plan for adequate electrical infrastructure during your remodel. Smart devices often require dedicated circuits, Wi-Fi connectivity, and sometimes ethernet hardwiring for optimal performance.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Smart Bathroom Technology</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Intelligent Mirrors and Vanities</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Smart mirrors display weather, news, and calendar appointments while you get ready. Some include integrated lighting with adjustable brightness and color temperature, perfect for makeup application or creating ambiance. Built-in speakers let you listen to music or take calls hands-free.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">High-Tech Toilets and Bidets</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Modern smart toilets offer heated seats, automatic flushing, built-in bidets, and self-cleaning functions. Some models include night lights, deodorizers, and even health monitoring capabilities that can track basic wellness metrics.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Shower Systems</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Digital shower controls allow precise temperature and flow settings that can be saved as personal preferences. Some systems include chromotherapy lighting, aromatherapy dispensers, and steam functions—all controllable via smartphone apps.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Home Automation Integration</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Centralized Control Systems</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Modern smart homes benefit from centralized control platforms that manage lighting, temperature, security, and entertainment systems from a single interface. Popular systems like Control4, Lutron, or Savant create seamless integration between different smart devices and brands.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Climate Control and Energy Management</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Smart thermostats learn your schedule and preferences, automatically adjusting temperature for comfort and efficiency. In Arizona's climate, smart systems can pre-cool homes during off-peak energy hours, potentially saving hundreds of dollars annually on electricity bills.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Security and Safety Features</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Integrated security systems include smart door locks, video doorbells, motion sensors, and water leak detectors—especially important in bathrooms and kitchens where water damage can be costly. Many systems send real-time alerts to your phone and can automatically shut off water supplies if leaks are detected.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Planning for Smart Integration</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Infrastructure Requirements</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Successful smart home integration requires robust Wi-Fi coverage, adequate electrical capacity, and sometimes dedicated low-voltage wiring. Plan these infrastructure improvements during your remodel when walls are open and access is easier.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Future-Proofing Your Investment</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Technology evolves rapidly, so choose systems with upgrade paths and broad compatibility. Opt for established platforms with strong developer support rather than cutting-edge systems that might become obsolete quickly.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Budget Considerations</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Smart home features can range from affordable upgrades like smart switches ($50-200) to comprehensive automation systems ($10,000+). prioritize features that provide the most daily value and convenience for your lifestyle and budget.
                    </p>

                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                        <h4 className="font-semibold text-primary-900 mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2" />
                            Ready to Create Your Smart Home?
                        </h4>
                        <p className="text-primary-800 mb-4 leading-relaxed">
                            Our technology integration specialists can help you design a smart home system that enhances your daily life while adding long-term value to your property. From simple upgrades to comprehensive automation, we'll create a solution that fits your needs and budget.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        >
                            Explore Smart Options
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Arizona-Specific Smart Home Considerations</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Energy Efficiency in the Desert</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Arizona's extreme heat makes energy management crucial. Smart thermostats, automated shade systems, and energy monitoring help optimize cooling costs. Some utility companies offer rebates for smart home energy management systems.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Water Conservation Technology</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Smart irrigation controllers adjust watering schedules based on weather data and soil moisture, crucial for Arizona's water conservation requirements. Smart leak detectors are especially valuable given the potential for water damage in our dry climate.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">UV and Heat Protection</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Arizona's intense sun can damage electronic devices. Plan for adequate ventilation around smart devices, consider UV-resistant outdoor technology, and ensure systems have temperature monitoring to prevent overheating.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started with Smart Integration</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        The key to successful smart home integration is thoughtful planning that balances current needs with future possibilities. Start with essential systems that provide immediate benefits—lighting, climate control, and security—then expand as your comfort with technology grows.
                    </p>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Working with experienced professionals ensures proper installation, integration, and setup of your smart home systems. We can help you navigate the overwhelming array of options to create a technology-enhanced home that truly improves your daily life while adding lasting value to your property.
                    </p>
                </motion.div>

                {/* Tags */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-wrap gap-2 mb-8"
                >
                    {article.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-accent-100 hover:text-accent-700 transition-colors cursor-pointer"
                        >
                            #{tag}
                        </span>
                    ))}
                </motion.div>

                {/* Author Bio */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-white rounded-2xl p-8 border border-gray-200 mb-12"
                >
                    <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xl font-bold">
                                {article.author.split(' ').map(n => n[0]).join('')}
                            </span>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">{article.author}</h4>
                            <p className="text-gray-600 leading-relaxed">
                                Michael is REMODELY's technology integration specialist with expertise in smart home systems and automation. He helps homeowners seamlessly incorporate cutting-edge technology into their renovation projects for enhanced convenience and efficiency.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </article>
        </div>
    )
}

export default SmartHomeIntegrationArticle
