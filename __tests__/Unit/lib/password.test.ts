import { expect, test } from 'vitest';
import { checkPassword } from "../../../src/server/lib/password";

test.skip('should return true if the password matches', async () => {
    const passwordUser = 'userPassword123';
    const passwordDb = 'hashedPassword123';
    expect(async () => {
        await checkPassword(passwordUser, passwordDb)
    }).toThrow('Password is incorrect');
});
