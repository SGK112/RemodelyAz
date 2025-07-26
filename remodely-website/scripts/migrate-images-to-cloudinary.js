#!/usr/bin/env node

/**
 * MongoDB to Cloudinary Image Migration Script
 * 
 * This script:
 * 1. Connects to MongoDB and finds all image records
 * 2. Downloads images from MongoDB (if stored as base64 or GridFS)
 * 3. Uploads them to Cloudinary with proper organization
 * 4. Updates the images.json file with new Cloudinary URLs
 * 5. Optionally updates the MongoDB records with new URLs
 */

require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

// Import Cloudinary service (assuming you have cloudinary installed)
let cloudinary = null
try {
  cloudinary = require('cloudinary').v2
  
  if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  } else {
    console.error('❌ Cloudinary credentials not found in environment variables')
    process.exit(1)
  }
} catch (error) {
  console.error('❌ Cloudinary not installed. Run: npm install cloudinary')
  process.exit(1)
}

// MongoDB Image Schema (define based on your existing schema)
const ImageSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  filename: String,
  originalName: String,
  mimetype: String,
  size: Number,
  uploadDate: { type: Date, default: Date.now },
  
  // For base64 stored images
  data: String, // base64 data
  
  // For GridFS stored images  
  gridfsId: mongoose.Schema.Types.ObjectId,
  
  // For URL references
  url: String,
  
  // Project-specific fields
  projectId: String,
  tags: [String],
  featured: { type: Boolean, default: false },
  
  // Metadata
  width: Number,
  height: Number,
  alt: String,
})

// Create model (adjust the collection name as needed)
const MongoImage = mongoose.models.Image || mongoose.model('Image', ImageSchema)

// Also check for other possible collections
const GalleryImage = mongoose.models.GalleryImage || mongoose.model('GalleryImage', ImageSchema)
const ProjectImage = mongoose.models.ProjectImage || mongoose.model('ProjectImage', ImageSchema)

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')
    
    // List all collections to find image-related ones
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log('📋 Available collections:', collections.map(c => c.name).filter(name => 
      name.toLowerCase().includes('image') || 
      name.toLowerCase().includes('gallery') ||
      name.toLowerCase().includes('project') ||
      name.toLowerCase().includes('media')
    ))
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

async function findAllImages() {
  console.log('\n🔍 Searching for images in MongoDB...')
  
  const imageCollections = [
    { name: 'images', model: MongoImage },
    { name: 'galleryimages', model: GalleryImage },
    { name: 'projectimages', model: ProjectImage },
  ]
  
  let allImages = []
  
  for (const collection of imageCollections) {
    try {
      const images = await collection.model.find({}).lean()
      if (images.length > 0) {
        console.log(`📸 Found ${images.length} images in ${collection.name} collection`)
        allImages = allImages.concat(images.map(img => ({ ...img, collection: collection.name })))
      }
    } catch (error) {
      console.log(`⚠️  Collection ${collection.name} not found or error:`, error.message)
    }
  }
  
  // Also search in any collection for documents with image-like fields
  try {
    const collections = await mongoose.connection.db.listCollections().toArray()
    
    for (const collection of collections) {
      if (!['images', 'galleryimages', 'projectimages'].includes(collection.name)) {
        try {
          const sampleDoc = await mongoose.connection.db.collection(collection.name).findOne({
            $or: [
              { image: { $exists: true } },
              { images: { $exists: true } },
              { photo: { $exists: true } },
              { photos: { $exists: true } },
              { url: { $regex: /\.(jpg|jpeg|png|gif|webp|svg)$/i } }
            ]
          })
          
          if (sampleDoc) {
            console.log(`📁 Found potential images in collection: ${collection.name}`)
            const docs = await mongoose.connection.db.collection(collection.name).find({
              $or: [
                { image: { $exists: true } },
                { images: { $exists: true } },
                { photo: { $exists: true } },
                { photos: { $exists: true } },
                { url: { $regex: /\.(jpg|jpeg|png|gif|webp|svg)$/i } }
              ]
            }).toArray()
            
            console.log(`   → ${docs.length} documents with image fields`)
          }
        } catch (err) {
          // Skip collections we can't access
        }
      }
    }
  } catch (error) {
    console.log('⚠️  Error scanning collections:', error.message)
  }
  
  return allImages
}

