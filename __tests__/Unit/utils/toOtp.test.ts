import { describe, expect, test } from "vitest"
import { toOtp } from "../../../src/utils/toOtp";

describe('toOtp Tests Utils', () => {

    test("toOtp test number", () => {
        const data = toOtp({ length: 6 })
        expect(data.split('')).toHaveLength(6)
    })

    test("toOtp test ", () => {
        const data = toOtp({
            length: 6,
            includeAlphabets: true,
            includeDigits: true,
        })
        expect(data).toBeTypeOf('string')
    })

    test("toOtp test Error", () => {
        expect(() => void toOtp({
            length: 6,
            includeAlphabets: false,
            includeDigits: false,
        })).toThrowError('At least one of `includeDigits` or `includeAlphabets` must be true.')
    })
})
