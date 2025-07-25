import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const BLOGS_FILE = path.join(DATA_DIR, 'blogs.json')

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blogId = parseInt(params.id)
    
    // Read existing blogs
    const data = fs.readFileSync(BLOGS_FILE, 'utf8')
    const blogs = JSON.parse(data)
    
    // Filter out the blog to delete
    const updatedBlogs = blogs.filter((blog: any) => blog.id !== blogId)
    
    if (updatedBlogs.length === blogs.length) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }
    
    // Write back to file
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(updatedBlogs, null, 2))
    
    return NextResponse.json({ 
      success: true, 
      message: 'Blog post deleted successfully' 
    })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
