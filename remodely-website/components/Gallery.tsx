'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import galleryProjects from '@/data/gallery-projects.json'

interface GalleryImage {
    id: string
    name: string
    url: string
    category: string
    description?: string
    alt: string
    featured?: boolean
}

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null)
    const [currentCategory, setCurrentCategory] = useState('all')
    const [images, setImages] = useState<GalleryImage[]>([])

    useEffect(() => {
        // Load images from local data
        setImages(galleryProjects as GalleryImage[])
    }, [])

    const categories = [
        { id: 'all', name: 'All Projects' },
        { id: 'kitchen', name: 'Kitchen Remodeling' },
        { id: 'bathroom', name: 'Bathroom Renovation' },
        { id: 'commercial', name: 'Commercial Projects' },
        { id: 'tile', name: 'Tile Work' },
        { id: 'countertops', name: 'Countertops' },
        { id: 'cabinets', name: 'Custom Cabinets' },
    ]

    const filteredImages = currentCategory === 'all'
        ? images
        : images.filter(image => image.category.toLowerCase() === currentCategory.toLowerCase())

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

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setSelectedImage(null)
        } else if (e.key === 'ArrowRight') {
            nextImage()
        } else if (e.key === 'ArrowLeft') {
            prevImage()
        }
    }

    useEffect(() => {
        if (selectedImage !== null) {
            document.addEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'hidden'
            return () => {
                document.removeEventListener('keydown', handleKeyDown)
                document.body.style.overflow = 'unset'
            }
        }
    }, [selectedImage, filteredImages.length])

    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-navy mb-6">
                        Our Project <span className="text-accent">Gallery</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore our portfolio of stunning kitchen renovations, bathroom remodels, 
                        and commercial projects across Arizona
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setCurrentCategory(category.id)}
                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                                currentCategory === category.id
                                    ? 'bg-accent text-white shadow-lg transform scale-105'
                                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </motion.div>

                {/* Gallery Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                            onClick={() => setSelectedImage(index)}
                            whileHover={{ scale: 1.03 }}
                        >
                            <div className="aspect-[4/3] relative">
                                <Image
                                    src={image.url}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-xl font-display font-semibold mb-2">{image.name}</h3>
                                    <p className="text-sm opacity-90">{image.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {filteredImages.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No projects found in this category.</p>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedImage !== null && filteredImages.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-7xl max-h-full">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 text-white hover:text-accent transition-colors z-10"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        
                        <div className="relative">
                            <Image
                                src={filteredImages[selectedImage].url}
                                alt={filteredImages[selectedImage].alt}
                                width={1200}
                                height={800}
                                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                                onClick={(e) => e.stopPropagation()}
                            />
                            
                            {filteredImages.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            prevImage()
                                        }}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors bg-black/20 rounded-full p-2"
                                    >
                                        <ChevronLeft className="w-8 h-8" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            nextImage()
                                        }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors bg-black/20 rounded-full p-2"
                                    >
                                        <ChevronRight className="w-8 h-8" />
                                    </button>
                                </>
                            )}
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 text-white p-6 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg">
                            <h3 className="text-2xl font-display font-semibold mb-2">
                                {filteredImages[selectedImage].name}
                            </h3>
                            <p className="text-lg opacity-90">
                                {filteredImages[selectedImage].description}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </section>
    )
}

export default Gallery
