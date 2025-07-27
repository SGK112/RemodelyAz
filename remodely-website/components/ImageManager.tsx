'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SafeImage from './SafeImage'
import { Upload, Edit, Trash2, Eye, Plus, Save, X, Camera, Cloud, Check, AlertCircle } from 'lucide-react'

interface ImageData {
    id: string
    name: string
    url: string
    category: string
    description: string
    source: 'external' | 'local' | 'cloudinary'
    size: number
    uploadDate: string
}

interface ImageManagerProps {
    onClose?: () => void
}

const ImageManager: React.FC<ImageManagerProps> = ({ onClose }) => {
    const [images, setImages] = useState<ImageData[]>([])
    const [loading, setLoading] = useState(true)
    const [editingImage, setEditingImage] = useState<ImageData | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [showAddForm, setShowAddForm] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
    const [dragActive, setDragActive] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const categories = ['all', 'Kitchen', 'Bathroom', 'Commercial', 'Brand']

    useEffect(() => {
        fetchImages()
    }, [])

    // Auto-hide notifications after 5 seconds
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [notification])

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message })
    }

    const fetchImages = async () => {
        try {
            console.log('Fetching images from API...')

            // Try the simple images API first
            let response = await fetch('/api/images')
            console.log('Simple API response status:', response.status)

            if (!response.ok) {
                console.log('Simple API failed, trying admin API...')
                response = await fetch('/api/admin/images')
                console.log('Admin API response status:', response.status)
            }

            if (response.ok) {
                const data = await response.json()
                console.log('Raw API response:', data)
                console.log('Images data received:', data.data?.length || 0, 'images')

                if (data.data && Array.isArray(data.data)) {
                    setImages(data.data)
                    console.log('Images set successfully:', data.data.length)
                } else if (Array.isArray(data)) {
                    setImages(data)
                    console.log('Images set from array:', data.length)
                } else {
                    console.error('Unexpected data format:', data)
                    setImages([])
                }
            } else {
                console.error('Failed to fetch images:', response.statusText)
                showNotification('error', 'Failed to load images')
            }
        } catch (error) {
            console.error('Error fetching images:', error)
            showNotification('error', 'Failed to load images')
        } finally {
            setLoading(false)
        }
    }

    const filteredImages = selectedCategory === 'all'
        ? images
        : images.filter(img => img.category === selectedCategory)

    const handleEdit = (image: ImageData) => {
        setEditingImage({ ...image })
    }

    const handleSave = async () => {
        if (!editingImage) return

        try {
            setLoading(true)
            const response = await fetch(`/api/admin/images/${editingImage.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingImage),
            })

            if (!response.ok) {
                throw new Error('Failed to update image')
            }

            const result = await response.json()
            setImages(prev => prev.map(img =>
                img.id === editingImage.id ? result.data : img
            ))
            setEditingImage(null)
            showNotification('success', 'Image updated successfully!')
        } catch (error) {
            console.error('Error saving image:', error)
            showNotification('error', 'Failed to update image. Please try again.')
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
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete image')
            }

            setImages(prev => prev.filter(img => img.id !== imageId))
            showNotification('success', 'Image deleted successfully!')
        } catch (error) {
            console.error('Error deleting image:', error)
            showNotification('error', 'Failed to delete image. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleFileUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) return

        setUploading(true)
        setUploadProgress(0)
        setDragActive(false)

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i]

                // Validate file type
                if (!file.type.startsWith('image/')) {
                    showNotification('error', `${file.name} is not a valid image file`)
                    continue
                }

                // Create form data for upload
                const formData = new FormData()
                formData.append('file', file)
                formData.append('category', selectedCategory === 'all' ? 'Kitchen' : selectedCategory)

                console.log(`Uploading file ${i + 1}/${files.length}:`, file.name)

                // Upload to Cloudinary via API
                const uploadResponse = await fetch('/api/admin/images/upload', {
                    method: 'POST',
                    body: formData,
                })

                if (!uploadResponse.ok) {
                    const errorData = await uploadResponse.json().catch(() => ({}))
                    console.error('Upload failed:', errorData)
                    throw new Error(`Failed to upload ${file.name}`)
                }

                const result = await uploadResponse.json()
                console.log('Upload result:', result)

                // Add to images list
                setImages(prev => [...prev, result.data])

                // Update progress
                setUploadProgress(((i + 1) / files.length) * 100)
            }

            showNotification('success', `Successfully uploaded ${files.length} image(s)!`)

            // Refresh images from server to ensure consistency
            await fetchImages()

            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        } catch (error) {
            console.error('Upload error:', error)
            showNotification('error', 'Failed to upload images. Please try again.')
        } finally {
            setUploading(false)
            setUploadProgress(0)
        }
    }

    // Drag and drop handlers
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDragIn = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDragActive(true)
        }
    }

    const handleDragOut = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileUpload(e.dataTransfer.files)
        }
    }

    const handleAddExternal = async (imageData: Partial<ImageData>) => {
        try {
            setLoading(true)
            const response = await fetch('/api/admin/images', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...imageData,
                    source: 'external',
                    uploadDate: new Date().toISOString().split('T')[0],
                    uploadedAt: new Date().toISOString(),
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to add image')
            }

            const result = await response.json()
            setImages(prev => [...prev, result.data])
            setShowAddForm(false)
            showNotification('success', 'Image added successfully!')
        } catch (error) {
            console.error('Error adding image:', error)
            showNotification('error', 'Failed to add image. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const AddImageForm = () => {
        const [newImage, setNewImage] = useState<Partial<ImageData>>({
            name: '',
            url: '',
            category: 'Kitchen',
            description: '',
            source: 'external'
        })

        const handleAdd = async () => {
            if (!newImage.name || !newImage.url) return
            await handleAddExternal(newImage)
        }

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow-md mb-6"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Add New Image</h3>
                    <button
                        onClick={() => setShowAddForm(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Upload Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* File Upload with Drag & Drop */}
                    <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${dragActive
                            ? 'border-accent-500 bg-accent-50'
                            : uploading
                                ? 'border-blue-300 bg-blue-50'
                                : 'border-gray-300 hover:border-accent-400'
                            }`}
                        onDragEnter={handleDragIn}
                        onDragLeave={handleDragOut}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e.target.files)}
                            className="hidden"
                        />

                        {uploading ? (
                            <div className="space-y-4">
                                <div className="animate-pulse">
                                    <Cloud className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                                </div>
                                <h4 className="font-medium text-blue-700">Uploading Images...</h4>
                                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-accent-500 h-3 rounded-full transition-all duration-300 ease-out"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                                <p className="text-sm text-blue-600 font-medium">
                                    {Math.round(uploadProgress)}% Complete
                                </p>
                            </div>
                        ) : dragActive ? (
                            <div className="space-y-4">
                                <div className="animate-bounce">
                                    <Upload className="w-12 h-12 text-accent-500 mx-auto" />
                                </div>
                                <h4 className="font-medium text-accent-700">Drop your images here!</h4>
                                <p className="text-sm text-accent-600">
                                    Release to upload your images
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                                <h4 className="font-medium">Drag & Drop Images</h4>
                                <p className="text-sm text-gray-600">
                                    Drag images here or click to browse
                                </p>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="bg-accent-600 text-white px-6 py-2 rounded-lg hover:bg-accent-700 disabled:opacity-50 flex items-center gap-2 mx-auto transition-colors duration-200"
                                >
                                    <Upload className="w-4 h-4" />
                                    Choose Files
                                </button>
                                <p className="text-xs text-gray-500">
                                    Supports: JPG, PNG, GIF, WebP
                                </p>
                            </div>
                        )}
                    </div>

                    {/* External URL */}
                    <div className="border-2 border-gray-300 rounded-lg p-6">
                        <Cloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="font-medium mb-2">Add from URL</h4>
                        <p className="text-sm text-gray-600 mb-4">
                            Add images from web URLs
                        </p>
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Image name"
                                value={newImage.name || ''}
                                onChange={(e) => setNewImage({ ...newImage, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm"
                            />
                            <select
                                value={newImage.category || 'Kitchen'}
                                onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm"
                            >
                                {categories.filter(cat => cat !== 'all').map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            <input
                                type="url"
                                placeholder="https://images.unsplash.com/..."
                                value={newImage.url || ''}
                                onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm"
                            />
                            <textarea
                                placeholder="Description"
                                value={newImage.description || ''}
                                onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm"
                                rows={2}
                            />
                            <button
                                onClick={handleAdd}
                                disabled={!newImage.name || !newImage.url || loading}
                                className="w-full bg-accent-600 text-white px-4 py-2 rounded-md hover:bg-accent-700 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Image
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        )
    }

    // Notification Component
    const NotificationBar = () => {
        if (!notification) return null

        return (
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 ${notification.type === 'success'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                    }`}
            >
                {notification.type === 'success' ? (
                    <Check className="w-5 h-5" />
                ) : (
                    <AlertCircle className="w-5 h-5" />
                )}
                <span>{notification.message}</span>
                <button
                    onClick={() => setNotification(null)}
                    className="ml-2 hover:opacity-80"
                >
                    <X className="w-4 h-4" />
                </button>
            </motion.div>
        )
    }

    return (
        <div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative"
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <NotificationBar />

            {/* Global Drag Overlay */}
            {dragActive && (
                <div className="fixed inset-0 bg-accent-500/20 backdrop-blur-sm flex items-center justify-center z-40">
                    <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-dashed border-accent-500 text-center">
                        <div className="animate-bounce mb-4">
                            <Upload className="w-16 h-16 text-accent-500 mx-auto" />
                        </div>
                        <h3 className="text-xl font-bold text-accent-700 mb-2">Drop Images Here!</h3>
                        <p className="text-accent-600">Release to upload your images</p>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Image Management</h2>
                    <p className="text-gray-600">Manage your website images with Cloudinary integration</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="bg-accent-600 text-white px-4 py-2 rounded-md hover:bg-accent-700 flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Images
                    </button>
                    <button
                        onClick={() => {
                            setLoading(true)
                            fetchImages()
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
                    >
                        <Upload className="w-4 h-4" />
                        Refresh
                    </button>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Add Image Form */}
            {showAddForm && <AddImageForm />}

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                            ? 'bg-accent-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                        {category !== 'all' && (
                            <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                                {images.filter(img => img.category === category).length}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-600"></div>
                    <span className="ml-3 text-gray-600">Loading images...</span>
                </div>
            )}

            {/* Images Grid */}
            {!loading && (
                <>
                    {/* Debug Info */}
                    <div className="mb-4 p-3 bg-gray-100 rounded-lg text-sm text-gray-600">
                        <strong>Debug:</strong> {images.length} total images, {filteredImages.length} filtered
                        {images.length > 0 && (
                            <div className="mt-1">
                                Latest image: {images[images.length - 1]?.name || 'None'}
                                <br />
                                Selected category: {selectedCategory}
                                <br />
                                Sample image URLs: {images.slice(0, 2).map(img => img.url).join(', ')}
                            </div>
                        )}
                        {images.length === 0 && (
                            <div className="mt-1 text-red-600">
                                No images loaded from API. Check console for errors.
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredImages.length > 0 ? (
                            filteredImages.map((image, index) => {
                                console.log(`Rendering image ${index}:`, image.name, image.url)
                                return (
                                    <motion.div
                                        key={image.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                    >
                                        {/* Image */}
                                        <div className="relative aspect-square bg-gray-100">
                                            <SafeImage
                                                src={image.url}
                                                alt={image.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover"
                                                fallbackSrc="https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Image"
                                            />
                                            <div className="absolute top-2 right-2 flex gap-1">
                                                <button
                                                    onClick={() => handleEdit(image)}
                                                    className="bg-white/90 hover:bg-white p-1.5 rounded-full shadow-sm"
                                                >
                                                    <Edit className="w-4 h-4 text-gray-700" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(image.id)}
                                                    className="bg-white/90 hover:bg-white p-1.5 rounded-full shadow-sm"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </button>
                                            </div>
                                            <div className="absolute bottom-2 left-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${image.source === 'cloudinary'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : image.source === 'external'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {image.source}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Image Info */}
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-900 truncate">{image.name}</h3>
                                            <p className="text-sm text-gray-600 mb-2">{image.category}</p>
                                            {image.description && (
                                                <p className="text-xs text-gray-500 truncate">{image.description}</p>
                                            )}
                                            <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                                                <span>{image.uploadDate}</span>
                                                <span>{Math.round(image.size / 1024)}KB</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })
                        ) : (
                            <div className="col-span-full text-center py-8 text-gray-500">
                                No images found in {selectedCategory} category
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* Empty State */}
            {!loading && filteredImages.length === 0 && (
                <div className="text-center py-12">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
                    <p className="text-gray-600 mb-4">
                        {selectedCategory === 'all'
                            ? "You haven't added any images yet."
                            : `No images found in the ${selectedCategory} category.`
                        }
                    </p>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-accent-600 text-white px-4 py-2 rounded-md hover:bg-accent-700 flex items-center gap-2 mx-auto"
                    >
                        <Plus className="w-4 h-4" />
                        Add Your First Image
                    </button>
                </div>
            )}

            {/* Edit Modal */}
            {editingImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="bg-white rounded-lg p-6 w-full max-w-md"
                    >
                        <h3 className="text-lg font-semibold mb-4">Edit Image</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    value={editingImage.name || ''}
                                    onChange={(e) => setEditingImage({ ...editingImage, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <select
                                    value={editingImage.category || 'Kitchen'}
                                    onChange={(e) => setEditingImage({ ...editingImage, category: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                                >
                                    {categories.filter(cat => cat !== 'all').map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    value={editingImage.description || ''}
                                    onChange={(e) => setEditingImage({ ...editingImage, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                                    rows={3}
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleSave}
                                className="bg-accent-600 text-white px-4 py-2 rounded-md hover:bg-accent-700 flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                Save Changes
                            </button>
                            <button
                                onClick={() => setEditingImage(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    )
}

export default ImageManager
