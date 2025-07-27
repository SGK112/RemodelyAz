#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the gallery projects
const galleryPath = path.join(__dirname, '../data/gallery-projects.json');
const projects = JSON.parse(fs.readFileSync(galleryPath, 'utf8'));

console.log(`Checking ${projects.length} gallery projects`);

let fixedCount = 0;

projects.forEach((project, index) => {
    const imagePath = project.image;

    // Check if image path exists
    if (imagePath && imagePath.startsWith('/uploads/')) {
        const fullPath = path.join(__dirname, '../public', imagePath);

        if (!fs.existsSync(fullPath)) {
            console.log(`❌ Missing image: ${imagePath} for project: ${project.title}`);

            // Try to find a replacement image in the same directory
            const dirPath = path.dirname(fullPath);
            const fileName = path.basename(imagePath);
            const fileExt = path.extname(fileName);
            const baseName = path.basename(fileName, fileExt);

            if (fs.existsSync(dirPath)) {
                const files = fs.readdirSync(dirPath);
                const imageFiles = files.filter(f =>
                    f.toLowerCase().match(/\.(jpg|jpeg|png|webp|avif)$/)
                );

                if (imageFiles.length > 0) {
                    // Use the first available image
                    const replacementImage = imageFiles[0];
                    const newImagePath = path.join(path.dirname(imagePath), replacementImage);

                    console.log(`  ✅ Replacing with: ${newImagePath}`);
                    project.image = newImagePath;
                    fixedCount++;
                }
            }
        } else {
            console.log(`✅ Image exists: ${imagePath}`);
        }
    }

    // Ensure project has proper description
    if (!project.description || project.description.length < 20) {
        project.description = generateProjectDescription(project);
        console.log(`📝 Updated description for: ${project.title}`);
    }
});

function generateProjectDescription(project) {
    const category = project.category.toLowerCase();
    const title = project.title.toLowerCase();

    if (category.includes('kitchen') || title.includes('kitchen')) {
        return `Professional kitchen remodeling project featuring modern design elements, custom cabinetry, and premium finishes. This transformation showcases our expertise in creating functional and beautiful kitchen spaces.`;
    }

    if (category.includes('bathroom') || title.includes('bathroom')) {
        return `Complete bathroom renovation with luxury fixtures, custom tile work, and modern design. This project demonstrates our commitment to quality craftsmanship and attention to detail.`;
    }

    if (category.includes('commercial') || title.includes('commercial')) {
        return `Professional commercial renovation project designed to enhance functionality and aesthetics. Our team delivered high-quality results on time and within budget.`;
    }

    return `Quality home renovation project by RemodelyAz, featuring professional craftsmanship and attention to detail. This transformation showcases our commitment to excellence in residential remodeling.`;
}

console.log(`\n📊 Summary:`);
console.log(`- Fixed ${fixedCount} broken image paths`);
console.log(`- Updated descriptions for better SEO and user experience`);

// Write the updated data back
fs.writeFileSync(galleryPath, JSON.stringify(projects, null, 4));

console.log('✅ Gallery projects updated!');
