import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import CloudinaryService from '@/lib/cloudinary'

const DATA_DIR = path.join(process.cwd(), 'data')
const IMAGES_FILE = path.join(DATA_DIR, 'images.json')
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })
}

// Initialize images data if file doesn't exist
if (!fs.existsSync(IMAGES_FILE)) {
  const defaultImages = [
    {
      id: '1',
      name: 'Modern Kitchen Renovation',
      url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Kitchen',
      size: 245000,
      uploadDate: new Date().toISOString().split('T')[0],
      description: 'Beautiful modern kitchen with white cabinets and quartz countertops',
      uploadedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Luxury Bathroom Remodel',
      url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Bathroom',
      size: 198000,
      uploadDate: new Date().toISOString().split('T')[0],
      description: 'Spa-like bathroom with walk-in shower and dual vanities',
      uploadedAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Contemporary Living Room',
      url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Living Room',
      size: 220000,
      uploadDate: new Date().toISOString().split('T')[0],
      description: 'Open concept living room with modern furnishings',
      uploadedAt: new Date().toISOString()
    },
    {
      id: '4',
      name: 'Commercial Office Space',
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Commercial',
      size: 275000,
      uploadDate: new Date().toISOString().split('T')[0],
      description: 'Modern commercial office renovation with glass partitions',
      uploadedAt: new Date().toISOString()
    },
    {
      id: '5',
      name: 'Master Bedroom Suite',
      url: 'https://images.unsplash.com/photo-1540518614846-7eded1aba991?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Bedroom',
      size: 189000,
      uploadDate: new Date().toISOString().split('T')[0],
      description: 'Elegant master bedroom with custom built-ins',
      uploadedAt: new Date().toISOString()
    },
    {
      id: '6',
      name: 'Outdoor Living Space',
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Outdoor',
      size: 210000,
      uploadDate: new Date().toISOString().split('T')[0],
      description: 'Beautiful outdoor patio with covered seating area',
      uploadedAt: new Date().toISOString()
    }
  ]
  fs.writeFileSync(IMAGES_FILE, JSON.stringify(defaultImages, null, 2))
}

export async function GET() {
  try {
    const data = fs.readFileSync(IMAGES_FILE, 'utf8')
    const images = JSON.parse(data)

    return NextResponse.json(images)
  } catch (error) {
    console.error('Error reading images:', error)
    return NextResponse.json(
      { error: 'Failed to read images' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Get additional metadata from form
    const category = (formData.get('category') as string) || 'Gallery'
    const description = (formData.get('description') as string) || ''

    let imageRecord: any
    let uploadMethod = 'local'

    // Check if Cloudinary is configured
    const hasCloudinaryConfig = CloudinaryService.isAvailable()

    if (hasCloudinaryConfig) {
      try {
        // Upload to Cloudinary
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

        const cloudinaryResult = await CloudinaryService.uploadImage(base64, {
          folder: 'remodely-gallery',
          tags: ['remodely', category.toLowerCase()],
          transformation: {
            quality: 'auto',
            format: 'auto'
          }
        })

        imageRecord = {
          id: cloudinaryResult.public_id,
          name: file.name,
          url: cloudinaryResult.secure_url,
          category: category,
          size: cloudinaryResult.bytes,
          uploadDate: new Date().toISOString().split('T')[0],
          description: description,
          uploadedAt: new Date().toISOString(),
          source: 'cloudinary',
          cloudinary: {
            public_id: cloudinaryResult.public_id,
            width: cloudinaryResult.width,
            height: cloudinaryResult.height,
            format: cloudinaryResult.format,
            folder: cloudinaryResult.folder,
            tags: cloudinaryResult.tags
          }
        }
        uploadMethod = 'cloudinary'
      } catch (cloudinaryError) {
        console.warn('Cloudinary upload failed, falling back to local storage:', cloudinaryError)
        uploadMethod = 'local-fallback'
      }
    }

    // Local storage fallback
    if (!hasCloudinaryConfig || uploadMethod === 'local-fallback') {
      const timestamp = Date.now()
      const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const filepath = path.join(UPLOADS_DIR, filename)

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      fs.writeFileSync(filepath, buffer)

      imageRecord = {
        id: timestamp.toString(),
        name: file.name,
        url: `/uploads/${filename}`,
        category: category,
        size: file.size,
        uploadDate: new Date().toISOString().split('T')[0],
        description: description,
        uploadedAt: new Date().toISOString(),
        source: uploadMethod === 'local-fallback' ? 'local-fallback' : 'local'
      }
    }

    // Read existing images and add new one
    const data = fs.readFileSync(IMAGES_FILE, 'utf8')
    const images = JSON.parse(data)
    images.push(imageRecord)

    // Write back to file
    fs.writeFileSync(IMAGES_FILE, JSON.stringify(images, null, 2))

    return NextResponse.json({
      success: true,
      message: `Image uploaded successfully via ${uploadMethod}`,
      image: imageRecord,
      uploadMethod: uploadMethod
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { error: 'Failed to upload image', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedImage = await request.json()

    // Read existing images
    const data = fs.readFileSync(IMAGES_FILE, 'utf8')
    const images = JSON.parse(data)

    // Find and update the image
    const imageIndex = images.findIndex((img: any) => img.id === updatedImage.id)
    if (imageIndex === -1) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    images[imageIndex] = {
      ...images[imageIndex],
      ...updatedImage,
      updatedAt: new Date().toISOString()
    }

    // Write back to file
    fs.writeFileSync(IMAGES_FILE, JSON.stringify(images, null, 2))

    return NextResponse.json({
      success: true,
      message: 'Image updated successfully',
      image: images[imageIndex]
    })
  } catch (error) {
    console.error('Error updating image:', error)
    return NextResponse.json(
      { error: 'Failed to update image' },
      { status: 500 }
    )
  }
}
