import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import CloudinaryService from '@/lib/cloudinary'
import mongoose from 'mongoose'

const DATA_DIR = path.join(process.cwd(), 'data')
const IMAGES_FILE = path.join(DATA_DIR, 'images.json')
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')

// MongoDB connection
const connectMongoDB = async () => {
  if (mongoose.connections[0].readyState) {
    return
  }
  try {
    await mongoose.connect('mongodb://localhost:27017/remodely', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as any)
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
}

// Schema for integrated countertop images
const RemodelyImageSchema = new mongoose.Schema({
  product_name: String,
  material: String,
  brand: String,
  veining: String,
  primary_color: String,
  secondary_color: String,
  scene_image_path: String,
  closeup_image_path: String,
  scene_cloudinary_url: String,
  closeup_cloudinary_url: String,
  src: String,
  alt: String,
  category: String,
  tags: [String],
  migrated_at: Date
})

const RemodelyImage = mongoose.models.images || mongoose.model('images', RemodelyImageSchema)

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
      url: 'https://res.cloudinary.com/demo/image/upload/c_fill,w_800,h_600,q_auto,f_webp/kitchen_1',
      category: 'Kitchen',
      size: 245000,
      uploadDate: new Date().toISOString().split('T')[0],
      description: 'Beautiful modern kitchen with white cabinets and quartz countertops',
      uploadedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Luxury Bathroom Remodel',
      url: 'https://res.cloudinary.com/demo/image/upload/c_fill,w_800,h_600,q_auto,f_webp/bathroom_1',
      category: 'Bathroom',
      size: 198000,
      uploadDate: new Date().toISOString().split('T')[0],
      description: 'Spa-like bathroom with walk-in shower and dual vanities',
      uploadedAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Contemporary Living Room',
      url: 'https://res.cloudinary.com/demo/image/upload/c_fill,w_800,h_600,q_auto,f_webp/living_room_1',
      category: 'Living Room',
      size: 220000,
      uploadDate: new Date().toISOString().split('T')[0],
      description: 'Open concept living room with modern furnishings',
      uploadedAt: new Date().toISOString()
    },
    {
      id: '4',
      name: 'Commercial Office Space',
      url: 'https://res.cloudinary.com/demo/image/upload/c_fill,w_800,h_600,q_auto,f_webp/office_1',
      category: 'Commercial',
      size: 275000,
      uploadDate: new Date().toISOString().split('T')[0],
      description: 'Modern commercial office renovation with glass partitions',
      uploadedAt: new Date().toISOString()
    },
    {
      id: '5',
      name: 'Master Bedroom Suite',
      url: 'https://res.cloudinary.com/demo/image/upload/c_fill,w_800,h_600,q_auto,f_webp/bedroom_1',
      category: 'Bedroom',
      size: 189000,
      uploadDate: new Date().toISOString().split('T')[0],
      description: 'Elegant master bedroom with custom built-ins',
      uploadedAt: new Date().toISOString()
    },
    {
      id: '6',
      name: 'Outdoor Living Space',
      url: 'https://res.cloudinary.com/demo/image/upload/c_fill,w_800,h_600,q_auto,f_webp/outdoor_patio',
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
    // First try to get images from MongoDB
    await connectMongoDB()

    const mongoImages = await RemodelyImage.find({
      category: 'countertops',
      src: { $exists: true, $ne: null },
      alt: { $exists: true, $ne: null }
    }).limit(10).sort({ migrated_at: -1 }) // Top 10 approach

    if (mongoImages && mongoImages.length > 0) {
      // Transform MongoDB documents to gallery format
      const galleryImages = mongoImages.map((image: any, index: number) => {
        // Generic remodeling project names
        const projectNames = [
          'Modern Kitchen Renovation',
          'Luxury Bathroom Remodel',
          'Contemporary Living Room',
          'Master Suite Transformation',
          'Open Concept Kitchen',
          'Spa-Inspired Bathroom',
          'Custom Home Office',
          'Elegant Dining Room',
          'Modern Farmhouse Kitchen',
          'Executive Bathroom Remodel',
          'Family Room Makeover',
          'Gourmet Kitchen Design',
          'Master Bathroom Suite',
          'Contemporary Home Office',
          'Traditional Kitchen Remodel',
          'Luxury Master Bedroom',
          'Modern Guest Bathroom',
          'Custom Walk-In Closet',
          'Outdoor Living Space',
          'Home Theater Room',
          'Wine Cellar Design',
          'Basement Renovation',
          'Attic Conversion',
          'Mudroom Addition',
          'Laundry Room Makeover'
        ];

        // Generic remodeling descriptions
        const descriptions = [
          'Beautiful kitchen renovation featuring custom cabinetry and premium finishes',
          'Stunning bathroom remodel with modern fixtures and luxurious materials',
          'Complete home transformation with attention to every detail',
          'Professional remodeling project showcasing quality craftsmanship',
          'Custom renovation featuring high-end materials and expert design',
          'Modern design meets functional living space in this renovation',
          'Elegant home improvement with timeless appeal and style',
          'Quality construction and beautiful finishes throughout',
          'Sophisticated remodeling project with premium upgrades',
          'Transform your space with expert design and construction',
          'Professional renovation services with exceptional results',
          'Beautiful home improvement featuring custom details',
          'Expert design and construction for modern living',
          'Custom remodeling solution tailored to your lifestyle',
          'Exceptional renovation with premium materials and finishes'
        ];

        return {
          id: image._id.toString(),
          name: projectNames[index % projectNames.length],
          // Use placeholder images while actual images are being migrated
          url: `https://picsum.photos/800/600?random=${image._id.toString().slice(-6)}`,
          category: 'Remodeling',
          description: descriptions[index % descriptions.length],
          material: image.material,
          brand: image.brand,
          tags: ['remodeling', 'renovation', 'home improvement', 'design', 'construction'],
          uploadDate: image.migrated_at ? new Date(image.migrated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          uploadedAt: image.migrated_at || new Date().toISOString()
        }
      })

      return NextResponse.json(galleryImages)
    }

    // Fallback to filesystem images if MongoDB has no data
    const data = fs.readFileSync(IMAGES_FILE, 'utf8')
    const images = JSON.parse(data)

    return NextResponse.json(images)
  } catch (error) {
    console.error('Error reading images:', error)

    // Ultimate fallback to demo images
    const fallbackImages = [
      {
        id: '1',
        name: 'Modern Kitchen Renovation',
        url: 'https://picsum.photos/800/600?random=kitchen',
        category: 'Kitchen',
        description: 'Beautiful modern kitchen with quartz countertops',
        uploadDate: new Date().toISOString().split('T')[0],
        uploadedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Luxury Bathroom',
        url: 'https://picsum.photos/800/600?random=bathroom',
        category: 'Bathroom',
        description: 'Spa-inspired bathroom renovation',
        uploadDate: new Date().toISOString().split('T')[0],
        uploadedAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Commercial Office',
        url: 'https://picsum.photos/800/600?random=office',
        category: 'Commercial',
        description: 'Modern office space renovation',
        uploadDate: new Date().toISOString().split('T')[0],
        uploadedAt: new Date().toISOString()
      }
    ]

    return NextResponse.json(fallbackImages)
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
