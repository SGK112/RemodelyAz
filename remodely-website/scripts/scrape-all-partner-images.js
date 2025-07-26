const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Create partner directories
const partnerDir = path.join(__dirname, '..', 'public', 'uploads', 'partners');
const cabinetsDir = path.join(partnerDir, 'procraft-sollid');
const stoneDir = path.join(partnerDir, 'sunstone');
const tileDir = path.join(partnerDir, 'happy-floors-emser');

// Ensure directories exist
[partnerDir, cabinetsDir, stoneDir, tileDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Comprehensive image URLs from all partners
const partnerImages = {
  // SunStone Surfaces - Stone & Surfaces
  sunstone: [
    // Bathroom images
    'https://sunstonesurfaces.com/wp-content/gallery/bathroom/bathroom5.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/bathroom/bathroom1.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/bathroom/bathroom4.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/bathroom/bathroom2.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/bathroom/bathroom3.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/bathroom/bathroom6.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/bathroom/bathroom10.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/bathroom/bathroom7.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/bathroom/bathroom12.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/bathroom/bathroom9.jpg',
    
    // Kitchen images
    'https://sunstonesurfaces.com/wp-content/gallery/kitchen/kitchen1.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/kitchen/kitchen3.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/kitchen/kitchen2.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/kitchen/kitchen5.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/kitchen/kitchen4.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/kitchen/kitchen8.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/kitchen/kitchen9.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/kitchen/kitchen11.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/kitchen/kitchen6.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/kitchen/kitchen12.jpg',
    
    // Flooring images
    'https://sunstonesurfaces.com/wp-content/gallery/flooring/flooring5.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/flooring/flooring3.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/flooring/flooring4.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/flooring/flooring6.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/flooring/flooring2.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/flooring/flooring1.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/flooring/flooring7.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/flooring/flooring10.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/flooring/flooring9.jpg',
    
    // Miscellaneous/specialty work
    'https://sunstonesurfaces.com/wp-content/gallery/miscellaneous/misc32-bg.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/miscellaneous/misc1.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/miscellaneous/misc2.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/miscellaneous/misc3.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/miscellaneous/misc4.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/miscellaneous/misc5.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/miscellaneous/misc6.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/miscellaneous/misc7.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/miscellaneous/misc8.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/miscellaneous/misc9.jpg',
    'https://sunstonesurfaces.com/wp-content/gallery/miscellaneous/misc10.jpg',
    
    // Collection background images
    'https://sunstonesurfaces.com/wp-content/uploads/2022/01/tile-collection-bg.jpg',
    'https://sunstonesurfaces.com/wp-content/uploads/2022/01/SPC-vinyl-collection-bg.jpg',
    'https://sunstonesurfaces.com/wp-content/uploads/2022/01/quartz-collection-bg.jpg',
    'https://sunstonesurfaces.com/wp-content/uploads/2022/01/mosaics-collection-bg.jpg',
    'https://sunstonesurfaces.com/wp-content/uploads/2022/01/home-second-image.jpg',
    'https://sunstonesurfaces.com/wp-content/uploads/2022/01/home-first-image.jpg'
  ],
  
  // Previously scraped cabinet partners (ProCraft Phoenix & Sollid)
  procraft: [
    'https://procraftphoenix.com/wp-content/uploads/2023/03/kitchen-1.jpg',
    'https://procraftphoenix.com/wp-content/uploads/2023/03/kitchen-2.jpg',
    'https://procraftphoenix.com/wp-content/uploads/2023/03/kitchen-3.jpg',
    'https://procraftphoenix.com/wp-content/uploads/2023/03/kitchen-4.jpg',
    'https://procraftphoenix.com/wp-content/uploads/2023/03/kitchen-5.jpg',
    'https://procraftphoenix.com/wp-content/uploads/2023/03/bathroom-1.jpg',
    'https://procraftphoenix.com/wp-content/uploads/2023/03/bathroom-2.jpg',
    'https://procraftphoenix.com/wp-content/uploads/2023/03/bathroom-3.jpg',
    'https://procraftphoenix.com/wp-content/uploads/2023/03/cabinet-detail-1.jpg',
    'https://procraftphoenix.com/wp-content/uploads/2023/03/cabinet-detail-2.jpg'
  ],
  
  sollid: [
    'https://sollidcabinetry.com/wp-content/uploads/2023/gallery/kitchen-white-shaker.jpg',
    'https://sollidcabinetry.com/wp-content/uploads/2023/gallery/kitchen-gray-modern.jpg',
    'https://sollidcabinetry.com/wp-content/uploads/2023/gallery/kitchen-navy-traditional.jpg',
    'https://sollidcabinetry.com/wp-content/uploads/2023/gallery/bathroom-vanity-double.jpg',
    'https://sollidcabinetry.com/wp-content/uploads/2023/gallery/bathroom-vanity-single.jpg',
    'https://sollidcabinetry.com/wp-content/uploads/2023/gallery/laundry-room-cabinets.jpg',
    'https://sollidcabinetry.com/wp-content/uploads/2023/gallery/home-office-built-ins.jpg',
    'https://sollidcabinetry.com/wp-content/uploads/2023/gallery/walk-in-closet.jpg',
    'https://sollidcabinetry.com/wp-content/uploads/2023/gallery/entertainment-center.jpg'
  ]
};

// Download function
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ Downloaded: ${path.basename(filepath)}`);
          resolve();
        });
        file.on('error', (err) => {
          fs.unlink(filepath, () => {}); // Delete partial file
          reject(err);
        });
      } else if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirects
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error(`HTTP ${response.statusCode}: ${url}`));
      }
    });
    
    request.on('error', reject);
    request.setTimeout(30000, () => {
      request.abort();
      reject(new Error('Request timeout'));
    });
  });
}

// Main execution
async function scrapeAllPartnerImages() {
  console.log('🏗️  Starting partner image scraping for Remodely Arizona...\n');
  
  let totalDownloaded = 0;
  let totalFailed = 0;
  
  // Download SunStone images
  console.log('📸 Downloading SunStone Surfaces images...');
  for (let i = 0; i < partnerImages.sunstone.length; i++) {
    const url = partnerImages.sunstone[i];
    const filename = `sunstone-${i + 1}-${path.basename(url)}`;
    const filepath = path.join(stoneDir, filename);
    
    try {
      await downloadImage(url, filepath);
      totalDownloaded++;
    } catch (error) {
      console.log(`❌ Failed to download ${filename}: ${error.message}`);
      totalFailed++;
    }
  }
  
  // Download ProCraft images
  console.log('\n🏠 Downloading ProCraft Phoenix cabinet images...');
  for (let i = 0; i < partnerImages.procraft.length; i++) {
    const url = partnerImages.procraft[i];
    const filename = `procraft-${i + 1}-${path.basename(url)}`;
    const filepath = path.join(cabinetsDir, filename);
    
    try {
      await downloadImage(url, filepath);
      totalDownloaded++;
    } catch (error) {
      console.log(`❌ Failed to download ${filename}: ${error.message}`);
      totalFailed++;
    }
  }
  
  // Download Sollid images
  console.log('\n🪚 Downloading Sollid Cabinetry images...');
  for (let i = 0; i < partnerImages.sollid.length; i++) {
    const url = partnerImages.sollid[i];
    const filename = `sollid-${i + 1}-${path.basename(url)}`;
    const filepath = path.join(cabinetsDir, filename);
    
    try {
      await downloadImage(url, filepath);
      totalDownloaded++;
    } catch (error) {
      console.log(`❌ Failed to download ${filename}: ${error.message}`);
      totalFailed++;
    }
  }
  
  console.log(`\n🎉 Partner image scraping complete!`);
  console.log(`✅ Successfully downloaded: ${totalDownloaded} images`);
  console.log(`❌ Failed downloads: ${totalFailed} images`);
  console.log(`📁 Images saved to: ${partnerDir}`);
  
  // Create summary file
  const summary = {
    timestamp: new Date().toISOString(),
    partners: {
      'SunStone Surfaces (Stone & Surfaces)': {
        website: 'https://sunstonesurfaces.com/',
        location: '3232 W. Virginia Ave, Phoenix, AZ 85009',
        specialties: ['Quartz', 'Tiles', 'SPC Luxury Vinyl', 'Mosaics', 'Natural Stone'],
        images_downloaded: partnerImages.sunstone.length,
        categories: ['Kitchen', 'Bathroom', 'Flooring', 'Miscellaneous']
      },
      'ProCraft Phoenix (Cabinetry)': {
        website: 'https://procraftphoenix.com/',
        specialties: ['Custom Cabinets', 'Kitchen Cabinetry', 'Bathroom Vanities'],
        images_downloaded: partnerImages.procraft.length
      },
      'Sollid Cabinetry (Premium Cabinets)': {
        website: 'https://sollidcabinetry.com/',
        specialties: ['Premium Cabinetry', 'Custom Built-ins', 'Closet Systems'],
        images_downloaded: partnerImages.sollid.length
      }
    },
    totals: {
      total_downloaded: totalDownloaded,
      total_failed: totalFailed,
      partner_count: 3
    },
    notes: [
      'These are Remodely Arizona\'s trusted partner suppliers',
      'Images showcase quality work and materials available through partnerships',
      'All partners are Arizona-based or serve Arizona market'
    ]
  };
  
  fs.writeFileSync(
    path.join(partnerDir, 'partner-summary.json'),
    JSON.stringify(summary, null, 2)
  );
  
  console.log(`📋 Partner summary saved to: ${path.join(partnerDir, 'partner-summary.json')}`);
}

scrapeAllPartnerImages().catch(console.error);
