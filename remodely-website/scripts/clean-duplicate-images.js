#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the current images.json
const imagesPath = path.join(__dirname, '../data/images.json');
const images = JSON.parse(fs.readFileSync(imagesPath, 'utf8'));

console.log(`Starting with ${images.length} images`);

// Remove duplicates based on Cloudinary public_id and name
const uniqueImages = [];
const seenIds = new Set();
const seenNames = new Set();

images.forEach(image => {
    const publicId = image.cloudinary?.public_id;
    const name = image.name;

    // Skip if we've seen this public_id or exact name before (except for logo)
    if (publicId && seenIds.has(publicId)) {
        console.log(`Removing duplicate public_id: ${publicId}`);
        return;
    }

    if (name && seenNames.has(name) && !name.toLowerCase().includes('logo')) {
        console.log(`Removing duplicate name: ${name}`);
        return;
    }

    // Add proper descriptions based on image names and categories
    if (image.description && image.description.startsWith('Uploaded:')) {
        image.description = generateDescription(image);
    }

    if (publicId) seenIds.add(publicId);
    if (name) seenNames.add(name);
    uniqueImages.push(image);
});

function generateDescription(image) {
    const name = image.name.toLowerCase();
    const category = image.category.toLowerCase();

    // Kitchen-related images
    if (name.includes('kitchen') || category.includes('kitchen')) {
        if (name.includes('remodel') || name.includes('renovation')) {
            return 'Complete kitchen remodel showcasing modern design and professional craftsmanship';
        } else if (name.includes('cabinet')) {
            return 'Custom kitchen cabinetry installation with premium finishes';
        } else if (name.includes('countertop') || name.includes('granite') || name.includes('quartz')) {
            return 'Beautiful countertop installation with professional edge work';
        } else {
            return 'Professional kitchen renovation by RemodelyAz team';
        }
    }

    // Bathroom-related images
    if (name.includes('bathroom') || name.includes('bath') || category.includes('bathroom')) {
        if (name.includes('shower') || name.includes('tile')) {
            return 'Custom bathroom tile and shower installation';
        } else if (name.includes('vanity')) {
            return 'Modern bathroom vanity installation with premium fixtures';
        } else {
            return 'Complete bathroom remodel with luxury finishes';
        }
    }

    // Flooring-related images
    if (name.includes('floor') || name.includes('tile') || name.includes('hardwood')) {
        return 'Professional flooring installation with precise craftsmanship';
    }

    // Cabinet-related images
    if (name.includes('cabinet') || name.includes('cabinetry')) {
        return 'Custom cabinetry installation with premium hardware and finishes';
    }

    // Before/After images
    if (name.includes('before') || name.includes('after')) {
        return 'Transformation showcase - before and after renovation results';
    }

    // General renovation images
    if (name.includes('remodel') || name.includes('renovation')) {
        return 'Professional home renovation project by RemodelyAz';
    }

    // Default description
    return 'Quality home renovation and remodeling work by RemodelyAz professionals';
}

console.log(`Cleaned up to ${uniqueImages.length} unique images`);
console.log(`Removed ${images.length - uniqueImages.length} duplicates`);

// Write the cleaned data back
fs.writeFileSync(imagesPath, JSON.stringify(uniqueImages, null, 2));

console.log('✅ Images cleaned and descriptions updated!');
