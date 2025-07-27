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
                const response = await fetch('/api/admin/images')
                if (response.ok) {
                    const result = await response.json()

                    // Handle wrapped response format {success: true, data: [...]}
                    const imageData = result.success && result.data ? result.data : result

                    if (Array.isArray(imageData)) {
                        setImages(imageData)
                    } else {
                        console.error('Expected array but got:', typeof imageData, imageData)
                        setImages([])
                    }
                } else {
                    // Fallback to working placeholder images
                    setImages([
                        {
                            id: '1',
                            name: 'Modern Kitchen Remodel',
                            url: 'https://picsum.photos/800/600?random=kitchen1',
                            category: 'Kitchen',
                            description: 'Beautiful kitchen renovation with premium finishes'
                        },
                        {
                            id: '2',
                            name: 'Luxury Bathroom',
                            url: 'https://picsum.photos/800/600?random=bathroom1',
                            category: 'Bathroom',
                            description: 'Stunning bathroom remodel with modern fixtures'
                        },
                        {
                            id: '3',
                            name: 'Commercial Space',
                            url: 'https://picsum.photos/800/600?random=office1',
                            category: 'Commercial',
                            description: 'Professional commercial renovation'
                        }
                    ])
                }
            } catch (error) {
                console.error('Error fetching images:', error)
                setImages([]) // Ensure images is always an array
            } finally {
                setLoading(false)
            }
        }

        fetchImages()
    }, [])

    const categories = [
        { id: 'all', name: 'All Projects' },
        { id: 'remodeling', name: 'Remodeling' },
        { id: 'kitchen', name: 'Kitchens' },
        { id: 'bathroom', name: 'Bathrooms' },
        { id: 'commercial', name: 'Commercial' },
    ]

    const filteredImages = Array.isArray(images)
        ? (currentCategory === 'all'
            ? images
            : images.filter(image => image.category.toLowerCase().includes(currentCategory)))
        : []

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

    const closeModal = () => {
        setSelectedImage(null)
    }

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                        Our Recent Projects
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Explore our portfolio of stunning home transformations. Each project showcases our commitment
                        to quality craftsmanship and innovative design solutions.
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {categories.map((category, index) => (
                        <motion.button
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentCategory(category.id)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${currentCategory === category.id
                                    ? 'bg-accent-600 text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-accent-300'
                                }`}
                        >
                            {category.name}
                        </motion.button>
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
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-lg font-semibold mb-2">{image.name}</h3>
                                        <p className="text-sm text-gray-200">{image.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Modal */}
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="relative">
                                <Image
                                    src={filteredImages[selectedImage].url}
                                    alt={filteredImages[selectedImage].name}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto"
                                />

                                {/* Navigation */}
                                {filteredImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {filteredImages[selectedImage].name}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {filteredImages[selectedImage].description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        Category: {filteredImages[selectedImage].category}
                                    </span>
                                    {filteredImages[selectedImage].uploadDate && (
                                        <span className="text-sm text-gray-500">
                                            {filteredImages[selectedImage].uploadDate}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </section>
    )
}

export default Gallery
