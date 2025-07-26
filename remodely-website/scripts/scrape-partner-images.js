const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Partner cabinet images from ProCraft Phoenix and Sollid Cabinetry
const partnerImages = [
  // ProCraft Phoenix Facebook Images (high-quality kitchen/bathroom cabinet installations)
  {
    url: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/521280325_717599664486684_7337680788597074769_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=D9F3Vk71TYYQ7kNvwHyKaoD&_nc_oc=AdmByH5nIyd5IVbYX9cPTeiLOwwdBGnfDrvAtczUQ_nINcWcDkPUGaSuNP6imDZ4-CY&_nc_zt=23&_nc_ht=scontent.xx&edm=AKK4YLsEAAAA&_nc_gid=E5dJ4wj7UhZcwGMwr57ZCg',
    name: 'ProCraft Phoenix Kitchen Cabinets',
    category: 'Kitchen',
    description: 'Premium kitchen cabinetry installation featuring ProCraft quality craftsmanship'
  },
  {
    url: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/519655547_711614701751847_1156294749327657096_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ITWARki4t3gQ7kNvwF5PBex&_nc_oc=Adl9T0bXKYD4FvmcPC_EhEUhmlsrjLDyUHi9PJvAGhPXwkYVWgQyJnLxusFeTrJhPes&_nc_zt=23&_nc_ht=scontent.xx&edm=AKK4YLsEAAAA&_nc_gid=E5dJ4wj7UhZcwGMwr57',
    name: 'Liberty Shaker Karmel Cabinets',
    category: 'Kitchen',
    description: 'Popular Liberty Shaker Karmel style kitchen cabinetry by ProCraft Phoenix'
  },
  {
    url: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/518534968_711586855087965_4757015065754855003_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=MzAYISzUEUMQ7kNvwF_mMMz&_nc_oc=AdmOitmjDJ1ymiTc5SPKahdhshnHqhkeY0m-Y9vZKW5WX8KLJzHULa3XLua2ODmcWTA&_nc_zt=23&_nc_ht=scontent.xx&edm=AKK4YLsEAAAA&_nc_gid=E5dJ4wj7UhZcwGMwr57ZCg&o',
    name: 'Milania Bathroom Vanity',
    category: 'Bathroom',
    description: 'Elegant Milania line bathroom vanity installation with modern design'
  },
  {
    url: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/518583969_711586898421294_5478364283109729849_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=4d-EGhZHz-EQ7kNvwGkKj0d&_nc_oc=AdllV-FkHikmi2lBIHHDiQ5X8WiFwBI15fSvaBvL3OFZqN5jik4WqVdXJSAbzc_HW9w&_nc_zt=23&_nc_ht=scontent.xx&edm=AKK4YLsEAAAA&_nc_gid=E5dJ4wj7UhZcwGMwr57ZCg&oh=00_AfRln3GBMT',
    name: 'Contemporary Bathroom Design',
    category: 'Bathroom',
    description: 'Modern bathroom remodel featuring premium ProCraft cabinetry'
  },
  {
    url: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/519491789_711586895087961_908732400031453599_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=PKF8FxOmgaMQ7kNvwFeeEdz&_nc_oc=AdkqdVI9lmpvQ15K11nvsQguhULLOwaB31QBeiZZFA6YFEKQsOz81yH0KofkrOtGb-w&_nc_zt=23&_nc_ht=scontent.xx&edm=AKK4YLsEAAAA&_nc_gid=E5dJ4wj7UhZcwGMwr57ZCg&oh=00_AfSDUCaAD24exOSJZtYLEhd3eoQ-k',
    name: 'Master Bathroom Suite',
    category: 'Bathroom',
    description: 'Luxury master bathroom with custom ProCraft cabinetry and premium finishes'
  },
  {
    url: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/517737540_711586915087959_1052029453460985488_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Bz9kJZq6KAYQ7kNvwF1Grxn&_nc_oc=AdmUJ4PWPVGh943opFa2f4TYGv0uc-mHpbVXtf6d94U9666yqoKbmQZ2ysS-9BnGiKY&_nc_zt=23&_nc_ht=scontent.xx&edm=AKK4YLsEAAAA&_nc_gid=E5dJ4wj7UhZcwGMwr57ZCg&oh=00_AfRgz6t62qmWA56',
    name: 'Bathroom Vanity Detail',
    category: 'Bathroom',
    description: 'Close-up view of custom bathroom vanity craftsmanship'
  },
  {
    url: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/518079065_711579521755365_2544938586849579893_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Yxx0KIxfmiIQ7kNvwFVt7W7&_nc_oc=AdmYE3P08aStbidMZsGydZAeIF7-HAPx6uv_MfMz8po5wwmHQWo0BGdVseoBF5cC8OI&_nc_zt=23&_nc_ht=scontent.xx&edm=AKK4YLsEAAAA&_nc_gid=E5dJ4wj7UhZcwGMwr57ZCg&oh',
    name: 'Black Milania Kitchen Transformation',
    category: 'Kitchen',
    description: 'Dramatic kitchen transformation featuring sleek black ProCraft Milania cabinets'
  },

  // Sollid Cabinetry Gallery Images (professional kitchen and bathroom installations)
  {
    url: 'https://sollidcabinetry.com/wp-content/uploads/2024/06/Shane-Baker-Studios-11-of-25.jpg',
    name: 'Chandler Oyster Kitchen',
    category: 'Kitchen',
    description: 'Beautiful Chandler Oyster kitchen cabinets by Sollid Cabinetry'
  },
  {
    url: 'https://sollidcabinetry.com/wp-content/uploads/2024/06/0X8A4463.png',
    name: 'Alpine Fawn Cabinetry',
    category: 'Kitchen',
    description: 'Elegant Alpine Fawn kitchen cabinet installation'
  },
  {
    url: 'https://sollidcabinetry.com/wp-content/uploads/2024/06/Shane-Baker-Studios-Menlo-7-of-12.jpg',
    name: 'Newport Custom Paint Kitchen',
    category: 'Kitchen',
    description: 'Custom painted kitchen cabinets in Newport style'
  },
  {
    url: 'https://sollidcabinetry.com/wp-content/uploads/2024/06/Shane-Baker-Studios-Washington-8-of-12.jpg',
    name: 'Shaker White Kitchen',
    category: 'Kitchen',
    description: 'Classic Shaker White kitchen cabinet design'
  },
  {
    url: 'https://sollidcabinetry.com/wp-content/uploads/2024/06/0X8A2720.png',
    name: 'Davis Honey Cabinets',
    category: 'Kitchen',
    description: 'Warm Davis Honey kitchen cabinetry installation'
  },
  {
    url: 'https://sollidcabinetry.com/wp-content/uploads/2024/06/0X8A2373.png',
    name: 'Alpine Dove White',
    category: 'Kitchen',
    description: 'Clean Alpine Dove White kitchen cabinet design'
  },
  {
    url: 'https://sollidcabinetry.com/wp-content/uploads/2022/03/Jnsv0OqE.jpeg',
    name: 'Newport Black Kitchen',
    category: 'Kitchen',
    description: 'Bold Newport Black kitchen cabinetry with modern appeal'
  },
  {
    url: 'https://sollidcabinetry.com/wp-content/uploads/2022/03/shane-baker-studios-sollid-cabinetry-web-4.jpg',
    name: 'Newport Grey Contemporary',
    category: 'Kitchen',
    description: 'Contemporary kitchen featuring Newport Grey cabinets'
  },
  {
    url: 'https://sollidcabinetry.com/wp-content/uploads/2022/03/Kitchen-6-scaled.jpg',
    name: 'Beachwood Kitchen Design',
    category: 'Kitchen',
    description: 'Natural Beachwood kitchen cabinet installation'
  },
  {
    url: 'https://sollidcabinetry.com/wp-content/uploads/2022/03/Shane-Baker-Studios-web-4.jpg',
    name: 'Metro Frost Modern Kitchen',
    category: 'Kitchen',
    description: 'Sleek Metro Frost kitchen with contemporary styling'
  },
  {
    url: 'https://sollidcabinetry.com/wp-content/uploads/2022/03/shane-baker-studios-sollid-cabinetry-web-11.jpg',
    name: 'Newport Grey Island Kitchen',
    category: 'Kitchen',
    description: 'Spacious kitchen with Newport Grey island cabinetry'
  },
  {
    url: 'https://sollidcabinetry.com/wp-content/uploads/2022/03/Shane-Baker-Studios-Menlo-1-of-12-scaled.jpg',
    name: 'Newport Custom Grey Luxury',
    category: 'Kitchen',
    description: 'Luxury kitchen featuring Newport Custom Grey cabinets'
  },
  {
    url: 'https://sollidcabinetry.com/wp-content/uploads/2022/03/Shane-Baker-Studios-Heritage-1-of-12-scaled.jpg',
    name: 'Napa Iron and White',
    category: 'Kitchen',
    description: 'Striking two-tone Napa Iron and White kitchen design'
  },
  {
    url: 'https://sollidcabinetry.com/wp-content/uploads/2022/03/Shane-Baker-Studios-Heritage-3-of-12-scaled.jpg',
    name: 'Two-Tone Kitchen Design',
    category: 'Kitchen',
    description: 'Beautiful two-tone kitchen with Napa Iron and White cabinets'
  },
  {
    url: 'https://sollidcabinetry.com/wp-content/uploads/2022/03/DSC_0427-scaled.jpg',
    name: 'Cambria Saddle Kitchen',
    category: 'Kitchen',
    description: 'Warm Cambria Saddle kitchen cabinet installation'
  },
  {
    url: 'https://sollidcabinetry.com/wp-content/uploads/2022/03/shane-baker-studios-Sollid-web-2-3.jpg',
    name: 'Tahoe Ash Natural Kitchen',
    category: 'Kitchen',
    description: 'Natural wood Tahoe Ash kitchen cabinetry'
  },
  {
    url: 'https://sollidcabinetry.com/wp-content/uploads/2022/03/20180824145837042320000000-o.jpg',
    name: 'Cambria Linen Kitchen',
    category: 'Kitchen',
    description: 'Soft Cambria Linen kitchen cabinet design'
  },
  {
    url: 'https://sollidcabinetry.com/wp-content/uploads/2022/03/shane-baker-studios-real-estate-photographer-sollid-cabinetry-4-scaled.jpg',
    name: 'Tahoe Ash Modern Kitchen',
    category: 'Kitchen',
    description: 'Modern kitchen design with Tahoe Ash cabinetry'
  },
  {
    url: 'https://sollidcabinetry.com/wp-content/uploads/2022/03/Shane-Baker-Studios-Sollid-College-Web-1.jpg',
    name: 'Shaker White Traditional',
    category: 'Kitchen',
    description: 'Traditional Shaker White kitchen with timeless appeal'
  }
];

