import 'server-only'
import { prisma } from "@/config/prisma";
import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";
import { decrypt, encrypt } from "@/server/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ROLE } from "@/interface/Utils";

export type UserSession = { isAuth: boolean, userId: string }

export async function createSessionDB(id: string) {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

    // 1. Create a session in the database
    const data = await prisma.sessions.create({
        data: {
            usersId: id,
            expiresAt,
            role: ROLE.USER
        }
    })

    // 2. Encrypt the session ID
    const session = await encrypt({
        sessionId: data.id,
        expiresAt,
        role: data.role
    })

    // 3. Store the session in cookies for optimistic auth checks
    const cookieStore = await cookies()
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export const getSession = async () => {
    const cookie = ( await cookies() ).get('session')?.value
    return await decrypt(cookie)
}

export const updateSession = async (request: NextRequest) => {

    const session = request.cookies.get('session')?.value
    if (!session) return

    const parsed = await decrypt(session)
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

export const checkGuest = async () => {
    const session = await getSession()
    if (!session) return false
    return true
}

export const validSession = cache(async () => {
    const session = await getSession()

    if (!session?.sessionId) {
        redirect('/login')
    }

    return {
        isAuth: true,
        userId: session.sessionId as string,
    }
})

export const getUser = cache(async () => {
    const session = await validSession()

    if (!session) return null

    try {
        return await prisma.users.findUniqueOrThrow({
            where: { id: session.userId },
        })

    } catch (error) {
        console.log('Failed to fetch user')
        return null
    }
})
