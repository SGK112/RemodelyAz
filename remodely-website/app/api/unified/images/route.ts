/**
 * Unified Image Management API
 * Handles all image operations through single endpoint
 */

import { NextRequest, NextResponse } from 'next/server'
import { imageManager } from '@/lib/unified-image-manager'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const category = searchParams.get('category')
    const query = searchParams.get('query')
    const imageId = searchParams.get('imageId')

    switch (action) {
      case 'list':
        const images = category
          ? imageManager.getImagesByCategory(category)
          : imageManager.getAllImages()
        return NextResponse.json({ success: true, images })

      case 'search':
        if (!query) {
          return NextResponse.json(
            { success: false, error: 'Search query required' },
            { status: 400 }
          )
        }
        const searchResults = imageManager.searchImages(query)
        return NextResponse.json({ success: true, images: searchResults })

      case 'get':
        if (!imageId) {
          return NextResponse.json(
            { success: false, error: 'Image ID required' },
            { status: 400 }
          )
        }
        const image = imageManager.getImageById(imageId)
        if (!image) {
          return NextResponse.json(
            { success: false, error: 'Image not found' },
            { status: 404 }
          )
        }
        return NextResponse.json({ success: true, image })

      case 'stats':
        const stats = imageManager.getImageStats()
        return NextResponse.json({ success: true, stats })

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Images API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const action = formData.get('action') as string

    switch (action) {
      case 'upload':
        const files = formData.getAll('files') as File[]
        const category = formData.get('category') as string || 'general'
        const tags = (formData.get('tags') as string)?.split(',') || []

        if (!files.length) {
          return NextResponse.json(
            { success: false, error: 'No files provided' },
            { status: 400 }
          )
        }

        const uploads = await Promise.all(
          files.map(file => imageManager.uploadImage(file, category, tags))
        )

        return NextResponse.json({
          success: true,
          images: uploads,
          message: `Successfully uploaded ${uploads.length} image${uploads.length > 1 ? 's' : ''}`
        })

      case 'update':
        const imageId = formData.get('imageId') as string
        const updateData = JSON.parse(formData.get('updateData') as string)

        if (!imageId) {
          return NextResponse.json(
            { success: false, error: 'Image ID required' },
            { status: 400 }
          )
        }

        const updatedImage = await imageManager.updateImageMetadata(imageId, updateData)
        if (!updatedImage) {
          return NextResponse.json(
            { success: false, error: 'Image not found' },
            { status: 404 }
          )
        }

        return NextResponse.json({
          success: true,
          image: updatedImage,
          message: 'Image updated successfully'
        })

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Images API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const imageId = searchParams.get('imageId')

    if (!imageId) {
      return NextResponse.json(
        { success: false, error: 'Image ID required' },
        { status: 400 }
      )
    }

    const success = await imageManager.deleteImage(imageId)
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete image' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    })
  } catch (error) {
    console.error('Images API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
