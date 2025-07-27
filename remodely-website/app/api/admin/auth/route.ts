import { NextRequest, NextResponse } from 'next/server'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'remodelyaz2024'

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json()

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            const response = NextResponse.json({ 
                success: true, 
                message: 'Authentication successful' 
            })
            
            // Set secure session cookie
            response.cookies.set('admin-session', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/'
            })
            
            return response
        } else {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials' },
                { status: 401 }
            )
        }
    } catch (error) {
        console.error('Auth error:', error)
        return NextResponse.json(
            { success: false, message: 'Authentication failed' },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {
    try {
        const sessionCookie = request.cookies.get('admin-session')
        
        if (sessionCookie?.value === 'authenticated') {
            return NextResponse.json({ 
                authenticated: true, 
                message: 'Session valid' 
            })
        } else {
            return NextResponse.json(
                { authenticated: false, message: 'No valid session' },
                { status: 401 }
            )
        }
    } catch (error) {
        console.error('Session check error:', error)
        return NextResponse.json(
            { authenticated: false, message: 'Session check failed' },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const response = NextResponse.json({ 
            success: true, 
            message: 'Logged out successfully' 
        })
        
        // Clear the session cookie
        response.cookies.delete('admin-session')
        
        return response
    } catch (error) {
        console.error('Logout error:', error)
        return NextResponse.json(
            { success: false, message: 'Logout failed' },
            { status: 500 }
        )
    }
}
