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

export async function POST(request: NextRequest) {
    try {
        const { imageId, newUrl } = await request.json()

        if (!imageId || !newUrl) {
            return NextResponse.json(
                { success: false, message: 'Image ID and new URL are required' },
                { status: 400 }
            )
        }

        // Read gallery projects data
        const projectsPath = join(process.cwd(), 'data', 'gallery-projects.json')
        const projectsData: GalleryProject[] = JSON.parse(readFileSync(projectsPath, 'utf8'))

        // Update projects that reference this image
        let updatedCount = 0
        const updatedProjects = projectsData.map(project => {
            // Check if project uses this image (by ID or URL pattern)
            if (project.image.includes(imageId) || project.image.includes('linda-ullrich')) {
                updatedCount++
                return {
                    ...project,
                    image: newUrl
                }
            }
            return project
        })

        // Save updated projects
        writeFileSync(projectsPath, JSON.stringify(updatedProjects, null, 2))

        return NextResponse.json({
            success: true,
            message: `Updated ${updatedCount} project references`,
            updatedCount
        })

    } catch (error) {
        console.error('Error updating project image references:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}
