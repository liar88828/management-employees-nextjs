import { describe, expect, test } from "vitest";
import { toStatus } from "../../../src/app/components/toStatus";

describe('status Page Test Components', async () => {

    test("toStatus Fail test",
        () => {
            const data = toStatus('Fail')
            expect(data).toEqual('error');
        });

    test("toStatus Complete test",
        () => {
            const data = toStatus('Complete')
            expect(data).toEqual('success');
        });

    test("toStatus Pending test",
        () => {
            const data = toStatus('Pending')
            expect(data).toEqual('info');
        });
});
