const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'drrwdgggx',
  api_key: '947268741246623',
  api_secret: 'wCPN-vlM72Rc4X8kg7KIubUZ2I0'
});

// Professional placeholder image URLs that we'll upload to your Cloudinary
const placeholderImages = {
  // People/Testimonials - Using professional headshot style photos
  'remodely-people/sarah-johnson': 'https://images.unsplash.com/photo-1494790108755-2616b09c3c1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  'remodely-people/michael-chen': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  'remodely-people/emily-rodriguez': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  'remodely-people/david-wilson': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  'remodely-people/lisa-thompson': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  'remodely-people/james-anderson': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',

  // Project Images - High-quality remodeling photos
  'remodely-projects/kitchen-modern-1': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'remodely-projects/kitchen-classic-1': 'https://images.unsplash.com/photo-1582719371507-31ad96e7b3e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'remodely-projects/bathroom-luxury-1': 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'remodely-projects/bathroom-modern-1': 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'remodely-projects/living-room-1': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'remodely-projects/bedroom-1': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'remodely-projects/office-1': 'https://images.unsplash.com/photo-1571069423917-8b4b3a4c0a2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'remodely-projects/outdoor-patio-1': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Blog Images
  'remodely-blog/kitchen-trends-2024': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'remodely-blog/bathroom-renovation-tips': 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'remodely-blog/home-value-increase': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'remodely-blog/sustainable-materials': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'remodely-blog/small-space-solutions': 'https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'remodely-blog/budget-renovation': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Career Images
  'remodely-career/team-meeting-1': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'remodely-career/construction-site-1': 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
};

async function uploadPlaceholderImages() {
  console.log('🚀 Starting to upload placeholder images to your Cloudinary account...');

  let successCount = 0;
  let errorCount = 0;

  for (const [publicId, sourceUrl] of Object.entries(placeholderImages)) {
    try {
      console.log(`📤 Uploading: ${publicId}...`);

      const result = await cloudinary.uploader.upload(sourceUrl, {
        public_id: publicId,
        folder: publicId.includes('/') ? publicId.split('/')[0] : 'remodely',
        tags: ['remodely', 'website', 'placeholder'],
        quality: 'auto',
        format: 'webp'
      });

      console.log(`✅ Success: ${publicId} -> ${result.secure_url}`);
      successCount++;

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
      console.log(`❌ Failed: ${publicId} - ${error.message}`);
      errorCount++;
    }
  }

  console.log(`\n📊 Upload Summary:`);
  console.log(`✅ Successful uploads: ${successCount}`);
  console.log(`❌ Failed uploads: ${errorCount}`);
  console.log(`📦 Total images: ${Object.keys(placeholderImages).length}`);

  if (successCount > 0) {
    console.log(`\n🎉 Your Cloudinary account now has ${successCount} new images!`);
    console.log(`🌐 All images are optimized as WebP format for fast loading`);
    console.log(`🔗 Images are accessible via your Cloudinary URLs`);
  }
}

// Run the upload
uploadPlaceholderImages().catch(console.error);
