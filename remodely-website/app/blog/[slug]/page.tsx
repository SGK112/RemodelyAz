'use client'

import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  tags: string[]
  author: string
  publishedAt: string
  featured?: boolean
  readingTime: number
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/admin/blogs/${slug}`)
        if (!response.ok) {
          notFound()
          return
        }
        
        const foundPost = await response.json()
        setPost(foundPost)
      } catch (error) {
        console.error('Error fetching post:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-64 bg-gray-300 rounded mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return null // notFound() will handle this
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {post.readingTime} min read
            </div>
            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div 
            dangerouslySetInnerHTML={{ 
              __html: post.content.replace(/\n/g, '<br />').replace(/## (.*)/g, '<h2>$1</h2>').replace(/### (.*)/g, '<h3>$1</h3>') 
            }} 
          />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center flex-wrap gap-2">
              <Tag className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500 font-medium mr-2">Tags:</span>
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-primary-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Home?
          </h3>
          <p className="text-gray-600 mb-6">
            Contact REMODELY LLC today for a free consultation and see how we can bring your vision to life.
          </p>
          <Link
            href="/contact"
            className="bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors inline-flex items-center"
          >
            Get Started Today
            <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
          </Link>
        </div>
      </article>
    </div>
  )
}
