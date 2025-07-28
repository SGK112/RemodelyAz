#!/usr/bin/env node

/**
 * Bulk Image Migration Script
 * Automatically replaces Unsplash URLs with Cloudinary equivalents
 */

const fs = require('fs');
const path = require('path');

// Import mapping from our migration analysis
const IMAGE_MIGRATION_MAP = {
  // Kitchen images
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    'SITE_IMAGES.blog.kitchen_trends',
  'https://images.unsplash.com/photo-1582719371507-31ad96e7b3e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80':
    'SITE_IMAGES.projects.kitchen_classic',
  'https://images.unsplash.com/photo-1582719371507-31ad96e7b3e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    'SITE_IMAGES.projects.kitchen_classic',

  // Bathroom images
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    'SITE_IMAGES.projects.bathroom_luxury',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80':
    'SITE_IMAGES.projects.bathroom_luxury',
  'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80':
    'SITE_IMAGES.projects.bathroom_modern',
  'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    'SITE_IMAGES.projects.bathroom_modern',

  // Living room images
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    'SITE_IMAGES.projects.living_room',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80':
    'SITE_IMAGES.projects.living_room',

  // Bedroom images
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    'SITE_IMAGES.projects.bedroom',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80':
    'SITE_IMAGES.projects.bedroom',

  // Office/Commercial images
  'https://images.unsplash.com/photo-1571069423917-8b4b3a4c0a2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    'SITE_IMAGES.projects.office',

  // Outdoor images
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    'SITE_IMAGES.projects.outdoor_patio',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80':
    'SITE_IMAGES.projects.outdoor_patio',

  // Additional mapping for other images
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    'SITE_IMAGES.blog.home_value',
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80':
    'SITE_IMAGES.blog.home_value',

  // Additional fallbacks for unmapped images
  'https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    'SITE_IMAGES.blog.small_spaces',
  'https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80':
    'SITE_IMAGES.blog.small_spaces',
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80':
    'SITE_IMAGES.blog.budget_renovation',
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    'SITE_IMAGES.blog.budget_renovation',
  'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80':
    'SITE_IMAGES.projects.bathroom_luxury',
  'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80':
    'SITE_IMAGES.projects.bathroom_luxury'
};

function migrateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // Add SITE_IMAGES import if not present
    if (content.includes('import') && !content.includes('SITE_IMAGES')) {
      // Find the last import line
      const importRegex = /import[^;]+;/g;
      const imports = content.match(importRegex);
      if (imports && imports.length > 0) {
        const lastImport = imports[imports.length - 1];
        const lastImportIndex = content.lastIndexOf(lastImport) + lastImport.length;

        content = content.slice(0, lastImportIndex) +
          '\nimport { SITE_IMAGES } from \'@/lib/site-images\'' +
          content.slice(lastImportIndex);
        hasChanges = true;
      }
    }

    // Replace URLs
    for (const [unsplashUrl, cloudinaryRef] of Object.entries(IMAGE_MIGRATION_MAP)) {
      if (content.includes(unsplashUrl)) {
        // Replace quoted URLs with Cloudinary references
        content = content.replace(
          new RegExp(`['"\`]${unsplashUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"\`]`, 'g'),
          cloudinaryRef
        );
        hasChanges = true;
      }
    }

    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
      return true;
    } else {
      console.log(`⏭️  No changes needed: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function findAndMigrateFiles(directory, extensions = ['.tsx', '.ts', '.js', '.jsx']) {
  let totalFiles = 0;
  let updatedFiles = 0;

  function processDirectory(dir) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        processDirectory(fullPath);
      } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
        totalFiles++;
        if (migrateFile(fullPath)) {
          updatedFiles++;
        }
      }
    }
  }

  processDirectory(directory);

  console.log(`\n📊 Migration Summary:`);
  console.log(`   Total files processed: ${totalFiles}`);
  console.log(`   Files updated: ${updatedFiles}`);
  console.log(`   Files unchanged: ${totalFiles - updatedFiles}`);
}

if (require.main === module) {
  console.log('🚀 Starting bulk image migration...\n');

  // Process specific directories
  const directories = [
    './app/blog',
    './app/services',
    './lib'
  ];

  directories.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`\n📁 Processing ${dir}...`);
      findAndMigrateFiles(dir);
    }
  });

  console.log('\n✨ Migration complete!');
}

module.exports = { migrateFile, findAndMigrateFiles, IMAGE_MIGRATION_MAP };
