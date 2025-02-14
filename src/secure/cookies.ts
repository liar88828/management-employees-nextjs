'use server'
import 'server-only'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Users } from ".prisma/client";
import { decrypt, encrypt } from "@/secure/jwt";

export async function deleteSession() {
	const cookieStore = await cookies()
	cookieStore.delete('session')
}

export async function updateSession() {
    const session = (await cookies()).get('session')?.value
    const payload = await decrypt(session)

    if (!session || !payload) {
        return null
    }

    const expires = new Date(Date.now() + 60 * 60 * 1000)
	const cookieStore = await cookies()
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires,
        sameSite: 'lax',
        path: '/',
	})
}

export async function createSession(data: Pick<Users, 'id' | 'role'>) {
    const expires = new Date(Date.now() + 60 * 60 * 1000)
    const session = await encrypt({
        expiresAt: expires,
        role: data.role,
        sessionId: data.id
    })
	const cookieStore = await cookies()
    // console.log(cookieStore)
	cookieStore.set('session', session, {
		httpOnly: true,
		secure: true,
        expires,
		sameSite: 'lax',
		path: '/',
	})
}

export async function logout() {
	await deleteSession()
	redirect('/login')
}