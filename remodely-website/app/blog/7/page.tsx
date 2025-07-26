'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, BookOpen, ArrowRight, Sun, Droplets, Mountain, Trees, Cactus, Flower } from 'lucide-react'

const DesertLandscapingArticle = () => {
    const article = {
        id: 7,
        title: 'Desert Landscaping: Creating Beautiful Arizona Outdoor Spaces',
        excerpt: 'Transform your outdoor areas with drought-resistant plants and stunning desert-inspired design elements.',
        image: 'https://images.unsplash.com/photo-1571069423917-8b4b3a4c0a2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        author: 'Marcus Rivera',
        date: 'March 12, 2024',
        readTime: '6 min read',
        category: 'Outdoor Living',
        tags: ['Landscaping', 'Desert Design', 'Water Conservation', 'Arizona']
    }

    const landscapeFeatures = [
        {
            icon: Cactus,
            title: "Native Plants",
            description: "Drought-resistant desert plants that thrive naturally"
        },
        {
            icon: Droplets,
            title: "Water Efficiency",
            description: "Smart irrigation systems that conserve precious water"
        },
        {
            icon: Sun,
            title: "Heat Tolerance",
            description: "Plants and materials that excel in Arizona's climate"
        },
        {
            icon: Mountain,
            title: "Natural Beauty",
            description: "Designs that complement Arizona's stunning landscape"
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

                {/* Desert Landscaping Features */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Desert Landscaping Principles</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {landscapeFeatures.map((feature, index) => {
                            const IconComponent = feature.icon
                            return (
                                <div key={index} className="text-center">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <IconComponent className="w-6 h-6 text-orange-600" />
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
                        Arizona's desert landscape offers incredible natural beauty, but many homeowners struggle to create outdoor spaces that feel both welcoming and sustainable. The key is embracing the desert's unique characteristics rather than fighting them—creating landscapes that celebrate our environment while providing comfortable, functional outdoor living areas.
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Desert Design</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Desert landscaping, or xeriscaping, isn't about creating a sparse, barren yard filled only with rocks and cacti. It's about designing beautiful, diverse outdoor spaces that work harmoniously with Arizona's climate, using water efficiently while creating visual interest through texture, color, and form.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Planning Your Desert Landscape</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Site Analysis</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Start by understanding your specific site conditions. Note sun and shade patterns throughout the day, natural drainage flows, existing mature plants worth preserving, and views you want to enhance or screen. Arizona's intense sun and dramatic seasonal temperature variations create unique microclimates within your property.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Water Zones</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Organize your landscape into water zones—areas with similar irrigation needs. Place higher-water plants near the house where you'll see them most, transitioning to drought-tolerant natives in outlying areas. This creates visual impact where it matters most while minimizing water usage overall.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Seasonal Considerations</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Design for year-round interest by combining plants that shine in different seasons. Many desert plants bloom spectacularly in spring, while others provide stunning fall color or interesting winter structure. Consider how monsoon rains will affect drainage and which areas might need temporary shade in summer.
                    </p>

                    <div className="bg-accent-50 border-l-4 border-accent-600 p-6 mb-8 rounded-r-lg">
                        <h4 className="font-semibold text-accent-900 mb-2">Arizona Water Wisdom</h4>
                        <p className="text-accent-800 text-sm leading-relaxed">
                            Most Arizona cities offer rebates for water-efficient landscaping. Check with your local water utility about cash incentives for removing grass, installing drip irrigation, or planting native plants. These programs can significantly offset landscaping costs.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Native Plant Palette</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Signature Trees</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Palo verde trees provide stunning spring blooms and dappled shade perfect for Arizona's intense sun. Mesquite trees offer filtered shade and interesting sculptural forms, while desert willow creates graceful movement with orchid-like flowers. These natives need minimal water once established.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Accent Plants</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Agaves provide dramatic architectural structure, from compact varieties perfect for containers to massive century plants that create stunning focal points. Ocotillo adds vertical elements with seasonal scarlet blooms, while barrel cacti and prickly pears offer interesting shapes and colorful flowers or fruit.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Groundcover Options</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Desert marigold provides year-round golden blooms, while brittlebush offers silver foliage and cheerful yellow flowers. Penstemon species add vertical flower spikes in various colors, attracting hummingbirds and butterflies. These low-maintenance groundcovers create color without constant care.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Seasonal Color</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Desert lupine provides stunning purple spikes in spring, while desert marigold blooms nearly year-round with bright yellow flowers. Ghost plant and other succulents offer subtle color changes with seasons and stress, creating an ever-changing palette without constant replanting.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Water-Wise Irrigation</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Drip Irrigation Systems</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Drip irrigation delivers water directly to plant roots, minimizing evaporation and runoff. Modern systems can be programmed for different zones and seasons, automatically adjusting for plant needs and weather conditions. This can reduce landscape water usage by 30-50% compared to spray irrigation.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Rainwater Harvesting</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Capture and direct roof runoff to planted areas using channels, basins, and simple berms. Even Arizona's limited rainfall can provide significant irrigation when properly collected and directed. Rain barrels and cisterns can store water for dry periods.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Smart Controllers</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Weather-based irrigation controllers adjust watering schedules based on temperature, humidity, and rainfall data. Many can be controlled remotely via smartphone apps, allowing you to adjust irrigation while traveling or respond to unexpected weather changes.
                    </p>

                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                        <h4 className="font-semibold text-primary-900 mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2" />
                            Ready to Transform Your Outdoor Space?
                        </h4>
                        <p className="text-primary-800 mb-4 leading-relaxed">
                            Our landscape design specialists understand Arizona's unique challenges and opportunities. We'll help you create a beautiful, water-efficient outdoor space that complements your home and lifestyle.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        >
                            Plan Your Desert Oasis
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Hardscape Elements</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Natural Stone</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Arizona flagstone, desert granite, and local river rock create beautiful, durable hardscape elements that complement the natural landscape. These materials age gracefully and provide thermal mass that helps moderate temperature extremes around outdoor living areas.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Decorative Gravel</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Decomposed granite pathways provide natural-looking, permeable surfaces that handle monsoon rains well. Decorative gravels in earth tones create attractive mulch alternatives that don't need replacement and actually improve with age as they develop natural patina.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Shade Structures</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Ramadas, pergolas, and shade sails create essential outdoor comfort in Arizona. Consider materials like cedar or metal that weather well, and design structures to capture cooling breezes while providing protection from intense summer sun and occasional winter storms.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Water Features</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Small water features provide cooling effects and pleasant sounds without excessive water usage. Consider recirculating fountains, small pools with aquatic plants, or seasonal water features that celebrate monsoon rains while providing visual interest year-round.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Creating Outdoor Living Spaces</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Outdoor Kitchens</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Arizona's climate allows year-round outdoor cooking and entertaining. Design outdoor kitchens with morning shade for breakfast and evening protection for dinner. Include storage for cushions and electronics that need protection from dust storms and intense UV exposure.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Fire Features</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Fire pits and fireplaces extend outdoor living into cooler months, creating focal points for gathering. Choose materials and locations that complement desert plants and consider how fire features will look and function during Arizona's windy seasons.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Seating Areas</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Create multiple seating areas to capture different views and conditions throughout the day. Morning coffee spots might face east toward mountain views, while evening relaxation areas should capture sunset views while providing wind protection.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Seasonal Maintenance</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Spring Preparation</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Spring is pruning season for most desert plants. Remove frost damage, shape overgrown plants, and prepare irrigation systems for the growing season. This is also the best time for new plantings, giving plants time to establish before summer heat.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Summer Care</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Monitor irrigation systems closely during summer heat, but avoid overwatering established natives. Focus on newly planted areas and higher-water zones near the house. Provide temporary shade for vulnerable plants during extreme heat events.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Monsoon Management</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Prepare for monsoon season by clearing drainage channels, securing loose materials, and checking that water harvesting systems are ready. The combination of wind and rain can damage plants and structures, but proper preparation prevents most problems.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Winter Protection</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        While many desert plants are cold-hardy, tender succulents and tropical plants may need protection during occasional freezes. Plan protection strategies and have frost cloth ready for vulnerable plants in exposed locations.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Wildlife-Friendly Design</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Native Plant Benefits</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Native plants support local wildlife by providing familiar food sources and nesting materials. Desert plants that coevolved with local birds, insects, and mammals create more dynamic, living landscapes than exotic species that wildlife can't use.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Water Sources</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Small water features, bird baths, or even dripping irrigation emitters provide crucial water sources for desert wildlife. Position these where you can enjoy watching birds and other visitors while ensuring easy maintenance and cleaning.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Shelter Options</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Dense shrubs, rock piles, and varied plant heights create shelter for different wildlife species. Design these areas away from main entertainment spaces but where you can observe wildlife activity from windows or quiet seating areas.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Making It Personal</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        The best desert landscapes reflect both Arizona's natural beauty and your personal style. Whether you prefer minimalist modern design, colorful cottage gardens adapted for the desert, or rustic southwestern themes, the key is choosing plants and materials that thrive here while creating spaces you love to use.
                    </p>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Working with landscape professionals who understand both design principles and Arizona's unique growing conditions ensures your outdoor spaces will be beautiful, functional, and sustainable for years to come. The result is a landscape that feels both distinctly Arizona and uniquely yours.
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
                                Marcus is REMODELY's landscape design specialist with over 12 years of experience creating stunning outdoor spaces in Arizona. He specializes in native plant design, water-efficient irrigation, and outdoor living areas that celebrate the desert's natural beauty.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </article>
        </div>
    )
}

export default DesertLandscapingArticle
