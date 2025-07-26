const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'drrwdgggx',
    api_key: '947268741246623',
    api_secret: 'wCPN-vlM72Rc4X8kg7KIubUZ2I0',
});

// Schema for countertops database images
const CountertopImageSchema = new mongoose.Schema({
    product_name: String,
    material: String,
    brand: String,
    veining: String,
    primary_color: String,
    secondary_color: String,
    scene_image_path: String,
    closeup_image_path: String,
    scene_cloudinary_url: String,
    closeup_cloudinary_url: String
});

// Schema for remodely database images
const RemodelyImageSchema = new mongoose.Schema({
    product_name: String,
    material: String,
    brand: String,
    veining: String,
    primary_color: String,
    secondary_color: String,
    scene_image_path: String,
    closeup_image_path: String,
    scene_cloudinary_url: String,
    closeup_cloudinary_url: String,
    // Add fields for RemodelyAz project structure
    src: String, // for compatibility with existing gallery structure
    alt: String,
    category: String,
    tags: [String],
    migrated_at: { type: Date, default: Date.now }
});

async function migrateCountertopsToRemodely() {
    console.log('🔄 Starting migration from countertops to remodely database...\n');

    let countertopsConn, remodelyConn;

    try {
        // Connect to both databases
        countertopsConn = mongoose.createConnection('mongodb://localhost:27017/countertops');
        remodelyConn = mongoose.createConnection('mongodb://localhost:27017/remodely');

        const CountertopImage = countertopsConn.model('images', CountertopImageSchema);
        const RemodelyImage = remodelyConn.model('images', RemodelyImageSchema);

        // Get all images from countertops database
        const countertopImages = await CountertopImage.find({});
        console.log(`📊 Found ${countertopImages.length} images in countertops database`);

        // Check how many already exist in remodely
        const existingCount = await RemodelyImage.countDocuments();
        console.log(`📊 Currently ${existingCount} images in remodely database`);

        let migratedCount = 0;
        let skippedCount = 0;
        let errorCount = 0;

        for (const image of countertopImages) {
            try {
                console.log(`🔄 Processing: ${image.product_name} (${image.material})`);

                // Check if already exists in remodely database
                const existingImage = await RemodelyImage.findOne({ product_name: image.product_name });

                if (existingImage) {
                    console.log(`⏭️  Already exists: ${image.product_name}`);
                    skippedCount++;
                    continue;
                }

                // Create new document for remodely database
                const newImage = new RemodelyImage({
                    product_name: image.product_name,
                    material: image.material,
                    brand: image.brand,
                    veining: image.veining,
                    primary_color: image.primary_color,
                    secondary_color: image.secondary_color,
                    scene_image_path: image.scene_image_path,
                    closeup_image_path: image.closeup_image_path,
                    scene_cloudinary_url: image.scene_cloudinary_url,
                    closeup_cloudinary_url: image.closeup_cloudinary_url,
                    // Add compatibility fields
                    src: image.scene_cloudinary_url || image.scene_image_path,
                    alt: `${image.product_name} - ${image.material} by ${image.brand}`,
                    category: 'countertops',
                    tags: [image.material.toLowerCase(), image.brand.toLowerCase()].filter(Boolean)
                });

                await newImage.save();
                migratedCount++;
                console.log(`✅ Migrated: ${image.product_name}`);

            } catch (error) {
                errorCount++;
                console.error(`❌ Failed to migrate ${image.product_name}:`, error.message);
            }
        }

        console.log('\n=== MIGRATION SUMMARY ===');
        console.log(`✅ Successfully migrated: ${migratedCount} images`);
        console.log(`⏭️  Already existed: ${skippedCount} images`);
        console.log(`❌ Failed migrations: ${errorCount} images`);
        console.log(`📊 Total processed: ${countertopImages.length} images`);

        // Now check Cloudinary status
        const imagesWithCloudinary = await RemodelyImage.countDocuments({
            $or: [
                { scene_cloudinary_url: { $exists: true, $ne: null } },
                { closeup_cloudinary_url: { $exists: true, $ne: null } }
            ]
        });

        console.log(`\n☁️  CLOUDINARY STATUS:`);
        console.log(`📊 Images with Cloudinary URLs: ${imagesWithCloudinary}`);
        console.log(`📊 Images needing Cloudinary upload: ${await RemodelyImage.countDocuments()} total`);

    } catch (error) {
        console.error('💥 Migration failed:', error);
    } finally {
        if (countertopsConn) await countertopsConn.close();
        if (remodelyConn) await remodelyConn.close();
        console.log('\n🎉 Migration process complete!');
    }
}

