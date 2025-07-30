#!/usr/bin/env node

/**
 * Image URL Checker - Tests which gallery images are working
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

function checkUrl(url) {
    return new Promise((resolve) => {
        const client = url.startsWith('https') ? https : http;

        const req = client.request(url, { method: 'HEAD' }, (res) => {
            resolve({
                url,
                status: res.statusCode,
                working: res.statusCode >= 200 && res.statusCode < 400
            });
        });

        req.on('error', () => {
            resolve({
                url,
                status: 'ERROR',
                working: false
            });
        });

        req.setTimeout(5000, () => {
            req.destroy();
            resolve({
                url,
                status: 'TIMEOUT',
                working: false
            });
        });

        req.end();
    });
}

async function checkAllImages() {
    try {
        const galleryPath = path.join(__dirname, '../data/gallery-projects.json');
        const projects = JSON.parse(fs.readFileSync(galleryPath, 'utf8'));

        console.log('🔍 Checking all gallery images...\n');

        const results = [];

        for (const project of projects) {
            console.log(`Checking ${project.id}. ${project.title}...`);
            const result = await checkUrl(project.url);
            results.push({
                ...result,
                id: project.id,
                title: project.title,
                category: project.category
            });

            if (result.working) {
                console.log(`  ✅ Working (${result.status})`);
            } else {
                console.log(`  ❌ Broken (${result.status})`);
            }
        }

        // Summary
        const broken = results.filter(r => !r.working);
        const working = results.filter(r => r.working);

        console.log(`\n📊 Summary:`);
        console.log(`  ✅ Working: ${working.length}`);
        console.log(`  ❌ Broken: ${broken.length}`);

        if (broken.length > 0) {
            console.log(`\n🔧 Broken Images to Fix:`);
            broken.forEach(b => {
                console.log(`  ${b.id}. ${b.title} (${b.category})`);
                console.log(`     ${b.url}`);
            });
        }

    } catch (error) {
        console.log('❌ Error:', error.message);
    }
}

checkAllImages();
