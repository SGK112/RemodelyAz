const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Read the gallery projects file
const galleryPath = path.join(__dirname, '../data/gallery-projects.json');
const galleryProjects = JSON.parse(fs.readFileSync(galleryPath, 'utf8'));

async function checkImageUrl(url) {
    return new Promise((resolve) => {
        const client = url.startsWith('https:') ? https : http;

        const req = client.request(url, { method: 'HEAD' }, (res) => {
            resolve({
                url,
                status: res.statusCode,
                valid: res.statusCode === 200
            });
        });

        req.on('error', () => {
            resolve({
                url,
                status: 'ERROR',
                valid: false
            });
        });

        req.setTimeout(5000, () => {
            req.destroy();
            resolve({
                url,
                status: 'TIMEOUT',
                valid: false
            });
        });

        req.end();
    });
}

async function checkAllImages() {
    console.log('Checking gallery images...\n');

    const results = [];

    for (const project of galleryProjects) {
        console.log(`Checking: ${project.name}`);
        const result = await checkImageUrl(project.url);
        results.push({
            ...result,
            name: project.name,
            category: project.category
        });

        if (result.valid) {
            console.log(`✅ ${result.status} - ${project.name}`);
        } else {
            console.log(`❌ ${result.status} - ${project.name}`);
        }
    }

    console.log('\n--- Summary ---');
    const valid = results.filter(r => r.valid);
    const invalid = results.filter(r => !r.valid);

    console.log(`✅ Valid images: ${valid.length}`);
    console.log(`❌ Invalid images: ${invalid.length}`);

    if (invalid.length > 0) {
        console.log('\nInvalid images:');
        invalid.forEach(img => {
            console.log(`- ${img.name} (${img.category}): ${img.status}`);
        });
    }
}

checkAllImages().catch(console.error);
