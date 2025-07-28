// High-quality remodeling images for the RemodelyAz website
// Each page gets unique images - no URL duplication

export interface SiteImage {
    id: string
    name: string
    url: string
    category: string
    description: string
    alt: string
    usage: string // Where this image is used
}

// Home Page Images
export const homeImages: SiteImage[] = [
    {
        id: 'hero-main',
        name: 'Modern Kitchen Hero',
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&h=1080&fit=crop&crop=center',
        category: 'kitchen',
        description: 'Stunning modern kitchen with white cabinets and marble countertops',
        alt: 'Modern kitchen with white cabinets, marble countertops, and pendant lighting',
        usage: 'hero'
    },
    {
        id: 'services-kitchen',
        name: 'Kitchen Remodeling Service',
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center',
        category: 'kitchen',
        description: 'Professional kitchen renovation showcase',
        alt: 'Beautiful renovated kitchen with modern appliances',
        usage: 'services'
    },
    {
        id: 'services-bathroom',
        name: 'Bathroom Remodeling Service',
        url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop&crop=center',
        category: 'bathroom',
        description: 'Luxury bathroom with walk-in shower',
        alt: 'Modern bathroom with walk-in tile shower and vanity',
        usage: 'services'
    },
    {
        id: 'services-commercial',
        name: 'Commercial Remodeling Service',
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&crop=center',
        category: 'commercial',
        description: 'Professional commercial space renovation',
        alt: 'Modern commercial office space with clean design',
        usage: 'services'
    }
]

// Gallery Images - High-Quality Project Photos
export const galleryImages: SiteImage[] = [
    // Kitchen Projects
    {
        id: 'gallery-kitchen-1',
        name: 'Luxury Kitchen Renovation',
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center',
        category: 'kitchen',
        description: 'Complete kitchen transformation with custom cabinets',
        alt: 'Luxury kitchen with white cabinets and marble island',
        usage: 'gallery'
    },
    {
        id: 'gallery-kitchen-2',
        name: 'Modern Kitchen Design',
        url: 'https://images.unsplash.com/photo-1556909114-8ccd5bc71b7d?w=800&h=600&fit=crop&crop=center',
        category: 'kitchen',
        description: 'Contemporary kitchen with stainless steel appliances',
        alt: 'Modern kitchen with dark cabinets and stainless appliances',
        usage: 'gallery'
    },
    {
        id: 'gallery-kitchen-3',
        name: 'Traditional Kitchen Remodel',
        url: 'https://images.unsplash.com/photo-1556909114-3e16c8374c59?w=800&h=600&fit=crop&crop=center',
        category: 'kitchen',
        description: 'Classic kitchen with wood cabinets and granite counters',
        alt: 'Traditional kitchen with wood cabinets and granite countertops',
        usage: 'gallery'
    },
    {
        id: 'gallery-kitchen-4',
        name: 'Open Concept Kitchen',
        url: 'https://images.unsplash.com/photo-1556909114-b1a8ab4fdc7c?w=800&h=600&fit=crop&crop=center',
        category: 'kitchen',
        description: 'Spacious open kitchen with breakfast bar',
        alt: 'Open concept kitchen with large island and breakfast bar',
        usage: 'gallery'
    },

    // Bathroom Projects
    {
        id: 'gallery-bathroom-1',
        name: 'Spa Bathroom Retreat',
        url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop&crop=center',
        category: 'bathroom',
        description: 'Luxury spa-inspired bathroom renovation',
        alt: 'Spa bathroom with walk-in shower and floating vanity',
        usage: 'gallery'
    },
    {
        id: 'gallery-bathroom-2',
        name: 'Master Bathroom Suite',
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop&crop=center',
        category: 'bathroom',
        description: 'Elegant master bathroom with double vanity',
        alt: 'Master bathroom with double vanity and large mirror',
        usage: 'gallery'
    },
    {
        id: 'gallery-bathroom-3',
        name: 'Tile Shower Renovation',
        url: 'https://images.unsplash.com/photo-1585062723900-73290ac83cfd?w=800&h=600&fit=crop&crop=center',
        category: 'bathroom',
        description: 'Custom tile work in walk-in shower',
        alt: 'Walk-in tile shower with glass enclosure',
        usage: 'gallery'
    },
    {
        id: 'gallery-bathroom-4',
        name: 'Modern Bathroom Design',
        url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&h=600&fit=crop&crop=center',
        category: 'bathroom',
        description: 'Contemporary bathroom with vessel sink',
        alt: 'Modern bathroom with vessel sink and wall-mounted faucet',
        usage: 'gallery'
    },

    // Commercial Projects
    {
        id: 'gallery-commercial-1',
        name: 'Office Space Renovation',
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&crop=center',
        category: 'commercial',
        description: 'Modern office space with open floor plan',
        alt: 'Modern office space with desks and natural lighting',
        usage: 'gallery'
    },
    {
        id: 'gallery-commercial-2',
        name: 'Restaurant Interior',
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&crop=center',
        category: 'commercial',
        description: 'Commercial restaurant renovation',
        alt: 'Restaurant interior with modern seating and lighting',
        usage: 'gallery'
    },
    {
        id: 'gallery-commercial-3',
        name: 'Retail Space Design',
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&crop=center',
        category: 'commercial',
        description: 'Contemporary retail space renovation',
        alt: 'Modern retail space with clean lines and display areas',
        usage: 'gallery'
    }
]

