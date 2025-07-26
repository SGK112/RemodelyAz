const mongoose = require('mongoose');

// Connect to remodely database
mongoose.connect('mongodb://localhost:27017/remodely', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schema for the migrated countertop images
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
    // RemodelyAz gallery fields
    src: String,
    alt: String,
    category: String,
    tags: [String],
    migrated_at: Date
});

const RemodelyImage = mongoose.model('images', RemodelyImageSchema);

async function integrateCountertopImages() {
    console.log('🎨 Integrating countertop images into RemodelyAz gallery...\n');

    try {
        // Get all countertop images (scene images only)
        const countertopImages = await RemodelyImage.find({
            category: 'countertops',
            scene_image_path: { $exists: true, $ne: null }
        });

        console.log(`📊 Found ${countertopImages.length} countertop images to integrate`);

        let updatedCount = 0;
        let skippedCount = 0;

        for (const image of countertopImages) {
            try {
                // Check if already integrated (has proper src field)
                if (image.src && image.src !== image.scene_image_path) {
                    console.log(`⏭️  Already integrated: ${image.product_name}`);
                    skippedCount++;
                    continue;
                }

                // Update for gallery integration
                const updates = {
                    // Use scene image path as primary source
                    src: image.scene_cloudinary_url || image.scene_image_path,

                    // Create descriptive alt text
                    alt: `${image.product_name} ${image.material} countertop by ${image.brand}`,

                    // Ensure category is set
                    category: 'countertops',

                    // Create searchable tags
                    tags: [
                        image.material?.toLowerCase(),
                        image.brand?.toLowerCase(),
                        image.primary_color?.toLowerCase(),
                        image.secondary_color?.toLowerCase(),
                        'countertop',
                        'kitchen',
                        'remodeling'
                    ].filter(Boolean), // Remove null/undefined values

                    // Add integration timestamp if not already set
                    migrated_at: image.migrated_at || new Date()
                };

                // Update the document
                await RemodelyImage.updateOne(
                    { _id: image._id },
                    { $set: updates }
                );

                updatedCount++;
                console.log(`✅ Integrated: ${image.product_name} (${image.material})`);

            } catch (error) {
                console.error(`❌ Failed to integrate ${image.product_name}:`, error.message);
            }
        }

        console.log('\n=== INTEGRATION SUMMARY ===');
        console.log(`✅ Successfully integrated: ${updatedCount} images`);
        console.log(`⏭️  Already integrated: ${skippedCount} images`);
        console.log(`📊 Total processed: ${countertopImages.length} images`);

        // Verify integration
        const integratedImages = await RemodelyImage.find({
            category: 'countertops',
            src: { $exists: true, $ne: null },
            alt: { $exists: true, $ne: null }
        });

        console.log(`\n✨ VERIFICATION:`);
        console.log(`📷 Total integrated images ready for gallery: ${integratedImages.length}`);

        // Show sample of integrated data
        if (integratedImages.length > 0) {
            const sample = integratedImages[0];
            console.log(`\n📋 SAMPLE INTEGRATED RECORD:`);
            console.log(`   Product: ${sample.product_name}`);
            console.log(`   Material: ${sample.material}`);
            console.log(`   Brand: ${sample.brand}`);
            console.log(`   Source: ${sample.src}`);
            console.log(`   Alt Text: ${sample.alt}`);
            console.log(`   Tags: ${sample.tags?.join(', ')}`);
        }

    } catch (error) {
        console.error('💥 Integration failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\n🎉 Integration process complete!');
    }
}

integrateCountertopImages();
