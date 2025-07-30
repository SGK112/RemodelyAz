import { NextResponse } from 'next/server'
import blogsData from '@/data/blogs.json'

export async function GET() {
  try {
    return NextResponse.json(blogsData)
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const blogData = await request.json()
    // In a real app, you would save to database here
    return NextResponse.json({ success: true, blog: blogData })
  } catch (error) {
    console.error('Error creating blog:', error)
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
