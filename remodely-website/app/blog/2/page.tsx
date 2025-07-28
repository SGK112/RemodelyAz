'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, BookOpen, ArrowRight } from 'lucide-react'
import { SITE_IMAGES } from '@/lib/site-images'

const SmallBathroomArticle = () => {
    const article = {
        id: 2,
        title: 'Maximizing Small Bathroom Spaces: Expert Tips',
        excerpt: 'Learn how to make the most of your compact bathroom with clever storage solutions and space-saving design strategies.',
        image: SITE_IMAGES.blog.bathroom_renovation,
        author: 'Michael Rodriguez',
        date: 'March 10, 2024',
        readTime: '6 min read',
        category: 'Bathroom',
        tags: ['Bathroom', 'Small Spaces', 'Storage']
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
                        Small bathrooms don't have to feel cramped or lack functionality. With smart design strategies, clever storage solutions, and the right fixtures, even the tiniest bathroom can become a beautiful, efficient space that meets all your needs while feeling surprisingly spacious.
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Space-Saving Layout Strategies</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        The key to maximizing a small bathroom starts with optimizing the layout. Every square inch matters, so careful planning of fixture placement, traffic flow, and storage zones is essential for creating a functional and comfortable space.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Smart Fixture Choices</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Wall-Mounted Toilets</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Wall-mounted toilets create the illusion of more floor space and make cleaning easier. The tank is hidden in the wall, providing a sleek, modern look while freeing up visual space. This option works particularly well in contemporary bathroom designs.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Corner Sinks and Vanities</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Corner-mounted sinks and custom corner vanities utilize often-wasted space effectively. These solutions work especially well in powder rooms or where the layout demands creative fixture placement.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Compact Bathtub Alternatives</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Consider deep soaking tubs, Japanese-style tubs, or shower-tub combinations that maximize functionality in minimal space. If you rarely use a bathtub, converting to a walk-in shower can dramatically open up the room.
                    </p>

                    <div className="bg-accent-50 border-l-4 border-accent-600 p-6 mb-8 rounded-r-lg">
                        <h4 className="font-semibold text-accent-900 mb-2">Measurement Pro Tip</h4>
                        <p className="text-accent-800 text-sm leading-relaxed">
                            Before shopping for fixtures, create a scaled floor plan and measure twice. Small bathrooms require precise measurements to ensure fixtures fit properly and doors can open fully.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Clever Storage Solutions</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Vertical Storage Maximization</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Take advantage of vertical space with tall, narrow cabinets, wall-mounted shelving, and over-toilet storage units. Install shelves all the way to the ceiling to store items you don't use daily.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Hidden Storage Opportunities</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Look for unexpected storage opportunities: recessed medicine cabinets, built-in shower niches, vanities with hidden drawers, and even storage inside mirror frames. Every nook can serve a purpose.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Functional Furniture</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Choose furniture that serves multiple purposes: ottomans with storage inside, mirrors with built-in shelving, or vanity stools that provide extra storage space underneath.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Visual Space Enhancement</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Mirror Magic</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Large mirrors are the ultimate space expander. Consider a full-wall mirror, mirrored cabinet doors, or strategically placed mirrors that reflect natural light throughout the space. The reflection creates the illusion of doubled space.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Light Color Palettes</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Light colors reflect more light and make spaces feel larger. Whites, soft grays, and pale pastels work beautifully. If you prefer color, use it as an accent while keeping larger surfaces light.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Glass Shower Enclosures</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Replace shower curtains or frosted glass doors with clear glass enclosures. This allows the eye to see the entire space uninterrupted, making the bathroom feel significantly larger.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Lighting Design for Small Spaces</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Layered Lighting Approach</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Combine multiple light sources: recessed ceiling lights for general illumination, vanity lights for task lighting, and accent lighting to highlight features. Good lighting makes any space feel larger and more inviting.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Natural Light Maximization</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        If possible, increase natural light with larger windows, skylights, or light tubes. Use sheer window treatments or frosted film for privacy while maintaining light flow.
                    </p>

                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                        <h4 className="font-semibold text-primary-900 mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2" />
                            Ready to Transform Your Small Bathroom?
                        </h4>
                        <p className="text-primary-800 mb-4 leading-relaxed">
                            Our bathroom design specialists excel at maximizing small spaces. We'll help you create a bathroom that feels spacious, functions beautifully, and reflects your personal style—regardless of size constraints.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        >
                            Schedule Consultation
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Flooring and Tile Strategies</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Large Format Tiles</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Larger tiles create fewer grout lines, making the space feel more continuous and expansive. Consider 12"x24" or even larger format tiles for both floors and walls.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Continuous Flooring</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Extending the same flooring material from the bathroom into adjacent areas creates visual continuity and makes the bathroom feel like part of a larger space.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Diagonal Patterns</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Installing tiles diagonally can make a small space appear wider and longer. This works particularly well with rectangular tiles or planks.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Design Benefits</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Small bathroom renovations require precise planning and creative problem-solving. Professional designers can identify opportunities you might miss and help you avoid costly mistakes. They can also suggest innovative solutions that maximize both function and style.
                    </p>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Remember, a well-designed small bathroom can be more functional and enjoyable than a poorly planned large one. Focus on quality over quantity, and don't be afraid to invest in space-saving features that will serve you well for years to come.
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
                                Michael is REMODELY's bathroom design specialist with expertise in small space optimization. He has helped hundreds of homeowners transform cramped bathrooms into functional, beautiful spaces.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </article>
        </div>
    )
}

export default SmallBathroomArticle
