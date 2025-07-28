// Image Optimization Utilities for RemodelyAz
// This file contains utility functions for image handling

import { SITE_IMAGES } from './site-images'

export interface ImageAsset {
    id: string
    name: string
    url: string
    category: string
    size: number
    uploadDate: string
    description: string
    alt?: string
    width?: number
    height?: number
}

export const IMAGE_CATEGORIES = {
    KITCHEN: 'Kitchen',
    BATHROOM: 'Bathroom',
    COMMERCIAL: 'Commercial',
    BEFORE_AFTER: 'Before/After',
    TEAM: 'Team',
    BLOG: 'Blog',
    GALLERY: 'Gallery',
    OTHER: 'Other'
} as const

export const IMAGE_SIZES = {
    THUMBNAIL: { width: 300, height: 200 },
    MEDIUM: { width: 800, height: 600 },
    LARGE: { width: 1200, height: 800 },
    HERO: { width: 2000, height: 1200 }
} as const

/**
 * Generates optimized Unsplash URL with specified dimensions and quality
 */
export function getOptimizedUnsplashUrl(
    baseUrl: string,
    width: number = 800,
    height: number = 600,
    quality: number = 80
): string {
    const url = new URL(baseUrl)
    url.searchParams.set('w', width.toString())
    url.searchParams.set('h', height.toString())
    url.searchParams.set('q', quality.toString())
    url.searchParams.set('fit', 'crop')
    url.searchParams.set('auto', 'format')
    return url.toString()
}

/**
 * Generates placeholder image URL for missing images
 */
export function getPlaceholderImage(width: number = 800, height: number = 600): string {
    return `/images/placeholder.svg`
}

/**
 * Validates image URL and returns fallback if invalid
 */
export function validateImageUrl(url: string): string {
    if (!url || url.trim() === '') {
        return getPlaceholderImage()
    }

    // Check if it's a valid HTTP(S) URL
    try {
        new URL(url)
        return url
    } catch {
        // If not a valid URL, assume it's a local path
        return url.startsWith('/') ? url : `/${url}`
    }
}

/**
 * Generates responsive image srcSet for different screen sizes
 */
export function generateResponsiveSrcSet(baseUrl: string): string {
    if (!baseUrl.includes('unsplash.com')) {
        return baseUrl
    }

    const sizes = [400, 800, 1200, 1600]
    return sizes
        .map(size => `${getOptimizedUnsplashUrl(baseUrl, size, Math.round(size * 0.75))} ${size}w`)
        .join(', ')
}

/**
 * Default image assets for the application
 */
export const DEFAULT_IMAGES = {
    kitchen: SITE_IMAGES.projects.living_room,
    bathroom: SITE_IMAGES.projects.bathroom_luxury,
    commercial: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    blog: SITE_IMAGES.blog.home_value,
    team: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    hero: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
} as const

/**
 * Image loading error handler
 */
export function handleImageError(event: React.SyntheticEvent<HTMLImageElement, Event>) {
    const img = event.currentTarget
    img.src = getPlaceholderImage()
}

/**
 * Preload critical images for better performance
 */
export function preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = reject
        img.src = src
    })
}
