'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Upload, Edit, Trash2, Eye, Plus, Save, X } from 'lucide-react'

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

    const categories = ['all', 'Kitchen', 'Bathroom', 'Commercial', 'Brand']

    useEffect(() => {
        fetchImages()
    }, [])

    const fetchImages = async () => {
        try {
            const response = await fetch('/api/images')
            if (response.ok) {
                const data = await response.json()
                setImages(data.data || [])
            }
        } catch (error) {
            console.error('Error fetching images:', error)
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
            // This would typically send to an API endpoint
            const updatedImages = images.map(img =>
                img.id === editingImage.id ? editingImage : img
            )
            setImages(updatedImages)
            setEditingImage(null)

            // In a real implementation, you'd save to your data store
            console.log('Saving image:', editingImage)
        } catch (error) {
            console.error('Error saving image:', error)
        }
    }

    const handleDelete = async (imageId: string) => {
        if (confirm('Are you sure you want to delete this image?')) {
            const updatedImages = images.filter(img => img.id !== imageId)
            setImages(updatedImages)
        }
    }

    const testImageUrl = async (url: string): Promise<boolean> => {
        try {
            const response = await fetch(url, { method: 'HEAD' })
            return response.ok
        } catch {
            return false
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

            const imageData: ImageData = {
                id: `img-${Date.now()}`,
                name: newImage.name!,
                url: newImage.url!,
                category: newImage.category!,
                description: newImage.description!,
                source: newImage.source as 'external',
                size: 0,
                uploadDate: new Date().toISOString().split('T')[0]
            }

            setImages([...images, imageData])
            setShowAddForm(false)
            setNewImage({ name: '', url: '', category: 'Kitchen', description: '', source: 'external' })
        }

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-6 shadow-lg mb-6"
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Add New Image</h3>
                    <button
                        onClick={() => setShowAddForm(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={newImage.name || ''}
                            onChange={(e) => setNewImage({ ...newImage, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                            placeholder="Image name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select
                            value={newImage.category || 'Kitchen'}
                            onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                        >
                            {categories.filter(cat => cat !== 'all').map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input
                            type="url"
                            value={newImage.url || ''}
                            onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                            placeholder="https://images.unsplash.com/..."
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            value={newImage.description || ''}
                            onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                            rows={2}
                            placeholder="Image description"
                        />
                    </div>
                </div>

                <div className="flex gap-2 mt-4">
                    <button
                        onClick={handleAdd}
                        className="bg-accent-600 text-white px-4 py-2 rounded-md hover:bg-accent-700 flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Add Image
                    </button>
                </div>
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
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Image Manager</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="bg-accent-600 text-white px-4 py-2 rounded-md hover:bg-accent-700 flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Image
                        </button>
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                            >
                                Close
                            </button>
                        )}
                    </div>
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

                {showAddForm && <AddImageForm />}

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
                                        onClick={() => handleEdit(image)}
                                        className="flex-1 bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-200 flex items-center justify-center gap-1"
                                    >
                                        <Edit className="w-3 h-3" />
                                        Edit
                                    </button>
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

                {/* Edit Modal */}
                {editingImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-lg p-6 w-full max-w-md"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Edit Image</h3>
                                <button
                                    onClick={() => setEditingImage(null)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

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
                                    <label className="block text-sm font-medium mb-1">URL</label>
                                    <input
                                        type="url"
                                        value={editingImage.url}
                                        onChange={(e) => setEditingImage({ ...editingImage, url: e.target.value })}
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

                            <div className="flex gap-2 mt-6">
                                <button
                                    onClick={handleSave}
                                    className="flex-1 bg-accent-600 text-white px-4 py-2 rounded-md hover:bg-accent-700 flex items-center justify-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditingImage(null)}
                                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ImageManager
