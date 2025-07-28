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
    uploadDate?: string
}

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null)
    const [currentCategory, setCurrentCategory] = useState('all')
    const [images, setImages] = useState<GalleryImage[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                // Try the primary gallery API
                let response = await fetch('/api/admin/gallery')
                
                if (!response.ok) {
                    // Fallback to images API
                    response = await fetch('/api/admin/images')
                }
                
                if (response.ok) {
                    const data = await response.json()
                    const galleryImages = data.images || data.data || []
                    setImages(galleryImages)
                } else {
                    console.error('Failed to fetch gallery images')
                    // Set fallback images
                    setImages(getFallbackImages())
                }
            } catch (error) {
                console.error('Error fetching gallery:', error)
                // Set fallback images on error
                setImages(getFallbackImages())
            } finally {
                setLoading(false)
            }
        }

        fetchImages()
    }, [])

    const getFallbackImages = (): GalleryImage[] => [
        {
            id: 'fallback-1',
            name: 'Modern Kitchen Renovation',
            url: 'https://picsum.photos/800/600?random=kitchen1',
            category: 'kitchen',
            description: 'Beautiful modern kitchen transformation'
        },
        {
            id: 'fallback-2',
            name: 'Luxury Bathroom Remodel',
            url: 'https://picsum.photos/800/600?random=bathroom1',
            category: 'bathroom', 
            description: 'Spa-inspired bathroom renovation'
        },
        {
            id: 'fallback-3',
            name: 'Commercial Office Space',
            url: 'https://picsum.photos/800/600?random=office1',
            category: 'commercial',
            description: 'Modern commercial space design'
        }
    ]

    const categories = [
        { id: 'all', name: 'All Projects' },
        { id: 'remodeling', name: 'Remodeling' },
        { id: 'kitchen', name: 'Kitchens' },
        { id: 'bathroom', name: 'Bathrooms' },
        { id: 'commercial', name: 'Commercial' },
    ]

    const filteredImages = currentCategory === 'all'
        ? images
        : images.filter(image => image.category.toLowerCase().includes(currentCategory))

    const nextImage = () => {
        if (selectedImage !== null) {
            setSelectedImage((selectedImage + 1) % filteredImages.length)
        }
    }

    const prevImage = () => {
        if (selectedImage !== null) {
            setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1)
        }
    }

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 sm:mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4 sm:mb-6">
                        Inspiration
                        <span className="block text-accent-600">
                            Gallery
                        </span>
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
                        Explore our portfolio of stunning transformations and get inspired for your next project.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10 sm:mb-12 px-4 sm:px-0"
                >
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setCurrentCategory(category.id)}
                            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base touch-manipulation min-h-[44px] ${currentCategory === category.id
                                ? 'bg-accent-600 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </motion.div>

                {/* Gallery Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600"></div>
                    </div>
                ) : filteredImages.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No images found for this category.</p>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredImages.map((image, index) => (
                            <motion.div
                                key={image.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="group cursor-pointer"
                                onClick={() => setSelectedImage(index)}
                            >
                                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                                    <Image
                                        src={image.url}
                                        alt={image.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => {
                                            const target = e.currentTarget as HTMLImageElement;
                                            target.src = 'https://picsum.photos/800/600?random=' + Math.floor(Math.random() * 1000);
                                        }}
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-navy-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <h3 className="text-lg font-semibold mb-1">{image.name}</h3>
                                        <p className="text-sm text-gray-200">{image.description || image.category}</p>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <ExternalLink className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Lightbox Modal */}
                {selectedImage !== null && (
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

                            <div className="relative aspect-video rounded-lg overflow-hidden">
                                <Image
                                    src={filteredImages[selectedImage].url}
                                    alt={filteredImages[selectedImage].name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>

                            <div className="mt-4 text-center text-white">
                                <h3 className="text-xl font-semibold mb-2">
                                    {filteredImages[selectedImage].name}
                                </h3>
                                <p className="text-gray-300 mb-1">
                                    {filteredImages[selectedImage].description || 'Professional remodeling work'}
                                </p>
                                <p className="text-sm text-gray-400">
                                    {filteredImages[selectedImage].category}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    )
}

export default Gallery
