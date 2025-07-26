/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const path = require('path');

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'drrwdgggx',
    api_key: '947268741246623', // Fixed: wrapped in quotes
    api_secret: 'wCPN-vlM72Rc4X8kg7KIubUZ2I0',
});

// Connect to MongoDB - using 'countertops' database where the 874 images are located
mongoose.connect('mongodb://localhost:27017/countertops', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define schema for images collection (the one with 874 images)
const ImageSchema = new mongoose.Schema({
    product_name: String,
    material: String,
    brand: String,
    veining: String,
    primary_color: String,
    secondary_color: String,
    scene_image_path: String,
    closeup_image_path: String,
    scene_cloudinary_url: String, // New field for migrated scene image
    closeup_cloudinary_url: String // New field for migrated closeup image
});

const ImageModel = mongoose.model('images', ImageSchema);

async function migrateCountertopImages() {
    console.log('🔍 Starting countertop image migration...\n');

    // Find all images that haven't been migrated yet
    const images = await ImageModel.find({
        $or: [
            { scene_image_path: { $exists: true, $ne: null }, scene_cloudinary_url: { $exists: false } },
            { closeup_image_path: { $exists: true, $ne: null }, closeup_cloudinary_url: { $exists: false } }
        ]
    });

    if (images.length === 0) {
        console.log('❌ No images found to migrate');
        return;
    }

    console.log(`📊 Found ${images.length} image documents to process\n`);

    let totalImages = 0;
    let migratedCount = 0;
    let errorCount = 0;

    for (const image of images) {
        console.log(`🔄 Processing ${image.product_name} (${image.material} - ${image.brand})`);

        // Migrate scene image
        if (image.scene_image_path && !image.scene_cloudinary_url) {
            totalImages++;
            try {
                console.log(`� Uploading scene image: ${image.scene_image_path}`);

                const result = await cloudinary.uploader.upload(image.scene_image_path, {
                    folder: 'remodely/countertops/scenes',
                    public_id: `scene-${image._id}`,
                    overwrite: true
                });

                image.scene_cloudinary_url = result.secure_url;
                migratedCount++;

                console.log(`✅ [${migratedCount}/${totalImages}] Scene migrated: ${result.secure_url}`);

            } catch (error) {
                errorCount++;
                console.error(`❌ Failed to migrate scene image for ${image.product_name}:`, error.message);
            }
        }

        // Migrate closeup image
        if (image.closeup_image_path && !image.closeup_cloudinary_url) {
            totalImages++;
            try {
                console.log(`📤 Uploading closeup image: ${image.closeup_image_path}`);

                const result = await cloudinary.uploader.upload(image.closeup_image_path, {
                    folder: 'remodely/countertops/closeups',
                    public_id: `closeup-${image._id}`,
                    overwrite: true
                });

                image.closeup_cloudinary_url = result.secure_url;
                migratedCount++;

                console.log(`✅ [${migratedCount}/${totalImages}] Closeup migrated: ${result.secure_url}`);

            } catch (error) {
                errorCount++;
                console.error(`❌ Failed to migrate closeup image for ${image.product_name}:`, error.message);
            }
        }

        // Save the updated document
        try {
            await image.save();
            console.log(`💾 Saved ${image.product_name}\n`);
        } catch (error) {
            console.error(`❌ Failed to save ${image.product_name}:`, error.message);
        }
    }

    console.log('\n=== MIGRATION SUMMARY ===');
    console.log(`✅ Successfully migrated: ${migratedCount} images`);
    console.log(`❌ Failed migrations: ${errorCount} images`);
    console.log(`📊 Total images found: ${totalImages} images`);
    console.log(`📁 Scene images in: remodely/countertops/scenes`);
    console.log(`📁 Closeup images in: remodely/countertops/closeups`);
}

migrateCountertopImages().then(() => {
    console.log('\n🎉 Migration complete!');
    mongoose.disconnect();
}).catch((error) => {
    console.error('💥 Migration failed:', error);
    mongoose.disconnect();
});

// Call the migration function
migrateCountertopImages();
