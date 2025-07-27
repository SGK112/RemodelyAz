'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

interface GalleryImage {
    id: string
    name: string
    url: string
    category: string
    description?: string
    material?: string
    brand?: string
    tags?: string[]
    uploadDate?: string
}

const GalleryPage = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null)
    const [currentCategory, setCurrentCategory] = useState('all')
    const [images, setImages] = useState<GalleryImage[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('/api/admin/images')
                if (response.ok) {
                    const imageData = await response.json()
                    setImages(imageData)
                } else {
                    // Fallback images if API fails
                    setImages([
                        {
                            id: '1',
                            name: 'Modern Kitchen',
                            url: 'https://picsum.photos/800/600?random=1',
                            category: 'Kitchen',
                            description: 'Beautiful modern kitchen renovation'
                        },
                        {
                            id: '2',
                            name: 'Luxury Bathroom',
                            url: 'https://picsum.photos/800/600?random=2',
                            category: 'Bathroom',
                            description: 'Spa-inspired bathroom design'
                        }
                    ])
                }
            } catch (error) {
                console.error('Failed to fetch images:', error)
                // Use fallback on error
                setImages([
                    {
                        id: '1',
                        name: 'Modern Kitchen',
                        url: 'https://picsum.photos/800/600?random=1',
                        category: 'Kitchen',
                        description: 'Beautiful modern kitchen renovation'
                    }
                ])
            } finally {
                setLoading(false)
            }
        }

        fetchImages()
    }, [])

    const categories = [
        { id: 'all', name: 'All Projects', count: images.length },
        { id: 'remodeling', name: 'Remodeling', count: images.filter(img => img.category.toLowerCase().includes('remodeling')).length },
        { id: 'kitchen', name: 'Kitchens', count: images.filter(img => img.category.toLowerCase().includes('kitchen')).length },
        { id: 'bathroom', name: 'Bathrooms', count: images.filter(img => img.category.toLowerCase().includes('bathroom')).length },
        { id: 'commercial', name: 'Commercial', count: images.filter(img => img.category.toLowerCase().includes('commercial')).length },
    ]

    const filteredImages = currentCategory === 'all'
        ? images
        : images.filter(image => image.category.toLowerCase().includes(currentCategory))

    const nextImage = () => {
        if (selectedImage !== null && filteredImages.length > 0) {
            setSelectedImage((selectedImage + 1) % filteredImages.length)
        }
    }

    const prevImage = () => {
        if (selectedImage !== null && filteredImages.length > 0) {
            setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Hero Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6">
                            Project
                            <span className="block text-accent-600">
                                Gallery
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Explore our portfolio of stunning transformations. From beautiful countertops to complete remodeling projects.
                        </p>
                        <div className="bg-white/80 backdrop-blur-sm inline-block px-6 py-3 rounded-full shadow-lg">
                            <span className="text-sm font-medium text-gray-700">
                                {images.length} Projects Available
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8"
                    >
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setCurrentCategory(category.id)}
                                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${currentCategory === category.id
                                    ? 'bg-accent-600 text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                                    }`}
                            >
                                {category.name} ({category.count})
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600"></div>
                            <span className="ml-3 text-gray-600">Loading gallery...</span>
                        </div>
                    ) : filteredImages.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No images found for this category.</p>
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {filteredImages.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    whileHover={{ y: -5 }}
                                    transition={{ duration: 0.3 }}
                                    className="group cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <div className="relative aspect-square overflow-hidden">
                                        <Image
                                            src={image.url}
                                            alt={image.name || 'Gallery image'}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                const target = e.currentTarget as HTMLImageElement;
                                                target.src = 'https://picsum.photos/800/600?random=' + Math.floor(Math.random() * 1000);
                                            }}
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-navy-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <ExternalLink className="w-4 h-4 text-white" />
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-accent-600 transition-colors">
                                            {image.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                            {image.description || 'Professional remodeling project'}
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                {image.category}
                                            </span>
                                            {image.material && (
                                                <span className="px-2 py-1 bg-accent-100 text-accent-600 text-xs rounded-full">
                                                    {image.material}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedImage !== null && filteredImages.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh] w-full">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {filteredImages.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        prevImage()
                                    }}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        nextImage()
                                    }}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}

                        <div className="relative aspect-video rounded-lg overflow-hidden">
                            <Image
                                src={filteredImages[selectedImage].url}
                                alt={filteredImages[selectedImage].name || 'Gallery image'}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>

                        <div className="mt-4 text-center text-white">
                            <h3 className="text-xl font-semibold mb-2">
                                {filteredImages[selectedImage].name}
                            </h3>
                            <p className="text-gray-300 mb-2">
                                {filteredImages[selectedImage].description || 'Professional remodeling project'}
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                                    {filteredImages[selectedImage].category}
                                </span>
                                {filteredImages[selectedImage].material && (
                                    <span className="px-3 py-1 bg-accent-600/80 backdrop-blur-sm rounded-full text-sm">
                                        {filteredImages[selectedImage].material}
                                    </span>
                                )}
                                {filteredImages[selectedImage].brand && (
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                                        {filteredImages[selectedImage].brand}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default GalleryPage
