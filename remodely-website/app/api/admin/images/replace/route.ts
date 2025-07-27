import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

interface ImageData {
    id: string
    name: string
    url: string
    category: string
    description: string
    source: 'external' | 'local' | 'cloudinary'
    size: number
    uploadDate: string
    cloudinary?: {
        public_id: string
        width: number
        height: number
        format: string
    }
}

interface GalleryProject {
    id: number
    title: string
    category: string
    image: string
    description: string
    location: string
    date: string
    budget: string
    duration: string
    features: string[]
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const imageFile = formData.get('image') as File
        const replaceId = formData.get('replaceId') as string

        if (!imageFile || !replaceId) {
            return NextResponse.json(
                { success: false, message: 'Image file and replace ID are required' },
                { status: 400 }
            )
        }

        // Read current images data
        const imagesPath = join(process.cwd(), 'data', 'images.json')
        const imagesData = JSON.parse(readFileSync(imagesPath, 'utf8'))

        // Find the image to replace
        const imageIndex = imagesData.findIndex((img: ImageData) => img.id === replaceId)
        if (imageIndex === -1) {
            return NextResponse.json(
                { success: false, message: 'Image not found' },
                { status: 404 }
            )
        }

        const existingImage = imagesData[imageIndex]

        // Delete old image from Cloudinary if it exists
        if (existingImage.cloudinary?.public_id) {
            try {
                await cloudinary.uploader.destroy(existingImage.cloudinary.public_id)
            } catch (error) {
                console.error('Error deleting old image from Cloudinary:', error)
                // Continue with upload even if deletion fails
            }
        }

        // Convert File to buffer for Cloudinary upload
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Upload new image to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',
                    folder: 'remodely-az',
                    transformation: [
                        { quality: 'auto:eco' },
                        { fetch_format: 'auto' }
                    ]
                },
                (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                }
            ).end(buffer)
        }) as any

        if (!uploadResult) {
            return NextResponse.json(
                { success: false, message: 'Failed to upload image' },
                { status: 500 }
            )
        }

        // Create updated image data
        const updatedImage: ImageData = {
            ...existingImage,
            name: imageFile.name.replace(/\.[^/.]+$/, ''), // Remove extension
            url: uploadResult.secure_url,
            size: imageFile.size,
            uploadDate: new Date().toISOString(),
            source: 'cloudinary',
            cloudinary: {
                public_id: uploadResult.public_id,
                width: uploadResult.width,
                height: uploadResult.height,
                format: uploadResult.format
            }
        }

        // Update images data
        imagesData[imageIndex] = updatedImage
        writeFileSync(imagesPath, JSON.stringify(imagesData, null, 2))

        // Update project references
        await updateProjectImageReferences(existingImage.url, updatedImage.url)

        return NextResponse.json({
            success: true,
            message: 'Image replaced successfully',
            image: updatedImage
        })

    } catch (error) {
        console.error('Error replacing image:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}

async function updateProjectImageReferences(oldUrl: string, newUrl: string) {
    try {
        const projectsPath = join(process.cwd(), 'data', 'gallery-projects.json')
        const projectsData: GalleryProject[] = JSON.parse(readFileSync(projectsPath, 'utf8'))

        let updated = false
        const updatedProjects = projectsData.map(project => {
            // Check if project uses the old image URL
            if (project.image.includes(oldUrl) || project.image === oldUrl) {
                updated = true
                return {
                    ...project,
                    image: newUrl
                }
            }
            return project
        })

        if (updated) {
            writeFileSync(projectsPath, JSON.stringify(updatedProjects, null, 2))
            console.log('Updated project image references')
        }
    } catch (error) {
        console.error('Error updating project references:', error)
    }
}
