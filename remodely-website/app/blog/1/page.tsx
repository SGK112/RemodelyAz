'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, BookOpen, ArrowRight } from 'lucide-react'
import { SITE_IMAGES } from '@/lib/site-images'

const KitchenTrendsArticle = () => {
    const article = {
        id: 1,
        title: '2024 Kitchen Design Trends: What\'s Hot This Year',
        excerpt: 'Discover the latest kitchen design trends that are transforming homes across the country. From smart appliances to sustainable materials, here\'s what homeowners are choosing.',
        image: SITE_IMAGES.blog.sustainable_materials,
        author: 'Sarah Chen',
        date: 'March 15, 2024',
        readTime: '8 min read',
        category: 'Design Trends',
        tags: ['Kitchen', 'Trends', 'Design', '2024']
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
                        The kitchen continues to evolve as the heart of the modern home, and 2024 brings exciting new trends that blend functionality with cutting-edge design. From smart technology integration to sustainable materials, this year's kitchen trends focus on creating spaces that are both beautiful and highly functional for today's lifestyle.
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Smart Technology Integration</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        The smart home revolution has reached the kitchen in full force. Homeowners are embracing technology that makes cooking more efficient, entertaining easier, and daily routines more streamlined. From voice-activated faucets to refrigerators that help plan meals, smart kitchens are becoming the new standard.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Kitchen Design Trends for 2024</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Two-Tone Cabinet Designs</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        The monochromatic kitchen is giving way to sophisticated two-tone designs. Popular combinations include navy blue lower cabinets with white uppers, or warm wood tones paired with crisp white. This trend adds visual interest and allows homeowners to incorporate multiple colors they love.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Statement Backsplashes</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Bold, artistic backsplashes are taking center stage in 2024 kitchens. Natural stone slabs, zellige tiles, and geometric patterns create stunning focal points. Many homeowners are choosing to extend backsplashes all the way to the ceiling for maximum impact.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Mixed Metal Finishes</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        The rule of matching all hardware is officially outdated. Mixed metals—like brushed brass faucets with black cabinet hardware—create sophisticated, curated looks that feel more personalized and less "matchy-matchy."
                    </p>

                    <div className="bg-accent-50 border-l-4 border-accent-600 p-6 mb-8 rounded-r-lg">
                        <h4 className="font-semibold text-accent-900 mb-2">Design Tip</h4>
                        <p className="text-accent-800 text-sm leading-relaxed">
                            When mixing metals, stick to no more than three finishes and ensure they appear throughout the space for visual balance. Choose one as your dominant finish and use others as accents.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Sustainable Materials and Eco-Friendly Choices</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Recycled and Reclaimed Materials</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Sustainability is driving material choices in 2024. Recycled glass countertops, reclaimed wood shelving, and eco-friendly cabinet materials are not just environmentally responsible—they're also creating unique, characterful spaces with interesting stories to tell.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Energy-Efficient Appliances</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        ENERGY STAR appliances are becoming the standard, not the exception. Induction cooktops, efficient dishwashers, and smart refrigerators that optimize energy use are popular choices that reduce both environmental impact and utility bills.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Low-VOC Finishes</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Health-conscious homeowners are choosing low-VOC (Volatile Organic Compounds) paints, stains, and finishes. These products improve indoor air quality while still providing beautiful, durable results.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Color Trends Making Waves</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Warm Neutrals</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Cool grays are giving way to warmer neutrals like greige, mushroom, and soft taupe. These colors create inviting spaces that feel cozy rather than clinical, perfect for the kitchen's role as a gathering place.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Bold Accent Colors</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        While base colors remain neutral, homeowners are incorporating bold accents through islands, backsplashes, or appliances. Deep forest green, navy blue, and rich burgundy are particularly popular choices.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Natural Wood Tones</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Natural wood is making a strong comeback, often in its authentic, unstained form. White oak, walnut, and even lighter woods like maple are being celebrated for their natural beauty and grain patterns.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Functional Design Innovations</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Hidden Storage Solutions</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Clever storage solutions are becoming more sophisticated. Pull-out pantry systems, hidden appliance garages, and custom drawer organizers help maintain clean, uncluttered countertops while maximizing functionality.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Level Islands</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Kitchen islands are getting more complex, with different heights for various functions: lower prep areas, standard counter height for working, and bar height for casual dining. This creates distinct zones within the kitchen.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Integrated Appliances</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Seamless integration continues to be important, with appliances that blend into cabinetry for a streamlined look. Panel-ready dishwashers and refrigerators create cohesive designs where appliances don't disrupt the visual flow.
                    </p>

                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                        <h4 className="font-semibold text-primary-900 mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2" />
                            Ready to Embrace 2024's Kitchen Trends?
                        </h4>
                        <p className="text-primary-800 mb-4 leading-relaxed">
                            Our design team stays current with the latest trends while ensuring your kitchen reflects your personal style and meets your family's needs. We can help you incorporate these 2024 trends in a way that will remain beautiful and functional for years to come.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        >
                            Start Your Kitchen Renovation
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Arizona-Specific Considerations</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Heat-Resistant Materials</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Arizona's intense heat requires special consideration for materials. Choose fade-resistant cabinet finishes, heat-tolerant countertops, and window treatments that block UV rays while maintaining the connection to beautiful desert views.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Indoor-Outdoor Flow</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Arizona's climate allows for excellent indoor-outdoor living. Many 2024 kitchen designs include large sliding doors, pass-through windows to outdoor kitchens, and materials that transition seamlessly from interior to exterior spaces.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Desert Color Palettes</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Arizona kitchens often incorporate colors inspired by the desert landscape: warm terracotta, sage green, and sandy beiges. These earth tones work beautifully with 2024's trend toward warmer neutrals and natural materials.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Planning Your Kitchen Renovation</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        While trends provide inspiration, the best kitchen design balances current styles with timeless functionality. Consider which trends align with your lifestyle, budget, and long-term plans for your home. Focus on incorporating trends through easily changeable elements like paint, hardware, and accessories, while investing in quality materials and layouts that will serve you well for decades.
                    </p>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Working with experienced professionals ensures that trendy elements are incorporated thoughtfully and that your kitchen renovation will remain beautiful and functional long after 2024's trends have evolved. The key is creating a space that reflects your personal style while embracing the innovations that truly improve daily life.
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
                                Sarah is REMODELY's lead kitchen designer with over 12 years of experience creating functional and beautiful kitchen spaces. She specializes in modern design trends and space optimization, helping homeowners create kitchens that are both stylish and practical.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </article>
        </div>
    )
}

export default KitchenTrendsArticle
