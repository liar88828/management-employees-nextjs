import { describe, expect, test } from "vitest"
import { toPhone } from "../../../src/utils/toPhone";

describe('toPhone Tests Utils', () => {

    test("toPhone test  ", () => {
        const data = toPhone('08123182312')
        expect(data).toHaveLength(16)
        expect(data).toEqual('+62 8123 1823 12')
    })

    test("toPhone test Error", () => {
        const data = toPhone(undefined)
        expect(data).toEqual('-kosong-')
    })

})
