'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, BookOpen, ArrowRight, Minus, Square, Circle, Triangle } from 'lucide-react'

const MinimalistDesignArticle = () => {
    const article = {
        id: 15,
        title: 'Minimalist Design: Less is More in Modern Homes',
        excerpt: 'Discover how minimalist principles create serene, functional spaces that emphasize quality over quantity.',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        author: 'Isabella Chen',
        date: 'March 25, 2024',
        readTime: '5 min read',
        category: 'Design Trends',
        tags: ['Minimalism', 'Modern Design', 'Interior Design']
    }

    const minimalistPrinciples = [
        {
            icon: Minus,
            title: "Simplicity",
            description: "Clean lines and uncluttered spaces that promote calm"
        },
        {
            icon: Square,
            title: "Functionality",
            description: "Every element serves a purpose and adds value"
        },
        {
            icon: Circle,
            title: "Quality",
            description: "Focus on fewer, higher-quality materials and finishes"
        },
        {
            icon: Triangle,
            title: "Balance",
            description: "Careful composition of space, light, and form"
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

                {/* Minimalist Principles */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Minimalist Principles</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {minimalistPrinciples.map((principle, index) => {
                            const IconComponent = principle.icon
                            return (
                                <div key={index} className="text-center">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <IconComponent className="w-6 h-6 text-gray-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{principle.title}</h3>
                                    <p className="text-sm text-gray-600">{principle.description}</p>
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
                        In our increasingly complex world, many homeowners are finding peace in the philosophy of "less is more." Minimalist design isn't about living with nothing—it's about living with intention, surrounding yourself only with things that serve a purpose or bring genuine joy. The result is spaces that feel calm, purposeful, and surprisingly luxurious.
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding True Minimalism</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Minimalism is often misunderstood as stark, cold, or uncomfortable. True minimalist design is actually about creating spaces that feel serene and welcoming while eliminating the unnecessary. It's a design philosophy that prioritizes function, embraces negative space, and celebrates the beauty of simplicity.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">The Psychology of Minimalist Living</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Reduced Mental Clutter</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Clutter in our physical space often translates to clutter in our minds. Minimalist spaces with clean lines and organized storage help reduce visual distractions, allowing your mind to focus on what matters most. This can lead to improved productivity, better sleep, and reduced stress levels.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Enhanced Appreciation</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        When you have fewer objects in your space, you naturally pay more attention to each one. A single piece of artwork becomes a focal point rather than competing with dozens of decorative items. This selective curation helps you truly appreciate the beauty and craftsmanship of your chosen pieces.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Improved Functionality</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Minimalist design forces you to consider the purpose of every item and space in your home. This intentionality typically results in better-functioning spaces where everything has a place and a purpose, making daily routines smoother and more efficient.
                    </p>

                    <div className="bg-accent-50 border-l-4 border-accent-600 p-6 mb-8 rounded-r-lg">
                        <h4 className="font-semibold text-accent-900 mb-2">Arizona Minimalism</h4>
                        <p className="text-accent-800 text-sm leading-relaxed">
                            Arizona's abundant natural light and stunning landscape views make it perfect for minimalist design. Large windows and minimal window treatments maximize connections to the outdoors while reducing the need for artificial lighting and excessive decoration.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Color Palettes for Minimalist Homes</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Neutral Foundations</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Start with a neutral base of whites, grays, and beiges that create a calm backdrop for living. These colors reflect light beautifully, making spaces feel larger and more open. In Arizona, cooler neutrals can help spaces feel refreshing against the warm desert landscape.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Natural Warmth</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Incorporate warm wood tones through flooring, furniture, or architectural elements to prevent minimalist spaces from feeling cold. Natural materials add texture and visual interest while maintaining the clean, uncluttered aesthetic that defines minimalist design.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Strategic Accent Colors</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        When you do use color in minimalist spaces, make it count. A single bold accent wall, a piece of colorful artwork, or carefully chosen textiles can provide visual interest without overwhelming the space. The key is restraint—choose one or two accent colors and use them thoughtfully.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Furniture Selection and Placement</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Over Quantity</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Invest in fewer, higher-quality pieces that will last for years. A well-made sofa, dining table, or bed becomes both functional furniture and a design statement. Look for pieces with clean lines, excellent craftsmanship, and timeless appeal that won't feel dated in a few years.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Functional Pieces</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Choose furniture that serves multiple purposes—ottoman storage, extendable dining tables, or beds with built-in storage. This allows you to maintain functionality while keeping the overall number of pieces to a minimum, supporting the minimalist aesthetic.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Strategic Spacing</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Give your furniture room to breathe. Proper spacing between pieces creates the sense of openness that's essential to minimalist design. Don't feel compelled to fill every corner—negative space is as important as the objects within it.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Built-In Solutions</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Consider built-in storage, seating, and display solutions that seamlessly integrate with your architecture. Built-ins can provide necessary storage while maintaining clean lines and reducing visual clutter from standalone furniture pieces.
                    </p>

                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                        <h4 className="font-semibold text-primary-900 mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2" />
                            Ready to Embrace Minimalist Living?
                        </h4>
                        <p className="text-primary-800 mb-4 leading-relaxed">
                            Our design team can help you create serene, functional spaces that embody minimalist principles while reflecting your personal style. Let's design a home that feels calm, purposeful, and beautifully simple.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        >
                            Start Your Minimalist Journey
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Lighting in Minimalist Design</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Natural Light Priority</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Maximize natural light through large windows, skylights, and glass doors. Avoid heavy window treatments that block light—instead, use sheer panels or motorized blinds that can disappear when not needed. Arizona's abundant sunshine is a minimalist's dream resource.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Clean-Lined Fixtures</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Choose lighting fixtures with simple, geometric forms that complement rather than compete with your space. Recessed lighting, track systems, and architectural lighting can provide necessary illumination while remaining visually unobtrusive.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Statement Pieces</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        When you do use decorative lighting, make it count. A single stunning pendant light or architectural chandelier can serve as both functional lighting and artistic statement, eliminating the need for multiple smaller fixtures.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Storage Solutions That Disappear</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Hidden Storage</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Integrate storage solutions that maintain clean sight lines. Floor-to-ceiling cabinets with handleless doors, under-stair storage, and hidden closets keep belongings organized without creating visual clutter. The goal is to have places for everything without seeing storage itself.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Minimalist Closet Systems</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Design closets with clean lines and efficient organization systems. Open shelving, uniform hangers, and thoughtful compartmentalization make it easier to maintain a minimalist wardrobe while keeping everything easily accessible.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Kitchen Organization</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Minimalist kitchens rely heavily on concealed storage and organized systems. Deep drawers with dividers, appliance garages, and hidden pantries keep countertops clear while maintaining full functionality for cooking and entertaining.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Textures and Materials</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Natural Materials</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Incorporate natural materials like wood, stone, and metal to add warmth and texture without visual complexity. These materials age beautifully and provide subtle variation that keeps minimalist spaces from feeling sterile or cold.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Textural Contrast</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Use texture to create visual interest in monochromatic spaces. Rough stone against smooth glass, soft fabrics against hard surfaces, or matte finishes beside polished ones create depth and engagement without adding colors or patterns.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Quality Finishes</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Since minimalist design showcases fewer elements, each finish becomes more noticeable. Invest in high-quality materials and installation—imperfections that might go unnoticed in busier spaces become focal points in minimalist settings.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Bringing Life to Minimalist Spaces</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Strategic Greenery</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        A few carefully chosen plants can bring life and color to minimalist spaces without creating clutter. Large-scale plants like fiddle leaf figs or bird of paradise make dramatic statements, while small succulents add subtle interest to shelves or surfaces.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Curated Art</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Choose fewer, larger pieces of artwork rather than gallery walls of small pieces. A single stunning photograph, painting, or sculpture becomes a focal point that draws the eye and creates emotional connection within the serene space.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Touches</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Minimalism doesn't mean removing all personality from your space. Include meaningful objects, family photographs, or collections—just be selective about what you display and how you display it. The key is intention rather than abundance.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Maintaining Minimalist Spaces</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Daily Habits</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Minimalist spaces require consistent maintenance to preserve their serene quality. Develop habits of putting things away immediately, regularly decluttering surfaces, and resisting the urge to accumulate unnecessary items.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Seasonal Reviews</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Periodically review your belongings and spaces to ensure they still serve your needs and align with your minimalist goals. This ongoing curation helps prevent the gradual accumulation that can undermine minimalist design over time.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Quality Control</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        When you do add new items to minimalist spaces, apply strict quality standards. Each new addition should serve a clear purpose, fit seamlessly with existing elements, and maintain the overall aesthetic you've created.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Living Beautifully with Less</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Minimalist design isn't about deprivation—it's about discovering what truly matters and creating spaces that support your best life. When done thoughtfully, minimalist homes feel luxurious, calming, and deeply personal while reducing the stress and maintenance that come with excess.
                    </p>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                        The journey toward minimalist living is personal and gradual. Start with one room or area, experiment with reducing clutter and simplifying your belongings, and notice how the changes affect your daily experience. You may find that less really is more when it comes to creating a home that truly serves your life.
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
                                Isabella is REMODELY's minimalist design specialist who helps clients create serene, functional spaces through thoughtful curation and intentional design choices. She believes that beautiful homes don't require excess—just careful attention to what truly matters.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </article>
        </div>
    )
}

export default MinimalistDesignArticle
