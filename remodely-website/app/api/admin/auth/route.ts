import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'

// Admin password - in production, use environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'RemodelyAz2024!'

export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json()

        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json(
                { success: false, error: 'Invalid password' },
                { status: 401 }
            )
        }

        // Create JWT token
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET || 'remodely-admin-secret-key-2024'
        )

        const token = await new SignJWT({ admin: true })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(secret)

        const response = NextResponse.json({
            success: true,
            token,
            message: 'Authentication successful'
        })

        // Set HTTP-only cookie for security
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400 // 24 hours
        })

        return response

    } catch (error) {
        console.error('Auth error:', error)
        return NextResponse.json(
            { success: false, error: 'Authentication failed' },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest) {
    // Logout endpoint
    const response = NextResponse.json({ success: true, message: 'Logged out' })
    response.cookies.delete('admin_token')
    return response
}
