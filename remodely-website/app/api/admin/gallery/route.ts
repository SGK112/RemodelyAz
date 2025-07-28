import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const DATA_DIR = path.join(process.cwd(), 'data')
const IMAGES_FILE = path.join(DATA_DIR, 'images.json')

export async function GET() {
  try {
    // Check if Cloudinary is properly configured
    const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME && 
                                   process.env.CLOUDINARY_API_KEY && 
                                   process.env.CLOUDINARY_API_SECRET

    if (isCloudinaryConfigured) {
      try {
        // Try Cloudinary first
        const result = await cloudinary.search
          .expression('folder:remodely OR folder:remodely/*')
          .sort_by('created_at', 'desc')
          .max_results(500)
          .execute()

        const images = result.resources.map((resource: any) => ({
          id: resource.public_id,
          name: resource.display_name || resource.public_id.split('/').pop(),
          url: resource.secure_url,
          category: extractCategoryFromPath(resource.public_id),
          tags: resource.tags || [],
          size: resource.bytes,
          width: resource.width,
          height: resource.height,
          format: resource.format,
          uploadDate: resource.created_at,
          cloudinaryId: resource.public_id,
          isOptimized: true,
          source: 'cloudinary'
        }))

        return NextResponse.json({
          success: true,
          images,
          total: images.length,
          source: 'cloudinary'
        })
      } catch (cloudinaryError) {
        console.warn('Cloudinary fetch failed, falling back to local images:', cloudinaryError)
      }
    }

    // Fallback to local images.json file
    try {
      if (fs.existsSync(IMAGES_FILE)) {
        const data = fs.readFileSync(IMAGES_FILE, 'utf8')
        const images = JSON.parse(data)
        
        return NextResponse.json({
          success: true,
          images: images || [],
          total: images?.length || 0,
          source: 'local'
        })
      }
    } catch (fileError) {
      console.warn('Local images file read failed:', fileError)
    }

    // Ultimate fallback to demo images
    const fallbackImages = [
      {
        id: 'demo-1',
        name: 'Modern Kitchen Remodel',
        url: 'https://picsum.photos/800/600?random=kitchen1',
        category: 'Kitchen',
        tags: ['modern', 'kitchen', 'remodel'],
        size: 150000,
        width: 800,
        height: 600,
        format: 'jpg',
        uploadDate: new Date().toISOString(),
        source: 'demo'
      },
      {
        id: 'demo-2',
        name: 'Luxury Bathroom',
        url: 'https://picsum.photos/800/600?random=bathroom1',
        category: 'Bathroom',
        tags: ['luxury', 'bathroom', 'spa'],
        size: 160000,
        width: 800,
        height: 600,
        format: 'jpg',
        uploadDate: new Date().toISOString(),
        source: 'demo'
      },
      {
        id: 'demo-3',
        name: 'Commercial Office Space',
        url: 'https://picsum.photos/800/600?random=commercial1',
        category: 'Commercial',
        tags: ['commercial', 'office', 'modern'],
        size: 140000,
        width: 800,
        height: 600,
        format: 'jpg',
        uploadDate: new Date().toISOString(),
        source: 'demo'
      }
    ]

    return NextResponse.json({
      success: true,
      images: fallbackImages,
      total: fallbackImages.length,
      source: 'demo'
    })

  } catch (error) {
    console.error('Gallery fetch error:', error)
    // Always return some images to prevent site breakage
    return NextResponse.json({
      success: true,
      images: [],
      total: 0,
      source: 'error-fallback',
      error: 'Gallery temporarily unavailable'
    })
  }
}

function extractCategoryFromPath(publicId: string): string {
  const path = publicId.toLowerCase()

  if (path.includes('kitchen')) return 'Kitchen'
  if (path.includes('bathroom')) return 'Bathroom'
  if (path.includes('living')) return 'Living Room'
  if (path.includes('bedroom')) return 'Bedroom'
  if (path.includes('commercial')) return 'Commercial'
  if (path.includes('outdoor')) return 'Outdoor'

  return 'Kitchen' // Default category
}
