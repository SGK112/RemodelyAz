#!/usr/bin/env node

/**
 * Simple Gallery Image Updater
 * Usage: node update-image.js <project-id> <new-image-url>
 * Example: node update-image.js 22 https://surprisegranite.com/image.jpg
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length !== 2) {
    console.log('🖼️  Gallery Image Updater\n');
    console.log('Usage: node update-image.js <project-id> <new-image-url>\n');
    console.log('Examples:');
    console.log('  node update-image.js 22 https://surprisegranite.com/butcher-block.jpg');
    console.log('  node update-image.js 17 https://images.unsplash.com/photo-123456789\n');

    // Show current projects
    try {
        const galleryPath = path.join(__dirname, '../data/gallery-projects.json');
        const projects = JSON.parse(fs.readFileSync(galleryPath, 'utf8'));

        console.log('📋 Current Projects:');
        projects.forEach(project => {
            console.log(`  ${project.id}. ${project.title} (${project.category})`);
        });
    } catch (error) {
        console.log('❌ Could not load current projects');
    }

    process.exit(1);
}

const [projectId, newUrl] = args;
const id = parseInt(projectId);

if (isNaN(id)) {
    console.log('❌ Project ID must be a number');
    process.exit(1);
}

if (!newUrl.startsWith('http')) {
    console.log('❌ Image URL must start with http:// or https://');
    process.exit(1);
}

try {
    const galleryPath = path.join(__dirname, '../data/gallery-projects.json');
    const publicPath = path.join(__dirname, '../public/data/gallery-projects.json');

    // Load current projects
    const projects = JSON.parse(fs.readFileSync(galleryPath, 'utf8'));

    // Find the project
    const projectIndex = projects.findIndex(p => p.id === id);
    if (projectIndex === -1) {
        console.log(`❌ Project with ID ${id} not found`);
        process.exit(1);
    }

    const project = projects[projectIndex];
    const oldUrl = project.url;

    // Update the URL
    projects[projectIndex].url = newUrl;

    // Save to both locations
    fs.writeFileSync(galleryPath, JSON.stringify(projects, null, 4));
    fs.writeFileSync(publicPath, JSON.stringify(projects, null, 4));

    console.log('✅ Image updated successfully!');
    console.log(`📝 Project: ${project.title}`);
    console.log(`🔗 Old URL: ${oldUrl}`);
    console.log(`🔗 New URL: ${newUrl}`);
    console.log('\n🎯 Changes saved to:');
    console.log(`   • ${galleryPath}`);
    console.log(`   • ${publicPath}`);
    console.log('\n💡 Refresh your gallery page to see the changes!');

} catch (error) {
    console.log('❌ Error updating image:', error.message);
    process.exit(1);
}
