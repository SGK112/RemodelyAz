'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SafeImage from './SafeImage'
import {
    Upload,
    Edit3,
    Trash2,
    Eye,
    Plus,
    Save,
    X,
    Camera,
    Cloud,
    RefreshCw,
    ExternalLink,
    Copy,
    CheckCircle,
    AlertCircle,
    Filter,
    Search,
    Grid,
    List,
    Download,
    Share2
} from 'lucide-react'

interface ImageData {
    id: string
    name: string
    url: string
    category: string
    description: string
    source: 'external' | 'local' | 'cloudinary'
    size: number
    uploadDate: string
    cloudinary?: {
        public_id: string
        width: number
        height: number
        format: string
    }
}

interface GalleryProject {
    id: number
    title: string
    category: string
    image: string
    description: string
    location: string
    date: string
    budget: string
    duration: string
    features: string[]
}

const EnhancedImageManager: React.FC = () => {
    const [images, setImages] = useState<ImageData[]>([])
    const [projects, setProjects] = useState<GalleryProject[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedImages, setSelectedImages] = useState<string[]>([])
    const [editingImage, setEditingImage] = useState<ImageData | null>(null)
    const [replacingImage, setReplacingImage] = useState<ImageData | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [searchTerm, setSearchTerm] = useState('')
    const [showBulkActions, setShowBulkActions] = useState(false)
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
    const [uploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const replaceInputRef = useRef<HTMLInputElement>(null)

    const categories = ['all', 'Kitchen', 'Bathroom', 'Commercial', 'Brand', 'Gallery']

    useEffect(() => {
        fetchImages()
        fetchProjects()
    }, [])

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 5000)
            return () => clearTimeout(timer)
        }
    }, [notification])

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message })
    }

    const fetchImages = async () => {
        try {
            console.log('Fetching images from API...')
            const response = await fetch('/api/admin/images')
            console.log('API response status:', response.status, response.ok)

            if (response.ok) {
                const result = await response.json()
                console.log('API result:', result)

                // Handle wrapped response format {success: true, data: [...]}
                const data = result.success && result.data ? result.data : result
                console.log('Images data received:', Array.isArray(data) ? data.length : 'not array', 'images')

                if (Array.isArray(data)) {
                    setImages(data)
                } else {
                    console.error('Expected array but got:', typeof data, data)
                    setImages([])
                    showNotification('error', 'Invalid data format received from API')
                }
            } else {
                const errorText = await response.text()
                console.error('API error:', response.status, errorText)
                showNotification('error', `Failed to load images: ${response.status}`)
            }
        } catch (error) {
            console.error('Error fetching images:', error)
            showNotification('error', 'Failed to load images')
        } finally {
            setLoading(false)
        }
    }

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/admin/gallery-projects')
            if (response.ok) {
                const data = await response.json()
                setProjects(data)
            }
        } catch (error) {
            console.error('Error fetching projects:', error)
        }
    }

    const filteredImages = Array.isArray(images) ? images.filter(img => {
        const matchesCategory = selectedCategory === 'all' || img.category === selectedCategory
        const matchesSearch = img.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            img.description.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    }) : []

    const handleImageSelect = (imageId: string) => {
        setSelectedImages(prev =>
            prev.includes(imageId)
                ? prev.filter(id => id !== imageId)
                : [...prev, imageId]
        )
    }

    const handleSelectAll = () => {
        if (selectedImages.length === filteredImages.length) {
            setSelectedImages([])
        } else {
            setSelectedImages(filteredImages.map(img => img.id))
        }
    }

    const handleBulkDelete = async () => {
        if (!confirm(`Are you sure you want to delete ${selectedImages.length} images? This action cannot be undone.`)) {
            return
        }

        try {
            setLoading(true)
            const promises = selectedImages.map(id =>
                fetch(`/api/admin/images/${id}`, { method: 'DELETE' })
            )

            await Promise.all(promises)

            setImages(prev => prev.filter(img => !selectedImages.includes(img.id)))
            setSelectedImages([])
            showNotification('success', `Successfully deleted ${selectedImages.length} images`)
        } catch (error) {
            showNotification('error', 'Failed to delete some images')
        } finally {
            setLoading(false)
        }
    }

    const handleImageUpload = async (files: FileList | null, category: string = 'Gallery') => {
        if (!files || files.length === 0) return

        setUploading(true)
        setUploadProgress(0)

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i]

                if (!file.type.startsWith('image/')) {
                    showNotification('error', `${file.name} is not a valid image file`)
                    continue
                }

                const formData = new FormData()
                formData.append('image', file)
                formData.append('category', category)
                formData.append('description', `Uploaded: ${file.name}`)

                const response = await fetch('/api/admin/images', {
                    method: 'POST',
                    body: formData
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.error || 'Upload failed')
                }

                setUploadProgress(((i + 1) / files.length) * 100)
            }

            // Refresh the images list from server
            await fetchImages()

            showNotification('success', `Successfully uploaded ${files.length} image(s)!`)

            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        } catch (error) {
            console.error('Upload error:', error)
            showNotification('error', `Failed to upload images: ${error instanceof Error ? error.message : 'Unknown error'}`)
        } finally {
            setUploading(false)
            setUploadProgress(0)
        }
    }

    const handleImageReplace = async (imageId: string, file: File) => {
        try {
            setLoading(true)

            const formData = new FormData()
            formData.append('image', file)
            formData.append('replaceId', imageId)

            const response = await fetch('/api/admin/images/replace', {
                method: 'POST',
                body: formData
            })

            if (response.ok) {
                const result = await response.json()
                // Refresh the images list from server to ensure consistency
                await fetchImages()
                setReplacingImage(null)
                showNotification('success', 'Image replaced successfully!')

                // Update any projects that use this image
                await updateProjectReferences(imageId, result.image.url)
            } else {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Replace failed')
            }
        } catch (error) {
            console.error('Replace error:', error)
            showNotification('error', `Failed to replace image: ${error instanceof Error ? error.message : 'Unknown error'}`)
        } finally {
            setLoading(false)
        }
    }

    const updateProjectReferences = async (imageId: string, newUrl: string) => {
        try {
            const response = await fetch('/api/admin/gallery-projects/update-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageId, newUrl })
            })

            if (response.ok) {
                fetchProjects() // Refresh projects
            }
        } catch (error) {
            console.error('Failed to update project references:', error)
        }
    }

    const handleEdit = async (updatedImage: ImageData) => {
        try {
            setLoading(true)
            const response = await fetch(`/api/admin/images/${updatedImage.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedImage)
            })

            if (response.ok) {
                // Refresh the images list from server to ensure consistency
                await fetchImages()
                setEditingImage(null)
                showNotification('success', 'Image updated successfully!')
            } else {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Update failed')
            }
        } catch (error) {
            console.error('Update error:', error)
            showNotification('error', `Failed to update image: ${error instanceof Error ? error.message : 'Unknown error'}`)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (imageId: string) => {
        if (!confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
            return
        }

        try {
            setLoading(true)
            const response = await fetch(`/api/admin/images/${imageId}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                // Refresh the images list from server to ensure consistency
                await fetchImages()
                showNotification('success', 'Image deleted successfully!')
            } else {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Delete failed')
            }
        } catch (error) {
            console.error('Delete error:', error)
            showNotification('error', `Failed to delete image: ${error instanceof Error ? error.message : 'Unknown error'}`)
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        showNotification('success', 'Copied to clipboard!')
    }

    const getImageUsage = (imageUrl: string) => {
        return projects.filter(project => project.image.includes(imageUrl)).length
    }

    return (
        <div className="space-y-6">
            {/* Enhanced Notification */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 0.9 }}
                        className={`fixed top-6 right-6 z-50 p-4 rounded-xl shadow-2xl backdrop-blur-sm border ${notification.type === 'success'
                            ? 'bg-emerald-500/90 border-emerald-400/50 text-white'
                            : 'bg-red-500/90 border-red-400/50 text-white'
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            {notification.type === 'success' ? (
                                <CheckCircle className="w-5 h-5" />
                            ) : (
                                <AlertCircle className="w-5 h-5" />
                            )}
                            <span className="font-medium">{notification.message}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Enhanced Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 space-x-0 lg:space-x-4">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search images..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full sm:w-64"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="pl-10 pr-8 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category === 'all' ? 'All Categories' : category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    {/* View Mode Toggle */}
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                                ? 'bg-white text-green-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            <Grid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                                ? 'bg-white text-green-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Upload Button */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files, selectedCategory === 'all' ? 'Gallery' : selectedCategory)}
                        className="hidden"
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-4 py-2 rounded-xl font-medium shadow-lg transition-all duration-200 flex items-center disabled:opacity-50"
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Images
                    </motion.button>
                </div>
            </div>

            {/* Selection Controls */}
            {selectedImages.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between"
                >
                    <span className="text-blue-800 font-medium">
                        {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} selected
                    </span>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setSelectedImages([])}
                            className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                            Clear
                        </button>
                        <button
                            onClick={handleBulkDelete}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Selected
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Upload Progress */}
            {uploading && (
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Uploading images...</span>
                        <span className="text-sm text-gray-500">{Math.round(uploadProgress)}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Images Grid/List */}
            <div className={`${viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
                : 'space-y-4'
                }`}>
                {filteredImages.length === 0 && !loading && (
                    <div className="col-span-full text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Camera className="w-16 h-16 mx-auto mb-4" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
                        <p className="text-gray-600">
                            {searchTerm ? 'No images match your search criteria.' : 'Upload some images to get started.'}
                            <br />
                            <small className="text-xs text-gray-400">
                                Debug: {images.length} total images, {filteredImages.length} filtered
                            </small>
                        </p>
                    </div>
                )}

                {filteredImages.map((image, index) => {
                    console.log('Rendering image:', image.name, image.url)
                    return (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 ${selectedImages.includes(image.id) ? 'ring-2 ring-green-500' : ''
                                } ${viewMode === 'list' ? 'flex items-center p-4' : 'overflow-hidden'}`}
                        >
                            {viewMode === 'grid' ? (
                                <>
                                    {/* Grid View */}
                                    <div className="relative">
                                        {/* Selection Checkbox */}
                                        <div className="absolute top-3 left-3 z-10">
                                            <input
                                                type="checkbox"
                                                checked={selectedImages.includes(image.id)}
                                                onChange={() => handleImageSelect(image.id)}
                                                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                            />
                                        </div>

                                        {/* Image */}
                                        <div className="aspect-square relative">
                                            <SafeImage
                                                src={image.url}
                                                alt={image.name}
                                                width={400}
                                                height={400}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Source Badge */}
                                        <div className="absolute top-3 right-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${image.source === 'cloudinary'
                                                ? 'bg-blue-100 text-blue-800'
                                                : image.source === 'local'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {image.source === 'cloudinary' ? '☁️' : image.source === 'local' ? '💾' : '🔗'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 truncate mb-1">{image.name}</h3>
                                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{image.description}</p>
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                            <span>{image.category}</span>
                                            <span>{new Date(image.uploadDate).toLocaleDateString()}</span>
                                        </div>

                                        {/* Usage Count */}
                                        <div className="text-xs text-gray-500 mb-3">
                                            Used in {getImageUsage(image.url)} project{getImageUsage(image.url) !== 1 ? 's' : ''}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex space-x-1">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => setEditingImage(image)}
                                                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit image"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </motion.button>

                                                <input
                                                    ref={replaceInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0]
                                                        if (file) {
                                                            handleImageReplace(image.id, file)
                                                        }
                                                    }}
                                                    className="hidden"
                                                />
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => {
                                                        setReplacingImage(image)
                                                        replaceInputRef.current?.click()
                                                    }}
                                                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="Replace image"
                                                >
                                                    <RefreshCw className="w-4 h-4" />
                                                </motion.button>

                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => copyToClipboard(image.url)}
                                                    className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                    title="Copy URL"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </motion.button>

                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleDelete(image.id)}
                                                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete image"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </motion.button>
                                            </div>

                                            <a
                                                href={image.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                                                title="View full size"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* List View */}
                                    <div className="flex items-center space-x-4 flex-1">
                                        <input
                                            type="checkbox"
                                            checked={selectedImages.includes(image.id)}
                                            onChange={() => handleImageSelect(image.id)}
                                            className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        />

                                        <div className="w-16 h-16 relative flex-shrink-0">
                                            <SafeImage
                                                src={image.url}
                                                alt={image.name}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 truncate">{image.name}</h3>
                                            <p className="text-sm text-gray-600 truncate">{image.description}</p>
                                            <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                                                <span>{image.category}</span>
                                                <span>Used in {getImageUsage(image.url)} projects</span>
                                                <span>{new Date(image.uploadDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${image.source === 'cloudinary'
                                                ? 'bg-blue-100 text-blue-800'
                                                : image.source === 'local'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {image.source}
                                            </span>

                                            <div className="flex space-x-1">
                                                <button
                                                    onClick={() => setEditingImage(image)}
                                                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setReplacingImage(image)
                                                        replaceInputRef.current?.click()
                                                    }}
                                                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="Replace"
                                                >
                                                    <RefreshCw className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() => copyToClipboard(image.url)}
                                                    className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                    title="Copy URL"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(image.id)}
                                                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    )
                })}
            </div>

            {/* Edit Image Modal */}
            {editingImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">Edit Image</h3>
                            <button
                                onClick={() => setEditingImage(null)}
                                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="aspect-square relative rounded-xl overflow-hidden mb-4">
                                    <SafeImage
                                        src={editingImage.url}
                                        alt={editingImage.name}
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p><strong>Source:</strong> {editingImage.source}</p>
                                    <p><strong>Size:</strong> {(editingImage.size / 1024).toFixed(2)} KB</p>
                                    <p><strong>Uploaded:</strong> {new Date(editingImage.uploadDate).toLocaleDateString()}</p>
                                    <p><strong>Used in:</strong> {getImageUsage(editingImage.url)} projects</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Image Name
                                    </label>
                                    <input
                                        type="text"
                                        value={editingImage.name}
                                        onChange={(e) => setEditingImage({ ...editingImage, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={editingImage.category}
                                        onChange={(e) => setEditingImage({ ...editingImage, category: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    >
                                        {categories.filter(cat => cat !== 'all').map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={editingImage.description}
                                        onChange={(e) => setEditingImage({ ...editingImage, description: e.target.value })}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Image URL
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="url"
                                            value={editingImage.url}
                                            readOnly
                                            className="flex-1 px-4 py-3 border border-gray-200 rounded-l-xl bg-gray-50 text-gray-600"
                                        />
                                        <button
                                            onClick={() => copyToClipboard(editingImage.url)}
                                            className="px-4 py-3 bg-gray-200 hover:bg-gray-300 border border-l-0 border-gray-200 rounded-r-xl transition-colors"
                                            title="Copy URL"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 mt-8">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setEditingImage(null)}
                                className="px-6 py-3 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-xl font-medium transition-all duration-200"
                            >
                                Cancel
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEdit(editingImage)}
                                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center"
                            >
                                <Save className="w-5 h-5 mr-2" />
                                Save Changes
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Empty State */}
            {!loading && filteredImages.length === 0 && (
                <div className="text-center py-12">
                    <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {searchTerm || selectedCategory !== 'all' ? 'No images found' : 'No images yet'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                        {searchTerm || selectedCategory !== 'all'
                            ? 'Try adjusting your search or filter criteria'
                            : 'Upload your first images to get started'
                        }
                    </p>
                    {(!searchTerm && selectedCategory === 'all') && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center mx-auto"
                        >
                            <Upload className="w-5 h-5 mr-2" />
                            Upload Your First Images
                        </motion.button>
                    )}
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    <span className="ml-3 text-gray-600">Loading images...</span>
                </div>
            )}
        </div>
    )
}

export default EnhancedImageManager
