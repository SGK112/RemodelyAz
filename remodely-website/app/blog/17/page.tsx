'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, BookOpen, ArrowRight, Palette, Brain, Heart, Lightbulb } from 'lucide-react'
import { SITE_IMAGES } from '@/lib/site-images'

const ColorPsychologyArticle = () => {
    const article = {
        id: 17,
        title: 'Color Psychology in Home Design: Creating Mood Through Color',
        excerpt: 'Understand how different colors affect emotions and behavior to create spaces that support your desired lifestyle.',
        image: SITE_IMAGES.projects.bathroom_luxury,
        author: 'Dr. Sofia Martinez',
        date: 'April 8, 2024',
        readTime: '7 min read',
        category: 'Design Psychology',
        tags: ['Color Psychology', 'Interior Design', 'Mood', 'Wellness']
    }

    const colorEffects = [
        {
            icon: Heart,
            title: "Emotional Response",
            description: "Colors trigger immediate emotional reactions and associations"
        },
        {
            icon: Brain,
            title: "Cognitive Impact",
            description: "Different hues can enhance focus, creativity, or relaxation"
        },
        {
            icon: Palette,
            title: "Cultural Influence",
            description: "Color meanings vary across cultures and personal experiences"
        },
        {
            icon: Lightbulb,
            title: "Behavioral Change",
            description: "Strategic color use can influence activity and energy levels"
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

                {/* Color Psychology Effects */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">How Color Affects Us</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {colorEffects.map((effect, index) => {
                            const IconComponent = effect.icon
                            return (
                                <div key={index} className="text-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <IconComponent className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{effect.title}</h3>
                                    <p className="text-sm text-gray-600">{effect.description}</p>
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
                        Color is one of the most powerful tools in interior design, capable of transforming not just how a space looks, but how it feels and functions. Understanding color psychology—the study of how colors affect human behavior and emotions—can help you create homes that actively support your wellbeing, productivity, and happiness.
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">The Science of Color Perception</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Our response to color is both physiological and psychological. When light enters our eyes, it triggers not only visual processing but also affects our hormonal systems, circadian rhythms, and emotional centers in the brain. This means color choices in your home can influence everything from sleep quality to stress levels to creative thinking.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Warm Colors: Energy and Intimacy</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Red: Passion and Power</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Red increases heart rate and blood pressure, making it the most stimulating color on the spectrum. In homes, red can create intimate, energizing spaces perfect for dining rooms or accent walls. However, too much red can feel overwhelming or aggressive, so use it strategically as an accent rather than a dominant color.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Orange: Warmth and Creativity</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Orange combines red's energy with yellow's cheerfulness, creating feelings of enthusiasm and creativity. It's excellent for social spaces like kitchens and family rooms where you want to encourage conversation and activity. In Arizona, orange tones can complement our beautiful desert sunsets while energizing interior spaces.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Yellow: Joy and Mental Stimulation</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Yellow stimulates mental activity and can enhance concentration and memory. It's associated with happiness and optimism, making it ideal for home offices, kitchens, or children's spaces. However, bright yellows can be overstimulating in large doses, so consider softer, muted yellows for larger areas.
                    </p>

                    <div className="bg-accent-50 border-l-4 border-accent-600 p-6 mb-8 rounded-r-lg">
                        <h4 className="font-semibold text-accent-900 mb-2">Arizona Color Considerations</h4>
                        <p className="text-accent-800 text-sm leading-relaxed">
                            Arizona's intense sunlight can make warm colors appear more saturated and potentially overwhelming. Consider how natural light will affect your color choices throughout the day, and test colors in different lighting conditions before making final decisions.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Cool Colors: Calm and Focus</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Blue: Tranquility and Trust</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Blue lowers blood pressure and heart rate, creating immediate calming effects. It's associated with stability, trust, and peace, making it ideal for bedrooms and bathrooms. Light blues can make small spaces feel larger, while darker blues create sophisticated, cocoon-like environments perfect for rest and relaxation.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Green: Balance and Renewal</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Green is the most restful color for human eyes and is strongly associated with nature, growth, and renewal. It can reduce eye strain and promote concentration, making it excellent for home offices or reading nooks. In Arizona homes, green provides a refreshing contrast to our desert environment.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Purple: Luxury and Spirituality</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Purple combines blue's calming effects with red's energy, creating feelings of luxury and creativity. Lighter purples (lavender) can be soothing in bedrooms, while deeper purples create dramatic, sophisticated spaces. Purple is often associated with spirituality and introspection, making it suitable for meditation or reading areas.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Neutral Colors: Foundation and Flexibility</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">White: Purity and Space</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        White reflects light and creates feelings of cleanliness, simplicity, and openness. It can make small spaces feel larger and provides a neutral backdrop for artwork and furnishings. However, pure white can feel sterile, so consider warm or cool-toned whites that add subtle character while maintaining brightness.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Gray: Sophistication and Balance</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Gray is psychologically neutral and can create sophisticated, calming environments. It serves as an excellent backdrop for both warm and cool accent colors. Light grays can feel fresh and modern, while darker grays create intimate, cozy spaces perfect for Arizona evenings.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Beige and Earth Tones: Comfort and Grounding</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Earth tones create feelings of stability, comfort, and connection to nature. They're particularly appropriate in Arizona where they complement our natural landscape. These colors are psychologically comforting and work well in any room where you want to promote relaxation and wellbeing.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Black: Drama and Sophistication</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Black can create dramatic, sophisticated spaces when used strategically. It makes other colors appear more vibrant and can add depth and elegance to interiors. However, too much black can feel oppressive, so use it as an accent or in spaces with abundant natural light.
                    </p>

                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                        <h4 className="font-semibold text-primary-900 mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2" />
                            Ready to Transform Your Home with Color?
                        </h4>
                        <p className="text-primary-800 mb-4 leading-relaxed">
                            Our color psychology specialists can help you choose colors that support your lifestyle goals while creating beautiful, harmonious spaces. Let's design interiors that look amazing and make you feel your best.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        >
                            Discover Your Perfect Palette
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Room-by-Room Color Psychology</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Living Rooms: Social and Welcoming</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Living rooms benefit from colors that encourage conversation and relaxation. Warm neutrals create welcoming environments, while soft blues or greens can promote peaceful gathering. Consider how the room's natural light changes throughout the day and choose colors that remain inviting from morning to evening.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Kitchens: Energy and Appetite</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Kitchens are active spaces that benefit from energizing colors. Warm tones like yellow, orange, or warm whites can stimulate appetite and conversation. However, avoid overly stimulating colors that might make cooking stressful. Clean, bright colors also support food safety by making dirt and spills more visible.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Bedrooms: Rest and Intimacy</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Bedrooms should promote rest and relaxation through calming colors. Soft blues, gentle greens, or warm neutrals can create peaceful environments conducive to sleep. Avoid bright, stimulating colors that might interfere with rest, particularly in Arizona where external temperatures already affect sleep quality.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Home Offices: Focus and Productivity</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Office spaces benefit from colors that enhance concentration without causing fatigue. Green can reduce eye strain during computer work, while blue promotes mental clarity. Yellow accents can stimulate creativity, but avoid overwhelming amounts that might become distracting during long work sessions.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Bathrooms: Cleanliness and Renewal</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Bathrooms should feel clean and refreshing. Light colors make spaces feel larger and cleaner, while blue-greens can create spa-like environments. Consider how colors will look under both natural and artificial light, as bathrooms often have limited natural light sources.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Children's Rooms: Growth and Creativity</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Children's spaces can handle more vibrant colors than adult spaces, but balance is still important. Consider the child's personality—energetic children might benefit from calming blues or greens, while quieter children might enjoy stimulating yellows or oranges. Plan for colors that can evolve as children grow.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Cultural and Personal Color Associations</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Cultural Variations</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Color meanings vary significantly across cultures. While red might symbolize luck and prosperity in some cultures, it can represent danger or aggression in others. Consider your family's cultural background and personal associations when choosing colors for your home.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Color History</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Your personal experiences with colors matter more than general psychology rules. A color associated with happy memories will have positive effects regardless of its general psychological associations. Pay attention to your instinctive reactions to different colors.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Seasonal Affective Considerations</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Some people are more sensitive to seasonal light changes, even in Arizona's sunny climate. Warmer colors can compensate for shorter winter days, while cooler colors can provide psychological relief during intense summer heat. Consider adaptable color schemes that can change with seasons.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Creating Color Harmony</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">The 60-30-10 Rule</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        This classic design rule suggests using a dominant color for 60% of the space (walls, large furniture), a secondary color for 30% (upholstery, curtains), and an accent color for 10% (accessories, artwork). This creates balanced, harmonious spaces that aren't overwhelming.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Temperature Balance</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Combine warm and cool colors to create balanced environments. A predominantly cool space might benefit from warm wood tones or orange accents, while a warm space might need cool blue or green elements to prevent overstimulation.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Saturation and Brightness</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Vary the intensity of your colors to create depth and interest. Combine muted tones with more saturated accents, or use different values (lightness/darkness) of the same color family to create sophisticated, layered color schemes.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Flow Between Spaces</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Consider how colors flow from room to room. While each space can have its own color personality, connecting elements like neutral trim or repeated accent colors help create cohesive flow throughout your home.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Testing and Implementing Color Changes</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Sample Testing</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Always test colors in your actual space before committing. Paint large sample areas (at least 2x2 feet) and observe them at different times of day and under different lighting conditions. Arizona's intense sunlight can dramatically change how colors appear.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Lighting Considerations</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Different light sources affect color appearance. Warm LED bulbs can make cool colors appear muddy, while cool daylight bulbs can make warm colors look washed out. Consider your lighting choices as part of your overall color strategy.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Gradual Implementation</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        You don't need to change everything at once. Start with accessories and textiles that can be easily changed, then move to larger commitments like paint and furniture. This allows you to live with colors and understand their effects before making permanent changes.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Professional Color Consultation</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Consider working with color specialists who understand both design principles and psychological effects. They can help you navigate the complex relationships between colors, lighting, and architecture to create spaces that truly support your lifestyle and wellbeing.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Color Trends vs. Timeless Choices</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Understanding Color Trends</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Color trends reflect cultural moments and can be fun to incorporate through accessories and accent walls. However, major color commitments should be based on your personal preferences and lifestyle needs rather than temporary trends that may feel dated quickly.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Building Timeless Palettes</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Create lasting color schemes by focusing on colors that feel personally meaningful and psychologically supportive. Neutral backgrounds with carefully chosen accent colors can evolve with your changing preferences while maintaining long-term appeal.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Seasonal Adaptability</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Design color schemes that can be refreshed seasonally through textiles, artwork, and accessories. This allows you to enjoy color variety while maintaining a cohesive overall palette that supports your home's architecture and your family's needs.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">The Future of Color in Your Home</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Understanding color psychology empowers you to make informed decisions about your living environment. Rather than choosing colors based solely on aesthetics, you can select palettes that actively support your mental health, productivity, and overall quality of life.
                    </p>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Remember that the "right" colors are ultimately the ones that make you and your family feel at home. Use color psychology as a guide, but trust your instincts and personal preferences to create spaces that are both beautiful and deeply supportive of the life you want to live.
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
                                Dr. Sofia Martinez is REMODELY's color psychology specialist with a doctorate in environmental psychology. She researches the intersection of color, emotion, and behavior in residential environments, helping clients create homes that actively support their mental health and lifestyle goals.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </article>
        </div>
    )
}

export default ColorPsychologyArticle
