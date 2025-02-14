import { NextRequest } from "next/server";
import { ErrorResponse } from "@/utils/ErrorResponse";
import { decrypt } from "@/secure/jwt";

export async function fromRequest(request: NextRequest,) {
    const fromHeader = request.headers.get('authorization')
    if (!fromHeader) {
        throw new ErrorResponse('No token provided', 401)
    }
    const token = fromHeader.split(' ').pop()
    return await decrypt(token)

}

