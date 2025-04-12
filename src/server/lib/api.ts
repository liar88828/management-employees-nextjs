import { NextRequest } from "next/server";
import { ErrorResponse } from "@/utils/ErrorClass";
import { prisma } from "@/config/prisma";
import { decrypt } from "@/secure/jwt";
import { getSession } from "@/secure/db";
import { ROLE } from "@/interface/enum";
import { deleteSession } from "@/secure/cookies";

export async function fromRequest(request: NextRequest,) {
    const fromHeader = request.headers.get('authorization')
    if (!fromHeader) {
        throw new ErrorResponse('No token provided', 401)
    }
    const token = fromHeader.split(' ').pop()
    return await decrypt(token)

}

export async function authApi(request: NextRequest, isAdmin: boolean = false) {
    let session = await getSession() || await fromRequest(request);

    if (isAdmin && session.role !== ROLE.ADMIN) {
        throw new ErrorResponse('is Secure Admin Only', 401)
    }

    if (!session) {
        throw new ErrorResponse('No token provided', 401)
    }

    const user = prisma.users.findUnique({ where: { id: session.sessionId } })

    if (!user) {
        await deleteSession()
        throw new ErrorResponse('User Session Is Not Found', 401)
    }
    return session
}

export async function getSessionValid() {
    let session = await getSession()

    if (session) {
        throw new ErrorResponse('is Secure Only', 401)
    }

    return session
}