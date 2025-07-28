import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const imageId = params.id

    if (!imageId) {
      return NextResponse.json(
        { success: false, error: 'Image ID is required' },
        { status: 400 }
      )
    }

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(imageId)

    if (result.result === 'ok') {
      return NextResponse.json({
        success: true,
        message: 'Image deleted successfully from Cloudinary'
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to delete image from Cloudinary' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}