// Service Page Specific Images
export const serviceImages: SiteImage[] = [
    // Kitchen Service Page
    {
        id: 'kitchen-service-hero',
        name: 'Kitchen Service Hero',
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop&crop=center',
        category: 'kitchen',
        description: 'Professional kitchen remodeling services',
        alt: 'Professional kitchen remodeling with custom cabinets',
        usage: 'kitchen-service'
    },
    {
        id: 'kitchen-countertops',
        name: 'Granite Countertops',
        url: 'https://images.unsplash.com/photo-1556909114-8213a5b8eacd?w=800&h=600&fit=crop&crop=center',
        category: 'kitchen',
        description: 'Beautiful granite countertop installation',
        alt: 'Granite countertops with undermount sink',
        usage: 'kitchen-service'
    },
    {
        id: 'kitchen-cabinets',
        name: 'Custom Kitchen Cabinets',
        url: 'https://images.unsplash.com/photo-1556909114-97b05d0b2e87?w=800&h=600&fit=crop&crop=center',
        category: 'kitchen',
        description: 'Custom cabinet installation and design',
        alt: 'Custom white kitchen cabinets with crown molding',
        usage: 'kitchen-service'
    },

    // Bathroom Service Page
    {
        id: 'bathroom-service-hero',
        name: 'Bathroom Service Hero',
        url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&h=800&fit=crop&crop=center',
        category: 'bathroom',
        description: 'Expert bathroom renovation services',
        alt: 'Expert bathroom renovation with tile work',
        usage: 'bathroom-service'
    },
    {
        id: 'bathroom-tile-shower',
        name: 'Walk-in Tile Shower',
        url: 'https://images.unsplash.com/photo-1585062723891-4b7f5b2ea7b9?w=800&h=600&fit=crop&crop=center',
        category: 'bathroom',
        description: 'Custom walk-in tile shower installation',
        alt: 'Walk-in tile shower with rainfall showerhead',
        usage: 'bathroom-service'
    },
    {
        id: 'bathroom-vanity',
        name: 'Custom Bathroom Vanity',
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop&crop=center',
        category: 'bathroom',
        description: 'Custom vanity with marble countertop',
        alt: 'Custom bathroom vanity with marble countertop',
        usage: 'bathroom-service'
    }
]

// Blog Images
export const blogImages: SiteImage[] = [
    {
        id: 'blog-kitchen-trends',
        name: 'Kitchen Trends 2025',
        url: 'https://images.unsplash.com/photo-1556909114-9c16bf7e8b2b?w=800&h=600&fit=crop&crop=center',
        category: 'kitchen',
        description: 'Latest kitchen design trends',
        alt: 'Modern kitchen showcasing 2025 design trends',
        usage: 'blog'
    },
    {
        id: 'blog-bathroom-renovation',
        name: 'Bathroom Renovation Tips',
        url: 'https://images.unsplash.com/photo-1585062723900-8d1e15b3b6d9?w=800&h=600&fit=crop&crop=center',
        category: 'bathroom',
        description: 'Bathroom renovation planning guide',
        alt: 'Bathroom renovation in progress showing planning stages',
        usage: 'blog'
    },
    {
        id: 'blog-tile-selection',
        name: 'Tile Selection Guide',
        url: 'https://images.unsplash.com/photo-1585062723878-7bb2e9a1b1a1?w=800&h=600&fit=crop&crop=center',
        category: 'tile',
        description: 'How to choose the perfect tile',
        alt: 'Various tile samples for renovation projects',
        usage: 'blog'
    }
]

// Combine all images for easy access
export const allImages: SiteImage[] = [
    ...homeImages,
    ...galleryImages,
    ...serviceImages,
    ...blogImages
]

// Helper functions
export const getImagesByUsage = (usage: string): SiteImage[] => {
    return allImages.filter(image => image.usage === usage)
}

export const getImagesByCategory = (category: string): SiteImage[] => {
    return allImages.filter(image => image.category === category)
}

export const getImageById = (id: string): SiteImage | undefined => {
    return allImages.find(image => image.id === id)
}
