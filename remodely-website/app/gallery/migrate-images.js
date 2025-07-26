const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'drrwdgggx',
    api_key: '947268741246623',
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
    let skippedCount = 0;

    for (const image of images) {
        console.log(`🔄 Processing ${image.product_name} (${image.material} - ${image.brand})`);

        // Migrate scene image
        if (image.scene_image_path && !image.scene_cloudinary_url) {
            totalImages++;
            try {
                // Check if file exists first
                const fullPath = path.resolve(image.scene_image_path);

                if (!fs.existsSync(fullPath)) {
                    console.log(`⚠️  File not found: ${fullPath}`);
                    skippedCount++;
                    continue;
                }

                console.log(`📤 Uploading scene image: ${fullPath}`);

                const result = await cloudinary.uploader.upload(fullPath, {
                    folder: 'remodely/countertops/scenes',
                    public_id: `scene-${image._id}`,
                    overwrite: true
                });

                image.scene_cloudinary_url = result.secure_url;
                migratedCount++;

                console.log(`✅ [${migratedCount}] Scene migrated: ${result.secure_url}`);

            } catch (error) {
                errorCount++;
                console.error(`❌ Failed to migrate scene image for ${image.product_name}:`, error.message);
            }
        }

        // Migrate closeup image
        if (image.closeup_image_path && !image.closeup_cloudinary_url) {
            totalImages++;
            try {
                // Check if file exists first
                const fullPath = path.resolve(image.closeup_image_path);

                if (!fs.existsSync(fullPath)) {
                    console.log(`⚠️  File not found: ${fullPath}`);
                    skippedCount++;
                    continue;
                }

                console.log(`📤 Uploading closeup image: ${fullPath}`);

                const result = await cloudinary.uploader.upload(fullPath, {
                    folder: 'remodely/countertops/closeups',
                    public_id: `closeup-${image._id}`,
                    overwrite: true
                });

                image.closeup_cloudinary_url = result.secure_url;
                migratedCount++;

                console.log(`✅ [${migratedCount}] Closeup migrated: ${result.secure_url}`);

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
    console.log(`⚠️  Skipped (file not found): ${skippedCount} images`);
    console.log(`📊 Total images processed: ${totalImages} images`);
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
