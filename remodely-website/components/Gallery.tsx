'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null)
    const [currentCategory, setCurrentCategory] = useState('all')

    const categories = [
        { id: 'all', name: 'All Projects' },
        { id: 'kitchen', name: 'Kitchens' },
        { id: 'bathroom', name: 'Bathrooms' },
        { id: 'commercial', name: 'Commercial' },
    ]

    const projects = [
        {
            id: 1,
            title: 'Modern Luxury Kitchen',
            category: 'kitchen',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Complete kitchen transformation with custom cabinetry and marble countertops',
            location: 'Beverly Hills, CA'
        },
        {
            id: 2,
            title: 'Spa-Inspired Master Bath',
            category: 'bathroom',
            image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Luxurious bathroom with walk-in shower and heated floors',
            location: 'Manhattan, NY'
        },
        {
            id: 3,
            title: 'Corporate Office Renovation',
            category: 'commercial',
            image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Modern office space with collaborative work areas',
            location: 'Downtown LA'
        },
        {
            id: 4,
            title: 'Rustic Modern Kitchen',
            category: 'kitchen',
            image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Blend of rustic charm and modern functionality',
            location: 'Austin, TX'
        },
        {
            id: 5,
            title: 'Contemporary Guest Bath',
            category: 'bathroom',
            image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Sleek design with premium fixtures and lighting',
            location: 'Miami, FL'
        },
        {
            id: 6,
            title: 'Restaurant Kitchen Design',
            category: 'commercial',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Professional-grade commercial kitchen installation',
            location: 'Chicago, IL'
        },
        {
            id: 7,
            title: 'Luxury Master Kitchen',
            category: 'kitchen',
            image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Elegant kitchen with marble island and premium appliances',
            location: 'San Francisco, CA'
        },
        {
            id: 8,
            title: 'Modern Powder Room',
            category: 'bathroom',
            image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Compact bathroom with geometric tiles and floating vanity',
            location: 'Seattle, WA'
        },
        {
            id: 9,
            title: 'Executive Office Suite',
            category: 'commercial',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Premium office renovation with modern furnishings',
            location: 'Boston, MA'
        },
    ]

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

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                        Inspiration
                        <span className="block text-accent-600">
                            Gallery
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore our portfolio of stunning transformations and get inspired for your next project.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setCurrentCategory(category.id)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${currentCategory === category.id
                                ? 'bg-accent-600 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </motion.div>

                {/* Gallery Grid */}
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
                            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-navy-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                                    <p className="text-sm text-gray-200">{project.location}</p>
                                </div>
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ExternalLink className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

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
                                    src={filteredProjects[selectedImage].image}
                                    alt={filteredProjects[selectedImage].title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="mt-4 text-center text-white">
                                <h3 className="text-xl font-semibold mb-2">
                                    {filteredProjects[selectedImage].title}
                                </h3>
                                <p className="text-gray-300 mb-1">
                                    {filteredProjects[selectedImage].description}
                                </p>
                                <p className="text-sm text-gray-400">
                                    {filteredProjects[selectedImage].location}
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
