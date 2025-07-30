'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  Upload,
  Search,
  Filter,
  Trash2,
  Edit3,
  X,
  Plus,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  Tag,
  Calendar,
  Folder,
  Loader,
  Check,
  AlertCircle
} from 'lucide-react'
import SafeImage from '@/components/SafeImage'

interface UnifiedImageData {
  id: string
  name: string
  url: string
  category: 'kitchen' | 'bathroom' | 'commercial' | 'tile' | 'countertops' | 'cabinets' | 'blog' | 'hero' | 'general'
  description: string
  alt: string
  tags: string[]
  size: number
  width?: number
  height?: number
  format?: string
  uploadDate: string
  isActive: boolean
  source: 'cloudinary' | 'local' | 'external'
  cloudinary?: {
    public_id: string
    secure_url: string
    width: number
    height: number
    format: string
    created_at: string
    tags: string[]
  }
  thumbnailUrl?: string
  mediumUrl?: string
  largeUrl?: string
}

interface Category {
  id: string
  name: string
  count: number
}

interface ImageManagerProps {
  allowUpload?: boolean
  allowDelete?: boolean
  allowEdit?: boolean
  onImageSelect?: (image: UnifiedImageData) => void
  selectedImages?: Set<string>
  maxSelection?: number
  categories?: string[]
}

