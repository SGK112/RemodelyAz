import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string || 'Kitchen'

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert File to base64 for Cloudinary upload
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64, {
      folder: `remodely/${category.toLowerCase()}`,
      tags: [category.toLowerCase(), 'gallery'],
      transformation: [
        { quality: 'auto:best' },
        { fetch_format: 'auto' }
      ],
      resource_type: 'image'
    })

    const uploadedImage = {
      id: result.public_id,
      name: file.name,
      url: result.secure_url,
      category,
      tags: [category.toLowerCase(), 'gallery'],
      size: result.bytes,
      width: result.width,
      height: result.height,
      format: result.format,
      uploadDate: new Date().toISOString(),
      cloudinaryId: result.public_id,
      isOptimized: true,
    }

    return NextResponse.json({
      success: true,
      image: uploadedImage,
      message: 'Image uploaded successfully to Cloudinary'
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
