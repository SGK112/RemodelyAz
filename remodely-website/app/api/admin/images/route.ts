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

// Schema for partner images
const PartnerImageSchema = new mongoose.Schema({
  partner_name: String,
  partner_website: String,
  partner_specialties: [String],
  project_name: String,
  project_type: String,
  category: String,
  material: String,
  style: String,
  location: String,
  src: String,
  alt: String,
  tags: [String],
  original_filename: String,
  file_path: String,
  imported_at: Date,
  arizona_focused: Boolean,
  partner_info: {
    name: String,
    website: String,
    location: String,
    phone: String,
    specialties: [String]
  }
})

const RemodelyImage = mongoose.models.images || mongoose.model('images', RemodelyImageSchema)
const PartnerImage = mongoose.models.partner_images || mongoose.model('partner_images', PartnerImageSchema)

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
      url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center',
      category: 'Kitchen',
      size: 245000,
      uploadDate: new Date().toISOString().split('T')[0],
      description: 'Beautiful modern kitchen with white cabinets and quartz countertops',
      uploadedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Luxury Bathroom Remodel',
      url: 'https://images.unsplash.com/photo-1584622781003-d2311cc45946?w=800&h=600&fit=crop&crop=center',
      category: 'Bathroom',
      size: 198000,
      uploadDate: new Date().toISOString().split('T')[0],
      description: 'Spa-like bathroom with walk-in shower and dual vanities',
      uploadedAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Contemporary Living Room',
      url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center',
      category: 'Living Room',
      size: 220000,
      uploadDate: new Date().toISOString().split('T')[0],
      description: 'Open concept living room with modern furnishings',
      uploadedAt: new Date().toISOString()
    },
    {
      id: '4',
      name: 'Commercial Office Space',
      url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop&crop=center',
      category: 'Commercial',
      size: 275000,
      uploadDate: new Date().toISOString().split('T')[0],
      description: 'Modern commercial office renovation with glass partitions',
      uploadedAt: new Date().toISOString()
    },
    {
      id: '5',
      name: 'Master Bedroom Suite',
      url: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop&crop=center',
      category: 'Bedroom',
      size: 189000,
      uploadDate: new Date().toISOString().split('T')[0],
      description: 'Elegant master bedroom with custom built-ins',
      uploadedAt: new Date().toISOString()
    },
    {
      id: '6',
      name: 'Outdoor Living Space',
      url: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&h=600&fit=crop&crop=center',
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
    // First, try to read from the JSON file (contains uploaded images)
    if (fs.existsSync(IMAGES_FILE)) {
      const data = fs.readFileSync(IMAGES_FILE, 'utf8')
      const images = JSON.parse(data)
      
      if (images && images.length > 0) {
        return NextResponse.json({
          success: true,
          data: images,
          source: 'json_file'
        })
      }
    }

    // Connect to MongoDB for fallback partner images
    await connectMongoDB()

    // Get real partner images - prioritize actual photos over placeholders
    const partnerImages = await PartnerImage.find({
      arizona_focused: true,
      src: { $exists: true, $ne: null }
    }).sort({ imported_at: -1 })

    let galleryImages: any[] = []

    // Process partner images (showcase our supplier network with real photos)
    if (partnerImages && partnerImages.length > 0) {
      const partnerGalleryImages = partnerImages.map((image: any) => {
        // Determine category based on partner and project type
        let displayCategory = 'Remodeling'
        if (image.partner_name === 'SunStone Surfaces') {
          displayCategory = image.project_type === 'Kitchen' ? 'Kitchen' :
            image.project_type === 'Bathroom' ? 'Bathroom' : 'Surfaces'
        } else if (image.category === 'cabinetry') {
          displayCategory = 'Cabinetry'
        }

        return {
          id: image._id.toString(),
          name: image.project_name,
          url: image.src, // This should be the real image path like /uploads/partners/sunstone/...
          category: displayCategory,
          description: image.alt || `Professional ${image.project_type.toLowerCase()} renovation featuring ${image.partner_name} materials`,
          material: image.material,
          partner: image.partner_name,
          partnerWebsite: image.partner_website,
          location: image.location,
          tags: [...(image.tags || []), 'arizona', 'phoenix', 'professional'],
          uploadDate: image.imported_at ? new Date(image.imported_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          uploadedAt: image.imported_at || new Date().toISOString(),
          source: 'partner'
        }
      })

      galleryImages = [...galleryImages, ...partnerGalleryImages]
    }

    // If we have real partner images, return them
    if (galleryImages.length > 0) {
      // Shuffle for variety and limit to top 20 for performance
      galleryImages = galleryImages
        .sort(() => 0.5 - Math.random())
        .slice(0, 20)

      return NextResponse.json({
        success: true,
        data: galleryImages,
        source: 'mongodb_partners'
      })
    }
  } catch (error) {
    console.error('Error reading images:', error)

    // Ultimate fallback showcasing actual business work with credibility
    const fallbackImages = [
      {
        id: '1',
        name: 'Professional Kitchen Remodel - Surprise Granite Legacy',
        url: '/uploads/surprise-granite/kitchen-linda-ullrich-remodel.avif',
        category: 'Kitchen',
        description: 'Expert kitchen renovation from our established Arizona business - Linda Ullrich project featuring premium materials',
        partner: 'Remodely Arizona (Legacy: Surprise Granite)',
        location: 'Surprise, Arizona',
        tags: ['arizona', 'surprise', 'kitchen', 'renovation', 'professional'],
        uploadDate: new Date().toISOString().split('T')[0],
        uploadedAt: new Date().toISOString(),
        businessCredibility: '4.7/5 stars, 400+ projects'
      },
      {
        id: '2',
        name: 'Premium Quartz Countertop Installation',
        url: '/uploads/surprise-granite/countertops-quartz-installation.webp',
        category: 'Kitchen',
        description: 'Professional quartz countertop installation showcasing our expertise in premium surface materials',
        partner: 'Remodely Arizona (Legacy: Surprise Granite)',
        location: 'Phoenix Metro Area',
        tags: ['arizona', 'countertops', 'quartz', 'professional', 'premium'],
        uploadDate: new Date().toISOString().split('T')[0],
        uploadedAt: new Date().toISOString(),
        businessCredibility: 'Licensed contractor AzRoc #327266'
      },
      {
        id: '3',
        name: 'Modern Kitchen Design - Arizona Home',
        url: 'https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/666c82cd5e8c79229b330f4b_Surprise%20Granite%20Homepage%20Hero-p-800.webp',
        category: 'Kitchen',
        description: 'Stunning kitchen renovation featuring gray cabinets and white marble countertops - our signature work',
        partner: 'Remodely Arizona',
        location: 'Arizona',
        tags: ['arizona', 'kitchen', 'modern', 'cabinets', 'marble'],
        uploadDate: new Date().toISOString().split('T')[0],
        uploadedAt: new Date().toISOString(),
        businessCredibility: '146+ Google Reviews'
      },
      {
        id: '4',
        name: 'Commercial Reception Desk - Premium Installation',
        url: 'https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/65b2b21191cd50564d8cf18a__lx-hausys-surprise-granite-encore-quartz_gym-reception-desk-p-800.webp',
        category: 'Commercial',
        description: 'High-end commercial installation for gym reception desk - showcasing our commercial capabilities',
        partner: 'Remodely Arizona',
        location: 'Arizona',
        tags: ['arizona', 'commercial', 'reception', 'quartz', 'professional'],
        uploadDate: new Date().toISOString().split('T')[0],
        uploadedAt: new Date().toISOString(),
        businessCredibility: 'Commercial & Residential Expertise'
      }
    ]

    return NextResponse.json({
      success: true,
      data: fallbackImages,
      source: 'fallback'
    })
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
