/**
 * Unified Image Management Component
 * Single component for all image operations - replaces all fragmented image managers
 */

'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { imageManager, UnifiedImage, GalleryProject } from '@/lib/unified-image-manager'

interface UnifiedImageManagerProps {
  mode: 'admin' | 'gallery' | 'selector'
  category?: string
  onImageSelect?: (image: UnifiedImage) => void
  onProjectSelect?: (project: GalleryProject) => void
  className?: string
  maxImages?: number
  allowUpload?: boolean
  allowProjectCreation?: boolean
  showSearch?: boolean
  showFilters?: boolean
  gridColumns?: 2 | 3 | 4 | 5 | 6
}

type ViewMode = 'images' | 'projects' | 'upload'
type FilterMode = 'all' | 'projects' | 'blog' | 'team' | 'general'

export default function UnifiedImageManager({
  mode = 'gallery',
  category,
  onImageSelect,
  onProjectSelect,
  className = '',
  maxImages,
  allowUpload = false,
  allowProjectCreation = false,
  showSearch = true,
  showFilters = true,
  gridColumns = 3
}: UnifiedImageManagerProps) {
  const [images, setImages] = useState<UnifiedImage[]>([])
  const [projects, setProjects] = useState<GalleryProject[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('images')
  const [filter, setFilter] = useState<FilterMode>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set())
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load data on component mount
  useEffect(() => {
    loadData()
  }, [category])

  const loadData = useCallback(async () => {
    try {
      setLoading(true)

      const loadedImages = category
        ? imageManager.getImagesByCategory(category)
        : imageManager.getAllImages()

      const loadedProjects = category
        ? imageManager.getProjectsByCategory(category)
        : imageManager.getAllProjects()

      // Ensure we always have arrays
      setImages(Array.isArray(loadedImages) ? loadedImages : [])
      setProjects(Array.isArray(loadedProjects) ? loadedProjects : [])
    } catch (error) {
      console.error('Failed to load data:', error)
      // Set empty arrays on error
      setImages([])
      setProjects([])
    } finally {
      setLoading(false)
    }
  }, [category])

  // Filter and search logic with safe defaults
  const filteredImages = (Array.isArray(images) ? images : []).filter(image => {
    if (filter !== 'all' && image.category !== filter) return false
    if (searchQuery && !image.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !image.description.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  }).slice(0, maxImages)

  const filteredProjects = (Array.isArray(projects) ? projects : []).filter(project => {
    if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !project.description.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  // Upload handler
  const handleFileUpload = async (files: FileList) => {
    if (!files.length) return

    setUploading(true)
    try {
      const uploadPromises = Array.from(files).map(file =>
        imageManager.uploadImage(file, category || 'general', [])
      )

      const uploadedImages = await Promise.all(uploadPromises)
      
      // Reload all data to ensure consistency with server
      await loadData()

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  // Delete handler
  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      await imageManager.deleteImage(imageId)
      
      // Reload all data to ensure consistency with server
      await loadData()
      
      setSelectedImages(prev => {
        const newSet = new Set(prev)
        newSet.delete(imageId)
        return newSet
      })
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  // Image selection handler
  const handleImageClick = (image: UnifiedImage) => {
    if (mode === 'selector' && onImageSelect) {
      onImageSelect(image)
      return
    }

    if (mode === 'admin') {
      setSelectedImages(prev => {
        const newSet = new Set(prev)
        if (newSet.has(image.id)) {
          newSet.delete(image.id)
        } else {
          newSet.add(image.id)
        }
        return newSet
      })
    }
  }

  // Project selection handler
  const handleProjectClick = (project: GalleryProject) => {
    if (mode === 'selector' && onProjectSelect) {
      onProjectSelect(project)
      return
    }

    setSelectedProject(project.id === selectedProject ? null : project.id)
  }

  const gridColsClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-5',
    6: 'grid-cols-3 md:grid-cols-6'
  }[gridColumns]

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className={`unified-image-manager ${className}`}>
      {/* Header Controls */}
      <div className="mb-6 space-y-4">
        {/* View Mode Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setViewMode('images')}
            className={`px-4 py-2 rounded-lg transition-colors ${viewMode === 'images'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Images ({filteredImages.length})
          </button>

          <button
            onClick={() => setViewMode('projects')}
            className={`px-4 py-2 rounded-lg transition-colors ${viewMode === 'projects'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Projects ({filteredProjects.length})
          </button>

          {allowUpload && (
            <button
              onClick={() => setViewMode('upload')}
              className={`px-4 py-2 rounded-lg transition-colors ${viewMode === 'upload'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Upload
            </button>
          )}
        </div>

        {/* Search and Filters */}
        {showSearch && (
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search images and projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />

            {showFilters && viewMode === 'images' && (
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterMode)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="projects">Projects</option>
                <option value="blog">Blog</option>
                <option value="team">Team</option>
                <option value="general">General</option>
              </select>
            )}
          </div>
        )}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {viewMode === 'upload' && allowUpload && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              className="hidden"
            />

            <div className="space-y-4">
              <div className="text-4xl text-gray-400">📁</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Upload Images
                </h3>
                <p className="text-gray-500 mb-4">
                  Drag and drop images here or click to browse
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="btn-glassmorphic disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Choose Files'}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'images' && (
          <motion.div
            key="images"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredImages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No images found matching your criteria
              </div>
            ) : (
              <div className={`grid ${gridColsClass} gap-4`}>
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`relative group cursor-pointer rounded-lg overflow-hidden ${selectedImages.has(image.id) ? 'ring-2 ring-primary' : ''
                      }`}
                    onClick={() => handleImageClick(image)}
                  >
                    <div className="aspect-square relative">
                      <img
                        src={imageManager.getImageUrl(image.id, {
                          width: 300,
                          height: 300,
                          quality: 80
                        })}
                        alt={image.name}
                        className="w-full h-full object-cover"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-200">
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="text-white text-center">
                            <div className="text-sm font-medium truncate px-2">
                              {image.name}
                            </div>
                            <div className="text-xs opacity-75">
                              {image.category}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Admin controls */}
                      {mode === 'admin' && (
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteImage(image.id)
                            }}
                            className="bg-red-500 text-white p-1 rounded-full text-xs hover:bg-red-600"
                          >
                            ✕
                          </button>
                        </div>
                      )}

                      {/* Selection indicator */}
                      {selectedImages.has(image.id) && (
                        <div className="absolute top-2 left-2 bg-primary text-white p-1 rounded-full text-xs">
                          ✓
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {viewMode === 'projects' && (
          <motion.div
            key="projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No projects found matching your criteria
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 ${selectedProject === project.id ? 'ring-2 ring-primary' : ''
                      }`}
                    onClick={() => handleProjectClick(project)}
                  >
                    {/* Project main image */}
                    {project.mainImage && (
                      <div className="aspect-video relative">
                        <img
                          src={imageManager.getImageUrl(project.mainImage, {
                            width: 400,
                            height: 250,
                            quality: 80
                          })}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Project info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span className="capitalize">{project.category}</span>
                        <span>{project.images.length} images</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selection Summary for Admin Mode */}
      {mode === 'admin' && selectedImages.size > 0 && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border">
          <div className="text-sm text-gray-600 mb-2">
            {selectedImages.size} image{selectedImages.size > 1 ? 's' : ''} selected
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedImages(new Set())}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Clear
            </button>
            <button
              onClick={() => {
                // Handle bulk operations here
                console.log('Bulk action for:', Array.from(selectedImages))
              }}
              className="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary/90"
            >
              Actions
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
