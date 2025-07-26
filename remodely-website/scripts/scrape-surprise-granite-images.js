/**
 * Script to scrape images from surprisegranite.com website
 * and integrate them into the Remodely Arizona gallery
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// Images found from the website scraping
const imageUrls = [
  // Kitchen remodel project
  'https://cdn.prod.website-files.com/6456ce4476abb2d4f9fbad10/65fa43101c30f8603b71061c_Linda%20Ullrich%20Kitchen%20Remodel-p-800.avif',
  
  // Quartz/Granite showcase image
  'https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/65b2b21191cd50564d8cf18a__lx-hausys-surprise-granite-encore-quartz_gym-reception-desk-p-800.webp',
  
  // Payment method images (for credibility)
  'https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/6456ce4476abb26f2bfbb121_mastercard.png',
  'https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/6456ce4476abb280abfbb124_discover.png',
  'https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/6456ce4476abb2b84cfbb122_amex.png',
  'https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/6456ce4476abb2de4ffbb123_paypal.png',
  
  // HomeAdvisor badge for credibility
  'https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/6456ce4476abb208e7fbb0ab_screened_and_approved_home_advisor_logo.png'
];

// Categories for organizing images
const imageCategories = {
  'kitchen': [
    'https://cdn.prod.website-files.com/6456ce4476abb2d4f9fbad10/65fa43101c30f8603b71061c_Linda%20Ullrich%20Kitchen%20Remodel-p-800.avif'
  ],
  'countertops': [
    'https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/65b2b21191cd50564d8cf18a__lx-hausys-surprise-granite-encore-quartz_gym-reception-desk-p-800.webp'
  ],
  'credibility': [
    'https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/6456ce4476abb26f2bfbb121_mastercard.png',
    'https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/6456ce4476abb280abfbb124_discover.png',
    'https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/6456ce4476abb2b84cfbb122_amex.png',
    'https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/6456ce4476abb2de4ffbb123_paypal.png',
    'https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/6456ce4476abb208e7fbb0ab_screened_and_approved_home_advisor_logo.png'
  ]
};

// Download directory
const downloadDir = path.join(__dirname, '../public/uploads/surprise-granite');

// Create download directory if it doesn't exist
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

/**
 * Download an image from URL
 */
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const filePath = path.join(downloadDir, filename);
    
    client.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filePath);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✅ Downloaded: ${filename}`);
          resolve(filePath);
        });
        
        fileStream.on('error', (err) => {
          fs.unlink(filePath, () => {}); // Delete partial file
          reject(err);
        });
      } else {
        reject(new Error(`HTTP ${response.statusCode}: ${url}`));
      }
    }).on('error', reject);
  });
}

/**
 * Get filename from URL
 */
function getFilenameFromUrl(url) {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const filename = pathname.split('/').pop();
  
  // If no extension, try to determine from content type or add default
  if (!filename.includes('.')) {
    return `${filename}.jpg`;
  }
  
  return filename;
}

/**
 * Create Remodely Arizona image data for MongoDB
 */
function createImageData(category, filename, originalUrl) {
  const categories = {
    'kitchen': {
      category: 'Kitchen Remodeling',
      description: 'Professional kitchen remodeling featuring custom countertops, cabinets, and modern design elements in Arizona.',
      tags: ['kitchen', 'remodeling', 'arizona', 'countertops', 'cabinets']
    },
    'countertops': {
      category: 'Countertops',
      description: 'Premium quartz and granite countertops installation showcasing elegant stone work and craftsmanship.',
      tags: ['countertops', 'quartz', 'granite', 'stone', 'arizona']
    },
    'credibility': {
      category: 'Business Credentials',
      description: 'Trusted payment methods and professional certifications for reliable remodeling services.',
      tags: ['credentials', 'payment', 'trust', 'professional']
    }
  };
  
  const categoryInfo = categories[category] || categories['kitchen'];
  
  return {
    name: `Remodely Arizona - ${categoryInfo.category}`,
    description: categoryInfo.description,
    category: categoryInfo.category,
    tags: categoryInfo.tags,
    imageUrl: `/uploads/surprise-granite/${filename}`,
    originalUrl: originalUrl,
    source: 'Surprise Granite Website',
    location: 'Arizona',
    createdAt: new Date(),
    isActive: true,
    featured: category === 'kitchen' // Feature kitchen images
  };
}

/**
 * Main execution function
 */
async function main() {
  console.log('🔍 Starting image extraction from Surprise Granite website...');
  console.log(`📁 Download directory: ${downloadDir}`);
  
  const downloadedImages = [];
  const imageDataForMongo = [];
  
  // Download images by category
  for (const [category, urls] of Object.entries(imageCategories)) {
    console.log(`\n📂 Processing ${category} images...`);
    
    for (const url of urls) {
      try {
        const filename = getFilenameFromUrl(url);
        const categoryFilename = `${category}-${filename}`;
        
        await downloadImage(url, categoryFilename);
        downloadedImages.push({
          category,
          filename: categoryFilename,
          url,
          localPath: path.join(downloadDir, categoryFilename)
        });
        
        // Create MongoDB data
        const imageData = createImageData(category, categoryFilename, url);
        imageDataForMongo.push(imageData);
        
      } catch (error) {
        console.error(`❌ Failed to download ${url}:`, error.message);
      }
    }
  }
  
  // Save image data to JSON file for MongoDB import
  const dataFilePath = path.join(__dirname, '../data/surprise-granite-images.json');
  fs.writeFileSync(dataFilePath, JSON.stringify(imageDataForMongo, null, 2));
  
  console.log('\n✅ Image extraction completed!');
  console.log(`📊 Downloaded ${downloadedImages.length} images`);
  console.log(`💾 Image data saved to: ${dataFilePath}`);
  
  // Display summary
  console.log('\n📋 Summary:');
  for (const [category, urls] of Object.entries(imageCategories)) {
    console.log(`  ${category}: ${urls.length} images`);
  }
  
  console.log('\n🔧 Next steps:');
  console.log('1. Run: node scripts/import-surprise-granite-images.js');
  console.log('2. Update gallery component to use new images');
  console.log('3. Test gallery functionality');
  
  return {
    downloadedImages,
    imageDataForMongo,
    downloadDir,
    dataFilePath
  };
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, downloadImage, createImageData, imageCategories };
