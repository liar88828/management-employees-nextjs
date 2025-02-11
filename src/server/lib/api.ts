import { NextRequest } from "next/server";
import { getSession } from "@/server/lib/db";
import { ErrorResponse } from "@/utils/ErrorResponse";
import { decrypt } from "@/server/lib/jwt";
import { ROLE } from "@/interface/Utils";
import { prisma } from "@/config/prisma";
import { deleteSession } from "@/server/lib/state";

export async function fromRequest(request: NextRequest,) {
    const fromHeader = request.headers.get('authorization')
    if (!fromHeader) {
        throw new ErrorResponse('No token provided', 401)
    }
    const token = fromHeader.split(' ').pop()
    return await decrypt(token)

}

export async function authApi(request: NextRequest, isAdminOnly: boolean = false) {
    let session = await getSession() || await fromRequest(request);
    if (isAdminOnly && session.role !== ROLE.ADMIN) {
        throw new ErrorResponse('is Secure Admin Only', 401)
    }

    if (!session) {
        throw new ErrorResponse('No token provided', 401)
    }

    const user = prisma.users.findUnique({where: {id: session.sessionId}})

    if (!user) {
        await deleteSession()
        throw new ErrorResponse('User Session Is Not Found', 401)
    }

    return session
}