import { useState, useEffect } from 'react'
import { ImageData, GalleryProject } from '@/lib/image-manager'

interface UseImagesOptions {
  category?: string
  component?: 'hero' | 'services' | 'gallery' | 'testimonials'
  count?: number
  search?: string
}

interface UseImagesReturn {
  images: ImageData[]
  loading: boolean
  error: string | null
  refetch: () => void
  stats?: {
    total: number
    categories: { [key: string]: number }
    sources: { [key: string]: number }
    totalSize: number
    galleryProjects: number
  }
}

export function useImages(options: UseImagesOptions = {}): UseImagesReturn {
  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<any>(null)

  const fetchImages = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (options.category) params.append('category', options.category)
      if (options.component) params.append('component', options.component)
      if (options.count) params.append('count', options.count.toString())
      if (options.search) params.append('search', options.search)

      const response = await fetch(`/api/images?${params.toString()}`)
      const data = await response.json()

      if (data.success) {
        setImages(data.data)
        setStats(data.stats)
      } else {
        setError(data.error || 'Failed to fetch images')
        setImages([])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setImages([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [options.category, options.component, options.count, options.search])

  return {
    images,
    loading,
    error,
    refetch: fetchImages,
    stats
  }
}

// Hook for gallery projects
export function useGalleryProjects(category?: string) {
  const [projects, setProjects] = useState<GalleryProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (category && category !== 'all') params.append('category', category)

      const response = await fetch(`/api/gallery-projects?${params.toString()}`)
      
      if (response.ok) {
        const data = await response.json()
        setProjects(data.success ? data.data : [])
      } else {
        // Fallback to generating from images
        const imagesResponse = await fetch('/api/images')
        const imagesData = await imagesResponse.json()
        
        if (imagesData.success) {
          const generatedProjects = generateProjectsFromImages(imagesData.data, category)
          setProjects(generatedProjects)
        } else {
          setError('Failed to fetch projects')
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [category])

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects
  }
}

// Helper function to generate projects from images
function generateProjectsFromImages(images: ImageData[], category?: string): GalleryProject[] {
  let filteredImages = images

  if (category && category !== 'all') {
    filteredImages = images.filter(img => 
      img.category.toLowerCase().includes(category.toLowerCase())
    )
  }

  return filteredImages.slice(0, 12).map((img, index) => ({
    id: index + 1,
    title: img.name,
    category: getCategoryFromImage(img),
    image: img.url,
    description: img.description || `Beautiful ${img.category} renovation showcasing premium craftsmanship and modern design.`,
    location: 'Phoenix, AZ',
    date: img.uploadDate,
    budget: getBudgetByCategory(img.category),
    duration: getDurationByCategory(img.category),
    features: getFeaturesByCategory(img.category)
  }))
}

function getCategoryFromImage(img: ImageData): 'kitchen' | 'bathroom' | 'commercial' | 'other' {
  const category = img.category.toLowerCase()
  if (category.includes('kitchen')) return 'kitchen'
  if (category.includes('bathroom') || category.includes('bath')) return 'bathroom'
  if (category.includes('commercial') || category.includes('office')) return 'commercial'
  return 'other'
}

function getBudgetByCategory(category: string): string {
  const cat = category.toLowerCase()
  if (cat.includes('kitchen')) return '$75,000'
  if (cat.includes('bathroom')) return '$45,000'
  if (cat.includes('commercial')) return '$120,000'
  return '$60,000'
}

function getDurationByCategory(category: string): string {
  const cat = category.toLowerCase()
  if (cat.includes('kitchen')) return '4 weeks'
  if (cat.includes('bathroom')) return '3 weeks'
  if (cat.includes('commercial')) return '6 weeks'
  return '3 weeks'
}

function getFeaturesByCategory(category: string): string[] {
  const cat = category.toLowerCase()
  if (cat.includes('kitchen')) return ['Custom Cabinetry', 'Quartz Countertops', 'Smart Appliances', 'LED Lighting']
  if (cat.includes('bathroom')) return ['Walk-in Shower', 'Heated Floors', 'Custom Vanity', 'Premium Fixtures']
  if (cat.includes('commercial')) return ['Modern Layout', 'Professional Finishes', 'Tech Integration', 'Efficient Design']
  return ['Quality Materials', 'Expert Installation', 'Custom Design', 'Premium Finishes']
}

// Hook for optimized image URLs
export function useOptimizedImage(image: ImageData | null, options: {
  width?: number
  height?: number
  quality?: number | 'auto'
  format?: 'auto' | 'webp' | 'jpg' | 'png'
  crop?: 'fill' | 'fit' | 'scale' | 'crop'
} = {}) {
  if (!image) return null

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
