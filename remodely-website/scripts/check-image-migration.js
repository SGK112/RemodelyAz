#!/usr/bin/env node

/**
 * Image Migration Helper
 * This script helps identify and migrate Unsplash URLs to Cloudinary
 */

const fs = require('fs');
const path = require('path');

// Cloudinary base URL for our account
const CLOUDINARY_BASE = 'https://res.cloudinary.com/drrwdgggx/image/upload';

// Mapping of Unsplash URLs to Cloudinary equivalents
const IMAGE_MIGRATION_MAP = {
  // Kitchen images
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    `${CLOUDINARY_BASE}/v1/remodely-projects/kitchen-modern-1`,
  'https://images.unsplash.com/photo-1582719371507-31ad96e7b3e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80':
    `${CLOUDINARY_BASE}/v1/remodely-projects/kitchen-classic-1`,
  'https://images.unsplash.com/photo-1582719371507-31ad96e7b3e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    `${CLOUDINARY_BASE}/v1/remodely-projects/kitchen-classic-1`,

  // Bathroom images
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    `${CLOUDINARY_BASE}/v1/remodely-projects/bathroom-luxury-1`,
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80':
    `${CLOUDINARY_BASE}/v1/remodely-projects/bathroom-luxury-1`,
  'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80':
    `${CLOUDINARY_BASE}/v1/remodely-projects/bathroom-modern-1`,
  'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    `${CLOUDINARY_BASE}/v1/remodely-projects/bathroom-modern-1`,

  // Living room images
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    `${CLOUDINARY_BASE}/v1/remodely-projects/living-room-1`,
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80':
    `${CLOUDINARY_BASE}/v1/remodely-projects/living-room-1`,

  // Bedroom images
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    `${CLOUDINARY_BASE}/v1/remodely-projects/bedroom-1`,
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80':
    `${CLOUDINARY_BASE}/v1/remodely-projects/bedroom-1`,

  // Office/Commercial images
  'https://images.unsplash.com/photo-1571069423917-8b4b3a4c0a2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    `${CLOUDINARY_BASE}/v1/remodely-projects/office-1`,

  // Outdoor images
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    `${CLOUDINARY_BASE}/v1/remodely-projects/outdoor-patio-1`,

  // Additional mapping for other images
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    `${CLOUDINARY_BASE}/v1/remodely-blog/home-value-increase`,
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80':
    `${CLOUDINARY_BASE}/v1/remodely-blog/home-value-increase`,
};

function findFilesWithUnsplash(dir, fileExtensions = ['.tsx', '.ts', '.js', '.jsx']) {
  const results = [];

  function searchDir(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        searchDir(fullPath);
      } else if (stat.isFile() && fileExtensions.some(ext => item.endsWith(ext))) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('images.unsplash.com')) {
          const matches = content.match(/https:\/\/images\.unsplash\.com[^\s'"]+/g);
          if (matches) {
            results.push({
              file: fullPath,
              matches: matches
            });
          }
        }
      }
    }
  }

  searchDir(dir);
  return results;
}

function generateMigrationReport() {
  console.log('🔍 Scanning for Unsplash URLs...\n');

  const files = findFilesWithUnsplash(process.cwd());

  console.log(`Found ${files.length} files with Unsplash URLs:\n`);

  files.forEach(({ file, matches }) => {
    console.log(`📁 ${file.replace(process.cwd(), '.')}`);
    matches.forEach(match => {
      const cloudinaryUrl = IMAGE_MIGRATION_MAP[match];
      console.log(`  🔗 ${match}`);
      if (cloudinaryUrl) {
        console.log(`  ✅ Maps to: ${cloudinaryUrl}`);
      } else {
        console.log(`  ⚠️  No Cloudinary equivalent found`);
      }
    });
    console.log('');
  });

  console.log('📊 Migration Summary:');
  const totalUrls = files.reduce((sum, file) => sum + file.matches.length, 0);
  const mappedUrls = files.reduce((sum, file) =>
    sum + file.matches.filter(url => IMAGE_MIGRATION_MAP[url]).length, 0
  );

  console.log(`  Total Unsplash URLs: ${totalUrls}`);
  console.log(`  Ready for migration: ${mappedUrls}`);
  console.log(`  Need manual review: ${totalUrls - mappedUrls}`);
}

if (require.main === module) {
  generateMigrationReport();
}

module.exports = {
  IMAGE_MIGRATION_MAP,
  findFilesWithUnsplash,
  generateMigrationReport
};
