/**
 * Unified Image Management System for RemodelyAz
 * Single source of truth for all image operations across website and admin
 * CLIENT-SIDE ONLY - Server operations handled via API routes
 */

export interface UnifiedImage {
  id: string
  name: string
  url: string
  category: 'projects' | 'blog' | 'team' | 'general'
  subcategory?: string
  description: string
  tags: string[]
  size: number
  width: number
  height: number
  format: string
  uploadDate: string
  isActive: boolean
  source: 'cloudinary' | 'local'
  cloudinary?: {
    public_id: string
    secure_url: string
    width: number
    height: number
    format: string
    created_at: string
    tags: string[]
  }
}

export interface GalleryProject {
  id: string
  title: string
  category: 'kitchen' | 'bathroom' | 'commercial' | 'living-room' | 'bedroom' | 'office' | 'outdoor'
  images: string[] // Array of image IDs
  mainImage: string // Primary image ID
  description: string
  location: string
  completionDate: string
  budget?: string
  duration?: string
  features: string[]
  isActive: boolean
  sortOrder: number
}

export class UnifiedImageManager {
  private static instance: UnifiedImageManager
  private images: Map<string, UnifiedImage> = new Map()
  private projects: Map<string, GalleryProject> = new Map()

  private constructor() {
    this.loadInitialData()
  }

  static getInstance(): UnifiedImageManager {
    if (!UnifiedImageManager.instance) {
      UnifiedImageManager.instance = new UnifiedImageManager()
    }
    return UnifiedImageManager.instance
  }

  // CLIENT-SIDE API OPERATIONS
  async uploadImage(file: File, category: string, tags: string[] = []): Promise<UnifiedImage> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('category', category)
    formData.append('tags', JSON.stringify(tags))

    const response = await fetch('/api/images/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    const image = await response.json()
    this.images.set(image.id, image)
    return image
  }

  async deleteImage(imageId: string): Promise<boolean> {
    const response = await fetch(`/api/images/${imageId}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      this.images.delete(imageId)
      return true
    }
    return false
  }

  async updateImageMetadata(imageId: string, updates: Partial<UnifiedImage>): Promise<UnifiedImage | null> {
    const response = await fetch(`/api/images/${imageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })

    if (!response.ok) return null

    const updatedImage = await response.json()
    this.images.set(imageId, updatedImage)
    return updatedImage
  }

  // GALLERY PROJECT OPERATIONS
  async createProject(projectData: Omit<GalleryProject, 'id' | 'sortOrder'>): Promise<GalleryProject> {
    const response = await fetch('/api/gallery/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    })

    if (!response.ok) {
      throw new Error('Failed to create project')
    }

    const project = await response.json()
    this.projects.set(project.id, project)
    return project
  }

  async updateProject(projectId: string, updates: Partial<GalleryProject>): Promise<GalleryProject | null> {
    const response = await fetch(`/api/gallery/projects/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })

    if (!response.ok) return null

    const updatedProject = await response.json()
    this.projects.set(projectId, updatedProject)
    return updatedProject
  }

  async deleteProject(projectId: string): Promise<boolean> {
    const response = await fetch(`/api/gallery/projects/${projectId}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      this.projects.delete(projectId)
      return true
    }
    return false
  }

  // DATA LOADING
  private async loadInitialData() {
    // Only load data on the client side
    if (typeof window === 'undefined') {
      return // Skip on server-side rendering
    }

    try {
      // Load images
      const imagesResponse = await fetch('/api/images')
      if (imagesResponse.ok) {
        const imagesData = await imagesResponse.json()
        imagesData.forEach((image: UnifiedImage) => {
          this.images.set(image.id, image)
        })
      }

      // Load projects
      const projectsResponse = await fetch('/api/gallery/projects')
      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json()
        projectsData.forEach((project: GalleryProject) => {
          this.projects.set(project.id, project)
        })
      }
    } catch (error) {
      console.error('Failed to load initial data:', error)
    }
  }

  // GETTERS
  getAllImages(): UnifiedImage[] {
    return Array.from(this.images.values())
  }

  getImagesByCategory(category: string): UnifiedImage[] {
    return this.getAllImages().filter(img => img.category === category && img.isActive)
  }

  getImageById(id: string): UnifiedImage | undefined {
    return this.images.get(id)
  }

  getAllProjects(): GalleryProject[] {
    return Array.from(this.projects.values()).sort((a, b) => a.sortOrder - b.sortOrder)
  }

  getProjectsByCategory(category: string): GalleryProject[] {
    return this.getAllProjects().filter(project => project.category === category && project.isActive)
  }

  getProjectById(id: string): GalleryProject | undefined {
    return this.projects.get(id)
  }

  // UTILITY FUNCTIONS
  getImageUrl(imageId: string, options?: { width?: number; height?: number; quality?: number }): string {
    const image = this.images.get(imageId)
    if (!image) return '/images/placeholder.svg'

    if (image.source === 'cloudinary' && image.cloudinary && options) {
      const { width, height, quality = 80 } = options
      let transformation = `q_${quality}`
      
      if (width) transformation += `,w_${width}`
      if (height) transformation += `,h_${height}`
      if (width && height) transformation += ',c_fill'

      return image.cloudinary.secure_url.replace('/upload/', `/upload/${transformation}/`)
    }

    return image.url
  }

  getImagesByTags(tags: string[]): UnifiedImage[] {
    return this.getAllImages().filter(image => 
      tags.some(tag => image.tags.includes(tag))
    )
  }

  searchImages(query: string): UnifiedImage[] {
    const lowercaseQuery = query.toLowerCase()
    return this.getAllImages().filter(image =>
      image.name.toLowerCase().includes(lowercaseQuery) ||
      image.description.toLowerCase().includes(lowercaseQuery) ||
      image.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }

  // STATISTICS
  getImageStats() {
    const images = this.getAllImages()
    const stats = {
      total: images.length,
      byCategory: {} as Record<string, number>,
      bySource: {} as Record<string, number>,
      totalSize: 0,
    }

    images.forEach(image => {
      stats.byCategory[image.category] = (stats.byCategory[image.category] || 0) + 1
      stats.bySource[image.source] = (stats.bySource[image.source] || 0) + 1
      stats.totalSize += image.size
    })

    return stats
  }
}

// Export singleton instance
export const imageManager = UnifiedImageManager.getInstance()

// Export utility functions for direct use
export const getImageUrl = (imageId: string, options?: { width?: number; height?: number; quality?: number }) => {
  return imageManager.getImageUrl(imageId, options)
}

export const getImagesByCategory = (category: string) => {
  return imageManager.getImagesByCategory(category)
}

export const getProjectsByCategory = (category: string) => {
  return imageManager.getProjectsByCategory(category)
}
