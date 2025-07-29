import { NextResponse } from 'next/server'
import blogsData from '@/data/blogs.json'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const blog = blogsData.find(blog => blog.slug === params.slug)
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }
    
    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 })
  }
}
