'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, ChevronLeft, ChevronRight, ExternalLink, Calendar, MapPin } from 'lucide-react'
import { imageManager, type GalleryProject, type ImageData } from '../lib/image-manager'

const DynamicGalleryPage = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null)
    const [currentCategory, setCurrentCategory] = useState('all')
    const [projects, setProjects] = useState<GalleryProject[]>([])
    const [categories, setCategories] = useState([
        { id: 'all', name: 'All Projects', count: 0 },
        { id: 'kitchen', name: 'Kitchens', count: 0 },
        { id: 'bathroom', name: 'Bathrooms', count: 0 },
        { id: 'commercial', name: 'Commercial', count: 0 },
    ])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadGalleryData()
    }, [])

    const loadGalleryData = async () => {
        try {
            // Get projects from the image manager
            const allProjects = imageManager.getGalleryProjects()
            
            // If no migrated projects, create some from available images
            if (allProjects.length === 0) {
                const images = imageManager.getAllImages()
                const generatedProjects = generateProjectsFromImages(images)
                setProjects(generatedProjects)
            } else {
                setProjects(allProjects)
            }
            
            // Update category counts
            const projectsByCategory = allProjects.reduce((acc, project) => {
                acc[project.category] = (acc[project.category] || 0) + 1
                return acc
            }, {} as { [key: string]: number })

            setCategories(prev => prev.map(cat => ({
                ...cat,
                count: cat.id === 'all' ? allProjects.length : (projectsByCategory[cat.id] || 0)
            })))
            
        } catch (error) {
            console.error('Error loading gallery data:', error)
            // Fallback to static data
            setProjects(getStaticFallbackProjects())
        } finally {
            setLoading(false)
        }
    }

    const generateProjectsFromImages = (images: ImageData[]): GalleryProject[] => {
        return images.slice(0, 12).map((img, index) => ({
            id: index + 1,
            title: img.name,
            category: getCategoryFromImage(img),
            image: img.url,
            description: img.description || `Beautiful ${img.category} renovation showcasing premium craftsmanship and modern design.`,
            location: 'Phoenix, AZ',
            date: img.uploadDate,
            budget: getBudgetByCategory(img.category),
            duration: getDurationByCategory(img.category),
            features: getFeaturesByCategory(img.category)
        }))
    }

    const getCategoryFromImage = (img: ImageData): 'kitchen' | 'bathroom' | 'commercial' | 'other' => {
        const category = img.category.toLowerCase()
        if (category.includes('kitchen')) return 'kitchen'
        if (category.includes('bathroom') || category.includes('bath')) return 'bathroom'
        if (category.includes('commercial') || category.includes('office')) return 'commercial'
        return 'other'
    }

    const getBudgetByCategory = (category: string): string => {
        const cat = category.toLowerCase()
        if (cat.includes('kitchen')) return '$75,000'
        if (cat.includes('bathroom')) return '$45,000'
        if (cat.includes('commercial')) return '$120,000'
        return '$60,000'
    }

    const getDurationByCategory = (category: string): string => {
        const cat = category.toLowerCase()
        if (cat.includes('kitchen')) return '4 weeks'
        if (cat.includes('bathroom')) return '3 weeks'
        if (cat.includes('commercial')) return '6 weeks'
        return '3 weeks'
    }

    const getFeaturesByCategory = (category: string): string[] => {
        const cat = category.toLowerCase()
        if (cat.includes('kitchen')) return ['Custom Cabinetry', 'Quartz Countertops', 'Smart Appliances', 'LED Lighting']
        if (cat.includes('bathroom')) return ['Walk-in Shower', 'Heated Floors', 'Custom Vanity', 'Premium Fixtures']
        if (cat.includes('commercial')) return ['Modern Layout', 'Professional Finishes', 'Tech Integration', 'Efficient Design']
        return ['Quality Materials', 'Expert Installation', 'Custom Design', 'Premium Finishes']
    }

    const getStaticFallbackProjects = (): GalleryProject[] => {
        return [
            {
                id: 1,
                title: 'Modern Luxury Kitchen',
                category: 'kitchen',
                image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center',
                description: 'Complete kitchen transformation featuring custom white cabinetry, marble waterfall countertops, and professional-grade appliances.',
                location: 'Phoenix, AZ',
                date: 'March 2024',
                budget: '$85,000',
                duration: '4 weeks',
                features: ['Custom Cabinetry', 'Marble Countertops', 'Smart Appliances', 'LED Lighting']
            },
            {
                id: 2,
                title: 'Spa-Inspired Master Bath',
                category: 'bathroom',
                image: 'https://images.unsplash.com/photo-1584622781003-d2311cc45946?w=800&h=600&fit=crop&crop=center',
                description: 'Luxurious master bathroom renovation with walk-in shower, freestanding tub, and heated floors.',
                location: 'Scottsdale, AZ',
                date: 'February 2024',
                budget: '$52,000',
                duration: '3 weeks',
                features: ['Walk-in Shower', 'Heated Floors', 'Custom Vanity', 'Premium Fixtures']
            }
        ]
    }

    const filteredProjects = currentCategory === 'all'
        ? projects
        : projects.filter(project => project.category === currentCategory)

    const nextImage = () => {
        if (selectedImage !== null) {
            setSelectedImage((selectedImage + 1) % filteredProjects.length)
        }
    }

    const prevImage = () => {
        if (selectedImage !== null) {
            setSelectedImage(selectedImage === 0 ? filteredProjects.length - 1 : selectedImage - 1)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading gallery...</p>
                </div>
            </div>
        )
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
                            Explore our portfolio of stunning transformations. From luxurious kitchens to spa-like bathrooms and modern commercial spaces.
                        </p>
                        {projects.length > 0 && (
                            <div className="glass-card inline-block px-6 py-3 rounded-full">
                                <span className="text-sm font-medium text-gray-700">
                                    {projects.length} Completed Projects
                                </span>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setCurrentCategory(category.id)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${currentCategory === category.id
                                    ? 'bg-accent-600 text-white shadow-lg'
                                    : 'glass-card text-gray-700 hover:shadow-md'
                                    }`}
                            >
                                <span>{category.name}</span>
                                <span className={`text-sm px-2 py-1 rounded-full ${currentCategory === category.id
                                    ? 'bg-white/20'
                                    : 'bg-gray-200 text-gray-600'
                                    }`}>
                                    {category.count}
                                </span>
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredProjects.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="glass-card max-w-md mx-auto p-8 rounded-2xl">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    No Projects Found
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    We're still adding projects to this category. Check back soon!
                                </p>
                                <button
                                    onClick={() => setCurrentCategory('all')}
                                    className="btn-glassmorphic"
                                >
                                    View All Projects
                                </button>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    whileHover={{ y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="group cursor-pointer"
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <div className="glass-card rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                                        {/* Image */}
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-navy-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <ExternalLink className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="absolute top-4 left-4 bg-accent-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                {project.budget}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
                                                    {categories.find(cat => cat.id === project.category)?.name}
                                                </span>
                                                <span className="text-xs text-gray-500">{project.duration}</span>
                                            </div>

                                            <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
                                                {project.title}
                                            </h3>

                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {project.description}
                                            </p>

                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <div className="flex items-center">
                                                    <MapPin className="w-3 h-3 mr-1" />
                                                    {project.location}
                                                </div>
                                                <div className="flex items-center">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    {project.date}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedImage !== null && filteredProjects[selectedImage] && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-6xl max-h-[90vh] w-full">
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Navigation Buttons */}
                        {filteredProjects.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        prevImage()
                                    }}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        nextImage()
                                    }}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
                            {/* Image */}
                            <div className="lg:col-span-2">
                                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                                    <Image
                                        src={filteredProjects[selectedImage].image}
                                        alt={filteredProjects[selectedImage].title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Project Details */}
                            <div className="glass-card rounded-lg p-6 text-white max-h-full overflow-y-auto">
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-primary-300 text-sm font-medium uppercase tracking-wide">
                                            {categories.find(cat => cat.id === filteredProjects[selectedImage].category)?.name}
                                        </span>
                                        <h3 className="text-2xl font-display font-bold mt-1">
                                            {filteredProjects[selectedImage].title}
                                        </h3>
                                    </div>

                                    <p className="text-gray-200 leading-relaxed">
                                        {filteredProjects[selectedImage].description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-white/20">
                                        <div>
                                            <div className="text-sm text-gray-300 mb-1">Location</div>
                                            <div className="font-medium">{filteredProjects[selectedImage].location}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-300 mb-1">Completed</div>
                                            <div className="font-medium">{filteredProjects[selectedImage].date}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-300 mb-1">Investment</div>
                                            <div className="font-medium">{filteredProjects[selectedImage].budget}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-300 mb-1">Duration</div>
                                            <div className="font-medium">{filteredProjects[selectedImage].duration}</div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-gray-300 mb-2">Key Features</div>
                                        <div className="flex flex-wrap gap-2">
                                            {filteredProjects[selectedImage].features.map((feature, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-white/10 text-xs px-2 py-1 rounded-full"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Link
                                            href="/contact"
                                            className="w-full bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-700 hover:shadow-lg transition-all duration-300 text-center block"
                                        >
                                            Start Similar Project
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* CTA Section */}
            <section className="py-20 bg-navy-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                            Inspired by Our Work?
                        </h2>
                        <p className="text-xl text-primary-100 mb-8">
                            Let's create something amazing together. Start your project today.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300"
                        >
                            Get Your Free Quote
                            <ExternalLink className="w-5 h-5 ml-2" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default DynamicGalleryPage
