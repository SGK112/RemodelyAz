'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, User, Tag, ChevronDown, ChevronUp, Menu, X, BookOpen, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'

const BlogPage = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All Posts')
  const [visiblePosts, setVisiblePosts] = useState(6) // Start with 6 posts
  const [isLoading, setIsLoading] = useState(false)

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
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
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
    },
    // Additional Kitchen posts
    {
      id: 12,
      title: 'Modern Kitchen Island Designs: Function Meets Style',
      excerpt: 'Discover the latest kitchen island trends that combine storage, seating, and workspace in one beautiful centerpiece.',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Sarah Chen',
      date: 'July 25, 2024',
      readTime: '8 min read',
      category: 'Kitchen',
      tags: ['Kitchen Island', 'Design', 'Storage', 'Modern']
    },
    {
      id: 13,
      title: 'Cabinet Hardware Trends: The Details That Make a Difference',
      excerpt: 'Small details create big impact. Explore the latest cabinet hardware trends that can transform your kitchen\'s look.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Michael Rodriguez',
      date: 'July 18, 2024',
      readTime: '5 min read',
      category: 'Kitchen',
      tags: ['Hardware', 'Cabinets', 'Design', 'Trends']
    },
    {
      id: 14,
      title: 'Open Concept Kitchen Design: Creating Seamless Living Spaces',
      excerpt: 'Learn how to design an open concept kitchen that flows naturally with your living areas while maintaining functionality.',
      image: 'https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'David Thompson',
      date: 'July 12, 2024',
      readTime: '9 min read',
      category: 'Kitchen',
      tags: ['Open Concept', 'Kitchen Design', 'Living Space', 'Flow']
    },
    // Additional Design Trends posts
    {
      id: 15,
      title: 'Minimalist Design: Less is More in Modern Homes',
      excerpt: 'Embrace the beauty of simplicity with minimalist design principles that create calm, functional, and elegant spaces.',
      image: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Isabella Martinez',
      date: 'July 8, 2024',
      readTime: '6 min read',
      category: 'Design Trends',
      tags: ['Minimalist', 'Modern', 'Simplicity', 'Clean Design']
    },
    {
      id: 16,
      title: 'Biophilic Design: Bringing Nature Indoors',
      excerpt: 'Connect with nature through biophilic design elements that improve wellbeing and create harmony in your living spaces.',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Maria Gonzalez',
      date: 'June 28, 2024',
      readTime: '7 min read',
      category: 'Design Trends',
      tags: ['Biophilic', 'Nature', 'Wellbeing', 'Plants']
    },
    {
      id: 17,
      title: 'Color Psychology in Home Design: Creating Mood Through Color',
      excerpt: 'Understand how different colors affect mood and energy in your home, and learn to choose the perfect palette for each space.',
      image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'James Wilson',
      date: 'June 25, 2024',
      readTime: '8 min read',
      category: 'Design Trends',
      tags: ['Color Psychology', 'Mood', 'Paint', 'Design']
    }
  ]

  const categories = [
    { name: 'All Posts', count: 17 },
    { name: 'Arizona Living', count: 5 },
    { name: 'Design Trends', count: 4 },
    { name: 'Bathroom', count: 1 },
    { name: 'Kitchen', count: 4 },
    { name: 'Planning', count: 1 },
    { name: 'Technology', count: 1 },
    { name: 'Investment', count: 1 },
    { name: 'Sustainability', count: 1 }
  ]

  // Filter blog posts based on selected category
  const filteredBlogPosts = selectedCategory === 'All Posts'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory)

  // Get visible posts based on current limit
  const visibleBlogPosts = filteredBlogPosts.slice(0, visiblePosts)
  const hasMorePosts = visiblePosts < filteredBlogPosts.length

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName)
    setVisiblePosts(6) // Reset to 6 posts when changing category
  }

  const handleLoadMore = () => {
    setIsLoading(true)
    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisiblePosts(prev => prev + 6)
      setIsLoading(false)
    }, 800)
  }

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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                className="space-y-6 lg:sticky-sidebar"
              >
                {/* Categories Section */}
                <div className="glass-card rounded-2xl p-6 bg-white/90 backdrop-blur-sm border border-white/20 shadow-xl">
                  <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-xl border border-gray-100 overflow-hidden">
                    <div className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-accent-600 to-primary-600">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-lg font-semibold text-white">Categories</span>
                      </div>
                    </div>

                    <div className="bg-white">
                      <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                        {categories.map((category, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.05
                            }}
                            onClick={() => handleCategoryClick(category.name)}
                            className={`w-full flex items-center justify-between text-left transition-all py-3 px-4 rounded-lg group ${selectedCategory === category.name
                              ? 'text-accent-600 bg-accent-50 font-semibold border border-accent-200 shadow-sm'
                              : 'text-gray-600 hover:text-accent-600 hover:bg-accent-50 font-medium hover:font-semibold hover:border hover:border-accent-200 hover:shadow-sm'
                              }`}
                          >
                            <span className="transition-all">
                              {category.name}
                            </span>
                            <span className={`text-xs px-3 py-1 rounded-full font-semibold transition-all duration-200 ${selectedCategory === category.name
                              ? 'bg-accent-600 text-white'
                              : 'bg-gray-100 group-hover:bg-accent-600 text-gray-600 group-hover:text-white'
                              }`}>
                              {category.count}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Newsletter Section */}
                <div className="glass-card rounded-2xl p-6 bg-white/90 backdrop-blur-sm border border-white/20 shadow-xl">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-accent-600 to-primary-600 rounded-lg flex items-center justify-center mr-3">
                        <Tag className="w-4 h-4 text-white" />
                      </div>
                      Newsletter
                    </h4>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      Get the latest remodeling tips and design inspiration delivered to your inbox.
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent text-sm transition-all placeholder-gray-400"
                      />
                      <button className="w-full bg-gradient-to-r from-accent-600 to-primary-600 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:from-accent-700 hover:to-primary-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2">
                        <span>Subscribe</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="glass-card rounded-2xl p-6 bg-white/90 backdrop-blur-sm border border-white/20 shadow-xl">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg flex items-center justify-center mr-3">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    Blog Stats
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl border border-accent-200">
                      <div className="text-2xl font-bold text-accent-600 mb-1">17</div>
                      <div className="text-xs text-accent-700 font-medium">Total Posts</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200">
                      <div className="text-2xl font-bold text-primary-600 mb-1">9</div>
                      <div className="text-xs text-primary-700 font-medium">Categories</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Posts Grid */}
            <div className="lg:col-span-3">
              {/* Active Filter Display */}
              {selectedCategory !== 'All Posts' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 flex items-center justify-between bg-white rounded-xl p-4 border border-gray-200"
                >
                  <div className="flex items-center space-x-3">
                    <Tag className="w-5 h-5 text-accent-600" />
                    <span className="text-gray-600">Showing posts in:</span>
                    <span className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {selectedCategory}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedCategory('All Posts')}
                    className="text-gray-400 hover:text-gray-600 text-sm"
                  >
                    Clear filter
                  </button>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {visibleBlogPosts.map((post, index) => (
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

              {/* No posts message */}
              {visibleBlogPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="bg-white rounded-xl p-8 border border-gray-200">
                    <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No posts found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      There are no posts in the "{selectedCategory}" category yet.
                    </p>
                    <button
                      onClick={() => setSelectedCategory('All Posts')}
                      className="text-accent-600 hover:text-accent-700 font-semibold"
                    >
                      View all posts
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Load More Button - only show if there are more posts */}
              {hasMorePosts && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-center mt-12"
                >
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="glass-card text-gray-700 px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3 mx-auto"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <span>Load More Articles</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-sm text-gray-500 mt-3">
                    Showing {visiblePosts} of {filteredBlogPosts.length} articles
                  </p>
                </motion.div>
              )}

              {/* All posts loaded message */}
              {!hasMorePosts && visibleBlogPosts.length > 0 && visibleBlogPosts.length === filteredBlogPosts.length && visibleBlogPosts.length > 6 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-12"
                >
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <BookOpen className="w-8 h-8 text-green-500 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">
                      🎉 You've seen all {filteredBlogPosts.length} articles in this category!
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Check back soon for more design inspiration and remodeling tips.
                    </p>
                  </div>
                </motion.div>
              )}
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
