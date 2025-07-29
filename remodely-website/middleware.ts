import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple middleware that allows all requests
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

// No specific routes to match - applies to all routes
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
