import {NextRequest, NextResponse} from 'next/server'
import {cookies} from 'next/headers'
import {decrypt} from "@/server/lib/jwt";
import {updateSession} from "@/server/lib/db";
import {consoleLog} from "@/utils/consoleLog";

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/admin', '/profile', '/trolley', '/invoice', '/checkout']
const publicRoutes = ['/login', '/register']
// const adminRoutes = [ '/login', '/register'  ]
// const userRoutes = [ '/login', '/register'  ]

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    // 3. Decrypt the session from the cookie
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)
    // consoleLog("middleware cookie", cookie)
    // console.log(session)
    // 4. Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !session?.sessionId) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    if (path.includes('admin') && session?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/home', req.nextUrl))
    }

    // 5. Redirect to /dashboard if the user is authenticated
    if (
        isPublicRoute
        && session?.sessionId
        // && !req.nextUrl.pathname.startsWith('/home')
    ) {
        // console.log(session?.sessionId)
        // return NextResponse.redirect(new URL('/home', req.nextUrl))
    }
    // console.log(path)
    // if (path.includes('/api')) {
    //     console.log('is true')
    // }

    // await updateSession()
    // return NextResponse.next()
    return await updateSession(req)
}
// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
