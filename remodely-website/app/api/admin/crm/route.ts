import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        // CRM functionality placeholder
        return NextResponse.json({ 
            message: 'CRM endpoint - coming soon',
            status: 'not implemented'
        })
    } catch (error) {
        console.error('CRM API error:', error)
        return NextResponse.json(
            { error: 'CRM service temporarily unavailable' },
            { status: 503 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        // CRM functionality placeholder
        return NextResponse.json({ 
            message: 'CRM endpoint - coming soon',
            status: 'not implemented'
        })
    } catch (error) {
        console.error('CRM API error:', error)
        return NextResponse.json(
            { error: 'CRM service temporarily unavailable' },
            { status: 503 }
        )
    }
}