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

// GET - Fetch all gallery projects
export async function GET(request: NextRequest) {
    try {
        const data = await fs.readFile(GALLERY_FILE, 'utf-8')
        const projects = JSON.parse(data)
        
        return NextResponse.json({
            success: true,
            projects
        })
    } catch (error) {
        console.error('Gallery fetch error:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to fetch gallery projects' },
            { status: 500 }
        )
    }
}

// POST - Create new gallery project
export async function POST(request: NextRequest) {
    try {
        // Check authentication
        if (!checkAuth(request)) {
            return NextResponse.json(
                { success: false, message: 'Authentication required' },
                { status: 401 }
            )
        }

        const newProject = await request.json()

        // Read existing projects
        let projects = []
        try {
            const data = await fs.readFile(GALLERY_FILE, 'utf-8')
            projects = JSON.parse(data)
        } catch (error) {
            // File doesn't exist, start with empty array
        }

        // Add new project with ID
        const projectWithId = {
            ...newProject,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        }

        projects.push(projectWithId)

        // Save back to file
        await fs.writeFile(GALLERY_FILE, JSON.stringify(projects, null, 2))

        return NextResponse.json({
            success: true,
            message: 'Gallery project created successfully',
            project: projectWithId
        })

    } catch (error) {
        console.error('Gallery create error:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to create gallery project' },
            { status: 500 }
        )
    }
}

// PUT - Update existing gallery project
export async function PUT(request: NextRequest) {
    try {
        // Check authentication
        if (!checkAuth(request)) {
            return NextResponse.json(
                { success: false, message: 'Authentication required' },
                { status: 401 }
            )
        }

        const updatedProject = await request.json()
        const { id } = updatedProject

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'Project ID required' },
                { status: 400 }
            )
        }

        // Read existing projects
        const data = await fs.readFile(GALLERY_FILE, 'utf-8')
        let projects = JSON.parse(data)

        // Find and update project
        const projectIndex = projects.findIndex((p: any) => p.id === id)
        if (projectIndex === -1) {
            return NextResponse.json(
                { success: false, message: 'Project not found' },
                { status: 404 }
            )
        }

        projects[projectIndex] = {
            ...projects[projectIndex],
            ...updatedProject,
            updatedAt: new Date().toISOString()
        }

        // Save back to file
        await fs.writeFile(GALLERY_FILE, JSON.stringify(projects, null, 2))

        return NextResponse.json({
            success: true,
            message: 'Gallery project updated successfully',
            project: projects[projectIndex]
        })

    } catch (error) {
        console.error('Gallery update error:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to update gallery project' },
            { status: 500 }
        )
    }
}

// DELETE - Delete gallery project
export async function DELETE(request: NextRequest) {
    try {
        // Check authentication
        if (!checkAuth(request)) {
            return NextResponse.json(
                { success: false, message: 'Authentication required' },
                { status: 401 }
            )
        }

        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'Project ID required' },
                { status: 400 }
            )
        }

        // Read existing projects
        const data = await fs.readFile(GALLERY_FILE, 'utf-8')
        let projects = JSON.parse(data)

        // Filter out the project to delete
        projects = projects.filter((p: any) => p.id !== id)

        // Save back to file
        await fs.writeFile(GALLERY_FILE, JSON.stringify(projects, null, 2))

        return NextResponse.json({
            success: true,
            message: 'Gallery project deleted successfully'
        })

    } catch (error) {
        console.error('Gallery delete error:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to delete gallery project' },
            { status: 500 }
        )
    }
}