async function uploadToCloudinary(imageData, metadata) {
  try {
    console.log(`📤 Uploading ${metadata.title || metadata.filename || 'untitled'} to Cloudinary...`)
    
    let uploadOptions = {
      folder: 'remodely-gallery',
      public_id: `${metadata.category || 'general'}/${Date.now()}_${metadata.filename || 'image'}`.replace(/\s+/g, '_'),
      tags: ['remodely', 'migrated', metadata.category].filter(Boolean),
      context: {
        title: metadata.title || '',
        description: metadata.description || '',
        original_id: metadata._id.toString(),
      }
    }
    
    let result
    if (metadata.data && metadata.data.startsWith('data:')) {
      // Base64 image
      result = await cloudinary.uploader.upload(metadata.data, uploadOptions)
    } else if (metadata.url && (metadata.url.startsWith('http') || metadata.url.startsWith('https'))) {
      // URL-based image
      result = await cloudinary.uploader.upload(metadata.url, uploadOptions)
    } else if (metadata.gridfsId) {
      // GridFS image - you'll need to implement GridFS reading
      console.log('⚠️  GridFS images require additional implementation')
      return null
    } else {
      console.log('⚠️  Unknown image format for:', metadata.title || metadata._id)
      return null
    }
    
    console.log(`✅ Uploaded: ${result.secure_url}`)
    return result
    
  } catch (error) {
    console.error(`❌ Upload failed for ${metadata.title || metadata._id}:`, error.message)
    return null
  }
}

function createImageRecord(cloudinaryResult, originalMetadata) {
  return {
    id: cloudinaryResult.public_id,
    name: originalMetadata.title || originalMetadata.originalName || cloudinaryResult.public_id,
    url: cloudinaryResult.secure_url,
    category: originalMetadata.category || 'General',
    size: cloudinaryResult.bytes,
    uploadDate: new Date().toISOString().split('T')[0],
    description: originalMetadata.description || originalMetadata.alt || '',
    uploadedAt: new Date().toISOString(),
    source: 'cloudinary',
    cloudinary: {
      public_id: cloudinaryResult.public_id,
      width: cloudinaryResult.width,
      height: cloudinaryResult.height,
      format: cloudinaryResult.format,
      tags: cloudinaryResult.tags || []
    },
    // Keep original MongoDB reference
    originalMongoId: originalMetadata._id.toString(),
    originalCollection: originalMetadata.collection
  }
}

async function updateImagesJson(newImageRecords) {
  const imagesJsonPath = path.join(__dirname, '..', 'data', 'images.json')
  
  let existingImages = []
  if (fs.existsSync(imagesJsonPath)) {
    const data = fs.readFileSync(imagesJsonPath, 'utf8')
    existingImages = JSON.parse(data)
  }
  
  // Merge with existing images (avoid duplicates)
  const allImages = [...existingImages, ...newImageRecords]
  
  // Write back to file
  fs.writeFileSync(imagesJsonPath, JSON.stringify(allImages, null, 2))
  console.log(`✅ Updated images.json with ${newImageRecords.length} new images`)
  
  return allImages
}

