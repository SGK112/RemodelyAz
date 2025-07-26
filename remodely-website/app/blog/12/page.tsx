'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, BookOpen, ArrowRight } from 'lucide-react'

const KitchenIslandArticle = () => {
    const article = {
        id: 12,
        title: 'Modern Kitchen Island Designs: Function Meets Style',
        excerpt: 'Discover the latest kitchen island trends that combine storage, seating, and workspace in one beautiful centerpiece.',
        image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        author: 'Sarah Chen',
        date: 'July 25, 2024',
        readTime: '8 min read',
        category: 'Kitchen',
        tags: ['Kitchen Island', 'Design', 'Storage', 'Modern']
    }

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
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                        />
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
                        The kitchen island has evolved from a simple prep space into the heart of modern kitchen design. Today's islands seamlessly blend functionality with aesthetics, serving as cooking stations, dining tables, storage solutions, and social hubs all in one elegant package.
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">The Evolution of Kitchen Islands</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Kitchen islands have transformed dramatically over the past decade. What once was primarily a simple counter extension has become the focal point of modern kitchen design. Today's homeowners expect their islands to multitask—providing prep space, storage, seating, and often housing appliances and utilities.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Island Configurations</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">1. The Multi-Level Island</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Multi-level islands create distinct zones for different activities. A lower prep surface with bar-height seating allows for casual dining while keeping kitchen messes hidden from guests. This design maximizes functionality while maintaining clean sight lines.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">2. The Waterfall Edge Design</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Waterfall edges, where the countertop material cascades down the sides, create a sleek, contemporary look. This design works particularly well with natural stone or engineered quartz, creating a stunning visual impact that serves as kitchen art.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">3. The Storage Powerhouse</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Modern islands maximize storage with deep drawers, pull-out shelves, and specialized organizers. Consider including a trash/recycling center, appliance garage, or wine storage to keep countertops clutter-free.
                    </p>

                    <div className="bg-accent-50 border-l-4 border-accent-600 p-6 mb-8 rounded-r-lg">
                        <h4 className="font-semibold text-accent-900 mb-2">Pro Tip</h4>
                        <p className="text-accent-800 text-sm leading-relaxed">
                            Allow at least 36 inches of clearance around all sides of your island for comfortable traffic flow. For islands with seating, increase this to 42-48 inches to accommodate chairs.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Trending Features for 2024</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrated Technology</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Built-in charging stations, pop-up electrical outlets, and integrated smart home controls are becoming standard. Consider wireless charging pads built into the surface and USB outlets in the toe kick for device charging.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Mixed Materials</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Combining different materials creates visual interest. Popular combinations include wood and stone, metal and marble, or concrete and butcher block. The key is maintaining harmony with your overall kitchen design.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Statement Lighting</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Pendant lights over the island serve both functional and decorative purposes. Linear lighting, cluster pendants, or a single statement piece can dramatically enhance your island's visual impact.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Planning Your Perfect Island</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Size and Proportion</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Your island should be proportional to your kitchen size. A good rule of thumb is to allow 10% of your kitchen's square footage for the island. Remember to consider ceiling height—taller ceilings can accommodate larger, more dramatic islands.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Functionality First</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Before finalizing design, consider how you'll use the space. Do you need extra prep space, storage, seating, or all three? Your daily cooking habits should drive the design decisions.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Professional Installation Matters</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Kitchen islands often require electrical, plumbing, and sometimes gas connections. Professional installation ensures safety, code compliance, and optimal functionality. REMODELY's experienced team handles all aspects of island installation, from initial design to final connections.
                    </p>

                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                        <h4 className="font-semibold text-primary-900 mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2" />
                            Ready to Design Your Dream Island?
                        </h4>
                        <p className="text-primary-800 mb-4 leading-relaxed">
                            A well-designed kitchen island can transform your cooking experience and become the centerpiece of your home. Our design team specializes in creating custom islands that perfectly balance beauty and functionality.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        >
                            Schedule Consultation
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
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
                                Sarah is REMODELY's lead kitchen designer with over 12 years of experience creating functional and beautiful kitchen spaces. She specializes in modern design trends and space optimization.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </article>
        </div>
    )
}

export default KitchenIslandArticle
