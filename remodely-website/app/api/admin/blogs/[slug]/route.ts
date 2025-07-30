import { NextResponse } from 'next/server'
import blogsData from '@/data/blogs.json'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 })
    }
    
    const blog = blogsData.find(blog => blog.slug === slug)
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }
    
    return NextResponse.json(blog)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
