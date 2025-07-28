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
  logo: `${CLOUDINARY_CONFIG.baseUrl}/v1753515727/remodely-gallery/usj4rgu0k7skpq9rorje.svg`,

  // People/Testimonials (Using actual uploaded images)  
  people: {
    sarah_johnson: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.thumbnail}/v1753662933/remodely-people/remodely-people/michael-chen.webp`, // Using Michael's image as placeholder
    michael_chen: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.thumbnail}/v1753662933/remodely-people/remodely-people/michael-chen.webp`,
    emily_rodriguez: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.thumbnail}/v1753662933/remodely-people/remodely-people/emily-rodriguez.webp`,
    david_wilson: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.thumbnail}/v1753662934/remodely-people/remodely-people/david-wilson.webp`,
    lisa_thompson: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.thumbnail}/v1753662935/remodely-people/remodely-people/lisa-thompson.webp`,
    james_anderson: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.thumbnail}/v1753662936/remodely-people/remodely-people/james-anderson.webp`
  },

  // Project Categories (Using actual uploaded images)
  projects: {
    kitchen_modern: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.gallery}/v1753662936/remodely-projects/remodely-projects/kitchen-modern-1.webp`,
    kitchen_classic: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.gallery}/v1753662936/remodely-projects/remodely-projects/kitchen-modern-1.webp`, // Using modern as fallback
    bathroom_luxury: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.gallery}/v1753662938/remodely-projects/remodely-projects/bathroom-luxury-1.webp`,
    bathroom_modern: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.gallery}/v1753662939/remodely-projects/remodely-projects/bathroom-modern-1.webp`,
    living_room: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.gallery}/v1753662940/remodely-projects/remodely-projects/living-room-1.webp`,
    bedroom: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.gallery}/v1753662940/remodely-projects/remodely-projects/bedroom-1.webp`,
    office: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.gallery}/v1753662940/remodely-projects/remodely-projects/living-room-1.webp`, // Using living room as fallback
    outdoor_patio: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.gallery}/v1753662942/remodely-projects/remodely-projects/outdoor-patio-1.webp`
  },

  // Blog/Content Images (Use project images as placeholders for now)
  blog: {
    kitchen_trends: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.blog}/v1753662936/remodely-projects/remodely-projects/kitchen-modern-1.webp`,
    bathroom_renovation: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.blog}/v1753662938/remodely-projects/remodely-projects/bathroom-luxury-1.webp`,
    home_value: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.blog}/v1753662940/remodely-projects/remodely-projects/living-room-1.webp`,
    sustainable_materials: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.blog}/v1753662940/remodely-projects/remodely-projects/bedroom-1.webp`,
    small_spaces: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.blog}/v1753662939/remodely-projects/remodely-projects/bathroom-modern-1.webp`,
    budget_renovation: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.blog}/v1753662942/remodely-projects/remodely-projects/outdoor-patio-1.webp`,
    cooling_solutions: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.blog}/v1753662940/remodely-projects/remodely-projects/living-room-1.webp`,
    design_trends: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.blog}/v1753662940/remodely-projects/remodely-projects/office-1.webp`,
    smart_home: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.blog}/v1753662936/remodely-projects/remodely-projects/kitchen-modern-1.webp`,
    monsoon_prep: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.blog}/v1753662942/remodely-projects/remodely-projects/outdoor-patio-1.webp`
  },

  // Career/Team Images (Use project images as placeholders)
  career: {
    team_meeting: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.card}/v1753662940/remodely-projects/remodely-projects/living-room-1.webp`,
    construction_site: `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.transformations.card}/v1753662942/remodely-projects/remodely-projects/outdoor-patio-1.webp`
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