// Function to upload images to Cloudinary (if they have valid paths or URLs)
async function uploadToCloudinary() {
    console.log('☁️  Starting Cloudinary upload process...\n');

    const remodelyConn = mongoose.createConnection('mongodb://localhost:27017/remodely');
    const RemodelyImage = remodelyConn.model('images', RemodelyImageSchema);

    try {
        // Find images that need Cloudinary URLs
        const imagesToUpload = await RemodelyImage.find({
            $and: [
                {
                    $or: [
                        { scene_image_path: { $exists: true, $ne: null } },
                        { closeup_image_path: { $exists: true, $ne: null } }
                    ]
                },
                {
                    $or: [
                        { scene_cloudinary_url: { $exists: false } },
                        { closeup_cloudinary_url: { $exists: false } }
                    ]
                }
            ]
        });

        console.log(`📊 Found ${imagesToUpload.length} images needing Cloudinary upload`);

        let uploadedCount = 0;
        let errorCount = 0;

        for (const image of imagesToUpload) {
            console.log(`🔄 Processing uploads for: ${image.product_name}`);

            // Upload scene image if path exists and no Cloudinary URL
            if (image.scene_image_path && !image.scene_cloudinary_url) {
                try {
                    // For now, just create placeholder URLs since we don't have actual files
                    // In a real scenario, you'd upload the actual file
                    console.log(`⚠️  Would upload scene: ${image.scene_image_path}`);
                    // const result = await cloudinary.uploader.upload(image.scene_image_path, {
                    //     folder: 'remodely/countertops/scenes',
                    //     public_id: `scene-${image._id}`,
                    //     overwrite: true
                    // });
                    // image.scene_cloudinary_url = result.secure_url;
                } catch (error) {
                    console.error(`❌ Failed to upload scene for ${image.product_name}:`, error.message);
                    errorCount++;
                }
            }

            // Upload closeup image if path exists and no Cloudinary URL
            if (image.closeup_image_path && !image.closeup_cloudinary_url) {
                try {
                    console.log(`⚠️  Would upload closeup: ${image.closeup_image_path}`);
                    // const result = await cloudinary.uploader.upload(image.closeup_image_path, {
                    //     folder: 'remodely/countertops/closeups',
                    //     public_id: `closeup-${image._id}`,
                    //     overwrite: true
                    // });
                    // image.closeup_cloudinary_url = result.secure_url;
                } catch (error) {
                    console.error(`❌ Failed to upload closeup for ${image.product_name}:`, error.message);
                    errorCount++;
                }
            }

            // Save the updated image
            // await image.save();
            uploadedCount++;
        }

        console.log('\n=== CLOUDINARY UPLOAD SUMMARY ===');
        console.log(`📊 Images processed: ${uploadedCount}`);
        console.log(`❌ Upload errors: ${errorCount}`);
        console.log(`ℹ️  Note: Actual uploads commented out - need image files`);

    } catch (error) {
        console.error('💥 Cloudinary upload failed:', error);
    } finally {
        await remodelyConn.close();
    }
}

// Main execution
async function main() {
    console.log('🚀 Starting complete migration process...\n');

    // Step 1: Migrate from countertops to remodely database
    await migrateCountertopsToRemodely();

    // Step 2: Upload to Cloudinary (placeholder for now)
    await uploadToCloudinary();

    console.log('\n✨ All operations complete!');
}

main().catch(console.error);
