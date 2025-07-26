/**
 * Import Surprise Granite images into MongoDB for Remodely Arizona
 */

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Define the image schema based on existing RemodelyAz structure
const RemodelyImageSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  tags: [String],
  imageUrl: String,
  originalUrl: String,
  source: String,
  location: String,
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  featured: { type: Boolean, default: false }
});

const Image = mongoose.model('images', RemodelyImageSchema);

/**
 * Connect to MongoDB
 */
async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/remodely', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

/**
 * Import images from JSON data
 */
async function importImages() {
  const dataFilePath = path.join(__dirname, '../data/surprise-granite-images.json');
  
  if (!fs.existsSync(dataFilePath)) {
    throw new Error(`Image data file not found: ${dataFilePath}`);
  }
  
  const imageData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  console.log(`📊 Found ${imageData.length} images to import`);
  
  let importedCount = 0;
  let skippedCount = 0;
  
  for (const data of imageData) {
    try {
      // Check if image already exists
      const existingImage = await Image.findOne({ 
        originalUrl: data.originalUrl 
      });
      
      if (existingImage) {
        console.log(`⏭️  Skipped (already exists): ${data.name}`);
        skippedCount++;
        continue;
      }
      
      // Create new image document
      const newImage = new Image(data);
      await newImage.save();
      
      console.log(`✅ Imported: ${data.name}`);
      importedCount++;
      
    } catch (error) {
      console.error(`❌ Failed to import ${data.name}:`, error.message);
    }
  }
  
  console.log('\n📋 Import Summary:');
  console.log(`  ✅ Imported: ${importedCount} images`);
  console.log(`  ⏭️  Skipped: ${skippedCount} images`);
  console.log(`  📊 Total: ${imageData.length} images processed`);
  
  return { importedCount, skippedCount, total: imageData.length };
}

/**
 * Verify import by checking database
 */
async function verifyImport() {
  const totalImages = await Image.countDocuments();
  const surpriseGraniteImages = await Image.countDocuments({ 
    source: 'Surprise Granite Website' 
  });
  
  console.log('\n🔍 Database Verification:');
  console.log(`  📊 Total images in database: ${totalImages}`);
  console.log(`  🏢 Surprise Granite images: ${surpriseGraniteImages}`);
  
  // Show some sample images
  const sampleImages = await Image.find({ source: 'Surprise Granite Website' }).limit(3);
  console.log('\n📸 Sample imported images:');
  sampleImages.forEach((img, index) => {
    console.log(`  ${index + 1}. ${img.name} - ${img.category}`);
  });
  
  return { totalImages, surpriseGraniteImages };
}

/**
 * Update existing countertop images with Arizona branding
 */
async function updateExistingImages() {
  console.log('\n🔄 Updating existing images with Arizona branding...');
  
  const updates = [
    {
      filter: { category: 'Kitchen' },
      update: {
        name: { $regex: /^(?!.*Arizona).*/ },
        $set: {
          location: 'Arizona',
          tags: { $addToSet: { $each: ['arizona', 'remodeling', 'local'] } },
          description: { $concat: ['$description', ' - Professional Arizona remodeling services.'] }
        }
      }
    }
  ];
  
  // Update kitchen images
  const kitchenUpdate = await Image.updateMany(
    { 
      category: 'Kitchen',
      name: { $not: { $regex: /Arizona/ } }
    },
    {
      $set: { location: 'Arizona' },
      $addToSet: { 
        tags: { $each: ['arizona', 'remodeling', 'surprise', 'phoenix'] }
      }
    }
  );
  
  console.log(`✅ Updated ${kitchenUpdate.modifiedCount} kitchen images with Arizona branding`);
  
  return kitchenUpdate.modifiedCount;
}

/**
 * Main execution function
 */
async function main() {
  try {
    console.log('🚀 Starting Surprise Granite image import...');
    
    // Connect to database
    await connectToMongoDB();
    
    // Import new images
    const importResult = await importImages();
    
    // Update existing images
    const updatedCount = await updateExistingImages();
    
    // Verify the import
    await verifyImport();
    
    console.log('\n🎉 Import process completed successfully!');
    console.log('\n🔧 Next steps:');
    console.log('1. Restart your development server');
    console.log('2. Check the gallery at http://localhost:3000/gallery');
    console.log('3. Verify images are displaying correctly');
    
  } catch (error) {
    console.error('❌ Import failed:', error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, importImages, verifyImport };
