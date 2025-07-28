'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, BookOpen, ArrowRight } from 'lucide-react'
import { SITE_IMAGES } from '@/lib/site-images'

const OpenConceptKitchenArticle = () => {
    const article = {
        id: 14,
        title: 'Open Concept Kitchen Design: Creating Seamless Living Spaces',
        excerpt: 'Learn how to design an open concept kitchen that flows naturally with your living areas while maintaining functionality.',
        image: SITE_IMAGES.blog.design_trends,
        author: 'David Thompson',
        date: 'July 12, 2024',
        readTime: '9 min read',
        category: 'Kitchen',
        tags: ['Open Concept', 'Kitchen Design', 'Living Space', 'Flow']
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
                        Open concept kitchen design continues to be one of the most requested home renovation styles, and for good reason. By removing walls and barriers, you create a seamless flow between your kitchen, dining, and living areas, making your home feel larger, brighter, and more connected. However, successful open concept design requires careful planning to maintain functionality while achieving that coveted spacious feel.
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">The Benefits of Open Concept Design</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Open concept kitchens transform the heart of your home into a multifunctional space that encourages interaction and connectivity. Parents can supervise children while cooking, entertaining becomes more natural and inclusive, and natural light flows freely throughout the space. This design approach also makes smaller homes feel significantly larger by eliminating visual barriers.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Design Principles for Open Concept Success</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Create Functional Zones</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        While the space is open, you still need to define different functional areas. Use furniture placement, area rugs, lighting, and ceiling treatments to create distinct zones for cooking, dining, and relaxing. A kitchen island often serves as the perfect transition element between spaces.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Maintain Visual Cohesion</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        With everything visible in an open concept layout, design consistency becomes crucial. Use a cohesive color palette, complementary materials, and repeated design elements throughout the space. Your kitchen finishes should harmonize with your living area furniture and décor.
                    </p>


                    <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Plan for Traffic Flow</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Open concept spaces need clear pathways between different areas. Ensure there's enough space for people to move comfortably from the kitchen to the dining area to the living room without obstacles. The classic kitchen work triangle becomes even more important in open layouts.
                    </p>

                    <div className="bg-accent-50 border-l-4 border-accent-600 p-6 mb-8 rounded-r-lg">
                        <h4 className="font-semibold text-accent-900 mb-2">Design Tip</h4>
                        <p className="text-accent-800 text-sm leading-relaxed">
                            Use the kitchen island as a natural boundary between cooking and living spaces. Position it so it facilitates conversation while providing workspace and storage.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Kitchen Island: The Heart of Open Concept Design</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Level Islands</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Two-level islands are increasingly popular in open concept designs. The lower level serves as workspace for food prep, while the higher level provides bar seating and helps hide kitchen clutter from the living area. This design maintains functionality while preserving the clean sightlines essential to open concept success.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Storage Solutions</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        In open concept layouts, kitchen storage becomes even more critical since everything is visible. Design your island with maximum storage capacity, including deep drawers, cabinet organizers, and even hidden appliance storage to maintain the clean, uncluttered look.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Seating Considerations</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Island seating should be both comfortable and proportionate to your space. Allow 24 inches of width per person and ensure there's adequate legroom underneath. Choose stools or chairs that can be tucked completely under the island when not in use.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Lighting in Open Concept Spaces</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Layered Lighting Approach</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Open concept spaces require multiple types of lighting to properly illuminate different zones. Combine ambient lighting for overall illumination, task lighting for work areas, accent lighting for visual interest, and decorative lighting to define spaces and add personality.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Statement Light Fixtures</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Large, dramatic light fixtures can help define different areas within your open concept space. Consider a series of pendant lights over the island, a statement chandelier over the dining area, and coordinating but varied fixtures throughout the space.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Natural Light Optimization</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Maximize natural light by removing barriers and using reflective surfaces strategically. Light-colored countertops, glossy backsplashes, and strategically placed mirrors can help bounce light throughout the entire open space.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Open Concept Challenges and Solutions</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Noise Control</h3>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Color Palettes Trending in 2024</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Desert Sunset Palette</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Inspired by Arizona's famous sunsets, this palette combines warm terracotta, dusty rose, golden yellow, and deep purple accents. These colors work beautifully against neutral backgrounds and can be incorporated through artwork, textiles, and accent pieces.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Sage and Stone</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Soft sage greens paired with warm gray tones create a calming, sophisticated palette that works especially well in kitchens and bathrooms. This combination feels fresh and modern while maintaining connection to the natural landscape.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Rich Earth Tones</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Deep browns, warm taupes, and rich caramel tones are making a strong comeback. These colors create cozy, grounding spaces that feel luxurious and timeless. They work particularly well in living areas and bedrooms.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Material Trends</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Natural Stone Statements</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Arizona's abundant natural stone resources are being showcased in dramatic ways. From floor-to-ceiling travertine feature walls to bookmatched marble islands, natural stone is being used as both functional surface and artistic statement.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainable Materials</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Eco-consciousness is driving material choices, with reclaimed wood, recycled glass countertops, and sustainable bamboo flooring gaining popularity. These materials not only reduce environmental impact but also add unique character and story to spaces.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Mixed Metals</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        The strict matching of metal finishes is giving way to thoughtful mixing of brass, copper, black steel, and brushed nickel. This trend adds visual interest and allows for more personalized, collected-over-time aesthetics.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Furniture and Layout Trends</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Curved and Organic Shapes</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Furniture with curved lines and organic shapes is replacing the sharp angles of previous years. Round dining tables, curved sectionals, and kidney-shaped coffee tables create softer, more welcoming spaces that encourage conversation and relaxation.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Functional Spaces</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Arizona homes are being designed for flexibility, with spaces that easily transition from formal to casual use. Kitchen islands that serve as dining tables, home offices that double as guest rooms, and outdoor spaces that function as extensions of indoor living areas are becoming standard.
                    </p>

                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                        <h4 className="font-semibold text-primary-900 mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2" />
                            Ready to Incorporate These Trends?
                        </h4>
                        <p className="text-primary-800 mb-4 leading-relaxed">
                            Our design team stays current with the latest trends while ensuring your space reflects your personal style. We can help you incorporate these 2024 trends in a way that feels authentic to your lifestyle and Arizona's unique environment.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        >
                            Schedule Design Consultation
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Making the Transition</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Converting to an open concept layout is a significant renovation that requires careful planning and professional expertise. The result is a transformed living space that feels larger, brighter, and more connected. Focus on creating zones within the open space while maintaining the flow that makes this design so appealing.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Long-term Benefits</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Beyond the immediate lifestyle benefits, open concept designs typically increase home value and appeal to future buyers. The versatility of the space allows it to adapt to changing needs over time, making it a smart long-term investment in your home.
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
                                David is REMODELY's senior kitchen designer with over 12 years specializing in open concept renovations. He's passionate about creating functional spaces that bring families together while maintaining the beauty and efficiency modern kitchens demand.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </article>
        </div>
    )
}

export default OpenConceptKitchenArticle
