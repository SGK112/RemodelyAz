import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const sessionCookie = request.cookies.get('admin-session')
        
        if (sessionCookie?.value === 'authenticated') {
            return NextResponse.json({ 
                authenticated: true,
                user: 'admin',
                message: 'Session valid' 
            })
        } else {
            return NextResponse.json(
                { 
                    authenticated: false, 
                    message: 'Authentication required' 
                },
                { status: 401 }
            )
        }
    } catch (error) {
        console.error('Verification error:', error)
        return NextResponse.json(
            { 
                authenticated: false, 
                message: 'Verification failed' 
            },
            { status: 500 }
        )
    }
}
