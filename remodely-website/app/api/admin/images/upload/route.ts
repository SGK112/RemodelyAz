import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

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

        const formData = await request.formData()
        const files = formData.getAll('files') as File[]
        const category = formData.get('category') as string || 'general'

        if (!files || files.length === 0) {
            return NextResponse.json(
                { success: false, message: 'No files provided' },
                { status: 400 }
            )
        }

        const uploadDir = path.join(process.cwd(), 'public', 'uploads')
        
        // Ensure upload directory exists
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true })
        }

        const uploadedFiles = []

        for (const file of files) {
            if (file.size === 0) continue

            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)

            // Generate unique filename
            const timestamp = Date.now()
            const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
            const fileName = `${timestamp}-${safeName}`
            const filePath = path.join(uploadDir, fileName)

            await writeFile(filePath, buffer)

            uploadedFiles.push({
                id: `${timestamp}-${Math.random().toString(36).substr(2, 9)}`,
                filename: fileName,
                originalName: file.name,
                url: `/uploads/${fileName}`,
                category: category,
                uploadedAt: new Date().toISOString(),
                size: file.size,
                type: file.type
            })
        }

        return NextResponse.json({
            success: true,
            message: `Successfully uploaded ${uploadedFiles.length} file(s)`,
            files: uploadedFiles
        })

    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json(
            { success: false, message: 'Upload failed' },
            { status: 500 }
        )
    }
}
