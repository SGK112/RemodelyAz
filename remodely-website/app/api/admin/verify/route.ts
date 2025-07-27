import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json()

        if (!token) {
            return NextResponse.json(
                { success: false, error: 'No token provided' },
                { status: 401 }
            )
        }

        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET || 'remodely-admin-secret-key-2024'
        )

        // Verify the JWT token
        const { payload } = await jwtVerify(token, secret)

        if (payload.admin === true) {
            return NextResponse.json({
                success: true,
                message: 'Token verified'
            })
        } else {
            return NextResponse.json(
                { success: false, error: 'Invalid token' },
                { status: 401 }
            )
        }

    } catch (error) {
        console.error('Token verification error:', error)
        return NextResponse.json(
            { success: false, error: 'Token verification failed' },
            { status: 401 }
        )
    }
}
