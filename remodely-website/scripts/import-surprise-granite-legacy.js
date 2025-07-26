const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB connection
async function connectMongoDB() {
  if (mongoose.connections[0].readyState) {
    return;
  }
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
}

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
  imported_at: { type: Date, default: Date.now },
  arizona_focused: { type: Boolean, default: true },
  partner_info: {
    name: String,
    website: String,
    location: String,
    phone: String,
    specialties: [String]
  }
});

const PartnerImage = mongoose.models.partner_images || mongoose.model('partner_images', PartnerImageSchema);

// Import Surprise Granite images (your original business)
async function importSurpriseGraniteImages() {
  console.log('🏗️  Importing original Surprise Granite images...\n');
  
  await connectMongoDB();
  
  const surpriseGraniteDir = path.join(__dirname, '..', 'public', 'uploads', 'surprise-granite');
  
  if (!fs.existsSync(surpriseGraniteDir)) {
    console.log('❌ Surprise Granite directory not found.');
    return;
  }
  
  const imageFiles = fs.readdirSync(surpriseGraniteDir).filter(file => 
    file.match(/\.(jpg|jpeg|png|webp|avif)$/i) && 
    !file.includes('credibility') // Skip payment logos
  );
  
  console.log(`Found ${imageFiles.length} original business images to import...`);
  
  for (let i = 0; i < imageFiles.length; i++) {
    const filename = imageFiles[i];
    const category = filename.includes('kitchen') ? 'kitchen' : 
                     filename.includes('countertop') ? 'kitchen' : 'miscellaneous';
    
    const projectNames = [
      'Original Surprise Granite Kitchen Project',
      'Legacy Remodeling - Quartz Countertop Installation',
      'Professional Arizona Kitchen Renovation',
      'Custom Granite & Quartz Design Project'
    ];
    
    const descriptions = [
      'Professional kitchen renovation from our legacy Surprise Granite business - now Remodely Arizona',
      'Quality countertop installation showcasing our years of Arizona remodeling experience',
      'Expert craftsmanship from our established Arizona renovation business',
      'Premium materials installation demonstrating our professional remodeling expertise'
    ];
    
    const imageDoc = {
      partner_name: 'Remodely Arizona (Legacy: Surprise Granite)',
      partner_website: 'https://remodelyaz.com/',
      partner_specialties: ['Kitchen Remodeling', 'Countertop Installation', 'Arizona Renovations'],
      project_name: projectNames[i % projectNames.length],
      project_type: category.charAt(0).toUpperCase() + category.slice(1),
      category: 'remodeling_legacy',
      material: filename.includes('quartz') ? 'Quartz Countertops' : 'Premium Surfaces',
      style: 'Professional',
      location: 'Surprise, Arizona',
      src: `/uploads/surprise-granite/${filename}`,
      alt: `${projectNames[i % projectNames.length]} - ${descriptions[i % descriptions.length]}`,
      tags: ['arizona', 'surprise', 'remodeling', 'kitchen', 'countertops', 'legacy', 'professional'],
      original_filename: filename,
      file_path: `/uploads/surprise-granite/${filename}`,
      arizona_focused: true,
      partner_info: {
        name: 'Remodely Arizona',
        website: 'https://remodelyaz.com/',
        location: '11560 N Dysart Rd Suite 112 Surprise, AZ 85379',
        phone: 'Contact for consultation',
        specialties: ['Kitchen Remodeling', 'Bathroom Renovation', 'Arizona Home Improvement']
      }
    };
    
    await PartnerImage.create(imageDoc);
    console.log(`✅ Imported: ${filename}`);
  }
  
  console.log(`\n🎉 Imported ${imageFiles.length} original business images!`);
  console.log('📊 These images showcase your established Arizona remodeling expertise');
  
  mongoose.connection.close();
}

importSurpriseGraniteImages().catch(console.error);
