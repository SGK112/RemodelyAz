'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, Search, Loader } from 'lucide-react'
import SafeImage from './SafeImage'

interface GalleryImage {
    id: string
    name: string
    url: string
    category: string
    description?: string
    alt: string
    featured?: boolean
}

const IMAGES_PER_PAGE = 8
const INITIAL_LOAD = 8

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null)
    const [currentCategory, setCurrentCategory] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [images, setImages] = useState<GalleryImage[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [displayCount, setDisplayCount] = useState(INITIAL_LOAD)
    const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set())

    useEffect(() => {
        // Load images from API with better caching
        const loadGalleryData = async () => {
            try {
                setIsLoading(true)
                const response = await fetch('/api/admin/gallery-projects', {
                    next: { revalidate: 300 }, // Cache for 5 minutes
                })

                if (response.ok) {
                    const result = await response.json()
                    const projects = result.data || result

                    const convertedImages: GalleryImage[] = projects.map((project: any) => ({
                        id: project.id.toString(),
                        name: project.title,
                        url: project.url,
                        category: project.category,
                        description: project.description,
                        alt: project.title,
                        featured: false
                    }))
                    setImages(convertedImages)
                } else {
                    console.error('Failed to load gallery data')
                }
            } catch (error) {
                console.error('Error loading gallery:', error)
            } finally {
                setIsLoading(false)
            }
        }

        loadGalleryData()
    }, [])

    // Memoize categories for better performance
    const categories = useMemo(() => [
        { id: 'all', name: 'All Projects', count: images.length },
        { id: 'kitchen', name: 'Kitchen Remodeling', count: images.filter(img => img.category === 'kitchen').length },
        { id: 'bathroom', name: 'Bathroom Renovation', count: images.filter(img => img.category === 'bathroom').length },
        { id: 'commercial', name: 'Commercial Projects', count: images.filter(img => img.category === 'commercial').length },
        { id: 'tile', name: 'Tile Work', count: images.filter(img => img.category === 'tile').length },
        { id: 'countertops', name: 'Countertops', count: images.filter(img => img.category === 'countertops').length },
        { id: 'cabinets', name: 'Custom Cabinets', count: images.filter(img => img.category === 'cabinets').length },
    ], [images])

    // Memoize filtered images for better performance
    const filteredImages = useMemo(() => {
        return images.filter(image => {
            const matchesCategory = currentCategory === 'all' || image.category.toLowerCase() === currentCategory.toLowerCase()
            const matchesSearch = searchTerm === '' ||
                image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (image as any).title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                image.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                image.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (image as any).tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            const notErrored = !imageLoadErrors.has(image.id)

            return matchesCategory && matchesSearch && notErrored
        })
    }, [images, currentCategory, searchTerm, imageLoadErrors])

    // Get currently displayed images with pagination
    const displayedImages = useMemo(() => {
        return filteredImages.slice(0, displayCount)
    }, [filteredImages, displayCount])

    const hasMoreImages = filteredImages.length > displayCount

    // Reset display count when category or search changes
    useEffect(() => {
        setDisplayCount(INITIAL_LOAD)
    }, [currentCategory, searchTerm])

    const handleLoadMore = async () => {
        setIsLoadingMore(true)
        // Simulate slight delay for smooth UX
        await new Promise(resolve => setTimeout(resolve, 300))
        setDisplayCount(prev => prev + IMAGES_PER_PAGE)
        setIsLoadingMore(false)
    }

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
                    className="max-w-lg mx-auto mb-8"
                >
                    <div className="search-container relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search by project name, category, or tags..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input w-full"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-accent-600 transition-colors p-1 rounded-full hover:bg-accent-50"
                                aria-label="Clear search"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
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
                            className={`category-button flex items-center gap-2 ${currentCategory === category.id ? 'active' : ''}`}
                        >
                            <span>{category.name}</span>
                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${currentCategory === category.id
                                ? 'bg-white/20 text-white'
                                : 'bg-accent-100 text-accent-700'
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
                            <>Showing <span className="font-semibold text-accent-600">{filteredImages.length}</span> results for "<span className="font-semibold text-accent-600">{searchTerm}</span>"</>
                        ) : (
                            <>Showcasing <span className="font-semibold text-accent-600">{filteredImages.length}</span> premium {currentCategory === 'all' ? 'remodeling projects' : `${currentCategory} projects`}</>
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
                    {displayedImages.map((image, index) => (
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
                                <SafeImage
                                    src={image.url}
                                    alt={image.alt}
                                    fill
                                    className="transition-transform duration-500 group-hover:scale-105"
                                    aspectRatio="aspect-[4/3]"
                                    priority={index < 8}
                                    showPlaceholder={true}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Zoom icon */}
                                <div className="absolute top-4 right-4 bg-white shadow-lg border border-gray-200 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ZoomIn className="w-5 h-5 text-gray-700" />
                                </div>

                                {/* Project info overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-lg font-display font-semibold mb-1 line-clamp-1">{image.name}</h3>
                                    <p className="text-sm opacity-90 line-clamp-2">{image.description}</p>
                                    <div className="mt-2">
                                        <span className="inline-block px-2 py-1 bg-accent-600 text-white rounded-full text-xs font-medium capitalize">
                                            {image.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Load More Button */}
                {hasMoreImages && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mt-12"
                    >
                        <button
                            onClick={handleLoadMore}
                            disabled={isLoadingMore}
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-4 rounded-full font-semibold hover:from-primary-700 hover:to-accent-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoadingMore ? (
                                <>
                                    <Loader className="w-5 h-5 animate-spin" />
                                    Loading More...
                                </>
                            ) : (
                                <>
                                    Load More Projects
                                    <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                                        +{Math.min(IMAGES_PER_PAGE, filteredImages.length - displayCount)}
                                    </span>
                                </>
                            )}
                        </button>
                    </motion.div>
                )}

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
                            <div className="absolute -top-16 left-0 text-white bg-black/80 shadow-md rounded-full px-4 py-2">
                                <span className="text-sm font-medium">
                                    {selectedImage + 1} of {filteredImages.length}
                                </span>
                            </div>

                            {/* Keyboard shortcuts hint */}
                            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-white bg-black/80 shadow-md rounded-full px-4 py-2">
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
                                <SafeImage
                                    src={displayedImages[selectedImage].url}
                                    alt={displayedImages[selectedImage].alt}
                                    width={1200}
                                    height={800}
                                    className="max-w-full max-h-[80vh]"
                                    aspectRatio=""
                                    showPlaceholder={true}
                                />

                                {/* Navigation arrows */}
                                {displayedImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                prevImage()
                                            }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent-400 transition-colors bg-black/70 hover:bg-black/80 shadow-lg rounded-full p-3 border border-white/20"
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                nextImage()
                                            }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent-400 transition-colors bg-black/70 hover:bg-black/80 shadow-lg rounded-full p-3 border border-white/20"
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
                                    {displayedImages[selectedImage].name}
                                </h3>
                                <p className="text-lg opacity-90 mb-2">
                                    {displayedImages[selectedImage].description}
                                </p>
                                <span className="inline-block px-3 py-1 bg-accent-600/20 shadow-lg border border-accent-600/30 rounded-full text-sm font-medium capitalize text-accent-100">
                                    {displayedImages[selectedImage].category}
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
