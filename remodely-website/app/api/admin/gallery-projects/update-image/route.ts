import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const GALLERY_FILE = path.join(DATA_DIR, 'gallery-projects.json')

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

        const { projectId, imageUrl, imageIndex } = await request.json()

        if (!projectId || !imageUrl) {
            return NextResponse.json(
                { success: false, message: 'Project ID and image URL required' },
                { status: 400 }
            )
        }

        // Read existing projects
        const data = await fs.readFile(GALLERY_FILE, 'utf-8')
        let projects = JSON.parse(data)

        // Find the project to update
        const projectIndex = projects.findIndex((p: any) => p.id === projectId)
        if (projectIndex === -1) {
            return NextResponse.json(
                { success: false, message: 'Project not found' },
                { status: 404 }
            )
        }

        const project = projects[projectIndex]

        // Initialize images array if it doesn't exist
        if (!project.images) {
            project.images = []
        }

        // If imageIndex is provided, update specific image, otherwise add new image
        if (typeof imageIndex === 'number' && imageIndex >= 0 && imageIndex < project.images.length) {
            project.images[imageIndex] = imageUrl
        } else {
            project.images.push(imageUrl)
        }

        project.updatedAt = new Date().toISOString()
        projects[projectIndex] = project

        // Save back to file
        await fs.writeFile(GALLERY_FILE, JSON.stringify(projects, null, 2))

        return NextResponse.json({
            success: true,
            message: 'Project image updated successfully',
            project: project
        })

    } catch (error) {
        console.error('Gallery image update error:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to update project image' },
            { status: 500 }
        )
    }
}
