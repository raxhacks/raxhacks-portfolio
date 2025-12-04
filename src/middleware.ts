import { NextRequest, NextResponse } from 'next/server'

async function isSessionValid(req: NextRequest): Promise<boolean> {
    const sessionToken = req.cookies.get('better-auth.session_token')?.value
    if (!sessionToken) return false

    try {
        const baseUrl = req.nextUrl.origin
        const response = await fetch(`${baseUrl}/api/auth/get-session`, {
            headers: {
                cookie: req.headers.get('cookie') || '',
            },
        })
        
        if (!response.ok) return false
        
        const data = await response.json()
        return !!data?.session
    } catch {
        return false
    }
}

export default async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith('/api/auth')) {
        return NextResponse.next()
    }

    if (req.nextUrl.pathname.startsWith('/api')) {
        const method = (req.method || '').toUpperCase()
        if (method === 'POST' || method === 'PUT') {
            const isValid = await isSessionValid(req)
            if (!isValid) {
                return new NextResponse('Unauthorized', { status: 401 })
            }
        }
    }

    if (req.nextUrl.pathname.startsWith('/VvXwAy5kKv')) {
        const isValid = await isSessionValid(req)
        if (!isValid) {
            return new NextResponse('Unauthorized', { status: 401 })
        }
        else if (req.nextUrl.pathname === '/VvXwAy5kKv' && isValid) {
            return NextResponse.redirect(new URL('/VvXwAy5kKv/main', req.nextUrl.origin))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/api/:path*', '/VvXwAy5kKv/:path*'],
}
