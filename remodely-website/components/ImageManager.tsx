'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Upload, Edit, Trash2, Plus, Save, X, Camera, Cloud, Check, AlertCircle } from 'lucide-react'

interface ImageData {
    id: string
    name: string
    url: string
    category: string
    description: string
    source: 'external' | 'local' | 'cloudinary'
    size?: number
    uploadDate: string
}

interface ImageManagerProps {
    onClose?: () => void
}

const ImageManager: React.FC<ImageManagerProps> = ({ onClose }) => {
    const [images, setImages] = useState<ImageData[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)

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
            const response = await fetch('/api/admin/images')
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

    // Notification Component
    const NotificationBar = () => {
        if (!notification) return null

        return (
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 ${
                    notification.type === 'success' 
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

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-600"></div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <NotificationBar />
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Image Manager</h2>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Close
                        </button>
                    )}
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 mb-6">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                                    ? 'bg-accent-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {category === 'all' ? 'All' : category} ({category === 'all' ? images.length : images.filter(img => img.category === category).length})
                        </button>
                    ))}
                </div>

                {/* Images Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <div className="relative h-48">
                                <Image
                                    src={image.url}
                                    alt={image.name}
                                    fill
                                    className="object-cover"
                                    onError={() => console.log(`Failed to load image: ${image.url}`)}
                                />
                                <div className="absolute top-2 right-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${image.source === 'external' ? 'bg-green-100 text-green-800' :
                                            image.source === 'cloudinary' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {image.source}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-sm truncate">{image.name}</h3>
                                        <span className="text-xs text-gray-500">{image.category}</span>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{image.description}</p>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleDelete(image.id)}
                                        className="bg-red-100 text-red-700 px-3 py-1 rounded text-xs hover:bg-red-200 flex items-center justify-center"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredImages.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Camera className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
                        <p className="text-gray-500">
                            {selectedCategory === 'all' 
                                ? 'No images have been uploaded yet.' 
                                : `No images in the ${selectedCategory} category.`
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ImageManager
