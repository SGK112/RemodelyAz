'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
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
            const response = await fetch('/api/images')
            if (response.ok) {
                const data = await response.json()
                setImages(data.data || [])
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

                // Upload to Cloudinary via API
                const uploadResponse = await fetch('/api/admin/images/upload', {
                    method: 'POST',
                    body: formData,
                })

                if (!uploadResponse.ok) {
                    throw new Error(`Failed to upload ${file.name}`)
                }

                const result = await uploadResponse.json()

                // Add to images list
                setImages(prev => [...prev, result.data])

                // Update progress
                setUploadProgress(((i + 1) / files.length) * 100)
            }

            showNotification('success', `Successfully uploaded ${files.length} image(s)!`)

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
                    {/* File Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-accent-400 transition-colors">
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e.target.files)}
                            className="hidden"
                        />
                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="font-medium mb-2">Upload from Device</h4>
                        <p className="text-sm text-gray-600 mb-4">
                            Upload photos from your phone or computer
                        </p>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="bg-accent-600 text-white px-4 py-2 rounded-md hover:bg-accent-700 disabled:opacity-50 flex items-center gap-2 mx-auto"
                        >
                            <Upload className="w-4 h-4" />
                            Choose Files
                        </button>
                        {uploading && (
                            <div className="mt-4">
                                <div className="bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-accent-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                                <p className="text-sm text-gray-600 mt-2">Uploading... {Math.round(uploadProgress)}%</p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <NotificationBar />

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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {/* Image */}
                            <div className="relative aspect-square">
                                <Image
                                    src={image.url}
                                    alt={image.name}
                                    fill
                                    className="object-cover"
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
                    ))}
                </div>
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
                                    value={editingImage.name}
                                    onChange={(e) => setEditingImage({ ...editingImage, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <select
                                    value={editingImage.category}
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
                                    value={editingImage.description}
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
