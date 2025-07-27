/**
 * Image Management Utility for RemodelyAz
 * 
 * This utility helps you work with images migrated from MongoDB to Cloudinary
 */

import fs from 'fs'
import path from 'path'

export interface ImageData {
  id: string
  name: string
  url: string
  category: string
  size: number
  uploadDate: string
  description: string
  uploadedAt: string
  source: 'cloudinary' | 'local' | 'external'
  cloudinary?: {
    public_id: string
    width: number
    height: number
    format: string
    tags: string[]
  }
  originalMongoId?: string
  originalCollection?: string
}

export interface GalleryProject {
  id: number
  title: string
  category: 'kitchen' | 'bathroom' | 'commercial' | 'other'
  image: string
  description: string
  location: string
  date: string
  budget: string
  duration: string
  features: string[]
}

class ImageManager {
  private static instance: ImageManager
  private imagesData: ImageData[] = []
  private galleryProjects: GalleryProject[] = []
  private dataLoaded = false

  static getInstance(): ImageManager {
    if (!ImageManager.instance) {
      ImageManager.instance = new ImageManager()
    }
    return ImageManager.instance
  }

  private loadData() {
    if (this.dataLoaded) return

    try {
      // Load images data
      const imagesPath = path.join(process.cwd(), 'data', 'images.json')
      if (fs.existsSync(imagesPath)) {
        const imagesData = fs.readFileSync(imagesPath, 'utf8')
        this.imagesData = JSON.parse(imagesData)
      }

      // Load gallery projects if available
      const galleryPath = path.join(process.cwd(), 'data', 'gallery-projects.json')
      if (fs.existsSync(galleryPath)) {
        const galleryData = fs.readFileSync(galleryPath, 'utf8')
        this.galleryProjects = JSON.parse(galleryData)
      }

      this.dataLoaded = true
    } catch (error) {
      console.error('Error loading image data:', error)
    }
  }

  /**
   * Get all images
   */
  getAllImages(): ImageData[] {
    this.loadData()
    return this.imagesData
  }

  /**
   * Get images by category
   */
  getImagesByCategory(category: string): ImageData[] {
    this.loadData()
    return this.imagesData.filter(img => 
      img.category.toLowerCase() === category.toLowerCase()
    )
  }

