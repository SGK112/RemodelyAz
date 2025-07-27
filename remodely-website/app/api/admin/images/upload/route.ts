import { NextRequest, NextResponse } from 'next/server'
import { CloudinaryService } from '@/lib/cloudinary'
import { promises as fs } from 'fs'
import path from 'path'
import { jwtVerify } from 'jose'

// Authentication middleware
async function verifyAuth(request: NextRequest) {
    try {
        const token = request.cookies.get('admin_token')?.value

        if (!token) {
            return false
        }

        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET || 'remodely-admin-secret-key-2024'
        )

        const { payload } = await jwtVerify(token, secret)
        return payload.admin === true
    } catch (error) {
        return false
    }
}

export async function POST(request: NextRequest) {
    // Check authentication
    const isAuthenticated = await verifyAuth(request)
    if (!isAuthenticated) {
        return NextResponse.json(
            { success: false, error: 'Unauthorized access' },
            { status: 401 }
        )
    }
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const category = formData.get('category') as string || 'Kitchen'

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No file provided' },
                { status: 400 }
            )
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { success: false, error: 'File must be an image' },
                { status: 400 }
            )
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        console.log('Starting upload for file:', file.name, 'size:', file.size)

        let imageData: any

        // Try Cloudinary first, fallback to local storage
        try {
            // Check if Cloudinary is available
            if (CloudinaryService.isAvailable()) {
                console.log('Uploading to Cloudinary...')
                const uploadResult = await CloudinaryService.uploadImage(buffer, {
                    folder: 'remodely-gallery',
                    tags: ['remodely', category.toLowerCase()],
                    transformation: {
                        width: 800,
                        height: 600,
                        crop: 'fill',
                        quality: 'auto',
                        format: 'auto'
                    }
                })

                console.log('Cloudinary upload successful:', uploadResult.public_id)

                imageData = {
                    id: uploadResult.public_id,
                    name: file.name.replace(/\.[^/.]+$/, ""),
                    url: uploadResult.secure_url,
                    category: category,
                    description: `Uploaded image: ${file.name}`,
                    source: 'cloudinary' as const,
                    size: file.size,
                    uploadDate: new Date().toISOString().split('T')[0],
                    uploadedAt: new Date().toISOString(),
                    cloudinary: {
                        public_id: uploadResult.public_id,
                        width: uploadResult.width,
                        height: uploadResult.height,
                        format: uploadResult.format,
                        tags: ['remodely', category.toLowerCase()]
                    }
                }
            } else {
                throw new Error('Cloudinary not configured')
            }
        } catch (cloudinaryError) {
            console.log('Cloudinary upload failed, using local storage:', cloudinaryError)

            // Fallback to local storage
            const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
            await fs.mkdir(uploadsDir, { recursive: true })

            const fileName = `${Date.now()}-${file.name}`
            const filePath = path.join(uploadsDir, fileName)

            await fs.writeFile(filePath, buffer)

            imageData = {
                id: `local-${Date.now()}`,
                name: file.name.replace(/\.[^/.]+$/, ""),
                url: `/uploads/${fileName}`,
                category: category,
                description: `Uploaded image: ${file.name}`,
                source: 'local' as const,
                size: file.size,
                uploadDate: new Date().toISOString().split('T')[0],
                uploadedAt: new Date().toISOString()
            }
        }

        // Load existing images
        const imagesPath = path.join(process.cwd(), 'data', 'images.json')
        let existingData: any = { images: [] }

        try {
            const fileContent = await fs.readFile(imagesPath, 'utf8')
            existingData = JSON.parse(fileContent)
        } catch (error) {
            console.log('Images file not found, creating new one')
        }

        // Add new image to the array
        existingData.images = existingData.images || []
        existingData.images.push(imageData)

        // Update stats
        existingData.stats = {
            total: existingData.images.length,
            categories: existingData.images.reduce((acc: any, img: any) => {
                acc[img.category] = (acc[img.category] || 0) + 1
                return acc
            }, {}),
            sources: existingData.images.reduce((acc: any, img: any) => {
                acc[img.source] = (acc[img.source] || 0) + 1
                return acc
            }, {}),
            totalSize: existingData.images.reduce((acc: number, img: any) => acc + (img.size || 0), 0),
            lastUpdated: new Date().toISOString()
        }

        // Save updated images data
        await fs.writeFile(imagesPath, JSON.stringify(existingData, null, 4))

        return NextResponse.json({
            success: true,
            data: imageData,
            message: 'Image uploaded successfully'
        })

    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to upload image',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}
