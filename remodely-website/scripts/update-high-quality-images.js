const fs = require('fs')
const path = require('path')

// Import the high-quality images
const highQualityImages = [
    // Premium Kitchen Remodels
    {
        id: "luxury-kitchen-renovation-1",
        name: "Luxury Kitchen Renovation - Marble Island",
        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=90&sharp=15&sat=15",
        category: "Kitchen",
        description: "Stunning kitchen renovation featuring premium marble countertops, custom white cabinetry, and professional-grade appliances. This Arizona home transformation showcases modern luxury design.",
        tags: ["luxury", "marble", "white-cabinets", "modern", "arizona-homes"],
        size: 185000,
        uploadDate: "2025-07-26",
        uploadedAt: new Date().toISOString(),
        source: "curated"
    },
    {
        id: "contemporary-kitchen-design-2",
        name: "Contemporary Kitchen with Quartz Countertops",
        url: "https://images.unsplash.com/photo-1556912498-fb7d6cf0e29f?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=90&sharp=15&sat=10",
        category: "Kitchen",
        description: "Beautiful contemporary kitchen design with sleek quartz countertops, subway tile backsplash, and energy-efficient LED lighting throughout.",
        tags: ["contemporary", "quartz", "subway-tile", "LED-lighting"],
        size: 195000,
        uploadDate: "2025-07-26",
        uploadedAt: new Date().toISOString(),
        source: "curated"
    },
    {
        id: "farmhouse-kitchen-remodel-3",
        name: "Modern Farmhouse Kitchen Transformation",
        url: "https://images.unsplash.com/photo-1556909193-f4de24a2c53a?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=90&sharp=15&sat=12",
        category: "Kitchen",
        description: "Charming modern farmhouse kitchen featuring shaker-style cabinets, butcher block countertops, and vintage-inspired fixtures.",
        tags: ["farmhouse", "shaker-cabinets", "butcher-block", "vintage-fixtures"],
        size: 175000,
        uploadDate: "2025-07-26",
        uploadedAt: new Date().toISOString(),
        source: "curated"
    },
    {
        id: "two-tone-kitchen-design-4",
        name: "Two-Tone Kitchen with Island",
        url: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=90&sharp=15&sat=12",
        category: "Kitchen",
        description: "Sophisticated two-tone kitchen design featuring navy lower cabinets and white upper cabinets with a stunning marble waterfall island.",
        tags: ["two-tone", "navy-cabinets", "marble-waterfall", "island"],
        size: 205000,
        uploadDate: "2025-07-26",
        uploadedAt: new Date().toISOString(),
        source: "curated"
    },

    // Luxury Bathroom Remodels
    {
        id: "spa-bathroom-renovation-1",
        name: "Luxury Spa-Style Bathroom",
        url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=90&sharp=15&sat=10",
        category: "Bathroom",
        description: "Elegant spa-style bathroom renovation with natural stone tiles, rainfall shower, and floating vanity design.",
        tags: ["spa-style", "natural-stone", "rainfall-shower", "floating-vanity"],
        size: 165000,
        uploadDate: "2025-07-26",
        uploadedAt: new Date().toISOString(),
        source: "curated"
    },
    {
        id: "modern-bathroom-design-2",
        name: "Contemporary Master Bathroom",
        url: "https://images.unsplash.com/photo-1571508601382-5154b0aab507?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=90&sharp=15&sat=12",
        category: "Bathroom",
        description: "Sleek contemporary master bathroom with dual vanities, walk-in glass shower, and premium tile work.",
        tags: ["contemporary", "dual-vanities", "glass-shower", "premium-tile"],
        size: 155000,
        uploadDate: "2025-07-26",
        uploadedAt: new Date().toISOString(),
        source: "curated"
    },
    {
        id: "marble-bathroom-luxury-3",
        name: "Marble Master Bathroom Suite",
        url: "https://images.unsplash.com/photo-1584622781564-1d987c0c3fd0?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=90&sharp=15&sat=8",
        category: "Bathroom",
        description: "Luxurious master bathroom featuring floor-to-ceiling marble, freestanding tub, and gold fixtures for the ultimate spa experience.",
        tags: ["marble", "freestanding-tub", "gold-fixtures", "luxury"],
        size: 225000,
        uploadDate: "2025-07-26",
        uploadedAt: new Date().toISOString(),
        source: "curated"
    },

    // Living Spaces
    {
        id: "open-concept-living-1",
        name: "Open Concept Living Space Renovation",
        url: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=90&sharp=15&sat=15",
        category: "Living Room",
        description: "Beautiful open concept living space renovation featuring custom built-ins, hardwood flooring, and modern lighting design.",
        tags: ["open-concept", "built-ins", "hardwood", "modern-lighting"],
        size: 210000,
        uploadDate: "2025-07-26",
        uploadedAt: new Date().toISOString(),
        source: "curated"
    },
    {
        id: "modern-living-room-2",
        name: "Contemporary Living Room Design",
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=90&sharp=15&sat=10",
        category: "Living Room",
        description: "Stylish contemporary living room with custom built-in entertainment center, recessed lighting, and premium finishes.",
        tags: ["contemporary", "built-in-entertainment", "recessed-lighting", "premium-finishes"],
        size: 190000,
        uploadDate: "2025-07-26",
        uploadedAt: new Date().toISOString(),
        source: "curated"
    },

    // Outdoor Living (Perfect for Arizona)
    {
        id: "arizona-outdoor-kitchen-1",
        name: "Arizona Outdoor Kitchen & Patio",
        url: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=90&sharp=15&sat=20",
        category: "Outdoor",
        description: "Custom outdoor kitchen and patio design perfect for Arizona's climate, featuring stone countertops and built-in grilling station.",
        tags: ["outdoor-kitchen", "patio", "arizona-climate", "stone-countertops", "grilling-station"],
        size: 235000,
        uploadDate: "2025-07-26",
        uploadedAt: new Date().toISOString(),
        source: "curated"
    },
    {
        id: "desert-landscape-patio-2",
        name: "Desert Modern Patio Design",
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=90&sharp=15&sat=18",
        category: "Outdoor",
        description: "Stunning desert modern patio design with fire features, native landscaping, and covered dining area ideal for Arizona living.",
        tags: ["desert-modern", "fire-features", "native-landscaping", "covered-dining"],
        size: 200000,
        uploadDate: "2025-07-26",
        uploadedAt: new Date().toISOString(),
        source: "curated"
    }
]

// Read current images
const imagesPath = path.join(__dirname, '../data/images.json')
let currentImages = []

try {
    if (fs.existsSync(imagesPath)) {
        const data = fs.readFileSync(imagesPath, 'utf8')
        currentImages = JSON.parse(data)
    }
} catch (error) {
    console.error('Error reading current images:', error)
    currentImages = []
}

// Keep the first image (RemodelyAz Logo) and any Cloudinary uploads, then add high-quality images
const logoAndCloudinaryImages = currentImages.filter(img =>
    img.source === 'cloudinary' || img.category === 'Brand' || img.name.includes('RemodelyAz Logo')
)

// Combine logo/cloudinary images with new high-quality images
const updatedImages = [...logoAndCloudinaryImages, ...highQualityImages]

// Write updated images back to file
try {
    fs.writeFileSync(imagesPath, JSON.stringify(updatedImages, null, 2))
    console.log(`✅ Successfully updated images.json with ${highQualityImages.length} high-quality images`)
    console.log(`📊 Total images: ${updatedImages.length}`)
    console.log(`🏠 Categories: ${[...new Set(updatedImages.map(img => img.category))].join(', ')}`)
} catch (error) {
    console.error('❌ Error writing images:', error)
}
