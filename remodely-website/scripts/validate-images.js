#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGES_FILE = path.join(__dirname, '..', 'data', 'images.json');

// Function to validate URL
function validateUrl(url) {
    return new Promise((resolve) => {
        const request = https.request(url, { method: 'HEAD' }, (response) => {
            resolve({
                url,
                status: response.statusCode,
                valid: response.statusCode >= 200 && response.statusCode < 400,
                contentType: response.headers['content-type']
            });
        });

        request.on('error', () => {
            resolve({
                url,
                status: 0,
                valid: false,
                contentType: null
            });
        });

        request.setTimeout(5000, () => {
            request.destroy();
            resolve({
                url,
                status: 0,
                valid: false,
                contentType: null
            });
        });

        request.end();
    });
}

// Function to optimize Unsplash URLs
function optimizeUnsplashUrl(url) {
    try {
        const urlObj = new URL(url);

        if (urlObj.hostname === 'images.unsplash.com') {
            const params = new URLSearchParams(urlObj.search);

            // Set optimal parameters
            params.set('w', '800');
            params.set('h', '600');
            params.set('fit', 'crop');
            params.set('crop', 'center');
            params.set('auto', 'format');
            params.set('q', '80');

            urlObj.search = params.toString();
            return urlObj.toString();
        }

        return url;
    } catch (error) {
        console.warn(`Invalid URL: ${url}`);
        return url;
    }
}

// Main validation function
async function validateAndFixImages() {
    try {
        console.log('📋 Reading images data...');
        const imagesData = JSON.parse(fs.readFileSync(IMAGES_FILE, 'utf8'));
        console.log(`Found ${imagesData.length} images to validate\n`);

        const results = [];
        let fixedCount = 0;

        for (let i = 0; i < imagesData.length; i++) {
            const image = imagesData[i];
            console.log(`🔍 Validating ${i + 1}/${imagesData.length}: ${image.name}`);

            const originalUrl = image.url;
            const optimizedUrl = optimizeUnsplashUrl(originalUrl);

            if (originalUrl !== optimizedUrl) {
                console.log(`  ⚡ Optimizing URL parameters`);
                image.url = optimizedUrl;
                fixedCount++;
            }

            const validation = await validateUrl(image.url);
            console.log(`  ${validation.valid ? '✅' : '❌'} Status: ${validation.status} - ${image.url}`);

            if (validation.contentType) {
                console.log(`  📄 Content-Type: ${validation.contentType}`);
            }

            results.push({
                ...image,
                validation
            });

            console.log(''); // Empty line for readability
        }

        // Save optimized images back to file
        if (fixedCount > 0) {
            fs.writeFileSync(IMAGES_FILE, JSON.stringify(imagesData, null, 2));
            console.log(`💾 Updated ${fixedCount} image URLs with optimized parameters\n`);
        }

        // Summary
        const validImages = results.filter(r => r.validation.valid);
        const invalidImages = results.filter(r => !r.validation.valid);

        console.log('📊 VALIDATION SUMMARY');
        console.log('='.repeat(50));
        console.log(`✅ Valid images: ${validImages.length}`);
        console.log(`❌ Invalid images: ${invalidImages.length}`);
        console.log(`⚡ URLs optimized: ${fixedCount}`);
        console.log(`📊 Total images: ${results.length}\n`);

        if (invalidImages.length > 0) {
            console.log('❌ INVALID IMAGES:');
            invalidImages.forEach(img => {
                console.log(`  • ${img.name} (${img.category})`);
                console.log(`    URL: ${img.url}`);
                console.log(`    Status: ${img.validation.status}\n`);
            });
        }

        // Category breakdown
        const categories = [...new Set(imagesData.map(img => img.category))];
        console.log('📂 CATEGORY BREAKDOWN:');
        categories.forEach(category => {
            const categoryImages = results.filter(img => img.category === category);
            const validInCategory = categoryImages.filter(img => img.validation.valid).length;
            console.log(`  ${category}: ${validInCategory}/${categoryImages.length} valid`);
        });

        return results;

    } catch (error) {
        console.error('❌ Error validating images:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    validateAndFixImages()
        .then(() => {
            console.log('\n🎉 Image validation complete!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Validation failed:', error);
            process.exit(1);
        });
}

module.exports = { validateAndFixImages, optimizeUnsplashUrl, validateUrl };
