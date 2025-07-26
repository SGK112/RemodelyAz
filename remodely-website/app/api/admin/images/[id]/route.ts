import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import CloudinaryService from '@/lib/cloudinary'

const DATA_DIR = path.join(process.cwd(), 'data')
const IMAGES_FILE = path.join(DATA_DIR, 'images.json')
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const imageId = params.id

    // Read existing images
    const data = fs.readFileSync(IMAGES_FILE, 'utf8')
    const images = JSON.parse(data)

    // Find the image to delete
    const imageToDelete = images.find((img: any) => img.id === imageId)
    if (!imageToDelete) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    // If it's a Cloudinary image, delete from Cloudinary
    if (imageToDelete.source === 'cloudinary' && imageToDelete.cloudinary?.public_id) {
      try {
        await CloudinaryService.deleteImage(imageToDelete.cloudinary.public_id)
      } catch (cloudinaryError) {
        console.warn('Failed to delete from Cloudinary:', cloudinaryError)
        // Continue with local deletion even if Cloudinary fails
      }
    }

    // Delete the physical file if it exists in uploads directory
    if (imageToDelete.url.startsWith('/uploads/')) {
      const filename = imageToDelete.url.replace('/uploads/', '')
      const filepath = path.join(UPLOADS_DIR, filename)
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath)
      }
    }

    // Filter out the image from the array
    const updatedImages = images.filter((img: any) => img.id !== imageId)

    // Write back to file
    fs.writeFileSync(IMAGES_FILE, JSON.stringify(updatedImages, null, 2))

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}
