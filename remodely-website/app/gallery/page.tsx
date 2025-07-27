'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

interface GalleryImage {
    id: string
    name: string
    url: string
    category: string
    description?: string
}

const GalleryPage = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null)
    const [currentCategory, setCurrentCategory] = useState('all')
    const [images, setImages] = useState<GalleryImage[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                console.log('Fetching images...')
                setLoading(true)
                setError(null)
                
                const response = await fetch('/api/images')
                console.log('Response status:', response.status)
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
                }
                
                const result = await response.json()
                console.log('Result:', result)
                
                if (!result.success || !result.data) {
                    throw new Error('Invalid response format')
                }
                
                // Filter out brand images for gallery display
                const galleryImages = result.data.filter((img: GalleryImage) => img.category !== 'Brand')
                console.log('Gallery images:', galleryImages.length)
                
                setImages(galleryImages)
                
            } catch (error) {
                console.error('Error fetching images:', error)
                setError(error instanceof Error ? error.message : 'Failed to load images')
                
                // Use fallback images on error
                const fallbackImages = [
                    {
                        id: 'fallback-1',
                        name: 'Modern Kitchen Remodel',
                        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
                        category: 'Kitchen',
                        description: 'Beautiful modern kitchen renovation with premium finishes'
                    },
                    {
                        id: 'fallback-2',
                        name: 'Luxury Bathroom Design',
                        url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
                        category: 'Bathroom',
                        description: 'Spa-inspired bathroom with modern fixtures'
                    },
                    {
                        id: 'fallback-3',
                        name: 'Commercial Kitchen',
                        url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
                        category: 'Commercial',
                        description: 'Professional commercial kitchen installation'
                    }
                ]
                setImages(fallbackImages)
            } finally {
                setLoading(false)
            }
        }

        fetchImages()
    }, [])

    const categories = [
        { id: 'all', name: 'All Projects', count: images.length },
        { id: 'kitchen', name: 'Kitchens', count: images.filter(img => img.category.toLowerCase() === 'kitchen').length },
        { id: 'bathroom', name: 'Bathrooms', count: images.filter(img => img.category.toLowerCase() === 'bathroom').length },
        { id: 'commercial', name: 'Commercial', count: images.filter(img => img.category.toLowerCase() === 'commercial').length },
    ]

    const filteredImages = currentCategory === 'all'
        ? images
        : images.filter(image => image.category.toLowerCase() === currentCategory)

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Hero Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="mb-16">
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6">
                            Our Project
                            <span className="block text-accent-600">Gallery</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Explore our portfolio of stunning kitchen and bathroom transformations.
                            Each project showcases our commitment to quality craftsmanship and innovative design.
                        </p>
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setCurrentCategory(category.id)}
                                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                                    currentCategory === category.id
                                        ? 'bg-accent-600 text-white shadow-lg'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                                }`}
                            >
                                {category.name}
                                <span className="ml-2 text-xs opacity-75">({category.count})</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {error && (
                        <div className="text-center py-8 mb-8">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
                                <p className="text-red-600 text-sm">API Error: {error}</p>
                                <p className="text-red-500 text-xs mt-1">Showing fallback images</p>
                            </div>
                        </div>
                    )}

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading gallery...</p>
                        </div>
                    ) : filteredImages.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No images found for this category.</p>
                            <p className="text-gray-400 text-sm mt-2">Total images: {images.length}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredImages.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="group cursor-pointer"
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg bg-gray-200">
                                        <Image
                                            src={image.url}
                                            alt={image.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                console.error('Image failed to load:', image.url)
                                                const target = e.target as HTMLImageElement
                                                target.style.display = 'none'
                                            }}
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        {/* Content */}
                                        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                            <h3 className="text-white font-semibold text-lg mb-1 truncate">{image.name}</h3>
                                            <p className="text-white/80 text-sm line-clamp-2">{image.description}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-white text-xs">
                                                    {image.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Image Modal */}
            {selectedImage !== null && filteredImages[selectedImage] && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Image */}
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
                            <Image
                                src={filteredImages[selectedImage].url}
                                alt={filteredImages[selectedImage].name}
                                fill
                                sizes="(max-width: 1200px) 100vw, 1200px"
                                className="object-cover"
                            />
                        </div>

                        {/* Image Info */}
                        <div className="mt-6 text-white">
                            <h2 className="text-2xl font-bold mb-2">{filteredImages[selectedImage].name}</h2>
                            {filteredImages[selectedImage].description && (
                                <p className="text-gray-300 mb-4">{filteredImages[selectedImage].description}</p>
                            )}
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                                    {filteredImages[selectedImage].category}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GalleryPage
