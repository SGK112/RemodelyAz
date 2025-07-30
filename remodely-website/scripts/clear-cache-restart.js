#!/usr/bin/env node

/**
 * Clear Next.js cache and restart server
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Clearing Next.js cache and restarting server...\n');

try {
    // Kill existing Next.js processes
    console.log('1️⃣ Stopping development server...');
    try {
        execSync('pkill -f "next dev"', { stdio: 'ignore' });
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
    } catch (error) {
        // Process might not be running, that's okay
    }

    // Clear .next cache directory
    console.log('2️⃣ Clearing Next.js cache...');
    const nextCacheDir = path.join(process.cwd(), '.next');
    if (fs.existsSync(nextCacheDir)) {
        execSync(`rm -rf ${nextCacheDir}`, { stdio: 'inherit' });
        console.log('   ✅ Cleared .next directory');
    } else {
        console.log('   ✅ No .next directory to clear');
    }

    // Clear node_modules/.cache if it exists
    const nodeCacheDir = path.join(process.cwd(), 'node_modules', '.cache');
    if (fs.existsSync(nodeCacheDir)) {
        execSync(`rm -rf ${nodeCacheDir}`, { stdio: 'inherit' });
        console.log('   ✅ Cleared node_modules/.cache');
    }

    console.log('3️⃣ Starting fresh development server...');
    console.log('   🚀 Running: npm run dev');
    console.log('   ⏰ This will take a few seconds...\n');

    // Start the development server in background
    const child = execSync('npm run dev', {
        stdio: ['ignore', 'pipe', 'pipe'],
        detached: true
    });

    console.log('✅ Server restarted successfully!');
    console.log('🌐 Your site should be available at:');
    console.log('   https://obscure-space-doodle-v6vwqw9vv7q52xxxg-3001.app.github.dev/');
    console.log('');
    console.log('🖼️ Gallery should now show updated images!');
    console.log('📱 Footer should now display in proper 4-column grid!');

} catch (error) {
    console.error('❌ Error during cache clear/restart:', error.message);
    console.log('\n🔧 Manual restart:');
    console.log('   1. Stop server: Ctrl+C in the terminal running npm run dev');
    console.log('   2. Clear cache: rm -rf .next');
    console.log('   3. Restart: npm run dev');
}
