import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
    try {
        const galleryPath = path.join(process.cwd(), 'data', 'gallery-projects.json')

        if (!fs.existsSync(galleryPath)) {
            return NextResponse.json({ data: [] })
        }

        const data = fs.readFileSync(galleryPath, 'utf8')
        const projects = JSON.parse(data)

        return NextResponse.json(
            { data: projects },
            {
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            }
        )
    } catch (error) {
        console.error('Error loading gallery projects:', error)
        return NextResponse.json(
            { error: 'Failed to load gallery projects' },
            { status: 500 }
        )
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { projects } = await request.json()

        if (!projects || !Array.isArray(projects)) {
            return NextResponse.json(
                { error: 'Invalid projects data' },
                { status: 400 }
            )
        }

        // Validate project structure
        for (const project of projects) {
            if (!project.id || !project.title || !project.url || !project.category) {
                return NextResponse.json(
                    { error: 'Missing required project fields' },
                    { status: 400 }
                )
            }
        }

        // Save to JSON file
        const galleryPath = path.join(process.cwd(), 'data', 'gallery-projects.json')
        const publicPath = path.join(process.cwd(), 'public', 'data', 'gallery-projects.json')

        // Save to both locations for compatibility
        fs.writeFileSync(galleryPath, JSON.stringify(projects, null, 4))

        // Also save to public directory for direct access
        const publicDir = path.dirname(publicPath)
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true })
        }
        fs.writeFileSync(publicPath, JSON.stringify(projects, null, 4))

        return NextResponse.json({
            success: true,
            message: 'Gallery projects updated successfully',
            count: projects.length
        })

    } catch (error) {
        console.error('Error updating gallery projects:', error)
        return NextResponse.json(
            { error: 'Failed to update gallery projects' },
            { status: 500 }
        )
    }
}