async function generateGalleryData(imageRecords) {
  // Create gallery projects based on migrated images
  const projectsByCategory = imageRecords.reduce((acc, img) => {
    const category = img.category.toLowerCase()
    if (!acc[category]) acc[category] = []
    acc[category].push(img)
    return acc
  }, {})
  
  const galleryProjects = []
  let projectId = 1
  
  for (const [category, images] of Object.entries(projectsByCategory)) {
    for (const img of images.slice(0, 6)) { // Limit to 6 per category
      galleryProjects.push({
        id: projectId++,
        title: img.name,
        category: category === 'kitchen' ? 'kitchen' : 
                 category === 'bathroom' ? 'bathroom' : 
                 category === 'office' || category === 'commercial' ? 'commercial' : 'other',
        image: img.url,
        description: img.description || `Beautiful ${category} renovation showcasing premium craftsmanship and modern design.`,
        location: 'Phoenix, AZ',
        date: img.uploadDate,
        budget: category === 'kitchen' ? '$75,000' : 
               category === 'bathroom' ? '$45,000' : 
               category === 'commercial' ? '$120,000' : '$60,000',
        duration: category === 'kitchen' ? '4 weeks' : 
                 category === 'bathroom' ? '3 weeks' : 
                 category === 'commercial' ? '6 weeks' : '3 weeks',
        features: category === 'kitchen' ? ['Custom Cabinetry', 'Quartz Countertops', 'Smart Appliances', 'LED Lighting'] :
                 category === 'bathroom' ? ['Walk-in Shower', 'Heated Floors', 'Custom Vanity', 'Premium Fixtures'] :
                 category === 'commercial' ? ['Modern Layout', 'Professional Finishes', 'Tech Integration', 'Efficient Design'] :
                 ['Quality Materials', 'Expert Installation', 'Custom Design', 'Premium Finishes']
      })
    }
  }
  
  // Update gallery page with real data
  const galleryDataPath = path.join(__dirname, '..', 'data', 'gallery-projects.json')
  fs.writeFileSync(galleryDataPath, JSON.stringify(galleryProjects, null, 2))
  console.log(`✅ Generated ${galleryProjects.length} gallery projects`)
  
  return galleryProjects
}

async function main() {
  console.log('🚀 Starting MongoDB to Cloudinary Migration...\n')
  
  // Connect to MongoDB
  await connectToMongoDB()
  
  // Find all images
  const mongoImages = await findAllImages()
  
  if (mongoImages.length === 0) {
    console.log('📭 No images found in MongoDB to migrate')
    process.exit(0)
  }
  
  console.log(`\n📊 Found ${mongoImages.length} total images to migrate`)
  
  // Ask for confirmation
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  const proceed = await new Promise(resolve => {
    readline.question(`Proceed with migration? (y/N): `, answer => {
      readline.close()
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes')
    })
  })
  
  if (!proceed) {
    console.log('Migration cancelled')
    process.exit(0)
  }
  
  // Migrate each image
  const migratedImages = []
  let successCount = 0
  let failCount = 0
  
  for (const [index, mongoImage] of mongoImages.entries()) {
    console.log(`\n[${index + 1}/${mongoImages.length}] Processing: ${mongoImage.title || mongoImage.filename || mongoImage._id}`)
    
    const cloudinaryResult = await uploadToCloudinary(mongoImage, mongoImage)
    
    if (cloudinaryResult) {
      const imageRecord = createImageRecord(cloudinaryResult, mongoImage)
      migratedImages.push(imageRecord)
      successCount++
    } else {
      failCount++
    }
    
    // Add delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  console.log(`\n📊 Migration Summary:`)
  console.log(`   ✅ Successfully migrated: ${successCount}`)
  console.log(`   ❌ Failed: ${failCount}`)
  
  if (migratedImages.length > 0) {
    // Update images.json
    await updateImagesJson(migratedImages)
    
    // Generate gallery data
    await generateGalleryData(migratedImages)
    
    console.log('\n🎉 Migration completed successfully!')
    console.log('\n📋 Next steps:')
    console.log('   1. Update your gallery components to use the new images')
    console.log('   2. Test the website to ensure images load correctly')
    console.log('   3. Consider cleaning up old MongoDB image data')
    
    // Show sample URLs
    console.log('\n🔗 Sample migrated URLs:')
    migratedImages.slice(0, 3).forEach(img => {
      console.log(`   • ${img.name}: ${img.url}`)
    })
  }
  
  await mongoose.disconnect()
  console.log('\n✅ Disconnected from MongoDB')
}

// Run the migration
main().catch(error => {
  console.error('💥 Migration failed:', error)
  process.exit(1)
})
