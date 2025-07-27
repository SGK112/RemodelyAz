import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import CloudinaryService from '@/lib/cloudinary'

const DATA_DIR = path.join(process.cwd(), 'data')
const IMAGES_FILE = path.join(DATA_DIR, 'images.json')
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')

// Middleware to check admin authentication
function checkAuth(request: NextRequest) {
    const sessionCookie = request.cookies.get('admin-session')
    return sessionCookie?.value === 'authenticated'
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    if (!checkAuth(request)) {
        return NextResponse.json(
            { success: false, message: 'Authentication required' },
            { status: 401 }
        )
    }

    const imageId = decodeURIComponent(params.id)
    console.log('Deleting image with ID:', imageId)

    // Read existing images
    const data = fs.readFileSync(IMAGES_FILE, 'utf8')
    const images = JSON.parse(data)

    console.log('Available images:', images.map((img: any) => img.id))

    // Find the image to delete
    const imageIndex = images.findIndex((img: any) => img.id === imageId)
    console.log('Image index found:', imageIndex)
    
    if (imageIndex === -1) {
      console.log('Image not found with ID:', imageId)
      return NextResponse.json(
        { success: false, message: `Image not found with ID: ${imageId}` },
        { status: 404 }
      )
    }

    const targetImage = images[imageIndex]

    // If it's a Cloudinary image, delete from Cloudinary
    if (targetImage.source === 'cloudinary' && targetImage.cloudinary?.public_id) {
      try {
        await CloudinaryService.deleteImage(targetImage.cloudinary.public_id)
      } catch (cloudinaryError) {
        console.warn('Failed to delete from Cloudinary:', cloudinaryError)
        // Continue with local deletion even if Cloudinary fails
      }
    }

    // Delete the physical file if it exists in uploads directory
    if (targetImage.url && targetImage.url.startsWith('/uploads/')) {
      const filename = targetImage.url.replace('/uploads/', '')
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