const ImageManager = ({
  allowUpload = true,
  allowDelete = true,
  allowEdit = true,
  onImageSelect,
  selectedImages = new Set(),
  maxSelection,
  categories: allowedCategories
}: ImageManagerProps) => {
  const [images, setImages] = useState<UnifiedImageData[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSource, setSelectedSource] = useState('all')
  const [showInactive, setShowInactive] = useState(false)

  // Upload states
  const [isUploading, setIsUploading] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [uploadFiles, setUploadFiles] = useState<File[]>([])
  const [uploadCategory, setUploadCategory] = useState('general')
  const [uploadDescription, setUploadDescription] = useState('')
  const [uploadTags, setUploadTags] = useState('')

  // Edit states
  const [editingImage, setEditingImage] = useState<UnifiedImageData | null>(null)
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    category: 'general',
    tags: '',
    isActive: true
  })

  // View states
  const [viewingImage, setViewingImage] = useState<UnifiedImageData | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Notification states
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info'
    message: string
  } | null>(null)

  const showNotification = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 4000)
  }, [])

  const loadImages = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCategory !== 'all') params.set('category', selectedCategory)
      if (searchTerm) params.set('search', searchTerm)
      if (selectedSource !== 'all') params.set('source', selectedSource)
      if (showInactive) params.set('includeInactive', 'true')

      const response = await fetch(`/api/admin/images?${params}`)
      const data = await response.json()

      if (response.ok) {
        setImages(data.images)
        setCategories(data.categories)
      } else {
        showNotification('error', data.error || 'Failed to load images')
      }
    } catch (error) {
      console.error('Error loading images:', error)
      showNotification('error', 'Failed to load images')
    } finally {
      setLoading(false)
    }
  }, [selectedCategory, searchTerm, selectedSource, showInactive, showNotification])

  useEffect(() => {
    loadImages()
  }, [loadImages])

  const handleUpload = async () => {
    if (uploadFiles.length === 0) return

    setIsUploading(true)
    let successCount = 0
    let errorCount = 0

    try {
      for (const file of uploadFiles) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('category', uploadCategory)
        formData.append('description', uploadDescription)
        formData.append('name', file.name.replace(/\.[^/.]+$/, ''))
        formData.append('tags', JSON.stringify(uploadTags.split(',').map(t => t.trim()).filter(Boolean)))

        const response = await fetch('/api/admin/images', {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          successCount++
        } else {
          errorCount++
          console.error('Upload failed for', file.name)
        }
      }

      if (successCount > 0) {
        showNotification('success', `Successfully uploaded ${successCount} image${successCount > 1 ? 's' : ''}`)
        setShowUpload(false)
        setUploadFiles([])
        setUploadDescription('')
        setUploadTags('')
        loadImages()
      }

      if (errorCount > 0) {
        showNotification('error', `Failed to upload ${errorCount} image${errorCount > 1 ? 's' : ''}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      showNotification('error', 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const handleEdit = async () => {
    if (!editingImage) return

    try {
      const response = await fetch(`/api/admin/images?id=${editingImage.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editForm.name,
          description: editForm.description,
          category: editForm.category,
          tags: editForm.tags.split(',').map(t => t.trim()).filter(Boolean),
          isActive: editForm.isActive
        })
      })

      if (response.ok) {
        showNotification('success', 'Image updated successfully')
        setEditingImage(null)
        loadImages()
      } else {
        const data = await response.json()
        showNotification('error', data.error || 'Failed to update image')
      }
    } catch (error) {
      console.error('Edit error:', error)
      showNotification('error', 'Failed to update image')
    }
  }

  const handleDelete = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image? This cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/images?id=${imageId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        showNotification('success', 'Image deleted successfully')
        loadImages()
      } else {
        const data = await response.json()
        showNotification('error', data.error || 'Failed to delete image')
      }
    } catch (error) {
      console.error('Delete error:', error)
      showNotification('error', 'Failed to delete image')
    }
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    showNotification('info', 'URL copied to clipboard')
  }

  const filteredCategories = categories.filter(cat =>
    !allowedCategories || allowedCategories.includes(cat.id)
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Image Manager</h1>
            <p className="text-gray-600">Upload, organize, and manage your images</p>
          </div>

          {allowUpload && (
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Upload Images
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-gray-900">{images.length}</div>
            <div className="text-sm text-gray-600">Total Images</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{images.filter(img => img.source === 'cloudinary').length}</div>
            <div className="text-sm text-gray-600">Cloudinary</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{images.filter(img => img.isActive).length}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-gray-600">{Math.round(images.reduce((sum, img) => sum + img.size, 0) / 1024 / 1024)}MB</div>
            <div className="text-sm text-gray-600">Total Size</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {filteredCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>

          {/* Source Filter */}
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Sources</option>
            <option value="cloudinary">Cloudinary</option>
            <option value="local">Local</option>
            <option value="external">External</option>
          </select>

          {/* View Options */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showInactive}
                onChange={(e) => setShowInactive(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Show inactive</span>
            </label>
          </div>
        </div>
      </div>

      {/* Image Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {images.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-white rounded-lg shadow-sm overflow-hidden group relative ${selectedImages.has(image.id) ? 'ring-2 ring-blue-500' : ''
                } ${!image.isActive ? 'opacity-50' : ''}`}
            >
              {/* Image */}
              <div
                className="relative aspect-square cursor-pointer"
                onClick={() => onImageSelect ? onImageSelect(image) : setViewingImage(image)}
              >
                <SafeImage
                  src={image.thumbnailUrl || image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />

                {/* Status indicators */}
                <div className="absolute top-2 left-2 flex gap-1">
                  {image.source === 'cloudinary' && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Cloud
                    </span>
                  )}
                  {!image.isActive && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                      Inactive
                    </span>
                  )}
                </div>

                {/* Action buttons */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setViewingImage(image)
                    }}
                    className="bg-white text-gray-700 p-1 rounded shadow hover:bg-gray-50"
                    title="View"
                  >
                    <Eye className="w-3 h-3" />
                  </button>

                  {allowEdit && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditingImage(image)
                        setEditForm({
                          name: image.name,
                          description: image.description,
                          category: image.category,
                          tags: image.tags.join(', '),
                          isActive: image.isActive
                        })
                      }}
                      className="bg-white text-gray-700 p-1 rounded shadow hover:bg-gray-50"
                      title="Edit"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                  )}

                  {allowDelete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(image.id)
                      }}
                      className="bg-white text-red-600 p-1 rounded shadow hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm mb-1 truncate">
                  {image.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="capitalize">{image.category}</span>
                  <span>•</span>
                  <span>{Math.round(image.size / 1024)}KB</span>
                  {image.width && image.height && (
                    <>
                      <span>•</span>
                      <span>{image.width}×{image.height}</span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowUpload(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Upload Images</h2>
                <button
                  onClick={() => setShowUpload(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* File Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Images
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setUploadFiles(Array.from(e.target.files || []))}
                    className="w-full"
                  />
                  {uploadFiles.length > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      {uploadFiles.length} file{uploadFiles.length > 1 ? 's' : ''} selected
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="general">General</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="bathroom">Bathroom</option>
                    <option value="commercial">Commercial</option>
                    <option value="tile">Tile Work</option>
                    <option value="countertops">Countertops</option>
                    <option value="cabinets">Cabinets</option>
                    <option value="blog">Blog Images</option>
                    <option value="hero">Hero Images</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                    placeholder="Describe these images..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={uploadTags}
                    onChange={(e) => setUploadTags(e.target.value)}
                    placeholder="modern, renovation, luxury..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowUpload(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={uploadFiles.length === 0 || isUploading}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    Upload
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setEditingImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Edit Image</h2>
                <button
                  onClick={() => setEditingImage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Preview */}
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <SafeImage
                    src={editingImage.thumbnailUrl || editingImage.url}
                    alt={editingImage.alt}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="general">General</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="bathroom">Bathroom</option>
                    <option value="commercial">Commercial</option>
                    <option value="tile">Tile Work</option>
                    <option value="countertops">Countertops</option>
                    <option value="cabinets">Cabinets</option>
                    <option value="blog">Blog Images</option>
                    <option value="hero">Hero Images</option>
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={editForm.tags}
                    onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Active */}
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editForm.isActive}
                      onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setEditingImage(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEdit}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Check className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {viewingImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
            onClick={() => setViewingImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{viewingImage.name}</h2>
                <button
                  onClick={() => setViewingImage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image */}
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <SafeImage
                    src={viewingImage.largeUrl || viewingImage.url}
                    alt={viewingImage.alt}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="capitalize">{viewingImage.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span>{Math.round(viewingImage.size / 1024)}KB</span>
                      </div>
                      {viewingImage.width && viewingImage.height && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Dimensions:</span>
                          <span>{viewingImage.width}×{viewingImage.height}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Source:</span>
                        <span className="capitalize">{viewingImage.source}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Uploaded:</span>
                        <span>{new Date(viewingImage.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {viewingImage.description && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                      <p className="text-sm text-gray-600">{viewingImage.description}</p>
                    </div>
                  )}

                  {viewingImage.tags.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-1">
                        {viewingImage.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">URLs</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 w-20">Original:</span>
                        <button
                          onClick={() => handleCopyUrl(viewingImage.url)}
                          className="flex-1 text-left text-sm text-blue-600 hover:text-blue-800 truncate"
                        >
                          {viewingImage.url}
                        </button>
                        <button
                          onClick={() => handleCopyUrl(viewingImage.url)}
                          className="text-gray-400 hover:text-gray-600"
                          title="Copy URL"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>

                      {viewingImage.thumbnailUrl && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 w-20">Thumbnail:</span>
                          <button
                            onClick={() => handleCopyUrl(viewingImage.thumbnailUrl!)}
                            className="flex-1 text-left text-sm text-blue-600 hover:text-blue-800 truncate"
                          >
                            {viewingImage.thumbnailUrl}
                          </button>
                          <button
                            onClick={() => handleCopyUrl(viewingImage.thumbnailUrl!)}
                            className="text-gray-400 hover:text-gray-600"
                            title="Copy URL"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${notification.type === 'success' ? 'bg-green-600 text-white' :
                notification.type === 'error' ? 'bg-red-600 text-white' :
                  'bg-blue-600 text-white'
              }`}>
              {notification.type === 'success' && <Check className="w-5 h-5" />}
              {notification.type === 'error' && <AlertCircle className="w-5 h-5" />}
              {notification.type === 'info' && <Copy className="w-5 h-5" />}
              <span>{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ImageManager
