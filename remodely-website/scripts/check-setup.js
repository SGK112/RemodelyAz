#!/usr/bin/env node

/**
 * Quick test to check your MongoDB and Cloudinary setup
 */

require('dotenv').config({ path: '.env.local' })

async function checkSetup() {
  console.log('🔍 Checking RemodelyAz Image Setup...\n')
  
  // Check environment variables
  console.log('📋 Environment Variables:')
  console.log(`   MONGODB_URI: ${process.env.MONGODB_URI ? '✅ Set' : '❌ Missing'}`)
  console.log(`   CLOUDINARY_CLOUD_NAME: ${process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing'}`)
  console.log(`   CLOUDINARY_API_KEY: ${process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing'}`)
  console.log(`   CLOUDINARY_API_SECRET: ${process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing'}`)
  
  // Check MongoDB connection
  console.log('\n🗄️  MongoDB Connection:')
  try {
    const mongoose = require('mongoose')
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('   ✅ MongoDB connected successfully')
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log(`   📂 Found ${collections.length} collections:`)
    collections.forEach(col => {
      const hasImages = col.name.toLowerCase().includes('image') || 
                       col.name.toLowerCase().includes('gallery') ||
                       col.name.toLowerCase().includes('project')
      console.log(`      ${hasImages ? '🖼️ ' : '📄 '} ${col.name}`)
    })
    
    await mongoose.disconnect()
  } catch (error) {
    console.log(`   ❌ MongoDB connection failed: ${error.message}`)
  }
  
  // Check Cloudinary
  console.log('\n☁️  Cloudinary Connection:')
  try {
    const cloudinary = require('cloudinary').v2
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
    
    const result = await cloudinary.api.ping()
    if (result.status === 'ok') {
      console.log('   ✅ Cloudinary connected successfully')
      
      // Check usage
      const usage = await cloudinary.api.usage()
      console.log(`   📊 Storage used: ${(usage.storage.used_bytes / 1024 / 1024).toFixed(2)} MB`)
      console.log(`   🖼️  Images: ${usage.resources.image}`)
    }
  } catch (error) {
    console.log(`   ❌ Cloudinary connection failed: ${error.message}`)
  }
  
  // Check existing images.json
  console.log('\n📁 Local Image Data:')
  try {
    const fs = require('fs')
    const path = require('path')
    const imagesPath = path.join(__dirname, '..', 'data', 'images.json')
    
    if (fs.existsSync(imagesPath)) {
      const data = JSON.parse(fs.readFileSync(imagesPath, 'utf8'))
      console.log(`   ✅ Found ${data.length} images in images.json`)
      
      const categories = data.reduce((acc, img) => {
        acc[img.category] = (acc[img.category] || 0) + 1
        return acc
      }, {})
      
      console.log('   📊 Categories:')
      Object.entries(categories).forEach(([cat, count]) => {
        console.log(`      ${cat}: ${count}`)
      })
    } else {
      console.log('   ⚠️  No images.json file found')
    }
  } catch (error) {
    console.log(`   ❌ Error reading images.json: ${error.message}`)
  }
  
  console.log('\n🎯 Next Steps:')
  if (!process.env.MONGODB_URI) {
    console.log('   1. Set up your MONGODB_URI in .env.local')
  }
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.log('   2. Set up your Cloudinary credentials in .env.local')
  }
  console.log('   3. Run: npm run migrate-images')
  console.log('   4. Test your gallery page')
  
  console.log('\n✅ Setup check complete!')
}

checkSetup().catch(console.error)
