'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, BookOpen, ArrowRight } from 'lucide-react'

const PoolDeckRenovationArticle = () => {
    const article = {
        id: 10,
        title: 'Pool Deck Renovations: Perfect for Arizona\'s Year-Round Sunshine',
        excerpt: 'Design the perfect pool area for Arizona living with heat-resistant materials, shade structures, and resort-style amenities.',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        author: 'Robert Kim',
        date: 'July 5, 2024',
        readTime: '9 min read',
        category: 'Arizona Living',
        tags: ['Pool', 'Deck', 'Arizona', 'Outdoor']
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
                        Arizona's 300+ days of sunshine make pool areas the heart of outdoor living. Whether you're building new or renovating an existing pool deck, the right design choices can transform your backyard into a resort-style oasis that's both beautiful and practical for the desert climate.
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Designing for Arizona's Unique Climate</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Arizona's intense sun, monsoon rains, and temperature extremes require special consideration when designing pool decks. The key is selecting materials and features that can withstand extreme heat while staying comfortable for bare feet and providing necessary shade and cooling elements.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Heat-Resistant Decking Materials</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Travertine: The Arizona Favorite</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Travertine remains cool underfoot even in direct sunlight, making it the gold standard for Arizona pool decks. Its natural non-slip texture and beautiful earth tones complement desert landscapes perfectly. Choose filled travertine for a smoother surface that's easier to maintain.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Flagstone: Natural Beauty</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Arizona flagstone offers natural heat resistance and stunning color variations. Sedona red sandstone and buff-colored limestone are popular choices that blend seamlessly with the desert environment while staying relatively cool.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Cool Deck Coatings</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Applied over concrete, Cool Deck coatings can reduce surface temperatures by up to 30%. Available in various colors and textures, these coatings provide an affordable way to upgrade existing concrete decks for Arizona's climate.
                    </p>

                    <div className="bg-accent-50 border-l-4 border-accent-600 p-6 mb-8 rounded-r-lg">
                        <h4 className="font-semibold text-accent-900 mb-2">Arizona Pool Deck Safety Tip</h4>
                        <p className="text-accent-800 text-sm leading-relaxed">
                            Always test deck materials with bare feet during the hottest part of the day before finalizing your choice. What feels comfortable at 90°F can be unbearable at 115°F.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Essential Shade Structures</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Pergolas and Ramadas</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Traditional Southwestern ramadas or modern pergolas provide essential shade while maintaining airflow. Consider motorized louvers or retractable shade sails that can be adjusted based on sun angle and weather conditions.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Cantilever Umbrellas</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Large cantilever umbrellas offer flexible shade that can be moved throughout the day. Choose heavy-duty models designed for high winds, and invest in weighted bases that can withstand Arizona's monsoon storms.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Architectural Shade Features</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Built-in shade structures like extended rooflines, pavilions, or covered outdoor kitchens provide permanent relief from the sun while adding significant value to your property.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Water Features and Cooling Elements</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Misting Systems</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        High-pressure misting systems can reduce ambient temperature by 20-30 degrees around seating areas. Install them around pergolas, outdoor dining areas, and lounge spaces for maximum cooling effect.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Water Features</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Fountains, spillways, and deck jets not only add visual appeal but also help cool the surrounding air through evaporation. The sound of moving water creates a relaxing ambiance that masks traffic noise.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Strategic Landscaping</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Desert plants like palo verde trees, mesquite, and large cacti can provide natural shade and cooling. Position them strategically to block afternoon sun while maintaining morning light and desert views.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Resort-Style Amenities</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Outdoor Kitchens and Bars</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        A poolside kitchen or bar extends your entertaining space and keeps guests cool and hydrated. Include a refrigerator, ice maker, and plenty of shade for cooking and food prep areas.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Fire Features</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        While it may seem counterintuitive, fire pits and fireplaces extend pool season into Arizona's mild winters. Position them away from the main seating area and pool to provide cozy gathering spots for cooler evenings.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Comfortable Seating Areas</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Create multiple seating zones with different purposes: sun lounging areas, shaded conversation spaces, and dining areas. Use weather-resistant furniture that can withstand UV exposure and monsoon rains.
                    </p>

                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                        <h4 className="font-semibold text-primary-900 mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2" />
                            Ready to Create Your Pool Paradise?
                        </h4>
                        <p className="text-primary-800 mb-4 leading-relaxed">
                            Our outdoor living specialists understand Arizona's unique challenges and opportunities. We'll help you design a pool deck that's beautiful, functional, and perfect for year-round enjoyment in the desert climate.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        >
                            Start Your Pool Project
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Maintenance Considerations</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Dealing with Dust and Debris</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Arizona's dusty environment requires materials and designs that are easy to clean. Smooth surfaces, minimal crevices, and good drainage help minimize maintenance while keeping your pool area looking pristine.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Monsoon Preparedness</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Design with drainage in mind to handle monsoon flooding. Proper grading, channel drains, and permeable materials prevent water damage and ensure your deck remains safe and functional after storms.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">UV Protection</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Choose UV-resistant materials and finishes to prevent fading and degradation. Regular sealing of natural stone and proper care of shade fabrics will keep your pool deck looking new for years to come.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Planning Your Pool Deck Renovation</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        A successful pool deck renovation requires careful planning of materials, shade, water management, and utilities. Consider how the space will be used throughout the day and seasons, and plan for both entertainment and relaxation needs.
                    </p>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Work with professionals who understand Arizona's climate challenges and can help you navigate permits, utility connections, and material selection. The investment in a well-designed pool deck pays dividends in increased home value and countless hours of outdoor enjoyment.
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
                                Robert is REMODELY's outdoor living specialist with extensive experience in Arizona pool deck design and construction. He focuses on creating outdoor spaces that maximize comfort and functionality in the desert environment.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </article>
        </div>
    )
}

export default PoolDeckRenovationArticle
