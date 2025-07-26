let cloudinary: any = null

// Try to import Cloudinary, but don't fail if it's not available
try {
    const CloudinaryModule = require('cloudinary')
    cloudinary = CloudinaryModule.v2

    // Configure Cloudinary only if we have the module and credentials
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })
    }
} catch (error) {
    console.warn('Cloudinary not available:', error instanceof Error ? error.message : 'Unknown error')
    cloudinary = null
} export interface CloudinaryUploadResult {
    public_id: string
    secure_url: string
    width: number
    height: number
    format: string
    bytes: number
    created_at: string
    folder?: string
    tags?: string[]
}

export interface CloudinaryTransformOptions {
    width?: number
    height?: number
    crop?: string
    quality?: string | number
    format?: string
}

export class CloudinaryService {
    /**
     * Check if Cloudinary is available and configured
     */
    static isAvailable(): boolean {
        return cloudinary !== null &&
            process.env.CLOUDINARY_CLOUD_NAME &&
            process.env.CLOUDINARY_API_KEY &&
            process.env.CLOUDINARY_API_SECRET ? true : false
    }

    /**
     * Upload an image to Cloudinary
     */
    static async uploadImage(
        file: Buffer | string,
        options: {
            folder?: string
            public_id?: string
            tags?: string[]
            transformation?: CloudinaryTransformOptions
        } = {}
    ): Promise<CloudinaryUploadResult> {
        if (!this.isAvailable()) {
            throw new Error('Cloudinary is not available or not configured')
        }

        try {
            const uploadOptions: any = {
                folder: options.folder || 'remodely-gallery',
                resource_type: 'image',
                tags: options.tags || ['remodely', 'gallery'],
            }

            if (options.public_id) {
                uploadOptions.public_id = options.public_id
            }

            if (options.transformation) {
                uploadOptions.transformation = options.transformation
            }

            const result = await cloudinary!.uploader.upload(file as string, uploadOptions)

            return {
                public_id: result.public_id,
                secure_url: result.secure_url,
                width: result.width,
                height: result.height,
                format: result.format,
                bytes: result.bytes,
                created_at: result.created_at,
                folder: result.folder,
                tags: result.tags
            }
        } catch (error) {
            console.error('Cloudinary upload error:', error)
            throw new Error('Failed to upload image to Cloudinary')
        }
    }    /**
   * Delete an image from Cloudinary
   */
    static async deleteImage(publicId: string): Promise<void> {
        if (!this.isAvailable()) {
            throw new Error('Cloudinary is not available or not configured')
        }

        try {
            await cloudinary!.uploader.destroy(publicId)
        } catch (error) {
            console.error('Cloudinary delete error:', error)
            throw new Error('Failed to delete image from Cloudinary')
        }
    }

    /**
     * Get optimized image URL with transformations
     */
    static getOptimizedUrl(
        publicId: string,
        transformations: CloudinaryTransformOptions = {}
    ): string {
        if (!this.isAvailable()) {
            return publicId // Return the original URL if Cloudinary is not available
        }

        const defaultTransformations = {
            quality: 'auto',
            format: 'auto',
            ...transformations
        }

        return cloudinary!.url(publicId, defaultTransformations)
    }    /**
   * Get image details from Cloudinary
   */
    static async getImageDetails(publicId: string): Promise<any> {
        if (!this.isAvailable()) {
            throw new Error('Cloudinary is not available or not configured')
        }

        try {
            const result = await cloudinary!.api.resource(publicId)
            return result
        } catch (error) {
            console.error('Cloudinary get details error:', error)
            throw new Error('Failed to get image details from Cloudinary')
        }
    }

    /**
     * List all images in a folder
     */
    static async listImages(folder: string = 'remodely-gallery'): Promise<any[]> {
        if (!this.isAvailable()) {
            throw new Error('Cloudinary is not available or not configured')
        }

        try {
            const result = await cloudinary!.api.resources({
                type: 'upload',
                prefix: folder,
                max_results: 100
            })
            return result.resources
        } catch (error) {
            console.error('Cloudinary list images error:', error)
            throw new Error('Failed to list images from Cloudinary')
        }
    }

    /**
     * Create responsive image URLs for different screen sizes
     */
    static getResponsiveUrls(publicId: string): {
        thumbnail: string
        small: string
        medium: string
        large: string
        original: string
    } {
        return {
            thumbnail: this.getOptimizedUrl(publicId, { width: 150, height: 150, crop: 'fill' }),
            small: this.getOptimizedUrl(publicId, { width: 400, crop: 'scale' }),
            medium: this.getOptimizedUrl(publicId, { width: 800, crop: 'scale' }),
            large: this.getOptimizedUrl(publicId, { width: 1200, crop: 'scale' }),
            original: this.getOptimizedUrl(publicId)
        }
    }

    /**
     * Generate image transformations for gallery display
     */
    static getGalleryImageUrl(
        publicId: string,
        size: 'thumbnail' | 'medium' | 'large' = 'medium'
    ): string {
        const transformations = {
            thumbnail: { width: 300, height: 300, crop: 'fill', quality: 'auto' },
            medium: { width: 600, height: 400, crop: 'fill', quality: 'auto' },
            large: { width: 1200, height: 800, crop: 'scale', quality: 'auto' }
        }

        return this.getOptimizedUrl(publicId, transformations[size])
    }
}

export default CloudinaryService
