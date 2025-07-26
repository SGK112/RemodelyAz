'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, BookOpen, ArrowRight } from 'lucide-react'

const SouthwestStyleArticle = () => {
    const article = {
        id: 9,
        title: 'Southwest Style: Incorporating Adobe and Southwestern Design Elements',
        excerpt: 'Embrace Arizona\'s rich cultural heritage with authentic Southwestern design elements including adobe, terra cotta, and native materials.',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        author: 'Isabella Martinez',
        date: 'July 10, 2024',
        readTime: '6 min read',
        category: 'Arizona Living',
        tags: ['Southwest', 'Adobe', 'Design', 'Culture']
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
                        Arizona's rich cultural heritage offers endless inspiration for home design. Southwestern style, rooted in Native American, Spanish colonial, and Mexican influences, creates warm, inviting spaces that celebrate the desert's natural beauty and honor the region's deep cultural traditions.
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">The Essence of Southwestern Design</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Southwestern design is more than just a decorative style—it's a way of living that emphasizes connection to the natural environment and cultural heritage. This aesthetic celebrates handcrafted elements, natural materials, and earthy color palettes that reflect the stunning Arizona landscape from sunrise to sunset.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Elements of Southwest Style</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Adobe and Earth-Based Materials</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Adobe, the quintessential Southwestern building material, offers excellent thermal mass properties perfect for Arizona's climate. Modern applications include adobe accent walls, fireplace surrounds, and exterior features. If authentic adobe isn't feasible, consider stucco finishes with earth-based pigments that capture the same organic feel.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Terra Cotta and Clay Elements</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Terra cotta tiles, pottery, and decorative elements bring warmth and authenticity to Southwestern spaces. Use terra cotta floor tiles in entryways, incorporate handmade pottery as decorative accents, or install clay roof tiles for an authentic exterior touch.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Natural Wood and Timber</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Exposed wooden beams (vigas), rustic furniture, and carved wood details add texture and warmth. Pine, cedar, and mesquite are traditional choices that age beautifully in the desert climate. Consider exposed ceiling beams, hand-carved doors, or rustic wood furniture pieces.
                    </p>

                    <div className="bg-accent-50 border-l-4 border-accent-600 p-6 mb-8 rounded-r-lg">
                        <h4 className="font-semibold text-accent-900 mb-2">Cultural Sensitivity Tip</h4>
                        <p className="text-accent-800 text-sm leading-relaxed">
                            When incorporating Native American or Mexican design elements, focus on authentic, ethically-sourced pieces that honor these cultures rather than appropriating sacred symbols or patterns.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Color Palettes Inspired by the Desert</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Warm Earth Tones</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        The foundation of Southwestern color palettes draws from the desert landscape: warm terracotta, sandy beige, rust red, and deep ochre. These colors work beautifully as wall colors or in large textile pieces like rugs and upholstery.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Turquoise and Sage Accents</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Turquoise, sacred in many Native American cultures, adds vibrant contrast to earth tones. Sage green, inspired by desert plants, provides a calming complement. Use these colors in accessories, artwork, or accent walls for authentic Southwestern flair.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Sunset-Inspired Hues</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Arizona's famous sunsets inspire rich purples, deep oranges, and golden yellows. These dramatic colors work best as accents in artwork, textiles, or ceramic pieces rather than as dominant wall colors.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Incorporating Authentic Southwestern Elements</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Handcrafted Textiles</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Navajo rugs, Mexican serapes, and other handwoven textiles add authentic cultural elements while providing texture and warmth. Look for genuine pieces from reputable sources, or support local artisans who create inspired works using traditional techniques.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Rustic Metal Work</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Wrought iron, copper, and tin elements reflect the Spanish colonial influence in Southwestern design. Consider wrought iron light fixtures, copper range hoods, or tin mirror frames to add authentic metalwork details.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Native Plants and Natural Elements</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Incorporate living elements like succulents, cacti, and native plants in beautiful pottery. Dried seed pods, interesting rocks, and driftwood can serve as natural sculptures that bring the desert indoors.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Modern Applications of Traditional Elements</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Contemporary Adobe Features</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Modern homes can incorporate adobe-inspired elements through textured plaster walls, earthen-colored concrete countertops, or contemporary fireplaces with traditional proportions. The key is maintaining the organic, handcrafted feel while updating for modern living.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Updated Color Applications</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        While traditional Southwestern colors remain timeless, contemporary applications might use them more subtly. Consider a single accent wall in deep terracotta, turquoise cabinet hardware, or sage green cabinetry paired with warm white walls.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Mixing with Modern Materials</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Combine traditional elements with modern materials for updated Southwestern style. Pair rustic wood beams with sleek stainless steel appliances, or combine natural stone with contemporary glass and metal fixtures.
                    </p>

                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                        <h4 className="font-semibold text-primary-900 mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2" />
                            Ready to Embrace Southwestern Style?
                        </h4>
                        <p className="text-primary-800 mb-4 leading-relaxed">
                            Our design team specializes in authentic Southwestern design that honors Arizona's cultural heritage while meeting modern lifestyle needs. We can help you incorporate these timeless elements in a way that feels both authentic and contemporary.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        >
                            Schedule Design Consultation
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Room-by-Room Applications</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Living Spaces</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        In living rooms, consider a stone or adobe fireplace as a focal point, complemented by leather furniture, woven textiles, and pottery collections. Exposed ceiling beams and tile floors complete the authentic Southwestern feel.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Kitchen Applications</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Southwestern kitchens can feature terra cotta tile backsplashes, copper farmhouse sinks, and rustic wood cabinetry. Talavera pottery displays and wrought iron fixtures add authentic cultural touches.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Outdoor Spaces</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Patios and courtyards are essential in Southwestern design. Use natural stone flooring, adobe walls, and desert landscaping to create outdoor rooms that extend your living space into Arizona's beautiful climate.
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
                                Isabella is REMODELY's cultural design specialist with deep knowledge of Southwestern architecture and design traditions. She helps clients incorporate authentic cultural elements while respecting their origins and meanings.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </article>
        </div>
    )
}

export default SouthwestStyleArticle
