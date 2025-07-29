// Cloudinary Image Management - Centralized Configuration
// This will be our single source of truth for all website images

export const CLOUDINARY_CONFIG = {
  cloudName: 'drrwdgggx',
  baseUrl: 'https://res.cloudinary.com/drrwdgggx/image/upload',

  // Image transformation presets for consistency
  transformations: {
    thumbnail: 'c_fill,w_150,h_150,q_auto,f_webp',
    card: 'c_fill,w_400,h_300,q_auto,f_webp',
    hero: 'c_fill,w_1200,h_600,q_auto,f_webp',
    gallery: 'c_fill,w_800,h_600,q_auto,f_webp',
    blog: 'c_fill,w_800,h_400,q_auto,f_webp'
  }
}

// Centralized image URLs - Using actual uploaded Cloudinary images
export const SITE_IMAGES = {
  // Company/Brand Images
  logo: '/favicon.svg', // Using local favicon instead of Cloudinary

  // People/Testimonials - Updated with high-quality Unsplash images  
  people: {
    sarah_johnson: 'https://images.unsplash.com/photo-1494790108755-2616b612b607?w=150&h=150&fit=crop&crop=face&q=80',
    michael_chen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&q=80',
    emily_rodriguez: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face&q=80',
    david_wilson: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face&q=80',
    lisa_thompson: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&q=80',
    james_anderson: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face&q=80'
  },

  // Project Categories - Updated with high-quality Unsplash images
  projects: {
    kitchen_modern: 'https://images.unsplash.com/photo-1556909114-8213a5b8eacd?w=800&h=600&fit=crop&crop=center&q=80',
    kitchen_classic: 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&h=600&fit=crop&crop=center&q=80',
    bathroom_luxury: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop&crop=center&q=80',
    bathroom_modern: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop&crop=center&q=80',
    living_room: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center&q=80',
    bedroom: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop&crop=center&q=80',
    office: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center&q=80',
    outdoor_patio: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&crop=center&q=80'
  },

  // Blog/Content Images - Updated with high-quality Unsplash images
  blog: {
    kitchen_trends: 'https://images.unsplash.com/photo-1556909114-8213a5b8eacd?w=800&h=400&fit=crop&crop=center&q=80',
    bathroom_renovation: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=400&fit=crop&crop=center&q=80',
    home_value: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop&crop=center&q=80',
    sustainable_materials: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=400&fit=crop&crop=center&q=80',
    small_spaces: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop&crop=center&q=80',
    budget_renovation: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=400&fit=crop&crop=center&q=80',
    cooling_solutions: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=400&fit=crop&crop=center&q=80',
    design_trends: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop&crop=center&q=80',
    smart_home: 'https://images.unsplash.com/photo-1558618047-b8de25c93c70?w=800&h=400&fit=crop&crop=center&q=80',
    monsoon_prep: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=400&fit=crop&crop=center&q=80'
  },

  // Career/Team Images - Updated with high-quality Unsplash images
  career: {
    team_meeting: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center&q=80',
    construction_site: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop&crop=center&q=80'
  }
}

// Helper function to generate Cloudinary URLs with custom transformations
export function getCloudinaryUrl(publicId: string, transformation?: string): string {
  const baseTransformation = transformation || CLOUDINARY_CONFIG.transformations.card
  return `${CLOUDINARY_CONFIG.baseUrl}/${baseTransformation}/${publicId}`
}

// Helper function for responsive images
export function getResponsiveImageSet(publicId: string) {
  return {
    mobile: getCloudinaryUrl(publicId, 'c_fill,w_400,h_300,q_auto,f_webp'),
    tablet: getCloudinaryUrl(publicId, 'c_fill,w_600,h_400,q_auto,f_webp'),
    desktop: getCloudinaryUrl(publicId, 'c_fill,w_800,h_600,q_auto,f_webp')
  }
}
