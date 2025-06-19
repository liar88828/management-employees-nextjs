import { NextRequest, NextResponse } from 'next/server'
import { getSession, shouldUpdateSession, updateSession } from "@/secure/db";
import { SessionPayload } from "@/secure/jwt";

// 1. Specify protected and public routes
const adminRoute = [ '/admin', '/admin/employee', '/admin/registration' ]
const userRoute = [ '/user', '/interview', '/registration' ]
const publicRoutes = [ '/login', '/register' ]

export default async function middleware(req: NextRequest) {
	// 2. Check if the current route is protected or public
	const path = req.nextUrl.pathname
	const isUserOnly = userRoute.includes(path)
	const isAdminOnly = adminRoute.includes(path)
	const isPublicOnly = publicRoutes.includes(path)

	// 3. Decrypt the session from the cookie
	// const cookie = ( await cookies() ).get('session')?.value
	// const session = await decrypt(cookie)
	const session: SessionPayload | null = await getSession()
	// await checkSession(session)
	// 4. Redirect to /loginAction if the user is not authenticated
	// if(!session&&isProtectedRoute){
	// 	return NextResponse.redirect(new URL('/login', req.nextUrl))
	//
	// }

	if (!isPublicOnly && !session) {
		console.log('will redirect')
		return NextResponse.redirect(new URL('/login', req.nextUrl))
	}

	if (
		path.includes('admin') &&
		isAdminOnly &&
		session?.role !== 'ADMIN' &&
		session) {
		// console.log(	path.includes('admin'))
		// console.log('is admin')
		return NextResponse.redirect(new URL('/user', req.nextUrl))
	}

	// console.log(session?.role)
	// console.log(isUserOnly,'isUserOnly')
	if (isUserOnly && session?.role !== 'USER' && session) {
		// console.log('is user')
		return NextResponse.redirect(new URL('/admin', req.nextUrl))
	}

	// 🟡 Only update session if threshold passed
	if (session && shouldUpdateSession(session)) {
		return await updateSession(req)
	}

	// 🔵 Otherwise, just continue
	return NextResponse.next()
}
// Routes Middleware should not run on
export const config = {
	matcher: [ '/((?!api|_next/static|_next/image|.*\\.png$).*)' ],
}
