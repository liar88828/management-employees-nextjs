import { jwtVerify, SignJWT } from 'jose'

const secretKey = process.env.SESSION_SECRET || 'default-secret';

const encodedKey = new TextEncoder().encode(secretKey ?? 'default-secret')

export type SessionPayload = {
	sessionId: string
    expiresAt: Date,
    role: string
	// name: string,
	// email: string,
}

export async function encrypt(payload: SessionPayload) {
	return new SignJWT(payload)
	.setProtectedHeader({ alg: 'HS256' })
	.setIssuedAt()
	.setExpirationTime('7d')
	.sign(encodedKey)
}

// @ts-expect-error
export async function decrypt(session: string | undefined = ''): Promise<SessionPayload> {
	try {
		const data = await jwtVerify(session, encodedKey, {
			algorithms: [ 'HS256' ],
		})
		if (!data) {
			throw new Error('Unable to decrypt session')
		}
		return data.payload as SessionPayload
	} catch (error) {
        // console.log('Failed to verify session')

    }
}
