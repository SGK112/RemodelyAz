'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import UnifiedImageManager from '../../components/UnifiedImageManager'
import { UnifiedImage, GalleryProject } from '../../lib/unified-image-manager'

interface GalleryModalProps {
    image: UnifiedImage | null
    onClose: () => void
}

function GalleryModal({ image, onClose }: GalleryModalProps) {
    if (!image) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={image.url}
                    alt={image.name}
                    className="max-w-full max-h-full object-contain rounded-lg"
                />
                
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                    ✕
                </button>

                <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-sm text-white p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">{image.name}</h3>
                    {image.description && (
                        <p className="text-sm opacity-90 mb-2">{image.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-white/20 rounded text-xs capitalize">
                            {image.category}
                        </span>
                        {image.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-white/20 rounded text-xs">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

const GalleryPage = () => {
    const [selectedImage, setSelectedImage] = useState<UnifiedImage | null>(null)
    const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null)

    const handleImageSelect = (image: UnifiedImage) => {
        setSelectedImage(image)
    }

    const handleProjectSelect = (project: GalleryProject) => {
        setSelectedProject(project)
        console.log('Selected project:', project)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl font-bold text-navy mb-6">
                            Our Gallery
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Explore our premium remodeling projects and see the quality craftsmanship 
                            that makes RemodelyAz Arizona's trusted renovation partner.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Gallery Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <UnifiedImageManager
                    mode="gallery"
                    onImageSelect={handleImageSelect}
                    onProjectSelect={handleProjectSelect}
                    showSearch={true}
                    showFilters={true}
                    gridColumns={3}
                    className="min-h-[600px]"
                />
            </div>

            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <GalleryModal 
                        image={selectedImage} 
                        onClose={() => setSelectedImage(null)} 
                    />
                )}
            </AnimatePresence>

            {/* CTA Section */}
            <div className="bg-navy py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Ready to Transform Your Space?
                        </h2>
                        <p className="text-xl text-gray-200 mb-8">
                            Let's discuss your remodeling vision and create something amazing together.
                        </p>
                        <motion.a
                            href="/contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-glassmorphic inline-block text-lg px-8 py-4"
                        >
                            Get Your Estimate
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default GalleryPage
