'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn, Search } from 'lucide-react'
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
    const [searchTerm, setSearchTerm] = useState('')
    const [images, setImages] = useState<GalleryImage[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set())

    useEffect(() => {
        // Load images from local data and convert to proper format
        const convertedImages: GalleryImage[] = galleryProjects.map(project => ({
            id: project.id.toString(),
            name: project.title,
            url: project.url,
            category: project.category,
            description: project.description,
            alt: project.title,
            featured: false
        }))
        setImages(convertedImages)
        setIsLoading(false)
    }, [])

    const categories = [
        { id: 'all', name: 'All Projects', count: images.length },
        { id: 'kitchen', name: 'Kitchen Remodeling', count: images.filter(img => img.category === 'kitchen').length },
        { id: 'bathroom', name: 'Bathroom Renovation', count: images.filter(img => img.category === 'bathroom').length },
        { id: 'commercial', name: 'Commercial Projects', count: images.filter(img => img.category === 'commercial').length },
        { id: 'tile', name: 'Tile Work', count: images.filter(img => img.category === 'tile').length },
        { id: 'countertops', name: 'Countertops', count: images.filter(img => img.category === 'countertops').length },
        { id: 'cabinets', name: 'Custom Cabinets', count: images.filter(img => img.category === 'cabinets').length },
    ]

    const filteredImages = images.filter(image => {
        const matchesCategory = currentCategory === 'all' || image.category.toLowerCase() === currentCategory.toLowerCase()
        const matchesSearch = searchTerm === '' ||
            image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.category.toLowerCase().includes(searchTerm.toLowerCase())
        const notErrored = !imageLoadErrors.has(image.id)

        return matchesCategory && matchesSearch && notErrored
    })

    const handleImageError = useCallback((imageId: string) => {
        setImageLoadErrors(prev => {
            const newSet = new Set(prev)
            newSet.add(imageId)
            return newSet
        })
    }, [])

    const nextImage = useCallback(() => {
        if (selectedImage !== null && filteredImages.length > 0) {
            setSelectedImage((selectedImage + 1) % filteredImages.length)
        }
    }, [selectedImage, filteredImages.length])

    const prevImage = useCallback(() => {
        if (selectedImage !== null && filteredImages.length > 0) {
            setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1)
        }
    }, [selectedImage, filteredImages.length])

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setSelectedImage(null)
        } else if (e.key === 'ArrowRight') {
            nextImage()
        } else if (e.key === 'ArrowLeft') {
            prevImage()
        }
    }, [nextImage, prevImage])

    useEffect(() => {
        if (selectedImage !== null) {
            document.addEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'hidden'
            return () => {
                document.removeEventListener('keydown', handleKeyDown)
                document.body.style.overflow = 'unset'
            }
        }
    }, [selectedImage, handleKeyDown])

    if (isLoading) {
        return (
            <section className="py-20 pt-24 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading gallery...</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-24 sm:py-32 pt-24 bg-gradient-to-br from-gray-50 to-accent-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
                        Our Project <span className="text-accent-600">Gallery</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore our portfolio of stunning kitchen renovations, bathroom remodels,
                        and commercial projects across Arizona
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="max-w-md mx-auto mb-8"
                >
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-300"
                        />
                    </div>
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
                            onClick={() => {
                                setCurrentCategory(category.id)
                                setSearchTerm('') // Clear search when changing category
                            }}
                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${currentCategory === category.id
                                ? 'bg-accent-600 text-white shadow-lg transform scale-105'
                                : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
                                }`}
                        >
                            <span>{category.name}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${currentCategory === category.id
                                ? 'bg-white/20'
                                : 'bg-gray-100'
                                }`}>
                                {category.count}
                            </span>
                        </button>
                    ))}
                </motion.div>

                {/* Results Counter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center mb-8"
                >
                    <p className="text-gray-600">
                        {searchTerm ? (
                            <>Showing <span className="font-semibold">{filteredImages.length}</span> results for "<span className="font-semibold">{searchTerm}</span>"</>
                        ) : (
                            <>Showing <span className="font-semibold">{filteredImages.length}</span> {currentCategory === 'all' ? 'projects' : `${currentCategory} projects`}</>
                        )}
                    </p>
                </motion.div>

                {/* Gallery Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {filteredImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-gray-100"
                            onClick={() => setSelectedImage(index)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="aspect-[4/3] relative">
                                <Image
                                    src={image.url}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                    onError={() => handleImageError(image.id)}
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Zoom icon */}
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ZoomIn className="w-5 h-5 text-white" />
                                </div>

                                {/* Project info overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-lg font-display font-semibold mb-1 line-clamp-1">{image.name}</h3>
                                    <p className="text-sm opacity-90 line-clamp-2">{image.description}</p>
                                    <div className="mt-2">
                                        <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium capitalize">
                                            {image.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {filteredImages.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="max-w-md mx-auto">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
                            <p className="text-gray-500 mb-4">
                                {searchTerm
                                    ? `No projects match "${searchTerm}". Try adjusting your search terms.`
                                    : `No projects found in the ${currentCategory} category.`
                                }
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm('')
                                    setCurrentCategory('all')
                                }}
                                className="text-accent-600 hover:text-accent-700 font-medium transition-colors"
                            >
                                Clear filters and show all projects
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage !== null && filteredImages.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="relative max-w-7xl max-h-full">
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-16 right-0 px-4 py-2 rounded-lg 
                                         bg-gray-800 hover:bg-gray-700 text-white 
                                         font-medium text-sm transition-all duration-200 
                                         shadow-lg hover:shadow-xl border border-gray-700 hover:border-gray-600"
                                aria-label="Close gallery"
                            >
                                Close
                            </button>

                            {/* Image counter */}
                            <div className="absolute -top-16 left-0 text-white bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
                                <span className="text-sm font-medium">
                                    {selectedImage + 1} of {filteredImages.length}
                                </span>
                            </div>

                            {/* Keyboard shortcuts hint */}
                            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-white bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
                                <span className="text-xs opacity-75">
                                    Use ← → keys or ESC to close
                                </span>
                            </div>

                            <motion.div
                                key={selectedImage}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative"
                            >
                                <Image
                                    src={filteredImages[selectedImage].url}
                                    alt={filteredImages[selectedImage].alt}
                                    width={1200}
                                    height={800}
                                    className="max-w-full max-h-[80vh] object-contain rounded-lg"
                                    onClick={(e) => e.stopPropagation()}
                                    onError={() => handleImageError(filteredImages[selectedImage].id)}
                                />

                                {/* Navigation arrows */}
                                {filteredImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                prevImage()
                                            }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent-400 transition-colors bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-3"
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                nextImage()
                                            }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent-400 transition-colors bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-3"
                                            aria-label="Next image"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                    </>
                                )}
                            </motion.div>

                            {/* Image details */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute bottom-0 left-0 right-0 text-white p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg"
                            >
                                <h3 className="text-2xl font-display font-semibold mb-2">
                                    {filteredImages[selectedImage].name}
                                </h3>
                                <p className="text-lg opacity-90 mb-2">
                                    {filteredImages[selectedImage].description}
                                </p>
                                <span className="inline-block px-3 py-1 bg-accent/20 backdrop-blur-sm rounded-full text-sm font-medium capitalize">
                                    {filteredImages[selectedImage].category}
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Gallery
