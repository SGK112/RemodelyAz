/**
 * Individual Image Operations API
 * Handles update and delete operations for specific images
 */

import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { getImageData, saveImageData, updateImage, deleteImage } from '@/lib/data-store'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'drrwdgggx',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json()
    const imageId = params.id

    // Update image metadata in data store
    const updatedImage = updateImage(imageId, updates)

    if (!updatedImage) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedImage)

  } catch (error) {
    console.error('Error updating image:', error)
    return NextResponse.json(
      { error: 'Failed to update image' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const imageId = params.id
    
    // First, get the image to check if it's from Cloudinary
    const images = getImageData()
    const image = images.find(img => img.id === imageId)

    if (image && image.category && image.filename) {
      // If it's a Cloudinary image, delete from Cloudinary too
      try {
        await cloudinary.uploader.destroy(imageId)
      } catch (cloudinaryError) {
        console.warn('Failed to delete from Cloudinary:', cloudinaryError)
        // Continue with local deletion even if Cloudinary fails
      }
    }

    // Delete from data store
    const deleted = deleteImage(imageId)

    if (!deleted) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}
