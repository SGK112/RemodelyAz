#!/usr/bin/env node

/**
 * Gallery Image Update Utility
 * 
 * This script helps you easily update gallery images to fix mismatches.
 * Usage: node scripts/update-gallery-images.js
 */

const fs = require('fs');
const path = require('path');

// Read current gallery data
const galleryPath = path.join(__dirname, '../data/gallery-projects.json');
const galleryProjects = JSON.parse(fs.readFileSync(galleryPath, 'utf8'));

// Suggested image replacements for better category matching
const imageReplacements = {
    // Kitchen images
    kitchen: [
        'https://images.unsplash.com/photo-1556909048-56e50c5e5462?w=800&q=80', // Modern white kitchen
        'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&q=80', // Contemporary kitchen
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', // Kitchen with island
        'https://images.unsplash.com/photo-1556909048-9196c96fb073?w=800&q=80', // Luxury kitchen
    ],

    // Bathroom images
    bathroom: [
        'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80', // Spa bathroom
        'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80', // Modern bathroom
        'https://images.unsplash.com/photo-1584622781584-8e007d6a23d1?w=800&q=80', // Master bathroom
        'https://images.unsplash.com/photo-1552321554-2b7cd0e9cfcc?w=800&q=80', // Walk-in shower
    ],

    // Countertops images
    countertops: [
        'https://images.unsplash.com/photo-1556909048-3313c35de90a?w=800&q=80', // Butcher block
        'https://images.unsplash.com/photo-1556909114-2509c5e8e792?w=800&q=80', // Quartz countertops
        'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&q=80', // Marble countertops
    ],

    // Tile images
    tile: [
        'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80', // Hexagon tile
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80', // Herringbone tile
        'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&q=80', // Marble tile
        'https://images.unsplash.com/photo-1605300041665-08ed5b80f85d?w=800&q=80', // Large format tile
    ],

    // Cabinet images
    cabinets: [
        'https://images.unsplash.com/photo-1556909114-8213a5b8eacd?w=800&q=80', // Custom cabinets
        'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?w=800&q=80', // Bathroom vanity
        'https://images.unsplash.com/photo-1556909048-f3c5c4d2b1b9?w=800&q=80', // Shaker cabinets
    ],

    // Commercial images
    commercial: [
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80', // Commercial kitchen
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', // Office space
        'https://images.unsplash.com/photo-1556909048-6e50c5e5462?w=800&q=80', // Restaurant kitchen
    ]
};

function analyzeGallery() {
    console.log('=== GALLERY ANALYSIS ===\n');

    const categories = {};

    galleryProjects.forEach(project => {
        if (!categories[project.category]) {
            categories[project.category] = [];
        }
        categories[project.category].push({
            id: project.id,
            title: project.title,
            url: project.url
        });
    });

    Object.keys(categories).forEach(category => {
        console.log(`📁 ${category.toUpperCase()} (${categories[category].length} projects):`);
        categories[category].forEach(project => {
            console.log(`   ${project.id}. ${project.title}`);
        });
        console.log('');
    });
}

function suggestImageUpdates() {
    console.log('=== SUGGESTED IMAGE UPDATES ===\n');

    galleryProjects.forEach(project => {
        const categoryImages = imageReplacements[project.category];
        if (categoryImages) {
            const randomImage = categoryImages[Math.floor(Math.random() * categoryImages.length)];
            if (project.url !== randomImage) {
                console.log(`🔄 ${project.title} (ID: ${project.id})`);
                console.log(`   Current:   ${project.url}`);
                console.log(`   Suggested: ${randomImage}`);
                console.log('');
            }
        }
    });
}

function updateSpecificImage(id, newUrl) {
    const projectIndex = galleryProjects.findIndex(p => p.id === id);
    if (projectIndex === -1) {
        console.log(`❌ Project with ID ${id} not found`);
        return;
    }

    const oldUrl = galleryProjects[projectIndex].url;
    galleryProjects[projectIndex].url = newUrl;

    fs.writeFileSync(galleryPath, JSON.stringify(galleryProjects, null, 4));

    console.log(`✅ Updated "${galleryProjects[projectIndex].title}"`);
    console.log(`   From: ${oldUrl}`);
    console.log(`   To:   ${newUrl}`);
}

// Main execution
if (require.main === module) {
    console.log('🖼️  Gallery Image Update Utility\n');

    analyzeGallery();
    suggestImageUpdates();

    console.log('💡 To update a specific image:');
    console.log('   node scripts/update-gallery-images.js update <id> <new-url>');
    console.log('');
    console.log('📋 Example:');
    console.log('   node scripts/update-gallery-images.js update 22 https://new-image-url.jpg');
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args[0] === 'update' && args[1] && args[2]) {
    updateSpecificImage(parseInt(args[1]), args[2]);
}

module.exports = { analyzeGallery, suggestImageUpdates, updateSpecificImage };