// Create download directory
const downloadDir = path.join(__dirname, '..', 'public', 'uploads', 'partner-cabinets');
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

// Download function
function downloadImage(imageUrl, filename) {
  return new Promise((resolve, reject) => {
    const protocol = imageUrl.startsWith('https') ? https : http;
    const file = fs.createWriteStream(path.join(downloadDir, filename));
    
    protocol.get(imageUrl, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ Downloaded: ${filename}`);
          resolve(filename);
        });
      } else {
        console.error(`❌ Failed to download ${filename}: HTTP ${response.statusCode}`);
        resolve(null);
      }
    }).on('error', (err) => {
      console.error(`❌ Error downloading ${filename}:`, err.message);
      resolve(null);
    });
  });
}

// Main download function
async function downloadPartnerImages() {
  console.log('🔄 Starting partner cabinet image downloads...');
  console.log(`📁 Download directory: ${downloadDir}`);
  
  const downloadPromises = partnerImages.map((image, index) => {
    const extension = image.url.includes('.png') ? '.png' : 
                     image.url.includes('.avif') ? '.avif' : '.jpg';
    const filename = `partner-${index + 1}-${image.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}${extension}`;
    
    return downloadImage(image.url, filename).then(result => {
      if (result) {
        return {
          ...image,
          filename: result,
          localPath: `/uploads/partner-cabinets/${result}`,
          downloadedAt: new Date().toISOString()
        };
      }
      return null;
    });
  });

  const results = await Promise.all(downloadPromises);
  const successfulDownloads = results.filter(Boolean);
  
  console.log(`\n✅ Successfully downloaded ${successfulDownloads.length} out of ${partnerImages.length} images`);
  
  // Save metadata
  const metadataFile = path.join(downloadDir, 'partner-images-metadata.json');
  fs.writeFileSync(metadataFile, JSON.stringify(successfulDownloads, null, 2));
  console.log(`📋 Metadata saved to: ${metadataFile}`);
  
  return successfulDownloads;
}

// Run if called directly
if (require.main === module) {
  downloadPartnerImages().catch(console.error);
}

module.exports = { downloadPartnerImages, partnerImages };
