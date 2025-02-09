import {NextRequest} from "next/server";
import {getSession} from "@/server/lib/db";
import {ErrorResponse} from "@/utils/ErrorResponse";
import {decrypt} from "@/server/lib/jwt";
import {ROLE} from "@/interface/Utils";

export async function fromRequest(request: NextRequest,) {
    const fromHeader = request.headers.get('authorization')
    if (!fromHeader) {
        throw new ErrorResponse('No token provided', 401)
    }
    const token = fromHeader.split(' ').pop()
    return await decrypt(token)

}


export async function authApi(request: NextRequest, isAdmin: boolean = false) {
    let session
    session = await getSession()
    if (session) {
        if (isAdmin) {
            session.role = ROLE.ADMIN
            throw new ErrorResponse('is Secure Admin Only', 401)
        }
    }
    session = await fromRequest(request);
    if (session) {
        session.role = ROLE.ADMIN
        throw new ErrorResponse('is Secure Admin Only', 401)
    }
    return session
}