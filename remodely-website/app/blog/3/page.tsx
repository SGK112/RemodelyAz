'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, BookOpen, ArrowRight, DollarSign, TrendingUp, Home } from 'lucide-react'
import { SITE_IMAGES } from '@/lib/site-images'

const KitchenROIArticle = () => {
    const article = {
        id: 3,
        title: 'The ROI of Kitchen Remodeling: What to Expect',
        excerpt: 'Understanding the financial benefits of kitchen renovation and how to maximize your return on investment.',
        image: SITE_IMAGES.blog.kitchen_trends,
        author: 'David Thompson',
        date: 'March 5, 2024',
        readTime: '7 min read',
        category: 'Investment',
        tags: ['ROI', 'Kitchen', 'Investment', 'Value']
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
                        Kitchen remodeling is one of the most popular home improvement projects, and for good reason. Not only does it enhance your daily living experience, but it also provides excellent returns when it comes time to sell your home. Understanding the financial benefits and how to maximize your investment can help you make informed decisions about your renovation.
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Kitchen Remodeling ROI</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Return on Investment (ROI) in kitchen remodeling refers to the percentage of your renovation costs that you can expect to recoup when selling your home. According to recent industry studies, kitchen remodels typically return between 60-80% of their cost, making them one of the most valuable home improvements you can make.
                    </p>

                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                        <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2" />
                            2024 Kitchen Remodeling ROI Statistics
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-white p-4 rounded-lg">
                                <div className="font-semibold text-primary-700">Major Kitchen Remodel</div>
                                <div className="text-2xl font-bold text-primary-900">72.1%</div>
                                <div className="text-gray-600">Average cost recouped</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg">
                                <div className="font-semibold text-primary-700">Minor Kitchen Remodel</div>
                                <div className="text-2xl font-bold text-primary-900">85.7%</div>
                                <div className="text-gray-600">Average cost recouped</div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Factors That Influence ROI</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Local Market Conditions</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Arizona's strong real estate market and growing population create favorable conditions for kitchen remodeling ROI. Areas like Phoenix, Scottsdale, and Tucson consistently show strong returns on home improvements, particularly in established neighborhoods where buyers expect updated kitchens.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Quality of Materials and Workmanship</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        High-quality materials and professional installation significantly impact ROI. While premium finishes cost more upfront, they often provide better returns because they appeal to more buyers and last longer, reducing the need for future updates.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Scope of the Renovation</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        The extent of your renovation affects ROI differently. Minor updates like painting cabinets, updating hardware, and replacing countertops often provide higher percentage returns, while major renovations provide more absolute value increase but lower percentage returns.
                    </p>

                    <div className="bg-accent-50 border-l-4 border-accent-600 p-6 mb-8 rounded-r-lg">
                        <h4 className="font-semibold text-accent-900 mb-2">Arizona Market Insight</h4>
                        <p className="text-accent-800 text-sm leading-relaxed">
                            Arizona's competitive real estate market means updated kitchens are often expected rather than exceptional. However, this also means outdated kitchens can significantly hurt your home's marketability and selling price.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">High-ROI Kitchen Improvements</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Cabinet Refacing vs. Replacement</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Cabinet refacing typically costs 30-50% less than full replacement while providing 75-85% ROI. If your cabinet boxes are in good condition, refacing with new doors, drawer fronts, and hardware can dramatically update your kitchen's appearance while maximizing your investment return.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Countertop Upgrades</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Countertop replacement offers excellent ROI, especially when upgrading from dated materials like laminate to stone or quartz. In Arizona's market, granite and quartz countertops are expected in higher-end homes and can provide 70-90% ROI depending on the material chosen.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Appliance Updates</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Stainless steel appliances remain popular and can provide good ROI when replacing obviously outdated units. Focus on energy-efficient models that appeal to environmentally conscious buyers while reducing utility costs.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Lighting and Electrical</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Updated lighting, including under-cabinet LED strips, pendant lights, and recessed lighting, provides excellent ROI relative to cost. Good lighting makes kitchens feel larger, more modern, and more functional—all appealing to potential buyers.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Maximizing Your Investment</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Focus on Function</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Buyers prioritize functionality over luxury features. Ensure your renovation improves workflow, adds storage, and creates logical zones for cooking, cleaning, and food preparation. A well-designed kitchen layout often provides better ROI than expensive finishes in a poorly planned space.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Keep It Neutral</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        While bold colors and unique designs might reflect your personal style, neutral palettes appeal to more buyers and provide better ROI. Classic white, gray, and wood tones allow buyers to envision their own belongings in the space.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Don't Over-Improve for Your Neighborhood</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Research comparable homes in your area to ensure your renovation aligns with neighborhood standards. A $100,000 kitchen in a $300,000 neighborhood won't provide the same ROI as in a $600,000 neighborhood.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Timeline Considerations</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">When to Renovate</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        If you're planning to sell within 1-3 years, focus on high-ROI improvements that appeal to buyers. If you're staying longer, you can invest in features you'll enjoy while still considering resale value. The longer you stay, the more you benefit from improved daily living experience.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Market Timing</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Arizona's peak selling season (February through May) means completing renovations by late winter can maximize impact. However, don't rush a renovation to meet selling deadlines—poor workmanship can hurt rather than help your ROI.
                    </p>

                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
                        <h4 className="font-semibold text-primary-900 mb-4 flex items-center">
                            <DollarSign className="w-5 h-5 mr-2" />
                            Ready to Maximize Your Kitchen Investment?
                        </h4>
                        <p className="text-primary-800 mb-4 leading-relaxed">
                            Our team understands the Arizona market and can help you make renovation decisions that maximize both your enjoyment and your ROI. We'll work with your budget to prioritize improvements that provide the best returns.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        >
                            Get ROI Analysis
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Common ROI Mistakes to Avoid</h2>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Over-Personalizing</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Highly personalized features like unusual color schemes, exotic materials, or very specific storage solutions may not appeal to future buyers. Stick to broadly appealing design choices for better ROI.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Ignoring Professional Help</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        DIY mistakes can be expensive to fix and may hurt your home's value. Professional design and installation ensure code compliance, proper functionality, and finished appearance that buyers expect.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Cutting Corners on Important Elements</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Skimping on electrical work, plumbing, or structural elements to save money can create problems that hurt ROI. Invest properly in infrastructure and save money on decorative elements if necessary.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Beyond Financial Returns</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        While ROI is important, don't forget about the value of improved daily living. A well-designed kitchen enhances your quality of life, makes entertaining easier, and can even inspire healthier cooking habits. These lifestyle benefits have value that's harder to quantify but equally important.
                    </p>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                        The best kitchen renovations balance financial considerations with personal needs and preferences. By understanding ROI factors and working with experienced professionals, you can create a kitchen that serves your family beautifully while protecting and enhancing your home's value.
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
                                David is REMODELY's project manager and investment specialist with extensive knowledge of Arizona real estate markets. He helps homeowners make renovation decisions that maximize both immediate enjoyment and long-term property value.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </article>
        </div>
    )
}

export default KitchenROIArticle
