'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, BookOpen } from 'lucide-react'
import { SITE_IMAGES } from '@/lib/site-images'

const CoolingSolutionsArticle = () => {
  const article = {
    id: 8,
    title: 'Cooling Solutions: Energy-Efficient AC and Insulation for Arizona Homes',
    excerpt: 'Beat the Arizona heat with smart cooling strategies, proper insulation, and energy-efficient upgrades that reduce utility costs.',
    image: SITE_IMAGES.blog.cooling_solutions,
    author: 'James Wilson',
    date: 'July 15, 2024',
    readTime: '8 min read',
    category: 'Arizona Living',
    tags: ['Cooling', 'Energy', 'Arizona', 'HVAC']
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
            Arizona's extreme summer temperatures can push your cooling costs through the roof. With temperatures regularly exceeding 115°F, Phoenix residents spend more on cooling than almost anywhere else in the country. But with the right strategies, you can keep your home cool while significantly reducing your energy bills.
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Arizona's Cooling Challenge</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Arizona's desert climate presents unique challenges for home cooling. The combination of extreme heat, low humidity, and intense solar radiation means your air conditioning system works harder and longer than in most other climates. The average Arizona home uses 60% more energy for cooling than the national average.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Upgrade Your Insulation: The Foundation of Efficiency</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Attic Insulation</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Your attic can reach temperatures of 160°F or higher in Arizona summers. Proper insulation is crucial:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li><strong>R-Value:</strong> Arizona homes should have R-38 to R-60 insulation in attics</li>
            <li><strong>Radiant Barriers:</strong> Reflective barriers can reduce attic temperatures by 30°</li>
            <li><strong>Air Sealing:</strong> Close gaps around pipes, ducts, and electrical penetrations</li>
            <li><strong>Ventilation:</strong> Proper attic ventilation prevents heat buildup</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Wall Insulation</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Many Arizona homes, especially older ones, lack adequate wall insulation. Blown-in cellulose or foam insulation can reduce cooling costs by 15-25%. Focus on west and south-facing walls that receive the most solar heat gain.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. AC System Optimization</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Right-Sizing Your System</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Many Arizona homes have oversized AC units, which cycle on and off frequently, reducing efficiency and comfort. A properly sized system should:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Run longer cycles to maintain consistent temperatures</li>
            <li>Better dehumidify the air (important during monsoon season)</li>
            <li>Consume less energy overall</li>
            <li>Last longer with less wear and tear</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">High-Efficiency Equipment</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            When replacing your AC system, look for high SEER (Seasonal Energy Efficiency Ratio) ratings. In Arizona's climate, a SEER 16+ system can save hundreds of dollars annually compared to older 10-12 SEER units. Variable-speed systems are particularly effective in extreme climates.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Smart Thermostats and Zoning</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Smart thermostats can reduce cooling costs by 10-15% through:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li><strong>Learning algorithms:</strong> Adapt to your schedule and preferences</li>
            <li><strong>Geofencing:</strong> Adjust temperatures when you're away</li>
            <li><strong>Utility integration:</strong> Participate in demand response programs</li>
            <li><strong>Zoning systems:</strong> Cool only occupied areas</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Window and Solar Heat Gain Control</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Window Treatments</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Windows can account for 25-30% of cooling costs. Effective strategies include:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li><strong>Low-E window film:</strong> Blocks up to 99% of UV rays</li>
            <li><strong>Cellular shades:</strong> Provide insulation and light control</li>
            <li><strong>External awnings or shutters:</strong> Block heat before it enters</li>
            <li><strong>Strategic landscaping:</strong> Shade windows with trees or structures</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Duct System Efficiency</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Leaky ducts can waste 20-30% of your cooling energy. In Arizona's hot attics, this is particularly costly. Professional duct sealing and insulation can provide immediate savings. Consider relocating ducts to conditioned spaces during major renovations.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Maintenance and Monitoring</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Regular maintenance is crucial in Arizona's dusty environment:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Change filters monthly during peak season</li>
            <li>Clean outdoor coils regularly</li>
            <li>Check refrigerant levels annually</li>
            <li>Inspect and clean ductwork</li>
            <li>Monitor energy usage for early problem detection</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">ROI and Incentives</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Arizona residents have access to various incentives for energy-efficient upgrades:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li><strong>APS and SRP rebates:</strong> Up to $1,500 for high-efficiency AC systems</li>
            <li><strong>Federal tax credits:</strong> 30% for certain energy improvements</li>
            <li><strong>Utility demand response programs:</strong> Earn credits for smart thermostat participation</li>
            <li><strong>Solar integration:</strong> Power your AC with clean energy</li>
          </ul>

          <div className="bg-accent-50 border-l-4 border-accent-600 p-6 my-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Tip</h3>
            <p className="text-gray-700 leading-relaxed">
              "The biggest mistake I see Arizona homeowners make is focusing only on AC efficiency while ignoring the building envelope. A comprehensive approach that includes insulation, air sealing, and solar control can reduce cooling costs by 40-50% while improving comfort." - James Wilson, Certified Energy Auditor
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Start with a professional energy audit to identify your home's biggest opportunities. Many utilities offer subsidized audits that can guide your investment priorities. Focus on the measures with the highest return on investment first, typically insulation and air sealing, followed by equipment upgrades.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            With Arizona's extreme climate, every improvement makes a significant difference. The combination of proper insulation, efficient equipment, and smart controls can transform your home into a cool, comfortable haven while dramatically reducing your energy bills.
          </p>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </motion.div>

        {/* Share and Back */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-between border-t border-gray-200 pt-8 pb-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <button className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <Share2 className="w-4 h-4 mr-2" />
            Share Article
          </button>
        </motion.div>
      </article>
    </div>
  )
}

export default CoolingSolutionsArticle
