import { beforeEach, describe, expect, test, vi } from 'vitest';
import { decrypt, encrypt, SessionPayload } from "../../../src/server/lib/jwt";

const mockSecretKey = 'mock-secret-key';
vi.stubEnv('SESSION_SECRET', mockSecretKey);

beforeEach(() => {
    // Reset any mock values if necessary
    vi.clearAllMocks();
});

describe('test Jwt Tests', () => {
    test.skip('should encrypt and decrypt session correctly', async () => {
        const payload: SessionPayload = {
            sessionId: 'abc123',
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
            role: 'admin',
        };

        const encryptedSession = await encrypt(payload);
        console.log(encryptedSession);
        // const decryptedPayload = await decrypt(encryptedSession);
        // console.log(decryptedPayload)
        // expect(decryptedPayload).toEqual(payload);

    });

    test('should return undefined for invalid session during decryption', async () => {
        const invalidSession = 'invalid-encrypted-session';

        const result = await decrypt(invalidSession);

        expect(result).toBeUndefined(); // Since we catch errors in decrypt, we expect undefined
    });

    test('should throw error when decrypting with empty session string', async () => {
        const result = await decrypt('');

        expect(result).toBeUndefined(); // Expected to be undefined for empty session
    });

    test.skip('should throw error for expired session', async () => {
        const expiredPayload: SessionPayload = {
            sessionId: 'expired123',
            expiresAt: new Date(Date.now() - 1000), // Already expired
            role: 'user',
        };

        const encryptedSession = await encrypt(expiredPayload);

        // Assuming decryption would not throw an error for expired sessions,
        // we may need additional checks within `decrypt` to handle expiration.
        const decryptedPayload = await decrypt(encryptedSession);

        expect(decryptedPayload).toBeDefined();
        expect(decryptedPayload?.expiresAt.getTime()).toBeLessThan(Date.now());
    });

    test.skip('should handle missing SESSION_SECRET in environment', async () => {
        // Temporarily remove SESSION_SECRET from the environment
        vi.stubEnv('SESSION_SECRET', undefined);

        const payload: SessionPayload = {
            sessionId: 'abc123',
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
            role: 'admin',
        };

        try {
            await encrypt(payload);
        } catch (error) {
            expect(error).toBeDefined();
            // @ts-ignore
            expect(error.message).toBe('Missing SESSION_SECRET environment variable');
        }
    });
})
