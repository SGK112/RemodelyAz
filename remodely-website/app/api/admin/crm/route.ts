import { NextRequest, NextResponse } from 'next/server'
import {
    getAllClients,
    getAllProjects,
    getCRMStats,
    getRecentActivities,
    createClient,
    createProject,
    updateClient,
    updateProject,
    logActivity,
    initializeCRMData
} from '../../../lib/crm-service'

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url)
        const action = url.searchParams.get('action')

        // Initialize CRM data if needed
        await initializeCRMData()

        switch (action) {
            case 'stats':
                const stats = await getCRMStats()
                return NextResponse.json({ success: true, stats })

            case 'clients':
                const clients = await getAllClients()
                return NextResponse.json({ success: true, clients })

            case 'projects':
                const projects = await getAllProjects()
                return NextResponse.json({ success: true, projects })

            case 'activities':
                const limit = parseInt(url.searchParams.get('limit') || '20')
                const activities = await getRecentActivities(limit)
                return NextResponse.json({ success: true, activities })

            default:
                return NextResponse.json(
                    { success: false, error: 'Invalid action' },
                    { status: 400 }
                )
        }
    } catch (error) {
        console.error('CRM API error:', error)
        return NextResponse.json(
            { success: false, error: 'CRM operation failed' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { action, ...data } = body

        switch (action) {
            case 'create_client':
                const newClient = await createClient(data)
                return NextResponse.json({ success: true, client: newClient })

            case 'create_project':
                const newProject = await createProject(data)
                return NextResponse.json({ success: true, project: newProject })

            case 'update_client':
                const updatedClient = await updateClient(data.id, data.updates)
                if (!updatedClient) {
                    return NextResponse.json(
                        { success: false, error: 'Client not found' },
                        { status: 404 }
                    )
                }
                return NextResponse.json({ success: true, client: updatedClient })

            case 'update_project':
                const updatedProject = await updateProject(data.id, data.updates)
                if (!updatedProject) {
                    return NextResponse.json(
                        { success: false, error: 'Project not found' },
                        { status: 404 }
                    )
                }
                return NextResponse.json({ success: true, project: updatedProject })

            case 'log_activity':
                const activity = await logActivity(data)
                return NextResponse.json({ success: true, activity })

            default:
                return NextResponse.json(
                    { success: false, error: 'Invalid action' },
                    { status: 400 }
                )
        }
    } catch (error) {
        console.error('CRM API error:', error)
        return NextResponse.json(
            { success: false, error: 'CRM operation failed' },
            { status: 500 }
        )
    }
}
