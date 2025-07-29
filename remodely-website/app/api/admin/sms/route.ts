import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        // SMS functionality placeholder
        return NextResponse.json({ 
            message: 'SMS endpoint - coming soon',
            status: 'not implemented'
        })
    } catch (error) {
        console.error('SMS API error:', error)
        return NextResponse.json(
            { error: 'SMS service temporarily unavailable' },
            { status: 503 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        
        // SMS functionality placeholder
        return NextResponse.json({ 
            message: 'SMS endpoint - coming soon',
            status: 'not implemented',
            data: body
        })
    } catch (error) {
        console.error('SMS API error:', error)
        return NextResponse.json(
            { error: 'SMS service temporarily unavailable' },
            { status: 503 }
        )
    }
}