  /**
   * Get random images from a category
   */
  getRandomImagesByCategory(category: string, count: number = 4): ImageData[] {
    const categoryImages = this.getImagesByCategory(category)
    const shuffled = [...categoryImages].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  /**
   * Get a single image by ID
   */
  getImageById(id: string): ImageData | null {
    this.loadData()
    return this.imagesData.find(img => img.id === id) || null
  }

  /**
   * Get optimized Cloudinary URL
   */
  getOptimizedUrl(image: ImageData, options: {
    width?: number
    height?: number
    quality?: number | 'auto'
    format?: 'auto' | 'webp' | 'jpg' | 'png'
    crop?: 'fill' | 'fit' | 'scale' | 'crop'
  } = {}): string {
    if (image.source !== 'cloudinary' || !image.cloudinary) {
      return image.url
    }

    const {
      width,
      height,
      quality = 'auto',
      format = 'auto',
      crop = 'fill'
    } = options

    // Build transformation string
    const transformations = []
    
    if (width || height) {
      const dimensions = [
        width && `w_${width}`,
        height && `h_${height}`,
        `c_${crop}`
      ].filter(Boolean).join(',')
      transformations.push(dimensions)
    }
    
    transformations.push(`q_${quality}`)
    transformations.push(`f_${format}`)

    const baseUrl = image.url.split('/upload/')[0]
    const imagePath = image.url.split('/upload/')[1]
    
    return `${baseUrl}/upload/${transformations.join(',')}/${imagePath}`
  }

  /**
   * Get gallery projects
   */
  getGalleryProjects(): GalleryProject[] {
    this.loadData()
    return this.galleryProjects
  }

  /**
   * Get gallery projects by category
   */
  getGalleryProjectsByCategory(category: string): GalleryProject[] {
    this.loadData()
    if (category === 'all') return this.galleryProjects
    
    return this.galleryProjects.filter(project => 
      project.category === category
    )
  }

  /**
   * Create fallback images for components that need them
   */
  getFallbackImages(): { [key: string]: string } {
    const fallbacks: { [key: string]: string } = {}
    
    // Try to get real images first
    const kitchenImages = this.getImagesByCategory('kitchen')
    const bathroomImages = this.getImagesByCategory('bathroom')
    const commercialImages = this.getImagesByCategory('commercial')
    
    // Use real images if available, otherwise fallback to demo
    fallbacks.kitchen = kitchenImages[0]?.url || 'https://res.cloudinary.com/demo/image/upload/c_fill,w_800,h_600,q_auto,f_webp/kitchen_1'
    fallbacks.bathroom = bathroomImages[0]?.url || 'https://res.cloudinary.com/demo/image/upload/c_fill,w_800,h_600,q_auto,f_webp/bathroom_1'
    fallbacks.commercial = commercialImages[0]?.url || 'https://res.cloudinary.com/demo/image/upload/c_fill,w_800,h_600,q_auto,f_webp/office_1'
    fallbacks.hero = kitchenImages[0]?.url || 'https://res.cloudinary.com/demo/image/upload/c_fill,w_1200,h_800,q_auto,f_webp/kitchen_1'
    
    return fallbacks
  }

  /**
   * Get images for a specific component
   */
  getComponentImages(component: 'hero' | 'services' | 'gallery' | 'testimonials', count?: number): ImageData[] {
    this.loadData()
    
    switch (component) {
      case 'hero':
        return this.imagesData.filter(img => 
          img.category.toLowerCase().includes('featured') || 
          img.category.toLowerCase().includes('hero')
        ).slice(0, count || 1)
      
      case 'services':
        const categories = ['kitchen', 'bathroom', 'commercial']
        return categories.map(category => 
          this.getImagesByCategory(category)[0]
        ).filter(Boolean).slice(0, count || 3)
      
      case 'gallery':
        return this.imagesData.slice(0, count || 12)
      
      case 'testimonials':
        return this.getImagesByCategory('people').slice(0, count || 6)
      
      default:
        return []
    }
  }

  /**
   * Search images by name or description
   */
  searchImages(query: string): ImageData[] {
    this.loadData()
    const lowerQuery = query.toLowerCase()
    
    return this.imagesData.filter(img =>
      img.name.toLowerCase().includes(lowerQuery) ||
      img.description.toLowerCase().includes(lowerQuery) ||
      img.category.toLowerCase().includes(lowerQuery) ||
      (img.cloudinary?.tags || []).some(tag => 
        tag.toLowerCase().includes(lowerQuery)
      )
    )
  }

  /**
   * Get image statistics
   */
  getStats() {
    this.loadData()
    
    const categoryStats = this.imagesData.reduce((acc, img) => {
      acc[img.category] = (acc[img.category] || 0) + 1
      return acc
    }, {} as { [key: string]: number })

    const sourceStats = this.imagesData.reduce((acc, img) => {
      acc[img.source] = (acc[img.source] || 0) + 1
      return acc
    }, {} as { [key: string]: number })

    return {
      total: this.imagesData.length,
      categories: categoryStats,
      sources: sourceStats,
      totalSize: this.imagesData.reduce((sum, img) => sum + img.size, 0),
      galleryProjects: this.galleryProjects.length
    }
  }
}

// Export singleton instance
export const imageManager = ImageManager.getInstance()

// Export utility functions
export function getImagesByCategory(category: string): ImageData[] {
  return imageManager.getImagesByCategory(category)
}

export function getOptimizedImageUrl(image: ImageData, options: {
  width?: number
  height?: number
  quality?: number | 'auto'
  format?: 'auto' | 'webp' | 'jpg' | 'png'
  crop?: 'fill' | 'fit' | 'scale' | 'crop'
} = {}): string {
  return imageManager.getOptimizedUrl(image, options)
}

export function getGalleryProjects(category?: string): GalleryProject[] {
  if (category) {
    return imageManager.getGalleryProjectsByCategory(category)
  }
  return imageManager.getGalleryProjects()
}

export function getFallbackImages(): { [key: string]: string } {
  return imageManager.getFallbackImages()
}

export default imageManager
