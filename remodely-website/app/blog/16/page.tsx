'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, BookOpen, ArrowRight, Leaf, Heart, Eye, Wind } from 'lucide-react'
import { SITE_IMAGES } from '@/lib/site-images'

const BiophilicDesignArticle = () => {
    const article = {
        id: 16,
        title: 'Biophilic Design: Bringing Nature Indoors',
        excerpt: 'Explore how incorporating natural elements into your home design can improve wellbeing and create harmonious living spaces.',
        image: SITE_IMAGES.blog.budget_renovation,
        author: 'Dr. Emma Torres',
        date: 'April 2, 2024',
        readTime: '6 min read',
        category: 'Wellness Design',
        tags: ['Biophilic Design', 'Natural Elements', 'Wellness', 'Indoor Plants']
    }

    const biophilicElements = [
        {
            icon: Leaf,
            title: "Living Elements",
            description: "Plants, living walls, and natural materials that connect us to nature"
        },
        {
            icon: Eye,
            title: "Visual Connection",
            description: "Views of nature and natural patterns that engage our senses"
        },
        {
            icon: Wind,
            title: "Natural Ventilation",
            description: "Fresh air and natural airflow that enhance indoor environments"
        },
        {
            icon: Heart,
            title: "Wellbeing Benefits",
            description: "Reduced stress and improved mental health through nature connection"
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

                {/* Biophilic Elements */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Biophilic Elements</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {biophilicElements.map((element, index) => {
                            const IconComponent = element.icon
                            return (
                                <div key={index} className="text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <IconComponent className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{element.title}</h3>
                                    <p className="text-sm text-gray-600">{element.description}</p>
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
                        Humans have an innate connection to nature—a biological attraction to life and living systems that psychologist Edward Wilson termed "biophilia." Modern life often separates us from the natural world, but biophilic design offers a pathway back, bringing the healing power of nature into our homes to improve our health, happiness, and overall quality of life.
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">The Science Behind Biophilic Design</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Research consistently shows that exposure to natural elements reduces stress hormones, lowers blood pressure, improves cognitive function, and accelerates healing. These benefits aren't just psychological—they're measurable physiological responses that demonstrate our deep biological need for connection with nature, even in indoor environments.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Direct Nature Connection</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Indoor Plants and Living Systems</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Living plants are the most obvious way to bring nature indoors, but their benefits extend far beyond aesthetics. Plants improve air quality by filtering toxins and producing oxygen, regulate humidity levels, and provide the psychological benefits of caring for living things. In Arizona's dry climate, plants also add crucial moisture to indoor air.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Living Walls and Vertical Gardens</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Living walls create dramatic focal points while maximizing the natural elements in limited space. These systems can be as simple as a collection of mounted planters or as sophisticated as hydroponic growing systems integrated into architecture. They're particularly effective in Arizona homes where outdoor growing seasons can be challenging.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Water Elements</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        The sound and sight of moving water creates immediate calming effects. Indoor fountains, water walls, or even small tabletop water features can mask unwanted noise while providing the psychological benefits of water's presence. In Arizona's arid environment, these features also add valuable humidity.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Natural Light and Ventilation</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Maximize natural light through skylights, larger windows, and clerestory windows that bring light deep into interior spaces. Natural ventilation through operable windows and doors connects us to outdoor air movement and temperature changes, maintaining our connection to natural cycles.
                    </p>

                    <div className="bg-accent-50 border-l-4 border-accent-600 p-6 mb-8 rounded-r-lg">
                        <h4 className="font-semibold text-accent-900 mb-2">Arizona Biophilic Advantage</h4>
                        <p className="text-accent-800 text-sm leading-relaxed">
                            Arizona's dramatic landscapes and abundant sunshine create unique opportunities for biophilic design. Large windows can frame stunning desert views, while courtyards and atriums can bring outdoor living indoors year-round in our mild winter climate.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Indirect Nature Connection</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Natural Materials and Textures</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Wood, stone, bamboo, and other natural materials provide tactile and visual connections to nature even when living plants aren't practical. The grain patterns in wood, the texture of natural stone, and the organic forms of materials like rattan or jute all trigger our innate recognition of natural patterns.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Views of Nature</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Even views of nature through windows provide significant biophilic benefits. Studies show that hospital patients with views of trees recover faster than those facing walls. In Arizona, this might mean framing views of mountains, desert landscapes, or even a well-designed courtyard garden.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Natural Colors and Patterns</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Earth tones, plant greens, sky blues, and other nature-inspired colors create psychological associations with natural environments. These colors can be calming and restorative even in spaces where living plants or views of nature aren't available.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Natural Patterns and Forms</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Nature's patterns—fractals, spirals, and organic curves—can be incorporated through artwork, wallpaper, tile patterns, or architectural details. These patterns satisfy our brain's innate preference for natural complexity and can be soothing even when we're not consciously aware of them.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Spatial Configuration and Flow</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Natural Movement Patterns</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Design spaces that follow natural movement patterns rather than rigid geometric layouts. Curved pathways, organic room shapes, and flowing transitions between spaces feel more natural and comfortable than stark, linear arrangements.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Varied Ceiling Heights</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Nature rarely provides uniform environments, and our spaces shouldn't either. Varying ceiling heights create the sense of moving through different natural environments—from intimate cave-like nooks to soaring, cathedral-like spaces that echo forest canopies.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Prospect and Refuge</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Create spaces that offer both "prospect" (open views that allow monitoring of surroundings) and "refuge" (protected, enclosed areas that feel safe). This might mean positioning seating to overlook a room while providing cozy alcoves for retreat—a design pattern that satisfies deep evolutionary preferences.
                    </p>

                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                        <h4 className="font-semibold text-primary-900 mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2" />
                            Ready to Bring Nature Home?
                        </h4>
                        <p className="text-primary-800 mb-4 leading-relaxed">
                            Our biophilic design specialists can help you create healthier, more connected living spaces that honor your relationship with the natural world. Let's design a home that nurtures both body and soul.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        >
                            Create Your Natural Sanctuary
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Room-by-Room Biophilic Design</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Living Areas</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Create a central gathering space with a dramatic living wall or large-scale plantings. Use natural materials like reclaimed wood for flooring or stone for fireplace surrounds. Position seating to take advantage of views while creating intimate conversation areas that feel protected and comfortable.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Kitchens</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Incorporate herb gardens, either as countertop plantings or integrated growing systems. Use natural stone countertops and wood cabinets that age beautifully. Install windows over sinks to provide views while working, and consider natural ventilation to connect cooking activities with outdoor air movement.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Bedrooms</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Focus on air-purifying plants like snake plants or peace lilies that thrive in lower light conditions. Use natural fiber bedding and organic materials. Position beds to take advantage of natural light and views while maintaining privacy and creating a sense of protected refuge.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Bathrooms</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Create spa-like environments with humidity-loving plants like ferns or air plants. Use natural stone and wood materials that can handle moisture. Include natural light through skylights or high windows, and consider outdoor shower areas where Arizona's climate allows.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Home Offices</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Position workspaces to take advantage of natural light and views, which can improve focus and reduce eye strain. Include plants that are known to improve air quality and cognitive function. Use natural materials for furniture and create visual breaks with nature views or natural patterns.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Plant Selection for Arizona Homes</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Low-Maintenance Options</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Succulents, cacti, and drought-tolerant plants are naturals for Arizona homes. Consider varieties like aloe vera, jade plants, or desert roses that thrive in dry conditions and require minimal care while providing the visual and psychological benefits of living plants.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Air-Purifying Varieties</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        NASA's Clean Air Study identified plants that excel at removing indoor air pollutants. Snake plants, spider plants, and pothos are particularly effective and adapt well to Arizona's indoor conditions. These plants provide both aesthetic and health benefits.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Statement Plants</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Large plants like fiddle leaf figs, bird of paradise, or even indoor citrus trees can create dramatic focal points that bring significant natural presence to interior spaces. These plants work well in Arizona's bright, sunny interiors with proper care and positioning.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Seasonal Adaptations</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Consider how plants will adapt to Arizona's seasonal changes. Some plants may benefit from moving between indoor and outdoor locations, while others can provide year-round indoor beauty. Plan for seasonal care requirements and adapt irrigation and positioning as needed.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Technology and Biophilic Design</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Growing Systems</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Hydroponic and aeroponic growing systems can maintain healthy plants with minimal maintenance, making it easier to incorporate extensive plantings into busy lifestyles. These systems can be integrated into architecture and controlled remotely for optimal plant health.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Automated Irrigation</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Drip irrigation systems and self-watering planters can maintain plant health while reducing maintenance requirements. This is particularly valuable in Arizona where consistent watering is crucial but easy to overlook during busy periods.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">LED Growing Lights</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Advanced LED systems can supplement natural light in areas where plants might struggle, extending the possibilities for biophilic design throughout the home. These systems can be integrated architecturally and programmed to support plant health while providing ambient lighting.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Environmental Monitoring</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Smart sensors can monitor air quality, humidity, and temperature to optimize both plant health and human comfort. This data can inform adjustments to HVAC systems, irrigation schedules, and plant selection for optimal biophilic benefits.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">The Psychology of Natural Patterns</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Fractals in Design</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Natural fractals—repeating patterns at different scales—appear throughout nature and can be incorporated into interior design through artwork, textiles, or architectural details. These patterns are inherently pleasing to our brains and can create calming, meditative environments.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Golden Ratio Applications</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        The golden ratio appears frequently in nature and can guide proportions in room layouts, furniture placement, and architectural details. Spaces designed with these proportions often feel naturally balanced and harmonious without obvious explanation.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Seasonal Rhythms</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Design spaces that can adapt to seasonal changes through lighting, textiles, or moveable elements. This connection to natural cycles helps maintain our circadian rhythms and provides the psychological benefits of seasonal variation even in climate-controlled environments.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Creating Your Biophilic Home</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Biophilic design isn't about following a specific style—it's about creating meaningful connections to nature within your living spaces. Start small with a few plants or natural materials, then gradually expand these elements as you discover what resonates most strongly with your family's lifestyle and preferences.
                    </p>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                        The goal is creating spaces that feel alive, nurturing, and connected to the natural world. Whether through dramatic living walls, simple potted plants, natural materials, or views of Arizona's stunning landscapes, biophilic design offers pathways to healthier, more joyful living that honors our deep biological need for nature connection.
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
                                Dr. Emma Torres is REMODELY's wellness design specialist with a background in environmental psychology. She researches the intersection of built environments and human wellbeing, helping clients create homes that support both physical and mental health through thoughtful biophilic design principles.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </article>
        </div>
    )
}

export default BiophilicDesignArticle
