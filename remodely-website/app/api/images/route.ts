import { NextRequest, NextResponse } from 'next/server'
import { imageManager } from '@/lib/image-manager'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const component = searchParams.get('component')
    const count = searchParams.get('count')
    const search = searchParams.get('search')

    let images
    
    if (search) {
      images = imageManager.searchImages(search)
    } else if (component) {
      images = imageManager.getComponentImages(
        component as 'hero' | 'services' | 'gallery' | 'testimonials',
        count ? parseInt(count) : undefined
      )
    } else if (category) {
      if (category === 'random') {
        const allImages = imageManager.getAllImages()
        images = allImages.sort(() => Math.random() - 0.5).slice(0, count ? parseInt(count) : 10)
      } else {
        images = imageManager.getImagesByCategory(category)
      }
    } else {
      images = imageManager.getAllImages()
    }

    // Limit results if count is specified
    if (count && !search) {
      images = images.slice(0, parseInt(count))
    }

    return NextResponse.json({
      success: true,
      data: images,
      stats: imageManager.getStats()
    })

  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch images',
        data: []
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // This could handle image uploads to Cloudinary in the future
    return NextResponse.json(
      { error: 'Image upload not implemented yet' },
      { status: 501 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}
