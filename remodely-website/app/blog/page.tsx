'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, User, Tag, ChevronDown, ChevronUp, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const BlogPage = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Handle responsive behavior - sidebar stays static
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsCategoriesOpen(true)
        setIsSidebarOpen(false)
      }
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const featuredPost = {
    id: 1,
    title: '2024 Kitchen Design Trends: What\'s Hot This Year',
    excerpt: 'Discover the latest kitchen design trends that are transforming homes across the country. From smart appliances to sustainable materials, here\'s what homeowners are choosing.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    author: 'Sarah Chen',
    date: 'March 15, 2024',
    readTime: '8 min read',
    category: 'Design Trends',
    tags: ['Kitchen', 'Trends', 'Design', '2024']
  }

  const blogPosts = [
    {
      id: 2,
      title: 'Maximizing Small Bathroom Spaces: Expert Tips',
      excerpt: 'Learn how to make the most of your compact bathroom with clever storage solutions and space-saving design strategies.',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Michael Rodriguez',
      date: 'March 10, 2024',
      readTime: '6 min read',
      category: 'Bathroom',
      tags: ['Bathroom', 'Small Spaces', 'Storage']
    },
    {
      id: 3,
      title: 'The ROI of Kitchen Remodeling: What to Expect',
      excerpt: 'Understanding the financial benefits of kitchen renovation and how to maximize your return on investment.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'David Thompson',
      date: 'March 5, 2024',
      readTime: '7 min read',
      category: 'Investment',
      tags: ['ROI', 'Kitchen', 'Investment', 'Value']
    },
    {
      id: 4,
      title: 'Sustainable Materials for Eco-Friendly Remodeling',
      excerpt: 'Explore environmentally conscious material choices that don\'t compromise on style or durability.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Sarah Chen',
      date: 'February 28, 2024',
      readTime: '5 min read',
      category: 'Sustainability',
      tags: ['Eco-Friendly', 'Materials', 'Sustainability']
    },
    {
      id: 5,
      title: 'Planning Your Remodel: A Complete Timeline Guide',
      excerpt: 'Step-by-step breakdown of the remodeling process from initial consultation to project completion.',
      image: 'https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'David Thompson',
      date: 'February 22, 2024',
      readTime: '9 min read',
      category: 'Planning',
      tags: ['Planning', 'Timeline', 'Process']
    },
    {
      id: 6,
      title: 'Smart Home Integration in Modern Remodels',
      excerpt: 'How to incorporate cutting-edge technology into your kitchen and bathroom renovation projects.',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Michael Rodriguez',
      date: 'February 15, 2024',
      readTime: '6 min read',
      category: 'Technology',
      tags: ['Smart Home', 'Technology', 'Modern']
    },
    // Arizona-specific blog posts
    {
      id: 7,
      title: 'Desert Landscaping: Creating Beautiful Arizona Outdoor Spaces',
      excerpt: 'Transform your Arizona backyard with drought-resistant plants and stunning desert design elements that thrive in the Southwest climate.',
      image: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Maria Gonzalez',
      date: 'July 20, 2024',
      readTime: '7 min read',
      category: 'Arizona Living',
      tags: ['Desert', 'Landscaping', 'Arizona', 'Outdoor']
    },
    {
      id: 8,
      title: 'Cooling Solutions: Energy-Efficient AC and Insulation for Arizona Homes',
      excerpt: 'Beat the Arizona heat with smart cooling strategies, proper insulation, and energy-efficient upgrades that reduce utility costs.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'James Wilson',
      date: 'July 15, 2024',
      readTime: '8 min read',
      category: 'Arizona Living',
      tags: ['Cooling', 'Energy', 'Arizona', 'HVAC']
    },
    {
      id: 9,
      title: 'Southwest Style: Incorporating Adobe and Southwestern Design Elements',
      excerpt: 'Embrace Arizona\'s rich cultural heritage with authentic Southwestern design elements including adobe, terra cotta, and native materials.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Isabella Martinez',
      date: 'July 10, 2024',
      readTime: '6 min read',
      category: 'Arizona Living',
      tags: ['Southwest', 'Adobe', 'Design', 'Culture']
    },
    {
      id: 10,
      title: 'Pool Deck Renovations: Perfect for Arizona\'s Year-Round Sunshine',
      excerpt: 'Design the perfect pool area for Arizona living with heat-resistant materials, shade structures, and resort-style amenities.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Robert Kim',
      date: 'July 5, 2024',
      readTime: '9 min read',
      category: 'Arizona Living',
      tags: ['Pool', 'Deck', 'Arizona', 'Outdoor']
    },
    {
      id: 11,
      title: 'Monsoon-Proof Your Home: Weatherproofing Tips for Arizona Residents',
      excerpt: 'Prepare your Arizona home for monsoon season with essential weatherproofing, drainage solutions, and storm-resistant upgrades.',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Sarah Chen',
      date: 'June 30, 2024',
      readTime: '7 min read',
      category: 'Arizona Living',
      tags: ['Monsoon', 'Weather', 'Arizona', 'Protection']
    }
  ]

  const categories = [
    { name: 'All Posts', count: 17 },
    { name: 'Arizona Living', count: 5 },
    { name: 'Design Trends', count: 4 },
    { name: 'Bathroom', count: 3 },
    { name: 'Kitchen', count: 5 },
    { name: 'Planning', count: 2 },
    { name: 'Technology', count: 2 },
    { name: 'Investment', count: 1 },
    { name: 'Sustainability', count: 1 }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6">
              REMODELY
              <span className="block text-accent-600">
                Blog
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Expert insights, design inspiration, and practical tips for your next remodeling project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-[4/3] lg:aspect-auto">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-accent-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Featured Post
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h2>
                
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{featuredPost.author}</div>
                      <div className="text-sm text-gray-500">Lead Designer</div>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="group inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Mobile Sidebar Toggle */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex items-center justify-between w-full bg-white rounded-xl px-6 py-4 shadow-md border border-gray-200 hover:border-accent-300 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent-100 rounded-lg group-hover:bg-accent-200 transition-colors">
                    {isSidebarOpen ? (
                      <X className="w-5 h-5 text-accent-600" />
                    ) : (
                      <Menu className="w-5 h-5 text-accent-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {isSidebarOpen ? 'Close Filters' : 'Show Filters'}
                    </div>
                    <div className="text-sm text-gray-500">
                      Categories & Newsletter
                    </div>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isSidebarOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Sidebar */}
            <div className={`lg:col-span-1 ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="glass-card rounded-2xl p-6 sticky top-24 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto"
              >
                {/* Categories Section */}
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div className="w-full flex items-center justify-between p-4 bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent-600 rounded-full"></div>
                      <span className="text-lg font-semibold text-gray-900">Categories</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100">
                    <div className="p-4 space-y-2">
                      {categories.map((category, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.05
                          }}
                          className="w-full flex items-center justify-between text-left text-gray-600 hover:text-accent-600 hover:bg-accent-50 transition-all py-3 px-4 rounded-lg group"
                        >
                          <span className="font-medium group-hover:font-semibold transition-all">
                            {category.name}
                          </span>
                          <span className="bg-gray-100 group-hover:bg-accent-600 text-gray-600 group-hover:text-white text-xs px-3 py-1 rounded-full font-semibold transition-all duration-200">
                            {category.count}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Newsletter Section */}
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Tag className="w-4 h-4 mr-2 text-accent-600" />
                    Newsletter
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Get the latest remodeling tips and design inspiration delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent text-sm transition-all"
                    />
                    <button className="w-full bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent-700 hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-2">
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Blog Stats</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-accent-50 rounded-lg">
                      <div className="text-2xl font-bold text-accent-600">17</div>
                      <div className="text-xs text-gray-600">Total Posts</div>
                    </div>
                    <div className="text-center p-3 bg-primary-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600">9</div>
                      <div className="text-xs text-gray-600">Categories</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Posts Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {post.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-display font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-accent-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {post.author.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{post.author}</span>
                        </div>

                        <Link
                          href={`/blog/${post.id}`}
                          className="group inline-flex items-center text-primary-600 text-sm font-semibold hover:text-primary-700 transition-colors"
                        >
                          Read More
                          <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>

                      {/* Tags */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Load More Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center mt-12"
              >
                <button className="glass-card text-gray-700 px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  Load More Articles
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Let our experts bring your remodeling vision to life.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300"
            >
              Get Free Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default BlogPage
