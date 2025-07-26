'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, BookOpen, ArrowRight, Leaf, Recycle, Sun, Droplets } from 'lucide-react'

const SustainableMaterialsArticle = () => {
    const article = {
        id: 4,
        title: 'Sustainable Materials for Eco-Friendly Remodeling',
        excerpt: 'Explore environmentally conscious material choices that don\'t compromise on style or durability.',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        author: 'Sarah Chen',
        date: 'February 28, 2024',
        readTime: '5 min read',
        category: 'Sustainability',
        tags: ['Eco-Friendly', 'Materials', 'Sustainability']
    }

    const sustainableFeatures = [
        {
            icon: Leaf,
            title: "Low Impact Materials",
            description: "Responsibly sourced materials with minimal environmental footprint"
        },
        {
            icon: Recycle,
            title: "Recycled Content",
            description: "Products made from recycled materials reducing waste"
        },
        {
            icon: Sun,
            title: "Energy Efficiency",
            description: "Materials that improve home energy performance"
        },
        {
            icon: Droplets,
            title: "Water Conservation",
            description: "Features that reduce water usage and waste"
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

                {/* Sustainability Features */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Sustainable Design Principles</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {sustainableFeatures.map((feature, index) => {
                            const IconComponent = feature.icon
                            return (
                                <div key={index} className="text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <IconComponent className="w-6 h-6 text-green-600" />
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
                        Sustainable remodeling isn't just about helping the environment—it's about creating healthier homes, reducing long-term costs, and choosing materials that perform better over time. Today's eco-friendly options offer the beauty and durability you want while supporting both your family's wellbeing and environmental stewardship.
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">The Benefits of Sustainable Materials</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Sustainable materials often outperform traditional options in durability, indoor air quality, and long-term value. Many eco-friendly choices also qualify for tax credits, utility rebates, and green building certifications that can increase your home's resale value while reducing environmental impact.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Sustainable Flooring Options</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Bamboo Flooring</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Bamboo grows incredibly fast—some varieties mature in just 3-5 years compared to 20-120 years for hardwood trees. Modern bamboo flooring is harder than many traditional hardwoods, naturally antimicrobial, and available in numerous styles and colors. It performs exceptionally well in Arizona's dry climate.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Reclaimed Wood</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Reclaimed wood from old barns, factories, and homes offers unique character impossible to replicate with new materials. Each piece tells a story while preventing quality lumber from ending up in landfills. Reclaimed wood often features tighter grain patterns and greater stability than new-growth timber.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Cork Flooring</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Cork is harvested from the bark of cork oak trees without harming the tree, making it truly renewable. It's naturally antimicrobial, provides excellent insulation, and offers comfortable cushioning underfoot. Cork's cellular structure makes it naturally resistant to moisture and insects.
                    </p>

                    <div className="bg-accent-50 border-l-4 border-accent-600 p-6 mb-8 rounded-r-lg">
                        <h4 className="font-semibold text-accent-900 mb-2">Arizona Sustainability Tip</h4>
                        <p className="text-accent-800 text-sm leading-relaxed">
                            Choose materials that perform well in dry climates and intense UV exposure. Many sustainable options like bamboo and cork naturally resist the expansion and contraction that can damage floors in Arizona's temperature extremes.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Eco-Friendly Countertops</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Recycled Glass Surfaces</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Recycled glass countertops combine crushed glass with cement or resin binders to create stunning, durable surfaces. They're non-porous, heat-resistant, and available in countless colors and patterns. Many contain 70-100% recycled content from bottles, windows, and other glass waste.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Recycled Paper Composite</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Paper composite countertops made from recycled paper and non-petroleum resins offer surprising durability and warmth. They're lighter than stone, easier to repair if damaged, and can be thermoformed into complex shapes. The surface ages gracefully and can be refinished if needed.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Locally Sourced Stone</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Using local stone reduces transportation emissions while supporting regional businesses. Arizona offers beautiful options like Sedona sandstone, Flagstaff limestone, and desert granite that complement the natural landscape while minimizing environmental impact.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Sustainable Cabinets and Millwork</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">FSC-Certified Wood</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Forest Stewardship Council (FSC) certified wood comes from responsibly managed forests that maintain biodiversity and support local communities. FSC cabinets offer the same beauty and durability as conventional wood while ensuring sustainable forestry practices.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Low-VOC Finishes</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Volatile Organic Compounds (VOCs) in traditional finishes can affect indoor air quality for months after installation. Low-VOC and zero-VOC finishes provide the same protection and beauty while maintaining healthier indoor air, especially important in Arizona's sealed, air-conditioned homes.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Formaldehyde-Free Options</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Many engineered wood products use formaldehyde-based adhesives that can off-gas harmful chemicals. Formaldehyde-free alternatives use safer binders while maintaining structural integrity, creating healthier living environments for you and your family.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Energy-Efficient Building Materials</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">High-Performance Insulation</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Advanced insulation materials like recycled denim, sheep's wool, or cellulose made from recycled newspapers provide superior thermal performance while using sustainable materials. In Arizona, proper insulation is crucial for energy efficiency and comfort.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Cool Roof Materials</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Reflective roofing materials reduce heat absorption, lowering cooling costs significantly in Arizona's climate. Options include cool-colored tiles, metal roofing with reflective coatings, and green roof systems that provide natural insulation and manage stormwater.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Energy-Efficient Windows</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        High-performance windows with low-E coatings, argon gas fills, and thermally broken frames dramatically reduce heat transfer. In Arizona, the right windows can reduce cooling costs by 20-30% while improving comfort and reducing UV damage to furnishings.
                    </p>

                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                        <h4 className="font-semibold text-primary-900 mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2" />
                            Ready to Go Green with Your Remodel?
                        </h4>
                        <p className="text-primary-800 mb-4 leading-relaxed">
                            Our sustainable design specialists can help you choose eco-friendly materials that meet your style preferences, budget, and performance requirements. We'll guide you through options that benefit both your family and the environment.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        >
                            Explore Sustainable Options
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Water Conservation Features</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Low-Flow Fixtures</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Modern low-flow faucets, showerheads, and toilets use significantly less water without sacrificing performance. WaterSense certified fixtures can reduce water usage by 20-30%, important in Arizona where water conservation is both environmentally and economically beneficial.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Greywater Systems</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Greywater systems capture water from sinks, showers, and washing machines for landscape irrigation. In Arizona's arid climate, this can significantly reduce both water bills and demand on municipal water systems while maintaining beautiful landscapes.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Permeable Surfaces</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Permeable pavers and surfaces allow rainwater to soak into the ground rather than running off, reducing erosion and helping recharge groundwater supplies. This is particularly valuable during Arizona's monsoon season for managing stormwater runoff.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Making Sustainable Choices</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Lifecycle Assessment</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Consider the entire lifecycle of materials—from harvesting and manufacturing to transportation, installation, use, and eventual disposal. Sometimes a material with higher upfront environmental costs proves more sustainable over its lifetime due to durability and performance.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Local Sourcing Benefits</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Choosing locally sourced materials reduces transportation emissions, supports regional economies, and often ensures better adaptation to local climate conditions. Arizona has excellent sources for stone, aggregates, and specialty materials perfect for desert living.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Certification Programs</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Look for certifications like ENERGY STAR, GREENGUARD, FSC, or Cradle to Cradle that verify environmental and health claims. These third-party certifications help ensure your material choices truly deliver the sustainability benefits you're seeking.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">The Future of Sustainable Remodeling</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Sustainable materials continue evolving with innovations like mycelium-based products, recycled ocean plastic surfaces, and bio-based insulation materials. The key is balancing environmental benefits with practical performance and aesthetic appeal for your specific needs and climate.
                    </p>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Working with knowledgeable professionals ensures your sustainable choices deliver the performance, beauty, and environmental benefits you expect. We can help you navigate the growing array of eco-friendly options to create a home that's both beautiful and responsible.
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
                                Sarah is REMODELY's sustainable design specialist with expertise in eco-friendly materials and green building practices. She helps homeowners create beautiful, healthy, and environmentally responsible living spaces.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </article>
        </div>
    )
}

export default SustainableMaterialsArticle
