'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, BookOpen, ArrowRight } from 'lucide-react'
import { SITE_IMAGES } from '@/lib/site-images'

const CabinetHardwareArticle = () => {
    const article = {
        id: 13,
        title: 'Cabinet Hardware Trends: The Details That Make a Difference',
        excerpt: 'Small details create big impact. Explore the latest cabinet hardware trends that can transform your kitchen\'s look.',
        image: SITE_IMAGES.blog.sustainable_materials,
        author: 'Michael Rodriguez',
        date: 'July 18, 2024',
        readTime: '5 min read',
        category: 'Kitchen',
        tags: ['Hardware', 'Cabinets', 'Design', 'Trends']
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
                        When it comes to kitchen design, the devil is truly in the details. While major elements like cabinets, countertops, and appliances often steal the spotlight, it's the smaller touches—particularly cabinet hardware—that can make or break your kitchen's overall aesthetic. From sleek minimalist pulls to bold statement knobs, the right hardware choices can transform your kitchen from ordinary to extraordinary.
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Cabinet Hardware Matters More Than You Think</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Cabinet hardware serves as the jewelry of your kitchen. Just as the right accessories can elevate an outfit, well-chosen pulls and knobs can enhance your cabinet design and tie together your entire kitchen aesthetic. Beyond aesthetics, quality hardware improves functionality, making daily kitchen tasks more efficient and enjoyable.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Cabinet Hardware Trends for 2024</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Walk-in Shower with Multiple Heads</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        The centerpiece of any luxury bathroom is often a spacious walk-in shower. Consider installing multiple shower heads including a rainfall shower head, body jets, and a handheld option. This creates a truly immersive spa experience that can be customized to your preferences.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Heated Floors and Towel Warmers</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Nothing says luxury like stepping onto warm floors, especially during Arizona's cooler months. Radiant floor heating provides consistent, comfortable warmth while heated towel racks ensure you always have a warm, dry towel waiting.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Freestanding Soaking Tub</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        A freestanding tub serves as both a functional feature and a stunning focal point. Whether you prefer a modern geometric design or a classic clawfoot style, the right tub can define your bathroom's entire aesthetic.
                    </p>

                    <div className="bg-accent-50 border-l-4 border-accent-600 p-6 mb-8 rounded-r-lg">
                        <h4 className="font-semibold text-accent-900 mb-2">Arizona Climate Considerations</h4>
                        <p className="text-accent-800 text-sm leading-relaxed">
                            In Arizona's dry climate, proper ventilation is crucial to prevent moisture buildup. Install high-quality exhaust fans and consider a humidity sensor to automatically manage moisture levels.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Material Selection for Luxury Appeal</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Natural Stone and Marble</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Natural materials like marble, travertine, and granite create an unmistakably luxurious feel. Each piece is unique, adding character and elegance. Consider book-matched marble slabs for shower walls or vanity tops for a dramatic statement.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">High-End Fixtures and Hardware</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Invest in quality fixtures from reputable manufacturers. Brushed gold, matte black, and polished chrome are popular finishes that can dramatically impact your bathroom's overall aesthetic. Consistency in hardware finishes throughout the space creates a cohesive, professional look.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Glass and Mirrors</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Smart mirrors with integrated lighting, defoggers, and even display capabilities are becoming standard in luxury bathrooms. Consider mirrors with adjustable color temperature to provide optimal lighting for different times of day.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Lighting Design for Ambiance</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Layered Lighting Approach</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Luxury bathrooms require multiple lighting layers: ambient lighting for overall illumination, task lighting for grooming activities, and accent lighting to highlight architectural features or artwork. Dimmer switches allow you to adjust the mood throughout the day.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Statement Light Fixtures</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        A beautiful chandelier or pendant light can serve as jewelry for your bathroom. Choose fixtures rated for bathroom use and position them strategically to avoid casting shadows where you need clear visibility.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Budget-Friendly Hardware Updates</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Maximum Impact, Minimal Cost</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Updating cabinet hardware is one of the most cost-effective ways to refresh your kitchen. For a fraction of the cost of new cabinets, you can achieve a completely new look that feels fresh and modern.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">DIY Installation Tips</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Most cabinet hardware updates can be completed as DIY projects. Use a template for consistent placement, pre-drill holes to prevent splitting, and consider using a cordless drill with adjustable torque to avoid over-tightening.
                    </p>

                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                        <h4 className="font-semibold text-primary-900 mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2" />
                            Ready to Update Your Kitchen Hardware?
                        </h4>
                        <p className="text-primary-800 mb-4 leading-relaxed">
                            The right cabinet hardware can transform your kitchen's appearance and functionality. Our design team can help you select the perfect hardware to complement your style and budget.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        >
                            Get Design Consultation
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Long-term Considerations</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        When selecting cabinet hardware, think beyond current trends. Choose finishes and styles that you'll love for years to come. Classic options like brushed stainless steel or oil-rubbed bronze offer timeless appeal, while trendy finishes may date your kitchen quickly.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Maintenance and Care</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Different finishes require different care approaches. Matte finishes hide fingerprints better but may be harder to clean, while polished finishes show smudges more readily but wipe clean easily. Consider your lifestyle when making your selection.
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
                                Michael is REMODELY's senior bathroom design specialist with 15 years of experience in luxury renovations. He combines technical expertise with an eye for beautiful, functional design to create stunning bathroom spaces.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </article>
        </div>
    )
}

export default CabinetHardwareArticle
