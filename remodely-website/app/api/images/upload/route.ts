/**
 * Server-side Cloudinary Image Upload API
 * Handles image uploads to Cloudinary with proper error handling
 */

import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'drrwdgggx',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string
    const tags = JSON.parse(formData.get('tags') as string || '[]')

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
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `remodely/${category}`,
          tags: ['remodely', category, ...tags],
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    }) as any

    // Create unified image object
    const unifiedImage = {
      id: result.public_id,
      name: file.name,
      url: result.secure_url,
      category,
      description: '',
      tags: result.tags || [],
      size: result.bytes,
      width: result.width,
      height: result.height,
      format: result.format,
      uploadDate: new Date().toISOString(),
      isActive: true,
      source: 'cloudinary',
      cloudinary: {
        public_id: result.public_id,
        secure_url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        created_at: result.created_at,
        tags: result.tags || []
      }
    }

    // TODO: Save to database/JSON file for persistence

    return NextResponse.json(unifiedImage)

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
