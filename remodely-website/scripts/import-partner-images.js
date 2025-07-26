const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB connection
const connectMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/remodely', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Schema for partner cabinet images
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
  migrated_at: Date,
  partner: String,
  project_type: String,
  style: String,
  finish: String
});

const RemodelyImage = mongoose.models.RemodelyImage || mongoose.model('RemodelyImage', RemodelyImageSchema, 'images');

async function importPartnerImages() {
  await connectMongoDB();
  
  const metadataFile = path.join(__dirname, '..', 'public', 'uploads', 'partner-cabinets', 'partner-images-metadata.json');
  
  if (!fs.existsSync(metadataFile)) {
    console.error('❌ Partner images metadata file not found. Please run scrape-partner-images.js first.');
    process.exit(1);
  }
  
  const partnerImages = JSON.parse(fs.readFileSync(metadataFile, 'utf8'));
  console.log(`📋 Found ${partnerImages.length} partner images to import`);
  
  let imported = 0;
  let skipped = 0;
  
  for (const image of partnerImages) {
    try {
      // Check if image already exists
      const existing = await RemodelyImage.findOne({ 
        src: image.localPath 
      });
      
      if (existing) {
        console.log(`⏭️  Skipped existing: ${image.name}`);
        skipped++;
        continue;
      }
      
      // Determine partner and style info
      const isProCraft = image.name.includes('ProCraft') || 
                        image.name.includes('Liberty') || 
                        image.name.includes('Milania');
      const isSollid = image.name.includes('Chandler') || 
                      image.name.includes('Alpine') || 
                      image.name.includes('Newport') || 
                      image.name.includes('Shaker') || 
                      image.name.includes('Davis') || 
                      image.name.includes('Beachwood') || 
                      image.name.includes('Metro') || 
                      image.name.includes('Napa') || 
                      image.name.includes('Cambria') || 
                      image.name.includes('Tahoe');
      
      // Extract style and finish from name
      let style = 'Custom';
      let finish = 'Natural';
      let material = 'Wood';
      let brand = isSollid ? 'Sollid Cabinetry' : 'ProCraft Phoenix';
      
      if (image.name.includes('Shaker')) {
        style = 'Shaker';
        if (image.name.includes('White')) finish = 'White';
        if (image.name.includes('Black')) finish = 'Black';
        if (image.name.includes('Grey')) finish = 'Grey';
      } else if (image.name.includes('Newport')) {
        style = 'Newport';
        if (image.name.includes('Black')) finish = 'Black';
        if (image.name.includes('Grey')) finish = 'Grey';
        if (image.name.includes('White')) finish = 'White';
      } else if (image.name.includes('Liberty')) {
        style = 'Liberty Shaker';
        if (image.name.includes('Karmel')) finish = 'Karmel';
      } else if (image.name.includes('Milania')) {
        style = 'Milania';
        finish = 'Modern';
      }
      
      // Create comprehensive tags
      const tags = [
        'remodeling',
        'renovation', 
        'arizona',
        'phoenix',
        'kitchen',
        'bathroom',
        'cabinets',
        'cabinetry',
        'custom',
        'quality',
        brand.toLowerCase().replace(/\s+/g, '-'),
        style.toLowerCase(),
        finish.toLowerCase(),
        image.category.toLowerCase()
      ];
      
      // Create new image document
      const newImage = new RemodelyImage({
        product_name: image.name,
        material: material,
        brand: brand,
        veining: 'N/A',
        primary_color: finish,
        secondary_color: 'N/A',
        scene_image_path: image.localPath,
        closeup_image_path: null,
        scene_cloudinary_url: null,
        closeup_cloudinary_url: null,
        src: image.localPath,
        alt: `${image.name} - ${image.description}`,
        category: 'cabinetry',
        tags: tags,
        migrated_at: new Date(),
        partner: brand,
        project_type: image.category,
        style: style,
        finish: finish
      });
      
      await newImage.save();
      console.log(`✅ Imported: ${image.name}`);
      imported++;
      
    } catch (error) {
      console.error(`❌ Error importing ${image.name}:`, error.message);
    }
  }
  
  console.log(`\n🎉 Import completed!`);
  console.log(`✅ Imported: ${imported} images`);
  console.log(`⏭️  Skipped: ${skipped} existing images`);
  console.log(`📊 Total partner images in database: ${imported + skipped}`);
  
  await mongoose.connection.close();
}

// Run if called directly
if (require.main === module) {
  importPartnerImages().catch(console.error);
}

module.exports = { importPartnerImages };
