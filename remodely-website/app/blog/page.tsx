'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, User, Clock, Tag } from 'lucide-react'
import { PRODUCTION_IMAGES } from '@/lib/production-images'
import blogsData from '@/data/blogs.json'

const BlogPage = () => {
  // Get featured blog (first one)
  const featuredBlog = blogsData[0]
  const otherBlogs = blogsData.slice(1)

  const categories = ['All', 'Kitchen', 'Bathroom', 'Design Tips', 'Trends', 'Maintenance']

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={PRODUCTION_IMAGES.design_consultation}
            alt="Blog and Design Insights"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/70 to-navy-900/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="bg-accent-600 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide">
                Expert Insights
              </span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Remodeling Insights
              <span className="block text-accent-400 mt-2">& Design Tips</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
            >
              Expert tips, trends, and inspiration for your home remodeling journey in Arizona
            </motion.p>
            
            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center items-center space-x-4 mt-8"
            >
              <div className="w-12 h-0.5 bg-accent-400"></div>
              <div className="w-3 h-3 bg-accent-400 rounded-full"></div>
              <div className="w-12 h-0.5 bg-accent-400"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredBlog && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                Featured Article
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-full">
                  <Image
                    src={featuredBlog.image}
                    alt={featuredBlog.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {featuredBlog.category}
                    </span>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {featuredBlog.publishedAt}
                    </div>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-display font-bold text-gray-900 mb-4">
                    {featuredBlog.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {featuredBlog.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-700 font-medium">{featuredBlog.author}</span>
                    </div>
                    <Link
                      href={`/blog/${featuredBlog.slug}`}
                      className="inline-flex items-center text-accent-600 hover:text-accent-700 font-semibold transition-colors"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  index === 0
                    ? 'bg-accent-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherBlogs.map((blog, index) => (
              <motion.article
                key={blog.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {blog.publishedAt}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {blog.readingTime} min read
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-3 group-hover:text-accent-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-700 text-sm">{blog.author}</span>
                    </div>
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="text-accent-600 hover:text-accent-700 font-semibold text-sm transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Stay Updated with Remodeling Tips
            </h2>
            <p className="text-xl text-accent-100 mb-8">
              Get the latest trends, tips, and inspiration delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-accent-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-all duration-300">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default BlogPage
