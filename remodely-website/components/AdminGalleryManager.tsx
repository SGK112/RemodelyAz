'use client'

import { useState, useEffect } from 'react'
import AdminNavigation from './AdminNavigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Upload,
    Search,
    Filter,
    Trash2,
    Edit3,
    Eye,
    Download,
    Plus,
    Grid3X3,
    List,
    Tag,
    Calendar,
    FileImage,
    Zap,
    Cloud,
    Check,
    X,
    Copy,
    ExternalLink
} from 'lucide-react'

interface CloudinaryImage {
    id: string
    name: string
    url: string
    category: string
    tags: string[]
    size: number
    width: number
    height: number
    format: string
    uploadDate: string
    cloudinaryId: string
    isOptimized: boolean
}

const AdminGalleryManager = () => {
    const [images, setImages] = useState<CloudinaryImage[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [selectedImages, setSelectedImages] = useState<string[]>([])
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [showImageEditor, setShowImageEditor] = useState<CloudinaryImage | null>(null)

    const categories = ['all', 'Kitchen', 'Bathroom', 'Living Room', 'Bedroom', 'Commercial', 'Outdoor']

    // Load images from Cloudinary via API
    useEffect(() => {
        loadImages()
    }, [])

    const loadImages = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/admin/gallery')
            const data = await response.json()
            setImages(data.images || [])
        } catch (error) {
            console.error('Failed to load images:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleImageUpload = async (files: FileList) => {
        setUploading(true)
        const uploadPromises = Array.from(files).map(async (file) => {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('category', selectedCategory === 'all' ? 'Kitchen' : selectedCategory)

            const response = await fetch('/api/admin/gallery/upload', {
                method: 'POST',
                body: formData
            })

            return response.json()
        })

        try {
            await Promise.all(uploadPromises)
            await loadImages() // Refresh the gallery
            setShowUploadModal(false)
        } catch (error) {
            console.error('Upload failed:', error)
        } finally {
            setUploading(false)
        }
    }

    const handleImageDelete = async (imageId: string) => {
        try {
            await fetch(`/api/admin/gallery/${imageId}`, { method: 'DELETE' })
            setImages(images.filter(img => img.id !== imageId))
            setSelectedImages(selectedImages.filter(id => id !== imageId))
        } catch (error) {
            console.error('Delete failed:', error)
        }
    }

    const handleBulkDelete = async () => {
        const deletePromises = selectedImages.map(id =>
            fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' })
        )

        try {
            await Promise.all(deletePromises)
            setImages(images.filter(img => !selectedImages.includes(img.id)))
            setSelectedImages([])
        } catch (error) {
            console.error('Bulk delete failed:', error)
        }
    }

    const filteredImages = images.filter(image => {
        const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const toggleImageSelection = (imageId: string) => {
        setSelectedImages(prev =>
            prev.includes(imageId)
                ? prev.filter(id => id !== imageId)
                : [...prev, imageId]
        )
    }

    const copyImageUrl = (url: string) => {
        navigator.clipboard.writeText(url)
        // You could add a toast notification here
    }

    return (
        <>
            <AdminNavigation />
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <FileImage className="w-8 h-8 text-accent-600 mr-3" />
                                <h1 className="text-2xl font-bold text-gray-900">Gallery Manager</h1>
                                <div className="ml-4 px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium">
                                    <Cloud className="w-4 h-4 inline mr-1" />
                                    Cloudinary Powered
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setShowUploadModal(true)}
                                    className="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Upload Images</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            {/* Search and Filter */}
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                                <div className="relative">
                                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search images..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 w-full sm:w-64"
                                    />
                                </div>

                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category === 'all' ? 'All Categories' : category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* View Controls */}
                            <div className="flex items-center space-x-4">
                                {selectedImages.length > 0 && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-600">
                                            {selectedImages.length} selected
                                        </span>
                                        <button
                                            onClick={handleBulkDelete}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                )}

                                <div className="flex bg-gray-100 rounded-lg p-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                                    >
                                        <Grid3X3 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gallery Grid/List */}
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                                <div className="w-8 h-8 border-4 border-accent-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-600">Loading gallery...</p>
                            </div>
                        </div>
                    ) : (
                        <div className={viewMode === 'grid'
                            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                            : "space-y-4"
                        }>
                            <AnimatePresence>
                                {filteredImages.map((image, index) => (
                                    <motion.div
                                        key={image.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className={viewMode === 'grid'
                                            ? "group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                                            : "bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4"
                                        }
                                        onClick={() => toggleImageSelection(image.id)}
                                    >
                                        {viewMode === 'grid' ? (
                                            <>
                                                {/* Grid View */}
                                                <div className="aspect-square relative">
                                                    <Image
                                                        src={image.url}
                                                        alt={image.name}
                                                        fill
                                                        className="object-cover"
                                                    />

                                                    {/* Selection Overlay */}
                                                    <div className={`absolute inset-0 bg-accent-600/20 flex items-center justify-center transition-opacity ${selectedImages.includes(image.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                                        }`}>
                                                        {selectedImages.includes(image.id) && (
                                                            <div className="w-6 h-6 bg-accent-600 rounded-full flex items-center justify-center">
                                                                <Check className="w-4 h-4 text-white" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Optimization Badge */}
                                                    {image.isOptimized && (
                                                        <div className="absolute top-2 left-2">
                                                            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                                                                <Zap className="w-3 h-3" />
                                                                <span>Optimized</span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Action Buttons */}
                                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <div className="flex space-x-1">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    copyImageUrl(image.url)
                                                                }}
                                                                className="bg-black/50 hover:bg-black/70 text-white p-1 rounded backdrop-blur-sm"
                                                            >
                                                                <Copy className="w-3 h-3" />
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    window.open(image.url, '_blank')
                                                                }}
                                                                className="bg-black/50 hover:bg-black/70 text-white p-1 rounded backdrop-blur-sm"
                                                            >
                                                                <ExternalLink className="w-3 h-3" />
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    setShowImageEditor(image)
                                                                }}
                                                                className="bg-black/50 hover:bg-black/70 text-white p-1 rounded backdrop-blur-sm"
                                                            >
                                                                <Edit3 className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Image Info */}
                                                <div className="p-3">
                                                    <h3 className="font-medium text-gray-900 truncate mb-1">{image.name}</h3>
                                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                                        <span className="bg-gray-100 px-2 py-1 rounded">{image.category}</span>
                                                        <span>{image.format.toUpperCase()}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                                                        <span>{image.width}×{image.height}</span>
                                                        <span>{(image.size / 1024).toFixed(1)}KB</span>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {/* List View */}
                                                <div className="flex-shrink-0">
                                                    <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                                                        <Image
                                                            src={image.url}
                                                            alt={image.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium text-gray-900 truncate">{image.name}</h3>
                                                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">{image.category}</span>
                                                        <span>{image.width}×{image.height}</span>
                                                        <span>{(image.size / 1024).toFixed(1)}KB</span>
                                                        <span>{image.format.toUpperCase()}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2 mt-2">
                                                        {image.tags.map(tag => (
                                                            <span key={tag} className="bg-accent-100 text-accent-700 px-2 py-1 rounded-full text-xs">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    {selectedImages.includes(image.id) && (
                                                        <div className="w-5 h-5 bg-accent-600 rounded-full flex items-center justify-center">
                                                            <Check className="w-3 h-3 text-white" />
                                                        </div>
                                                    )}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            copyImageUrl(image.url)
                                                        }}
                                                        className="text-gray-400 hover:text-gray-600"
                                                    >
                                                        <Copy className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setShowImageEditor(image)
                                                        }}
                                                        className="text-gray-400 hover:text-gray-600"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleImageDelete(image.id)
                                                        }}
                                                        className="text-red-400 hover:text-red-600"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}

                    {filteredImages.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <FileImage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
                            <p className="text-gray-600 mb-4">
                                {searchTerm || selectedCategory !== 'all'
                                    ? 'Try adjusting your search or filter criteria.'
                                    : 'Start by uploading some images to your gallery.'
                                }
                            </p>
                            <button
                                onClick={() => setShowUploadModal(true)}
                                className="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-lg font-medium"
                            >
                                Upload Your First Images
                            </button>
                        </div>
                    )}
                </div>

                {/* Upload Modal */}
                {showUploadModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-md w-full p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold">Upload Images</h2>
                                <button
                                    onClick={() => setShowUploadModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-4">Drag and drop images here, or click to browse</p>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer inline-block"
                                >
                                    Choose Images
                                </label>
                            </div>

                            {uploading && (
                                <div className="mt-4 text-center">
                                    <div className="w-6 h-6 border-4 border-accent-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                                    <p className="text-gray-600">Uploading to Cloudinary...</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default AdminGalleryManager
