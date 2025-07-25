'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, AlertTriangle } from 'lucide-react'

const MonsoonProofArticle = () => {
  const article = {
    id: 11,
    title: 'Monsoon-Proof Your Home: Weatherproofing Tips for Arizona Residents',
    excerpt: 'Prepare your Arizona home for monsoon season with essential weatherproofing, drainage solutions, and storm-resistant upgrades.',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    author: 'Sarah Chen',
    date: 'June 30, 2024',
    readTime: '7 min read',
    category: 'Arizona Living',
    tags: ['Monsoon', 'Weather', 'Arizona', 'Protection']
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
            Arizona's monsoon season brings dramatic weather changes that can catch homeowners off guard. From June through September, the desert transforms from dry heat to intense storms with torrential rain, powerful winds, and devastating flash floods. Preparing your home now can prevent thousands of dollars in damage later.
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Monsoon Season Facts</h3>
                <p className="text-red-700 text-sm leading-relaxed">
                  Phoenix receives about 50% of its annual rainfall during monsoon season. A single storm can dump several inches of rain in just hours, overwhelming drainage systems and causing flash floods even in typically dry washes.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Roof and Gutter Preparation</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Roof Inspection and Maintenance</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Arizona's intense UV exposure and temperature extremes can damage roofing materials. Before monsoon season:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li><strong>Inspect shingles or tiles:</strong> Look for cracked, loose, or missing pieces</li>
            <li><strong>Check flashing:</strong> Ensure seals around chimneys, vents, and skylights are intact</li>
            <li><strong>Clear debris:</strong> Remove leaves, branches, and other materials from roof surfaces</li>
            <li><strong>Inspect attic:</strong> Look for signs of previous leaks or damaged insulation</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Gutter System Overhaul</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Arizona gutters face unique challenges from both drought and deluge:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li><strong>Clean thoroughly:</strong> Remove accumulated dust, debris, and plant matter</li>
            <li><strong>Check for damage:</strong> Desert heat can warp or crack gutters</li>
            <li><strong>Ensure proper slope:</strong> Water should flow toward downspouts</li>
            <li><strong>Install gutter guards:</strong> Prevent future debris accumulation</li>
            <li><strong>Extend downspouts:</strong> Direct water at least 6 feet from foundation</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Foundation and Drainage Protection</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Proper Grading</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Many Arizona homes have settling issues that create improper drainage slopes:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li><strong>Check grade around foundation:</strong> Soil should slope away from house</li>
            <li><strong>Fill low spots:</strong> Prevent water pooling against foundation walls</li>
            <li><strong>Install French drains:</strong> For persistent water issues</li>
            <li><strong>Waterproof basement walls:</strong> If applicable in your area</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Seal Cracks and Gaps</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Arizona's ground movement and temperature extremes create foundation cracks. Seal any gaps with appropriate materials before the rains arrive. Pay special attention to areas where utilities enter the home.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Window and Door Weatherproofing</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Window Maintenance</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Arizona's temperature swings can compromise window seals:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li><strong>Inspect caulking:</strong> Re-seal around window frames as needed</li>
            <li><strong>Check weatherstripping:</strong> Replace cracked or compressed seals</li>
            <li><strong>Test window operation:</strong> Ensure windows close properly</li>
            <li><strong>Install storm shutters:</strong> For additional protection in severe weather</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Door Sealing</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Focus on exterior doors, garage doors, and any basement or cellar entrances. Install or replace door sweeps and threshold seals. Consider adding storm doors for extra protection.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Landscaping for Storm Protection</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Tree and Plant Management</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Arizona's desert landscaping requires special monsoon preparation:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li><strong>Trim overhanging branches:</strong> Remove anything that could fall on your roof</li>
            <li><strong>Stake young trees:</strong> Provide support against strong winds</li>
            <li><strong>Secure loose decorative elements:</strong> Rocks, pottery, and garden art</li>
            <li><strong>Check irrigation systems:</strong> Ensure proper drainage during heavy rains</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Hardscape Considerations</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Permeable hardscaping helps manage water runoff. Consider replacing solid concrete with permeable pavers or adding strategic drainage channels to direct water flow away from structures.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Electrical and HVAC Protection</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Electrical Safety</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Monsoon storms can cause power surges and outages:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li><strong>Install whole-house surge protection:</strong> Protect all electrical systems</li>
            <li><strong>Check outdoor outlets:</strong> Ensure GFCI protection is working</li>
            <li><strong>Secure outdoor electrical boxes:</strong> Prevent water intrusion</li>
            <li><strong>Have backup power ready:</strong> Generator or battery systems</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">HVAC System Preparation</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Dust storms often precede monsoon rains, clogging air filters and outdoor units. Change filters before the season and consider covering outdoor units during severe weather (remember to remove covers when running the system).
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Emergency Preparedness</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Emergency Kit</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Arizona monsoons can cause extended power outages:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li><strong>Water storage:</strong> One gallon per person per day for 3 days minimum</li>
            <li><strong>Non-perishable food:</strong> 3-day supply for all family members</li>
            <li><strong>Flashlights and batteries:</strong> Multiple sources of light</li>
            <li><strong>Battery-powered radio:</strong> For weather updates</li>
            <li><strong>First aid kit:</strong> Including prescription medications</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Important Documents</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Keep copies of insurance policies, identification, and important documents in a waterproof container. Take photos or video of your home's interior and exterior before storm season for insurance purposes.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Insurance Considerations</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Review your homeowner's insurance policy before monsoon season. Standard policies may not cover flood damage - you might need separate flood insurance. Document any pre-existing damage and understand your policy's claim process.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Monsoon Safety Tips</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Never drive through flooded washes - turn around, don't drown</li>
              <li>Stay indoors during dust storms (haboobs)</li>
              <li>Avoid using electrical appliances during storms</li>
              <li>Have a plan for pets and family members</li>
              <li>Monitor weather alerts and warnings</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Timeline for Preparation</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Early June (Before Season Starts)</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Complete all roof and gutter maintenance</li>
            <li>Seal cracks and gaps in foundation and walls</li>
            <li>Trim trees and secure outdoor items</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Mid-June (Season Preparation)</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Stock emergency supplies</li>
            <li>Test backup power systems</li>
            <li>Review insurance policies</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Throughout Season</h3>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Monitor weather forecasts daily</li>
            <li>Keep emergency kit readily accessible</li>
            <li>Inspect property after each storm</li>
          </ul>

          <div className="bg-accent-50 border-l-4 border-accent-600 p-6 my-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Insight</h3>
            <p className="text-gray-700 leading-relaxed">
              "The biggest mistake Arizona homeowners make is underestimating monsoon damage potential. A single storm can cause more water damage than years of regular weather. Proactive preparation isn't just smart - it's essential." - Sarah Chen, Home Inspector & Storm Damage Specialist
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Call Professionals</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Some monsoon preparation tasks require professional expertise:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Roof repairs and major gutter work</li>
            <li>Electrical system upgrades and surge protection</li>
            <li>Foundation crack repair and waterproofing</li>
            <li>HVAC system maintenance and protection</li>
            <li>Major drainage and grading issues</li>
          </ul>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Arizona's monsoon season is a powerful reminder of nature's force. But with proper preparation, you can protect your home and family while potentially saving thousands in storm damage. Start your preparations early - once the storms arrive, it's too late for many preventive measures.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Remember, monsoon preparation is an investment in your home's longevity and your family's safety. The time and money spent on preventive measures far outweigh the cost of emergency repairs and the stress of storm damage.
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

export default MonsoonProofArticle
