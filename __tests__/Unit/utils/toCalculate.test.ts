import { describe, expect, test } from "vitest"
import { subTotal } from "../../../src/utils/toCalculate";
import { TrolleyExamples } from "../../../src/assets/ExampleOrder";

describe('toCalculate Tests Utils', () => {

    test("subTotal test", () => {
        const data = subTotal(TrolleyExamples)
        expect(data).toEqual(40000)
    })

    test("subTotal test Error  undefined", () => {
        const data = subTotal(undefined)
        expect(data).toEqual(0)
    })

    test("subTotal test Error Empty", () => {
        const data = subTotal([])
        expect(data).toEqual(0)
    })
})
