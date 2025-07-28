/**
 * Unified Image Management Hooks
 * React hooks for easy data fetching and management
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { UnifiedImage, GalleryProject } from '@/lib/unified-image-manager'

// Hook for managing images
export function useUnifiedImages(category?: string) {
  const [images, setImages] = useState<UnifiedImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams({ action: 'list' })
      if (category) params.append('category', category)

      const response = await fetch(`/api/unified/images?${params}`)
      const data = await response.json()

      if (data.success) {
        setImages(data.images)
      } else {
        setError(data.error || 'Failed to fetch images')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch images')
    } finally {
      setLoading(false)
    }
  }, [category])

  const uploadImages = useCallback(async (files: File[], uploadCategory: string = 'general', tags: string[] = []) => {
    try {
      const formData = new FormData()
      formData.append('action', 'upload')
      formData.append('category', uploadCategory)
      formData.append('tags', tags.join(','))

      files.forEach(file => formData.append('files', file))

      const response = await fetch('/api/unified/images', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        // Add new images to the beginning of the list
        setImages(prev => [...data.images, ...prev])
        return { success: true, images: data.images }
      } else {
        throw new Error(data.error || 'Upload failed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [])

  const deleteImage = useCallback(async (imageId: string) => {
    try {
      const response = await fetch(`/api/unified/images?imageId=${imageId}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (data.success) {
        setImages(prev => prev.filter(img => img.id !== imageId))
        return { success: true }
      } else {
        throw new Error(data.error || 'Delete failed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Delete failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [])

  const updateImage = useCallback(async (imageId: string, updates: Partial<UnifiedImage>) => {
    try {
      const formData = new FormData()
      formData.append('action', 'update')
      formData.append('imageId', imageId)
      formData.append('updateData', JSON.stringify(updates))

      const response = await fetch('/api/unified/images', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setImages(prev => prev.map(img =>
          img.id === imageId ? data.image : img
        ))
        return { success: true, image: data.image }
      } else {
        throw new Error(data.error || 'Update failed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Update failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [])

  const searchImages = useCallback(async (query: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/unified/images?action=search&query=${encodeURIComponent(query)}`)
      const data = await response.json()

      if (data.success) {
        setImages(data.images)
        return { success: true, images: data.images }
      } else {
        throw new Error(data.error || 'Search failed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  return {
    images,
    loading,
    error,
    refetch: fetchImages,
    uploadImages,
    deleteImage,
    updateImage,
    searchImages
  }
}

// Hook for managing projects
export function useUnifiedProjects(category?: string) {
  const [projects, setProjects] = useState<GalleryProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams({ action: 'list' })
      if (category) params.append('category', category)

      const response = await fetch(`/api/unified/projects?${params}`)
      const data = await response.json()

      if (data.success) {
        setProjects(data.projects)
      } else {
        setError(data.error || 'Failed to fetch projects')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }, [category])

  const createProject = useCallback(async (projectData: Omit<GalleryProject, 'id' | 'sortOrder'>) => {
    try {
      const response = await fetch('/api/unified/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', projectData })
      })

      const data = await response.json()

      if (data.success) {
        setProjects(prev => [data.project, ...prev])
        return { success: true, project: data.project }
      } else {
        throw new Error(data.error || 'Create failed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Create failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [])

  const updateProject = useCallback(async (projectId: string, updates: Partial<GalleryProject>) => {
    try {
      const response = await fetch('/api/unified/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', projectId, updates })
      })

      const data = await response.json()

      if (data.success) {
        setProjects(prev => prev.map(project =>
          project.id === projectId ? data.project : project
        ))
        return { success: true, project: data.project }
      } else {
        throw new Error(data.error || 'Update failed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Update failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [])

  const deleteProject = useCallback(async (projectId: string) => {
    try {
      const response = await fetch(`/api/unified/projects?projectId=${projectId}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (data.success) {
        setProjects(prev => prev.filter(project => project.id !== projectId))
        return { success: true }
      } else {
        throw new Error(data.error || 'Delete failed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Delete failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [])

  const searchProjects = useCallback(async (query: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/unified/projects?action=search&query=${encodeURIComponent(query)}`)
      const data = await response.json()

      if (data.success) {
        setProjects(data.projects)
        return { success: true, projects: data.projects }
      } else {
        throw new Error(data.error || 'Search failed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    searchProjects
  }
}

// Hook for getting image stats
export function useImageStats() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        setError(null)

        const [imageResponse, projectResponse] = await Promise.all([
          fetch('/api/unified/images?action=stats'),
          fetch('/api/unified/projects?action=stats')
        ])

        const [imageData, projectData] = await Promise.all([
          imageResponse.json(),
          projectResponse.json()
        ])

        if (imageData.success && projectData.success) {
          setStats({
            images: imageData.stats,
            projects: projectData.stats
          })
        } else {
          throw new Error('Failed to fetch stats')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading, error }
}
