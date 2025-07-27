import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

// Middleware to check admin authentication
function checkAuth(request: NextRequest) {
    const sessionCookie = request.cookies.get('admin-session')
    return sessionCookie?.value === 'authenticated'
}

export async function POST(request: NextRequest) {
    try {
        // Check authentication
        if (!checkAuth(request)) {
            return NextResponse.json(
                { success: false, message: 'Authentication required' },
                { status: 401 }
            )
        }

        const { searchParams } = new URL(request.url)
        const oldImageId = searchParams.get('id')

        if (!oldImageId) {
            return NextResponse.json(
                { success: false, message: 'Image ID required' },
                { status: 400 }
            )
        }

        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file || file.size === 0) {
            return NextResponse.json(
                { success: false, message: 'No file provided' },
                { status: 400 }
            )
        }

        const category = formData.get('category') as string || 'general'
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Generate unique filename
        const timestamp = Date.now()
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const fileName = `${timestamp}-${safeName}`
        const uploadDir = path.join(process.cwd(), 'public', 'uploads')
        const filePath = path.join(uploadDir, fileName)

        await fs.writeFile(filePath, buffer)

        const newImage = {
            id: `${timestamp}-${Math.random().toString(36).substr(2, 9)}`,
            filename: fileName,
            originalName: file.name,
            url: `/uploads/${fileName}`,
            category: category,
            uploadedAt: new Date().toISOString(),
            size: file.size,
            type: file.type
        }

        return NextResponse.json({
            success: true,
            message: 'Image replaced successfully',
            image: newImage
        })

    } catch (error) {
        console.error('Replace error:', error)
        return NextResponse.json(
            { success: false, message: 'Image replacement failed' },
            { status: 500 }
        )
    }
}
