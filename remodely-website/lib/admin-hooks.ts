import { useState, useEffect } from 'react'

export interface CompanyData {
  name: string
  address: string
  phone: string
  email: string
  license: string
  description: string
  founded: string
  employees: string
  projectsCompleted: string
}

export interface BlogData {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  tags: string[]
  author: string
  publishedAt: string
  featured: boolean
  readTime?: string
}

export interface ImageData {
  id: string
  name: string
  url: string
  category: string
  size: number
  uploadDate: string
  description: string
  uploadedAt: string
}

// Company data hook
export function useCompanyData() {
  const [data, setData] = useState<CompanyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/company')
      if (!response.ok) throw new Error('Failed to fetch company data')
      const result = await response.json()
      setData(result)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const saveData = async (updates: Partial<CompanyData>) => {
    try {
      const response = await fetch('/api/admin/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      
      if (!response.ok) throw new Error('Failed to save company data')
      
      await fetchData() // Refresh data
      return { success: true, message: 'Company data saved successfully' }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save'
      setError(message)
      return { success: false, message }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, error, saveData, refetch: fetchData }
}

// Blog data hook
export function useBlogData() {
  const [data, setData] = useState<BlogData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/blogs')
      if (!response.ok) throw new Error('Failed to fetch blog data')
      const result = await response.json()
      setData(result)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const saveBlog = async (blog: Partial<BlogData>) => {
    try {
      const method = blog.id ? 'PUT' : 'POST'
      const response = await fetch('/api/admin/blogs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog)
      })
      
      if (!response.ok) throw new Error('Failed to save blog')
      
      await fetchData() // Refresh data
      return { success: true, message: 'Blog saved successfully' }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save'
      setError(message)
      return { success: false, message }
    }
  }

  const deleteBlog = async (id: number) => {
    try {
      const response = await fetch('/api/admin/blogs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      
      if (!response.ok) throw new Error('Failed to delete blog')
      
      await fetchData() // Refresh data
      return { success: true, message: 'Blog deleted successfully' }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete'
      setError(message)
      return { success: false, message }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, error, saveBlog, deleteBlog, refetch: fetchData }
}

// Image data hook
export function useImageData() {
  const [data, setData] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/images')
      if (!response.ok) throw new Error('Failed to fetch image data')
      const result = await response.json()
      setData(result)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const uploadImage = async (file: File, metadata: { category: string; description: string }) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('category', metadata.category)
      formData.append('description', metadata.description)

      const response = await fetch('/api/admin/images', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) throw new Error('Failed to upload image')
      
      await fetchData() // Refresh data
      return { success: true, message: 'Image uploaded successfully' }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to upload'
      setError(message)
      return { success: false, message }
    }
  }

  const updateImage = async (id: string, updates: Partial<ImageData>) => {
    try {
      const response = await fetch('/api/admin/images', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates })
      })
      
      if (!response.ok) throw new Error('Failed to update image')
      
      await fetchData() // Refresh data
      return { success: true, message: 'Image updated successfully' }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update'
      setError(message)
      return { success: false, message }
    }
  }

  const deleteImage = async (id: string) => {
    try {
      const response = await fetch('/api/admin/images', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      
      if (!response.ok) throw new Error('Failed to delete image')
      
      await fetchData() // Refresh data
      return { success: true, message: 'Image deleted successfully' }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete'
      setError(message)
      return { success: false, message }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, error, uploadImage, updateImage, deleteImage, refetch: fetchData }
}
