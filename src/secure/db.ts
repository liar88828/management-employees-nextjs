// import 'server-only'
import { prisma } from "@/config/prisma";
import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";
import { decrypt, encrypt, SessionPayload } from "@/secure/jwt";
import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/secure/cookies";
import { UserAuth } from "@/interface/model";


export type UserSession = { isAuth: boolean, userId: string }

// export async function createSessionDB(id: string) {
//     const expiresAt = new Date(Date.now() + 60 * 60 * 1000)
//
//     // 1. Create a session in the database
//     const prevData = await prisma.sessions.create({
//         prevData: {
//             usersId: id,
//             expiresAt,
//             role: ROLE.USER
//         }
//     })
//
//     // 2. Encrypt the session ID
//     const session = await encrypt({
//         sessionId: prevData.id,
//         expiresAt,
//         role: prevData.role
//     })
//
//     // 3. Store the session in cookies for optimistic auth checks
//     const cookieStore = await cookies()
//     cookieStore.set('session', session, {
//         httpOnly: true,
//         secure: true,
//         expires: expiresAt,
//         sameSite: 'lax',
//         path: '/',
//     })
// }

export const getSession = async () => {
	const cookie = ( await cookies() ).get('session')?.value
	return await decrypt(cookie)
}

export const checkSession = async (session: SessionPayload) => {
	const foundUser = await prisma.users.findUnique({
		where: {
			id: session.sessionId,
		}
	})
	if (!foundUser) {
		console.log("No user found");
		await deleteSession()
	}
}

export const updateSession = async (request: NextRequest) => {

	const session = request.cookies.get('session')?.value
	if (!session) return

	const parsed = await decrypt(session)

	if (!parsed) {
		await deleteSession()
		return
	}

	parsed.expiresAt = new Date(Date.now() + 60 * 60 * 1000)
	const res = NextResponse.next()
	res.cookies.set({
		name: 'session',
		value: await encrypt(parsed),
		httpOnly: true,
		expires: parsed.expiresAt
		// secure: true,
	})
	// console.log(res.cookies.get('session'))
	// res.headers.append('Access-Control-Allow-Credentials', "true")
	// res.headers.append('Access-Control-Allow-Origin', 'https://rjw9fmxx-3000.asse.devtunnels.ms') // replace this your actual origin
	// res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
	// res.headers.append(
	//     'Access-Control-Allow-Headers',
	//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
	// )

	return res
}

export const validSession = cache(async () => {
	const session = await getSession()

	if (!session?.sessionId) {
		redirect('/login')
	}

	return {
		isLogin: true,
		userId: session.sessionId as string,
		session
	}
})

export const getUser = cache(async () => {
	const session = await validSession()
	if (!session) return null
	try {
		const user = await prisma.users.findUniqueOrThrow({
			where: { id: session.userId, }
		})
		const { password, ...data } = user

		return data as UserAuth
	} catch (error) {
		console.log('Failed to fetch user')
		return null
	}
})

export const getUserPage = async () => {
	const user = await getUser()
	if (!user) {

		redirect('/login')
		// await logout()
	}
	return user
}

const UPDATE_SESSION_THRESHOLD_MINUTES = 10

export function shouldUpdateSession(session: SessionPayload) {
	if (!session?.expiresAt) return false
	const lastUpdate = new Date(session.expiresAt)
	const now = new Date()
	const diffMs = now.getTime() - lastUpdate.getTime()
	const diffMinutes = diffMs / 1000 / 60
	return diffMinutes > UPDATE_SESSION_THRESHOLD_MINUTES
}
