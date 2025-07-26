const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB connection
async function connectMongoDB() {
    if (mongoose.connections[0].readyState) {
        return;
    }
    try {
        await mongoose.connect('mongodb://localhost:27017/remodely', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}

// Schema for partner images
const PartnerImageSchema = new mongoose.Schema({
    partner_name: String,
    partner_website: String,
    partner_specialties: [String],
    project_name: String,
    project_type: String,
    category: String,
    material: String,
    style: String,
    location: String,
    src: String,
    alt: String,
    tags: [String],
    original_filename: String,
    file_path: String,
    imported_at: { type: Date, default: Date.now },
    arizona_focused: { type: Boolean, default: true },
    partner_info: {
        name: String,
        website: String,
        location: String,
        phone: String,
        specialties: [String]
    }
});

const PartnerImage = mongoose.models.partner_images || mongoose.model('partner_images', PartnerImageSchema);

// Partner information
const partnerInfo = {
    sunstone: {
        name: 'SunStone Surfaces',
        website: 'https://sunstonesurfaces.com/',
        location: '3232 W. Virginia Ave, Phoenix, AZ 85009',
        phone: '602-353-1618',
        specialties: ['Quartz Countertops', 'Natural Stone', 'Tile', 'SPC Luxury Vinyl', 'Mosaics']
    },
    procraft: {
        name: 'ProCraft Phoenix',
        website: 'https://procraftphoenix.com/',
        location: 'Phoenix, AZ',
        specialties: ['Custom Cabinetry', 'Kitchen Cabinets', 'Bathroom Vanities', 'Built-in Storage']
    },
    sollid: {
        name: 'Sollid Cabinetry',
        website: 'https://sollidcabinetry.com/',
        location: 'Arizona Authorized Dealer',
        specialties: ['Premium Cabinetry', 'Custom Built-ins', 'Closet Systems', 'Entertainment Centers']
    },
    happyfloors: {
        name: 'Happy Floors',
        website: 'https://www.happy-floors.com/',
        location: 'Arizona Authorized Dealer',
        specialties: ['Porcelain Tile', 'Ceramic Tile', 'Luxury Vinyl', 'Wood-Look Tile']
    },
    emser: {
        name: 'Emser Tile',
        website: 'https://www.emser.com/',
        location: 'Arizona Authorized Dealer',
        specialties: ['Natural Stone', 'Porcelain Tile', 'Mosaic Tile', 'Pool Tile', 'Backsplash Tile']
    }
};

// Generate project names and descriptions
function generateProjectData(category, partnerName, index) {
    const projectNames = {
        kitchen: [
            'Modern Arizona Kitchen Renovation',
            'Contemporary Phoenix Kitchen Remodel',
            'Luxury Scottsdale Kitchen Design',
            'Traditional Tempe Kitchen Makeover',
            'Open Concept Mesa Kitchen',
            'Gourmet Chandler Kitchen Project',
            'Farmhouse Style Gilbert Kitchen',
            'Executive Peoria Kitchen Remodel'
        ],
        bathroom: [
            'Spa-Inspired Phoenix Bathroom',
            'Master Suite Scottsdale Renovation',
            'Contemporary Arizona Bathroom Remodel',
            'Luxury Mesa Bathroom Design',
            'Modern Tempe Guest Bathroom',
            'Traditional Gilbert Bathroom Makeover',
            'Executive Chandler Master Bath'
        ],
        flooring: [
            'Arizona Home Flooring Project',
            'Phoenix Residence Tile Installation',
            'Scottsdale Luxury Flooring',
            'Mesa Contemporary Floor Design',
            'Tempe Home Flooring Renovation',
            'Gilbert Custom Flooring Solution'
        ],
        commercial: [
            'Phoenix Commercial Space',
            'Arizona Office Renovation',
            'Scottsdale Business Interior',
            'Mesa Commercial Project'
        ],
        miscellaneous: [
            'Custom Arizona Installation',
            'Phoenix Specialty Project',
            'Unique Scottsdale Design',
            'Mesa Custom Work'
        ]
    };

    const descriptions = {
        kitchen: [
            `Beautiful kitchen featuring premium ${partnerName} materials with Arizona-inspired design`,
            `Stunning kitchen renovation showcasing quality ${partnerName} craftsmanship`,
            `Modern kitchen design featuring top-tier ${partnerName} products and finishes`,
            `Elegant kitchen remodel with custom ${partnerName} materials and Arizona flair`,
            `Sophisticated kitchen renovation featuring premium ${partnerName} selections`
        ],
        bathroom: [
            `Luxurious bathroom renovation featuring ${partnerName} premium materials`,
            `Spa-inspired bathroom design with quality ${partnerName} products`,
            `Contemporary bathroom remodel showcasing ${partnerName} craftsmanship`,
            `Elegant bathroom renovation with premium ${partnerName} finishes`,
            `Modern bathroom design featuring top-quality ${partnerName} materials`
        ],
        flooring: [
            `Beautiful flooring installation featuring ${partnerName} premium products`,
            `Stunning floor design showcasing quality ${partnerName} materials`,
            `Contemporary flooring project with ${partnerName} premium selections`,
            `Elegant flooring renovation featuring ${partnerName} craftsmanship`
        ],
        commercial: [
            `Professional commercial installation featuring ${partnerName} materials`,
            `Quality commercial project showcasing ${partnerName} products`,
            `Contemporary commercial design with ${partnerName} premium finishes`
        ],
        miscellaneous: [
            `Custom installation featuring ${partnerName} specialty materials`,
            `Unique design project showcasing ${partnerName} craftsmanship`,
            `Specialty installation with premium ${partnerName} products`
        ]
    };

    return {
        name: projectNames[category] ? projectNames[category][index % projectNames[category].length] : `${partnerName} Project ${index + 1}`,
        description: descriptions[category] ? descriptions[category][index % descriptions[category].length] : `Quality project featuring ${partnerName} materials`
    };
}

// Import partner images
async function importPartnerImages() {
    console.log('🏗️  Starting partner image import to MongoDB...\n');

    await connectMongoDB();

    let totalImported = 0;

    // Process each partner directory
    const partnersDir = path.join(__dirname, '..', 'public', 'uploads', 'partners');

    if (!fs.existsSync(partnersDir)) {
        console.log('❌ Partners directory not found. Please run scrape-all-partner-images.js first.');
        return;
    }

    // Process SunStone images
    const stoneDir = path.join(partnersDir, 'sunstone');
    if (fs.existsSync(stoneDir)) {
        console.log('📸 Processing SunStone Surfaces images...');

        const stoneFiles = fs.readdirSync(stoneDir).filter(file =>
            file.match(/\.(jpg|jpeg|png|webp)$/i)
        );

        for (let i = 0; i < stoneFiles.length; i++) {
            const filename = stoneFiles[i];
            const category = filename.includes('kitchen') ? 'kitchen' :
                filename.includes('bathroom') ? 'bathroom' :
                    filename.includes('flooring') ? 'flooring' : 'miscellaneous';

            const projectData = generateProjectData(category, 'SunStone Surfaces', i);

            const imageDoc = {
                partner_name: 'SunStone Surfaces',
                partner_website: partnerInfo.sunstone.website,
                partner_specialties: partnerInfo.sunstone.specialties,
                project_name: projectData.name,
                project_type: category.charAt(0).toUpperCase() + category.slice(1),
                category: 'stone_surfaces',
                material: category === 'flooring' ? 'Luxury Vinyl/Tile' : 'Quartz/Natural Stone',
                style: 'Contemporary',
                location: 'Phoenix, Arizona',
                src: `/uploads/partners/sunstone/${filename}`,
                alt: `${projectData.name} - ${projectData.description}`,
                tags: ['arizona', 'phoenix', 'remodeling', 'stone', 'quartz', 'tile', category, 'sunstone'],
                original_filename: filename,
                file_path: `/uploads/partners/sunstone/${filename}`,
                arizona_focused: true,
                partner_info: partnerInfo.sunstone
            };

            await PartnerImage.create(imageDoc);
            totalImported++;
        }

        console.log(`✅ Imported ${stoneFiles.length} SunStone images`);
    }

    // Process Cabinet partner images
    const cabinetsDir = path.join(partnersDir, 'procraft-sollid');
    if (fs.existsSync(cabinetsDir)) {
        console.log('\n🏠 Processing Cabinet partner images...');

        const cabinetFiles = fs.readdirSync(cabinetsDir).filter(file =>
            file.match(/\.(jpg|jpeg|png|webp)$/i)
        );

        for (let i = 0; i < cabinetFiles.length; i++) {
            const filename = cabinetFiles[i];
            const isProcraft = filename.includes('procraft');
            const isSollid = filename.includes('sollid');

            const partnerKey = isProcraft ? 'procraft' : 'sollid';
            const partnerName = isProcraft ? 'ProCraft Phoenix' : 'Sollid Cabinetry';

            const category = filename.includes('bathroom') ? 'bathroom' : 'kitchen';
            const projectData = generateProjectData(category, partnerName, i);

            const imageDoc = {
                partner_name: partnerName,
                partner_website: partnerInfo[partnerKey].website,
                partner_specialties: partnerInfo[partnerKey].specialties,
                project_name: projectData.name,
                project_type: category.charAt(0).toUpperCase() + category.slice(1),
                category: 'cabinetry',
                material: 'Custom Cabinetry',
                style: 'Contemporary',
                location: 'Phoenix, Arizona',
                src: `/uploads/partners/procraft-sollid/${filename}`,
                alt: `${projectData.name} - ${projectData.description}`,
                tags: ['arizona', 'phoenix', 'remodeling', 'cabinets', 'kitchen', 'bathroom', partnerKey],
                original_filename: filename,
                file_path: `/uploads/partners/procraft-sollid/${filename}`,
                arizona_focused: true,
                partner_info: partnerInfo[partnerKey]
            };

            await PartnerImage.create(imageDoc);
            totalImported++;
        }

        console.log(`✅ Imported ${cabinetFiles.length} Cabinet partner images`);
    }

    console.log(`\n🎉 Partner image import complete!`);
    console.log(`✅ Total images imported: ${totalImported}`);
    console.log(`📊 Partner images now available in MongoDB`);

    // Create import summary
    const summary = {
        timestamp: new Date().toISOString(),
        total_imported: totalImported,
        partners_processed: [
            'SunStone Surfaces - Stone & Surfaces',
            'ProCraft Phoenix - Custom Cabinetry',
            'Sollid Cabinetry - Premium Cabinets'
        ],
        database: 'remodely',
        collection: 'partner_images',
        notes: [
            'All images are Arizona-focused for local SEO',
            'Partner information included for credibility',
            'Images optimized for Remodely Arizona gallery'
        ]
    };

    fs.writeFileSync(
        path.join(partnersDir, 'import-summary.json'),
        JSON.stringify(summary, null, 2)
    );

    console.log(`📋 Import summary saved`);

    mongoose.connection.close();
}

importPartnerImages().catch(console.error);
