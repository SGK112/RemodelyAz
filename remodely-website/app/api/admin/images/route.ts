import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'
import { getImageData, saveImageData, addImage, updateImage, deleteImage, type ImageData } from '@/lib/data-store'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export interface UnifiedImageData {
  id: string
  name: string
  url: string
  category: 'kitchen' | 'bathroom' | 'commercial' | 'tile' | 'countertops' | 'cabinets' | 'blog' | 'hero' | 'general'
  description: string
  alt: string
  tags: string[]
  size: number
  width?: number
  height?: number
  format?: string
  uploadDate: string
  isActive: boolean
  source: 'cloudinary' | 'local' | 'external'
  cloudinary?: {
    public_id: string
    secure_url: string
    width: number
    height: number
    format: string
    created_at: string
    tags: string[]
  }
  thumbnailUrl?: string
  mediumUrl?: string
  largeUrl?: string
}

// GET: Fetch all images or filter by category
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const source = searchParams.get('source')
    const includeInactive = searchParams.get('includeInactive') === 'true'

    // Load images from data store
    const localImages = getImageData()

    // Transform to unified format
    let unifiedImages: UnifiedImageData[] = localImages.map((img: any) => ({
      id: img.id || img.name || Math.random().toString(36),
      name: img.name || img.alt || 'Untitled',
      url: img.url || img.src,
      category: img.category || 'general',
      description: img.description || img.alt || '',
      alt: img.alt || img.description || img.name || 'Image',
      tags: img.tags || [],
      size: img.size || 0,
      width: img.width || 800,
      height: img.height || 600,
      format: img.format || 'jpg',
      uploadDate: img.uploadedAt || img.uploadDate || new Date().toISOString(),
      isActive: img.isActive !== false,
      source: img.source || 'local',
      cloudinary: img.cloudinary,
      thumbnailUrl: img.cloudinary ?
        cloudinary.url(img.cloudinary.public_id, { width: 300, height: 300, crop: 'fill', quality: 'auto' }) :
        img.url,
      mediumUrl: img.cloudinary ?
        cloudinary.url(img.cloudinary.public_id, { width: 600, height: 400, crop: 'fill', quality: 'auto' }) :
        img.url,
      largeUrl: img.cloudinary ?
        cloudinary.url(img.cloudinary.public_id, { width: 1200, height: 800, crop: 'scale', quality: 'auto' }) :
        img.url
    }))

    // Apply filters
    if (category && category !== 'all') {
      unifiedImages = unifiedImages.filter(img => img.category === category)
    }

    if (source) {
      unifiedImages = unifiedImages.filter(img => img.source === source)
    }

    if (!includeInactive) {
      unifiedImages = unifiedImages.filter(img => img.isActive)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      unifiedImages = unifiedImages.filter(img =>
        img.name.toLowerCase().includes(searchLower) ||
        img.description.toLowerCase().includes(searchLower) ||
        img.category.toLowerCase().includes(searchLower) ||
        img.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    // Sort by upload date (newest first)
    unifiedImages.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())

    return NextResponse.json({
      images: unifiedImages,
      total: unifiedImages.length,
      categories: getImageCategoryCounts(unifiedImages)
    })

  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
}

// POST: Upload new image
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string || 'general'
    const description = formData.get('description') as string || ''
    const tags = JSON.parse(formData.get('tags') as string || '[]')
    const name = formData.get('name') as string || file?.name || 'Untitled'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary
    const cloudinaryResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `remodely/${category}`,
          tags: ['remodely', category, ...tags],
          resource_type: 'auto',
          quality: 'auto',
          format: 'auto'
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    }) as any

    // Create unified image object
    const unifiedImage: UnifiedImageData = {
      id: cloudinaryResult.public_id,
      name,
      url: cloudinaryResult.secure_url,
      category: category as any,
      description,
      alt: description || name,
      tags: cloudinaryResult.tags || [],
      size: cloudinaryResult.bytes,
      width: cloudinaryResult.width,
      height: cloudinaryResult.height,
      format: cloudinaryResult.format,
      uploadDate: new Date().toISOString(),
      isActive: true,
      source: 'cloudinary',
      cloudinary: {
        public_id: cloudinaryResult.public_id,
        secure_url: cloudinaryResult.secure_url,
        width: cloudinaryResult.width,
        height: cloudinaryResult.height,
        format: cloudinaryResult.format,
        created_at: cloudinaryResult.created_at,
        tags: cloudinaryResult.tags || []
      },
      thumbnailUrl: cloudinary.url(cloudinaryResult.public_id, { width: 300, height: 300, crop: 'fill', quality: 'auto' }),
      mediumUrl: cloudinary.url(cloudinaryResult.public_id, { width: 600, height: 400, crop: 'fill', quality: 'auto' }),
      largeUrl: cloudinary.url(cloudinaryResult.public_id, { width: 1200, height: 800, crop: 'scale', quality: 'auto' })
    }

    // Save to local data store
    const savedImage = addImage({
      url: unifiedImage.url,
      alt: unifiedImage.alt,
      description: unifiedImage.description,
      category: unifiedImage.category,
      filename: unifiedImage.name
    })

    return NextResponse.json(unifiedImage)

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}

// PUT: Update image metadata
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Image ID required' },
        { status: 400 }
      )
    }

    const updates = await request.json()

    // Update in local data store
    const updatedImage = updateImage(id, updates)

    if (!updatedImage) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedImage)

  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json(
      { error: 'Failed to update image' },
      { status: 500 }
    )
  }
}

// DELETE: Delete image
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Image ID required' },
        { status: 400 }
      )
    }

    // Get image data to check if it's from Cloudinary
    const images = getImageData()
    const image = images.find(img => img.id === id)

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    // Delete from Cloudinary if it's a Cloudinary image
    if (image.source === 'cloudinary' && image.cloudinary?.public_id) {
      try {
        await cloudinary.uploader.destroy(image.cloudinary.public_id)
      } catch (cloudinaryError) {
        console.warn('Failed to delete from Cloudinary:', cloudinaryError)
      }
    }

    // Delete from local data store
    const deleted = deleteImage(id)

    if (!deleted) {
      return NextResponse.json(
        { error: 'Failed to delete image' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}

// Helper function to get category counts
function getImageCategoryCounts(images: UnifiedImageData[]) {
  const counts = images.reduce((acc, img) => {
    acc[img.category] = (acc[img.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return [
    { id: 'all', name: 'All Images', count: images.length },
    { id: 'kitchen', name: 'Kitchens', count: counts.kitchen || 0 },
    { id: 'bathroom', name: 'Bathrooms', count: counts.bathroom || 0 },
    { id: 'commercial', name: 'Commercial', count: counts.commercial || 0 },
    { id: 'tile', name: 'Tile Work', count: counts.tile || 0 },
    { id: 'countertops', name: 'Countertops', count: counts.countertops || 0 },
    { id: 'cabinets', name: 'Cabinets', count: counts.cabinets || 0 },
    { id: 'blog', name: 'Blog Images', count: counts.blog || 0 },
    { id: 'hero', name: 'Hero Images', count: counts.hero || 0 },
    { id: 'general', name: 'General', count: counts.general || 0 }
  ]
}
