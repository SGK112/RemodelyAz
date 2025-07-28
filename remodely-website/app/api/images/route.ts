import { NextRequest, NextResponse } from 'next/server'
import { getImageData } from '@/lib/data-store'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    // Load images from data store
    const images = getImageData()
    
    // Transform to unified format
    let unifiedImages = images.map((img: any) => ({
      id: img.id || img.name || Math.random().toString(36),
      name: img.name || img.alt || 'Untitled',
      url: img.url || img.src,
      category: img.category || 'general',
      description: img.alt || img.description || '',
      tags: img.tags || [],
      size: img.size || 0,
      width: img.width || 800,
      height: img.height || 600,
      format: img.format || 'jpg',
      uploadDate: img.uploadedAt || new Date().toISOString(),
      isActive: img.isActive !== false,
      source: img.source || 'local',
      cloudinary: img.cloudinary
    }))

    // Filter by category if specified
    if (category) {
      unifiedImages = unifiedImages.filter((img: any) => img.category === category)
    }

    return NextResponse.json(unifiedImages)

  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
}
