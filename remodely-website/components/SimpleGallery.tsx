/**
 * Simple Unified Gallery Component
 * Clean replacement for the fragmented gallery systems
 */

'use client'

import React from 'react'
import UnifiedImageManager from './UnifiedImageManager'
import { UnifiedImage, GalleryProject } from '@/lib/unified-image-manager'

interface SimpleGalleryProps {
  category?: string
  title?: string
  description?: string
  showProjects?: boolean
  maxImages?: number
  className?: string
}

export default function SimpleGallery({
  category,
  title = "Our Work",
  description = "Explore our latest projects and transformations",
  showProjects = true,
  maxImages,
  className = ""
}: SimpleGalleryProps) {
  return (
    <section className={`py-16 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-navy mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Gallery Content */}
        <UnifiedImageManager
          mode="gallery"
          category={category}
          maxImages={maxImages}
          showSearch={true}
          showFilters={true}
          gridColumns={3}
          className="min-h-[400px]"
        />
      </div>
    </section>
  )
}
