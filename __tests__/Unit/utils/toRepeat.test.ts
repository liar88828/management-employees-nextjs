import { describe, expect, test } from "vitest"
import { repeatAsync, toRepeat } from "../../../src/utils/toRepeat";

describe('toRepeat Tests Utils', () => {

    test("toRepeat test", () => {
        const data = toRepeat(2)
        expect(data).toEqual([ 1, 2 ])
    })

    test("toRepeat test Error", () => {
        const data = toRepeat(3)
        expect(data).toEqual([ 1, 2, 3 ])
        expect(data).not.toEqual([ 0, 1, 2, 3 ])
    })

    describe('repeatAsync Function Tests', () => {
        test('should return an array of numbers from 1 to n', async () => {
            const n = 5;
            const result = await repeatAsync(n);
            expect(result).toEqual([ 1, 2, 3, 4, 5 ]);
        });

        test('should return an empty array when n is 0', async () => {
            const n = 0;
            const result = await repeatAsync(n);
            expect(result).toEqual([]);
        });

        test('should handle n = 1 correctly', async () => {
            const n = 1;
            const result = await repeatAsync(n);
            expect(result).toEqual([ 1 ]);
        });
    });


})
