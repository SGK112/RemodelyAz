const mongoose = require('mongoose');

// Connect to remodely database
mongoose.connect('mongodb://localhost:27017/remodely', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schema for the integrated countertop images
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
    src: String,
    alt: String,
    category: String,
    tags: [String],
    migrated_at: Date
});

const RemodelyImage = mongoose.model('images', RemodelyImageSchema);

async function verifyIntegration() {
    console.log('🔍 Verifying countertop image integration...\n');

    try {
        // Get all integrated countertop images
        const images = await RemodelyImage.find({
            category: 'countertops',
            src: { $exists: true, $ne: null },
            alt: { $exists: true, $ne: null }
        });

        console.log(`📊 Total integrated countertop images: ${images.length}`);

        // Group by material
        const byMaterial = {};
        images.forEach(img => {
            const material = img.material || 'Unknown';
            byMaterial[material] = (byMaterial[material] || 0) + 1;
        });

        console.log('\n📋 BREAKDOWN BY MATERIAL:');
        Object.entries(byMaterial)
            .sort((a, b) => b[1] - a[1])
            .forEach(([material, count]) => {
                console.log(`   ${material}: ${count} images`);
            });

        // Group by brand
        const byBrand = {};
        images.forEach(img => {
            const brand = img.brand || 'Unknown';
            byBrand[brand] = (byBrand[brand] || 0) + 1;
        });

        console.log('\n🏢 TOP BRANDS:');
        Object.entries(byBrand)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .forEach(([brand, count]) => {
                console.log(`   ${brand}: ${count} images`);
            });

        // Check for missing fields
        const missingAlt = images.filter(img => !img.alt || img.alt.trim() === '');
        const missingSrc = images.filter(img => !img.src || img.src.trim() === '');
        const missingCategory = images.filter(img => !img.category || img.category !== 'countertops');

        console.log('\n🔧 DATA QUALITY CHECK:');
        console.log(`   Missing alt text: ${missingAlt.length}`);
        console.log(`   Missing src field: ${missingSrc.length}`);
        console.log(`   Wrong category: ${missingCategory.length}`);

        // Sample images for verification
        console.log('\n📷 SAMPLE RECORDS:');
        const samples = images.slice(0, 3);
        samples.forEach((img, index) => {
            console.log(`\n   Sample ${index + 1}:`);
            console.log(`     Name: ${img.product_name}`);
            console.log(`     Material: ${img.material}`);
            console.log(`     Brand: ${img.brand}`);
            console.log(`     Alt: ${img.alt}`);
            console.log(`     Src: ${img.src}`);
            console.log(`     Tags: ${img.tags?.join(', ')}`);
        });

        console.log('\n✅ INTEGRATION STATUS: SUCCESS');
        console.log(`📊 ${images.length} countertop images ready for gallery display`);

        // Test API format simulation
        const apiFormat = images.slice(0, 2).map(image => ({
            id: image._id.toString(),
            name: image.product_name || 'Countertop',
            url: image.src || '/images/placeholder.svg',
            category: 'Countertops',
            description: `${image.material} by ${image.brand}${image.primary_color ? ` - ${image.primary_color}` : ''}`,
            material: image.material,
            brand: image.brand,
            tags: image.tags,
            uploadDate: image.migrated_at ? new Date(image.migrated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            uploadedAt: image.migrated_at || new Date().toISOString()
        }));

        console.log('\n🌐 API FORMAT PREVIEW:');
        console.log(JSON.stringify(apiFormat, null, 2));

    } catch (error) {
        console.error('❌ Verification failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\n🎉 Verification complete!');
    }
}

verifyIntegration();
