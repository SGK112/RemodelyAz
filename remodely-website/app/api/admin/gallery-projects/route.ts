import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

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

export async function GET() {
    try {
        const projectsPath = join(process.cwd(), 'data', 'gallery-projects.json')
        const projectsData: GalleryProject[] = JSON.parse(readFileSync(projectsPath, 'utf8'))

        return NextResponse.json(projectsData)
    } catch (error) {
        console.error('Error fetching gallery projects:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to fetch gallery projects' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const newProject = await request.json()

        const projectsPath = join(process.cwd(), 'data', 'gallery-projects.json')
        const projectsData: GalleryProject[] = JSON.parse(readFileSync(projectsPath, 'utf8'))

        // Generate new ID
        const maxId = projectsData.length > 0 ? Math.max(...projectsData.map(p => p.id)) : 0
        const projectWithId = {
            ...newProject,
            id: maxId + 1
        }

        projectsData.push(projectWithId)
        writeFileSync(projectsPath, JSON.stringify(projectsData, null, 2))

        return NextResponse.json({
            success: true,
            message: 'Project created successfully',
            project: projectWithId
        })
    } catch (error) {
        console.error('Error creating gallery project:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to create gallery project' },
            { status: 500 }
        )
    }
}

export async function PUT(request: NextRequest) {
    try {
        const updatedProject = await request.json()

        const projectsPath = join(process.cwd(), 'data', 'gallery-projects.json')
        const projectsData: GalleryProject[] = JSON.parse(readFileSync(projectsPath, 'utf8'))

        const projectIndex = projectsData.findIndex(p => p.id === updatedProject.id)
        if (projectIndex === -1) {
            return NextResponse.json(
                { success: false, message: 'Project not found' },
                { status: 404 }
            )
        }

        projectsData[projectIndex] = updatedProject
        writeFileSync(projectsPath, JSON.stringify(projectsData, null, 2))

        return NextResponse.json({
            success: true,
            message: 'Project updated successfully',
            project: updatedProject
        })
    } catch (error) {
        console.error('Error updating gallery project:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to update gallery project' },
            { status: 500 }
        )
    }
}
