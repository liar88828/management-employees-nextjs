import { describe, expect, test } from "vitest"
import { toAccounting } from "../../../src/utils/toAccounting";

describe('toAccounting Tests Utils', () => {

    test("toAccounting test", () => {
        const data = toAccounting('012312312319723')
        expect(data).toEqual('0123 1231 2319 723')
    })

    test("toAccounting test Error", () => {
        const data = toAccounting()
        expect(data).toEqual('please input number')
    })

})
