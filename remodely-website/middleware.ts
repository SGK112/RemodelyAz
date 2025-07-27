import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    // Only protect the main admin route, not login
    if (request.nextUrl.pathname === '/admin') {
        // Check for admin token in cookies
        const token = request.cookies.get('admin_token')?.value

        if (!token) {
            // Redirect to login if no token
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin']
}
