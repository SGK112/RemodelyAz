import { NextRequest, NextResponse } from 'next/server'

const FLASK_API_URL = process.env.FLASK_API_URL || 'http://localhost:5000'

export async function GET(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    try {
        const path = params.path.join('/')
        const url = new URL(request.url)
        const searchParams = url.searchParams.toString()

        const flaskUrl = `${FLASK_API_URL}/api/${path}${searchParams ? `?${searchParams}` : ''}`

        const response = await fetch(flaskUrl, {
            method: 'GET',
            headers: {
                'Authorization': request.headers.get('authorization') || '',
                'Content-Type': 'application/json',
            },
        })

        const data = await response.json()
        return NextResponse.json(data, { status: response.status })

    } catch (error) {
        console.error('Flask API proxy error:', error)
        return NextResponse.json(
            { success: false, message: 'SecureShare service unavailable' },
            { status: 503 }
        )
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    try {
        const path = params.path.join('/')
        const body = await request.text()

        const response = await fetch(`${FLASK_API_URL}/api/${path}`, {
            method: 'POST',
            headers: {
                'Authorization': request.headers.get('authorization') || '',
                'Content-Type': request.headers.get('content-type') || 'application/json',
            },
            body,
        })

        const data = await response.json()
        return NextResponse.json(data, { status: response.status })

    } catch (error) {
        console.error('Flask API proxy error:', error)
        return NextResponse.json(
            { success: false, message: 'SecureShare service unavailable' },
            { status: 503 }
        )
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    try {
        const path = params.path.join('/')
        const body = await request.text()

        const response = await fetch(`${FLASK_API_URL}/api/${path}`, {
            method: 'PUT',
            headers: {
                'Authorization': request.headers.get('authorization') || '',
                'Content-Type': request.headers.get('content-type') || 'application/json',
            },
            body,
        })

        const data = await response.json()
        return NextResponse.json(data, { status: response.status })

    } catch (error) {
        console.error('Flask API proxy error:', error)
        return NextResponse.json(
            { success: false, message: 'SecureShare service unavailable' },
            { status: 503 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    try {
        const path = params.path.join('/')

        const response = await fetch(`${FLASK_API_URL}/api/${path}`, {
            method: 'DELETE',
            headers: {
                'Authorization': request.headers.get('authorization') || '',
                'Content-Type': 'application/json',
            },
        })

        const data = await response.json()
        return NextResponse.json(data, { status: response.status })

    } catch (error) {
        console.error('Flask API proxy error:', error)
        return NextResponse.json(
            { success: false, message: 'SecureShare service unavailable' },
            { status: 503 }
        )
    }
}
