import { describe, expect, test } from "vitest"
import { toRupiah } from "../../../src/utils/toRupiah";

describe('toRupiah Tests Utils', () => {

    test("toRupiah test", () => {
        const data = toRupiah(2000)
        expect(data).toEqual('Rp 2.000')
    })

    test("toRupiah test Error", () => {
        const data = toRupiah('test')
        expect(data).toEqual('kosong')
    })

})
