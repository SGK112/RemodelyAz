/**
 * Unified Projects Management API
 * Handles all gallery project operations through single endpoint
 */

import { NextRequest, NextResponse } from 'next/server'
import { imageManager } from '@/lib/unified-image-manager'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const category = searchParams.get('category')
    const query = searchParams.get('query')
    const projectId = searchParams.get('projectId')

    switch (action) {
      case 'list':
        const projects = category
          ? imageManager.getProjectsByCategory(category)
          : imageManager.getAllProjects()
        return NextResponse.json({ success: true, projects })

      case 'search':
        if (!query) {
          return NextResponse.json(
            { success: false, error: 'Search query required' },
            { status: 400 }
          )
        }
        // Simple search through all projects
        const allProjects = imageManager.getAllProjects()
        const searchResults = allProjects.filter(project => 
          project.title.toLowerCase().includes(query.toLowerCase()) ||
          project.description.toLowerCase().includes(query.toLowerCase()) ||
          project.features.some(feature => feature.toLowerCase().includes(query.toLowerCase()))
        )
        return NextResponse.json({ success: true, projects: searchResults })

      case 'get':
        if (!projectId) {
          return NextResponse.json(
            { success: false, error: 'Project ID required' },
            { status: 400 }
          )
        }
        const project = imageManager.getProjectById(projectId)
        if (!project) {
          return NextResponse.json(
            { success: false, error: 'Project not found' },
            { status: 404 }
          )
        }
        return NextResponse.json({ success: true, project })

      case 'stats':
        const allProjectsForStats = imageManager.getAllProjects()
        const stats = {
          total: allProjectsForStats.length,
          byCategory: {} as Record<string, number>
        }
        allProjectsForStats.forEach(project => {
          stats.byCategory[project.category] = (stats.byCategory[project.category] || 0) + 1
        })
        return NextResponse.json({ success: true, stats })

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Projects API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, projectData } = body

    switch (action) {
      case 'create':
        if (!projectData) {
          return NextResponse.json(
            { success: false, error: 'Project data required' },
            { status: 400 }
          )
        }

        const newProject = await imageManager.createProject(projectData)
        return NextResponse.json({
          success: true,
          project: newProject,
          message: 'Project created successfully'
        })

      case 'update':
        const { projectId, updates } = body

        if (!projectId) {
          return NextResponse.json(
            { success: false, error: 'Project ID required' },
            { status: 400 }
          )
        }

        const updatedProject = await imageManager.updateProject(projectId, updates)
        if (!updatedProject) {
          return NextResponse.json(
            { success: false, error: 'Project not found' },
            { status: 404 }
          )
        }

        return NextResponse.json({
          success: true,
          project: updatedProject,
          message: 'Project updated successfully'
        })

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Projects API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: 'Project ID required' },
        { status: 400 }
      )
    }

    const success = await imageManager.deleteProject(projectId)
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    })
  } catch (error) {
    console.error('Projects API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
